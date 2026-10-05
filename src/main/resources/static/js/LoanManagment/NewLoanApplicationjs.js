/* =====================================================
   GLOBAL DOCUMENT READY
===================================================== */
let photoName = null;
let signatureName = null;
$(document).ready(function() {
	$('#photo').on('change', function() {
		if (this.files.length > 0) {
			photoName = this.files[0].name;
			console.log("Photo Selected:", photoName);
		}
	});

	$('#signature').on('change', function() {
		if (this.files.length > 0) {
			signatureName = this.files[0].name;
			console.log("Signature Selected:", signatureName);
		}
	});
	console.log("Document ready");

	fetchApprovedMembers();
	fetchFinancialConsultants();

	/* ================= EVENTS ================= */
	$('#memberId,#guarantorMemberId,#coApplicantMemberId').on('change', handleMemberChange);
	$('#guarantorIdentity').on('change', handleGuarantorIdentityChange);
	$('#coApplicantIdentity').on('change', handleCoApplicantIdentityChange);

	// Dynamic loan type fields trigger (supports selecting from datalist or typing)
	$(document).on('input change', '#typeOfLoan', function() {
		renderDynamicFields($(this).val());
	});

	// Dynamic Loan Mode term label, placeholder, helper text and validation triggers
	$(document).on('input change', '#loanMode', updateLoanModeFields);
	$(document).on('input keyup change', '#loanTerm, #rateOfInterest', validateModeRanges);

	// 🔥 EMI AUTO CALCULATION TRIGGER (input/change on Loan Amount, Rate of Interest, Loan Term, Loan Mode, Interest Type)
	$(document).on(
		'input keyup change',
		'#loanAmount,#rateOfInterest,#loanTerm,#loanMode,#interestType',
		function() {
			calculateEMI();
		}
	);

	$(document).on('input keyup change', '#emiPayment', function() {
		const emi = parseFloat($(this).val()) || 0;
		const tenure = parseInt($('#loanTerm').val(), 10) || 0;
		const loanAmount = parseFloat($('#loanAmount').val()) || 0;
		if (emi > 0 && tenure > 0) {
			const totalPayable = emi * tenure;
			const totalInterest = Math.max(0, totalPayable - loanAmount);
			$('#totalInterest').val('Rs. ' + totalInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
			$('#totalPayableAmount').val('Rs. ' + totalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

			$('#summaryPrincipalText').html('&#8377; ' + loanAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
			$('#summaryInterestText').html('&#8377; ' + totalInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
			$('#summaryPayableText').html('&#8377; ' + totalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
			$('#summaryEmiText').html('&#8377; ' + emi.toFixed(2) + ' &times; ' + tenure + ' installments');
			$('#repaymentBreakdownBox').slideDown(200);
		}
	});

	$('#saveBtn').on('click', function(e) {
		e.preventDefault();
		saveLoanApplication();
	});

	$('#formid').on('submit', function(e) {
		e.preventDefault();
		saveLoanApplication();
		return false;
	});

	$('#financialConsultantId').on('change', fetchConsultantName);

	// Real-time Deduction & Net Disbursement Calculation
	setupDeductionListeners();

	// Initialize Loan Mode fields on page load
	updateLoanModeFields();
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
				$('#dateOfBirth').val(d.dob || '');
				$('#age').val(d.customerAge || '');
				$('#contactNo').val(d.contactNo || '');
				$('#address').val((d.customerAddress || '').toUpperCase());
				$('#pinCode').val(d.pinCode || '');
				$('#branchName').val(d.branchName || '');

				// Auto-fetch customer details: enforce readonly via JS
				['dateOfBirth', 'age', 'contactNo', 'address', 'pinCode'].forEach(id => {
					const el = document.getElementById(id);
					if (el) el.readOnly = true;
				});

				setImage('#photoPreview', '#photoHidden', d.customerPhoto);
				setImage('#signaturePreview', '#signatureHidden', d.customerSignature);
			}

			if (changedId === 'guarantorMemberId') {
				guarantorCustomerData = d;
				$('#guarantorAddress').val((d.customerAddress).toUpperCase() || '');
				$('#guarantorPinCode').val(d.pinCode || '');
				$('#guarantorContactNo').val(d.contactNo || '');
				handleGuarantorIdentityChange();
			}

			if (changedId === 'coApplicantMemberId') {
				coApplicantCustomerData = d;
				$('#coApplicantAddress').val((d.customerAddress).toUpperCase() || '');
				$('#coApplicantPinCode').val(d.pinCode || '');
				$('#coApplicantContactNo').val(d.contactNo || '');
				handleCoApplicantIdentityChange();
			}
		}
	});
}

/* =====================================================
   IDENTITY CHANGE (AADHAR / PAN NUMBER FIELD)
===================================================== */
let guarantorCustomerData = null;
let coApplicantCustomerData = null;

function handleGuarantorIdentityChange() {
	const val = ($('#guarantorIdentity').val() || '').toLowerCase();
	const container = $('#guarantorIdentityNoContainer');
	const label = $('#guarantorIdentityNoLabel');
	const input = $('#guarantorIdentityNo');

	if (val.includes('aadhar')) {
		container.show();
		label.text('AADHAR NUMBER');
		input.attr('placeholder', 'ENTER AADHAR NUMBER');
		input.attr('maxlength', '12');
		if (guarantorCustomerData && guarantorCustomerData.aadharNo) {
			input.val(guarantorCustomerData.aadharNo);
		}
	} else if (val.includes('pan')) {
		container.show();
		label.text('PAN CARD NUMBER');
		input.attr('placeholder', 'ENTER PAN CARD NUMBER');
		input.attr('maxlength', '10');
		if (guarantorCustomerData && guarantorCustomerData.panNo) {
			input.val(guarantorCustomerData.panNo);
		}
	} else {
		container.hide();
		input.val('');
	}
}

function handleCoApplicantIdentityChange() {
	const val = ($('#coApplicantIdentity').val() || '').toLowerCase();
	const container = $('#coApplicantIdentityNoContainer');
	const label = $('#coApplicantIdentityNoLabel');
	const input = $('#coApplicantIdentityNo');

	if (val.includes('aadhar')) {
		container.show();
		label.text('AADHAR NUMBER');
		input.attr('placeholder', 'ENTER AADHAR NUMBER');
		input.attr('maxlength', '12');
		if (coApplicantCustomerData && coApplicantCustomerData.aadharNo) {
			input.val(coApplicantCustomerData.aadharNo);
		}
	} else if (val.includes('pan')) {
		container.show();
		label.text('PAN CARD NUMBER');
		input.attr('placeholder', 'ENTER PAN CARD NUMBER');
		input.attr('maxlength', '10');
		if (coApplicantCustomerData && coApplicantCustomerData.panNo) {
			input.val(coApplicantCustomerData.panNo);
		}
	} else {
		container.hide();
		input.val('');
	}
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

			if (response.status !== "FOUND" || !response.data || !response.data.length) return;
			const c = response.data[0];
			if (c.typeLoan) {
				$('#typeOfLoan').val(c.typeLoan);
				renderDynamicFields(c.typeLoan);
			}
			$('#loanMode').val(c.loanMode);
			$('#loanTerm').val(c.loanTerm);
			$('#rateOfInterest').val(c.rateIntrestType);
			$('#interestType').val(c.typeIntrest);
			$('#hiddenLoanAmount').val(c.loanAmount || 0);

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
   RENDER DYNAMIC LOAN FIELDS
===================================================== */
function renderDynamicFields(selectedType) {
	const container = document.getElementById('dynamicLoanFields');
	if (!container) return;
	container.innerHTML = '';

	if (!selectedType || typeof loanTypeFieldsConfig === 'undefined' || !loanTypeFieldsConfig[selectedType]) {
		return;
	}

	const fields = loanTypeFieldsConfig[selectedType];
	if (!fields || !fields.length) return;

	// Section Title
	const headerCol = document.createElement('div');
	headerCol.className = 'col-12 mt-3 mb-2';
	headerCol.innerHTML = `
		<nav>
			<ol class="breadcrumb breadcrumb-title">
				<li class="breadcrumb-item action">${selectedType.toUpperCase()} SPECIFIC DETAILS</li>
			</ol>
		</nav>`;
	container.appendChild(headerCol);

	fields.forEach(field => {
		const col = document.createElement('div');
		col.className = 'col-lg-3';

		const star = field.required ? '<span class="star" style="color: red;">*</span>' : '';
		const isRequired = field.required ? 'required="required"' : '';
		const isReadOnly = field.readOnly ? 'readonly="readonly"' : '';

		if (field.type === 'checkbox') {
			col.innerHTML = `
				<div class="d-flex flex-column formFields mb-4">
					<label for="${field.name}">${field.label.toUpperCase()} ${star}</label>
					<div class="d-flex align-items-center mt-2" style="height: 30px;">
						<input type="checkbox" name="${field.name}" id="${field.name}" ${isRequired}
							style="width: 20px; height: 20px; cursor: pointer;" />
						<label for="${field.name}" class="ms-2 mb-0" style="cursor: pointer; font-size: 12px;">CONFIRM</label>
					</div>
				</div>`;
		} else if (field.type === 'file') {
			col.innerHTML = `
				<div class="d-flex flex-column formFields mb-4">
					<label for="${field.name}">${field.label.toUpperCase()} ${star}</label>
					<input type="file" name="${field.name}" id="${field.name}" ${isRequired}
						class="form-control" style="font-size: 12px; height: 35px;" />
				</div>`;
		} else {
			col.innerHTML = `
				<div class="d-flex flex-column formFields mb-4">
					<label for="${field.name}">${field.label.toUpperCase()} ${star}</label>
					<input type="${field.type}" name="${field.name}" id="${field.name}" ${isRequired} ${isReadOnly}
						placeholder="ENTER ${field.label.toUpperCase()}"
						class="form-control" style="height: 30px; font-size: 12px; text-transform: uppercase;" />
				</div>`;
		}

		container.appendChild(col);
	});

	// For "Loan Against FD/RD/DRD": listener on depositAmount to auto-calculate marginPercent as 75% of depositAmount
	if (selectedType === 'Loan Against FD/RD/DRD') {
		const depEl = document.getElementById('depositAmount');
		const marginEl = document.getElementById('marginPercent');
		if (depEl && marginEl) {
			const updateMargin = function() {
				const depVal = parseFloat(depEl.value) || 0;
				marginEl.value = (depVal * 0.75).toFixed(2);
			};
			depEl.addEventListener('input', updateMargin);
			depEl.addEventListener('change', updateMargin);
			updateMargin();
		}
	}
}

/* =====================================================
   LOAN MODE RANGE CONFIGURATION & VALIDATION
===================================================== */
const loanModeConfig = {
	Daily: { unit: 'Days', label: 'Days', minTerm: 30, maxTerm: 180, minRate: 24.0, maxRate: 36.0, periodsPerYear: 365 },
	Weekly: { unit: 'Weeks', label: 'Weeks', minTerm: 8, maxTerm: 52, minRate: 20.0, maxRate: 30.0, periodsPerYear: 52 },
	Fortnightly: { unit: 'Fortnights', label: 'Fortnights', minTerm: 6, maxTerm: 24, minRate: 18.0, maxRate: 28.0, periodsPerYear: 26 },
	Monthly: { unit: 'Months', label: 'Months', minTerm: 6, maxTerm: 60, minRate: 12.0, maxRate: 24.0, periodsPerYear: 12 },
	Quarterly: { unit: 'Quarters', label: 'Quarters', minTerm: 4, maxTerm: 20, minRate: 12.0, maxRate: 20.0, periodsPerYear: 4 },
	'Half-Yearly': { unit: 'Half-Years', label: 'Half-Years', minTerm: 2, maxTerm: 10, minRate: 12.0, maxRate: 18.0, periodsPerYear: 2 },
	Yearly: { unit: 'Years', label: 'Years', minTerm: 1, maxTerm: 5, minRate: 10.0, maxRate: 18.0, periodsPerYear: 1 }
};

function getLoanModeConfig(mode) {
	if (!mode) mode = 'Monthly';
	const clean = mode.trim().toLowerCase().replace(/[- _]/g, '');
	for (let k in loanModeConfig) {
		if (k.toLowerCase().replace(/[- _]/g, '') === clean) {
			return loanModeConfig[k];
		}
	}
	return loanModeConfig['Monthly'];
}

function updateLoanModeFields() {
	const mode = $('#loanMode').val();
	const config = getLoanModeConfig(mode);

	// Update label and placeholder dynamically
	$('#loanTermLabel').text(`LOAN TERM (${config.label.toUpperCase()})`);
	$('#loanTerm').attr('placeholder', `ENTER LOAN TERM (${config.label.toUpperCase()})`);

	// Update helper text
	$('#loanTermHelper').text(`Typical range: ${config.minTerm}-${config.maxTerm} ${config.unit.toLowerCase()}`);
	$('#roiHelper').text(`Typical range: ${config.minRate}% - ${config.maxRate}%`);

	// Re-check warnings and calculate EMI
	validateModeRanges();
	calculateEMI();
}

function validateModeRanges() {
	const mode = $('#loanMode').val();
	const config = getLoanModeConfig(mode);

	const termStr = ($('#loanTerm').val() || '').trim();
	const rateStr = ($('#rateOfInterest').val() || '').trim();

	// Check Loan Term
	if (termStr !== '') {
		const term = parseInt(termStr, 10);
		if (!isNaN(term) && (term < config.minTerm || term > config.maxTerm)) {
			$('#loanTerm').addClass('border-warning-range');
			$('#loanTermWarning').show();
		} else {
			$('#loanTerm').removeClass('border-warning-range');
			$('#loanTermWarning').hide();
		}
	} else {
		$('#loanTerm').removeClass('border-warning-range');
		$('#loanTermWarning').hide();
	}

	// Check Rate of Interest
	if (rateStr !== '') {
		const rate = parseFloat(rateStr);
		if (!isNaN(rate) && (rate < config.minRate || rate > config.maxRate)) {
			$('#rateOfInterest').addClass('border-warning-range');
			$('#roiWarning').show();
		} else {
			$('#rateOfInterest').removeClass('border-warning-range');
			$('#roiWarning').hide();
		}
	} else {
		$('#rateOfInterest').removeClass('border-warning-range');
		$('#roiWarning').hide();
	}
}

/* =====================================================
   EMI CALCULATION (DYNAMIC BASED ON LOAN MODE & INTEREST TYPE)
===================================================== */
function calculateEMI() {
	const loanAmount = parseFloat($('#loanAmount').val()) || 0;
	const rateStr = ($('#rateOfInterest').val() || '').trim();
	const annualRate = parseFloat(rateStr) || 0;
	const tenure = parseInt($('#loanTerm').val(), 10) || 0;
	const mode = $('#loanMode').val();
	const config = getLoanModeConfig(mode);
	const interestType = ($('#interestType').val() || '').trim().toLowerCase();

	if (!loanAmount || !tenure || rateStr === '') {
		$('#emiPayment').val('');
		$('#totalInterest').val('');
		$('#totalPayableAmount').val('');
		$('#repaymentBreakdownBox').slideUp(150);
		return;
	}

	// N is the number of installments (Loan Term in units of the mode)
	const N = tenure;
	// Periodic interest rate R = annualRate / periodsPerYear / 100
	const periodsPerYear = config.periodsPerYear || 12;
	const R = (annualRate / periodsPerYear) / 100;

	let emi = 0;
	let totalInterest = 0;
	let totalPayable = 0;

	// Check interest calculation type
	if (interestType.includes('flat')) {
		// Flat Interest: Interest = P * (R_annual / 100) * (N / periodsPerYear)
		const years = N / periodsPerYear;
		totalInterest = loanAmount * (annualRate / 100) * years;
		totalPayable = loanAmount + totalInterest;
		emi = totalPayable / N;
	} else if (interestType.includes('78') || interestType.includes('rule')) {
		// Rule 78: Total interest = P * R * N, equal installment = (P + Total Interest) / N
		totalInterest = loanAmount * R * N;
		totalPayable = loanAmount + totalInterest;
		emi = totalAmount / N;
	} else {
		// Reducing / Amortization: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
		if (annualRate === 0 || R === 0) {
			emi = loanAmount / N;
			totalPayable = loanAmount;
			totalInterest = 0;
		} else {
			const factor = Math.pow(1 + R, N);
			emi = (loanAmount * R * factor) / (factor - 1);
			totalPayable = emi * N;
			totalInterest = Math.max(0, totalPayable - loanAmount);
		}
	}

	if (!isNaN(emi) && isFinite(emi) && emi > 0) {
		$('#emiPayment').val(emi.toFixed(2));
		$('#totalInterest').val('Rs. ' + totalInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		$('#totalPayableAmount').val('Rs. ' + totalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

		// Update visual breakdown banner
		$('#summaryPrincipalText').html('&#8377; ' + loanAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		$('#summaryInterestText').html('&#8377; ' + totalInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		$('#summaryPayableText').html('&#8377; ' + totalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		$('#summaryEmiText').html('&#8377; ' + emi.toFixed(2) + ' &times; ' + N + ' installments');
		$('#repaymentBreakdownBox').slideDown(200);
	}
}


/* =====================================================
   CHARGES CALCULATION
===================================================== */
function calculateNewFees() {
	const loanAmount = parseFloat($('#loanAmount').val()) || 0;
	const hiddenLoanAmount = parseFloat($('#hiddenLoanAmount').val()) || 0;

	// Exit early if loan amount validation fails
	const minAmount = hiddenLoanAmount > 0 ? hiddenLoanAmount : 1000;
	if (loanAmount < minAmount) {
		$("#chkloanamount").text("* Amount must be >= " + minAmount);
		return false;
	}

	// Calculate individual fees based on loan amount percentages
	const processing = loanAmount * (parseFloat($('#hiddenProcessingFee').val()) || 0) / 100;
	const legal = loanAmount * (parseFloat($('#hiddenLegalCharges').val()) || 0) / 100;
	const insurance = loanAmount * (parseFloat($('#hiddenInsuranceFee').val()) || 0) / 100;
	const valuation = loanAmount * (parseFloat($('#hiddenValuationFees').val()) || 0) / 100;

	// Default GST 18% of processing fee (or scheme GST rate if set)
	const gstRate = parseFloat($('#hiddenGST').val()) || 18;
	const gst = processing * (gstRate / 100);

	// Update all fee fields with formatted values
	$('#processingFee').val(processing.toFixed(2));
	$('#legalCharges').val(legal.toFixed(2));
	$('#insuranceFee').val(insurance.toFixed(2));
	$('#valuationFees').val(valuation.toFixed(2));
	$('#gst').val(gst.toFixed(2));
	$('#stationaryFee').val('50.00');

	isGstManuallyEdited = false;
	$("#chkloanamount").text("");

	recalculateDeductions();
	return true;
}

/* =====================================================
   REAL-TIME DEDUCTION DETAILS & NET DISBURSEMENT CALCULATION
===================================================== */
let isGstManuallyEdited = false;

function setupDeductionListeners() {
	// Processing Fee input -> recalculate GST (if not overridden) & recalculate deductions
	$(document).on('input keyup change', '#processingFee', function() {
		let val = parseFloat($(this).val());
		if (isNaN(val) || val < 0) {
			$(this).val('0.00');
			val = 0;
		}
		if (!isGstManuallyEdited) {
			const gstVal = val * 0.18;
			$('#gst').val(gstVal.toFixed(2));
		}
		recalculateDeductions();
	});

	// GST field manual edit -> mark as manual override
	$(document).on('input keyup change', '#gst', function() {
		let val = parseFloat($(this).val());
		if (isNaN(val) || val < 0) {
			$(this).val('0.00');
		}
		isGstManuallyEdited = true;
		recalculateDeductions();
	});

	// Other fee fields input
	$(document).on('input keyup change', '#legalCharges, #insuranceFee, #valuationFees, #stationaryFee', function() {
		let val = parseFloat($(this).val());
		if (isNaN(val) || val < 0) {
			$(this).val('0.00');
		}
		recalculateDeductions();
	});

	// Loan Amount changes affect fees, EMI, net disbursement and validation
	$(document).on('input keyup change', '#loanAmount', function() {
		recalculateDeductions();
	});

	// Initial run for edit page or prefilled form
	recalculateDeductions();
}

function recalculateDeductions() {
	const loanAmount = parseFloat($('#loanAmount').val()) || 0;
	const processingFee = parseFloat($('#processingFee').val()) || 0;
	const legalCharges = parseFloat($('#legalCharges').val()) || 0;
	const gst = parseFloat($('#gst').val()) || 0;
	const insuranceFee = parseFloat($('#insuranceFee').val()) || 0;
	const valuationFees = parseFloat($('#valuationFees').val()) || 0;
	const stationaryFee = parseFloat($('#stationaryFee').val()) || 0;

	const totalDeductions = processingFee + legalCharges + gst + insuranceFee + valuationFees + stationaryFee;
	const netDisbursement = loanAmount > 0 ? (loanAmount - totalDeductions) : 0;

	// Update summary cards
	$('#summaryLoanAmount').text(loanAmount.toFixed(2));
	$('#summaryTotalDeductions').text(totalDeductions.toFixed(2));
	$('#summaryNetDisbursement').text(netDisbursement.toFixed(2));
	$('#netDisbursementAmount').val(netDisbursement.toFixed(2));

	const warningEl = $('#deductionWarning');
	const netWrapper = $('#summaryNetDisbursementWrapper');
	const saveBtn = $('#saveBtn');

	if (loanAmount <= 0) {
		if (totalDeductions > 0) {
			warningEl.removeClass('d-none').text('⚠️ Please enter a valid Loan Amount before applying deductions.');
			netWrapper.css('color', '#dc3545');
			saveBtn.prop('disabled', true);
		} else {
			warningEl.addClass('d-none').text('');
			netWrapper.css('color', '#16a34a');
			saveBtn.prop('disabled', false);
		}
		return false;
	}

	if (totalDeductions > loanAmount) {
		warningEl.removeClass('d-none').text(`⚠️ Total Deductions (₹${totalDeductions.toFixed(2)}) cannot exceed Loan Amount (₹${loanAmount.toFixed(2)})! Save is disabled.`);
		netWrapper.css('color', '#dc3545');
		saveBtn.prop('disabled', true);
		return false;
	} else {
		warningEl.addClass('d-none').text('');
		netWrapper.css('color', '#16a34a');
		saveBtn.prop('disabled', false);
		return true;
	}
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

	if (!$('#financialConsultantId').val()) {
		alert('Please select EMPLOYEE ID!');
		$('#financialConsultantId').focus();
		return false;
	}

	// Check Interest Type
	const interestTypeVal = ($('#interestType').val() || '').trim();
	if (!interestTypeVal) {
		alert('Please select or enter INTEREST TYPE!');
		$('#interestType').focus();
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
		'#loanDate', '#purposeOfLoan', '#dateOfBirth',
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
		loanId: $('#loanId').val() || '',
		loanDate: $('#loanDate').val(),
		memberId: $('#memberId').val(),
		memberName: $('#memberName').val() || $('#memberId option:selected').data('name') || $('#memberId option:selected').text(),

		relativeDetails: $('#relativeDetails').val() || '',
		dateOfBirth: $('#dateOfBirth').val(),
		age: $('#age').val(),
		contactNo: $('#contactNo').val(),
		address: $('#address').val(),
		pinCode: $('#pinCode').val(),
		branchName: $('#branchName').val(),

		loanPlanName: $('#loanPlanName').val() || '',
		typeOfLoan: $('#typeOfLoan').val(),
		loanMode: $('#loanMode').val(),
		loanTerm: $('#loanTerm').val(),
		rateOfInterest: $('#rateOfInterest').val(),
		loanAmount: $('#loanAmount').val(),
		interestType: $('#interestType').val(),
		emiPayment: $('#emiPayment').val(),
		totalInterest: ($('#totalInterest').val() || '').replace(/[^0-9.]/g, ''),
		totalPayableAmount: ($('#totalPayableAmount').val() || '').replace(/[^0-9.]/g, ''),
		purposeOfLoan: $('#purposeOfLoan').val(),
		loanStatus: "ACTIVE",
		messageStatus: $('#messageStatus').is(':checked') ? 1 : 0,

		/* Range Override tracking */
		isRangeOverride: (function() {
			const modeConf = getLoanModeConfig($('#loanMode').val());
			const termVal = parseInt($('#loanTerm').val(), 10) || 0;
			const rateVal = parseFloat($('#rateOfInterest').val()) || 0;
			return (termVal < modeConf.minTerm || termVal > modeConf.maxTerm || rateVal < modeConf.minRate || rateVal > modeConf.maxRate);
		})(),
		rangeOverrideReason: (function() {
			const modeConf = getLoanModeConfig($('#loanMode').val());
			const termVal = parseInt($('#loanTerm').val(), 10) || 0;
			const rateVal = parseFloat($('#rateOfInterest').val()) || 0;
			let reasons = [];
			if (termVal < modeConf.minTerm || termVal > modeConf.maxTerm) {
				reasons.push(`Term (${termVal} ${modeConf.unit}) outside typical range [${modeConf.minTerm}-${modeConf.maxTerm}]`);
			}
			if (rateVal < modeConf.minRate || rateVal > modeConf.maxRate) {
				reasons.push(`Rate (${rateVal}%) outside typical range [${modeConf.minRate}%-${modeConf.maxRate}%]`);
			}
			return reasons.length > 0 ? reasons.join('; ') : null;
		})(),

		/* ================= GUARANTOR ================= */
		guarantorMemberId: $('#guarantorMemberId').val(),
		guarantorIdentity: $('#guarantorIdentity').val(),
		guarantorIdentityNo: $('#guarantorIdentityNo').val() || '',
		guarantorAadharNo: ($('#guarantorIdentity').val() || '').toLowerCase().includes('aadhar') ? ($('#guarantorIdentityNo').val() || '') : '',
		guarantorPanNo: ($('#guarantorIdentity').val() || '').toLowerCase().includes('pan') ? ($('#guarantorIdentityNo').val() || '') : '',
		guarantorAddress: $('#guarantorAddress').val(),
		guarantorPinCode: $('#guarantorPinCode').val(),
		guarantorContactNo: $('#guarantorContactNo').val(),
		guarantorSecurityType: $('#guarantorSecurityType').val(),

		/* ================= CO-APPLICANT ================= */
		coApplicantMemberId: $('#coApplicantMemberId').val(),
		coApplicantIdentity: $('#coApplicantIdentity').val(),
		coApplicantIdentityNo: $('#coApplicantIdentityNo').val() || '',
		coApplicantAadharNo: ($('#coApplicantIdentity').val() || '').toLowerCase().includes('aadhar') ? ($('#coApplicantIdentityNo').val() || '') : '',
		coApplicantPanNo: ($('#coApplicantIdentity').val() || '').toLowerCase().includes('pan') ? ($('#coApplicantIdentityNo').val() || '') : '',
		coApplicantAddress: $('#coApplicantAddress').val(),
		coApplicantPinCode: $('#coApplicantPinCode').val(),
		coApplicantContactNo: $('#coApplicantContactNo').val(),
		coApplicantSecurityType: $('#coApplicantSecurityType').val(),

		/* ================= FEES & DEDUCTIONS ================= */
		financialConsultantId: $('#financialConsultantId').val(),
		financialConsultantName: $('#financialConsultantName').val(),
		processingFee: $('#processingFee').val() || '0.00',
		legalCharges: $('#legalCharges').val() || '0.00',
		insuranceFee: $('#insuranceFee').val() || '0.00',
		valuationFees: $('#valuationFees').val() || '0.00',
		gst: $('#gst').val() || '0.00',
		stationaryFee: $('#stationaryFee').val() || '0.00',
		netDisbursementAmount: $('#netDisbursementAmount').val() || '0.00',
		deductionDetails: {
			processingFee: parseFloat($('#processingFee').val()) || 0,
			legalCharges: parseFloat($('#legalCharges').val()) || 0,
			gst: parseFloat($('#gst').val()) || 0,
			insuranceFee: parseFloat($('#insuranceFee').val()) || 0,
			valuationFees: parseFloat($('#valuationFees').val()) || 0,
			stationaryChargesFee: parseFloat($('#stationaryFee').val()) || 0,
			totalDeductions: parseFloat($('#summaryTotalDeductions').text()) || 0,
			netDisbursementAmount: parseFloat($('#netDisbursementAmount').val()) || 0,
			employeeId: $('#financialConsultantId').val(),
			employeeName: $('#financialConsultantName').val()
		},

		/* ================= Photo/Signature ================= */
		photo: $('#photoHidden').val() || photoName || ($('#photo')[0]?.files?.[0]?.name) || '',
		signature: $('#signatureHidden').val() || signatureName || ($('#signature')[0]?.files?.[0]?.name) || ''
	};

	// Collect dynamic loan type specific details
	const selectedLoanType = $('#typeOfLoan').val();
	const dynamicConfig = (typeof loanTypeFieldsConfig !== 'undefined') ? loanTypeFieldsConfig[selectedLoanType] : null;
	const loanTypeSpecificDetails = {};

	if (dynamicConfig && dynamicConfig.length) {
		for (let field of dynamicConfig) {
			const el = document.getElementById(field.name);
			if (!el) continue;

			if (field.type === 'checkbox') {
				loanTypeSpecificDetails[field.name] = el.checked;
				loanApplication[field.name] = el.checked;
				if (field.required && !el.checked) {
					alert(`Please confirm "${field.label}"!`);
					el.focus();
					return false;
				}
			} else if (field.type === 'file') {
				const fileName = el.files && el.files.length > 0 ? el.files[0].name : '';
				loanTypeSpecificDetails[field.name] = fileName;
				loanApplication[field.name] = fileName;
				if (field.required && !fileName) {
					alert(`Please upload "${field.label}"!`);
					el.focus();
					return false;
				}
			} else {
				const val = (el.value || '').trim();
				loanTypeSpecificDetails[field.name] = val;
				loanApplication[field.name] = val;
				if (field.required && !val) {
					alert(`Please enter "${field.label}"!`);
					el.focus();
					return false;
				}
			}
		}
	}

	loanApplication.loanTypeSpecificDetails = JSON.stringify(loanTypeSpecificDetails);

	// Validate deductions before submission
	const loanAmountVal = parseFloat(loanApplication.loanAmount) || 0;
	if (loanAmountVal <= 0) {
		alert('Loan Amount must be greater than 0!');
		$('#loanAmount').focus();
		return false;
	}

	const totalDed = (parseFloat(loanApplication.processingFee) || 0)
		+ (parseFloat(loanApplication.legalCharges) || 0)
		+ (parseFloat(loanApplication.gst) || 0)
		+ (parseFloat(loanApplication.insuranceFee) || 0)
		+ (parseFloat(loanApplication.valuationFees) || 0)
		+ (parseFloat(loanApplication.stationaryFee) || 0);

	if (totalDed > loanAmountVal) {
		alert(`Total deductions (₹${totalDed.toFixed(2)}) cannot exceed Loan Amount (₹${loanAmountVal.toFixed(2)})!`);
		return false;
	}

	// Double-check no null/empty critical values before sending
	if (!loanApplication.memberId || !loanApplication.financialConsultantId || !loanApplication.loanAmount) {
		alert('Critical fields missing! Please check customer, employee and loan amount.');
		return false;
	}

	const saveBtn = $('#saveBtn');
	saveBtn.prop('disabled', true).text('SAVING...');

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
		error: (xhr) => {
			const errMsg = xhr.responseJSON?.message || "Error while saving loan application. Please check input values.";
			alert(errMsg);
			console.error('Save error details:', xhr);
			saveBtn.prop('disabled', false).text('SAVE');
		}
	});

	return false; // Prevent default form submission
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
			dropdown.empty().append('<option value="">-- SELECT EMPLOYEE ID --</option>');
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