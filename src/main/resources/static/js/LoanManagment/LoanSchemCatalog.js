$(document).ready(function() {

	$("#updateBtn").hide();

	// ==============================
	// SAVE BUTTON
	// ==============================
	$("#saveBtn").on("click", function(e) {
		e.preventDefault();
		convertTextToUppercase();
		if (!validateLoanSchemeForm()) {
			return;
		}
		submitLoanForm("save");
	});

	// ==============================
	// UPDATE BUTTON
	// ==============================
	$("#updateBtn").on("click", function(e) {
		e.preventDefault();
		convertTextToUppercase();
		if (!validateLoanSchemeForm()) {
			return;
		}
		submitLoanForm("update");
	});

	// ==============================
	// CLEAR BUTTON
	// ==============================
	$("#clearBtn").on("click", function(e) {
		e.preventDefault();
		clearLoanForm();
		$("#saveBtn").show();
		$("#updateBtn").hide();
	});

	// Load Table at startup
	loadLoanTable();
});

// ============================================
// CONVERT TEXT TO UPPERCASE
// ============================================
function convertTextToUppercase() {
	$("input[type=text], textarea").each(function() {
		if ($(this).val()) {
			$(this).val($(this).val().toUpperCase());
		}
	});
}

// ============================================
// VALIDATION FUNCTION
// ============================================
function validateLoanSchemeForm() {

	// Clear all previous error messages
	$("#chkloanplanname, #chkloantype, #chkage, #chkinteresttype, #chkloanterm, #chkloanamount, #chkloanmode, #chkroi, #chksecuritytype, #chkemitype, #chkprocessingfee, #chklegalcharges, #chkgst, #chkinsurancefee, #chkvaluationfee, #chklateallowanceday, #chkmonthlypenalty")
		.text("");

	let loanPlaneName = ($("#loanPlaneName").val() || "").trim();
	let typeLoan = ($("#typeLoan").val() || "").trim();
	let age = ($("#age").val() || "").trim();
	let typeIntrest = ($("#typeIntrest").val() || "").trim();
	let loanTerm = ($("#loanTerm").val() || "").trim();
	let loanAmount = ($("#loanAmount").val() || "").trim();
	let loanMode = ($("#loanMode").val() || "").trim();
	let rateIntrestType = ($("#rateIntrestType").val() || "").trim();
	let typesecurity = ($("#typesecurity").val() || "").trim();
	let emiType = ($("#emiType").val() || "").trim();

	let feeProcessing = ($("#feeProcessing").val() || "").trim();
	let chargesLegal = ($("#chargesLegal").val() || "").trim();
	let gst = ($("#gst").val() || "").trim();
	let feeInsurence = ($("#feeInsurence").val() || "").trim();
	let feeValuation = ($("#feeValuation").val() || "").trim();

	let lateAllowanceday = ($("#lateAllowanceday").val() || "").trim();
	let modePanalty = ($("#modePanalty").val() || "").trim();
	let pennaltyMonthly = ($("#pennaltyMonthly").val() || "").trim();

	// Numeric Patterns
	let numberPattern = /^[0-9]+(\.[0-9]{1,2})?$/;
	let intPattern = /^[0-9]+$/;

	// 1) Loan Plan Name
	if (loanPlaneName === "") {
		$("#chkloanplanname").text("* LOAN PLAN NAME IS REQUIRED");
		$("#loanPlaneName").focus();
		return false;
	}

	// 2) Type of Loan
	if (typeLoan === "" || typeLoan === "SELECT TYPE OF LOAN") {
		$("#chkloantype").text("* PLEASE SELECT TYPE OF LOAN");
		$("#typeLoan").focus();
		return false;
	}

	// 3) Age
	if (age === "") {
		$("#chkage").text("* AGE IS REQUIRED");
		$("#age").focus();
		return false;
	} else if (!intPattern.test(age)) {
		$("#chkage").text("* AGE MUST BE A VALID NUMBER");
		$("#age").focus();
		return false;
	}

	// 4) Interest Type
	if (typeIntrest === "" || typeIntrest === "SELECT ROI TYPE") {
		$("#chkinteresttype").text("* PLEASE SELECT INTEREST TYPE");
		$("#typeIntrest").focus();
		return false;
	}

	// 5) Loan Term
	if (loanTerm === "") {
		$("#chkloanterm").text("* LOAN TERM IS REQUIRED");
		$("#loanTerm").focus();
		return false;
	} else if (!intPattern.test(loanTerm)) {
		$("#chkloanterm").text("* LOAN TERM MUST BE A VALID NUMBER");
		$("#loanTerm").focus();
		return false;
	}

	// 6) Loan Amount
	if (loanAmount === "") {
		$("#chkloanamount").text("* LOAN AMOUNT IS REQUIRED");
		$("#loanAmount").focus();
		return false;
	} else if (!numberPattern.test(loanAmount)) {
		$("#chkloanamount").text("* ENTER VALID LOAN AMOUNT");
		$("#loanAmount").focus();
		return false;
	}

	// 7) Loan Mode
	if (loanMode === "" || loanMode === "SELECT LOAN MODE") {
		$("#chkloanmode").text("* PLEASE SELECT LOAN MODE");
		$("#loanMode").focus();
		return false;
	}

	// 8) Rate Interest Type (ROI % P.A.)
	if (rateIntrestType === "") {
		$("#chkroi").text("* RATE OF INTEREST IS REQUIRED");
		$("#rateIntrestType").focus();
		return false;
	} else if (!numberPattern.test(rateIntrestType)) {
		$("#chkroi").text("* ENTER VALID RATE OF INTEREST (%)");
		$("#rateIntrestType").focus();
		return false;
	}

	// 9) Security Type
	if (typesecurity === "" || typesecurity === "SELECT SECURITY") {
		$("#chksecuritytype").text("* PLEASE SELECT SECURITY TYPE");
		$("#typesecurity").focus();
		return false;
	}

	// 10) EMI Type
	if (emiType === "" || emiType === "SELECT EMI TYPE") {
		$("#chkemitype").text("* PLEASE SELECT EMI TYPE");
		$("#emiType").focus();
		return false;
	}

	// 11) Deductions
	if (feeProcessing === "") {
		$("#chkprocessingfee").text("* PROCESSING FEE IS REQUIRED");
		$("#feeProcessing").focus();
		return false;
	} else if (!numberPattern.test(feeProcessing) || parseFloat(feeProcessing) < 0 || parseFloat(feeProcessing) > 100) {
		$("#chkprocessingfee").text("* ENTER VALID PROCESSING FEE (0 - 100)");
		$("#feeProcessing").focus();
		return false;
	}

	if (chargesLegal === "") {
		$("#chklegalcharges").text("* LEGAL CHARGES IS REQUIRED");
		$("#chargesLegal").focus();
		return false;
	} else if (!numberPattern.test(chargesLegal) || parseFloat(chargesLegal) < 0 || parseFloat(chargesLegal) > 100) {
		$("#chklegalcharges").text("* ENTER VALID LEGAL CHARGES (0 - 100)");
		$("#chargesLegal").focus();
		return false;
	}

	if (gst === "") {
		$("#chkgst").text("* GST IS REQUIRED");
		$("#gst").focus();
		return false;
	} else if (!numberPattern.test(gst) || parseFloat(gst) < 0 || parseFloat(gst) > 28) {
		$("#chkgst").text("* GST MUST BE BETWEEN 0 TO 28");
		$("#gst").focus();
		return false;
	}

	if (feeInsurence === "") {
		$("#chkinsurancefee").text("* INSURANCE FEE IS REQUIRED");
		$("#feeInsurence").focus();
		return false;
	} else if (!numberPattern.test(feeInsurence) || parseFloat(feeInsurence) < 0 || parseFloat(feeInsurence) > 100) {
		$("#chkinsurancefee").text("* ENTER VALID INSURANCE FEE (0 - 100)");
		$("#feeInsurence").focus();
		return false;
	}

	if (feeValuation === "") {
		$("#chkvaluationfee").text("* VALUATION FEE IS REQUIRED");
		$("#feeValuation").focus();
		return false;
	} else if (!numberPattern.test(feeValuation) || parseFloat(feeValuation) < 0 || parseFloat(feeValuation) > 100) {
		$("#chkvaluationfee").text("* ENTER VALID VALUATION FEE (0 - 100)");
		$("#feeValuation").focus();
		return false;
	}

	// 12) Late Fine Details
	if (lateAllowanceday === "") {
		$("#chklateallowanceday").text("* LATE ALLOWANCE DAY IS REQUIRED");
		$("#lateAllowanceday").focus();
		return false;
	} else if (!intPattern.test(lateAllowanceday) || parseInt(lateAllowanceday, 10) < 0) {
		$("#chklateallowanceday").text("* ENTER VALID LATE ALLOWANCE DAYS");
		$("#lateAllowanceday").focus();
		return false;
	}

	if (modePanalty === "" || modePanalty === "SELECT PENALTY TYPE") {
		alert("PLEASE SELECT PENALTY MODE");
		$("#modePanalty").focus();
		return false;
	}

	if (pennaltyMonthly === "") {
		$("#chkmonthlypenalty").text("* MONTHLY PENALTY IS REQUIRED");
		$("#pennaltyMonthly").focus();
		return false;
	} else if (!numberPattern.test(pennaltyMonthly) || parseFloat(pennaltyMonthly) < 0) {
		$("#chkmonthlypenalty").text("* ENTER VALID MONTHLY PENALTY");
		$("#pennaltyMonthly").focus();
		return false;
	}

	return true;
}

// ============================================
// COMMON AJAX FUNCTION FOR SAVE / UPDATE
// ============================================
function submitLoanForm(type) {

	let idVal = $("#loanId").val();
	let id = (idVal && !isNaN(idVal) && parseInt(idVal, 10) > 0) ? parseInt(idVal, 10) : null;

	const loanData = {
		id: type === "update" ? id : null,

		loanSchemeCode: ($("#loanSchemeCode").val() || "").trim() || null,
		loanPlaneName: ($("#loanPlaneName").val() || "").trim().toUpperCase(),
		typeLoan: $("#typeLoan").val(),
		age: ($("#age").val() || "").trim(),
		loanTerm: ($("#loanTerm").val() || "").trim(),
		emiType: $("#emiType").val(),
		loanAmount: ($("#loanAmount").val() || "").trim(),
		loanMode: $("#loanMode").val(),
		rateIntrestType: ($("#rateIntrestType").val() || "").trim(),
		typeIntrest: $("#typeIntrest").val(),
		typesecurity: $("#typesecurity").val(),

		// Deductions
		feeProcessing: ($("#feeProcessing").val() || "").trim(),
		chargesLegal: ($("#chargesLegal").val() || "").trim(),
		gst: ($("#gst").val() || "").trim(),
		feeInsurence: ($("#feeInsurence").val() || "").trim(),
		feeValuation: ($("#feeValuation").val() || "").trim(),

		// Late Penalty
		lateAllowanceday: ($("#lateAllowanceday").val() || "").trim(),
		modePanalty: $("#modePanalty").val(),
		pennaltyMonthly: ($("#pennaltyMonthly").val() || "").trim(),

		// Toggle value
		planStatus: $("#planStatus").is(":checked") ? "1" : "0"
	};

	$.ajax({
		type: "POST",
		url: "api/loanmanegment/saveLoanManagment",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(loanData),
		success: function(response) {
			if (response.status === "OK" || response.status === "CREATED") {
				if (type === "save") {
					alert("DATA SAVED SUCCESSFULLY");
				} else {
					alert("DATA UPDATED SUCCESSFULLY");
				}

				$("#saveBtn").show();
				$("#updateBtn").hide();

				clearLoanForm();
				loadLoanTable();
			} else {
				alert("FAILED: " + (response.message ? String(response.message).toUpperCase() : "FAILED TO SAVE LOAN SCHEME"));
			}
		},
		error: function(xhr) {
			let errorMsg = "ERROR OCCURRED WHILE SAVING LOAN SCHEME";
			try {
				if (xhr.responseJSON && xhr.responseJSON.message) {
					errorMsg = xhr.responseJSON.message;
				}
			} catch (e) {}
			alert(String(errorMsg).toUpperCase());
		}
	});
}

// ============================================
// CLEAR FORM FUNCTION
// ============================================
function clearLoanForm() {
	$("#loanId").val("");
	$("#loanSchemeCode").val("");
	$("#loanPlaneName").val("");
	$("#typeLoan").val("");
	$("#age").val("");
	$("#loanTerm").val("");
	$("#emiType").val("");
	$("#loanAmount").val("");
	$("#loanMode").val("");
	$("#rateIntrestType").val("");
	$("#typeIntrest").val("");
	$("#typesecurity").val("");

	$("#feeProcessing").val("");
	$("#chargesLegal").val("");
	$("#gst").val("");
	$("#feeInsurence").val("");
	$("#feeValuation").val("");

	$("#lateAllowanceday").val("");
	$("#modePanalty").val("");
	$("#pennaltyMonthly").val("");

	$("#planStatus").prop("checked", false);
	const planStatusEl = document.getElementById('planStatus');
	if (planStatusEl) {
		updateToggleColor(planStatusEl);
	}

	$("#chkloanplanname, #chkloantype, #chkage, #chkinteresttype, #chkloanterm, #chkloanamount, #chkloanmode, #chkroi, #chksecuritytype, #chkemitype, #chkprocessingfee, #chklegalcharges, #chkgst, #chkinsurancefee, #chkvaluationfee, #chklateallowanceday, #chkmonthlypenalty")
		.text("");
}

// ============================================
// LOAD TABLE DATA
// ============================================
function loadLoanTable() {
	$.ajax({
		url: "api/loanmanegment/allDataFetchLoanSchemCatelog",
		type: "GET",
		dataType: "json",
		success: function(response) {
			let rows = "";

			if ((response.status === "OK" || response.status === "FOUND") && Array.isArray(response.data)) {
				if (response.data.length === 0) {
					rows = "<tr><td colspan='8' class='text-center'>NO DATA FOUND</td></tr>";
				} else {
					response.data.forEach(function(loan) {
						const id = loan.id || "-";
						const loanPlaneName = (loan.loanPlaneName || "-").toString().toUpperCase();
						const typeLoan = (loan.typeLoan || "-").toString().toUpperCase();
						const age = (loan.age || "-").toString().toUpperCase();
						const loanTerm = (loan.loanTerm || "-").toString().toUpperCase();
						const emiType = (loan.emiType || "-").toString().toUpperCase();

						rows += `
	                        <tr>
	                            <td>${id}</td>
	                            <td>${loanPlaneName}</td>
	                            <td>${typeLoan}</td>
	                            <td>${age}</td>
	                            <td>${loanTerm}</td>
	                            <td>${emiType}</td>
	                            <td>
	                                <button type="button" class="btn btn-sm btn-warning" onclick="editLoanById(${loan.id})" title="EDIT">
	                                    <i class="fa fa-edit"></i>
	                                </button>
	                            </td>
	                            <td>
	                                <button type="button" class="btn btn-sm btn-danger" onclick="deleteLoan(${loan.id})" title="DELETE">
	                                    <i class="fa fa-trash"></i>
	                                </button>
	                            </td>
	                        </tr>
	                    `;
					});
				}
			} else {
				rows = "<tr><td colspan='8' class='text-center'>NO DATA FOUND</td></tr>";
			}

			$("#loanTableBody").html(rows);
		},
		error: function(xhr) {
			console.error("Error loading table:", xhr.statusText);
			$("#loanTableBody").html("<tr><td colspan='8' class='text-center text-danger'>ERROR LOADING DATA</td></tr>");
		}
	});
}

// ============================================
// EDIT LOAN BY ID
// ============================================
function editLoanById(id) {

	$("#updateBtn").show();
	$("#saveBtn").hide();

	$.ajax({
		url: "api/loanmanegment/getLoanByIdEdite",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if ($("#formid").length) {
				$('html, body').animate({
					scrollTop: $("#formid").offset().top - 80
				}, 300);
			}

			if ((response.status === "OK" || response.status === "FOUND") && response.data) {
				const loan = response.data;

				$('#loanId').val(loan.id);
				$('#loanSchemeCode').val(loan.loanSchemeCode || '');
				$('#loanPlaneName').val(loan.loanPlaneName || '');
				$('#typeLoan').val(loan.typeLoan || '');
				$('#age').val(loan.age || '');
				$('#loanTerm').val(loan.loanTerm || '');
				$('#emiType').val(loan.emiType || '');
				$('#loanAmount').val(loan.loanAmount || '');
				$('#loanMode').val(loan.loanMode || '');
				$('#rateIntrestType').val(loan.rateIntrestType || '');
				$('#typeIntrest').val(loan.typeIntrest || '');
				$('#typesecurity').val(loan.typesecurity || '');

				$('#feeProcessing').val(loan.feeProcessing || '');
				$('#chargesLegal').val(loan.chargesLegal || '');
				$('#gst').val(loan.gst || '');
				$('#feeInsurence').val(loan.feeInsurence || '');
				$('#feeValuation').val(loan.feeValuation || '');

				$('#lateAllowanceday').val(loan.lateAllowanceday || '');
				$('#modePanalty').val(loan.modePanalty || '');
				$('#pennaltyMonthly').val(loan.pennaltyMonthly || '');

				// Toggle
				const isChecked = String(loan.planStatus) === "1" || loan.planStatus === 1;
				$('#planStatus').prop('checked', isChecked);
				const planStatusEl = document.getElementById('planStatus');
				if (planStatusEl) {
					updateToggleColor(planStatusEl);
				}

			} else {
				alert("LOAN SCHEME NOT FOUND: " + (response.message ? String(response.message).toUpperCase() : ""));
			}
		},
		error: function(xhr) {
			alert("ERROR FETCHING LOAN DETAILS: " + (xhr.responseText ? xhr.responseText.toUpperCase() : ""));
		}
	});
}

// ============================================
// TOGGLE COLOR UPDATE
// ============================================
function updateToggleColor(input) {
	if (!input) return;
	const label = input.nextElementSibling;
	if (label) {
		if (input.checked) {
			label.style.backgroundColor = "#4caf50";
			label.style.borderColor = "#4caf50";
		} else {
			label.style.backgroundColor = "#ccc";
			label.style.borderColor = "#ccc";
		}
	}
}

// ============================================
// DELETE LOAN SCHEME
// ============================================
function deleteLoan(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS LOAN SCHEME?")) {
		$.ajax({
			url: "api/loanmanegment/deleteLoanById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status === "OK" || response.status === "FOUND") {
					alert("LOAN SCHEME DELETED SUCCESSFULLY");
					loadLoanTable();
				} else {
					alert("FAILED TO DELETE LOAN SCHEME: " + (response.message ? String(response.message).toUpperCase() : ""));
				}
			},
			error: function(xhr) {
				alert("ERROR WHILE DELETING LOAN SCHEME");
			}
		});
	}
}

function validateLoanAmount() {
	const loanAmount = document.getElementById("loanAmount").value;
	const error = document.getElementById("loanAmountError");

	if (loanAmount !== "" && Number(loanAmount) < 100000) {
		if (error) error.style.display = "block";
	} else {
		if (error) error.style.display = "none";
	}
}

// Expose functions globally for HTML onclick bindings
window.editLoanById = editLoanById;
window.deleteLoan = deleteLoan;
window.loadLoanTable = loadLoanTable;
window.clearLoanForm = clearLoanForm;
window.validateLoanAmount = validateLoanAmount;
window.updateToggleColor = updateToggleColor;
