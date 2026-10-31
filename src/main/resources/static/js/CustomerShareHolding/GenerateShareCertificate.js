// Customer ShareHolding - Generate Share Certificate

$(document).ready(function() {
	loadCustomerDropdown();

	// Dropdown change listener
	$('#referralCodeEntry').on('change', function() {
		var selectedCode = $(this).val();
		$('#certificateSection').hide();

		if (!selectedCode) {
			$('#shareholdingTableBody').empty();
			return;
		}

		fetchShareData(selectedCode);
	});

	// View Certificate button click
	$('#printCertificateBtn').on('click', function() {
		var selectedCheckbox = $('#shareholdingTableBody input[type="checkbox"]:checked');

		if (selectedCheckbox.length === 0) {
			alert("PLEASE SELECT A SHARE RECORD TO VIEW CERTIFICATE!");
			$('#certificateSection').hide();
			return;
		}

		var rowData = selectedCheckbox.closest('tr').data('model');
		if (!rowData) {
			alert("INVALID SHARE RECORD SELECTED!");
			return;
		}

		// Populate Certificate fields in uppercase
		var custName = (rowData.customerName || "").toUpperCase();
		$('#customeridandName').text((rowData.findByCode || "") + " - " + custName);
		$('#certificateno').text(rowData.certificateNo || "-");
		$('#numberofshare').text(rowData.noOfShare || "0");

		var amt = rowData.amountTransferred;
		if (!amt || amt === "0") {
			var qty = parseInt(rowData.noOfShare || 0, 10);
			var base = parseFloat(rowData.baseValue || 10);
			amt = String(qty * base);
		}
		$('#amounttransferred').text("INR " + amt);
		$('#branchname').text((rowData.branch || "-").toUpperCase());
		$('#startdate').text(rowData.startDate || "-");
		$('#balanceshare').text(rowData.balanceShares || "0");
		$('#shareissuedby').text((rowData.shareIssuedBy || "BANK").toUpperCase());
		$('#dataoftransfer').text(rowData.dateOfTransfer || "-");
		$('#modeofpayement').text((rowData.modeOfPayment || "CASH").toUpperCase());

		$('#certificateSection').fadeIn(300, function() {
			$('html, body').animate({
				scrollTop: $("#certificateSection").offset().top - 40
			}, 400);
		});
	});

	// Print Certificate button
	$("#printBtn").on("click", function(e) {
		e.preventDefault();
		printCertificateWindow();
	});

	// Download Certificate button
	$("#downloadBtn").on("click", function(e) {
		e.preventDefault();
		printCertificateWindow();
	});
});

// Load distinct customers with shares for dropdown
function loadCustomerDropdown() {
	$.ajax({
		url: "api/customershareholdingcontroller/getAllTransferShare",
		type: "GET",
		success: function(response) {
			var dropdown = $('#referralCodeEntry');
			dropdown.empty().append('<option value="">SELECT CUSTOMER</option>');

			if (response.status === "OK" && Array.isArray(response.data)) {
				var seenCodes = new Set();
				$.each(response.data, function(index, customer) {
					if (customer.findByCode && !seenCodes.has(customer.findByCode)) {
						seenCodes.add(customer.findByCode);
						var name = (customer.customerName || "").toUpperCase();
						dropdown.append(`<option value="${customer.findByCode}">${customer.findByCode} - ${name}</option>`);
					}
				});
			} else {
				console.warn("NO SHAREHOLDING CUSTOMERS FOUND");
			}
		},
		error: function(error) {
			console.error("DROPDOWN LOAD ERROR:", error);
			alert("ERROR LOADING CUSTOMER LIST!");
		}
	});
}

// Fetch Share Data for Selected Customer
function fetchShareData(selectedCode) {
	$.ajax({
		type: "POST",
		url: "api/customershareholdingcontroller/fetchByCertificateNo",
		data: { findByCode: selectedCode },
		success: function(response) {
			var tbody = $('#shareholdingTableBody');
			tbody.empty();

			if (response.status === "FOUND" && Array.isArray(response.data) && response.data.length > 0) {
				$.each(response.data, function(index, share) {
					var amt = share.amountTransferred;
					if (!amt || amt === "0") {
						var qty = parseInt(share.noOfShare || 0, 10);
						var base = parseFloat(share.baseValue || 10);
						amt = String(qty * base);
					}

					var $tr = $('<tr>');
					$tr.data('model', share);

					$tr.html(`
						<td><input type="checkbox" class="share-row-chk" value="${share.id || index}" /></td>
						<td>${index + 1}</td>
						<td>${(share.findByCode || '').toUpperCase()}</td>
						<td>${(share.customerName || '').toUpperCase()}</td>
						<td>${amt}</td>
						<td>${share.noOfShare || '0'}</td>
						<td>${share.certificateNo || '-'}</td>
					`);

					tbody.append($tr);
				});

				// Enforce single selection
				$('.share-row-chk').on('change', function() {
					if ($(this).is(':checked')) {
						$('.share-row-chk').not(this).prop('checked', false);
					}
				});

				// Auto-select the first record by default for user ease
				if ($('.share-row-chk').length > 0) {
					$('.share-row-chk').first().prop('checked', true);
				}
			} else {
				tbody.html('<tr><td colspan="7" class="text-center">NO SHARE DATA FOUND FOR THE SELECTED CUSTOMER</td></tr>');
			}
		},
		error: function(xhr) {
			console.error("FETCH ERROR:", xhr);
			alert("ERROR FETCHING SHARE DATA!");
		}
	});
}

// Print Certificate Window Helper
function printCertificateWindow() {
	var certContent = $("#cetificateId").html();

	var printWin = window.open("", "_blank", "width=850,height=700");
	if (!printWin) {
		alert("PLEASE ALLOW POPUPS TO PRINT THE CERTIFICATE!");
		return;
	}

	printWin.document.open();
	printWin.document.write(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>SHARE CERTIFICATE - MICROFINANCE</title>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
			<style>
				body {
					font-family: 'Times New Roman', Times, serif;
					padding: 20px;
					background: #fff;
				}
				.card {
					border: 2px solid #856404 !important;
				}
				@media print {
					body {
						padding: 0;
					}
				}
			</style>
		</head>
		<body>
			<div class="container my-3">
				${certContent}
			</div>
			<script>
				window.onload = function() {
					window.print();
				};
			</script>
		</body>
		</html>
	`);
	printWin.document.close();
}