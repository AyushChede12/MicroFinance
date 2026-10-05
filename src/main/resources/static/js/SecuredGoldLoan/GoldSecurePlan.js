$(document).ready(function() {
	// SAVE Button
	$("#saveBtn").on("click", function() {
		submitGoldLoanForm("save");
	});

	// UPDATE Button
	$("#updateBtn").on("click", function() {
		submitGoldLoanForm("update");
	});

	function submitGoldLoanForm(mode) {
		const id = $("#goldLoanId").val();

		const goldLoanData = {
			id: mode === "update" && id ? parseInt(id) : null,
			loanPlanName: $("#loanPlanName").val(),
			typeOfLoan: $("#typeOfLoan").val(),
			loanMode: $("#loanMode").val(),
			interestType: $("#interestType").val(),
			emiType: $("#emiType").val(),
			minAge: $("#minAge").val(),
			maxAge: $("#maxAge").val(),
			minAmt: $("#minAmt").val(),
			maxAmt: $("#maxAmt").val(),
			minTerm: $("#minTerm").val(),
			maxTerm: $("#maxTerm").val(),
			rateInterestType: $("#rateInterestType").val(),
			securityType: $("#securityType").val(),
			planStatus: $("#toggle-plan-status").is(":checked") ? 1 : 0,
			procFee: $("#procFee").val(),

			// Late Penalty
			legalCharge: $("#legalCharge").val(),
			gst: $("#gst").val(),
			insuFee: $("#insuFee").val(),
			valuFee: $("#valuFee").val(),

			lateAllowanceDay: $("#lateAllowanceDay").val(),
			penaltyMode: $("#penaltyMode").val(),
			monthlyPenalty: $("#monthlyPenalty").val()
		};

		$.ajax({
			type: "POST",
			url: "api/securedGoldLoan/saveGoldSecurePlan",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(goldLoanData),
			success: function(response) {
				alert("success");
				// ✅ Check numeric status code instead of "OK"
				if ((response.status === 200 || response.status === "OK")) {
					if(mode=="save"){
						alert("Gold Data Saved Successfully");
					}
					else{
						alert("Gold Data Updated Successfully");
					}
					loadLoanTable(); // refresh the table
				} else {
					alert("Failed: " + response.message);
				}
			},
			error: function(xhr) {
				alert("Error occurred: " + xhr.responseText);
			}
		});
	}

	// Initial table load
	loadLoanTable();
});

function loadLoanTable() {
	$.ajax({
		url: "api/securedGoldLoan/allDataFetchGoldSecurePlan",
		type: "GET",
		dataType: "json",
		success: function(response) {
			let rows = "";

			// ✅ Handle status properly (200 or "OK")
			if ((response.status === 200 || response.status === "OK") && Array.isArray(response.data)) {
				response.data.forEach(function(loan) {
					rows += `
                        <tr>
                            <td>${loan.id}</td>
                            <td>${loan.loanPlanName || "-"}</td>
                            <td>${loan.typeOfLoan || "-"}</td>
                            <td>${loan.minAge || "-"}</td>
                            <td>${loan.maxAge || "-"}</td>
                            <td>${loan.emiType || "-"}</td>
                            <td>
                                <button class="btn btn-sm btn-warning" onclick="editLoanById(${loan.id})">
                                    <i class="fa fa-edit"></i>
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-danger" onclick="deleteLoan(${loan.id})">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
				});
			} else {
				rows = "<tr><td colspan='9'>No data found</td></tr>";
			}

			$("#loanTableBody").html(rows);
		},
		error: function(xhr) {
			console.error("Error loading table:", xhr.statusText);
			$("#loanTableBody").html("<tr><td colspan='9'>Error loading data</td></tr>");
		}
	});
}

function editLoanById(id) {
	$.ajax({
		url: "api/securedGoldLoan/getGoldLoanByIdEdite",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if (response.status === "OK") {
				const loan = response.data;

				$('#goldLoanId').val(loan.id); // Hidden field
				$('#loanPlanName').val(loan.loanPlanName);
				$('#typeOfLoan').val(loan.typeOfLoan);
				$('#loanMode').val(loan.loanMode);
				$('#interestType').val(loan.interestType);
				$('#emiType').val(loan.emiType);
				$('#minAge').val(loan.minAge);
				$('#maxAge').val(loan.maxAge);
				$('#loanAmt').val(loan.loanAmt);
				$('#loanTerm').val(loan.loanTerm);
				$('#rateInterestType').val(loan.rateInterestType);
				$('#securityType').val(loan.securityType);


				$('#procFee').val(loan.procFee);
				$('#legalCharge').val(loan.legalCharge);
				$('#gst').val(loan.gst);
				$('#insuFee').val(loan.insuFee);
				$('#valuFee').val(loan.valuFee);
				$('#lateAllowanceDay').val(loan.lateAllowanceDay);
				$('#penaltyMode').val(loan.penaltyMode);
				$('#monthlyPenalty').val(loan.monthlyPenalty);

				// ✅ Set toggle checked based on planStatus value
				$('#toggle-plan-status').prop('checked', parseInt(loan.planStatus) === 1);
				updateToggleColor(document.getElementById('planStatus'));
			} else {
				alert("Gold Loan not found: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Error fetching loan details: " + xhr.responseText);
		}
	});
}

function updateToggleColor(input) {
	const label = input.nextElementSibling;
	if (input.checked) {
		label.style.backgroundColor = "#4caf50";  // green
		label.style.borderColor = "#4caf50";
	} else {
		label.style.backgroundColor = "#ccc";  // gray
		label.style.borderColor = "#ccc";
	}
}

function deleteLoan(id) {
    if (confirm("Are you sure you want to delete this Goldloan?")) {
        $.ajax({
            url: "api/securedGoldLoan/deleteGoldLoanById?id=" + id, // pass id as query param
            type: "POST", // must remain POST because backend uses @PostMapping
            success: function(response) {
                if (response.status === "OK" || response.status === 200) {
                    alert("Loan deleted successfully");
                    loadLoanTable();
                } else {
                    alert("Failed to delete: " + response.message);
                }
            },
            error: function(xhr, status, error) {
                alert("Error while deleting loan: " + error);
            }
        });
    }
}

