$(document).ready(function() {
	$.ajax({
		url: 'api/securedGoldLoan/getchAllApprovedGoldCustomer',
		type: 'GET',
		success: function(response) {
			// Check data
			if (!(response && response.data && Array.isArray(response.data))) {
				alert("No Gold Data found.");
				return;
			}

			// 👉 Step 1: Distinct Set banaye
			let distinctMap = new Map();
			// Map use kiya taaki GoldID ke hisab se latest/first customerName bhi mil jaye

			response.data.forEach(function(item) {
				let goldId = item.goldID || item.goldId;
				if (goldId && goldId.trim() !== "") {
					distinctMap.set(goldId.trim(), item.customerName);
				}
			});

			// 👉 Step 2: Select2 ke liye data convert
			let goldOptions = [];
			distinctMap.forEach((customerName, goldId) => {
				goldOptions.push({
					id: goldId,
					text: goldId + " - " + customerName
				});
			});

			// 👉 Step 3: Select2 Initialize (distinct data)
			$('#findByGoldLoanId').select2({
				placeholder: '-- Search Gold ID --',
				data: goldOptions,
				matcher: function(params, data) {
					if ($.trim(params.term) === '') return data;
					if (typeof data.text === 'undefined') return null;

					const term = params.term.toLowerCase();
					const text = data.text.toLowerCase();
					return text.includes(term) ? data : null;
				}
			});
		},
		error: function(xhr, status, error) {
			console.error("Error fetching Gold Data:", error);
			alert("Failed to load Gold ID.");
		}
	});

	$("#findByGoldLoanId").change(function() {
		let findByGoldLoanId = $("#findByGoldLoanId").val();
		if (findByGoldLoanId !== "") {
			$.ajax({
				url: "api/securedGoldLoan/getByGoldIDforApproval",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify({
					goldID: findByGoldLoanId
				}),
				success: function(response) {
					if (response.status == "OK") {
						let data = response.data[0];
						$("#customerCode").val(data.memberCode);
						$("#customerName").val(data.customerName.toUpperCase());
						$("#branchName").val(data.branchName.toUpperCase());
						$("#loanPlanName").val(data.loanPlanName.toUpperCase());
						$("#financialConsultantId").val(data.financialConsultantId);
						$("#financialConsultantName").val(data.financialConsultantName);

					} else {
						alert("No customer found for this member code.");
					}
				},
				error: function() {
					alert("Member not found or server error.");
				}
			});
		}
	});
});

$(document).ready(function() {

	$("#searchButtonGold").click(function(e) {
		e.preventDefault();

		// Collect filter values
		let filter = {
			goldID: $("#findByGoldLoanId").val().trim(),
			customerName: $("#customerName").val().trim().toLowerCase(),
			customerCode: $("#customerCode").val().trim().toLowerCase(),
			loanPlanName: $("#loanPlanName").val().trim().toLowerCase(),
			financialId: $("#financialConsultantId").val().trim().toLowerCase(),
			financialName: $("#financialConsultantName").val().trim().toLowerCase(),
			fromDate: $("#fromDate").val(),
			toDate: $("#toDate").val()
		};

		// API call
		$.ajax({
			url: "api/securedGoldLoan/getAllGoldLoanCustomer",
			type: "GET",
			success: function(response) {

				let list = response.data || [];

				// FRONTEND FILTERING
				let filtered = list.filter(row => {

					// Gold ID
					if (filter.goldID && row.goldID != filter.goldID) return false;

					// Customer Name
					if (filter.customerName &&
						!row.customerName.toLowerCase().includes(filter.customerName))
						return false;

					// Customer Code
					if (filter.customerCode &&
						!row.memberCode.toLowerCase().includes(filter.customerCode))
						return false;

					// Loan Plan Name
					if (filter.loanPlanName &&
						!row.loanPlanName.toLowerCase().includes(filter.loanPlanName))
						return false;

					// Financial Consultant ID
					if (filter.financialId &&
						!row.financialConsultantId.toLowerCase().includes(filter.financialId))
						return false;

					// Financial Consultant Name
					if (filter.financialName &&
						!row.financialConsultantName.toLowerCase().includes(filter.financialName))
						return false;

					// Date Range Filter
					if (filter.fromDate && filter.toDate) {
						let ld = new Date(row.loanDate);
						let fd = new Date(filter.fromDate);
						let td = new Date(filter.toDate);
						if (ld < fd || ld > td) return false;
					}

					return true;
				});

				// POPULATE TABLE
				renderTable(filtered);
			}
		});
	});
});

// FUNCTION TO RENDER TABLE
function renderTable(data) {
	let tbody = $(".datatable tbody");
	tbody.empty();

	if (data.length === 0) {
		tbody.append(`<tr><td colspan="16" class="text-center">No Records Found</td></tr>`);
		return;
	}

	data.forEach((item, index) => {
		tbody.append(`
            <tr>
                <td>${index + 1}</td>
                <td>${item.goldID}</td>
                <td>${item.customerName}</td>
                <td>${item.memberCode}</td>
                <td>${item.contactNo}</td>
                <td>${item.address}</td>
                <td>${item.branchName}</td>
                <td>${item.loanPlanName}</td>
                <td>${item.typeOfLoan}</td>
                <td>${item.loanMode}</td>
                <td>${item.loanDate}</td>
                <td>${item.loanTerm}</td>
                <td>${item.loanAmount}</td>
                <td>${item.emiPayment}</td>
                <td>${item.itemName}</td>
                <td>${item.purposeOfLoan}</td>
            </tr>
        `);
	});
}
