$(document).ready(function() {
	const apiUrl = "api/financialconsultant/getAllFinancialConsultantDetails";

	// 1. Fetch Company Details from Preference Controller API
	function loadCompanyDetails() {
		$.ajax({
			url: "api/preference/getCompanyDetails",
			type: "GET",
			dataType: "json",
			success: function(response) {
				if (response) {
					const cName = (response.companyName || response.shortName || "").trim().toUpperCase();
					if (cName) {
						$("#companyNameHeader").text(cName);
					}
					let addrParts = [];
					if (response.address) addrParts.push(response.address.trim().toUpperCase());
					if (response.city) addrParts.push(response.city.trim().toUpperCase());
					if (response.state) addrParts.push(response.state.trim().toUpperCase());
					if (response.pinCode) addrParts.push(response.pinCode.trim());
					if (addrParts.length > 0) {
						$("#companyAddressHeader").text(addrParts.join(", "));
					}
				}
			},
			error: function(xhr, status, error) {
				console.warn("COULD NOT FETCH COMPANY DETAILS:", error);
				if (!$("#companyNameHeader").text() || $("#companyNameHeader").text() === "LOADING COMPANY...") {
					$("#companyNameHeader").text("CO OPERATIVE SOCIETY LTD NAGPUR");
				}
			}
		});
	}

	// Always load company details if companyNameHeader element is present on ID Card page
	if ($("#companyNameHeader").length > 0) {
		loadCompanyDetails();
	}

	// 2. Render Table on listing page
	function renderTable(data) {
		let tableBody = "";
		if (!data || data.length === 0) {
			$("table tbody").html(`<tr><td colspan="13" class="text-center">NO FINANCIAL CONSULTANTS FOUND</td></tr>`);
			return;
		}

		$.each(data, function(index, item) {
			let statusText = (item.financialStatus === "1" || item.financialStatus === "ACTIVE" || item.financialStatus === true) ? "ACTIVE" : "INACTIVE";
			let statusBadge = statusText === "ACTIVE" 
				? '<span class="badge bg-success text-white">ACTIVE</span>' 
				: '<span class="badge bg-danger text-white">INACTIVE</span>';

			tableBody += `
                <tr style="font-family: 'Poppins', sans-serif;">
                    <td>${index + 1}</td>
                    <td class="text-center"><input type="checkbox" class="selectCheckbox" data-code="${item.financialCode}"></td>
                    <td><strong>${item.financialCode || ''}</strong></td>
                    <td>${(item.financialName || '').toUpperCase()}</td>
                    <td>${item.contactNo || ''}</td>
                    <td>${(item.branchName || '').toUpperCase()}</td>
                    <td>${(item.address || item.customerAddress || '').toUpperCase()}</td>
                    <td>${(item.district || '').toUpperCase()}</td>
                    <td>${(item.state || '').toUpperCase()}</td>
                    <td>${item.pinCode || ''}</td>
                    <td>${(item.selectPosition || 'CONSULTANT').toUpperCase()}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary generateBtn" data-code="${item.financialCode}" title="GENERATE ID CARD">
                            <i class="fa-solid fa-id-card"></i> GENERATE
                        </button>
                    </td>
                </tr>`;
		});
		$("table tbody").html(tableBody);
	}

	// 3. Fetch and Filter Data
	function fetchAndFilter(keyword = "") {
		$.ajax({
			url: apiUrl,
			type: "POST",
			contentType: "application/json",
			success: function(response) {
				let data = response.data || [];
				if (keyword) {
					keyword = keyword.toUpperCase();
					data = data.filter(c => 
						(c.financialCode && c.financialCode.toUpperCase().includes(keyword)) ||
						(c.financialName && c.financialName.toUpperCase().includes(keyword))
					);
				}
				renderTable(data);
			},
			error: function() {
				alert("ERROR FETCHING FINANCIAL CONSULTANT DATA.");
			}
		});
	}

	// 4. Live Search
	$("#searchKeyword").on("input keyup", function() {
		let keyword = $(this).val().trim();
		fetchAndFilter(keyword);
	});

	// 5. Initial Load (only if search input exists)
	if ($("#searchKeyword").length > 0) {
		fetchAndFilter();
	}

	// 6. On Generate Button Click
	$(document).on('click', '.generateBtn', function() {
		const financialCode = $(this).data('code');
		const checkbox = $(`.selectCheckbox[data-code="${financialCode}"]`);

		if (checkbox.is(':checked')) {
			window.location.href = `IDCardFinancial?financialCode=${financialCode}`;
		} else {
			alert("PLEASE CHECK THE CHECKBOX TO GENERATE THE ID CARD.");
		}
	});

	// 7. ID CARD PAGE - POPULATE CONSULTANT DETAILS
	const urlParams = new URLSearchParams(window.location.search);
	const finCode = urlParams.get('financialCode');

	if (finCode && $("#financialCode").length > 0) {
		$.ajax({
			url: `api/financialconsultant/getfinancialHierarchyByFinancialCode?financialCode=${finCode}`,
			type: "GET",
			success: function(response) {
				const data = response.data && response.data.length > 0 ? response.data[0] : null;
				if (data) {
					$("#financialCode").text(data.financialCode || '—');
					$("#financialName").text((data.financialName || '—').toUpperCase());
					$("#selectPosition").text((data.selectPosition || 'FINANCIAL CONSULTANT').toUpperCase());
					$("#dob").text(data.dob || '—');
					$("#age").text(data.age || '—');
					$("#contactNo").text(data.contactNo || '—');
					$("#district").text((data.district || '—').toUpperCase());
					$("#state").text((data.state || '—').toUpperCase());
					$("#branchName").text((data.branchName || '—').toUpperCase());

					if (data.financialPhoto) {
						const img = `Uploads/${data.financialPhoto}`;
						$("#idCardPhoto").attr("src", img);
						$("#photoHidden").val(img);
					}
					if (data.finnacialSignature) {
						const img = `Uploads/${data.finnacialSignature}`;
						$("#idCardSignature").attr("src", img);
						$("#signatureHidden").val(img);
					}

				} else {
					alert("NO DATA FOUND FOR FINANCIAL CODE: " + finCode.toUpperCase());
				}
			},
			error: function() {
				alert("COULD NOT LOAD FINANCIAL CONSULTANT DETAILS FOR ID CARD.");
			}
		});
	}
});
