$(document).ready(function() {
	BranchNameDropdown();
	GroupNameDropdown();

	// Form submit
	$("#formid").submit(function(e) {
		e.preventDefault();
		if (validateLedgerForm()) {
			saveLedger();
		}
	});

	// Clear form
	$("#clearBtn").click(function() {
		$("#formid")[0].reset();
		clearErrorMessages();
		$("#accountId").val("");
		$("#currentBalance").val("0.00");
	});
	/*// Auto set Dr/Cr when group changes
	$("#groupName").change(function() {
		const group = $(this).val();
		let drcr = "";

		if (group === "ASSETS" || group === "EXPENSES") {
			drcr = "DR";
		} else if (group === "LIABILITIES" || group === "EQUITY" || group === "INCOME") {
			drcr = "CR";
		}
		$("#openingBalanceType").val(drcr); // ✅ just set value
		const $accountType = $("#accountType");
		$accountType.empty().append('<option value="">SELECT TYPE</option>');

		if (group && allowedCombinations[group]) {
			allowedCombinations[group].forEach(type => {
				$accountType.append('<option value="' + type + '">' + type.replaceAll("_", " ") + '</option>');
			});
		}

	});*/
});

function showTableData() {
	const tableBody = $("#tableBody");
	const toggleBtn = $("#toggleBtn");

	if (tableBody.children().length === 0) {
		// No data loaded yet — load and show
		loadLedgerData(); // Will populate #tableBody
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

// ✅ Validation
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
	const ledgerData = {
		accountId: $('#accountId').val() || null,
		accountCode: $('#accountCode').val().trim(),
		accountTitle: $('#accountTitle').val().trim(),
		groupName: $('#groupName').val(),
		accountType: $('#accountType').val(),
		openingBalance: parseFloat($('#openingBalance').val()) || 0.00,
		openingBalanceType: $('#openingBalanceType').val(),   // <-- NEW
		currentBalance: $('#accountId').val()
			? parseFloat($('#currentBalance').val()) || 0.00   // update case
			: parseFloat($('#openingBalance').val()) || 0.00,  // new ledger case
		status: $('#status').val(),
		branchName: $('#branchName').val()
	};

	$.ajax({
		type: "POST",
		url: "accountManagement/create",
		contentType: "application/json",
		data: JSON.stringify(ledgerData),
		success: function(response, status, xhr) {
			if (xhr.status === 201) {
				alert((response.message || "").toUpperCase());
				$("#formid")[0].reset();
				$("#accountId").val("");
				loadLedgerData();
			} else {
				alert("UNEXPECTED RESPONSE: " + (response.message || "").toUpperCase());
			}
		},
		error: function(xhr) {
			const err = xhr.responseJSON;
			const message = err && err.message ? err.message.toUpperCase() : "ERROR SAVING LEDGER ACCOUNT";
			alert(message);
		}
	});
}

// Load data table
// ============================================================
// LOAD LEDGER DATA
// ============================================================

function loadLedgerData() {

	$.ajax({

		type: "GET",
		url: "accountManagement/all",
		contentType: "application/json",

		success: function(response) {

			const ledgers = response.data;
			const tbody = $("#tableBody");

			tbody.empty();

			if (Array.isArray(ledgers) && ledgers.length > 0) {

				// ====================================================
				// SORT ACCOUNT CODE IN ASCENDING ORDER
				// ====================================================

				ledgers.sort(function(a, b) {

					const codeA = parseInt(a.accountCode, 10) || 0;
					const codeB = parseInt(b.accountCode, 10) || 0;

					return codeA - codeB;
				});


				// ====================================================
				// DISPLAY LEDGER DATA
				// ====================================================

				$.each(ledgers, function(index, ledger) {

					const serialNumber = index + 1;

					const row = `
                        <tr>

                            <!-- Serial Number -->
                            <td>
                                ${serialNumber}
                            </td>

                            <!-- Account Code -->
                            <td>
                                ${ledger.accountCode || ''}
                            </td>

                            <!-- Account Title -->
                            <td>
                                ${ledger.accountTitle
							? ledger.accountTitle.toUpperCase()
							: ''}
                            </td>

                            <!-- Account Group -->
                            <td>
                                ${ledger.groupName
							? ledger.groupName.toUpperCase()
							: ''}
                            </td>

                            <!-- Account Type -->
                            <td>
                                ${ledger.accountType
							? ledger.accountType.toUpperCase()
							: ''}
                            </td>

                            <!-- Opening Balance -->
                            <td>
                                ${ledger.openingBalance != null
							? Number(ledger.openingBalance).toFixed(2)
							: ''}
                            </td>

                            <!-- Opening Balance Type -->
                            <td>
                                ${ledger.openingBalanceType
							? ledger.openingBalanceType.toUpperCase()
							: ''}
                            </td>

                            <!-- Current Balance -->
                            <td>
                                ${ledger.currentBalance != null
							? Number(ledger.currentBalance).toFixed(2)
							: ''}
                            </td>

                            <!-- Status -->
                            <td>
                                ${ledger.status
							? ledger.status.toUpperCase()
							: ''}
                            </td>

                            <!-- Branch Name -->
                            <td>
                                ${ledger.branchName
							? ledger.branchName.toUpperCase()
							: ''}
                            </td>

                            <!-- View -->
                            <td>
                                <button
                                    class="iconbutton"
                                    onclick="viewLedger(${ledger.accountId})"
                                    title="VIEW">

                                    <i class="fa-solid fa-eye text-primary"></i>

                                </button>
                            </td>

                            <!-- Delete -->
                            <td>
                                <button
                                    class="iconbutton"
                                    onclick="deleteLedger(${ledger.accountId})"
                                    title="DELETE">

                                    <i class="fa-solid fa-trash text-danger"></i>

                                </button>
                            </td>

                        </tr>
                    `;

					tbody.append(row);

				});

			} else {

				tbody.append(`
                    <tr>
                        <td colspan="12" class="text-center">
                            NO LEDGERS FOUND.
                        </td>
                    </tr>
                `);

			}

		},

		error: function(xhr) {

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
            `);

		}

	});
}



// ============================================================
// LEDGER FILTER
// ============================================================
// Filters through:
// 1. Account Code
// 2. Account Title
// 3. Account Group
// 4. Account Type
// ============================================================

$("#ledgerSearch").on("keyup input", function() {

	const searchValue = $(this).val().toLowerCase().trim();

	$("#tableBody tr").each(function() {

		// --------------------------------------------
		// Get required column values from current row
		// --------------------------------------------

		const accountCode = $(this)
			.find("td:eq(1)")
			.text()
			.toLowerCase()
			.trim();

		const accountTitle = $(this)
			.find("td:eq(2)")
			.text()
			.toLowerCase()
			.trim();

		const accountGroup = $(this)
			.find("td:eq(3)")
			.text()
			.toLowerCase()
			.trim();

		const accountType = $(this)
			.find("td:eq(4)")
			.text()
			.toLowerCase()
			.trim();


		// --------------------------------------------
		// Search in 4 fields
		// --------------------------------------------

		const matched =
			accountCode.includes(searchValue) ||
			accountTitle.includes(searchValue) ||
			accountGroup.includes(searchValue) ||
			accountType.includes(searchValue);


		// --------------------------------------------
		// Show / Hide Row
		// --------------------------------------------

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
		success: function(response) {
			const ledger = response.data;
			$('#accountId').val(ledger.accountId);
			$('#accountCode').val(ledger.accountCode);
			$('#accountTitle').val(ledger.accountTitle);

			// Set group and trigger change to populate accountType dropdown
			$('#groupName').val(ledger.groupName).trigger('change');

			// Delay setting accountType until after dropdown is populated
			setTimeout(() => {
				$('#accountType').val(ledger.accountType);
			}, 100);
			$('#openingBalance').val(ledger.openingBalance);
			$('#openingBalanceType').val(ledger.openingBalanceType);
			$('#currentBalance').val(ledger.currentBalance);
			$('#status').val(ledger.status);
			$('#branchName').val(ledger.branchName);
		},
		error: function(xhr) {
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
		success: function(response) {
			let options = "<option value=''>--SELECT BRANCH NAME--</option>";
			if (response && Array.isArray(response.data)) {
				response.data.forEach(branch => {
					options += `<option value='${branch.branchName}'>${branch.branchName.toUpperCase()}</option>`;
				});
			}
			$("#branchName").html(options);
		},
		error: function() {
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
		success: function(response) {
			const groupNames = response.data;
			let options = "<option value=''>--SELECT GROUP NAME--</option>";
			groupNames.forEach(group => {
				options += `<option value='${group}'>${group.toUpperCase()}</option>`;
			});
			$("#groupName").html(options);
		},
		error: function() {
			alert("FAILED TO LOAD GROUP NAMES.");
		}
	});
}

/*const allowedCombinations = {
	"ASSETS": ["CASH", "BANK", "LOAN_TO_MEMBERS", "GOLD_LOANS", "JOINT_LOANS", "RECEIVABLE"],
	"LIABILITIES": ["SHARE CAPITAL", "CASH IN HAND", "FUNDS AND RESERVE", "DEPOSITS", "BANKS PAYABLE", "INTEREST PAYABLE", "OTHER PAYABLE", "PROFIT AND LOSS", "BANK ACCOUNT", "BANK INVESTMENT", "BANK SHARES", "LOANS", "FIXED ASSETS", "DEAD STOCK", "INTEREST RECEIVE", "OTHER RECEIVABLES", "BANK INTEREST", "OTHER INCOMES", ],
	"INCOME": ["SERVICE_FEES", "INTEREST", "DIVIDEND", "MEMBER_CONTRIBUTION", "POLICY_FEES"],
	"EQUITY": ["SHARE", "CAPITAL"],
	"EXPENSES": ["SALARY", "RENT", "OFFICE", "UTILITIES", "CONSULTANT_INCENTIVES", "COMMISSIONS", "POLICY_ADMIN"]
};*/

function deleteLedger(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS LEDGER?")) {
		$.ajax({
			url: "accountManagement/deleteLedgerById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status == "OK") {
					alert((response.message || "").toUpperCase());
					location.reload();
				} else {
					alert("DELETE FAILED: " + (response.message || "").toUpperCase());
				}
			},
			error: function(xhr, status, error) {
				alert("FAILED TO DELETE BRANCH.");
				console.error("ERROR:", error);
			}
		});
	}

}