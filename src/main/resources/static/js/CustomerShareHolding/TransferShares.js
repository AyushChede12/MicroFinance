// Customer ShareHolding - Transfer Shares
// Bank Standard Implementation

var approvedCustomerList = [];
var transferShareHistory = [];

$(document).ready(function() {
	// Initialize UI state
	$("#fCustomer").hide();
	$("#availShare").hide();
	$("#updateBtn").hide();
	$("#cancelBtn").hide();
	$("#saveBtn").show();

	// Default transfer date to today
	var today = new Date().toISOString().split('T')[0];
	if (!$("#dateOfTransfer").val()) {
		$("#dateOfTransfer").val(today);
	}
	if (!$("#baseValue").val()) {
		$("#baseValue").val("10");
	}

	// Load Initial Data
	loadApprovedCustomers();
	loadBranches();
	TransferShareTable();

	// Input listeners for auto calculations
	$("#noOfShare, #baseValue").on("input", function() {
		calculateShareAmounts();
	});

	$("#toCustomerCode").on("change", function() {
		handleToCustomerChange();
	});

	$("#fromCustomerCode").on("change", function() {
		handleFromCustomerChange();
	});
});

// Transfer Type change handler (B2C vs C2C)
function transferTypeFunc() {
	var tType = $("#transferType").val();
	if (tType === "C2C") {
		$("#fCustomer").show();
		$("#availShare").show();
		$("#shareIssuedBy").val($("#fromCustomerCode").val() || "");
		handleFromCustomerChange();
	} else {
		$("#fCustomer").hide();
		$("#availShare").hide();
		$("#fromCustomerCode").val("");
		$("#availableShares").val("");
		$("#shareIssuedBy").val("BANK");
		calculateShareAmounts();
	}
}

// Load Approved Customers for From & To Dropdowns
function loadApprovedCustomers() {
	$.ajax({
		url: "api/customermanagement/approved",
		method: "GET",
		success: function(response) {
			if (response.status === "OK" && Array.isArray(response.data)) {
				approvedCustomerList = response.data;
				populateCustomerDropdowns();
			} else {
				console.warn("NO APPROVED CUSTOMERS RETURNED");
			}
		},
		error: function(err) {
			console.error("ERROR FETCHING CUSTOMERS:", err);
		}
	});
}

function populateCustomerDropdowns() {
	var fromSelect = $("#fromCustomerCode");
	var toSelect = $("#toCustomerCode");

	fromSelect.empty().append('<option value="">SELECT FROM CUSTOMER</option>');
	toSelect.empty().append('<option value="">SELECT TO CUSTOMER</option>');

	approvedCustomerList.forEach(function(item) {
		var nameParts = [item.firstName, item.middleName, item.lastName].filter(Boolean);
		var fullName = nameParts.length > 0 ? nameParts.join(" ") : (item.customerName || "");
		fullName = fullName.toUpperCase();

		var opt = `<option value="${item.memberCode}">${item.memberCode} - ${fullName}</option>`;
		fromSelect.append(opt);
		toSelect.append(opt);
	});
}

// Load Branches from Preference / Branch Module
function loadBranches() {
	$.ajax({
		url: "api/customershareholdingcontroller/findAllBranch",
		type: "GET",
		success: function(response) {
			var branchSelect = $('#branch');
			branchSelect.empty().append('<option value="">SELECT BRANCH</option>');

			if ((response.status === "FOUND" || response.status === "OK") && response.data) {
				$.each(response.data, function(index, b) {
					var branchText = (b.branchName || b.branchCode || "").toUpperCase();
					branchSelect.append('<option value="' + branchText + '">' + branchText + '</option>');
				});
			}
		},
		error: function(err) {
			console.error("ERROR FETCHING BRANCHES:", err);
		}
	});
}

// When TO CUSTOMER is selected
function handleToCustomerChange() {
	var selectedCode = $("#toCustomerCode").val();
	if (!selectedCode) {
		$("#customerName").val("");
		$("#startDate").val("");
		return;
	}

	var customer = approvedCustomerList.find(function(c) {
		return c.memberCode === selectedCode;
	});

	if (customer) {
		var nameParts = [customer.firstName, customer.middleName, customer.lastName].filter(Boolean);
		var fullName = nameParts.length > 0 ? nameParts.join(" ") : (customer.customerName || "");
		$("#customerName").val(fullName.toUpperCase());
		$("#startDate").val(customer.signupDate || new Date().toISOString().split('T')[0]);

		// If customer has branch, auto select
		if (customer.branchName && !$("#branch").val()) {
			$("#branch").val(customer.branchName.toUpperCase());
		}
	}
}

// When FROM CUSTOMER is selected (for C2C)
function handleFromCustomerChange() {
	var fromCode = $("#fromCustomerCode").val();
	$("#shareIssuedBy").val(fromCode || "");

	if (!fromCode) {
		$("#availableShares").val("0");
		calculateShareAmounts();
		return;
	}

	// Calculate customer's available shares from history
	var totalSharesHeld = 0;
	if (Array.isArray(transferShareHistory)) {
		transferShareHistory.forEach(function(ts) {
			var qty = parseInt(ts.noOfShare || 0, 10);
			if (ts.findByCode === fromCode) {
				totalSharesHeld += qty;
			}
			if (ts.shareIssuedBy === fromCode) {
				totalSharesHeld -= qty;
			}
		});
	}

	// Fallback check against approvedCustomerList initial shares
	if (totalSharesHeld <= 0) {
		var c = approvedCustomerList.find(function(item) {
			return item.memberCode === fromCode;
		});
		if (c && c.noOfShare) {
			totalSharesHeld = parseInt(c.noOfShare, 10) || 0;
		}
	}

	if (totalSharesHeld < 0) totalSharesHeld = 0;
	$("#availableShares").val(totalSharesHeld);
	calculateShareAmounts();
}

// Auto Calculate Amount Transferred and Balance Share
function calculateShareAmounts() {
	var noOfShare = parseInt($("#noOfShare").val() || 0, 10);
	var baseVal = parseFloat($("#baseValue").val() || 10);
	var amount = noOfShare * baseVal;
	$("#amountTransferred").val(isNaN(amount) ? "0" : amount);

	var tType = $("#transferType").val();
	if (tType === "C2C") {
		var avail = parseInt($("#availableShares").val() || 0, 10);
		var bal = avail - noOfShare;
		$("#balanceShares").val(bal >= 0 ? bal : "0");
	} else {
		$("#balanceShares").val(noOfShare);
	}
}

// Save Shares
function saveShares() {
	var tType = $("#transferType").val();
	if (!tType) {
		alert("PLEASE SELECT TRANSFER TYPE!");
		$("#transferType").focus();
		return;
	}

	var toCode = $("#toCustomerCode").val();
	if (!toCode) {
		alert("PLEASE SELECT TO CUSTOMER!");
		$("#toCustomerCode").focus();
		return;
	}

	var fromCode = $("#fromCustomerCode").val();
	if (tType === "C2C") {
		if (!fromCode) {
			alert("PLEASE SELECT FROM CUSTOMER!");
			$("#fromCustomerCode").focus();
			return;
		}
		if (fromCode === toCode) {
			alert("FROM CUSTOMER AND TO CUSTOMER CANNOT BE THE SAME!");
			return;
		}
		var avail = parseInt($("#availableShares").val() || 0, 10);
		var qty = parseInt($("#noOfShare").val() || 0, 10);
		if (qty > avail) {
			alert("TRANSFER SHARES (" + qty + ") CANNOT EXCEED AVAILABLE SHARES (" + avail + ")!");
			return;
		}
	}

	var branch = $("#branch").val();
	if (!branch) {
		alert("PLEASE SELECT BRANCH!");
		$("#branch").focus();
		return;
	}

	var noOfShare = $("#noOfShare").val();
	if (!noOfShare || parseInt(noOfShare, 10) <= 0) {
		alert("PLEASE ENTER VALID NUMBER OF SHARES!");
		$("#noOfShare").focus();
		return;
	}

	var paymentMode = $("#modeOfPayment").val();
	if (!paymentMode) {
		alert("PLEASE SELECT MODE OF PAYMENT!");
		$("#modeOfPayment").focus();
		return;
	}

	var dateOfTransfer = $("#dateOfTransfer").val();
	if (!dateOfTransfer) {
		alert("PLEASE SELECT DATE OF TRANSFER!");
		$("#dateOfTransfer").focus();
		return;
	}

	var certNo = $("#certificateNo").val();
	if (!certNo) {
		var yr = new Date().getFullYear();
		var rnd = Math.floor(1000 + Math.random() * 9000);
		certNo = "SCF/MICROFINANCE/" + yr + "/" + rnd;
		$("#certificateNo").val(certNo);
	}

	var payload = {
		findByCode: toCode,
		customerName: ($("#customerName").val() || "").toUpperCase(),
		startDate: $("#startDate").val() || dateOfTransfer,
		previousAccountBalance: $("#previousAccountBalance").val() || "0",
		previousShareCount: $("#previousShareCount").val() || "0",
		baseValue: $("#baseValue").val() || "10",
		branch: branch.toUpperCase(),
		dateOfTransfer: dateOfTransfer,
		shareIssuedBy: tType === "C2C" ? fromCode : "BANK",
		noOfShare: String(noOfShare),
		amountTransferred: String($("#amountTransferred").val() || "0"),
		balanceShares: String($("#balanceShares").val() || "0"),
		modeOfPayment: paymentMode.toUpperCase(),
		comments: ($("#comments").val() || "").toUpperCase(),
		certificateNo: certNo,
		approved: true
	};

	console.log("SAVING TRANSFER SHARE:", payload);

	$.ajax({
		url: "api/customershareholdingcontroller/saveTransferShare",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function(response) {
			alert((response.message || "TRANSFER SHARE SAVED SUCCESSFULLY").toUpperCase());
			resetTransferForm();
			TransferShareTable();
		},
		error: function(xhr) {
			console.error("SAVE ERROR:", xhr.responseText);
			alert("FAILED TO SAVE TRANSFER SHARE! SERVER ERROR.");
		}
	});
}

// Fetch and Render Table
function TransferShareTable() {
	$.ajax({
		url: "api/customershareholdingcontroller/allDataFetchTransferShareInTable",
		type: "GET",
		dataType: "json",
		success: function(response) {
			let rows = "";
			if ((response.status === "OK" || response.status === "FOUND") && Array.isArray(response.data) && response.data.length > 0) {
				transferShareHistory = response.data;
				response.data.forEach(function(share, idx) {
					rows += `
						<tr>
							<td>${idx + 1}</td>
							<td>${(share.findByCode || "").toUpperCase()}</td>
							<td>${(share.customerName || "").toUpperCase()}</td>
							<td>${(share.branch || "").toUpperCase()}</td>
							<td>${share.noOfShare || "0"}</td>
							<td>${share.amountTransferred || "0"}</td>
							<td>${share.dateOfTransfer || "-"}</td>
							<td>
								<button class="iconbutton" onclick="EditTransfershare(${share.id})" title="EDIT">
									<i class="fa-solid fa-pen-to-square text-primary"></i>
								</button>
							</td>
							<td>
								<button class="iconbutton" onclick="deleteTransfershare(${share.id})" title="DELETE">
									<i class="fa-solid fa-trash text-danger"></i>
								</button>
							</td>
						</tr>
					`;
				});
			} else {
				transferShareHistory = [];
				rows = '<tr><td colspan="9" class="text-center">NO DATA FOUND</td></tr>';
			}
			$("#transfersharetable").html(rows);
		},
		error: function(xhr) {
			console.error("AJAX ERROR:", xhr);
			$("#transfersharetable").html('<tr><td colspan="9" class="text-center">ERROR LOADING DATA</td></tr>');
		}
	});
}

// Edit Transfer Share
function EditTransfershare(id) {
	$.ajax({
		url: "api/customershareholdingcontroller/getTransferShareIdEdite",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if (response.status === "OK" && response.data) {
				var share = response.data;
				$("#id").val(share.id);
				$("#certificateNo").val(share.certificateNo || "");

				var issuedBy = (share.shareIssuedBy || "").toUpperCase();
				if (issuedBy && issuedBy !== "BANK" && !issuedBy.startsWith("SCF")) {
					$("#transferType").val("C2C");
					transferTypeFunc();
					$("#fromCustomerCode").val(share.shareIssuedBy);
				} else {
					$("#transferType").val("B2C");
					transferTypeFunc();
				}

				$("#toCustomerCode").val(share.findByCode);
				$("#customerName").val((share.customerName || "").toUpperCase());
				$("#startDate").val(share.startDate || "");
				$("#branch").val((share.branch || "").toUpperCase());
				$("#noOfShare").val(share.noOfShare || "");
				$("#baseValue").val(share.baseValue || "10");
				$("#amountTransferred").val(share.amountTransferred || "");
				$("#balanceShares").val(share.balanceShares || "");
				$("#modeOfPayment").val((share.modeOfPayment || "CASH").toUpperCase());
				$("#dateOfTransfer").val(share.dateOfTransfer || "");
				$("#comments").val((share.comments || "").toUpperCase());

				$("#saveBtn").hide();
				$("#updateBtn").show();
				$("#cancelBtn").show();

				// Smooth scroll to top of form
				$('html, body').animate({ scrollTop: $("#formid").offset().top - 80 }, 300);
			} else {
				alert("TRANSFER SHARE RECORD NOT FOUND!");
			}
		},
		error: function(xhr) {
			alert("ERROR FETCHING TRANSFER SHARE: " + xhr.responseText);
		}
	});
}

// Update Shares
function updateShares() {
	var idVal = $("#id").val();
	if (!idVal) {
		alert("NO RECORD SELECTED FOR UPDATE!");
		return;
	}

	var toCode = $("#toCustomerCode").val();
	if (!toCode) {
		alert("PLEASE SELECT TO CUSTOMER!");
		return;
	}

	var payload = {
		id: parseInt(idVal, 10),
		findByCode: toCode,
		customerName: ($("#customerName").val() || "").toUpperCase(),
		startDate: $("#startDate").val() || $("#dateOfTransfer").val(),
		previousAccountBalance: $("#previousAccountBalance").val() || "0",
		previousShareCount: $("#previousShareCount").val() || "0",
		baseValue: $("#baseValue").val() || "10",
		branch: ($("#branch").val() || "").toUpperCase(),
		dateOfTransfer: $("#dateOfTransfer").val(),
		shareIssuedBy: $("#transferType").val() === "C2C" ? $("#fromCustomerCode").val() : "BANK",
		noOfShare: String($("#noOfShare").val()),
		amountTransferred: String($("#amountTransferred").val() || "0"),
		balanceShares: String($("#balanceShares").val() || "0"),
		modeOfPayment: ($("#modeOfPayment").val() || "CASH").toUpperCase(),
		comments: ($("#comments").val() || "").toUpperCase(),
		certificateNo: $("#certificateNo").val(),
		approved: true
	};

	console.log("UPDATING TRANSFER SHARE:", payload);

	$.ajax({
		url: "api/customershareholdingcontroller/updateTransferShare",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function(response) {
			alert("TRANSFER SHARE UPDATED SUCCESSFULLY!");
			resetTransferForm();
			TransferShareTable();
		},
		error: function(xhr) {
			console.error("UPDATE ERROR:", xhr);
			alert("ERROR UPDATING TRANSFER SHARE!");
		}
	});
}

// Delete Transfer Share
function deleteTransfershare(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS TRANSFER SHARE RECORD?")) {
		$.ajax({
			url: "api/customershareholdingcontroller/deleteTransferShareById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status === "OK") {
					alert("TRANSFER SHARE DELETED SUCCESSFULLY!");
					TransferShareTable();
				} else {
					alert("DELETE FAILED: " + response.message);
				}
			},
			error: function(xhr) {
				alert("ERROR DELETING SHARE: " + xhr.responseText);
			}
		});
	}
}

// Reset Form to Clean Initial State
function resetTransferForm() {
	$("#formid")[0].reset();
	$("#id").val("");
	$("#customerName").val("");
	$("#startDate").val("");
	$("#previousAccountBalance").val("0");
	$("#previousShareCount").val("0");
	$("#shareIssuedBy").val("BANK");
	$("#baseValue").val("10");

	var today = new Date().toISOString().split('T')[0];
	$("#dateOfTransfer").val(today);

	$("#transferType").val("");
	$("#fCustomer").hide();
	$("#availShare").hide();
	$("#availableShares").val("");

	$("#saveBtn").show();
	$("#updateBtn").hide();
	$("#cancelBtn").hide();
}