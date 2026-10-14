$(document).ready(function() {

	// ================= SAVE =================
	$("#saveBtn").on("click", function(e) {
		e.preventDefault();

		if (!validateForm()) return;

		const formData = getFormData();
		console.log("SAVE DATA =", formData);

		$.ajax({
			type: "POST",
			url: "api/customersavings/savescheme",
			contentType: "application/json",
			data: JSON.stringify(formData),
			success: function() {
				alert("DATA SAVED SUCCESSFULLY!");
				fetchAllData();
			},
			error: function(xhr) {
				console.error(xhr.responseText);
				alert("SAVE FAILED");
			}
		});
	});


	// ================= UPDATE =================
	$("#updateBtn").on("click", function(e) {
		e.preventDefault();

		const id = $("#savingAccountId").val();
		console.log("UPDATE ID =", id);

		if (!id) {
			alert("PLEASE SELECT A RECORD TO UPDATE!");
			return;
		}

		if (!validateForm()) return;

		const formData = getFormData();

		$.ajax({
			type: "PUT",
			url: "api/customersavings/update/" + id,
			contentType: "application/json",
			data: JSON.stringify(formData),

			success: function() {
				alert("RECORD UPDATED SUCCESSFULLY!");
				$("#savingAccountId").val("");
				fetchAllData();
			},

			error: function(xhr) {
				console.error(xhr.responseText);
				alert("UPDATE FAILED!");
			}
		});
	});


	// ================= FETCH ALL =================
	function fetchAllData() {
		$.ajax({
			type: "GET",
			url: "api/customersavings/fetchalllll",
			dataType: "json",
			success: function(response) {
				const tableBody = $(".datatable tbody");
				tableBody.empty();

				console.log("API RESPONSE:", response);

				let dataList = [];

				if (response.status === "FOUND") {
					dataList = Array.isArray(response.data) ? response.data : [response.data];
				}

				if (dataList.length > 0) {
					let rows = "";

					$.each(dataList, function(index, item) {
						rows += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.policyName ? item.policyName.toUpperCase() : ""}</td>
                            <td>${item.customerName ? item.customerName.toUpperCase() : ""}</td>
                            <td>${item.initialDeposite ?? ""}</td>
                            <td>${item.monthlyMinimumBalance ?? ""}</td>
                            <td>${item.dailyLimit ?? ""}</td>
                            <td>${item.monthlyCardLimit ?? ""}</td>
                            <td>${item.yearlyCardLimit ?? ""}</td>
                            <td>
                                <button class="iconbutton" onclick="viewData(${item.id})">
                                    <i class="fa-solid fa-pen-to-square text-primary"></i>
                                </button>
                            </td>
                            <td>
                                <button class="iconbutton" onclick="deleteData(${item.id})">
                                    <i class="fa-solid fa-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>`;
					});

					tableBody.html(rows);
				} else {
					tableBody.html(`
                    <tr>
                        <td colspan="10" class="text-center">NO DATA FOUND</td>
                    </tr>
                `);
				}
			},

			error: function(xhr) {
				console.error("ERROR:", xhr.responseText);
			}
		});
	}

	// INITIAL LOAD
	fetchAllData();
});


// ================= FORM DATA (ENTITY MATCHING) =================
function getFormData() {
	return {
		policyName: $("#policyName").val(),
		yearlyROI: $("#yearlyROI").val(),
		customerName: $("#customerName").val(),

		initialDeposite: $("#initialDeposit").val(),
		monthlyMinimumBalance: $("#minimumOpeningBalance").val(),

		reservedFunds: $("#reservedFunds").val(),
		messagingFees: $("#messagingFees").val(),
		messagingInterval: $("#messagingInterval").val(),

		monthlyFreeIFSCTransactions: $("#monthlyFreeIFSC").val(),
		FreeMoneyTransfers: $("#freeMoneyTransfers").val(),

		limitperTransaction: $("#limitPerTransaction").val(),
		dailyLimit: $("#dailyLimit").val(),
		weeklyLimit: $("#weeklyLimit").val(),
		monthlyLimit: $("#monthlyLimit").val(),

		serviceFee: $("#serviceFee").val(),
		billingCycle: $("#billingCycle").val(),
		cardFee: $("#cardFee").val(),
		monthlyCardLimit: $("#monthlyCardLimit").val(),
		yearlyCardLimit: $("#yearlyCardLimit").val()
	};
}

$(document).ready(function() {

	/* ===== ERROR TEXT CSS ===== */
	$("<style>")
		.prop("type", "text/css")
		.html(`
           .error-text{
               color:red;
               font-size:12px;
               margin-top:4px;
               display:block;
           }
       `)
		.appendTo("head");


	/* ===== AUTO ERROR SPANS ===== */
	$("#savingForm input, #savingForm select").each(function() {
		let id = $(this).attr("id");
		if (id && $("#" + id + "Error").length === 0) {
			$(this).after(`<span class="error-text" id="${id}Error"></span>`);
		}
	});


	/* ===== VALIDATION ===== */
	window.validateForm = function() {

		let isValid = true;
		$(".error-text").text("");

		function error(id, msg) {
			$("#" + id + "Error").text(msg.toUpperCase());
			if (isValid) $("#" + id).focus();
			isValid = false;
		}

		/* ===== TEXT ===== */
		if ($("#policyName").val().trim() === "") {
			error("policyName", "POLICY NAME IS REQUIRED");
		}

		if ($("#customerName").val().trim() === "") {
			error("customerName", "CUSTOMER NAME IS REQUIRED");
		}

		/* ===== REQUIRED NUMBERS ===== */
		if ($("#yearlyROI").val() === "" || Number($("#yearlyROI").val()) <= 0) {
			error("yearlyROI", "ENTER VALID YEARLY ROI");
		}

		if ($("#initialDeposit").val() === "" || Number($("#initialDeposit").val()) <= 0) {
			error("initialDeposit", "INITIAL DEPOSIT MUST BE GREATER THAN 0");
		}

		if ($("#minimumOpeningBalance").val() === "" ||
			Number($("#minimumOpeningBalance").val()) <= 0) {
			error("minimumOpeningBalance", "MINIMUM OPENING BALANCE REQUIRED");
		}

		if ($("#dailyLimit").val() === "" || Number($("#dailyLimit").val()) <= 0) {
			error("dailyLimit", "DAILY LIMIT REQUIRED");
		}

		if ($("#weeklyLimit").val() === "" || Number($("#weeklyLimit").val()) <= 0) {
			error("weeklyLimit", "WEEKLY LIMIT REQUIRED");
		}

		if ($("#monthlyLimit").val() === "" || Number($("#monthlyLimit").val()) <= 0) {
			error("monthlyLimit", "MONTHLY LIMIT REQUIRED");
		}

		if ($("#monthlyCardLimit").val() === "" || Number($("#monthlyCardLimit").val()) <= 0) {
			error("monthlyCardLimit", "MONTHLY CARD LIMIT REQUIRED");
		}

		if ($("#yearlyCardLimit").val() === "" || Number($("#yearlyCardLimit").val()) <= 0) {
			error("yearlyCardLimit", "YEARLY CARD LIMIT REQUIRED");
		}

		/* ===== OPTIONAL NUMBERS ===== */
		if ($("#reservedFunds").val() !== "" &&
			Number($("#reservedFunds").val()) < 0) {
			error("reservedFunds", "INVALID RESERVED FUNDS");
		}

		if ($("#monthlyFreeIFSC").val() !== "" &&
			Number($("#monthlyFreeIFSC").val()) < 0) {
			error("monthlyFreeIFSC", "INVALID IFSC TRANSACTIONS");
		}

		if ($("#freeMoneyTransfers").val() !== "" &&
			Number($("#freeMoneyTransfers").val()) < 0) {
			error("freeMoneyTransfers", "INVALID FREE TRANSFERS");
		}

		if ($("#limitPerTransaction").val() !== "" &&
			Number($("#limitPerTransaction").val()) <= 0) {
			error("limitPerTransaction", "INVALID PER TRANSACTION LIMIT");
		}

		if ($("#serviceFee").val() !== "" &&
			Number($("#serviceFee").val()) < 0) {
			error("serviceFee", "INVALID SERVICE FEE");
		}

		if ($("#cardFee").val() !== "" &&
			Number($("#cardFee").val()) < 0) {
			error("cardFee", "INVALID CARD FEE");
		}

		/* ===== SELECT ===== */
		if ($("#messagingFees").val() === "") {
			error("messagingFees", "SELECT MESSAGING FEES");
		}

		if ($("#messagingFees").val() === "YES" &&
			$("#messagingInterval").val() === "") {
			error("messagingInterval", "SELECT MESSAGING INTERVAL");
		}

		if ($("#billingCycle").val() === "") {
			error("billingCycle", "SELECT BILLING CYCLE");
		}

		/* ===== LOGICAL CHECK ===== */
		if (
			Number($("#monthlyCardLimit").val()) >
			Number($("#yearlyCardLimit").val())
		) {
			error("monthlyCardLimit", "MONTHLY CARD LIMIT CANNOT EXCEED YEARLY LIMIT");
		}

		return isValid;
	};


	/* ===== CLEAR ERROR ON INPUT ===== */
	$("#savingForm").on("input change", "input, select", function() {
		$("#" + this.id + "Error").text("");
	});

});


// ================= VIEW / EDIT =================
function viewData(id) {
	console.log("EDIT ID =", id);

	$.ajax({
		type: "GET",
		url: "api/customersavings/getSavingSchemeCatalogById",
		data: { id: id },

		success: function(response) {
			if (response.status === "FOUND") {
				const d = response.data;

				$("#savingAccountId").val(d.id);

				$("#policyName").val(d.policyName);
				$("#yearlyROI").val(d.yearlyROI);
				$("#customerName").val(d.customerName);

				$("#initialDeposit").val(d.initialDeposite);
				$("#minimumOpeningBalance").val(d.monthlyMinimumBalance);

				$("#reservedFunds").val(d.reservedFunds);
				$("#messagingFees").val(d.messagingFees);
				$("#messagingInterval").val(d.messagingInterval);

				$("#monthlyFreeIFSC").val(d.monthlyFreeIFSCTransactions);
				$("#freeMoneyTransfers").val(d.freeMoneyTransfers);

				$("#limitPerTransaction").val(d.limitperTransaction);
				$("#dailyLimit").val(d.dailyLimit);
				$("#weeklyLimit").val(d.weeklyLimit);
				$("#monthlyLimit").val(d.monthlyLimit);

				$("#serviceFee").val(d.serviceFee);
				$("#billingCycle").val(d.billingCycle);
				$("#cardFee").val(d.cardFee);
				$("#monthlyCardLimit").val(d.monthlyCardLimit);
				$("#yearlyCardLimit").val(d.yearlyCardLimit);
			} else {
				alert("RECORD NOT FOUND");
			}
		},

		error: function() {
			alert("FAILED TO LOAD RECORD");
		}
	});
}


// ================= DELETE =================
function deleteData(id) {
	if (!confirm("ARE YOU SURE YOU WANT TO DELETE THIS SCHEME?")) return;

	$.ajax({
		type: "POST",
		url: "api/customersavings/deleteSavingSchemeCatalogDataById?id=" + id,

		success: function(response) {
			if (response.data === "success") {
				alert("DELETED SUCCESSFULLY!");
				location.reload();
			} else {
				alert("DELETE FAILED");
			}
		},

		error: function() {
			alert("DELETE ERROR");
		}
	});
}