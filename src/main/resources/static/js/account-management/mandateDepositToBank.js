$(document).ready(function() {

	// LOAD INITIAL DATA
	loadBranchDropdown();
	loadBankDropdown();
	loadMandateDeposits();

	// AUTO-CALCULATION TRIGGERS
	$("#fixedDeposit, #recurringDeposit, #savingsAccountDeposit, #flexibleDeposit, #savingsPayout, #flexibleWithdrawal, #maturityCapital, #lastFDAmount").on("input", function() {
		calculateBalances();
	});

	// SEARCH BUTTON
	$("#serachBtn").click(function(e) {
		e.preventDefault();
		loadMandateDeposits();
	});

	// FORM SUBMISSION (SAVE)
	$("#formid").submit(function(e) {
		e.preventDefault();
		saveMandateDeposit();
	});

});

// LOAD BRANCH DROPDOWN / AUTOCOMPLETE
function loadBranchDropdown() {
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(response) {
			if (response && Array.isArray(response.data)) {
				let datalist = "<datalist id='branchList'>";
				response.data.forEach(function(branch) {
					datalist += `<option value="${branch.branchName.toUpperCase()}">`;
				});
				datalist += "</datalist>";
				$("#branchList").remove();
				$("body").append(datalist);
				$("#branchAddresslabel").attr("list", "branchList");
			}
		},
		error: function(xhr) {
			console.error("FAILED TO LOAD BRANCHES:", xhr);
		}
	});
}

// LOAD BANK DROPDOWN / AUTOCOMPLETE
function loadBankDropdown() {
	$.ajax({
		url: "accountManagement/all-bank-modules",
		type: "GET",
		success: function(response) {
			if (response && response.status === "OK" && Array.isArray(response.data)) {
				let datalist = "<datalist id='mandateBankList'>";
				response.data.forEach(function(bank) {
					let label = (bank.bankName || "") + " (" + (bank.accountNo || "") + ")";
					datalist += `<option value="${(bank.bankName || "").toUpperCase()}">${label.toUpperCase()}</option>`;
				});
				datalist += "</datalist>";
				$("#mandateBankList").remove();
				$("body").append(datalist);
				$("#BankName").attr("list", "mandateBankList");
			}
		},
		error: function(xhr) {
			console.error("FAILED TO LOAD BANKS:", xhr);
		}
	});
}

// CALCULATION
function calculateBalances() {
	let fd = parseFloat($("#fixedDeposit").val()) || 0;
	let rd = parseFloat($("#recurringDeposit").val()) || 0;
	let sd = parseFloat($("#savingsAccountDeposit").val()) || 0;
	let flexiDep = parseFloat($("#flexibleDeposit").val()) || 0;

	let sp = parseFloat($("#savingsPayout").val()) || 0;
	let flexiWith = parseFloat($("#flexibleWithdrawal").val()) || 0;
	let matCap = parseFloat($("#maturityCapital").val()) || 0;

	let totalDeposit = fd + rd + sd + flexiDep;
	let totalWithdrawal = sp + flexiWith + matCap;
	let netBalance = totalDeposit - totalWithdrawal;

	$("#aggregateDeposit").val(totalDeposit.toFixed(2));
	$("#aggregateWithdrawal").val(totalWithdrawal.toFixed(2));
	$("#netBalance").val(netBalance.toFixed(2));

	let unpledged = netBalance > 0 ? (netBalance * 0.10) : 0;
	$("#unpledgedFunds\\(10\\%\\)").val(unpledged.toFixed(2));

	let lastFd = parseFloat($("#lastFDAmount").val()) || 0;
	let available = unpledged - lastFd;
	$("#availableFunds").val(available > 0 ? available.toFixed(2) : "0.00");
}

// SAVE MANDATE DEPOSIT
function saveMandateDeposit() {
	let payload = {
		startDate: $("#startDate").val(),
		endDate: $("#endDate").val(),
		fixedDeposit: $("#fixedDeposit").val(),
		recurringDeposit: $("#recurringDeposit").val(),
		savingDeposit: $("#savingsAccountDeposit").val(),
		savingPayout: $("#savingsPayout").val(),
		flexibleDeposit: $("#flexibleDeposit").val(),
		flexibleWithdrawal: $("#flexibleWithdrawal").val(),
		maturityCapital: $("#maturityCapital").val(),
		aggregateDeposit: $("#aggregateDeposit").val(),
		aggregateWithdrawal: $("#aggregateWithdrawal").val(),
		netBalance: $("#netBalance").val(),
		lastFdAmount: $("#lastFDAmount").val(),
		unpledgedFunds: $("#unpledgedFunds\\(10\\%\\)").val(),
		availableFunds: $("#availableFunds").val(),
		bankName: ($("#BankName").val() || "").toUpperCase(),
		branchName: ($("#branchAddresslabel").val() || "").toUpperCase(),
		fdNumber: ($("#fDNumber").val() || "").toUpperCase(),
		fixedDepositAmount: $("#fixedDepositAmount").val(),
		amountOnMaturity: $("#amountOnMaturity").val(),
		fdInstallationDate: $("#fDInitiationDate").val(),
		maturityDueDate: $("#maturityDueDate").val(),
		modeOfPayment: ($("#modeOfPayment").val() || "").toUpperCase(),
		remarks: ($("#remarks").val() || "").toUpperCase()
	};

	if (!payload.bankName) {
		alert("PLEASE ENTER BANK NAME");
		return;
	}

	if (!payload.branchName) {
		alert("PLEASE ENTER BRANCH NAME");
		return;
	}

	if (!payload.fixedDepositAmount || parseFloat(payload.fixedDepositAmount) <= 0) {
		alert("PLEASE ENTER VALID FIXED DEPOSIT AMOUNT");
		return;
	}

	$.ajax({
		url: "accountManagement/saveMandateDeposit",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function(response) {
			if (response && (response.status === "OK" || response.status === 200)) {
				alert((response.message || "MANDATE DEPOSIT SAVED SUCCESSFULLY").toUpperCase());
				$("#formid")[0].reset();
				loadMandateDeposits();
			} else {
				alert((response.message || "FAILED TO SAVE MANDATE DEPOSIT").toUpperCase());
			}
		},
		error: function(xhr) {
			console.error("SAVE ERROR:", xhr);
			alert("ERROR SAVING MANDATE DEPOSIT");
		}
	});
}

// LOAD LIST
function loadMandateDeposits() {
	let startDate = $("#startDate").val();
	let endDate = $("#endDate").val();

	$.ajax({
		url: "accountManagement/listOfMandateDeposit",
		type: "GET",
		data: {
			startDate: startDate,
			endDate: endDate
		},
		success: function(response) {
			let tbody = $(".datatable tbody");
			tbody.empty();

			let list = (response && response.data) ? response.data : [];
			if (list.length === 0) {
				tbody.html('<tr><td colspan="23" class="text-center text-muted">NO RECORDS FOUND</td></tr>');
				return;
			}

			list.forEach(function(item) {
				tbody.append(`
					<tr>
						<td>₹${parseFloat(item.fixedDeposit || 0).toFixed(2)}</td>
						<td>₹0.00</td>
						<td>₹${parseFloat(item.recurringDeposit || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.savingDeposit || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.savingPayout || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.flexibleDeposit || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.flexibleWithdrawal || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.maturityCapital || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.aggregateDeposit || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.aggregateWithdrawal || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.netBalance || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.lastFdAmount || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.unpledgedFunds || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.availableFunds || 0).toFixed(2)}</td>
						<td>${(item.bankName || "-").toUpperCase()}</td>
						<td>${(item.branchName || "-").toUpperCase()}</td>
						<td>${(item.fdNumber || "-").toUpperCase()}</td>
						<td>₹${parseFloat(item.fixedDepositAmount || 0).toFixed(2)}</td>
						<td>₹${parseFloat(item.amountOnMaturity || 0).toFixed(2)}</td>
						<td>${item.fdInstallationDate || "-"}</td>
						<td>${item.maturityDueDate || "-"}</td>
						<td>${(item.modeOfPayment || "BANK").toUpperCase()}</td>
						<td>${(item.remarks || "-").toUpperCase()}</td>
					</tr>
				`);
			});
		},
		error: function(xhr) {
			console.error("FETCH ERROR:", xhr);
			$(".datatable tbody").html('<tr><td colspan="23" class="text-center text-muted">NO RECORDS FOUND</td></tr>');
		}
	});
}
