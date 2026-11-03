$(document).ready(function() {

	// SET DEFAULT DATE
	let today = new Date().toISOString().split("T")[0];
	$("#paymentDate").val(today);

	// LOAD BRANCHES INTO PAYING BRANCH DROPDOWN
	loadBranchDropdown();

	// ON POLICY CODE CHANGE OR BLUR
	$("#policyID").on("change blur", function() {
		let policyCode = $(this).val().trim().toUpperCase();
		if (policyCode) {
			fetchPolicyDetails(policyCode);
		}
	});

	// FORM SUBMISSION (PAY)
	$("#formid").submit(function(e) {
		e.preventDefault();
		processMisPayment();
	});

	$("#payBtn").click(function(e) {
		e.preventDefault();
		processMisPayment();
	});

});

// LOAD BRANCH DROPDOWN
function loadBranchDropdown() {
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(response) {
			let select = $("#payingBranch");
			select.empty();
			select.append('<option value="">--SELECT BRANCH NAME--</option>');

			if (response && Array.isArray(response.data)) {
				response.data.forEach(function(branch) {
					select.append(`<option value="${branch.branchName.toUpperCase()}">${branch.branchName.toUpperCase()}</option>`);
				});
			}
		},
		error: function(xhr) {
			console.error("FAILED TO LOAD BRANCH NAMES:", xhr);
			alert("FAILED TO LOAD BRANCH NAMES");
		}
	});
}

// FETCH POLICY DETAILS
function fetchPolicyDetails(policyCode) {
	$.ajax({
		url: "getPolicyByPolicyCode",
		type: "GET",
		data: { policyCode: policyCode },
		success: function(response) {
			if (response && response.status === "OK" && response.data) {
				let p = response.data;
				$("#policyHolder").val((p.clientName || "").toUpperCase());
				$("#issueDate").val(p.policyDate || "");
				$("#insuredAmount").val(p.policyAmount || "");
				
				let interest = p.misinterest || p.mISInterest || p.interest || "0.00";
				$("#accruedInterest").val(interest);
				$("#schemeTitle").val((p.schemeName || p.planName || "MIS").toUpperCase());
				$("#branchName").val((p.branchName || "").toUpperCase());
				$("#clientCode").val((p.memberCode || p.clientCode || "").toUpperCase());
				$("#payAmount").val(interest);

				// Auto-select branch if exists
				if (p.branchName) {
					$("#payingBranch").val(p.branchName.toUpperCase());
				}
			} else {
				alert("POLICY NOT FOUND FOR CODE: " + policyCode);
				clearPolicyFields();
			}
		},
		error: function(xhr) {
			console.error("POLICY FETCH ERROR:", xhr);
			alert("POLICY NOT FOUND FOR CODE: " + policyCode);
			clearPolicyFields();
		}
	});
}

function clearPolicyFields() {
	$("#policyHolder").val("");
	$("#issueDate").val("");
	$("#insuredAmount").val("");
	$("#accruedInterest").val("");
	$("#schemeTitle").val("");
	$("#branchName").val("");
	$("#clientCode").val("");
	$("#payAmount").val("");
}

// PROCESS MIS PAYMENT
function processMisPayment() {
	let policyCode = $("#policyID").val().trim().toUpperCase();
	let payAmount = $("#payAmount").val().trim();
	let branchName = $("#payingBranch").val();
	let paymentDate = $("#paymentDate").val();
	let paymentMode = $("#paymentMode").val();

	if (!policyCode) {
		alert("PLEASE ENTER POLICY CODE");
		return;
	}

	if (!payAmount || parseFloat(payAmount) <= 0) {
		alert("PLEASE ENTER VALID PAY AMOUNT");
		return;
	}

	if (!branchName) {
		alert("PLEASE SELECT PAYING BRANCH");
		return;
	}

	if (!paymentDate) {
		alert("PLEASE SELECT DATE OF PAYMENT");
		return;
	}

	if (!paymentMode) {
		alert("PLEASE SELECT PAYMENT MODE");
		return;
	}

	let payload = {
		policyCode: policyCode,
		branchName: branchName,
		paymentDate: paymentDate,
		paymentMode: paymentMode,
		payAmount: payAmount
	};

	$("#payBtn").prop("disabled", true).text("PROCESSING...");

	$.ajax({
		url: "accountManagement/pay-mis-interest",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function(response) {
			$("#payBtn").prop("disabled", false).text("PAY");
			if (response && (response.status === "OK" || response.status === 200)) {
				alert((response.message || "MIS INTEREST PAYMENT PROCESSED SUCCESSFULLY").toUpperCase());
				$("#formid")[0].reset();
				clearPolicyFields();
				let today = new Date().toISOString().split("T")[0];
				$("#paymentDate").val(today);
			} else {
				alert((response.message || "FAILED TO PROCESS MIS PAYMENT").toUpperCase());
			}
		},
		error: function(xhr) {
			$("#payBtn").prop("disabled", false).text("PAY");
			console.error("MIS PAYMENT ERROR:", xhr);
			alert("SERVER ERROR WHILE PROCESSING MIS PAYMENT");
		}
	});
}
