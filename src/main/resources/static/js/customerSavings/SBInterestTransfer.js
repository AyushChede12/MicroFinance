$(document).ready(function() {

	/* =========================
	   1. LOAD ACCOUNT NUMBERS
	========================= */
	function loadAccountNumbers() {
		$.ajax({
			url: "api/customersavings/getAllSavingAccountData",
			type: "GET",
			dataType: "json",
			success: function(response) {
				let dropdown = $('#accountNumber');
				dropdown.empty();
				dropdown.append('<option value="">SELECT ACCOUNT NO</option>');

				if ((response.status === "OK" || response.status === "FOUND") && response.data?.length > 0) {
					$.each(response.data, function(i, acc) {
						dropdown.append(`<option value="${acc.accountNumber}">${acc.accountNumber}</option>`);
					});
				}
			},
			error: function(xhr) {
				console.error("Account load error:", xhr.responseText);
			}
		});
	}

	loadAccountNumbers();

	/* =================================
	   2. FETCH CUSTOMER DETAILS
	================================= */
	$('#accountNumber').on('change', function() {

		let accNo = $(this).val();

		$('#customerName, #accountType, #currentBalance').val('');

		if (!accNo) return;

		$.ajax({
			url: "api/customersavings/getallbyaccountnumber",
			type: "GET",
			data: { accountNumber: accNo },
			dataType: "json",
			success: function(response) {

				if ((response.status === "OK" || response.status === "FOUND") && response.data?.length > 0) {

					let acc = response.data[0];

					$('#customerName').val(acc.enterCustomerName || '');
					$('#accountType').val(acc.accountType || 'SAVING');
					$('#currentBalance').val(acc.balance || 0);

				} else {
					alert("Account details not found");
				}
			},
			error: function() {
				alert("Failed to fetch account details");
			}
		});
	});

	/* =========================
	   3. GENERATE INTEREST
	========================= */
	$('#generateInterestBtn').on('click', function(e) {
		e.preventDefault();

		let balance = parseFloat($('#currentBalance').val());
		let rate = parseFloat($('#interestRate').val());
		let interestType = $('#interestType').val();

		let fromDateVal = $('#fromDate').val();
		let toDateVal = $('#toDate').val();

		if (!balance || !rate || !interestType || !fromDateVal || !toDateVal) {
			alert("Please fill all required fields");
			return;
		}

		let fromDate = new Date(fromDateVal);
		let toDate = new Date(toDateVal);

		if (fromDate > toDate) {
			alert("From Date cannot be greater than To Date");
			return;
		}

		// ===== TOTAL DAYS (Same as backend expectation) =====
		let timeDiff = toDate - fromDate;
		let totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
		$('#totalDays').val(totalDays);

		// ===== INTEREST CALCULATION (MATCH BACKEND) =====
		let interestAmount =
			(balance * rate * totalDays) / 36500;

		interestAmount = parseFloat(interestAmount.toFixed(2));

		if (interestAmount <= 0) {
			alert("Calculated interest is invalid");
			return;
		}

		// ===== SET VALUES =====
		$('#interestAmount').val(interestAmount);
		$('#newBalance').val((balance + interestAmount).toFixed(2));
	});


});

document.addEventListener("DOMContentLoaded", function() {

	const fromDate = document.getElementById("fromDate");
	const toDate = document.getElementById("toDate");
	const totalDays = document.getElementById("totalDays");

	function calculateTotalDays() {
		if (!fromDate.value || !toDate.value) {
			totalDays.value = "";
			return;
		}

		const startDate = new Date(fromDate.value);
		const endDate = new Date(toDate.value);

		// Validate date order
		if (endDate < startDate) {
			alert("TO DATE cannot be earlier than FROM DATE");
			totalDays.value = "";
			toDate.value = "";
			return;
		}

		// Difference in milliseconds
		const diffTime = endDate.getTime() - startDate.getTime();

		// Convert to days (+1 for inclusive count)
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

		totalDays.value = diffDays;
	}

	fromDate.addEventListener("change", calculateTotalDays);
	toDate.addEventListener("change", calculateTotalDays);

});

$(document).ready(function() {

	$('#interestType, #fromDate').on('change', function() {

		let interestType = $('#interestType').val();
		let fromDateVal = $('#fromDate').val();

		if (!interestType || !fromDateVal) {
			return;
		}

		let fromDate = new Date(fromDateVal);
		let minToDate = new Date(fromDate);
		let maxToDate = new Date(fromDate);

		if (interestType === "monthly") {
			// +1 month
			maxToDate.setMonth(fromDate.getMonth() + 1);

		} else if (interestType === "quaterly") {
			// +3 months
			maxToDate.setMonth(fromDate.getMonth() + 3);

		} else if (interestType === "yearly") {
			// +1 year
			maxToDate.setFullYear(fromDate.getFullYear() + 1);
		}

		// format YYYY-MM-DD
		function formatDate(date) {
			let d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;

			return [year, month, day].join('-');
		}

		$('#toDate').attr('min', formatDate(minToDate));
		$('#toDate').attr('max', formatDate(maxToDate));
		$('#toDate').val(""); // force reselect

	});

	/* ---- Extra Safety: Validate on ToDate Change ---- */
	$('#toDate').on('change', function() {

		let toDate = new Date($(this).val());
		let maxDate = new Date($(this).attr('max'));

		if (toDate > maxDate) {
			alert("Selected date is not allowed for selected interest type");
			$(this).val("");
		}
	});

	$("#transferInterestBtn").click(function() {

		// ===== COLLECT FORM DATA =====
		let interestData = {
			accountNumber: $("#accountNumber").val(),
			customerName: $("#customerName").val(),
			accountType: $("#accountType").val(),
			currentBalance: $("#currentBalance").val(),

			interestType: $("#interestType").val(),
			interestRate: $("#interestRate").val(),

			fromDate: $("#fromDate").val(),
			toDate: $("#toDate").val(),
			totalDays: $("#totalDays").val(),

			interestAmount: $("#interestAmount").val(),
			newBalance: $("#newBalance").val(),
		};

		// ===== BASIC VALIDATION =====
		if (!interestData.accountNumber || !interestData.interestRate || !interestData.totalDays) {
			alert("Please fill all required interest details");
			return;
		}

		// ===== CONFIRMATION =====
		if (!confirm("Are you sure you want to transfer interest?")) {
			return;
		}

		// ===== AJAX CALL =====
		$.ajax({
			url: "api/customersavings/transferInterest",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(interestData),
			success: function(response) {

				if (response.status === "OK") {
					alert(response.message);
					// Optional: disable button to prevent double click
					//$("#transferInterestBtn").prop("disabled", true);
				} else {
					alert(response.message);
				}
			},
			error: function(xhr) {
				if (xhr.responseJSON && xhr.responseJSON.message) {
					alert(xhr.responseJSON.message);
				} else {
					alert("Error while transferring interest");
				}
			}
		});
	});

});
