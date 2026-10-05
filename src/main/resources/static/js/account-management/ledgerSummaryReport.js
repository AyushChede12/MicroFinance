$(document).ready(function() {
	loadBranchDropdown();

	// Handle form submit
	$("#ledgerSummaryForm").on("submit", function(e) {
		e.preventDefault();
		fetchLedgerSummary();
	});
});

// 🔹 Load Branch Dropdown
function loadBranchDropdown() {
	$.ajax({
		type: "GET",
		url: "api/preference/getAllBranchModule",
		contentType: "application/json",
		success: function(response) {
			let options = "<option value=''>--SELECT BRANCH NAME--</option>";
			if (response && Array.isArray(response.data)) {
				response.data.forEach(branch => {
					options += `<option value="${branch.branchName}">${branch.branchName.toUpperCase()}</option>`;
				});
			}
			$("#branchName").html(options);
		},
		error: function() {
			alert("Failed to load branch names.");
		}
	});
}

// 🔹 When Branch changes → Load Ledger Dropdown
$("#branchName").on("change", function() {
	const branchName = $(this).val();
	if (!branchName) return;
	loadLedgerDropdown(branchName);

});

// 🔹 Load Ledger Dropdown based on Branch
function loadLedgerDropdown(branchName) {
	$.ajax({
		type: "GET",
		url: `accountManagement/ledgerByBranch/${branchName}`,
		contentType: "application/json",
		success: function(response) {
			const ledgers = response?.data || [];
			let options = "<option value=''>--SELECT LEDGER--</option>";

			if (ledgers.length === 0) {
				$("#ledgerName").html(options);
				return;
			}

			ledgers.forEach(ledger => {
				options += `<option value="${ledger.accountTitle}">
								${ledger.accountTitle.toUpperCase()}
							</option>`;
			});

			$("#ledgerName").html(options);
		},
		error: function() {
			resetLedgerDropdown();
			alert("Failed to load ledger list.");
		}
	});
}

function resetLedgerDropdown() {
	let options = "<option value=''>--SELECT LEDGER--</option>";
	$("#ledgerName").html(options);
}

// 🔹 Fetch Ledger Summary
function fetchLedgerSummary() {
	const branch = $("#branchName").val();
	const ledger = $("#ledgerName").val();
	const startDate = $("#startDate").val();
	const endDate = $("#endDate").val();

	// ✅ Validation
	if (!branch || !ledger || !startDate || !endDate) {
		alert("Please fill all required fields.");
		return;
	}

	$.ajax({
		type: "GET",
		url: "accountManagement/ledger-summary",
		data: {
			branch: branch,
			ledger: ledger,
			startDate: startDate,
			endDate: endDate
		},
		success: function(response) {
			const data = response?.data || [];
			const tbody = $("#ledgerSummaryBody");
			tbody.empty();

			if (data.length === 0) {
				tbody.append(`<tr><td colspan="6" class="text-center">No records found</td></tr>`);
				$("#summaryInfo").html("");
				return;
			}

			// ✅ Initialize totals
			let totalDebit = 0;
			let totalCredit = 0;

			// ✅ Render Rows
			data.forEach(entry => {
				const debit = parseFloat(entry.debit || 0);
				const credit = parseFloat(entry.credit || 0);
				totalDebit += debit;
				totalCredit += credit;

				const row = `
                    <tr>
                        <td>${entry.dateOfEntry || ''}</td>
                        <td>${entry.voucherId.toUpperCase() || ''}</td>
                        <td>${(entry.remarks).toUpperCase() || ''}</td>
                        <td>${entry.accountCode || ''}</td>
                        <td class="text-right">${Number(debit).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td class="text-right">${Number(credit).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                `;
				tbody.append(row);
			});

			// ✅ Add Totals Row
			tbody.append(`
                <tr class="font-weight-bold table-warning">
                    <td colspan="4" class="text-right">Total:</td>
                    <td class="text-right">${totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td class="text-right">${totalCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
            `);

			// ✅ Display Opening & Closing Balances
			const first = data[0];
			if (first.openingBalance !== undefined && first.closingBalance !== undefined) {
				$("#summaryInfo").html(`
                    <div class="alert alert-info py-2">
                        <strong>BRANCH:</strong> ${branch.toUpperCase()} |
                        <strong>LEDGER:</strong> ${ledger.toUpperCase()} |
                        <strong>OPENING BALANCE:</strong> ${Number(first.openingBalance).toLocaleString('en-IN', { minimumFractionDigits: 2 })} |
                        <strong>CLOSING BALANCE:</strong> ${Number(first.closingBalance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                `);
			}
		},
		error: function(xhr) {
			alert("Failed to load ledger summary.");
			console.error(xhr.responseText);
		}
	});
}

