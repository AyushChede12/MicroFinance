/**
 * CreateSavingAccount.js
 * Comprehensive client-side logic for Unified Saving & Current Account Opening,
 * AddCustomer master data auto-fetching, banking rules differentiation,
 * and live Accounts Datatable management. All customer details and UI text strictly in UPPERCASE.
 */

let allAccountsData = [];
let branchesList = [];

// ==========================================
// 1. INITIALIZATION & DATA LOADING
// ==========================================
$(document).ready(function () {
	// Automatically convert any user text input or textarea typing to UPPERCASE
	$(document).on('input', 'input[type="text"], textarea', function () {
		this.value = this.value.toUpperCase();
	});

	// Set default opening date to today if empty
	if (!$('#openingDate').val()) {
		const today = new Date().toISOString().split('T')[0];
		$('#openingDate').val(today);
	}

	// Load branches dropdown
	loadBranches();

	// Load Saving Scheme catalog
	loadSavingSchemeCatalog();

	// Load All Accounts Table
	loadSavingsAccountTable();

	// Initialize UI state & load customers based on default account type
	handleAccountTypeChange();

	// Status toggle listener
	$('#toggle-member-status').on('change', function () {
		$('#lblStatus').text(this.checked ? 'ACTIVE' : 'INACTIVE');
	});

	// Real-time Nominee Age Validation (> 20 years)
	$('#suggestedNomineeAge').on('input change', function () {
		validateNomineeAge(false);
	});
});

// Load branches from Preference API
function loadBranches() {
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function (res) {
			const branches = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
			branchesList = branches;
			const $sel = $('#branchName');
			$sel.empty().append('<option value="">-- SELECT BRANCH --</option>');
			branches.forEach(function (b) {
				const bName = b.branchName || b;
				if (bName) {
					$sel.append('<option value="' + bName.toString().toUpperCase() + '">' + bName.toString().toUpperCase() + '</option>');
				}
			});
		},
		error: function () {
			console.warn("Could not load branch modules list.");
		}
	});
}

// Load customers filtered by account type (Saving vs Current)
function loadCustomerDropdown(accountType, selectCode) {
	const selectedType = accountType || $('#typeofaccount').val() || 'savingaccount';
	const isCurrent = (selectedType.toLowerCase() === 'currentaccount');
	const displayTypeLabel = isCurrent ? "CURRENT" : "SAVING";

	const $select = $('#selectByCustomer');
	const $selectJoint = $('#jointOperationCode');
	$select.empty().append('<option value="">-- LOADING ' + displayTypeLabel + ' CUSTOMERS... --</option>');
	$selectJoint.empty().append('<option value="">-- LOADING ' + displayTypeLabel + ' MEMBERS... --</option>');

	$.ajax({
		url: 'api/customersavings/fetchCustomersByAccountType?accountType=' + encodeURIComponent(selectedType),
		type: 'GET',
		success: function (response) {
			let customers = (response && response.data && Array.isArray(response.data)) ? response.data : [];
			if (customers.length > 0) {
				populateCustomerSelects(customers, isCurrent, selectCode);
			} else {
				fallbackGetCustomersFiltered(selectedType, selectCode);
			}
		},
		error: function () {
			fallbackGetCustomersFiltered(selectedType, selectCode);
		}
	});
}

function fallbackGetCustomersFiltered(selectedType, selectCode) {
	const isCurrent = (selectedType.toLowerCase() === 'currentaccount');
	$.ajax({
		url: 'api/customermanagement/getAllCustomer',
		type: 'GET',
		success: function (response) {
			const allCustomers = (response && response.data && Array.isArray(response.data)) ? response.data : [];
			const filtered = allCustomers.filter(function (c) {
				const aType = (c.accountType || '').trim().toUpperCase();
				if (isCurrent) {
					return aType.includes('CURRENT');
				} else {
					return aType.includes('SAVING') || !aType;
				}
			});
			populateCustomerSelects(filtered, isCurrent, selectCode);
		},
		error: function () {
			$('#selectByCustomer').empty().append('<option value="">-- NO CUSTOMERS FOUND --</option>');
			$('#jointOperationCode').empty().append('<option value="">-- NO CUSTOMERS FOUND --</option>');
		}
	});
}

function populateCustomerSelects(customers, isCurrent, selectCode) {
	const $select = $('#selectByCustomer');
	const $selectJoint = $('#jointOperationCode');
	const typeLabel = isCurrent ? "CURRENT" : "SAVING";

	$select.empty().append('<option value="">-- SELECT ' + typeLabel + ' CUSTOMER --</option>');
	$selectJoint.empty().append('<option value="">-- SELECT JOINT MEMBER --</option>');

	if (!customers || customers.length === 0) {
		$select.append('<option value="" disabled>NO ' + typeLabel + ' CUSTOMERS AVAILABLE</option>');
		return;
	}

	const seen = new Set();
	customers.forEach(function (customer) {
		if (!customer.memberCode) return;
		const mCode = customer.memberCode.trim().toUpperCase();
		if (seen.has(mCode)) return;
		seen.add(mCode);

		const fullName = [
			customer.firstName,
			customer.middleName,
			customer.lastName
		].filter(Boolean).join(" ").trim() || customer.customerName || "CUSTOMER";

		const label = fullName.toUpperCase() + " (" + mCode + ") - [" + typeLabel + "]";
		$select.append('<option value="' + mCode + '">' + label + '</option>');
		$selectJoint.append('<option value="' + mCode + '">' + fullName.toUpperCase() + " (" + mCode + ")" + '</option>');
	});

	if (selectCode) {
		const sCodeUpper = selectCode.trim().toUpperCase();
		$select.val(sCodeUpper);
		if (!$select.val()) {
			$select.append('<option value="' + sCodeUpper + '" selected>' + sCodeUpper + '</option>');
			$select.val(sCodeUpper);
		}
	}
}

// Load Savings Scheme Catalog
function loadSavingSchemeCatalog() {
	$.ajax({
		url: "api/customersavings/fetchsavingchemecatalog",
		type: "GET",
		success: function (response) {
			const dropdown = $('#selectPlan');
			dropdown.empty().append('<option value="">-- SELECT SAVINGS PLAN --</option>');

			if (response && response.status === "FOUND" && response.data) {
				$.each(response.data, function (index, item) {
					dropdown.append('<option value="' + item.toString().toUpperCase() + '">' + item.toString().toUpperCase() + '</option>');
				});
			}
		},
		error: function () {
			console.warn("Could not load saving schemes.");
		}
	});
}

// ==========================================
// 2. FETCH FROM ADDCUSTOMER ON SELECTION
// ==========================================
$('#selectByCustomer').on('change', function () {
	const selectedCode = ($(this).val() || '').trim().toUpperCase();

	if (!selectedCode) {
		clearCustomerFields();
		return;
	}

	$.ajax({
		url: 'api/customersavings/fetchCustomerCode',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({ memberCode: selectedCode }),
		success: function (response) {
			if (response && response.status === "FOUND" && response.data && response.data.length > 0) {
				const customer = response.data[0];

				// Build full customer name in UPPERCASE
				const fullName = [
					customer.firstName,
					customer.middleName,
					customer.lastName
				].filter(Boolean).join(" ").trim() || customer.customerName || "";

				$('#enterCustomerName').val(fullName.toUpperCase());
				$('#dateOfBirth').val(customer.dob || "");
				$('#familyDetails').val((customer.guardianName || "").toUpperCase());
				$('#contactNumber').val(customer.contactNo || "");
				$('#emailId').val((customer.emailId || "").toUpperCase());
				$('#aadharNo').val(customer.aadharNo || "");
				$('#panNo').val((customer.panNo || customer.taxBill || "").toUpperCase());

				$('#address').val((customer.customerAddress || "").toUpperCase());
				$('#district').val((customer.district || "").toUpperCase());
				$('#state').val((customer.state || "").toUpperCase());
				$('#pinCode').val(customer.pinCode || "");

				// Match branch in UPPERCASE
				if (customer.branchName) {
					const cBranch = customer.branchName.trim().toUpperCase();
					let matched = false;
					$('#branchName option').each(function () {
						if ($(this).val().toUpperCase() === cBranch) {
							$('#branchName').val($(this).val());
							matched = true;
							return false;
						}
					});
					if (!matched && cBranch) {
						$('#branchName').append('<option value="' + cBranch + '" selected>' + cBranch + '</option>');
					}
				}

				// Nominee Details in UPPERCASE
				$('#suggestedNomineeName').val((customer.nomineeName || "").toUpperCase());
				if (customer.nomineeAge) {
					$('#suggestedNomineeAge').val(customer.nomineeAge);
					validateNomineeAge(false);
				}
				if (customer.nomineeRelationToApplicant) {
					const rel = customer.nomineeRelationToApplicant.trim().toUpperCase();
					$('#suggestedNomineeRelation').val(rel);
				}

				// KYC Media Previews
				if (customer.customerPhoto) {
					const photoPath = 'Uploads/' + customer.customerPhoto;
					$('#photoPreview').attr('src', photoPath);
					$('#photoHidden').val(customer.customerPhoto);
				} else {
					$('#photoPreview').attr('src', 'Uploads/default-placeholder.jpg');
					$('#photoHidden').val('');
				}

				if (customer.customerSignature) {
					const signPath = 'Uploads/' + customer.customerSignature;
					$('#signaturePreview').attr('src', signPath);
					$('#signatureHidden').val(customer.customerSignature);
				} else {
					$('#signaturePreview').attr('src', 'Uploads/default-placeholder.jpg');
					$('#signatureHidden').val('');
				}

				// Auto-populate Current Account specific fields from Customer master if applicable
				const currentType = $('#typeofaccount').val();
				if (currentType === 'currentaccount') {
					if (customer.taxBill && !$('#gstin').val()) {
						$('#gstin').val(customer.taxBill.trim().toUpperCase());
					}
					if (customer.profession && !$('#businessName').val()) {
						$('#businessName').val(customer.profession.trim().toUpperCase());
					}
				}

			} else {
				alert("NO CUSTOMER MASTER RECORD FOUND FOR: " + selectedCode);
				clearCustomerFields();
			}
		},
		error: function () {
			alert("ERROR FETCHING CUSTOMER DATA FROM SERVER.");
			clearCustomerFields();
		}
	});
});

function clearCustomerFields() {
	$('#enterCustomerName').val('');
	$('#dateOfBirth').val('');
	$('#familyDetails').val('');
	$('#contactNumber').val('');
	$('#emailId').val('');
	$('#aadharNo').val('');
	$('#panNo').val('');
	$('#address').val('');
	$('#district').val('');
	$('#state').val('');
	$('#pinCode').val('');
	$('#suggestedNomineeName').val('');
	$('#suggestedNomineeAge').val('').removeClass('is-invalid');
	$('#chksuggestedNomineeAge').text('');
	$('#suggestedNomineeRelation').val('');
	$('#photoPreview').attr('src', 'Uploads/default-placeholder.jpg');
	$('#photoHidden').val('');
	$('#signaturePreview').attr('src', 'Uploads/default-placeholder.jpg');
	$('#signatureHidden').val('');
}

// ==========================================
// 3. ACCOUNT TYPE SWITCHING (SAVING vs CURRENT)
// ==========================================
function handleAccountTypeChange(selectCode) {
	const type = $('#typeofaccount').val();
	const isCurrent = (type === 'currentaccount');

	// Clear validation messages
	$('#chktypeofaccount, #chkselectcustomer, #chkselectplan').text('');

	// If not restoring an edit, clear customer fields
	if (!selectCode) {
		clearCustomerFields();
	}

	// Update filter badge text in UI
	$('#customerTypeFilterBadge').text(isCurrent ? '(CURRENT CUSTOMERS)' : '(SAVING CUSTOMERS)');

	// Reload customer dropdown strictly for this Account Type
	loadCustomerDropdown(type, selectCode);

	if (isCurrent) {
		// Switch to CURRENT mode
		$('#currentFieldsSection').slideDown(200);
		$('#savingFieldsSection').slideUp(200);

		$('#currentModeBadge')
			.removeClass('pill-saving')
			.addClass('pill-current')
			.html('<i class="bi bi-briefcase"></i> CURRENT ACCOUNT MODE');

		$('#secAccountBasic, #secSchemeRules')
			.removeClass('saving-accent')
			.addClass('current-accent');

		// Enable Current-only operation types
		$('.current-only-opt').show();

		// Auto-enable debit card for Current account
		$('#toggle-member-status2').prop('checked', true);

		// Clear plan mandatory error if shown
		$('#chkselectplan').text('');

	} else {
		// Switch to SAVING mode
		$('#savingFieldsSection').slideDown(200);
		$('#currentFieldsSection').slideUp(200);

		$('#currentModeBadge')
			.removeClass('pill-current')
			.addClass('pill-saving')
			.html('<i class="bi bi-piggy-bank"></i> SAVING ACCOUNT MODE');

		$('#secAccountBasic, #secSchemeRules')
			.removeClass('current-accent')
			.addClass('saving-accent');

		// Hide Current-only operation types and reset if selected
		$('.current-only-opt').hide();
		if ($('#operationType').val() === 'Either or Survivor' || $('#operationType').val() === 'Authorized Signatory') {
			$('#operationType').val('Single');
			operationTypeFunc();
		}

		// Clear Current-specific fields
		$('#overdraftLimit').val('');
		$('#businessName').val('');
		$('#gstin').val('');
	}
}

// Fetch Minimum Balance on Plan selection (Savings)
$('#selectPlan').on('change', function () {
	const selectedName = $(this).val();
	if (selectedName) {
		$.ajax({
			url: 'api/customersavings/fetchpolicyname?policyName=' + encodeURIComponent(selectedName),
			type: 'GET',
			success: function (response) {
				if (response && response.status === "FOUND" && response.data && response.data.length > 0) {
					const policy = response.data[0];
					const minBal = policy.monthlyMinimumBalance || policy.minimumBalance || "500";
					$('#balance').val(minBal);
					if (!$('#openingFees').val()) {
						$('#openingFees').val(minBal);
					}
				}
			}
		});
	} else {
		$('#balance').val('');
	}
});

// Fetch Financial Consultant on Blur
$('#financialConsultantCode').on('blur', function () {
	const code = $(this).val().trim().toUpperCase();
	if (code) {
		$.ajax({
			url: 'api/customersavings/fetchfinancialcode?financialCode=' + encodeURIComponent(code),
			type: 'GET',
			success: function (response) {
				if (response && response.status === "FOUND" && response.data && response.data.length > 0) {
					$('#financialConsultantName').val(response.data[0].financialName.toUpperCase());
					$('#chkfinancialcode').text('');
				} else {
					$('#financialConsultantName').val('');
					$('#chkfinancialcode').text('* CONSULTANT NOT FOUND');
				}
			},
			error: function () {
				$('#financialConsultantName').val('');
			}
		});
	} else {
		$('#financialConsultantName').val('');
	}
});

// Operation Type Change handler
function operationTypeFunc() {
	const opType = $('#operationType').val();
	if (opType === 'Joint') {
		$('#jointSection').slideDown(200);
		$('#myJointPhoto').show();
	} else {
		$('#jointSection').slideUp(200);
		$('#myJointPhoto').hide();
		$('#jointOperationCode').val('');
		$('#jointSurvivorCode').val('');
		$('#jointPhotoHidden').val('');
	}
}

// Joint Member Selection handler
$('#jointOperationCode').on('change', function () {
	const selectedCode = ($(this).val() || '').trim().toUpperCase();
	if (selectedCode) {
		$.ajax({
			url: 'api/customersavings/fetchCustomerCode',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ memberCode: selectedCode }),
			success: function (response) {
				if (response && response.status === "FOUND" && response.data && response.data.length > 0) {
					const customer = response.data[0];
					const fullName = [
						customer.firstName,
						customer.middleName,
						customer.lastName
					].filter(Boolean).join(" ").trim() || customer.customerName || "";
					$('#jointSurvivorCode').val(fullName.toUpperCase());

					if (customer.customerPhoto) {
						$('#jointPhotoPreview').attr('src', 'Uploads/' + customer.customerPhoto);
						$('#jointPhotoHidden').val(customer.customerPhoto);
					}
				}
			}
		});
	} else {
		$('#jointSurvivorCode').val('');
	}
});

// Payment Mode toggle
function handlePaymentModeChange() {
	const mode = $('#modeOfPayment').val();
	if (mode === 'Cheque' || mode === 'DD') {
		$('.cheque-field').show();
	} else {
		$('.cheque-field').hide();
		$('#chequeNo').val('');
		$('#chequeDate').val('');
	}
}

// Photo upload previews
function handleNewPhotoUpload(input) {
	if (input.files && input.files[0]) {
		const reader = new FileReader();
		reader.onload = function (e) {
			$('#photoPreview').attr('src', e.target.result);
			$('#newPhotoHidden').val('');
		};
		reader.readAsDataURL(input.files[0]);
	}
}

function handleNewSignUpload(input) {
	if (input.files && input.files[0]) {
		const reader = new FileReader();
		reader.onload = function (e) {
			$('#signaturePreview').attr('src', e.target.result);
			$('#newSignatureHidden').val('');
		};
		reader.readAsDataURL(input.files[0]);
	}
}

function handleJointPhotoUpload(input) {
	if (input.files && input.files[0]) {
		const reader = new FileReader();
		reader.onload = function (e) {
			$('#jointPhotoPreview').attr('src', e.target.result);
			$('#jointPhotoHidden').val('');
		};
		reader.readAsDataURL(input.files[0]);
	}
}

// Cash Denomination Calculator
$('#openingFees').on('click', function (e) {
	e.stopPropagation();
	$('#memberFeesTable').toggle();
});

$(document).on('click', function () {
	$('#memberFeesTable').hide();
});

$('#memberFeesTable').on('click', function (e) {
	e.stopPropagation();
});

function calcOpeningFees() {
	const n2000 = (parseInt($('#qty2000').val()) || 0) * 2000;
	const n500 = (parseInt($('#qty500').val()) || 0) * 500;
	const n200 = (parseInt($('#qty200').val()) || 0) * 200;
	const n100 = (parseInt($('#qty100').val()) || 0) * 100;
	const n50 = (parseInt($('#qty50').val()) || 0) * 50;
	const n20 = (parseInt($('#qty20').val()) || 0) * 20;
	const n10 = (parseInt($('#qty10').val()) || 0) * 10;

	$('#res2000').text(n2000);
	$('#res500').text(n500);
	$('#res200').text(n200);
	$('#res100').text(n100);
	$('#res50').text(n50);
	$('#res20').text(n20);
	$('#res10').text(n10);

	const total = n2000 + n500 + n200 + n100 + n50 + n20 + n10;
	$('#totalFee').text('₹ ' + total);
	$('#openingFees').val(total);
}

// ==========================================
// 4. SAVE & UPDATE ACTIONS
// ==========================================
$('#saveBtn').on('click', function (e) {
	e.preventDefault();
	submitAccountForm(false);
});

$('#updateBtn').on('click', function (e) {
	e.preventDefault();
	submitAccountForm(true);
});

function validateNomineeAge(showRequired) {
	const valStr = ($('#suggestedNomineeAge').val() || '').trim();
	const age = parseFloat(valStr);
	const isCurrent = ($('#typeofaccount').val() === 'currentaccount');

	if (!isCurrent) {
		// Mandatory for Saving Account: must be more than 20 years
		if (!valStr) {
			if (showRequired) {
				$('#chksuggestedNomineeAge').text('* NOMINEE AGE IS REQUIRED (MUST BE MORE THAN 20 YEARS)');
				$('#suggestedNomineeAge').addClass('is-invalid');
				return false;
			}
			$('#chksuggestedNomineeAge').text('');
			$('#suggestedNomineeAge').removeClass('is-invalid');
			return true;
		}
		if (isNaN(age) || age <= 20) {
			$('#chksuggestedNomineeAge').text('* NOMINEE AGE MUST BE MORE THAN 20 YEARS (ENTER 21 OR ABOVE)');
			$('#suggestedNomineeAge').addClass('is-invalid');
			return false;
		}
		if (age > 120) {
			$('#chksuggestedNomineeAge').text('* PLEASE ENTER A VALID NOMINEE AGE (MAX 120 YEARS)');
			$('#suggestedNomineeAge').addClass('is-invalid');
			return false;
		}
		$('#chksuggestedNomineeAge').text('');
		$('#suggestedNomineeAge').removeClass('is-invalid');
		return true;
	} else {
		// For Current Account: if entered, must be more than 20 years
		if (valStr) {
			if (isNaN(age) || age <= 20) {
				$('#chksuggestedNomineeAge').text('* NOMINEE AGE MUST BE MORE THAN 20 YEARS (ENTER 21 OR ABOVE)');
				$('#suggestedNomineeAge').addClass('is-invalid');
				return false;
			}
			if (age > 120) {
				$('#chksuggestedNomineeAge').text('* PLEASE ENTER A VALID NOMINEE AGE (MAX 120 YEARS)');
				$('#suggestedNomineeAge').addClass('is-invalid');
				return false;
			}
		}
		$('#chksuggestedNomineeAge').text('');
		$('#suggestedNomineeAge').removeClass('is-invalid');
		return true;
	}
}

function submitAccountForm(isUpdate) {
	// Reset validation errors
	$('#chktypeofaccount, #chkselectcustomer, #chkselectplan, #chkfinancialcode, #chkopeningfees, #chksuggestedNomineeAge').text('');
	$('.is-invalid').removeClass('is-invalid');

	const typeofaccount = $('#typeofaccount').val();
	const selectByCustomer = ($('#selectByCustomer').val() || '').trim().toUpperCase();
	const openingFees = $('#openingFees').val();
	const isCurrent = (typeofaccount === 'currentaccount');

	let isValid = true;

	if (!typeofaccount) {
		$('#chktypeofaccount').text('* PLEASE SELECT ACCOUNT TYPE');
		isValid = false;
	}

	if (!selectByCustomer) {
		$('#chkselectcustomer').text('* PLEASE SELECT A CUSTOMER');
		isValid = false;
	}

	if (!isCurrent) {
		const plan = $('#selectPlan').val();
		if (!plan) {
			$('#chkselectplan').text('* PLEASE SELECT SAVINGS PLAN');
			isValid = false;
		}
	}

	// Nominee Age Validation: Must be more than 20 years to create Saving Account successfully
	if (!validateNomineeAge(true)) {
		isValid = false;
	}

	if (!openingFees || parseFloat(openingFees) < 0) {
		$('#chkopeningfees').text('* OPENING DEPOSIT IS REQUIRED');
		isValid = false;
	}

	if (!isValid) {
		const firstInvalid = $('.is-invalid:first');
		if (firstInvalid.length) {
			firstInvalid.focus();
			$('html, body').animate({ scrollTop: firstInvalid.offset().top - 80 }, 300);
		} else {
			$('html, body').animate({ scrollTop: $('#accountFormCard').offset().top - 20 }, 300);
		}
		return false;
	}

	const formData = new FormData();

	if (isUpdate && $('#id').val()) {
		formData.append("id", $('#id').val());
	}

	formData.append("accountNumber", ($('#accountNumber').val() || '').trim().toUpperCase());
	formData.append("openingDate", $('#openingDate').val());
	formData.append("typeofaccount", typeofaccount);
	formData.append("accountType", isCurrent ? "CURRENT" : "SAVING");
	formData.append("selectByCustomer", selectByCustomer);
	formData.append("enterCustomerName", ($('#enterCustomerName').val() || '').trim().toUpperCase());
	formData.append("dateOfBirth", $('#dateOfBirth').val());
	formData.append("familyDetails", ($('#familyDetails').val() || '').trim().toUpperCase());
	formData.append("contactNumber", ($('#contactNumber').val() || '').trim());
	formData.append("emailId", ($('#emailId').val() || '').trim().toUpperCase());
	formData.append("aadharNo", ($('#aadharNo').val() || '').trim());
	formData.append("address", ($('#address').val() || '').trim().toUpperCase());
	formData.append("district", ($('#district').val() || '').trim().toUpperCase());
	formData.append("state", ($('#state').val() || '').trim().toUpperCase());
	formData.append("pinCode", ($('#pinCode').val() || '').trim());
	formData.append("branchName", ($('#branchName').val() || '').trim().toUpperCase());

	// Nominee in UPPERCASE
	formData.append("suggestedNomineeName", ($('#suggestedNomineeName').val() || '').trim().toUpperCase());
	formData.append("suggestedNomineeAge", $('#suggestedNomineeAge').val());
	formData.append("suggestedNomineeRelation", ($('#suggestedNomineeRelation').val() || '').trim().toUpperCase());

	// Operations in UPPERCASE
	formData.append("operationType", ($('#operationType').val() || 'Single'));
	formData.append("jointOperationCode", ($('#jointOperationCode').val() || '').trim().toUpperCase());
	formData.append("jointSurvivorCode", ($('#jointSurvivorCode').val() || '').trim().toUpperCase());
	formData.append("familyRelation", ($('#familyRelation').val() || '').trim().toUpperCase());

	// Scheme & Current specifics in UPPERCASE
	if (isCurrent) {
		formData.append("overdraftLimit", $('#overdraftLimit').val() || "0");
		formData.append("businessName", ($('#businessName').val() || '').trim().toUpperCase());
		formData.append("gstin", ($('#gstin').val() || '').trim().toUpperCase());
		formData.append("selectPlan", "CURRENT ACCOUNT");
		formData.append("balance", openingFees || "0");
	} else {
		formData.append("selectPlan", ($('#selectPlan').val() || '').trim().toUpperCase());
		formData.append("balance", $('#balance').val() || openingFees || "0");
		formData.append("overdraftLimit", "0");
	}

	formData.append("financialConsultantCode", ($('#financialConsultantCode').val() || '').trim().toUpperCase());
	formData.append("financialConsultantName", ($('#financialConsultantName').val() || '').trim().toUpperCase());
	formData.append("openingFees", openingFees || "0");
	formData.append("authenticateWith", $('#authenticateWith').val());

	// Payment
	formData.append("modeOfPayment", $('#modeOfPayment').val());
	formData.append("chequeNo", ($('#chequeNo').val() || '').trim().toUpperCase());
	formData.append("chequeDate", $('#chequeDate').val());
	formData.append("depositAcc1", ($('#depositAcc1').val() || '').trim().toUpperCase());
	formData.append("refNumber1", ($('#refNumber1').val() || '').trim().toUpperCase());
	formData.append("comment", ($('#comment').val() || '').trim().toUpperCase());

	// Facilities & Toggles
	formData.append("accountStatus", $('#toggle-member-status').is(':checked') ? "1" : "0");
	formData.append("messageSend", $('#toggle-member-status1').is(':checked') ? "1" : "0");
	formData.append("debitCardIssue", $('#toggle-member-status2').is(':checked') ? "1" : "0");
	formData.append("isLocker", $('#toggle-member-status3').is(':checked') ? "1" : "0");
	formData.append("accountFreeze", $('#toggle-member-status4').is(':checked') ? "1" : "0");

	// Photos
	formData.append("photo", $('#photoHidden').val() || "");
	formData.append("signature", $('#signatureHidden').val() || "");

	const newPhotoFile = $('#newPhoto')[0]?.files[0];
	const newSignFile = $('#newSignature')[0]?.files[0];
	const jointPhotoFile = $('#jointPhoto')[0]?.files[0];

	if (newPhotoFile) formData.append("newPhoto", newPhotoFile);
	if (newSignFile) formData.append("newSignature", newSignFile);
	if (jointPhotoFile) formData.append("jointPhoto", jointPhotoFile);

	// Submit via AJAX
	const submitBtn = isUpdate ? $('#updateBtn') : $('#saveBtn');
	submitBtn.prop('disabled', true).html('<i class="bi bi-hourglass-split"></i> PROCESSING...');

	$.ajax({
		type: "POST",
		url: "api/customersavings/saveandupdatesavingaccount",
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			submitBtn.prop('disabled', false).html(isUpdate ? '<i class="bi bi-pencil-square"></i> UPDATE ACCOUNT' : '<i class="bi bi-check-circle-fill"></i> SAVE ACCOUNT');

			if (response && (response.status === 'OK' || response.status === 'CREATED')) {
				const accData = response.data || {};
				const accNo = (accData.accountNumber || $('#accountNumber').val() || '').toUpperCase();
				const msg = isUpdate
					? "ACCOUNT UPDATED SUCCESSFULLY! (ACCOUNT NO: " + accNo + ")"
					: "ACCOUNT CREATED SUCCESSFULLY! (ACCOUNT NO: " + accNo + ")";

				if (typeof Swal !== 'undefined') {
					Swal.fire({ icon: 'success', title: 'SUCCESS', text: msg, confirmButtonColor: '#0d6efd' });
				} else {
					alert(msg);
				}

				resetForm();
				loadSavingsAccountTable();
			} else {
				const errMsg = (response && response.message) ? response.message.toUpperCase() : "OPERATION FAILED.";
				if (typeof Swal !== 'undefined') {
					Swal.fire({ icon: 'error', title: 'OPERATION FAILED', text: errMsg });
				} else {
					alert(errMsg);
				}
			}
		},
		error: function (xhr) {
			submitBtn.prop('disabled', false).html(isUpdate ? '<i class="bi bi-pencil-square"></i> UPDATE ACCOUNT' : '<i class="bi bi-check-circle-fill"></i> SAVE ACCOUNT');
			let errorText = "FAILED TO SAVE ACCOUNT. PLEASE CHECK THE INPUTS.";
			if (xhr.responseJSON && xhr.responseJSON.message) {
				errorText = xhr.responseJSON.message.toUpperCase();
			} else if (xhr.responseText) {
				try {
					const parsed = JSON.parse(xhr.responseText);
					if (parsed && parsed.message) errorText = parsed.message.toUpperCase();
				} catch (e) { }
			}
			if (typeof Swal !== 'undefined') {
				Swal.fire({ icon: 'error', title: 'ERROR', text: errorText });
			} else {
				alert(errorText);
			}
		}
	});
}

// Reset form
function resetForm() {
	$('#formid')[0].reset();
	$('#id').val('');
	$('#photoHidden').val('');
	$('#signatureHidden').val('');
	$('#jointPhotoHidden').val('');
	$('#newPhotoHidden').val('');
	$('#newSignatureHidden').val('');
	clearCustomerFields();

	// Reset button states
	$('#saveBtn').show();
	$('#updateBtn').hide();
	$('#formTitle').text('ACCOUNT OPENING FORM');

	// Reset toggle switches
	$('#toggle-member-status').prop('checked', true);
	$('#toggle-member-status1').prop('checked', true);
	$('#toggle-member-status2').prop('checked', false);
	$('#toggle-member-status3').prop('checked', false);
	$('#toggle-member-status4').prop('checked', false);
	$('#lblStatus').text('ACTIVE');

	// Set opening date to today
	const today = new Date().toISOString().split('T')[0];
	$('#openingDate').val(today);

	// Reset account type
	$('#typeofaccount').val('savingaccount');
	handleAccountTypeChange();
	operationTypeFunc();
	handlePaymentModeChange();

	// Clear errors
	$("[id^='chk']").text('');
	$('.is-invalid').removeClass('is-invalid');
}

// ==========================================
// 5. VIEW / EDIT ACCOUNT
// ==========================================
function viewData(id) {
	$.ajax({
		url: "api/customersavings/getSavingAccountDataById",
		type: "GET",
		data: { id: id },
		success: function (response) {
			if (response && response.status === "FOUND" && response.data) {
				const data = response.data;

				$('#id').val(data.id);
				$('#accountNumber').val((data.accountNumber || "").toUpperCase());
				$('#openingDate').val(data.openingDate || "");

				// Account type
				const typeRaw = (data.typeofaccount || "").toLowerCase();
				const isCurr = (typeRaw === 'currentaccount' || typeRaw === 'current' || (data.accountType || '').toUpperCase() === 'CURRENT');
				$('#typeofaccount').val(isCurr ? 'currentaccount' : 'savingaccount');
				handleAccountTypeChange(data.selectByCustomer);

				// Customer details strictly in UPPERCASE
				$('#selectByCustomer').val((data.selectByCustomer || "").toUpperCase());
				$('#enterCustomerName').val((data.enterCustomerName || "").toUpperCase());
				$('#dateOfBirth').val(data.dateOfBirth || "");
				$('#familyDetails').val((data.familyDetails || "").toUpperCase());
				$('#contactNumber').val(data.contactNumber || "");
				$('#emailId').val((data.emailId || "").toUpperCase());
				$('#aadharNo').val(data.aadharNo || "");
				$('#address').val((data.address || "").toUpperCase());
				$('#district').val((data.district || "").toUpperCase());
				$('#state').val((data.state || "").toUpperCase());
				$('#pinCode').val(data.pinCode || "");

				// Branch
				const bName = getBranchDisplayName(data);
				if (bName) {
					$('#branchName').val(bName.toUpperCase());
				}

				// Nominee details in UPPERCASE
				$('#suggestedNomineeName').val((data.suggestedNomineeName || "").toUpperCase());
				$('#suggestedNomineeAge').val(data.suggestedNomineeAge || "");
				$('#suggestedNomineeRelation').val((data.suggestedNomineeRelation || "").toUpperCase());

				// Operations
				$('#operationType').val(data.operationType || "Single");
				operationTypeFunc();
				$('#jointOperationCode').val((data.jointOperationCode || "").toUpperCase());
				$('#jointSurvivorCode').val((data.jointSurvivorCode || "").toUpperCase());
				$('#familyRelation').val((data.familyRelation || "").toUpperCase());

				// Scheme & Current specifics in UPPERCASE
				$('#selectPlan').val((data.selectPlan || "").toUpperCase());
				$('#balance').val(data.balance || "0");
				$('#overdraftLimit').val(data.overdraftLimit || "0");
				$('#businessName').val((data.businessName || "").toUpperCase());
				$('#gstin').val((data.gstin || "").toUpperCase());

				$('#financialConsultantCode').val((data.financialConsultantCode || "").toUpperCase());
				$('#financialConsultantName').val((data.financialConsultantName || "").toUpperCase());
				$('#openingFees').val(data.openingFees || "0");
				$('#authenticateWith').val(data.authenticateWith || "OTP");

				// Payment
				$('#modeOfPayment').val(data.modeOfPayment || "Cash");
				handlePaymentModeChange();
				$('#chequeNo').val((data.chequeNo || "").toUpperCase());
				$('#chequeDate').val(data.chequeDate || "");
				$('#depositAcc1').val((data.depositAcc1 || "").toUpperCase());
				$('#refNumber1').val((data.refNumber1 || "").toUpperCase());
				$('#comment').val((data.comment || "").toUpperCase());

				// Toggles
				$('#toggle-member-status').prop('checked', data.accountStatus == '1');
				$('#toggle-member-status1').prop('checked', data.messageSend == '1');
				$('#toggle-member-status2').prop('checked', data.debitCardIssue == '1');
				$('#toggle-member-status3').prop('checked', data.isLocker == '1');
				$('#toggle-member-status4').prop('checked', data.accountFreeze == '1');
				$('#lblStatus').text(data.accountStatus == '1' ? 'ACTIVE' : 'INACTIVE');

				// Photos
				if (data.photo) {
					$('#photoPreview').attr('src', 'Uploads/' + data.photo);
					$('#photoHidden').val(data.photo);
				}
				if (data.signature) {
					$('#signaturePreview').attr('src', 'Uploads/' + data.signature);
					$('#signatureHidden').val(data.signature);
				}
				if (data.jointPhoto) {
					$('#jointPhotoPreview').attr('src', 'Uploads/' + data.jointPhoto);
					$('#jointPhotoHidden').val(data.jointPhoto);
				}

				// Switch to edit mode UI
				$('#saveBtn').hide();
				$('#updateBtn').show();
				$('#formTitle').text('EDIT ACCOUNT DETAILS (ACC NO: ' + (data.accountNumber || '').toUpperCase() + ')');

				// Scroll smoothly to form
				$('html, body').animate({ scrollTop: $('#accountFormCard').offset().top - 20 }, 400);

			} else {
				alert("COULD NOT LOAD ACCOUNT DETAILS.");
			}
		},
		error: function () {
			alert("ERROR LOADING ACCOUNT DATA.");
		}
	});
}

// ==========================================
// 6. DELETE ACCOUNT
// ==========================================
function deleteData(id) {
	if (!confirm("ARE YOU SURE YOU WANT TO DELETE THIS ACCOUNT RECORD? THIS ACTION CANNOT BE UNDONE.")) {
		return;
	}

	$.ajax({
		url: "api/customersavings/deleteSavingAccountDataById",
		type: "POST",
		data: { id: id },
		success: function (response) {
			if (response && response.status === "OK") {
				alert("ACCOUNT DELETED SUCCESSFULLY.");
				loadSavingsAccountTable();
			} else {
				alert("DELETE FAILED: " + (response.message ? response.message.toUpperCase() : "UNKNOWN ERROR"));
			}
		},
		error: function () {
			alert("SERVER ERROR OCCURRED WHILE DELETING ACCOUNT.");
		}
	});
}

// ==========================================
// 7. ACCOUNTS TABLE & FILTERING
// ==========================================
function loadSavingsAccountTable() {
	$.ajax({
		url: "api/customersavings/getAllSavingAccountData",
		type: "GET",
		success: function (response) {
			allAccountsData = (response && response.data) ? response.data : (Array.isArray(response) ? response : []);
			populateBranchFilter(allAccountsData);
			updateSummaryStats(allAccountsData);
			renderTable(allAccountsData);
		},
		error: function (err) {
			console.error("Error loading savings accounts:", err);
			$('#savingAccountTableBody').html(
				'<tr><td colspan="13" class="text-center text-danger py-4" style="font-family:Poppins,sans-serif;font-size:13px;text-transform:uppercase;">' +
				'<i class="bi bi-exclamation-triangle"></i> FAILED TO LOAD ACCOUNTS LIST. PLEASE REFRESH.</td></tr>'
			);
		}
	});
}

function populateBranchFilter(data) {
	const branchSet = new Set();
	data.forEach(function (acc) {
		const bn = getBranchDisplayName(acc);
		if (bn) branchSet.add(bn.toUpperCase());
	});
	const sel = $('#filterBranch');
	sel.empty().append('<option value="">ALL BRANCHES</option>');
	branchSet.forEach(function (b) {
		sel.append('<option value="' + b + '">' + b + '</option>');
	});
}

function isCurrentAccount(acc) {
	if (!acc) return false;
	const accType = (acc.accountType || '').trim().toUpperCase();
	const typeOfAcc = (acc.typeofaccount || '').trim().toLowerCase();
	return accType === 'CURRENT' || typeOfAcc === 'currentaccount' || typeOfAcc === 'current';
}

function updateSummaryStats(data) {
	const dataset = (data && Array.isArray(data)) ? data : (allAccountsData || []);
	const total = dataset.length;
	let current = 0;
	let saving = 0;
	let active = 0;

	dataset.forEach(function (acc) {
		if (isCurrentAccount(acc)) {
			current++;
		} else {
			saving++;
		}
		if ((acc.accountStatus || '') == '1') {
			active++;
		}
	});

	$('#statTotal').text(total);
	$('#statSaving').text(saving);
	$('#statCurrent').text(current);
	$('#statActive').text(active);
}

function getBranchDisplayName(acc) {
	if (!acc.branchName) return '';
	return typeof acc.branchName === 'object' ? (acc.branchName.branchName || '') : acc.branchName;
}

function renderTable(data) {
	const tbody = $('#savingAccountTableBody');
	tbody.empty();

	if (!data || data.length === 0) {
		tbody.html(
			'<tr><td colspan="13" class="text-center py-4" style="font-family:Poppins,sans-serif;font-size:13px;color:#94a3b8;text-transform:uppercase;">' +
			'<i class="bi bi-inbox"></i> NO ACCOUNTS FOUND.</td></tr>'
		);
		$('#recordCount').text('0 RECORD(S) FOUND');
		return;
	}

	data.forEach(function (acc, idx) {
		const isCurrent = isCurrentAccount(acc);
		const isSaving = !isCurrent;

		// Account Type Badge
		let typeBadge = '';
		if (isCurrent) {
			typeBadge = '<span class="badge-current"><i class="bi bi-briefcase-fill"></i> CURRENT</span>';
		} else {
			typeBadge = '<span class="badge-saving"><i class="bi bi-piggy-bank-fill"></i> SAVING</span>';
		}

		// Status Badge
		const statusBadge = (acc.accountStatus == '1')
			? '<span class="badge bg-success" style="font-size:10px;text-transform:uppercase;">ACTIVE</span>'
			: '<span class="badge bg-danger" style="font-size:10px;text-transform:uppercase;">INACTIVE</span>';

		// Branch in UPPERCASE
		const branchName = getBranchDisplayName(acc).toString().toUpperCase();

		// Interest Rate (Saving only)
		let interestCell = '';
		if (isSaving) {
			const pct = (acc.interestPercent && acc.interestPercent !== '0')
				? acc.interestPercent + '%'
				: '<span style="color:#94a3b8;font-size:11px;text-transform:uppercase;">STANDARD</span>';
			interestCell = '<td class="cell-saving-only">' + pct + '</td>';
		} else {
			interestCell = '<td class="cell-na" title="Current accounts earn 0% interest">—</td>';
		}

		// Overdraft Limit (Current only)
		let odCell = '';
		if (isCurrent) {
			const od = acc.overdraftLimit ? '₹ ' + acc.overdraftLimit : '₹ 0';
			odCell = '<td class="cell-current-only">' + od + '</td>';
		} else {
			odCell = '<td class="cell-na" title="Overdraft not available for Saving">—</td>';
		}

		const customerCode = (acc.selectByCustomer || '').toUpperCase();
		const customerName = (acc.enterCustomerName || '').toUpperCase();
		const contactNo = (acc.contactNumber || '—').toUpperCase();

		const row = `
			<tr style="font-family:'Poppins',sans-serif; font-size:12px; text-transform:uppercase;">
				<td>${idx + 1}</td>
				<td><strong>${(acc.accountNumber || '').toUpperCase()}</strong></td>
				<td>${typeBadge}</td>
				<td>${customerCode}</td>
				<td>${customerName}</td>
				<td>${contactNo}</td>
				<td>${branchName}</td>
				<td>${acc.openingDate || '—'}</td>
				<td><strong>₹ ${(acc.balance || '0')}</strong></td>
				${interestCell}
				${odCell}
				<td>${statusBadge}</td>
				<td class="text-center" style="white-space: nowrap;">
					<button type="button" class="action-btn text-primary me-1" title="EDIT / VIEW ACCOUNT" onclick="viewData(${acc.id})">
						<i class="fa-solid fa-pen-to-square"></i>
					</button>
					<button type="button" class="action-btn text-danger" title="DELETE ACCOUNT" onclick="deleteData(${acc.id})">
						<i class="fa-solid fa-trash"></i>
					</button>
				</td>
			</tr>
		`;

		tbody.append(row);
	});

	$('#recordCount').text(data.length + ' RECORD(S) FOUND');
}

function filterTable() {
	const search = ($('#searchInput').val() || '').trim().toLowerCase();
	const accountType = ($('#filterAccountType').val() || '').toLowerCase();
	const status = ($('#filterStatus').val() || '');
	const branch = ($('#filterBranch').val() || '').toUpperCase();

	const filtered = allAccountsData.filter(function (acc) {
		const matchSearch = !search
			|| (acc.selectByCustomer || '').toLowerCase().includes(search)
			|| (acc.enterCustomerName || '').toLowerCase().includes(search)
			|| (acc.accountNumber || '').toLowerCase().includes(search);

		const isCurrent = isCurrentAccount(acc);
		let matchType = true;
		if (accountType === 'savingaccount') {
			matchType = !isCurrent;
		} else if (accountType === 'currentaccount') {
			matchType = isCurrent;
		}

		const matchStatus = !status || (acc.accountStatus || '') == status;

		const branchName = getBranchDisplayName(acc).toUpperCase();
		const matchBranch = !branch || branchName === branch;

		return matchSearch && matchType && matchStatus && matchBranch;
	});

	updateSummaryStats(filtered);
	renderTable(filtered);
}

function clearFilters() {
	$('#searchInput').val('');
	$('#filterAccountType').val('');
	$('#filterStatus').val('');
	$('#filterBranch').val('');
	updateSummaryStats(allAccountsData);
	renderTable(allAccountsData);
}