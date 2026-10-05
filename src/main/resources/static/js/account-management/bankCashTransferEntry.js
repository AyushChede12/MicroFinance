$(document).ready(function() {
	$()
	BranchNameDropdown();

	toggleTransferFields($('#transferMode').val());

	$('#transferMode').on('change', function() {
		toggleTransferFields(this.value);
	});

	// Event Handlers
	$("#formid").submit(function(e) {
		e.preventDefault();
		saveBankCashTransfer();
	});


	$("#searchBtn").click(function(e) {
		e.preventDefault();
		searchBankCashTransfers();
	});

	$("#entryBranchName").on("change", function() {
		const selectedBranch = $(this).val();
		BankCashLedgerDropdown(selectedBranch);
	});
});
function showTableData() {
	const tableBody = $("#tableBody");
	const toggleBtn = $("#toggleBtn");

	if (tableBody.children().length === 0) {
		// No data loaded yet — load and show
		loadBankCashTransferData();
		toggleBtn.html('Hide');
	} else {
		// Data exists — toggle visibility
		if (tableBody.is(":visible")) {
			tableBody.hide();
			toggleBtn.html('Show');
		} else {
			tableBody.show();
			toggleBtn.html('Hide');
		}
	}
}



function toggleTransferFields(mode) {
	const m = (mode || '').toLowerCase().trim();

	// Hide all conditional groups by default
	$('.chequeFields').addClass('d-none');
	$('.onlineFields').addClass('d-none');

	// Clear conditional inputs when switching modes to avoid stale values
	$('#chequeNo').val('');
	$('#chequeDate').val('');
	$('#bankName').val('');
	$('#transactionRef').val('');

	if (m === 'cheque') {
		$('.chequeFields').removeClass('d-none');
	} else if (m === 'online transfer') {
		// If only "Online Transfer" should display this, change to: (m === 'online transfer')
		$('.onlineFields').removeClass('d-none');
	}
}
// 🔹 Save Entry
function saveBankCashTransfer() {
	const bankData = {
		branchName: $("#entryBranchName").val().trim(),
		dateOfEntry: $("#dateOfEntry").val(),
		creditLedger: $("#creditLedger").val(),
		debitLedger: $("#debitLedger").val(),
		transferMode: $('#transferMode').val(),
		chequeNo: $('#chequeNo').val(),
		chequeDate: $('#chequeDate').val(),
		bankName: $('#bankName').val(),
		transactionRef: $('#transactionRef').val(),
		transactionAmount: $("#transactionAmount").val(),
		remarks: $("#remarks").val()
	};

	// Client-side validation
	if (!bankData.branchName || !bankData.dateOfEntry || !bankData.transferMode ||
		!bankData.creditLedger || !bankData.debitLedger || !bankData.transactionAmount) {
		alert("Please fill in all required fields.");
		return;
	}

	// Conditional validation
	if (bankData.transferMode.toLowerCase() === "cheque") {
		if (!bankData.chequeNo || !bankData.chequeDate || !bankData.bankName) {
			alert("Cheque No, Date and Bank Name are required for Cheque payments.");
			return;
		}
	}
	if (bankData.transferMode.toLowerCase() === "online transfer") {
		if (!bankData.transactionRef) {
			alert("Transaction Ref is required for Online Transfer.");
			return;
		}
	}


	$.ajax({
		type: "POST",
		url: "accountManagement/createBankCashTransfer",
		contentType: "application/json",
		data: JSON.stringify(bankData),
		success: function(response) {
			if (response?.status === "CREATED") {
				alert(response.message || "Entry saved successfully.");
				$("#formid")[0].reset();
				$('.chequeFields').addClass('d-none');
				$('.onlineFields').addClass('d-none');
				loadBankCashTransferData();
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
loadBankCashTransferData();
// 🔹 Load All Entries
function loadBankCashTransferData() {
	$.ajax({
		type: "GET",
		url: "accountManagement/allBankCashTransfer",
		contentType: "application/json",
		success: function(response) {
			const list = response.data || [];
			const tbody = $("#tableBody").empty();
			if (list.length === 0) {
				tbody.append("<tr><td colspan='8'>No Bank Cash Transfer Entries found.</td></tr>");
				return;
			}

			list.forEach(entry => {
				const row = `
								<tr> 
									<td>${entry.id ?? ''}</td>
									<td>${(entry.branchName).toUpperCase() ?? ''}</td>
									<td>${entry.voucherID ?? ''}</td>
									<td>${entry.dateOfEntry ?? ''}</td>
									<td>${(entry.creditLedger).toUpperCase() ?? ''}</td>
									<td>${(entry.debitLedger).toUpperCase() ?? ''}</td>
									<td>${(entry.transferMode).toUpperCase() ?? ''}</td>
									<td>${(entry.transactionAmount).toUpperCase() ?? ''}</td>
									<td>${(entry.remarks).toUpperCase() ?? ''}</td>
									<td>
										<button class="iconbutton" onclick="viewBankCashTransfer(${entry.id})" title="View">
											<i class="fa-solid fa-eye text-primary"></i>
										</button>
									</td>
									<td>
										<button class="iconbutton" onclick="deleteBankCashTransfer(${entry.id})" title="Delete">
											<i class="fa-solid fa-trash text-danger"></i>
										</button>
									</td>
								</tr>
							`;
				tbody.append(row);
			});
		},
		error: function() {
			alert("Failed to load Bank Cash Transfer Entry.");
		}
	});
}

// 🔹 View Entry
function viewBankCashTransfer(id) {
	$.ajax({
		type: "GET",
		url: `accountManagement/bankCashTransfer/${id}`,
		contentType: "application/json",
		success: function(response) {
			const data = response.data;
			// Branch preselect
			$("#entryBranchName option").each(function() {
				if ($(this).val()?.trim().toLowerCase() === data.branchName?.trim().toLowerCase()) {
					$(this).prop("selected", true);
					return false;
				}
			});

			$("#voucherID").val(data.voucherID);
			$("#transferMode").val(data.transferMode);
			$("#dateOfEntry").val(data.dateOfEntry);
			$("#transactionAmount").val(data.transactionAmount);
			$("#remarks").val(data.remarks);

			toggleTransferFields(data.transferMode);

			$("#chequeNo").val(data.chequeNo ?? "");
			$("#chequeDate").val(data.chequeDate ?? "");
			$("#bankName").val(data.bankName ?? "");
			$("#transactionRef").val(data.transactionRef ?? "");

			BankCashLedgerDropdown(data.branchName, data.creditLedger, data.debitLedger);

		},
		error: function() {
			alert("Failed to load incoming receipt data");
		}
	});
}

// 🔹 Search Entries
function searchBankCashTransfers() {
	const branchName = $('#searchBranchName').val();
	const startDate = $('#startDate').val();
	const endDate = $('#endDate').val();

	if (!branchName || !startDate || !endDate) {
		alert("Please fill in all search fields.");
		return;
	}

	$.ajax({
		type: "GET",
		url: "accountManagement/searchBankCashTransfer",
		data: { branchName, startDate, endDate },
		contentType: "application/json",
		success: function(response) {
			const list = response.data || [];
			const tbody = $("#tableBody").empty();

			if (list.length === 0) {
				tbody.append("<tr><td colspan='8'>No matching results found.</td></tr>");
				return;
			}

			$.each(list, function(index, entry) {
				const row = `
				                    <tr>
									<td>${entry.id || ''}</td>
									<td>${(entry.branchName).toUpperCase() || ''}</td>
									<td>${entry.voucherID || ''}</td>
									<td>${(entry.dateOfEntry).toUpperCase() || ''}</td>
									<td>${(entry.creditLedger).toUpperCase() || ''}</td>
									<td>${(entry.debitLedger).toUpperCase() || ''}</td>
									<td>${(entry.transferMode).toUpperCase() || ''}</td>
									<td>${(entry.transactionAmount).toUpperCase() || ''}</td>
									<td>${(entry.remarks).toUpperCase() || ''}</td>
									<td>
										<button class="iconbutton" onclick="viewBankCashTransfer(${entry.id})" title="View">
											<i class="fa-solid fa-eye text-primary"></i>
										</button>
									</td>
									<td>
										<button class="iconbutton" onclick="deleteBankCashTransfer(${entry.id})" title="Delete">
											<i class="fa-solid fa-trash text-danger"></i>
										</button>
									</td>
				                    </tr>
				                `;
				tbody.append(row);
			});
		},
		error: function() {
			alert("Search failed");
		}
	});
}

// Load Branch Dropdown
function BranchNameDropdown() {
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/preference/getAllBranchModule',
		success: function(response) {
			let options = "<option value=''>--SELECT BRANCH NAME--</option>";
			// The actual branch array is inside response.data
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
// Load ONLY Cash/Bank ledgers under Assets for both Debit & Credit
function BankCashLedgerDropdown(branchName, selectedCr = "", selectedDr = "") {
	if (!branchName || branchName.trim() === "") {
		console.warn("Branch name is missing. Skipping ledger dropdown load.");
		return;
	}

	$.ajax({
		type: "GET",
		url: `accountManagement/ledgerByBranch/${branchName}`,
		contentType: "application/json",
		success: function(data) {
			if (data.status == "OK") {
			const ledgers = data.data || [];

			let crOptions = "<option value=''>--SELECT CREDIT LEDGER--</option>";
			let drOptions = "<option value=''>--SELECT DEBIT LEDGER--</option>";

			ledgers.forEach(ledger => {
				const g = (ledger.groupName || "").toLowerCase();
				const t = (ledger.accountType || "").toLowerCase();
				const title = ledger.accountTitle;

				// ✅ Only Assets → Cash/Bank
				if (g === "assets" && (t === "cash in hand" || t === "bank account")) {
					const isSelectedDr = title.trim().toLowerCase() === (selectedDr || "").trim().toLowerCase() ? "selected" : "";
					drOptions += `<option value="${title}" ${isSelectedDr}>${title.toUpperCase()}</option>`;
					const isSelectedCr = title.trim().toLowerCase() === (selectedCr || "").trim().toLowerCase() ? "selected" : "";
					crOptions += `<option value="${title}" ${isSelectedCr}>${title.toUpperCase()}</option>`;
				}
			});

			$("#debitLedger").html(drOptions);
			$("#creditLedger").html(crOptions);
			}else{
				alert("Data Not Found");
			}
		},
		error: function() {
			alert("Failed to load Cash/Bank ledgers for selected branch");
		}
	});
}

function deleteBankCashTransfer(id) {
	if (confirm("Are you sure you want to delete this Data?")) {
		$.ajax({
			url: "accountManagement/deleteBankCashTransferById",
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

