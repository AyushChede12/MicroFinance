// Customer ShareHolding - Unallotted / Shareholding Records

$(document).ready(function() {
	loadCustomerDropdown();
	loadAllShareRecords();

	// Search button click handler
	$("#searchBtn").click(function() {
		let selectedCode = $("#selectDecisionMaker").val();

		if (!selectedCode) {
			// If none selected, load all records
			loadAllShareRecords();
			return;
		}

		$.ajax({
			url: "api/customershareholdingcontroller/fetchByFindByCode",
			type: "POST",
			data: { findByCode: selectedCode },
			success: function(response) {
				let tbody = $("#unallotedShareTableBody");
				tbody.empty();

				if (response.status === "FOUND" && Array.isArray(response.data) && response.data.length > 0) {
					renderTableRows(response.data);
				} else {
					tbody.append('<tr><td colspan="7" class="text-center">NO SHARE DATA FOUND FOR SELECTED CUSTOMER</td></tr>');
				}
			},
			error: function() {
				alert("ERROR FETCHING SHARE DATA!");
			}
		});
	});

	// Reset button click handler
	$("#resetSearchBtn").click(function() {
		$("#selectDecisionMaker").val("");
		loadAllShareRecords();
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
			} else {
				console.warn("NO TRANSFER SHARE DATA FOR DROPDOWN");
			}
		},
		error: function() {
			console.error("ERROR LOADING DROPDOWN DATA");
		}
	});
}

// Load all share records into the table
function loadAllShareRecords() {
	$.ajax({
		url: "api/customershareholdingcontroller/findAllTransferShare",
		type: "GET",
		success: function(response) {
			let tbody = $("#unallotedShareTableBody");
			tbody.empty();

			if (response.status === "OK" && Array.isArray(response.data) && response.data.length > 0) {
				renderTableRows(response.data);
			} else {
				tbody.append('<tr><td colspan="7" class="text-center">NO SHARE DATA AVAILABLE</td></tr>');
			}
		},
		error: function() {
			let tbody = $("#unallotedShareTableBody");
			tbody.html('<tr><td colspan="7" class="text-center">ERROR LOADING SHARE RECORDS</td></tr>');
		}
	});
}

// Helper to render rows cleanly in uppercase
function renderTableRows(records) {
	let tbody = $("#unallotedShareTableBody");
	tbody.empty();

	records.forEach(function(item, index) {
		let shareAmount = item.amountTransferred;
		if (!shareAmount || shareAmount === "0") {
			let shares = parseInt(item.noOfShare || 0, 10);
			let base = parseFloat(item.baseValue || 10);
			shareAmount = shares * base;
		}

		let row = `
			<tr>
				<td>${index + 1}</td>
				<td>${(item.customerName || "-").toUpperCase()}</td>
				<td>${(item.findByCode || "-").toUpperCase()}</td>
				<td>${(item.startDate || "-").toUpperCase()}</td>
				<td>${(item.dateOfTransfer || "-").toUpperCase()}</td>
				<td>${item.noOfShare || "0"}</td>
				<td>${shareAmount || "0"}</td>
			</tr>
		`;
		tbody.append(row);
	});
}