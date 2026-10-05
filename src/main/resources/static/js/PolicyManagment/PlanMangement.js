$(document).ready(function() {
	
	function showError(inputId, message) {
	    const input = $("#" + inputId);
	    input.addClass("is-invalid");

	    if ($("#" + inputId + "-error").length === 0) {
	        input.after(`<small id="${inputId}-error" class="text-danger">${message}</small>`);
	    } else {
	        $("#" + inputId + "-error").text(message);
	    }
	}

	function clearError(inputId) {
	    $("#" + inputId).removeClass("is-invalid");
	    $("#" + inputId + "-error").remove();
	}

	function isEmpty(value) {
	    return value === null || value.trim() === "";
	}
	
	function validateDailyDeposit() {

	    let isValid = true;

	    const fields = [
	        "planCodeDD",
	        "planNameDD",
	        "minimumDeposit",
	        "rateOfInterest",
	        "installmentType",
	        "ddterm",
			"penaltyRate",
			"graceDays",
			"flexiblePlan",
	        "interestInterval"
	    ];

	    fields.forEach(function(field) {

	        const element = $("#" + field);

	        // Check if element exists in HTML
	        if (element.length === 0) {
	            console.error("Field not found:", field);
	            isValid = false;
	            return;
	        }

	        const value = element.val();

	        // Clear previous error
	        clearError(field);

	        // Check null, undefined, empty, spaces
	        if (value === undefined || value === null || value.trim() === "") {

	            showError(field, "This field is required");

	            element.focus();

	            isValid = false;
	        }
	    });

	    // Minimum Deposit validation
	    const minDepositValue = $("#minimumDeposit").val();

	    if (minDepositValue && minDepositValue.trim() !== "") {

	        const minDeposit = parseFloat(minDepositValue);

	        if (isNaN(minDeposit) || minDeposit <= 0) {

	            showError("minimumDeposit", "Enter valid amount");

	            isValid = false;
	        }
	    }

	    // Rate of Interest validation
	    const roiValue = $("#rateOfInterest").val();

	    if (roiValue && roiValue.trim() !== "") {

	        const roi = parseFloat(roiValue);

	        if (isNaN(roi) || roi <= 0 || roi > 100) {

	            showError("rateOfInterest", "Enter valid interest (1–100)");

	            isValid = false;
	        }
	    }

	    return isValid;
	}
	
	$('#planNameDD').on('blur', function () {

	    let planName = $(this).val();

	    if(planName.trim() === ''){
	        return;
	    }

	    $.ajax({
	        url: 'api/Policymangment/check-plan-name',
	        type: 'GET',
	        data: { planName: planName },

	        success: function(response) {

	            console.log("Response:", response);

	            if(response == true){
	                alert("Plan Name Already Exists");
	                $('#planNameDD').val('');
	                $('#planNameDD').focus();
	            }

	        },

	        error: function(err){
	            console.log("Error:", err);
	        }

	    });

	});
	$("#saveBtn").show();
	$("#genrateBtn").show();
	$("#updateBtn").hide();
	$("#deleteBtn").hide();

	// SAVE BUTTON
	$('#saveBtn').on('click', function(e) {
		e.preventDefault();
	
		if (!validateDailyDeposit()) {
		      return; // Stop if validation fails
		  }
		
		const statusPlanValue = $('#toggle-status-planDD').is(':checked') ? 1 : 0;

		const dailyDeposit = {
			drd: $('#drd').val(),
			planCodeDD: $('#planCodeDD').val(),
			planNameDD: $('#planNameDD').val(),
			minimumDeposit: $('#minimumDeposit').val(),
			rateOfInterest: $('#rateOfInterest').val(),
			installmentType: $('#installmentType').val(),    // ⬅️ Dropdown value
			duration: $('#duration').val(),
			termModeDD: $('#termModeDD').val(),
			ddterm: $('#ddterm').val(),
			commissionOnNew: $('#commissionOnNew').val(),
			renewalCommission: $('#renewalCommission').val(),
			interestInterval: $('#interestInterval').val(), // ⬅️ Dropdown value
			totalPaid: $('#totalPaid').val(),
			maturityAmount: $('#maturityAmount').val(),
			flexiblePlan: $('#flexiblePlan').val(),          // ⬅️ Dropdown value
			graceDays: $('#graceDays').val(),
			penaltyRate: $('#penaltyRate').val(),
			statusOfPlan: statusPlanValue
		};

		// Optional: Debug log before sending
		console.log("Sending Data:", dailyDeposit);

		$.ajax({
			url: 'api/Policymangment/daily-depositsave',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(dailyDeposit),
			success: function(response) {
				alert("Daily Deposit Saved Successfully");
				location.reload(); // refresh table or UI
			},
			error: function(xhr) {
				console.error("Save Error:", xhr.responseText);
				alert("Something went wrong while saving!");
			}
		});
	});

	var totalDataDD = [];
	var currentPageDD = 1;
	var pageSizeDD = 5;

	// Load data once
	function fetchDailyDeposits() {
		$.ajax({
			type: "GET",
			url: "api/Policymangment/daily-deposit/view",
			dataType: "json",
			success: function(response) {
				if (response.status === "OK") {
					totalDataDD = response.data;
					renderTableDD(currentPageDD);
					togglePageNavigationDD();
				} else {
					alert("Failed to fetch data: " + response.message);
				}
			},
			error: function() {
				alert("Error while calling the API.");
			}
		});
	}

	// Render paginated table
	function renderTableDD(page) {
		let tableBody = $("#depositTableBody");
		tableBody.empty();

		let startIndex = (page - 1) * pageSizeDD;
		let endIndex = Math.min(startIndex + pageSizeDD, totalDataDD.length);

		for (let i = startIndex; i < endIndex; i++) {
			let person = totalDataDD[i];
			const statusText = person.statusOfPlan == 1 ? 'Active' : 'Inactive';
			let row = `<tr>
					<td>${i + 1}</td>
	                <td>${person.planCodeDD}</td>
	                <td>${person.planNameDD.toUpperCase()}</td>
	                <td>${person.minimumDeposit}</td>
	                <td>${person.rateOfInterest}</td>
	                <td>${person.installmentType.toUpperCase()}</td>
	                <td>${person.ddterm}</td>
					<td>${statusText.toUpperCase()}</td>
					<td class="d-flex" style="gap: .7rem;">
						<button type="button" class="iconbutton edit-btnDD" data-id="${person.id}">
						<i class="fa-solid fa-pen-to-square text-success"></i>
						</button>
						<button type="button" class="iconbutton delete-btnDD" data-id="${person.id}">
						<i class="fa-solid fa-trash text-danger"></i>
						</button>
					</td>
	              </tr>`;
			tableBody.append(row);
		}

		// Update page info
		$("#pageInfoDD").text(`Page ${currentPageDD} of ${Math.ceil(totalDataDD.length / pageSizeDD)}`);
	}

	// Button state toggling
	function togglePageNavigationDD() {
		let totalPages = Math.ceil(totalDataDD.length / pageSizeDD);
		$("#prevBtnDD").prop("disabled", currentPageDD === 1);
		$("#nextBtnDD").prop("disabled", currentPageDD === totalPages || totalPages === 0);
	}

	// Button click handlers
	$("#prevBtnDD").click(function() {
		if (currentPageDD > 1) {
			currentPageDD--;
			renderTableDD(currentPageDD);
			togglePageNavigationDD();
			scrollToDDTable();
		}
	});

	$("#nextBtnDD").click(function() {
		let totalPages = Math.ceil(totalDataDD.length / pageSizeDD);
		if (currentPageDD < totalPages) {
			currentPageDD++;
			renderTableDD(currentPageDD);
			togglePageNavigationDD();
			scrollToDDTable();
		}
	});
	
	$(document).ready(function () {
	    fetchDailyDeposits();
	    fetchRecurringDeposits();
	    fetchFixedDeposits();
	    fetchMISDeposits();
	});
	
	function scrollToDDTable() {
	    $('html, body').animate({
	        scrollTop: $('#ddTableWrapper').offset().top - 100
	    }, 200);
	}


	// Call on page load
	/*$(document).ready(function() {
		fetchDailyDeposits();
	});

	$(document).ready(function() {
		fetchRecurringDeposits();
	});

	$(document).ready(function() {
		fetchFixedDeposits();
	});

	$(document).ready(function() {
		fetchMISDeposits();
	});*/

	// DELEGATED EVENT for edit button
	$('#depositTableBody').on('click', '.edit-btnDD', function() {
		const id = $(this).data('id');
		editDailyDeposit(id);
	});

	// EDIT FUNCTION
	function editDailyDeposit(id) {
		$.ajax({
			url: `api/Policymangment/dailyedit/${id}`,
			method: 'GET',
			contentType: 'application/json',
			success: function(response) {
				if (response && response.data) {
					const data = response.data;

					$('#formid').data('id', id); // ✅ Set the ID for update

					$('#planCodeDD').val(data.planCodeDD);
					$('#planNameDD').val(data.planNameDD);
					$('#minimumDeposit').val(data.minimumDeposit);
					$('#rateOfInterest').val(data.rateOfInterest);
					$('#duration').val(data.duration);
					$('#termModeDD').val(data.termModeDD);
					$('#ddterm').val(data.ddterm);
					$('#commissionOnNew').val(data.commissionOnNew);
					$('#renewalCommission').val(data.renewalCommission);
					$('#interestInterval').val(data.interestInterval);
					$('#totalPaid').val(data.totalPaid);
					$('#maturityAmount').val(data.maturityAmount);
					$('#graceDays').val(data.graceDays);
					$('#penaltyRate').val(data.penaltyRate);
					$('#toggle-status-planDD').val(data.statusOfPlan);

					if (parseInt(data.statusOfPlan) === 1) {
						$('#toggle-status-planDD').prop('checked', true);
					} else {
						$('#toggle-status-planDD').prop('checked', false);
					}

					updateToggleColor(document.getElementById('toggle-status-planDD'));

					$('#saveBtn').hide();
					$('#updateBtn').show();
				} else {
					alert('No data found for this ID');
				}
			},
			error: function() {
				alert('Failed to fetch daily deposit details.');
			}
		});
	}

	document.addEventListener('DOMContentLoaded', function() {
		const toggles = document.querySelectorAll('.toggle__input');

		toggles.forEach((toggle) => {
			updateToggleColor(toggle);

			toggle.addEventListener('change', () => {
				updateToggleColor(toggle);
				console.log(`${toggle.dataset.toggleType} is now ${toggle.checked}`);
			});
		});

		function updateToggleColor(input) {
			const label = input.nextElementSibling;
			if (label) {
				label.style.backgroundColor = input.checked ? '#28a745' : '#ccc';
			}
		}
	});

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


	// UPDATE BUTTON
	$('#updateBtn').on('click', function(e) {
		e.preventDefault();

		const id = $('#formid').data('id');

		if (!id) {
			alert("ID missing. Please select a record by clicking Edit.");
			return;
		}

		const updatedDailyDeposit = getFormData();

		$.ajax({
			url: `api/Policymangment/dailyupdate/${id}`,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(updatedDailyDeposit),
			success: function() {
				alert("Daily Deposit updated successfully.");
				location.reload();
			},
			error: function(xhr) {
				console.error('Update error:', xhr.responseText);
				alert("Failed to update Daily Deposit.");
			}
		});
	});

	// GET FORM DATA
	function getFormData() {
		const statusPlanValue = $('#toggle-status-planDD').is(':checked') ? 1 : 0;
		return {
			planCode: $('#planCodeDD').val(),
			planNameDD: $('#planNameDD').val(),
			minimumDeposit: $('#minimumDeposit').val(),
			rateOfInterest: $('#rateOfInterest').val(),
			installmentType: $('#installmentType').val(),
			termModeDD: $('#termModeDD').val(),
			ddterm: $('#ddterm').val(),
			duration: $('#duration').val(),
			commissionOnNew: $('#commissionOnNew').val(),
			renewalCommission: $('#renewalCommission').val(),
			interestInterval: $('#interestInterval').val(),
			totalPaid: $('#totalPaid').val(),
			maturityAmount: $('#maturityAmount').val(),
			flexiblePlan: $('#flexiblePlan').val(),
			graceDays: $('#graceDays').val(),
			penaltyRate: $('#penaltyRate').val(),
			statusOfPlan: statusPlanValue
		};
	}

	// Helper for dropdowns
	function setDropdownValue(selector, value) {
		const dropdown = $(selector);
		if (dropdown.find(`option[value="${value}"]`).length) {
			dropdown.val(value);
		} else {
			dropdown.append(`<option value="${value}">${value}</option>`).val(value);
		}
	}


	// DELETE BUTTON (when editing a record)

	$(document).on('click', '.delete-btnDD', function() {
		const id = $(this).data('id');

		if (!id) {
			alert("Invalid record. ID not found.");
			return;
		}

		if (!confirm("Are you sure you want to delete this Daily Deposit?")) {
			return;
		}

		$.ajax({
			url: `api/Policymangment/dailydelete/${id}`,
			type: 'POST',
			contentType: 'application/json',
			success: function(response) {
				alert(response.message || "Deleted successfully.");
				fetchDailyDeposits(); // Refresh table
			},
			error: function(xhr) {
				const message = xhr.responseJSON?.message || "Failed to delete.";
				alert("Error: " + message);
			}
		});
	});

	$("#interestInterval").change(function() {
		const P = parseFloat(document.getElementById("minimumDeposit").value); // installment per period (RD) OR principal (FD)
		const termInput = parseFloat(document.getElementById("ddterm").value); // raw duration input
		const r_annual = parseFloat(document.getElementById("rateOfInterest").value) / 100;
		const interval = document.getElementById("interestInterval").value;

		// Helper: compounding/payment frequency per year
		const freqMap = {
			"Daily": 365,
			"Monthly": 12,
			"Quarterly": 4,
			"Half-Yearly": 2,
			"Yearly": 1,
			"On Maturity": 1
		};

		// --- Step 1. Convert term to years ---
		// Change this if your input is not in years:
		// If termInput is in months → const years = termInput / 12;
		// If termInput is in days → const years = termInput / 365;
		const years = termInput;   // assume input is already in years

		// --- Step 2. Main calculation ---
		let totalDeposit, maturity;
		const m = freqMap[interval];  // periods per year

		if (interval === "On Maturity") {
			// One-time FD with compounding
			totalDeposit = P;
			const n = m * years;       // m = 1 here
			const i = r_annual / m;
			maturity = P * Math.pow(1 + i, n);

		} else {
			// Recurring deposit (ordinary annuity by default)
			const periods = Math.round(m * years);   // number of installments
			const i = r_annual / m;                  // periodic rate

			totalDeposit = P * periods;

			if (i === 0) {
				maturity = totalDeposit;
			} else {
				// Ordinary annuity formula
				maturity = P * ((Math.pow(1 + i, periods) - 1) / i);

				// --- If your product credits interest from day 1 (annuity-due):
				// maturity *= (1 + i);
			}
		}

		// --- Step 3. Output ---
		document.getElementById("totalPaid").value = totalDeposit.toFixed(2);
		document.getElementById("maturityAmount").value = maturity.toFixed(2);

		// Optional: also show interest earned if you have such a field
		const interest = maturity - totalDeposit;
		const interestField = document.getElementById("interestEarned");
		if (interestField) {
			interestField.value = interest.toFixed(2);
		}
	});



	// save the Reccuring deposite
	$("#ReccuringsaveBtn").show();
	$("#ReccuringupdateBtn").hide();

	
	function validateRecurringDeposit() {
	    let isValid = true;

	    const fields = [
	        "planCodeRD",
	        "planNameRD",
	        "minimumAmountRD",
	        "rateOfInterestRD",
			"rdterm",
	        "installmentTypeRD",
			"componentIntervalRD",
			"flexiblePlanRD",
			"graceDaysRD",
			"penaltyfineRD"
	        
	    ];

	    fields.forEach(function(field) {
	        const value = $("#" + field).val();
	        clearError(field);

	        if (isEmpty(value)) {
	            showError(field, "This field is required");
	            isValid = false;
	        }
	    });

	    const minAmount = parseFloat($("#minimumAmountRD").val());
	    if (minAmount <= 0 || isNaN(minAmount)) {
	        showError("minimumAmountRD", "Enter valid amount");
	        isValid = false;
	    }

	    return isValid;
	}
	// SAVE BUTTON
	$('#ReccuringsaveBtn').on('click', function(e) {
		e.preventDefault();
		
		if (!validateRecurringDeposit()) return;

		const statusPlanValue = $('#toggle-status-planRD').is(':checked') ? 1 : 0;
		const reccuringDeposite = {
			rd: $('#rd').val(),
			planCodeRD: $('#planCodeRD').val(),
			planNameRD: $('#planNameRD').val(),
			minimumAmountRD: $('#minimumAmountRD').val(),
			rateOfInterestRD: $('#rateOfInterestRD').val(),
			installmentTypeRD: $('#installmentTypeRD').val(),
			durationRD: $('#durationRD').val(),
			termMode: $('#termMode').val(),
			rdterm: $('#rdterm').val(),
			commissionOnNewRD: $('#commissionOnNewRD').val(),
			renewalCommissionRD: $('#renewalCommissionRD').val(),
			componentIntervalRD: $('#componentIntervalRD').val(),
			totalPaidRD: $('#totalPaidRD').val(),
			maturityAmountRD: $('#maturityAmountRD').val(),
			flexiblePlanRD: $('#flexiblePlanRD').val(),
			graceDaysRD: $('#graceDaysRD').val(),
			penaltyfineRD: $('#penaltyfineRD').val(),
			statusOfPlanRD: statusPlanValue
		};

		// Debug log
		console.log("Sending Recurring Deposit Data:", reccuringDeposite);

		$.ajax({
			url: 'api/Policymangment/recurring-depositsave', // ✅ Corrected endpoint
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(reccuringDeposite),
			success: function(response) {
				alert("Recurring Deposit Saved Successfully");
				location.reload(); // ✅ Reload page after success
			},
			error: function(xhr) {
				console.error("Save Error:", xhr.responseText);
				alert("Something went wrong while saving!");
			}
		});
	});
	// feacth recuuring deposite

	var totalDataRD = [];
	var currentPageRD = 1;
	var pageSizeRD = 5;

	// Load data once
	function fetchRecurringDeposits() {
		$.ajax({
			type: "GET",
			url: "api/Policymangment/recurring-depositview",
			dataType: "json",
			success: function(response) {
				if (response.status === "OK") {
					totalDataRD = response.data;
					renderTableRD(currentPageRD);
					togglePageNavigationRD();
				} else {
					alert("Failed to fetch data: " + response.message);
				}
			},
			error: function() {
				alert("Error while calling the API.");
			}
		});
	}

	// Render paginated table
	function renderTableRD(page) {
		let tableBody = $("#recurringTableBody");
		tableBody.empty();

		let startIndex = (page - 1) * pageSizeRD;
		let endIndex = Math.min(startIndex + pageSizeRD, totalDataRD.length);

		for (let i = startIndex; i < endIndex; i++) {
			let person = totalDataRD[i];
			const statusText = person.statusOfPlanRD == 1 ? 'Active' : 'Inactive';
			let row = `<tr>
						<td>${i + 1}</td>
		                <td>${person.planCodeRD}</td>
		                <td>${person.planNameRD}</td>
		                <td>${person.minimumAmountRD}</td>
		                <td>${person.rateOfInterestRD}</td>
		                <td>${person.installmentTypeRD.toUpperCase()}</td>
		                <td>${person.rdterm}</td>
						<td>${statusText.toUpperCase()}</td>
						<td class="d-flex" style="gap: .7rem;">
							<button type="button" class="iconbutton reccuringedit-btnRD" data-id="${person.id}">
							<i class="fa-solid fa-pen-to-square text-success"></i>
							</button>
							<button type="button" class="iconbutton reccuringdelete-btnRD" data-id="${person.id}">
							<i class="fa-solid fa-trash text-danger"></i>
							</button>
						</td>
		              </tr>`;
			tableBody.append(row);
		}

		// Update page info
		$("#pageInfoRD").text(`Page ${currentPageRD} of ${Math.ceil(totalDataRD.length / pageSizeRD)}`);
	}

	// Button state toggling
	function togglePageNavigationRD() {
		let totalPages = Math.ceil(totalDataRD.length / pageSizeRD);
		$("#prevBtnRD").prop("disabled", currentPageRD === 1);
		$("#nextBtnRD").prop("disabled", currentPageRD === totalPages || totalPages === 0);
	}

	
	// Button click handlers
	$("#prevBtnRD").click(function() {
		if (currentPageRD > 1) {
			currentPageRD--;
			renderTableRD(currentPageRD);
			togglePageNavigationRD();
			scrollToDDTable();
		}
	});

	$("#nextBtnRD").click(function() {
		let totalPages = Math.ceil(totalDataRD.length / pageSizeRD);
		if (currentPageRD < totalPages) {
			currentPageRD++;
			renderTableRD(currentPageRD);
			togglePageNavigationRD();
			scrollToDDTable();
		}
	});

	$(document).on('click', '.reccuringedit-btnRD', function() {
		const id = $(this).data('id');
		editRecurringDeposit(id);
	});
	// get by id reccuring deposite
	function editRecurringDeposit(id) {
		console.log("🔍 Fetching Recurring Deposit with ID:", id);

		$.ajax({
			url: `api/Policymangment/recurringedit/${id}`,
			method: 'GET',
			contentType: 'application/json',
			success: function(response) {
				if (response && response.data) {
					const data = response.data;

					$('#recurringformid').data('id', id); // ✅ Set the ID for update

					$('#planCodeRD').val(data.planCodeRD);
					$('#planNameRD').val(data.planNameRD);
					$('#minimumAmountRD').val(data.minimumAmountRD);
					$('#rateOfInterestRD').val(data.rateOfInterestRD);
					$('#rdterm').val(data.rdterm);
					$('#installmentTypeRD').val(data.installmentTypeRD);
					$('#commissionOnNewRD').val(data.commissionOnNewRD);
					$('#renewalCommissionRD').val(data.renewalCommissionRD);
					$('#componentIntervalRD').val(data.componentIntervalRD);
					$('#totalPaidRD').val(data.totalPaidRD);
					$('#maturityAmountRD').val(data.maturityAmountRD);
					$('#flexiblePlanRD').val(data.flexiblePlanRD);
					$('#graceDaysRD').val(data.graceDaysRD);
					$('#penaltyfineRD').val(data.penaltyfineRD);

					if (parseInt(data.statusOfPlanRD) === 1) {
						$('#toggle-status-planRD').prop('checked', true);
					} else {
						$('#toggle-status-planRD').prop('checked', false);
					}

					updateToggleColor(document.getElementById('toggle-status-planRD'));

					$('#ReccuringsaveBtn').hide();
					$('#ReccuringupdateBtn').show();
				} else {
					alert('No data found for this ID');
				}
			},
			error: function() {
				alert('Failed to fetch daily deposit details.');
			}
		});
	}
	// UPDATE BUTTON for recuuring deposite code
	$('#ReccuringupdateBtn').on('click', function(e) {
		e.preventDefault();

		const id = $('#recurringformid').data('id');

		if (!id) {
			alert("ID missing. Please select a record by clicking Edit.");
			return;
		}

		const updatedRecurringDeposit = getRDFormData();

		$.ajax({
			url: `api/Policymangment/recurringupdate/${id}`,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(updatedRecurringDeposit),
			success: function() {
				alert("Recurring Deposit updated successfully.");
				location.reload();
			},
			error: function(xhr) {
				console.error('Update error:', xhr.responseText);
				alert("Failed to update Recurring Deposit.");
			}
		});
	});
	// Get form Data
	function getRDFormData() {
		const statusPlanValue = $('#toggle-status-planRD').is(':checked') ? 1 : 0;
		return {
			planCodeRD: $('#planCodeRD').val(),
			planNameRD: $('#planNameRD').val(),
			minimumAmountRD: $('#minimumAmountRD').val(),
			rateOfInterestRD: $('#rateOfInterestRD').val(),
			installmentTypeRD: $('#installmentTypeRD').val(),
			durationRD: $('#durationRD').val(),
			termMode: $('#termMode').val(),
			rdterm: $('#rdterm').val(),
			commissionOnNewRD: $('#commissionOnNewRD').val(),
			renewalCommissionRD: $('#renewalCommissionRD').val(),
			componentIntervalRD: $('#componentIntervalRD').val(),
			totalPaidRD: $('#totalPaidRD').val(),
			maturityAmountRD: $('#maturityAmountRD').val(),
			flexiblePlanRD: $('#flexiblePlanRD').val(),
			graceDaysRD: $('#graceDaysRD').val(),
			penltyfineRD: $('#penltyfineRD').val(),
			statusOfPlanRD: statusPlanValue
		};
	}

	function setDropdownValue(selector, value) {
		const dropdown = $(selector);
		if (dropdown.find(`option[value="${value}"]`).length) {
			dropdown.val(value);
		} else {
			dropdown.append(`<option value="${value}">${value}</option>`).val(value);
		}
	}
	// DELETE BUTTON Reccuring Deposite
	$(document).on('click', '.reccuringdelete-btnRD', function() {
		const id = $(this).data('id');

		if (!id) {
			alert("Invalid record. ID not found.");
			return;
		}

		if (!confirm("Are you sure you want to delete this Recurring Deposit?")) {
			return;
		}

		$.ajax({
			url: `api/Policymangment/recurringdelete/${id}`,
			type: 'POST',
			contentType: 'application/json',
			success: function(response) {
				alert(response.message || "Deleted successfully.");
				fetchRecurringDeposits(); // Table reload logic here
			},
			error: function(xhr) {
				const message = xhr.responseJSON?.message || "Failed to delete.";
				alert("Error: " + message);
			}
		});
	});

	$("#componentIntervalRD").change(function() {
		const P = parseFloat(document.getElementById("minimumAmountRD").value); // Installment per period
		const termMonths = parseFloat(document.getElementById("rdterm").value); // Term in months
		const r_annual = parseFloat(document.getElementById("rateOfInterestRD").value) / 100; // Annual interest
		const interval = document.getElementById("componentIntervalRD").value;

		// Payment/compounding frequency map
		const freqMap = {
			"Daily": 365,
			"Monthly": 12,
			"Quarterly": 4,      // spelling must match dropdown
			"Half-Yearly": 2,
			"Yearly": 1
		};

		const m = freqMap[interval] || 12; // fallback to monthly if interval not found
		const i = r_annual / m;            // periodic interest rate

		// Calculate number of installments/periods
		let nPeriods;
		if (interval === "Daily") {
			nPeriods = Math.round((termMonths / 12) * 365); // term in days
		} else {
			nPeriods = Math.round((termMonths / 12) * m);   // term in months/quarters/half-years/years
		}

		// Total deposit
		let totalDeposit = P * nPeriods;
		let maturity;

		if (!isFinite(P) || !isFinite(nPeriods) || !isFinite(i)) {
			maturity = 0;
			totalDeposit = 0;
		} else if (i === 0) {
			maturity = totalDeposit; // no interest
		} else {
			// **RD formula (annuity-due)**: installments credited at start of period
			maturity = P * ((Math.pow(1 + i, nPeriods) - 1) / i) * (1 + i);
		}

		// Update form fields
		document.getElementById("totalPaidRD").value = totalDeposit.toFixed(2);
		document.getElementById("maturityAmountRD").value = maturity.toFixed(2);

		// Interest earned
		const interest = maturity - totalDeposit;
		const interestField = document.getElementById("interestEarnedRD");
		if (interestField) {
			interestField.value = interest.toFixed(2);
		}
	});

	// save ajax code for fixed deposite
	// Initial Button Setup
	$("#FixedsaveBtn").show();
	$("#FixedupdateBtn").hide();

	function validateFixedDeposit() {
	    let isValid = true;

	    const fields = [
	        "planCodeFD",
	        "planNameFD",
	        "minimumAmountFD",
			"installmentTypeFD",
			"componentIntervalFD",
			"interestEarnedFD",
			"flexiblePlanFD",
			"graceDaysFD",
			"penltyfineFD",
	        "rateOfInterestFD",
	        "fdterm"
	    ];

	    fields.forEach(function(field) {
	        const value = $("#" + field).val();
	        clearError(field);

	        if (isEmpty(value)) {
	            showError(field, "This field is required");
	            isValid = false;
	        }
	    });

	    return isValid;
	}

	// SAVE BUTTON
	$('#FixedsaveBtn').on('click', function(e) {
		e.preventDefault();
		
		if (!validateFixedDeposit()) return;

		const statusPlanValue = $('#toggle-status-planFD').is(':checked') ? 1 : 0;

		const fixedDeposit = {
			fd: $('#fd').val(),
			planCodeFD: $('#planCodeFD').val(),
			planNameFD: $('#planNameFD').val(),
			minimumAmountFD: $('#minimumAmountFD').val(),
			rateOfInterestFD: $('#rateOfInterestFD').val(),
			termModeFD: $('#termModeFD').val(),
			fdterm: $('#fdterm').val(),                      // ✅ fixed
			durationFD: $('#durationFD').val(),
			installmentTypeFD: $('#installmentTypeFD').val(),
			commissionOnNewFD: $('#commissionOnNewFD').val(),
			renewalCommissionFD: $('#renewalCommissionFD').val(),
			componentIntervalFD: $('#componentIntervalFD').val(),
			totalPaidFD: $('#totalPaidFD').val(),            // ✅ already correct
			maturityAmountFD: $('#maturityAmountFD').val(),
			flexiblePlanFD: $('#flexiblePlanFD').val(),
			graceDaysFD: $('#graceDaysFD').val(),
			penltyfineFD: $('#penltyfineFD').val(),
			statusOfPlanFD: statusPlanValue
		};

		console.log("Sending FD Data:", fixedDeposit);

		$.ajax({
			url: 'api/Policymangment/fixed-depositsave',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(fixedDeposit),
			success: function(response) {
				alert("Fixed Deposit Saved Successfully");
				location.reload(); // Refresh UI
			},
			error: function(xhr) {
				console.error("Save Error:", xhr.responseText);
				alert("Something went wrong while saving!");
			}
		});
	});

	var totalDataFD = [];
	var currentPageFD = 1;
	var pageSizeFD = 5;

	// Load data once
	function fetchFixedDeposits() {
		$.ajax({
			type: "GET",
			url: "api/Policymangment/fixed-depositview",
			dataType: "json",
			success: function(response) {
				if (response.status === "OK") {
					totalDataFD = response.data;
					renderTableFD(currentPageFD);
					togglePageNavigationFD();
				} else {
					alert("Failed to fetch data: " + response.message);
				}
			},
			error: function() {
				alert("Error while calling the API.");
			}
		});
	}

	// Render paginated table
	function renderTableFD(page) {
		let tableBody = $("#fixedTableBody");
		tableBody.empty();

		let startIndex = (page - 1) * pageSizeFD;
		let endIndex = Math.min(startIndex + pageSizeFD, totalDataFD.length);

		for (let i = startIndex; i < endIndex; i++) {
			let person = totalDataFD[i];
			const statusText = person.statusOfPlanFD == 1 ? 'Active' : 'Inactive';
			let row = `<tr>
							<td>${i + 1}</td>
			                <td>${person.planCodeFD}</td>
			                <td>${person.planNameFD}</td>
			                <td>${person.minimumAmountFD}</td>
			                <td>${person.rateOfInterestFD}</td>
			                <td>${person.installmentTypeFD.toUpperCase()}</td>
			                <td>${person.fdterm}</td>
							<td>${statusText.toUpperCase()}</td>
							<td class="d-flex" style="gap: .7rem;">
								<button type="button" class="iconbutton fixededit-btnFD" data-id="${person.id}">
								<i class="fa-solid fa-pen-to-square text-success"></i>
								</button>
								<button type="button" class="iconbutton fixeddelete-btnFD" data-id="${person.id}">
								<i class="fa-solid fa-trash text-danger"></i>
								</button>
							</td>
			              </tr>`;
			tableBody.append(row);
		}

		// Update page info
		$("#pageInfoFD").text(`Page ${currentPageFD} of ${Math.ceil(totalDataFD.length / pageSizeFD)}`);
	}

	// Button state toggling
	function togglePageNavigationFD() {
		let totalPages = Math.ceil(totalDataFD.length / pageSizeFD);
		$("#prevBtnFD").prop("disabled", currentPageFD === 1);
		$("#nextBtnFD").prop("disabled", currentPageFD === totalPages || totalPages === 0);
	}

	// Button click handlers
	$("#prevBtnFD").click(function() {
		if (currentPageFD > 1) {
			currentPageFD--;
			renderTableFD(currentPageFD);
			togglePageNavigationFD();
			scrollToDDTable();
		}
	});

	$("#nextBtnFD").click(function() {
		let totalPages = Math.ceil(totalDataFD.length / pageSizeFD);
		if (currentPageFD < totalPages) {
			currentPageFD++;
			renderTableFD(currentPageFD);
			togglePageNavigationFD();
			scrollToDDTable();
		}
	});

	$(document).on('click', '.fixededit-btnFD', function() {
		const id = $(this).data('id');
		editFixedDeposit(id);
	});
	function editFixedDeposit(id) {
		console.log("🔍 Fetching Fixed Deposit with ID:", id);

		$.ajax({
			url: `api/Policymangment/fixededit/${id}`,
			method: 'GET',
			contentType: 'application/json',
			success: function(response) {
				if (response && response.data) {
					const data = response.data;

					$('#fixedformid').data('id', id); // ✅ Set the ID for update

					$('#planCodeFD').val(data.planCodeFD);
					$('#planNameFD').val(data.planNameFD);
					$('#minimumAmountFD').val(data.minimumAmountFD);
					$('#rateOfInterestFD').val(data.rateOfInterestFD);
					$('#fdterm').val(data.fdterm);
					$('#installmentTypeFD').val(data.installmentTypeFD);
					$('#commissionOnNewFD').val(data.commissionOnNewFD);
					$('#renewalCommissionFD').val(data.renewalCommissionFD);
					$('#componentIntervalFD').val(data.componentIntervalFD);
					$('#totalPaidFD').val(data.totalPaidFD);
					$('#maturityAmountFD').val(data.maturityAmountFD);
					$('#flexiblePlanFD').val(data.flexiblePlanFD);
					$('#graceDaysFD').val(data.graceDaysFD);
					$('#penltyfineFD').val(data.penltyfineFD);

					if (parseInt(data.statusOfPlanFD) === 1) {
						$('#toggle-status-planFD').prop('checked', true);
					} else {
						$('#toggle-status-planFD').prop('checked', false);
					}

					updateToggleColor(document.getElementById('toggle-status-planFD'));

					$('#FixedsaveBtn').hide();
					$('#FixedupdateBtn').show();
				} else {
					alert('No data found for this ID');
				}
			},
			error: function() {
				alert('Failed to fetch daily deposit details.');
			}
		});
	}
	$('#FixedupdateBtn').on('click', function(e) {
		e.preventDefault();

		const id = $('#fixedformid').data('id');

		if (!id) {
			alert("ID missing. Please select a record by clicking Edit.");
			return;
		}

		const updatedFixedDeposit = getFDFormData();

		$.ajax({
			url: `api/Policymangment/fixedupdate/${id}`,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(updatedFixedDeposit),
			success: function() {
				alert("Fixed Deposit updated successfully.");
				location.reload();
			},
			error: function(xhr) {
				console.error('Update error:', xhr.responseText);
				alert("Failed to update Fixed Deposit.");
			}
		});
	});
	// get all the data from the database
	function getFDFormData() {
		const statusPlanValue = $('#toggle-status-planFD').is(':checked') ? 1 : 0;
		return {
			planCodeFD: $('#planCodeFD').val(),
			planNameFD: $('#planNameFD').val(),
			minimumAmountFD: $('#minimumAmountFD').val(),
			rateOfInterestFD: $('#rateOfInterestFD').val(),
			installmentTypeFD: $('#installmentTypeFD').val(),
			durationFD: $('#durationFD').val(),
			termModeFD: $('#termModeFD').val(),
			fdterm: $('#fdterm').val(),
			componentIntervalFD: $('#componentIntervalFD').val(),
			totalPaidFD: $('#totalPaidFD').val(),
			maturityAmountFD: $('#maturityAmountFD').val(),
			flexiblePlanFD: $('#flexiblePlanFD').val(),
			graceDaysFD: $('#graceDaysFD').val(),
			commissionOnNewFD: $('#commissionOnNewFD').val(),
			penltyfineFD: $('#penltyfineFD').val(),
			renewalCommissionFD: $('#renewalCommissionFD').val(),
			statusOfPlanFD: statusPlanValue
		};
	}
	$(document).on('click', '.fixeddelete-btnFD', function() {
		const id = $(this).data('id');

		if (!id) {
			alert("Invalid record. ID not found.");
			return;
		}

		if (!confirm("Are you sure you want to delete this Fixed Deposit?")) {
			return;
		}

		$.ajax({
			url: `api/Policymangment/fixeddelete/${id}`,
			type: 'POST',
			contentType: 'application/json',
			success: function(response) {
				alert(response.message || "Deleted successfully.");
				fetchFixedDeposits(); // Refresh table after delete
			},
			error: function(xhr) {
				const message = xhr.responseJSON?.message || "Failed to delete.";
				alert("Error: " + message);
			}
		});
	});
	function setDropdownValue(selector, value) {
		const dropdown = $(selector);
		if (dropdown.find(`option[value="${value}"]`).length) {
			dropdown.val(value);
		} else {
			dropdown.append(`<option value="${value}">${value}</option>`).val(value);
		}
	}

	function calculateFixedDepositCI() {
		// Get values from form
		const principal = parseFloat(document.getElementById("minimumAmountFD").value) || 0;
		const interestRate = parseFloat(document.getElementById("rateOfInterestFD").value) || 0; // annual %
		const termYears = parseFloat(document.getElementById("fdterm").value) || 0; // term in years
		const interval = document.getElementById("componentIntervalFD").value; // Monthly, Quarterly, etc.

		// Determine compounding periods per year
		let n = 1; // default yearly
		switch (interval) {
			case "Monthly": n = 12; break;
			case "Quarterly": n = 4; break;
			case "Half-Yearly": n = 2; break;
			case "Yearly": n = 1; break;
			case "On Maturity": n = 1; break;
		}

		// Compound Interest formula: A = P * (1 + r/n)^(n*t)
		const r = interestRate / 100;
		const maturityAmount = principal * Math.pow(1 + r / n, n * termYears);

		// Interest Earned
		const interestEarned = maturityAmount - principal;

		// Total intervals
		const totalIntervals = n * termYears;

		// Interest per interval
		const interestPerInterval = totalIntervals > 0 ? interestEarned / totalIntervals : interestEarned;

		// Total Deposit (Principal)
		const totalDeposit = principal;

		// Update fields
		document.getElementById("totalPaidFD").value = totalDeposit.toFixed(2);
		document.getElementById("maturityAmountFD").value = maturityAmount.toFixed(2);
		document.getElementById("interestEarnedFD").value = interestEarned.toFixed(2);
		document.getElementById("interestPerIntervalFD").value = interestPerInterval.toFixed(2);
	}

	// Event listeners
	document.getElementById("minimumAmountFD").addEventListener("input", calculateFixedDepositCI);
	document.getElementById("rateOfInterestFD").addEventListener("input", calculateFixedDepositCI);
	document.getElementById("fdterm").addEventListener("input", calculateFixedDepositCI);
	document.getElementById("componentIntervalFD").addEventListener("change", calculateFixedDepositCI);

	//Mis deposite save
	$("#missaveBtn").show();
	$("#misgenrateBtn").show();
	$("#misdupdateBtn").hide();


	function validateMISDeposit() {
	    let isValid = true;

	    const fields = [
	        "planCodeMD",
	        "planNameMD",
	        "minimumAmountMD",
	        "rateOfInterestMD",
	        "misTerm"
	    ];

	    fields.forEach(function(field) {
	        const value = $("#" + field).val();
	        clearError(field);

	        if (isEmpty(value)) {
	            showError(field, "This field is required");
	            isValid = false;
	        }
	    });

	    return isValid;
	}

	$('#missaveBtn').on('click', function(e) {
		e.preventDefault();
		
		if (!validateMISDeposit()) return;

		const statusPlanValue = $('#toggle-status-planMIS').is(':checked') ? 1 : 0;

		const misDeposit = {
			mis: $('#mis').val(),
			planCodeMD: $('#planCodeMD').val(),
			planNameMD: $('#planNameMD').val(),
			minimumAmountMD: $('#minimumAmountMD').val(),
			rateOfInterestMD: $('#rateOfInterestMD').val(),
			installmentTypeMD: $('#installmentTypeMD').val(),
			misTerm: $('#misTerm').val(),
			totalPaidMD: $('#totalPaidMD').val(),
			commissionOnNewMD: $('#commissionOnNewMD').val(),
			renewalCommissionMD: $('#renewalCommissionMD').val(),
			MISIntervalMD: $('#MISIntervalMD').val(),
			MISInterestMD: $('#MISInterestMD').val(),
			maturityAmountMD: $('#maturityAmountMD').val(),
			flexiblePlanMD: $('#flexiblePlanMD').val(),
			graceDaysMD: $('#graceDaysMD').val(),
			penltyfineMD: $('#penltyfineMD').val(),
			statusOfPlanMDRD2: statusPlanValue
		};

		console.log("Sending MIS Data:", misDeposit);

		$.ajax({
			url: 'api/Policymangment/mis-deposit/save',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(misDeposit),
			success: function(response) {
				alert("MIS Deposit Saved Successfully");
				location.reload();
			},
			error: function(xhr) {
				console.error("Save Error:", xhr.responseText);
				alert("Something went wrong while saving MIS Deposit!");
			}
		});
	});
	// FETCH MIS DEPOSITS

	var totalDataMIS = [];
	var currentPageMIS = 1;
	var pageSizeMIS = 5;

	// Load data once
	function fetchMISDeposits() {
		$.ajax({
			type: "GET",
			url: "api/Policymangment/mis-deposit/view",
			dataType: "json",
			success: function(response) {
				if (response.status === "OK") {
					totalDataMIS = response.data;
					renderTableMIS(currentPageMIS);
					togglePageNavigationMIS();
				} else {
					alert("Failed to fetch data: " + response.message);
				}
			},
			error: function() {
				alert("Error while calling the API.");
			}
		});
	}

	// Render paginated table
	function renderTableMIS(page) {
		let tableBody = $("#misdepositeTableBody");
		tableBody.empty();

		let startIndex = (page - 1) * pageSizeMIS;
		let endIndex = Math.min(startIndex + pageSizeMIS, totalDataMIS.length);

		for (let i = startIndex; i < endIndex; i++) {
			let person = totalDataMIS[i];
			const statusText = person.statusOfPlanMDRD2 == 1 ? 'Active' : 'Inactive';
			let row = `<tr>
								<td>${i + 1}</td>
				                <td>${person.planCodeMD}</td>
				                <td>${person.planNameMD}</td>
				                <td>${person.minimumAmountMD}</td>
				                <td>${person.rateOfInterestMD}</td>
				                <td>${person.installmentTypeMD.toUpperCase()}</td>
				                <td>${person.misTerm}</td>
								<td>${statusText.toUpperCase()}</td>
								<td class="d-flex" style="gap: .7rem;">
									<button type="button" class="iconbutton misedit-btn" data-id="${person.id}">
									<i class="fa-solid fa-pen-to-square text-success"></i>
									</button>
									<button type="button" class="iconbutton misdelete-btn" data-id="${person.id}">
									<i class="fa-solid fa-trash text-danger"></i>
									</button>
								</td>
				              </tr>`;
			tableBody.append(row);
		}

		// Update page info
		$("#pageInfoMIS").text(`Page ${currentPageMIS} of ${Math.ceil(totalDataMIS.length / pageSizeMIS)}`);
	}

	// Button state toggling
	function togglePageNavigationMIS() {
		let totalPages = Math.ceil(totalDataMIS.length / pageSizeMIS);
		$("#prevBtnMIS").prop("disabled", currentPageMIS === 1);
		$("#nextBtnMIS").prop("disabled", currentPageMIS === totalPages || totalPages === 0);
	}

	// Button click handlers
	$("#prevBtnMIS").click(function() {
		if (currentPageMIS > 1) {
			currentPageMIS--;
			renderTableMIS(currentPageMIS);
			togglePageNavigationMIS();
			scrollToDDTable();
		}
	});

	$("#nextBtnMIS").click(function() {
		let totalPages = Math.ceil(totalDataMIS.length / pageSizeMIS);
		if (currentPageMIS < totalPages) {
			currentPageMIS++;
			renderTableMIS(currentPageMIS);
			togglePageNavigationMIS();
			scrollToDDTable();
		}
	});

	// Fix this line (change `.misdelete-btn` to `.misedit-btn`)
	$(document).on('click', '.misedit-btn', function() {
		const id = $(this).data('id');
		editMISDeposit(id);
	});


	function editMISDeposit(id) {
		$.ajax({
			url: `api/Policymangment/misedit/${id}`,
			method: 'GET',
			contentType: 'application/json',
			success: function(response) {
				if (response && response.data) {
					const data = response.data;
					console.log("Editing ID:", id, data); // ✅ log

					$('#misdepositeid').data('id', id); // ✅ Consistent ID holder

					$('#planCodeMD').val(data.planCodeMD);
					$('#planNameMD').val(data.planNameMD);
					$('#minimumAmountMD').val(data.minimumAmountMD);
					$('#rateOfInterestMD').val(data.rateOfInterestMD);
					setDropdownValue("#installmentTypeMD", data.installmentTypeMD);
					$('#misTerm').val(data.misTerm);
					$('#commissionOnNewMD').val(data.commissionOnNewMD);
					$('#renewalCommissionMD').val(data.renewalCommissionMD);
					$('#totalPaidMD').val(data.totalPaidMD);
					$('#maturityAmountMD').val(data.maturityAmountMD);
					setDropdownValue("#flexiblePlanMD", data.flexiblePlanMD);
					$('#graceDaysMD').val(data.graceDaysMD);
					$('#penltyfineMD').val(data.penltyfineMD);

					if (parseInt(data.statusOfPlanMDRD2) === 1) {
						$('#toggle-status-planMIS').prop('checked', true);
					} else {
						$('#toggle-status-planMIS').prop('checked', false);
					}

					updateToggleColor(document.getElementById('toggle-status-planMIS'));

					$("#missaveBtn").hide();
					$("#misdupdateBtn").show();
				} else {
					alert('No data found for this ID');
				}
			},
			error: function() {
				alert('Failed to fetch MIS Deposit details.');
			}
		});
	}
	//update code of the mis deposite
	$('#misdupdateBtn').on('click', function(e) {
		e.preventDefault();
		const id = $('#misdepositeid').data('id'); // ✅ fix here

		if (!id) {
			alert("ID missing. Please select a record to update.");
			return;
		}

		const updatedMIS = getMISFormData();

		$.ajax({
			url: `api/Policymangment/misupdate/${id}`,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(updatedMIS),
			success: function() {
				alert("MIS Deposit updated successfully.");
				location.reload();
			},
			error: function(xhr) {
				console.error('Update error:', xhr.responseText);
				alert("Failed to update MIS Deposit.");
			}
		});
	});

	// DELETE
	// DELETE HANDLER
	$(document).on('click', '.misdelete-btn', function() {
		const id = $(this).data('id');

		if (!id) {
			alert("Invalid record ID.");
			return;
		}

		// Confirmation prompt
		if (!confirm("Are you sure you want to delete this MIS Deposit?")) {
			return;
		}

		// Perform AJAX DELETE request
		$.ajax({
			url: `api/Policymangment/misdelete/${id}`,
			type: 'POST',
			contentType: 'application/json',
			success: function(response) {
				alert(response.message || "MIS Deposit deleted successfully.");
				fetchMISDeposits(); // Refresh the table
			},
			error: function(xhr) {
				const message = xhr.responseJSON?.message || "Failed to delete the MIS Deposit.";
				alert("Error: " + message);
				console.error("Delete error:", xhr.responseText);
			}
		});
	});

	// HELPER FUNCTION TO GET FORM DATA
	function getMISFormData() {
		const statusPlanValue = $('#toggle-status-planMIS').is(':checked') ? 1 : 0;
		return {
			planCodeMD: $('#planCodeMD').val(),
			planNameMD: $('#planNameMD').val(),
			minimumAmountMD: $('#minimumAmountMD').val(),
			rateOfInterestMD: $('#rateOfInterestMD').val(),
			installmentTypeMD: $('#installmentTypeMD').val(),
			termModeMD: $('#termModeMD').val(),
			misTerm: $('#misTerm').val(),
			durationMD: $('#durationMD').val(),
			commissionOnNewMD: $('#commissionOnNewMD').val(),
			renewalCommissionMD: $('#renewalCommissionMD').val(),
			MISIntervalMD: $('#MISIntervalMD').val(),
			MISInterestMD: $('#MISInterestMD').val(),
			maturityAmountMD: $('#maturityAmountMD').val(),
			flexiblePlanMD: $('#flexiblePlanMD').val(),
			graceDaysMD: $('#graceDaysMD').val(),
			penaltyRateMD: $('#penaltyRateMD').val(),
			statusOfPlanMDRD2: statusPlanValue

		};
	}
	function setDropdownValue(selector, value) {
		const dropdown = $(selector);
		if (dropdown.find(`option[value="${value}"]`).length) {
			dropdown.val(value);
		} else {
			dropdown.append(`<option value="${value}">${value}</option>`).val(value);
		}
	}




});

document.addEventListener('DOMContentLoaded', function() {
	const toggles = document.querySelectorAll('.toggle__input');

	toggles.forEach((toggle) => {
		updateToggleColor(toggle);

		toggle.addEventListener('change', () => {
			updateToggleColor(toggle);
			console.log(`${toggle.dataset.toggleType} is now ${toggle.checked}`);
		});
	});

	function updateToggleColor(input) {
		const label = input.nextElementSibling;
		if (label) {
			label.style.backgroundColor = input.checked ? '#28a745' : '#ccc';
		}
	}
});

function calculateMISDeposit() {
    const principal = parseFloat(document.getElementById("minimumAmountMD").value) || 0;
    const interestRate = parseFloat(document.getElementById("rateOfInterestMD").value) || 0; // annual %
    const termYears = parseFloat(document.getElementById("misTerm").value) || 0; // term in years

    // Total Deposit is just principal
    const totalDeposit = principal;

    // Interest per month
    const monthlyInterest = (principal * interestRate) / (100 * 12);

    // Total interest over the term
    const totalInterest = monthlyInterest * 12 * termYears;

    // Maturity amount
    const maturityAmount = principal + totalInterest;
	
	const interestEarned = maturityAmount - principal;

    // Interest per interval (monthly payout)
    const interestPerInterval = monthlyInterest;

    // Update fields
    document.getElementById("totalPaidMD").value = totalDeposit.toFixed(2);
    document.getElementById("maturityAmountMD").value = maturityAmount.toFixed(2);
	document.getElementById("interestEarnedMD").value = interestEarned.toFixed(2);
	//document.getElementById("interestPerIntervalMD").value = interestPerInterval.toFixed(2);
}

// Event listeners
document.getElementById("minimumAmountMD").addEventListener("input", calculateMISDeposit);
document.getElementById("rateOfInterestMD").addEventListener("input", calculateMISDeposit);
document.getElementById("misTerm").addEventListener("input", calculateMISDeposit);

