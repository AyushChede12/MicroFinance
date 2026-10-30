// ✅ Joint Liability Group Loan Payment with Dynamic Company Details & Disbursement Printing

let companyDetails = {};
let deductionPercents = {}; // store percentages temporarily

$(document).ready(function() {
	loadCompanyDetails();
	populateDropdown();
	loadFinancialConsultants();
	setupPaymentModeVisibility();
	setupCalculations();
	setupPaymentAction();
	setupPrintAction();
});

// Load Company Details dynamically from CompanyAdministration via getCompanyDetails
function loadCompanyDetails() {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(resp) {
			const comp = (resp && resp.data) ? resp.data : resp;
			if (comp) {
				companyDetails = comp;
				bindCompanyToDisbursementArea(comp);
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING COMPANY DETAILS:", error);
		}
	});
}

function bindCompanyToDisbursementArea(comp) {
	if (!comp) return;
	const name = (comp.companyName || "MICROFINANCE FINANCIAL SERVICES").toUpperCase();
	const addr = [comp.address, comp.city, comp.state, comp.pinCode].filter(Boolean).join(", ").toUpperCase();
	
	const regParts = [];
	if (comp.cinNo) regParts.push("CIN: " + comp.cinNo);
	if (comp.pan) regParts.push("PAN: " + comp.pan);
	if (comp.tan) regParts.push("TAN: " + comp.tan);
	if (comp.gstin) regParts.push("GSTIN: " + comp.gstin);
	const regLine = regParts.join(" | ").toUpperCase();

	const contactParts = [];
	if (comp.helplineNo) contactParts.push("HELPLINE: " + comp.helplineNo);
	if (comp.emailId) contactParts.push("EMAIL: " + comp.emailId);
	const contactLine = contactParts.join(" | ").toUpperCase();

	$("#disbCompName").text(name);
	$("#disbCompAddress").text(addr);
	$("#disbCompRegLine").text(regLine);
	$("#disbCompContact").text(contactLine);
}

// Populate Approved Loan IDs Dropdown
function populateDropdown() {
	$.ajax({
		url: "api/joinliability/getApprovedGroupLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("LOAN ID RESPONSE:", response);
			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#groupid");
				$dropdown.empty();
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');

				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				console.warn("NO LOAN IDS FOUND IN RESPONSE.");
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING LOAN IDS:", error);
		}
	});
}

// Fetch and bind loan details on group selection
$('#groupid').on('change', function() {
	let selectedCode = $(this).val();

	if (selectedCode !== "") {
		$.ajax({
			url: `api/joinliability/fetchByGroupCode?groupCode=${selectedCode}`,
			type: 'GET',
			dataType: 'json',
			success: function(response) {
				console.log("RESPONSE:", response);

				if (response.status === "FOUND" && response.data && response.data.length > 0) {
					let loan = response.data[0];

					// Bind backend data into form inputs
					$('#openingDate').val(loan.openingDate || '');
					$('#communityName').val(loan.communityName || '');
					$('#branchname').val(loan.branchName || '');
					$('#loanSchemeName').val(loan.loanSchemeName || '');
					$('#communityAddress').val(loan.communityAddress || '');
					$('#contactNumber').val(loan.contactNumber || '');
					$('#loanpurpose').val(loan.loanPurpose || '');
					$('#emiType').val(loan.emiType || '');
					$('#term').val(loan.term || '');
					$('#rateOfInterest').val(loan.rateOfInterest || '');
					$('#interestType').val(loan.interestType || '');
					
					const amt = loan.totalAmount || loan.loanamount || loan.minLoanAmt || '';
					$('#loanAmount').val(amt);

					// PHOTO block
					if (loan.photo) {
						const fileName = loan.photo;
						const photoPath = `/Uploads/${encodeURIComponent(fileName)}`;
						$("#photoPreview").attr("src", photoPath);
						$("#photoHidden").val(fileName);
						photoSizeEdit({ target: { result: photoPath } });
					} else {
						$("#photoPreview").attr("src", "/Uploads/default-placeholder.jpg");
						$("#photoHidden").val("");
						photoSizeEdit({ target: { result: "/Uploads/default-placeholder.jpg" } });
					}

					// SIGNATURE block
					if (loan.signature) {
						const fileName = loan.signature;
						const signPath = `/Uploads/${encodeURIComponent(fileName)}`;
						$('#signaturePreview').attr('src', signPath);
						$('#signatureHidden').val(fileName);
						signatureSizeEdit({ target: { result: signPath } });
					} else {
						$('#signaturePreview').attr('src', '/Uploads/default-placeholder.jpg');
						$('#signatureHidden').val("");
						signatureSizeEdit({ target: { result: "/Uploads/default-placeholder.jpg" } });
					}

					deductionPercents = {
						processing: parseFloat(loan.processingFee) || 0,
						gst: parseFloat(loan.gstPercentage) || 0,
						legal: parseFloat(loan.legalCharges) || 0,
						insurance: parseFloat(loan.insuranceFee) || 0,
						valuation: parseFloat(loan.valuationFee) || 0,
					};

					// Clear deduction inputs then recalculate
					$('#processingFee').val('');
					$('#gstPercentage').val('');
					$('#legalCharges').val('');
					$('#insuranceFee').val('');
					$('#valuationFee').val('');

					calculateCharges();
					calculateEMI();
					updateDisbursementPreview();
					$('#printDisbursementBtn').show();

				} else {
					alert(response.message ? response.message.toUpperCase() : "FAILED TO FETCH LOAN DETAILS.");
					clearFields();
				}
			},
			error: function(xhr, status, error) {
				console.error("ERROR FETCHING GROUP LOAN DATA:", error);
				alert("SOMETHING WENT WRONG FETCHING GROUP LOAN DATA.");
				clearFields();
			}
		});
	}
});

function photoSizeEdit(e) {
	const previewimg = document.getElementById("photoPreview");
	if (!previewimg) return;
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function signatureSizeEdit(e) {
	const previewimg = document.getElementById("signaturePreview");
	if (!previewimg) return;
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

// Payment mode fields visibility toggling
function setupPaymentModeVisibility() {
	$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();

	$('#paymentMode').on('change', function() {
		const paymentMode = ($(this).val() || '').toLowerCase();
		$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();

		if (paymentMode === 'cash') {
			// Cash only
		} else if (paymentMode === 'cheque') {
			$('#displayCheque').show();
			$('#displaycheqdate').show();
			$('#displaydeposit').show();
		} else if (paymentMode === 'online' || paymentMode === 'neft') {
			$('#displaydeposit').show();
			$('#displayRef').show();
		}
		updateDisbursementPreview();
	});
}

// Fetch financial consultants
function loadFinancialConsultants() {
	$.ajax({
		url: 'api/financialconsultant/getAllFinancialConsultantDetails',
		type: 'POST',
		success: function(response) {
			const consultantDropdown = $('#financialConsultantId');
			consultantDropdown.empty();
			consultantDropdown.append('<option value="">SELECT CONSULTANT</option>');

			if (response && Array.isArray(response.data)) {
				response.data.forEach(function(customer) {
					const option = `<option value="${customer.financialCode}">${customer.financialCode}</option>`;
					consultantDropdown.append(option);
				});
			}
		},
		error: function(xhr, status, error) {
			console.error('AJAX ERROR:', status, error);
		}
	});

	$('#financialConsultantId').on('change', function() {
		const selectedCode = $(this).val();
		if (selectedCode) {
			$.ajax({
				url: 'api/financialconsultant/getfinancialHierarchyByFinancialCode',
				type: 'GET',
				data: { financialCode: selectedCode },
				success: function(response) {
					const consultant = Array.isArray(response.data) ? response.data[0] : response.data;
					if (consultant && consultant.financialName) {
						$('#financialConsultantName').val(consultant.financialName.toUpperCase());
					} else {
						$('#financialConsultantName').val('');
					}
					updateDisbursementPreview();
				},
				error: function(xhr, status, error) {
					console.error('AJAX ERROR:', status, error);
					$('#financialConsultantName').val('');
				}
			});
		} else {
			$('#financialConsultantName').val('');
			updateDisbursementPreview();
		}
	});
}

// EMI and Deductions Calculations
function setupCalculations() {
	$('#loanAmount').on('input change blur', function() {
		calculateEMI();
		calculateCharges();
		updateDisbursementPreview();
	});
}

function calculateEMI() {
	const principal = parseFloat($('#loanAmount').val());
	const rate = parseFloat($('#rateOfInterest').val());
	const term = parseInt($('#term').val());
	const mode = ($('#emiType').val() || '').toLowerCase();
	const type = ($('#interestType').val() || '').toLowerCase();

	if (isNaN(principal) || isNaN(rate) || isNaN(term) || !mode || !type) {
		$('#loanEmi').val('');
		return;
	}

	let periodRate = 0;
	let totalInstallments = term;

	switch (mode) {
		case 'daily':
			periodRate = rate / 365 / 100;
			break;
		case 'weekly':
			periodRate = rate / 52 / 100;
			break;
		case 'monthly':
			periodRate = rate / 12 / 100;
			break;
		case 'quarterly':
			periodRate = rate / 4 / 100;
			break;
		case 'yearly':
			periodRate = rate / 100;
			break;
		default:
			periodRate = rate / 12 / 100;
	}

	let emi = 0;
	if (type === 'flat interest' || type.includes('flat')) {
		const totalInterest = (principal * rate * (term / getModeDivider(mode))) / 100;
		const totalPayable = principal + totalInterest;
		emi = totalPayable / term;
	} else if (type.includes('reducing')) {
		emi = (principal * periodRate * Math.pow(1 + periodRate, totalInstallments)) /
			(Math.pow(1 + periodRate, totalInstallments) - 1);
	} else if (type.includes('rule 78') || type.includes('78')) {
		const totalInterest = (principal * rate * (term / getModeDivider(mode))) / 100;
		const totalPayable = principal + totalInterest;
		emi = totalPayable / term;
	} else {
		const totalInterest = (principal * rate * (term / getModeDivider(mode))) / 100;
		const totalPayable = principal + totalInterest;
		emi = totalPayable / term;
	}

	$('#loanEmi').val(isFinite(emi) ? emi.toFixed(2) : '');
}

function getModeDivider(mode) {
	switch (mode) {
		case 'daily': return 365;
		case 'weekly': return 52;
		case 'monthly': return 12;
		case 'quarterly': return 4;
		case 'yearly': return 1;
		default: return 12;
	}
}

function calculateCharges() {
	const loanAmount = parseFloat($('#loanAmount').val());
	if (isNaN(loanAmount) || loanAmount <= 0) {
		return;
	}

	const { processing = 0, gst = 0, legal = 0, insurance = 0, valuation = 0 } = deductionPercents;

	const processingAmount = (loanAmount * processing) / 100;
	const legalAmount = (loanAmount * legal) / 100;
	const insuranceAmount = (loanAmount * insurance) / 100;
	const valuationAmount = (loanAmount * valuation) / 100;
	const gstAmount = ((processingAmount + legalAmount + valuationAmount) * gst) / 100;

	$('#processingFee').val(processingAmount.toFixed(2));
	$('#gstPercentage').val(gstAmount.toFixed(2));
	$('#legalCharges').val(legalAmount.toFixed(2));
	$('#insuranceFee').val(insuranceAmount.toFixed(2));
	$('#valuationFee').val(valuationAmount.toFixed(2));
}

// Update the printable disbursement area with current form values
function updateDisbursementPreview() {
	bindCompanyToDisbursementArea(companyDetails);

	const groupCode = $('#groupid').val() || '';
	const pDate = $('#paymentDate').val() || $('#openingDate').val() || new Date().toISOString().split('T')[0];
	const commName = ($('#communityName').val() || '').toUpperCase();
	const brName = ($('#branchname').val() || '').toUpperCase();
	const commAddr = ($('#communityAddress').val() || '').toUpperCase();
	const phone = $('#contactNumber').val() || '';
	const scheme = ($('#loanSchemeName').val() || '').toUpperCase();
	const purpose = ($('#loanpurpose').val() || '').toUpperCase();

	const loanAmt = parseFloat($('#loanAmount').val()) || 0;
	const roi = $('#rateOfInterest').val() || '0';
	const intType = ($('#interestType').val() || '').toUpperCase();
	const term = $('#term').val() || '';
	const emiType = ($('#emiType').val() || '').toUpperCase();
	const emiAmt = parseFloat($('#loanEmi').val()) || 0;

	const proc = parseFloat($('#processingFee').val()) || 0;
	const gst = parseFloat($('#gstPercentage').val()) || 0;
	const leg = parseFloat($('#legalCharges').val()) || 0;
	const ins = parseFloat($('#insuranceFee').val()) || 0;
	const val = parseFloat($('#valuationFee').val()) || 0;
	const totalDeductions = proc + gst + leg + ins + val;

	const chargesDeductCash = ($('#charges').val() || 'NO').toUpperCase();
	const netDisbursed = chargesDeductCash === 'YES' ? loanAmt : (loanAmt - totalDeductions);

	const payMode = ($('#paymentMode').val() || 'CASH').toUpperCase();
	let acCheque = '-';
	if (payMode === 'CHEQUE') {
		acCheque = 'CHEQUE NO: ' + ($('#chequeNo').val() || '-') + ' (DT: ' + ($('#chequeDate').val() || '-') + ')';
	} else if (payMode === 'ONLINE' || payMode === 'NEFT') {
		acCheque = 'A/C: ' + ($('#accountNo').val() || '-') + ' | REF: ' + ($('#ref_UpiId').val() || '-');
	}

	const consultant = ($('#financialConsultantName').val() || $('#financialConsultantId').val() || '-').toUpperCase();

	$('#disbGroupId').text(groupCode);
	$('#disbPaymentDate').text(pDate);
	$('#disbCommunityName').text(commName);
	$('#disbBranchName').text(brName);
	$('#disbCommunityAddress').text(commAddr);
	$('#disbContactNumber').text(phone);
	$('#disbLoanScheme').text(scheme);
	$('#disbLoanPurpose').text(purpose);

	$('#disbLoanAmount').text(loanAmt.toFixed(2));
	$('#disbRoi').text(roi);
	$('#disbInterestType').text(intType);
	$('#disbTerm').text(term);
	$('#disbEmiType').text(emiType);
	$('#disbEmiAmount').text(emiAmt.toFixed(2));

	$('#disbProcessing').text(proc.toFixed(2));
	$('#disbGst').text(gst.toFixed(2));
	$('#disbLegal').text(leg.toFixed(2));
	$('#disbInsurance').text(ins.toFixed(2));
	$('#disbValuation').text(val.toFixed(2));
	$('#disbTotalDeduction').text(totalDeductions.toFixed(2));
	$('#disbNetPayable').text(netDisbursed.toFixed(2));

	$('#disbPaymentMode').text(payMode);
	$('#disbAccountCheque').text(acCheque);
	$('#disbConsultant').text(consultant);
	$('#disbChargesCash').text(chargesDeductCash);
}

// Print Disbursement Advice Letterhead
function printDisbursementAdvice() {
	updateDisbursementPreview();

	const printContent = document.getElementById('printableDisbursementArea').innerHTML;
	const printWindow = window.open('', '_blank', 'width=950,height=750');
	printWindow.document.write(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>JOINT LIABILITY LOAN DISBURSEMENT ADVICE</title>
			<style>
				@page { size: A4 portrait; margin: 15mm; }
				body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; margin: 0; padding: 10px; color: #000; background: #fff; }
				table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
				th, td { padding: 6px 8px; font-size: 11px; }
				th { background-color: #f2f2f2 !important; -webkit-print-color-adjust: exact; text-transform: uppercase; }
				hr { border: 0; border-top: 2px solid #000; }
				h2, h3, h4, p { margin: 0; }
			</style>
		</head>
		<body>
			${printContent}
			<script>
				window.onload = function() {
					window.print();
					window.onafterprint = function() { window.close(); };
				};
			<\/script>
		</body>
		</html>
	`);
	printWindow.document.close();
}

function setupPrintAction() {
	$('#printDisbursementBtn').on('click', function(e) {
		e.preventDefault();
		printDisbursementAdvice();
	});
}

// Loan payment submission
function setupPaymentAction() {
	$("#groupPaymentBtn").on('click', function(e) {
		e.preventDefault();

		const selectedGroup = $("#groupid").val();
		if (!selectedGroup) {
			alert("PLEASE SELECT A GROUP ID FIRST.");
			return;
		}

		const pMode = $("#paymentMode").val();
		if (!pMode) {
			alert("PLEASE SELECT MODE OF PAYMENT.");
			return;
		}

		const groupLoanData = {
			groupID: selectedGroup,
			groupCode: selectedGroup,
			openingDate: $("#openingDate").val(),
			communityName: ($("#communityName").val() || '').toUpperCase(),
			loanSchemeName: ($("#loanSchemeName").val() || '').toUpperCase(),
			contactNumber: $("#contactNumber").val(),
			emiType: ($("#emiType").val() || '').toUpperCase(),
			term: $("#term").val(),
			rateOfInterest: $("#rateOfInterest").val(),
			interestType: ($("#interestType").val() || '').toUpperCase(),
			loanAmount: parseFloat($("#loanAmount").val()) || 0,
			loanEmi: parseFloat($("#loanEmi").val()) || 0,
			planCode: $("#planCode").val(),
			processingFee: parseFloat($("#processingFee").val()) || 0,
			legalCharges: parseFloat($("#legalCharges").val()) || 0,
			gstPercentage: parseFloat($("#gstPercentage").val()) || 0,
			insuranceFee: parseFloat($("#insuranceFee").val()) || 0,
			valuationFee: parseFloat($("#valuationFee").val()) || 0,
			financialConsultantId: $("#financialConsultantId").val(),
			financialConsultantName: ($("#financialConsultantName").val() || '').toUpperCase(),
			paymentDate: $("#paymentDate").val() || new Date().toISOString().split('T')[0],
			paymentStatus: ($("#paymentStatus").val() || 'PAID').toUpperCase(),
			paymentMode: ($("#paymentMode").val() || '').toUpperCase(),
			accountNo: $("#accountNo").val(),
			ref_UpiId: ($("#ref_UpiId").val() || '').toUpperCase(),
			charges: ($("#charges").val() || 'NO').toUpperCase(),
			remarks: ($("#remarks").val() || '').toUpperCase(),
			chequeDate: $("#chequeDate").val(),
			chequeNo: ($("#chequeNo").val() || '').toUpperCase(),
			photo: $('#photoHidden').val(),
			signature: $('#signatureHidden').val(),
			communityAddress: ($('#communityAddress').val() || '').toUpperCase(),
			branchName: ($('#branchname').val() || '').toUpperCase()
		};

		$.ajax({
			type: "POST",
			url: "api/joinliability/saveloanPayment",
			data: JSON.stringify(groupLoanData),
			contentType: "application/json",
			success: function(response) {
				updateDisbursementPreview();
				$('#printDisbursementBtn').show();

				alert("LOAN PAYMENT PROCESSED AND DISTRIBUTED TO MEMBERS SUCCESSFULLY!");
				if (confirm("LOAN PAYMENT RECORDED SUCCESSFULLY. DO YOU WANT TO PRINT THE DISBURSEMENT ADVICE NOW?")) {
					printDisbursementAdvice();
				}
			},
			error: function(xhr, status, error) {
				alert("FAILED TO PROCESS LOAN PAYMENT: " + (xhr.responseText ? xhr.responseText.toUpperCase() : "SERVER ERROR"));
				console.error("ERROR:", xhr.responseText);
			}
		});
	});
}

function clearFields() {
	$('#formid')[0].reset();
	$('#printDisbursementBtn').hide();
	$('#photoPreview').attr('src', '/Uploads/upload.png');
	$('#signaturePreview').attr('src', '/Uploads/upload.png');
	$('#photoHidden').val('');
	$('#signatureHidden').val('');
}
