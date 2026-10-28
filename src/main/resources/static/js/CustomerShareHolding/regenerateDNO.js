// Customer ShareHolding - Regenerate DNO (Distinctive Numbers)

$(document).ready(function() {
	loadCustomerDropdown();
	loadAllDnoRecords();

	// Search button click
	$("#searchBtn").click(function() {
		let selectedCode = $("#selectDecisionMaker").val();

		if (!selectedCode) {
			loadAllDnoRecords();
			return;
		}

		$.ajax({
			url: "api/customershareholdingcontroller/fetchByFindByCode",
			type: "POST",
			data: { findByCode: selectedCode },
			success: function(response) {
				let tbody = $("#dnoTableBody");
				tbody.empty();

				if (response.status === "FOUND" && Array.isArray(response.data) && response.data.length > 0) {
					renderDnoRows(response.data);
				} else {
					tbody.append('<tr><td colspan="8" class="text-center">NO SHARE DATA FOUND FOR SELECTED CUSTOMER</td></tr>');
				}
			},
			error: function() {
				alert("ERROR FETCHING DNO DATA!");
			}
		});
	});

	// Reset button click
	$("#resetSearchBtn").click(function() {
		$("#selectDecisionMaker").val("");
		loadAllDnoRecords();
	});

	// Print button click
	$("#printbtn").click(function() {
		printDnoRegister();
	});
});

// Load distinct customers for dropdown
function loadCustomerDropdown() {
	$.ajax({
		url: "api/customershareholdingcontroller/findAllTransferShare",
		type: "GET",
		success: function(response) {
			if (response.status === "OK" && Array.isArray(response.data)) {
				let dropdown = $("#selectDecisionMaker");
				dropdown.empty().append('<option value="">-- ALL CUSTOMERS / DECISION MAKERS --</option>');

				let seenCodes = new Set();
				$.each(response.data, function(i, item) {
					if (item.findByCode && !seenCodes.has(item.findByCode)) {
						seenCodes.add(item.findByCode);
						let name = (item.customerName || "").toUpperCase();
						dropdown.append(`<option value="${item.findByCode}">${item.findByCode} - ${name}</option>`);
					}
				});
			}
		},
		error: function() {
			console.error("ERROR LOADING CUSTOMERS FOR DNO");
		}
	});
}

// Load all share records into the DNO table
function loadAllDnoRecords() {
	$.ajax({
		url: "api/customershareholdingcontroller/findAllTransferShare",
		type: "GET",
		success: function(response) {
			let tbody = $("#dnoTableBody");
			tbody.empty();

			if (response.status === "OK" && Array.isArray(response.data) && response.data.length > 0) {
				renderDnoRows(response.data);
			} else {
				tbody.append('<tr><td colspan="8" class="text-center">NO SHARE RECORDS AVAILABLE</td></tr>');
			}
		},
		error: function() {
			let tbody = $("#dnoTableBody");
			tbody.html('<tr><td colspan="8" class="text-center">ERROR LOADING DNO RECORDS</td></tr>');
		}
	});
}

// Helper to pad distinctive numbers
function padZero(num, size) {
	var s = String(num);
	while (s.length < (size || 6)) { s = "0" + s; }
	return s;
}

// Render table rows with consecutive distinctive numbers (DNO)
function renderDnoRows(records) {
	let tbody = $("#dnoTableBody");
	tbody.empty();

	let runningDno = 1;

	records.forEach(function(item, index) {
		let shareCount = parseInt(item.noOfShare || 0, 10);
		if (shareCount <= 0) shareCount = 1;

		let startDno = runningDno;
		let endDno = runningDno + shareCount - 1;
		runningDno = endDno + 1;

		let dnoRange = "DNO: " + padZero(startDno, 6) + " - " + padZero(endDno, 6);

		let shareAmount = item.amountTransferred;
		if (!shareAmount || shareAmount === "0") {
			let base = parseFloat(item.baseValue || 10);
			shareAmount = shareCount * base;
		}

		let row = `
			<tr>
				<td>${index + 1}</td>
				<td>${(item.findByCode || "-").toUpperCase()}</td>
				<td>${(item.customerName || "-").toUpperCase()}</td>
				<td>${(item.dateOfTransfer || item.startDate || "-").toUpperCase()}</td>
				<td>${shareCount}</td>
				<td>${shareAmount}</td>
				<td><span class="badge bg-light text-dark border">${dnoRange}</span></td>
				<td>${(item.certificateNo || "-").toUpperCase()}</td>
			</tr>
		`;
		tbody.append(row);
	});
}

// Print DNO Register
function printDnoRegister() {
	var tableContent = $("#dnoPrintArea").html();

	var printWin = window.open("", "_blank", "width=900,height=700");
	if (!printWin) {
		alert("PLEASE ALLOW POPUPS TO PRINT THE DNO REGISTER!");
		return;
	}

	printWin.document.open();
	printWin.document.write(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>DNO REGISTER - MICROFINANCE</title>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
			<style>
				body {
					font-family: Arial, sans-serif;
					padding: 25px;
					background: #fff;
				}
				h3, h5 {
					text-align: center;
				}
				table {
					width: 100%;
					border-collapse: collapse;
					margin-top: 15px;
				}
				th, td {
					border: 1px solid #333 !important;
					padding: 6px 8px;
					text-align: left;
					font-size: 12px;
				}
				th {
					background-color: #f2f2f2 !important;
				}
				.badge {
					font-size: 11px;
					border: none !important;
				}
				@media print {
					body { padding: 0; }
				}
			</style>
		</head>
		<body>
			<div class="container my-2">
				<h3>MICROFINANCE PVT. LTD.</h3>
				<h5>REGISTER OF DISTINCTIVE NUMBERS (DNO) OF SHARES</h5>
				<hr>
				${tableContent}
				<div class="mt-5 d-flex justify-content-between">
					<div>
						<p>DATE: ${new Date().toLocaleDateString()}</p>
					</div>
					<div class="text-center" style="min-width: 200px;">
						<br><br>
						<p style="border-top: 1px solid #333;">AUTHORIZED SIGNATORY</p>
					</div>
				</div>
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
