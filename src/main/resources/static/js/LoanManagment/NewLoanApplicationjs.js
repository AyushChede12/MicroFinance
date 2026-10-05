/* =====================================================
   GLOBAL DOCUMENT READY
===================================================== */
let photoName = null;
let signatureName = null;
$(document).ready(function() {
	$('#photo').on('change', function () {
	    if (this.files.length > 0) {
	        photoName = this.files[0].name;
	        console.log("Photo Selected:", photoName);
	    }
	});

	$('#signature').on('change', function () {
	    if (this.files.length > 0) {
	        signatureName = this.files[0].name;
	        console.log("Signature Selected:", signatureName);
	    }
	});
	console.log("Document ready");

	fetchApprovedMembers();
	fetchLoanSchemes();
	fetchFinancialConsultants();

	/* ================= EVENTS ================= */
	$('#memberId,#guarantorMemberId,#coApplicantMemberId').on('change', handleMemberChange);

	$('#loanPlanName').on('change', handleLoanPlanChange);

	// 🔥 EMI AUTO CALCULATION TRIGGER
	$(document).on(
		'keyup change',
		'#loanAmount,#rateOfInterest,#loanTerm,#loanMode,#interestType',
		function() {
			calculateEMI();
		}
	);

	$('#saveBtn').on('click', saveLoanApplication);

	$('#financialConsultantId').on('change', fetchConsultantName);
});

/* =====================================================
   FETCH APPROVED MEMBERS
===================================================== */
function fetchApprovedMembers() {
	$.ajax({
		url: 'api/customermanagement/approved',
		type: 'GET',
		success: function(response) {

			const customers = response.data || [];
			const memberDropdown = $('#memberId');
			const guarantorDropdown = $('#guarantorMemberId');
			const coApplicantDropdown = $('#coApplicantMemberId');

			memberDropdown.empty().append('<option value="">-- SELECT CUSTOMER --</option>');
			guarantorDropdown.empty().append('<option value="">-- SELECT CUSTOMER --</option>');
			coApplicantDropdown.empty().append('<option value="">-- SELECT CUSTOMER --</option>');

			customers.forEach(customer => {
				const fullName = [customer.firstName, customer.middleName, customer.lastName]
					.filter(Boolean).join(" ");

				if (customer.memberCode && fullName) {
					const option = `
						<option value="${customer.memberCode}" data-name="${fullName}">
							${fullName.toUpperCase()} - ${customer.memberCode}
						</option>`;
					memberDropdown.append(option);
					guarantorDropdown.append(option);
					coApplicantDropdown.append(option);
				}
			});
		},
		error: () => alert('Failed to fetch members')
	});
}

/* =====================================================
   MEMBER / GUARANTOR / CO-APPLICANT CHANGE
===================================================== */
function handleMemberChange() {

	const memberCode = $(this).val();
	const changedId = $(this).attr('id');
	if (!memberCode) return;

	$.ajax({
		url: 'api/loanmanegment/getByMemberCodeNewLoanApplication',
		type: 'GET',
		data: { memberCode },
		success: function(response) {

			if (response.status !== "OK" || !response.data.length) return;
			const d = response.data[0];

			if (changedId === 'memberId') {
				$('#relativeDetails').val(d.relationToApplicant || '');
				$('#dateOfBirth').val(d.dob || '');
				$('#age').val(d.customerAge || '');
				$('#contactNo').val(d.contactNo || '');
				$('#address').val((d.customerAddress || '').toUpperCase());
				$('#pinCode').val(d.pinCode || '');
				$('#branchName').val(d.branchName || '');

				setImage('#photoPreview', '#photoHidden', d.customerPhoto);
				setImage('#signaturePreview', '#signatureHidden', d.customerSignature);
			}

			if (changedId === 'guarantorMemberId') {
				$('#guarantorAddress').val((d.customerAddress).toUpperCase() || '');
				$('#guarantorPinCode').val(d.pinCode || '');
				$('#guarantorContactNo').val(d.contactNo || '');
			}

			if (changedId === 'coApplicantMemberId') {
				$('#coApplicantAddress').val((d.customerAddress).toUpperCase() || '');
				$('#coApplicantPinCode').val(d.pinCode || '');
				$('#coApplicantContactNo').val(d.contactNo || '');
			}
		}
	});
}

/* =====================================================
   IMAGE HANDLER
===================================================== */
function setImage(previewId, hiddenId, imageName) {
	if (imageName) {
		const path = `Uploads/${imageName}`;
		$(previewId).attr('src', path);
		$(hiddenId).val(path);
	} else {
		$(previewId).attr('src', 'Uploads/default-placeholder.jpg');
		$(hiddenId).val('');
	}
}

/* =====================================================
   FETCH LOAN SCHEMES
===================================================== */
function fetchLoanSchemes() {
	$.ajax({
		url: 'api/loanmanegment/fetchLoanSchemeCatalog',
		type: 'GET',
		success: function(response) {

			const dropdown = $('#loanPlanName');
			dropdown.empty().append('<option value="">SELECT</option>');

			if (response.status === "FOUND") {
				response.data.forEach(scheme => {
					dropdown.append(`
						<option value="${scheme.loanPlaneName}">
							${(scheme.loanPlaneName || '').toUpperCase()}
						</option>
					`);
				});
			}
		}
	});
}

/* =====================================================
   LOAN PLAN CHANGE
===================================================== */
function handleLoanPlanChange() {

	const loanPlanName = $(this).val();
	if (!loanPlanName) return;

	$.ajax({
		url: 'api/loanmanegment/allfetchdataLoanPlanName',
		type: 'GET',
		data: { loanPlanName },
		success: function(response) {

			if (response.status !== "FOUND") return;
			const c = response.data[0];

			$('#typeOfLoan').val(c.typeLoan);
			$('#loanMode').val(c.loanMode);
			$('#loanTerm').val(c.loanTerm);
			$('#rateOfInterest').val(c.rateIntrestType);
			$('#interestType').val(c.typeIntrest);

			$('#hiddenProcessingFee').val(c.feeProcessing);
			$('#hiddenLegalCharges').val(c.chargesLegal);
			$('#hiddenGST').val(c.gst);
			$('#hiddenInsuranceFee').val(c.feeInsurence);
			$('#hiddenValuationFees').val(c.feeValuation);

			calculateEMI();
			calculateNewFees();
		}
	});
}

/* =====================================================
   EMI CALCULATION (FINAL & WORKING)
===================================================== */
function calculateEMI() {

	const loanAmount = parseFloat($('#loanAmount').val()) || 0;
	const annualRate = parseFloat($('#rateOfInterest').val()) || 0;
	const tenure = parseInt($('#loanTerm').val()) || 0;
	const emiMode = ($('#loanMode').val() || '').toUpperCase();
	const roiType = ($('#interestType').val() || '').toUpperCase();

	if (!loanAmount || !annualRate || !tenure) {
		$('#emiPayment').val('');
		return;
	}

	let perInstallmentRate = 0;
	let totalInstallments = tenure;   // default = term (like 12 months)
	let tenureInYears = 0;

	// ✅ convert tenure into years + set rate as per mode
	switch (emiMode) {

		case "DAILY":
			perInstallmentRate = annualRate / 365 / 100;
			tenureInYears = tenure / 365;
			totalInstallments = tenure;
			break;

		case "WEEKLY":
			perInstallmentRate = annualRate / 52 / 100;
			tenureInYears = tenure / 52;
			totalInstallments = tenure;
			break;

		case "FORTNIGHTLY":
			perInstallmentRate = annualRate / 24 / 100;
			tenureInYears = tenure / 24;
			totalInstallments = tenure;
			break;

		case "MONTHLY":
			perInstallmentRate = annualRate / 12 / 100;
			tenureInYears = tenure / 12;
			totalInstallments = tenure;
			break;

		default:
			$('#emiPayment').val('');
			return;
	}

	let emi = 0;

	// ✅ REDUCING INTEREST EMI formula (same as before)
	if (roiType === "REDUCING INTEREST") {

		emi = (loanAmount * perInstallmentRate * Math.pow(1 + perInstallmentRate, totalInstallments)) /
			(Math.pow(1 + perInstallmentRate, totalInstallments) - 1);
	}

	// ✅ FLAT INTEREST Correct formula (year based)
	else if (roiType === "FLAT INTEREST") {

		let yearlyRate = annualRate / 100;

		let totalInterest = loanAmount * yearlyRate * tenureInYears;
		let totalPayable = loanAmount + totalInterest;

		emi = totalPayable / totalInstallments;
	}

	$('#emiPayment').val(emi.toFixed(2));
}


/* =====================================================
   CHARGES CALCULATION
===================================================== */
function calculateNewFees() {
	const loanAmount = parseFloat($('#loanAmount').val()) || 0;
	const hiddenLoanAmount = parseFloat($('#hiddenLoanAmount').val()) || 0;

	// Exit early if loan amount validation fails
	if (loanAmount < hiddenLoanAmount || loanAmount < 100000) {
		$("#chkloanamount").text("* Amount must be >= 100000");
		$("#loanAmount").focus();
		return false;
	}

	// Calculate individual fees based on loan amount percentages
	const processing = loanAmount * (parseFloat($('#hiddenProcessingFee').val()) || 0) / 100;
	const legal = loanAmount * (parseFloat($('#hiddenLegalCharges').val()) || 0) / 100;
	const insurance = loanAmount * (parseFloat($('#hiddenInsuranceFee').val()) || 0) / 100;
	const valuation = loanAmount * (parseFloat($('#hiddenValuationFees').val()) || 0) / 100;

	// Calculate GST on processing + legal + valuation fees only
	const gst = (processing + legal + valuation) * (parseFloat($('#hiddenGST').val()) || 0) / 100;

	// Update all fee fields with formatted values
	$('#processingFee').val(processing.toFixed(2));
	$('#legalCharges').val(legal.toFixed(2));
	$('#insuranceFee').val(insurance.toFixed(2));
	$('#valuationFees').val(valuation.toFixed(2));
	$('#gst').val(gst.toFixed(2));
	$('#stationaryFee').val('50.00');

	// Clear any previous validation messages
	$("#chkloanamount").text("");

	return true;
}



/* =====================================================
   SAVE LOAN APPLICATION
===================================================== */
/* =====================================================
   SAVE LOAN APPLICATION WITH VALIDATION
===================================================== */

function saveLoanApplication() {
	
	
	// Validation checks with alerts
	if (!$('#memberId').val()) {
		alert('Please select MEMBER ID!');
		$('#memberId').focus();
		return false;
	}

	if (!$('#loanPlanName').val()) {
		alert('Please select LOAN PLAN!');
		$('#loanPlanName').focus();
		return false;
	}

	if (!$('#financialConsultantId').val()) {
		alert('Please select FINANCIAL CONSULTANT ID!');
		$('#financialConsultantId').focus();
		return false;
	}

	/*// Check if loan amount is valid
	const loanAmount = parseFloat($('#loanAmount').val()) || 0;
	if (loanAmount < 100000) {
		$('#loanAmount').focus();
		return false;
	}*/

	// Check required numeric fields
	const requiredNumericFields = [
		{ id: '#rateOfInterest', msg: 'Rate of Interest' },
		{ id: '#loanTerm', msg: 'Loan Term' },
		{ id: '#emiPayment', msg: 'EMI Payment' }
	];

	for (let field of requiredNumericFields) {
		const value = parseFloat($(field.id).val());
		if (!value || value <= 0) {
			alert(`Please enter valid ${field.msg}!`);
			$(field.id).focus();
			return false;
		}
	}

	// Check required text fields are not empty
	const requiredTextFields = [
		'#loanDate', '#purposeOfLoan', '#relativeDetails', '#dateOfBirth',
		'#contactNo', '#address', '#pinCode'
	];

	for (let selector of requiredTextFields) {
		if (!$(selector).val().trim()) {
			alert(`Please fill ${$(selector).attr('placeholder') || selector.replace('#', '')}!`);
			$(selector).focus();
			return false;
		}
	}
	
	
	

	// All validations passed - proceed with save
	const loanApplication = {
		loanId: $('#loanId').val(),
		loanDate: $('#loanDate').val(),
		memberId: $('#memberId').val(),
		memberName: $('#memberId option:selected').data('name'),

		relativeDetails: $('#relativeDetails').val(),
		dateOfBirth: $('#dateOfBirth').val(),
		age: $('#age').val(),
		contactNo: $('#contactNo').val(),
		address: $('#address').val(),
		pinCode: $('#pinCode').val(),
		branchName: $('#branchName').val(),

		loanPlanName: $('#loanPlanName').val(),
		typeOfLoan: $('#typeOfLoan').val(),
		loanMode: $('#loanMode').val(),
		loanTerm: $('#loanTerm').val(),
		rateOfInterest: $('#rateOfInterest').val(),
		loanAmount: $('#loanAmount').val(),
		interestType: $('#interestType').val(),
		emiPayment: $('#emiPayment').val(),
		purposeOfLoan: $('#purposeOfLoan').val(),
		loanStatus: "ACTIVE",
		messageStatus: $('#messageStatus').is(':checked') ? 1 : 0,

		/* ================= GUARANTOR ================= */
		guarantorMemberId: $('#guarantorMemberId').val(),
		guarantorIdentity: $('#guarantorIdentity').val(),
		guarantorAddress: $('#guarantorAddress').val(),
		guarantorPinCode: $('#guarantorPinCode').val(),
		guarantorContactNo: $('#guarantorContactNo').val(),
		guarantorSecurityType: $('#guarantorSecurityType').val(),

		/* ================= CO-APPLICANT ================= */
		coApplicantMemberId: $('#coApplicantMemberId').val(),
		coApplicantIdentity: $('#coApplicantIdentity').val(),
		coApplicantAddress: $('#coApplicantAddress').val(),
		coApplicantPinCode: $('#coApplicantPinCode').val(),
		coApplicantContactNo: $('#coApplicantContactNo').val(),
		coApplicantSecurityType: $('#coApplicantSecurityType').val(),

		/* ================= FEES ================= */
		financialConsultantId: $('#financialConsultantId').val(),
		financialConsultantName: $('#financialConsultantName').val(),
		processingFee: $('#processingFee').val(),
		legalCharges: $('#legalCharges').val(),
		insuranceFee: $('#insuranceFee').val(),
		valuationFees: $('#valuationFees').val(),
		gst: $('#gst').val(),
		stationaryFee: $('#stationaryFee').val(),

		/* ================= Photo/Singnature ================= */
		/* ================= Photo/Singnature ================= */
		/* ================= Photo/Singnature ================= */

		photo: $('#photoHidden').val(),
		signature: $('#signatureHidden').val(),


	};

	// Double-check no null/empty critical values before sending
	if (!loanApplication.memberId || !loanApplication.loanPlanName ||
		!loanApplication.financialConsultantId || !loanApplication.loanAmount) {
		alert('Critical fields missing! Please refresh and try again.');
		return false;
	}

	$.ajax({
		url: 'api/loanmanegment/saveloanapplication',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(loanApplication),
		success: res => {
			alert('Loan Application saved successfully!');
			location.reload();
			console.log('Save response:', res);
		},
		error: () => {
			alert("Error while saving loan application. Please check console.");
			console.error('Save error details:', arguments);
		}
	});

	return false; // Prevent form submission
}


/*function saveLoanApplication() {

	const loanApplication = {
		loanId: $('#loanId').val(),
		loanDate: $('#loanDate').val(),
		memberId: $('#memberId').val(),

		memberName: $('#memberId option:selected').data('name'),
		relativeDetails: $('#relativeDetails').val(),
		dateOfBirth: $('#dateOfBirth').val(),
		age: $('#age').val(),
		contactNo: $('#contactNo').val(),
		address: $('#address').val(),
		pinCode: $('#pinCode').val(),
		branchName: $('#branchName').val(),
		loanPlanName: $('#loanPlanName').val(),
		typeOfLoan: $('#typeOfLoan').val(),
		loanMode: $('#loanMode').val(),
		loanTerm: $('#loanTerm').val(),
		rateOfInterest: $('#rateOfInterest').val(),
		loanAmount: $('#loanAmount').val(),
		interestType: $('#interestType').val(),
		emiPayment: $('#emiPayment').val(),
		purposeOfLoan: $('#purposeOfLoan').val(),
		loanStatus: "ACTIVE"
	};

	$.ajax({
		url: 'api/loanmanegment/saveloanapplication',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(loanApplication),
		success: res => alert(res.message),
		error: () => alert("Error while saving loan")
	});
}
*/
/* =====================================================
   FINANCIAL CONSULTANT
===================================================== */
function fetchFinancialConsultants() {
	$.ajax({
		url: 'api/financialconsultant/getAllFinancialConsultantDetails',
		type: 'POST',
		success: function(response) {
			const dropdown = $('#financialConsultantId');
			dropdown.empty().append('<option value="">-- SELECT FINANCIAL CONSULTANT ID --</option>');
			response.data.forEach(c =>
				dropdown.append(`<option value="${c.financialCode}">${c.financialCode}</option>`)
			);
		}
	});
}

function fetchConsultantName() {
	const code = $(this).val();
	if (!code) return;

	$.ajax({
		url: 'api/financialconsultant/getfinancialHierarchyByFinancialCode',
		type: 'GET',
		data: { financialCode: code },
		success: res => $('#financialConsultantName').val(res.data[0]?.financialName || '')
	});
}
