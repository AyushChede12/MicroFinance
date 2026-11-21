$(document).ready(function () {
	BranchNameDropdown();
	GroupNameDropdown();

	// Form submit
	$("#formid").submit(function (e) {
		e.preventDefault();
		if (validateLedgerForm()) {
			saveLedger();
		}
	});

	// Clear form
	$("#clearBtn").click(function () {
		$("#formid")[0].reset();
		clearErrorMessages();
		$("#accountId").val("");
		$("#currentBalance").val("0.00");
		$("#openingBalanceType").val("DR");
		$("#saveBtn").text("SAVE");
	});

	// Auto set Dr/Cr when group changes
	$("#groupName").change(function () {
		const group = ($(this).val() || "").trim().toUpperCase();
		let drcr = "";

		if (group === "ASSETS" || group === "EXPENSES") {
			drcr = "DR";
		} else if (group === "LIABILITIES" || group === "EQUITY" || group === "INCOME") {
			drcr = "CR";
		}
		if (drcr) {
			$("#openingBalanceType").val(drcr);
		}
	});
});

function showTableData() {
	const tableBody = $("#tableBody");
	const toggleBtn = $("#toggleBtn");

	if (tableBody.children().length === 0) {
		// No data loaded yet — load and show
		loadLedgerData();
		toggleBtn.html('HIDE');
	} else {
		// Data exists — toggle visibility
		if (tableBody.is(":visible")) {
			tableBody.hide();
			toggleBtn.html('SHOW');
		} else {
			tableBody.show();
			toggleBtn.html('HIDE');
		}
	}
}

// Validation
function validateLedgerForm() {
	let isValid = true;

	const accountCode = $('#accountCode').val().trim();
	const accountTitle = $('#accountTitle').val().trim();
	const groupName = $('#groupName').val();
	const accountType = $('#accountType').val();
	const status = $('#status').val();
	const branchName = $('#branchName').val().trim();

	clearErrorMessages();

	if (accountCode === "") {
		$('#accountCodeError').text("* THIS FIELD IS REQUIRED");
		isValid = false;
	} else if (!/^[1-5]\d{2}$/.test(accountCode)) {
		$('#accountCodeError').text("* ACCOUNT CODE MUST BE A 3-DIGIT CODE STARTING WITH 1..5 (E.G. 101, 201)");
		isValid = false;
	}

	if (accountTitle === "") {
		$('#accountTitleError').text("* THIS FIELD IS REQUIRED");
		isValid = false;
	}
	if (groupName === "") {
		$('#groupNameError').text("* THIS FIELD IS REQUIRED");
		isValid = false;
	}
	if (accountType === "") {
		$('#accountTypeError').text("* THIS FIELD IS REQUIRED");
		isValid = false;
	}
	if (status === "") {
		$('#statusError').text("* THIS FIELD IS REQUIRED");
		isValid = false;
	}
	if (branchName === "") {
		$('#branchNameError').text("* THIS FIELD IS REQUIRED");
		isValid = false;
	}

	return isValid;
}

function clearErrorMessages() {
	$('#accountCodeError').text("");
	$('#accountTitleError').text("");
	$('#groupNameError').text("");
	$('#accountTypeError').text("");
	$('#statusError').text("");
	$('#branchNameError').text("");
}

// Save Ledger
function saveLedger() {
	const saveBtn = $("#saveBtn");
	saveBtn.prop("disabled", true);

	const ledgerData = {
		accountId: $('#accountId').val() ? parseInt($('#accountId').val(), 10) : null,
		accountCode: $('#accountCode').val().trim(),
		accountTitle: $('#accountTitle').val().trim().toUpperCase(),
		groupName: $('#groupName').val(),
		accountType: $('#accountType').val(),
		openingBalance: parseFloat($('#openingBalance').val()) || 0.00,
		openingBalanceType: $('#openingBalanceType').val(),
		currentBalance: $('#accountId').val()
			? parseFloat($('#currentBalance').val()) || 0.00
			: parseFloat($('#openingBalance').val()) || 0.00,
		status: $('#status').val(),
		branchName: $('#branchName').val()
	};

	$.ajax({
		type: "POST",
		url: "accountManagement/create",
		contentType: "application/json",
		data: JSON.stringify(ledgerData),
		success: function (response, status, xhr) {
			if (xhr.status === 200 || xhr.status === 201 || (response && (response.status === "CREATED" || response.status === "OK"))) {
				alert((response.message || "LEDGER ACCOUNT SAVED SUCCESSFULLY").toUpperCase());
				$("#formid")[0].reset();
				clearErrorMessages();
				$("#accountId").val("");
				$("#currentBalance").val("0.00");
				$("#saveBtn").text("SAVE");
				loadLedgerData();
			} else {
				alert("UNEXPECTED RESPONSE: " + (response.message || "").toUpperCase());
			}
		},
		error: function (xhr) {
			const err = xhr.responseJSON;
			const message = err && err.message ? err.message.toUpperCase() : "ERROR SAVING LEDGER ACCOUNT.";
			alert(message);
		},
		complete: function () {
			saveBtn.prop("disabled", false);
		}
	});
}

// ============================================================
// LOAD LEDGER DATA
// ============================================================
function loadLedgerData() {
	$.ajax({
		type: "GET",
		url: "accountManagement/all",
		contentType: "application/json",
		success: function (response) {
			const ledgers = response && response.data ? response.data : [];
			const tbody = $("#tableBody");

			tbody.empty();
			tbody.show();

			if (Array.isArray(ledgers) && ledgers.length > 0) {
				// Sort account code in ascending order
				ledgers.sort(function (a, b) {
					const codeA = parseInt(a.accountCode, 10) || 0;
					const codeB = parseInt(b.accountCode, 10) || 0;
					return codeA - codeB;
				});

				$.each(ledgers, function (index, ledger) {
					const serialNumber = index + 1;
					const row = `
                        <tr>
                            <!-- Serial Number -->
                            <td>${serialNumber}</td>

                            <!-- Account Code -->
                            <td>${ledger.accountCode || ''}</td>

                            <!-- Account Title -->
                            <td>${ledger.accountTitle ? ledger.accountTitle.toUpperCase() : ''}</td>

                            <!-- Account Group -->
                            <td>${ledger.groupName ? ledger.groupName.toUpperCase() : ''}</td>

                            <!-- Account Type -->
                            <td>${ledger.accountType ? ledger.accountType.toUpperCase() : ''}</td>

                            <!-- Opening Balance -->
                            <td>${ledger.openingBalance != null ? Number(ledger.openingBalance).toFixed(2) : '0.00'}</td>

                            <!-- Opening Balance Type -->
                            <td>${ledger.openingBalanceType ? ledger.openingBalanceType.toUpperCase() : ''}</td>

                            <!-- Current Balance -->
                            <td>${ledger.currentBalance != null ? Number(ledger.currentBalance).toFixed(2) : '0.00'}</td>

                            <!-- Status -->
                            <td>${ledger.status ? ledger.status.toUpperCase() : ''}</td>

                            <!-- Branch Name -->
                            <td>${ledger.branchName ? ledger.branchName.toUpperCase() : ''}</td>

                            <!-- View -->
                            <td>
                                <button class="iconbutton" onclick="viewLedger(${ledger.accountId})" title="VIEW">
                                    <i class="fa-solid fa-eye text-primary"></i>
                                </button>
                            </td>

                            <!-- Delete -->
                            <td>
                                <button class="iconbutton" onclick="deleteLedger(${ledger.accountId})" title="DELETE">
                                    <i class="fa-solid fa-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>
                    `;
					tbody.append(row);
				});
				$("#toggleBtn").html('HIDE');
			} else {
				tbody.append(`
                    <tr>
                        <td colspan="12" class="text-center">
                            NO LEDGERS FOUND.
                        </td>
                    </tr>
                `);
				$("#toggleBtn").html('HIDE');
			}
		},
		error: function (xhr) {
			const err = xhr.responseJSON;
			const message = err && err.message
				? err.message.toUpperCase()
				: "FAILED TO LOAD LEDGER ACCOUNT LIST.";

			alert(message);

			$("#tableBody").html(`
                <tr>
                    <td colspan="12" class="text-center">
                        ${message}
                    </td>
                </tr>
            `).show();
			$("#toggleBtn").html('HIDE');
		}
	});
}

// ============================================================
// LEDGER FILTER
// ============================================================
$("#ledgerSearch").on("keyup input", function () {
	const searchValue = $(this).val().toLowerCase().trim();

	$("#tableBody tr").each(function () {
		const accountCode = $(this).find("td:eq(1)").text().toLowerCase().trim();
		const accountTitle = $(this).find("td:eq(2)").text().toLowerCase().trim();
		const accountGroup = $(this).find("td:eq(3)").text().toLowerCase().trim();
		const accountType = $(this).find("td:eq(4)").text().toLowerCase().trim();

		const matched =
			accountCode.includes(searchValue) ||
			accountTitle.includes(searchValue) ||
			accountGroup.includes(searchValue) ||
			accountType.includes(searchValue);

		if (matched) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
});

// View ledger by ID
function viewLedger(id) {
	$.ajax({
		type: "GET",
		url: `accountManagement/${id}`,
		success: function (response) {
			const ledger = response && response.data ? response.data : null;
			if (!ledger) return;

			$('#accountId').val(ledger.accountId);
			$('#accountCode').val(ledger.accountCode);
			$('#accountTitle').val(ledger.accountTitle);
			$('#groupName').val(ledger.groupName);
			$('#accountType').val(ledger.accountType);
			$('#openingBalance').val(ledger.openingBalance != null ? Number(ledger.openingBalance).toFixed(2) : '0.00');
			$('#openingBalanceType').val(ledger.openingBalanceType);
			$('#currentBalance').val(ledger.currentBalance != null ? Number(ledger.currentBalance).toFixed(2) : '0.00');
			$('#status').val(ledger.status);
			$('#branchName').val(ledger.branchName);
			$('#saveBtn').text("UPDATE");

			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		error: function (xhr) {
			const err = xhr.responseJSON;
			const message = err && err.message ? err.message.toUpperCase() : "ERROR FETCHING LEDGER ACCOUNT.";
			alert(message);
		}
	});
}

// Branch Dropdown
function BranchNameDropdown() {
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/preference/getAllBranchModule',
		success: function (response) {
			let options = "<option value=''>--SELECT BRANCH NAME--</option>";
			if (response && Array.isArray(response.data)) {
				response.data.forEach(branch => {
					if (branch && branch.branchName) {
						options += `<option value='${branch.branchName}'>${branch.branchName.toUpperCase()}</option>`;
					}
				});
			}
			$("#branchName").html(options);
		},
		error: function () {
			alert("FAILED TO LOAD BRANCH NAMES.");
		}
	});
}

// Group Dropdown
function GroupNameDropdown() {
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'accountManagement/groupNames',
		success: function (response) {
			const groupNames = response && response.data ? response.data : [];
			let options = "<option value=''>--SELECT GROUP NAME--</option>";
			if (Array.isArray(groupNames)) {
				groupNames.forEach(group => {
					if (group) {
						options += `<option value='${group}'>${group.toUpperCase()}</option>`;
					}
				});
			}
			$("#groupName").html(options);
		},
		error: function () {
			alert("FAILED TO LOAD GROUP NAMES.");
		}
	});
}

// Delete Ledger
function deleteLedger(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS LEDGER ACCOUNT?")) {
		$.ajax({
			url: "accountManagement/deleteLedgerById",
			type: "POST",
			data: { id: id },
			success: function (response) {
				if (response && (response.status === "OK" || response.status === "200")) {
					alert((response.message || "LEDGER ACCOUNT DELETED SUCCESSFULLY").toUpperCase());
					loadLedgerData();
				} else {
					alert("DELETE FAILED: " + ((response && response.message) || "").toUpperCase());
				}
			},
			error: function (xhr, status, error) {
				const err = xhr.responseJSON;
				const message = err && err.message ? err.message.toUpperCase() : "FAILED TO DELETE LEDGER ACCOUNT.";
				alert(message);
				console.error("ERROR:", error);
			}
		});
	}
}

// Bind all functions explicitly to window for global access
window.showTableData = showTableData;
window.validateLedgerForm = validateLedgerForm;
window.clearErrorMessages = clearErrorMessages;
window.saveLedger = saveLedger;
window.loadLedgerData = loadLedgerData;
window.viewLedger = viewLedger;
window.BranchNameDropdown = BranchNameDropdown;
window.GroupNameDropdown = GroupNameDropdown;
window.deleteLedger = deleteLedger;
