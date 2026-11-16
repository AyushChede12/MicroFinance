
$(document).ready(function() {

	let allKYCData = [];

	// LOAD ALL UNAPPROVED CUSTOMERS
	loadCustomerKYCData();

	// LOAD BRANCH DROPDOWN
	loadBranchDropdown();

	// FIND BUTTON
	$('#findBtn').on('click', function(e) {
		e.preventDefault();
		filterKYCData();
	});

	// APPROVE BUTTON
	$('#approvedBtn').on('click', function(e) {
		e.preventDefault();

		const selectedCheckboxes = $('.approval-checkbox:checked');

		if (selectedCheckboxes.length === 0) {
			alert("PLEASE SELECT AT LEAST ONE CUSTOMER TO APPROVE.");
			return;
		}

		const approvalRequests = [];

		selectedCheckboxes.each(function() {
			const id = $(this).data('id');

			approvalRequests.push(
				$.ajax({
					url: "api/requestapproval/approvedCustomerData",
					type: "POST",
					data: {
						id: id,
						isApproved: 1
					}
				})
			);
		});

		$.when.apply($, approvalRequests)
			.done(function() {
				alert("APPROVED SUCCESSFULLY!");
				location.reload();
			})
			.fail(function(xhr) {
				console.error("ERROR APPROVING CUSTOMERS:", xhr.responseText);
				alert("ERROR APPROVING CUSTOMERS. PLEASE CHECK THE DATA.");
			});
	});

});


// LOAD ALL UNAPPROVED CUSTOMERS
function loadCustomerKYCData() {

	$.ajax({
		url: "api/requestapproval/unapproved",
		type: "GET",
		dataType: "json",

		success: function(response) {

			console.log("UNAPPROVED CUSTOMERS RESPONSE:", response);

			if (response && Array.isArray(response.data)) {

				allKYCData = response.data;

				renderTable(allKYCData);

			} else {

				allKYCData = [];
				renderTable([]);

				console.warn("CUSTOMER DATA IS NOT AVAILABLE IN RESPONSE.DATA");
			}
		},

		error: function(xhr, status, error) {

			console.error("ERROR FETCHING CUSTOMER DATA:", error);
			console.error("SERVER RESPONSE:", xhr.responseText);

			allKYCData = [];
			renderTable([]);

			if (xhr.status === 404) {
				console.log("NO UNAPPROVED CUSTOMERS FOUND.");
			} else {
				alert("FAILED TO LOAD DATA.");
			}
		}
	});
}


// LOAD ALL BRANCHES IN DROPDOWN
function loadBranchDropdown() {

	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		dataType: "json",

		success: function(response) {

			if (response && response.status === "OK" &&
				Array.isArray(response.data)) {

				const branchList = response.data;

				$("#branchName").empty();
				$("#branchName").append(
					"<option value=''>-- SELECT BRANCH --</option>"
				);

				$("#branch").empty();
				$("#branch").append(
					"<option value=''>-- SELECT BRANCH --</option>"
				);

				for (let i = 0; i < branchList.length; i++) {

					const branch = branchList[i];
					const branchName = branch.branchName || "";

					const option = $("<option></option>")
						.val(branchName)
						.text(branchName);

					$("#branchName").append(option.clone());
					$("#branch").append(option);
				}

			} else {
				console.error("BRANCH DATA NOT FOUND:", response);
				alert("ERROR: " + (RESPONSE.MESSAGE || "BRANCH DATA NOT FOUND."));
			}
		},

		error: function(xhr, status, error) {
			console.error("ERROR LOADING BRANCHES:", error);
			console.error("SERVER RESPONSE:", xhr.responseText);
			alert("FAILED TO LOAD DROPDOWN DATA.");
		}
	});
}


// RENDER CUSTOMER TABLE
function renderTable(data) {

	const tbody = $(".datatable tbody");
	tbody.empty();

	if (!Array.isArray(data) || data.length === 0) {

		tbody.append(`
            <tr>
                <td colspan="12"
                    style="text-align:center; font-family:'Poppins',sans-serif;">
                    NO DATA FOUND
                </td>
            </tr>
        `);

		return;
	}

	data.forEach(function(item, index) {

		// NULL-SAFE STRING CONVERSION
		const safeText = function(value) {
			return value == null ? "" : String(value);
		};

		// BUILD FULL NAME
		const fullName = [
			item.firstName,
			item.middleName,
			item.lastName
		]
			.filter(function(name) {
				return name != null && String(name).trim() !== "";
			})
			.join(" ");

		const branchName = safeText(item.branchName);
		const customerGender = safeText(item.customerGender);
		const customerAddress = safeText(item.customerAddress);
		const contactNo = safeText(item.contactNo);
		const emailId = safeText(item.emailId);

		const row = `
            <tr style="font-family:'Poppins',sans-serif;">

                <td>
                    <input type="checkbox"
                        class="approval-checkbox"
                        data-id="${safeText(item.id)}"
                        ${item.isApproved === true ? "checked" : ""} />
                </td>

                <td>${index + 1}</td>

                <td>${safeText(fullName).toUpperCase() || "-"}</td>

                <td>${safeText(item.memberCode) || "-"}</td>

                <td>${safeText(item.accountNumber) || "-"}</td>

                <td>${branchName.toUpperCase() || "-"}</td>

                <td>${safeText(item.dob) || "-"}</td>

                <td>${safeText(item.customerAge) || "-"}</td>

                <td>${customerGender.toUpperCase() || "-"}</td>

                <td>${customerAddress.toUpperCase() || "-"}</td>

                <td>${contactNo.toUpperCase() || "-"}</td>

                <td>${emailId.toUpperCase() || "-"}</td>

            </tr>
        `;

		tbody.append(row);
	});
}


// FILTER TABLE

function filterKYCData() {

	const selectedCode = $('#branchName').val();
	const selectedAccountNumber = $('#accountNumber').val().trim().toLowerCase();

	const fromDateVal = $('#fromDate').val();
	const toDateVal = $('#toDate').val();

	const fromDate = fromDateVal ? new Date(fromDateVal) : null;
	const toDate = toDateVal ? new Date(toDateVal) : null;

	const filtered = allKYCData.filter(function(item) {

		const branchName = item.branchName || "";
		const accountNumber = String(item.accountNumber || "").trim().toLowerCase();
		const dateStr = item.signupDate || item.dob;
		const dob = dateStr ? new Date(dateStr) : null;

		// BRANCH FILTER
		const matchesBranch = selectedCode
			? branchName === selectedCode
			: true;

		// ACCOUNT NUMBER FILTER
		const matchesAccountNumber = selectedAccountNumber
			? accountNumber.includes(selectedAccountNumber)
			: true;

		// DATE FILTER
		if (!dob && (fromDate || toDate)) {
			return false;
		}

		const matchesFrom = fromDate
			? dob >= fromDate
			: true;

		const matchesTo = toDate
			? dob < new Date(
				toDate.getFullYear(),
				toDate.getMonth(),
				toDate.getDate() + 1
			)
			: true;

		return matchesBranch &&
			matchesAccountNumber &&
			matchesFrom &&
			matchesTo;
	});

	renderTable(filtered);
}

