$(document).ready(function() {
	BranchNameDropdown();

	// Form submission
	$("#formid").submit(function(e) {
		e.preventDefault();
		saveManualJournal();
	});

	// Search button
	$('#searchBtn').click(function(e) {
		e.preventDefault();
		searchManualJournal();
	});

	// Branch change triggers ledger dropdown
	$("#entryBranchName").on("change", function() {
		const selectedBranch = $(this).val();
		LedgerDropdown(selectedBranch);
	});
});

// Show/hide table data
function showTableData() {
	const tableBody = $("#tableBody");
	const toggleBtn = $("#toggleBtn");

	if (tableBody.children().length === 0) {
		loadManualJournalData(); // Will populate #tableBody
		toggleBtn.html('Hide');
	} else {
		if (tableBody.is(":visible")) {
			tableBody.hide();
			toggleBtn.html('Show');
		} else {
			tableBody.show();
			toggleBtn.html('Hide');
		}
	}
}

// Save Manual Journal Entry
function saveManualJournal() {
	const data = {
		branchName: $("#entryBranchName").val().trim(),
		dateOfEntry: $("#dateOfEntry").val(),
		creditLedger: $("#creditLedger").val(),
		debitLedger: $("#debitLedger").val(),
		transactionAmount: $("#transactionAmount").val(),
		remarks: $("#remarks").val()
	};

	if (!data.branchName || !data.dateOfEntry || !data.creditLedger || !data.debitLedger || !data.transactionAmount) {
		alert("Please fill all required fields.");
		return;
	}

	$.ajax({
		type: "POST",
		url: "accountManagement/createManualJournal",
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response) {
			if (response?.status === "CREATED" || response.status == 201) {
				alert(response.message || "Entry saved successfully.");
				$("#formid")[0].reset();
				$("#creditLedger, #debitLedger").html("<option value=''>Select Ledger</option>");
				if (response.data?.voucherID) {
					$("#voucherID").val(response.data.voucherID);
				}
				loadManualJournalData();
			} else {
				alert(response.message || "Unexpected response.");
			}
		},
		error: function(xhr) {
			let msg = "Error saving entry.";
			try {
				const res = JSON.parse(xhr.responseText);
				if (res?.message) msg = res.message;
			} catch (e) { }
			alert(msg);
		}
	});
}

// Load all Manual Journal Entries
function loadManualJournalData() {
	$.ajax({
		type: "GET",
		url: "accountManagement/allManualJournal",
		contentType: "application/json",
		success: function(response) {
			const list = response.data || [];
			const tbody = $("#tableBody").empty();

			if (list.length === 0) {
				tbody.append("<tr><td colspan='8'>No Manual Journal Entries found.</td></tr>");
				return;
			}

			list.forEach(entry => {
				tbody.append(`
          <tr>
            <td>${entry.id || ''}</td>
            <td>${entry.branchName.toUpperCase() || ''}</td>
            <td>${entry.voucherID ?? ''}</td>
            <td>${entry.dateOfEntry || ''}</td>
            <td>${entry.creditLedger.toUpperCase() || ''}</td>
            <td>${entry.debitLedger || ''}</td>
            <td>${entry.transactionAmount || ''}</td>
            <td>${entry.remarks || ''}</td>
            <td>
              <button class="iconbutton" onclick="viewManualJournal(${entry.id})" title="View">
                <i class="fa-solid fa-eye text-primary"></i>
              </button>
            </td>
			<td>
				<button class="iconbutton" onclick="deleteManualJournalEntry(${entry.id})" title="Delete">
					<i class="fa-solid fa-trash text-danger"></i>
				</button>
			</td>
          </tr>
        `);
			});
		},
		error: function(xhr) {
			let msg = "Failed to load Manual Journal entries.";
			try {
				const res = JSON.parse(xhr.responseText);
				if (res?.message) msg = res.message;
			} catch (e) { }
			alert(msg);
		}
	});
}

// View a single Manual Journal Entry
function viewManualJournal(id) {
	$.ajax({
		type: "GET",
		url: `accountManagement/manualJournal/${id}`,
		contentType: "application/json",
		success: function(response) {
			const entry = response.data;
			if (!entry) return alert("No entry data found.");

			// Branch preselect
			$("#entryBranchName option").each(function() {
				if ($(this).val()?.trim().toLowerCase() === entry.branchName?.trim().toLowerCase()) {
					$(this).prop("selected", true);
					return false;
				}
			});

			$("#dateOfEntry").val(entry.dateOfEntry);
			$("#transactionAmount").val(entry.transactionAmount);
			$("#remarks").val(entry.remarks);
			$("#voucherID").val(entry.voucherID || '');

			// Reload ledgers and preselect
			LedgerDropdown(entry.branchName, entry.creditLedger, entry.debitLedger);
		},
		error: function(xhr) {
			let msg = "Error loading entry.";
			try {
				const res = JSON.parse(xhr.responseText);
				if (res?.message) msg = res.message;
			} catch (e) { }
			alert(msg);
		}
	});
}

// Search Manual Journal Entries
function searchManualJournal() {
	const branchName = $('#searchBranchName').val();
	const startDate = $('#startDate').val();
	const endDate = $('#endDate').val();

	if (!branchName || !startDate || !endDate) {
		alert("Please fill in all search fields.");
		return;
	}

	$.ajax({
		type: "GET",
		url: "accountManagement/searchManualJournal",
		data: { branchName, startDate, endDate },
		contentType: "application/json",
		success: function(response) {
			const list = response.data || [];
			const tbody = $("#tableBody").empty();

			if (list.length === 0) {
				tbody.append("<tr><td colspan='8'>No matching results found.</td></tr>");
				return;
			}

			list.forEach(entry => {
				tbody.append(`
          <tr>
            <td>${entry.id || ''}</td>
            <td>${entry.branchName.toUpperCase() || ''}</td>
            <td>${entry.voucherID ?? ''}</td>
            <td>${entry.dateOfEntry || ''}</td>
            <td>${entry.creditLedger.toUpperCase() || ''}</td>
            <td>${entry.debitLedger.toUpperCase() || ''}</td>
            <td>${entry.transactionAmount || ''}</td>
            <td>${entry.remarks.toUpperCase() || ''}</td>
            <td>
              <button class="iconbutton" onclick="viewManualJournal(${entry.id})" title="View">
                <i class="fa-solid fa-eye text-primary"></i>
              </button>
            </td>
			<td>
				<button class="iconbutton" onclick="deleteManualJournalEntry(${entry.id})" title="Delete">
					<i class="fa-solid fa-trash text-danger"></i>
				</button>
			</td>
          </tr>
        `);
			});
		},
		error: function(xhr) {
			let msg = "Search failed.";
			try {
				const res = JSON.parse(xhr.responseText);
				if (res?.message) msg = res.message;
			} catch (e) { }
			alert(msg);
		}
	});
}

// Branch Dropdown Loader
function BranchNameDropdown() {
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/preference/getAllBranchModule',
		success: function(response) {
			let options = "<option value=''>--SELECT BRANCH NAME--</option>";
			if (response && Array.isArray(response.data)) {
				response.data.forEach(branch => {
					options += `<option value='${branch.branchName}'>${branch.branchName.toUpperCase()}</option>`;
				});
			}
			$("#searchBranchName").html(options);
			$("#entryBranchName").html(options);
		},
		error: function() {
			alert("Failed to load branch names.");
		}
	});
}

// Load Credit & Debit Ledgers by branch (Manual Journal version)
function LedgerDropdown(branchName, selectedCr = "", selectedDr = "") {
	if (!branchName || branchName.trim() === "") {
		console.warn("Branch name is missing. Skipping ledger dropdown load.");
		return;
	}
	$.ajax({
		type: "GET",
		url: `accountManagement/eligibleLedgersForManualJournal/${branchName}`,
		contentType: "application/json",
		success: function(data) {
			const ledgers = data.data || [];

			// Options for Credit and Debit (all ledgers given for manual journal)
			let crOptions = "<option value=''>--SELECT CREDIT LEDGER--</option>";
			let drOptions = "<option value=''>--SELECT DEBIT LEDGER--</option>";

			ledgers.forEach(ledger => {
				const title = ledger.accountTitle;
				const crSelected = title.trim().toLowerCase() === (selectedCr || "").trim().toLowerCase() ? "selected" : "";
				const drSelected = title.trim().toLowerCase() === (selectedDr || "").trim().toLowerCase() ? "selected" : "";
				crOptions += `<option value="${title}" ${crSelected}>${title.toUpperCase()}</option>`;
				drOptions += `<option value="${title}" ${drSelected}>${title.toUpperCase()}</option>`;
			});

			$("#creditLedger").html(crOptions);
			$("#debitLedger").html(drOptions);
		},
		error: function() {
			alert("Failed to load ledger accounts for selected branch");
		}
	});
}

function deleteManualJournalEntry(id) {
	if (confirm("Are you sure you want to delete this Data?")) {
		$.ajax({
			url: "accountManagement/deleteManualJournalById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status == "OK") {
					alert(response.message);
					location.reload();
				} else {
					alert("Delete failed: " + response.message);
				}
			},
			error: function(xhr, status, error) {
				alert("Failed to delete data.");
				console.error("Error:", error);
			}
		});
	}

}
