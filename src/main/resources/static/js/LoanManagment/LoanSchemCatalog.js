$(document).ready(function() {

	$("#updateBtn").hide();

	// ==============================
	// ✅ SAVE BUTTON
	// ==============================
	$("#saveBtn").on("click", function(e) {
		e.preventDefault();

		// ✅ Convert text fields to uppercase
		convertTextToUppercase();

		// ✅ Validation
		if (!validateLoanSchemeForm()) {
			return;
		}

		// ✅ Submit form
		submitLoanForm("save");
	});


	// ==============================
	// ✅ UPDATE BUTTON
	// ==============================
	$("#updateBtn").on("click", function(e) {
		e.preventDefault();

		// ✅ Convert text fields to uppercase
		convertTextToUppercase();

		// ✅ Validation
		if (!validateLoanSchemeForm()) {
			return;
		}

		// ✅ Submit form
		submitLoanForm("update");
	});


	// ✅ Load Table at start
	loadLoanTable();
});


// ============================================
// ✅ COMMON FUNCTION TO CONVERT TEXT TO UPPERCASE
// ============================================
function convertTextToUppercase() {
	$("input[type=text], textarea").each(function() {
		if ($(this).val()) {
			$(this).val($(this).val().toUpperCase());
		}
	});
}


// ============================================
// ✅ VALIDATION FUNCTION (Same file me add karo)
// ============================================
function validateLoanSchemeForm() {

	// ✅ Clear all previous errors
	$("#chkloanplanname, #chkloantype, #chkage, #chkinteresttype, #chkloanterm, #chkloanamount, #chkloanmode, #chkroi, #chksecuritytype, #chkemitype, #chkprocessingfee, #chklegalcharges, #chkgst, #chkinsurancefee, #chkvaluationfee, #chklateallowanceday, #chkmonthlypenalty")
		.text("");

	let loanPlaneName = $("#loanPlaneName").val().trim();
	let typeLoan = $("#typeLoan").val().trim();
	let age = $("#age").val().trim();
	let typeIntrest = $("#typeIntrest").val().trim();
	let loanTerm = $("#loanTerm").val().trim();
	let loanAmount = $("#loanAmount").val().trim();
	let loanMode = $("#loanMode").val().trim();
	let rateIntrestType = $("#rateIntrestType").val().trim();
	let typesecurity = $("#typesecurity").val().trim();
	let emiType = $("#emiType").val().trim();

	let feeProcessing = $("#feeProcessing").val().trim();
	let chargesLegal = $("#chargesLegal").val().trim();
	let gst = $("#gst").val().trim();
	let feeInsurence = $("#feeInsurence").val().trim();
	let feeValuation = $("#feeValuation").val().trim();

	let lateAllowanceday = $("#lateAllowanceday").val().trim();
	let modePanalty = $("#modePanalty").val().trim();
	let pennaltyMonthly = $("#pennaltyMonthly").val().trim();

	// ✅ Patterns
	let numberPattern = /^[0-9]+(\.[0-9]{1,2})?$/;
	let intPattern = /^[0-9]+$/;

	// ==========================
	// ✅ Required Validations
	// ==========================

	// 1) Loan Plan Name
	if (loanPlaneName === "") {
		$("#chkloanplanname").text("* Loan Plan Name is required");
		$("#loanPlaneName").focus();
		return false;
	}

	// 2) Type of Loan
	if (typeLoan === "" || typeLoan === "SELECT TYPE OF LOAN") {
		$("#chkloantype").text("* Please select Type of Loan");
		$("#typeLoan").focus();
		return false;
	}

	// 3) Age
	if (age === "") {
		$("#chkage").text("* Age is required");
		$("#age").focus();
		return false;
	} else if (!intPattern.test(age)) {
		$("#chkage").text("* Age must be a number");
		$("#age").focus();
		return false;
	} else if (parseInt(age) < 18 || parseInt(age) > 70) {
		$("#chkage").text("* Age must be between 18 to 70");
		$("#age").focus();
		return false;
	}

	// 4) Interest Type
	if (typeIntrest === "" || typeIntrest === "SELECT ROI TYPE") {
		$("#chkinteresttype").text("* Please select Interest Type");
		$("#typeIntrest").focus();
		return false;
	}

	// 5) Loan Term
	if (loanTerm === "") {
		$("#chkloanterm").text("* Loan Term is required");
		$("#loanTerm").focus();
		return false;
	} else if (!intPattern.test(loanTerm)) {
		$("#chkloanterm").text("* Loan Term must be a number");
		$("#loanTerm").focus();
		return false;
	} else if (parseInt(loanTerm) <= 0) {
		$("#chkloanterm").text("* Loan Term must be greater than 0");
		$("#loanTerm").focus();
		return false;
	}

	// 6) Loan Amount
	if (loanAmount === "") {
		$("#chkloanamount").text("* Loan Amount is required");
		$("#loanAmount").focus();
		return false;
	} else if (!numberPattern.test(loanAmount)) {
		$("#chkloanamount").text("* Enter valid Loan Amount");
		$("#loanAmount").focus();
		return false;
	} else if (parseFloat(loanAmount) < 100000) {
		$("#chkloanamount").text("* Amount must be >= 100000");
		$("#loanAmount").focus();
		return false;
	}

	// 7) Loan Mode
	if (loanMode === "" || loanMode === "SELECT LOAN MODE") {
		$("#chkloanmode").text("* Please select Loan Mode");
		$("#loanMode").focus();
		return false;
	}

	// 8) Rate of Interest Type
	if (rateIntrestType === "") {
		$("#chkroi").text("* Rate of Interest is required");
		$("#rateIntrestType").focus();
		return false;
	} else if (!numberPattern.test(rateIntrestType)) {
		$("#chkroi").text("* Enter valid ROI");
		$("#rateIntrestType").focus();
		return false;
	} else if (parseFloat(rateIntrestType) <= 0 || parseFloat(rateIntrestType) > 60) {
		$("#chkroi").text("* ROI must be between 1 to 60");
		$("#rateIntrestType").focus();
		return false;
	}

	// 9) Security Type
	if (typesecurity === "" || typesecurity === "SELECT SECURITY") {
		$("#chksecuritytype").text("* Please select Security Type");
		$("#typesecurity").focus();
		return false;
	}

	// 10) EMI Type
	if (emiType === "" || emiType === "SELECT EMI TYPE") {
		$("#chkemitype").text("* Please select EMI Type");
		$("#emiType").focus();
		return false;
	}

	// ==========================
	// ✅ Payment Deductions (Required in HTML)
	// ==========================

	// Processing Fee
	if (feeProcessing === "") {
		$("#chkprocessingfee").text("* Processing Fee is required");
		$("#feeProcessing").focus();
		return false;
	} else if (!numberPattern.test(feeProcessing) || parseFloat(feeProcessing) < 0 || parseFloat(feeProcessing) > 100) {
		$("#chkprocessingfee").text("* Enter valid Processing Fee (0 - 100)");
		$("#feeProcessing").focus();
		return false;
	}

	// Legal Charges
	if (chargesLegal === "") {
		$("#chklegalcharges").text("* Legal Charges is required");
		$("#chargesLegal").focus();
		return false;
	} else if (!numberPattern.test(chargesLegal) || parseFloat(chargesLegal) < 0 || parseFloat(chargesLegal) > 100) {
		$("#chklegalcharges").text("* Enter valid Legal Charges (0 - 100)");
		$("#chargesLegal").focus();
		return false;
	}

	// GST
	if (gst === "") {
		$("#chkgst").text("* GST is required");
		$("#gst").focus();
		return false;
	} else if (!numberPattern.test(gst) || parseFloat(gst) < 0 || parseFloat(gst) > 28) {
		$("#chkgst").text("* GST must be between 0 to 28");
		$("#gst").focus();
		return false;
	}

	// Insurance Fee
	if (feeInsurence === "") {
		$("#chkinsurancefee").text("* Insurance Fee is required");
		$("#feeInsurence").focus();
		return false;
	} else if (!numberPattern.test(feeInsurence) || parseFloat(feeInsurence) < 0 || parseFloat(feeInsurence) > 100) {
		$("#chkinsurancefee").text("* Enter valid Insurance Fee (0 - 100)");
		$("#feeInsurence").focus();
		return false;
	}

	// Valuation Fee
	if (feeValuation === "") {
		$("#chkvaluationfee").text("* Valuation Fee is required");
		$("#feeValuation").focus();
		return false;
	} else if (!numberPattern.test(feeValuation) || parseFloat(feeValuation) < 0 || parseFloat(feeValuation) > 100) {
		$("#chkvaluationfee").text("* Enter valid Valuation Fee (0 - 100)");
		$("#feeValuation").focus();
		return false;
	}

	// ==========================
	// ✅ Late Fine Details (Required)
	// ==========================

	// Late Allowance Day
	if (lateAllowanceday === "") {
		$("#chklateallowanceday").text("* Late Allowance Day is required");
		$("#lateAllowanceday").focus();
		return false;
	} else if (!intPattern.test(lateAllowanceday) || parseInt(lateAllowanceday) < 0) {
		$("#chklateallowanceday").text("* Enter valid Late Allowance Days");
		$("#lateAllowanceday").focus();
		return false;
	}

	// Penalty Mode (no small id given in html for this select)
	if (modePanalty === "" || modePanalty === "SELECT PENALTY TYPE") {
		alert("Please select Penalty Mode");
		$("#modePanalty").focus();
		return false;
	}

	// Monthly Penalty
	if (pennaltyMonthly === "") {
		$("#chkmonthlypenalty").text("* Monthly Penalty is required");
		$("#pennaltyMonthly").focus();
		return false;
	} else if (!numberPattern.test(pennaltyMonthly) || parseFloat(pennaltyMonthly) < 0) {
		$("#chkmonthlypenalty").text("* Enter valid Monthly Penalty");
		$("#pennaltyMonthly").focus();
		return false;
	}

	return true;
}



// ============================================
// ✅ COMMON AJAX FUNCTION FOR SAVE / UPDATE
// ============================================
function submitLoanForm(type) {

	let id = $("#loanId").val();

	const loanData = {
		id: type === "update" ? id : null,

		loanSchemeCode: $("#loanSchemeCode").val(),
		loanPlaneName: $("#loanPlaneName").val(),
		typeLoan: $("#typeLoan").val(),
		age: $("#age").val(),
		loanTerm: $("#loanTerm").val(),
		emiType: $("#emiType").val(),
		loanAmount: $("#loanAmount").val(),
		loanMode: $("#loanMode").val(),
		rateIntrestType: $("#rateIntrestType").val(),
		typeIntrest: $("#typeIntrest").val(),
		typesecurity: $("#typesecurity").val(),

		// Deductions
		feeProcessing: $("#feeProcessing").val(),
		chargesLegal: $("#chargesLegal").val(),
		gst: $("#gst").val(),
		feeInsurence: $("#feeInsurence").val(),
		feeValuation: $("#feeValuation").val(),

		// Late Penalty
		lateAllowanceday: $("#lateAllowanceday").val(),
		modePanalty: $("#modePanalty").val(),
		pennaltyMonthly: $("#pennaltyMonthly").val(),

		// ✅ Toggle value
		planStatus: $("#planStatus").is(":checked") ? 1 : 0
	};

	$.ajax({
		type: "POST",
		url: "api/loanmanegment/saveLoanManagment",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(loanData),
		success: function(response) {

			if (response.status === "OK") {

				if (type === "save") {
					alert("Data Saved Successfully ");
				} else {
					alert("Data Updated Successfully ");
				}

				// ✅ Reset buttons
				$("#saveBtn").show();
				$("#saveBtn").click(function() {
					if (validateLoanSchemeForm()) {
						// ✅ call your save ajax function here
						saveLoanScheme();
					}
				});

				$("#updateBtn").hide();

				// ✅ Clear form
				clearLoanForm();

				// ✅ Reload table
				loadLoanTable();

			} else {
				alert("Failed: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Error occurred: " + xhr.responseText);
		}
	});
}


// ============================================
// ✅ CLEAR FORM FUNCTION
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
	updateToggleColor(document.getElementById('planStatus'));
}


// ============================================
// ✅ LOAD TABLE DATA
function loadLoanTable() {
	$.ajax({
		url: "api/loanmanegment/allDataFetchLoanSchemCatelog",
		type: "GET",
		dataType: "json",
		success: function(response) {
			let rows = "";

			if (response.status === "OK" && Array.isArray(response.data)) {
				response.data.forEach(function(loan) {

					// ✅ convert into UPPERCASE safely
					const loanPlaneName = (loan.loanPlaneName || "-").toString().toUpperCase();
					const typeLoan = (loan.typeLoan || "-").toString().toUpperCase();
					const age = (loan.age || "-").toString().toUpperCase();
					const loanTerm = (loan.loanTerm || "-").toString().toUpperCase();
					const emiType = (loan.emiType || "-").toString().toUpperCase();

					rows += `
                        <tr>
                            <td>${loan.id}</td>
                            <td>${loanPlaneName}</td>
                            <td>${typeLoan}</td>
                            <td>${age}</td>
                            <td>${loanTerm}</td>
                            <td>${emiType}</td>
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
				rows = "<tr><td colspan='8'>No data found</td></tr>";
			}

			$("#loanTableBody").html(rows);
		},
		error: function(xhr) {
			console.error("Error loading table:", xhr.statusText);
			$("#loanTableBody").html("<tr><td colspan='8'>Error loading data</td></tr>");
		}
	});
}



// ============================================
// ✅ EDIT LOAN BY ID
// ============================================
function editLoanById(id) {

	$("#updateBtn").show();
	$("#saveBtn").hide();

	$.ajax({
		url: "api/loanmanegment/getLoanByIdEdite",
		type: "GET",
		data: { id: id },
		success: function(response) {
			$('html, body').animate({
				scrollTop: $("#formid").offset().top
			}, 300);
			if (response.status === "OK") {

				const loan = response.data;

				$('#loanId').val(loan.id);
				$('#loanSchemeCode').val(loan.loanSchemeCode);
				$('#loanPlaneName').val(loan.loanPlaneName);
				$('#typeLoan').val(loan.typeLoan);
				$('#age').val(loan.age);
				$('#loanTerm').val(loan.loanTerm);
				$('#emiType').val(loan.emiType);
				$('#loanAmount').val(loan.loanAmount);
				$('#loanMode').val(loan.loanMode);
				$('#rateIntrestType').val(loan.rateIntrestType);
				$('#typeIntrest').val(loan.typeIntrest);
				$('#typesecurity').val(loan.typesecurity);

				$('#feeProcessing').val(loan.feeProcessing);
				$('#chargesLegal').val(loan.chargesLegal);
				$('#gst').val(loan.gst);
				$('#feeInsurence').val(loan.feeInsurence);
				$('#feeValuation').val(loan.feeValuation);

				$('#lateAllowanceday').val(loan.lateAllowanceday);
				$('#modePanalty').val(loan.modePanalty);
				$('#pennaltyMonthly').val(loan.pennaltyMonthly);

				// ✅ Toggle
				$('#planStatus').prop('checked', parseInt(loan.planStatus) === 1);
				updateToggleColor(document.getElementById('planStatus'));

			} else {
				alert("Loan not found: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Error fetching loan details: " + xhr.responseText);
		}
	});
}


// ============================================
// ✅ TOGGLE COLOR UPDATE
// ============================================
function updateToggleColor(input) {
	const label = input.nextElementSibling;
	if (input.checked) {
		label.style.backgroundColor = "#4caf50";
		label.style.borderColor = "#4caf50";
	} else {
		label.style.backgroundColor = "#ccc";
		label.style.borderColor = "#ccc";
	}
}


// ============================================
// ✅ DELETE FUNCTION
// ============================================
function deleteLoan(id) {
	if (confirm("Are you sure you want to delete this loan?")) {

		$.ajax({
			url: "api/loanmanegment/deleteLoanById",
			type: "POST",
			data: { id: id },
			success: function(response) {

				if (response.status === "OK") {
					alert("Loan deleted successfully ✅");
					loadLoanTable();
				} else {
					alert("Failed: " + response.message);
				}
			},
			error: function(xhr) {
				alert("Error while deleting loan ❌");
				console.log("Status:", xhr.status);
				console.log("Response:", xhr.responseText);
			}
		});
	}
}


// ============================================
// ✅ Your old function (kept, optional)
// ============================================
function validateLoanAmount() {
	const loanAmount = document.getElementById("loanAmount").value;
	const error = document.getElementById("loanAmountError");

	if (loanAmount !== "" && Number(loanAmount) < 100000) {
		error.style.display = "block";
	} else {
		error.style.display = "none";
	}
}
