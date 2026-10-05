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
				alert("Data saved successfully!");
				fetchAllData();
			},
			error: function(xhr) {
				console.error(xhr.responseText);
				alert("Save failed");
			}
		});
	});


	// ================= UPDATE =================
	$("#updateBtn").on("click", function(e) {
		e.preventDefault();

		const id = $("#savingAccountId").val();
		console.log("UPDATE ID =", id);

		if (!id) {
			alert("Please select a record to update!");
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
				alert("Record updated successfully!");
				$("#savingAccountId").val("");
				fetchAllData();
			},

			error: function(xhr) {
				console.error(xhr.responseText);
				alert("Update failed!");
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

				console.log("API Response:", response);

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
	                        <td colspan="10" class="text-center">No data found</td>
	                    </tr>
	                `);
				}
			},

			error: function(xhr) {
				console.error("Error:", xhr.responseText);
			}
		});
	}

	// initial load
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
			$("#" + id + "Error").text(msg);
			if (isValid) $("#" + id).focus();
			isValid = false;
		}

		/* ===== TEXT ===== */
		if ($("#policyName").val().trim() === "") {
			error("policyName", "Policy name is required");
		}

		if ($("#customerName").val().trim() === "") {
			error("customerName", "Customer name is required");
		}

		/* ===== REQUIRED NUMBERS ===== */
		if ($("#yearlyROI").val() === "" || Number($("#yearlyROI").val()) <= 0) {
			error("yearlyROI", "Enter valid yearly ROI");
		}

		if ($("#initialDeposit").val() === "" || Number($("#initialDeposit").val()) <= 0) {
			error("initialDeposit", "Initial deposit must be greater than 0");
		}

		if ($("#minimumOpeningBalance").val() === "" ||
			Number($("#minimumOpeningBalance").val()) <= 0) {
			error("minimumOpeningBalance", "Minimum opening balance required");
		}

		if ($("#dailyLimit").val() === "" || Number($("#dailyLimit").val()) <= 0) {
			error("dailyLimit", "Daily limit required");
		}

		if ($("#weeklyLimit").val() === "" || Number($("#weeklyLimit").val()) <= 0) {
			error("weeklyLimit", "Weekly limit required");
		}

		if ($("#monthlyLimit").val() === "" || Number($("#monthlyLimit").val()) <= 0) {
			error("monthlyLimit", "Monthly limit required");
		}

		if ($("#monthlyCardLimit").val() === "" || Number($("#monthlyCardLimit").val()) <= 0) {
			error("monthlyCardLimit", "Monthly card limit required");
		}

		if ($("#yearlyCardLimit").val() === "" || Number($("#yearlyCardLimit").val()) <= 0) {
			error("yearlyCardLimit", "Yearly card limit required");
		}

		/* ===== OPTIONAL NUMBERS ===== */
		if ($("#reservedFunds").val() !== "" &&
			Number($("#reservedFunds").val()) < 0) {
			error("reservedFunds", "Invalid reserved funds");
		}

		if ($("#monthlyFreeIFSC").val() !== "" &&
			Number($("#monthlyFreeIFSC").val()) < 0) {
			error("monthlyFreeIFSC", "Invalid IFSC transactions");
		}

		if ($("#freeMoneyTransfers").val() !== "" &&
			Number($("#freeMoneyTransfers").val()) < 0) {
			error("freeMoneyTransfers", "Invalid free transfers");
		}

		if ($("#limitPerTransaction").val() !== "" &&
			Number($("#limitPerTransaction").val()) <= 0) {
			error("limitPerTransaction", "Invalid per transaction limit");
		}

		if ($("#serviceFee").val() !== "" &&
			Number($("#serviceFee").val()) < 0) {
			error("serviceFee", "Invalid service fee");
		}

		if ($("#cardFee").val() !== "" &&
			Number($("#cardFee").val()) < 0) {
			error("cardFee", "Invalid card fee");
		}

		/* ===== SELECT ===== */
		if ($("#messagingFees").val() === "") {
			error("messagingFees", "Select messaging fees");
		}

		if ($("#messagingFees").val() === "YES" &&
			$("#messagingInterval").val() === "") {
			error("messagingInterval", "Select messaging interval");
		}

		if ($("#billingCycle").val() === "") {
			error("billingCycle", "Select billing cycle");
		}

		/* ===== LOGICAL CHECK ===== */
		if (
			Number($("#monthlyCardLimit").val()) >
			Number($("#yearlyCardLimit").val())
		) {
			error("monthlyCardLimit", "Monthly card limit cannot exceed yearly limit");
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
				alert("Record not found");
			}
		},

		error: function() {
			alert("Failed to load record");
		}
	});
}


// ================= DELETE =================
function deleteData(id) {
	if (!confirm("Are you sure you want to delete this Scheme?")) return;

	$.ajax({
		type: "POST",
		url: "api/customersavings/deleteSavingSchemeCatalogDataById?id=" + id,

		success: function(response) {
			if (response.data === "success") {
				alert("Deleted successfully!");
				location.reload();
			} else {
				alert("Delete failed");
			}
		},

		error: function() {
			alert("Delete error");
		}
	});
}
