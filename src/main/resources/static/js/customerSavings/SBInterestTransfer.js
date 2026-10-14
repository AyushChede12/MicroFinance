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
				console.error("ACCOUNT LOAD ERROR:", xhr.responseText);
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
					alert("ACCOUNT DETAILS NOT FOUND");
				}
			},
			error: function() {
				alert("FAILED TO FETCH ACCOUNT DETAILS");
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
			alert("PLEASE FILL ALL REQUIRED FIELDS");
			return;
		}

		let fromDate = new Date(fromDateVal);
		let toDate = new Date(toDateVal);

		if (fromDate > toDate) {
			alert("FROM DATE CANNOT BE GREATER THAN TO DATE");
			return;
		}

		// ===== TOTAL DAYS (SAME AS BACKEND EXPECTATION) =====
		let timeDiff = toDate - fromDate;
		let totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
		$('#totalDays').val(totalDays);

		// ===== INTEREST CALCULATION (MATCH BACKEND) =====
		let interestAmount =
			(balance * rate * totalDays) / 36500;

		interestAmount = parseFloat(interestAmount.toFixed(2));

		if (interestAmount <= 0) {
			alert("CALCULATED INTEREST IS INVALID");
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

		// VALIDATE DATE ORDER
		if (endDate < startDate) {
			alert("TO DATE CANNOT BE EARLIER THAN FROM DATE");
			totalDays.value = "";
			toDate.value = "";
			return;
		}

		// DIFFERENCE IN MILLISECONDS
		const diffTime = endDate.getTime() - startDate.getTime();

		// CONVERT TO DAYS (+1 FOR INCLUSIVE COUNT)
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
			// +1 MONTH
			maxToDate.setMonth(fromDate.getMonth() + 1);

		} else if (interestType === "quaterly") {
			// +3 MONTHS
			maxToDate.setMonth(fromDate.getMonth() + 3);

		} else if (interestType === "yearly") {
			// +1 YEAR
			maxToDate.setFullYear(fromDate.getFullYear() + 1);
		}

		// FORMAT YYYY-MM-DD
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
		$('#toDate').val(""); // FORCE RESELECT

	});

	/* ---- EXTRA SAFETY: VALIDATE ON TODATE CHANGE ---- */
	$('#toDate').on('change', function() {

		let toDate = new Date($(this).val());
		let maxDate = new Date($(this).attr('max'));

		if (toDate > maxDate) {
			alert("SELECTED DATE IS NOT ALLOWED FOR SELECTED INTEREST TYPE");
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
			alert("PLEASE FILL ALL REQUIRED INTEREST DETAILS");
			return;
		}

		// ===== CONFIRMATION =====
		if (!confirm("ARE YOU SURE YOU WANT TO TRANSFER INTEREST?")) {
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
					alert(response.message.toUpperCase());
					// OPTIONAL: DISABLE BUTTON TO PREVENT DOUBLE CLICK
					//$("#transferInterestBtn").prop("disabled", true);
				} else {
					alert(response.message.toUpperCase());
				}
			},
			error: function(xhr) {
				if (xhr.responseJSON && xhr.responseJSON.message) {
					alert(xhr.responseJSON.message.toUpperCase());
				} else {
					alert("ERROR WHILE TRANSFERRING INTEREST");
				}
			}
		});
	});

});