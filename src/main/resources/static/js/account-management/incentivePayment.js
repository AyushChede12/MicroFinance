$(document).ready(function() {

	$.ajax({
		url: "accountManagement/bank-accounts",
		type: "GET",
		success: function(response) {

			if (response.status === "OK") {

				const bankAccounts = response.data;

				$("#paymentFrom")
					.empty()
					.append("<option value=''>--SELECT PAYMENT FROM--</option>");

				bankAccounts.forEach(bank => {

					const option = `
	                    <option value="${bank.accountId}">
	                        ${bank.accountTitle.toUpperCase()}
	                    </option>
	                `;

					$("#paymentFrom").append(option);
				});
			}
		},
		error: function(xhr) {

			$("#paymentFrom")
				.empty()
				.append("<option value=''>--NO BANK ACCOUNT FOUND--</option>");
		}
	});

	const monthMap = {
		january: 1,
		february: 2,
		march: 3,
		april: 4,
		may: 5,
		june: 6,
		july: 7,
		august: 8,
		september: 9,
		october: 10,
		november: 11,
		december: 12
	};

	$("#searchBtn").on("click", function() {

		const agentCode = $("#agentCode").val().trim().toUpperCase();
		const monthName = $("#month").val();

		if (!agentCode) {
			alert("Please Enter Agent Code");
			return;
		}

		if (!monthName) {
			alert("Please Select Incentive Month");
			return;
		}

		const month = monthMap[monthName];
		const year = new Date().getFullYear();

		if (!month) {
			alert("Invalid Month");
			return;
		}

		if (agentCode.startsWith("TM")) {
			fetchCompleteIncentiveData(agentCode, month, year);
		} else {
			alert("Invalid Agent Code Format");
		}

	});

	$("#payBtn").click(function() {

		// =========================================================
		// 1. BASIC VALIDATION
		// =========================================================

		let month = $("#month").val();
		let agentCode = $("#agentCode").val();
		let fullName = $("#fullName").val();
		let designation = $("#designation").val();
		let finalPayout = $("#finalPayout").val();
		let paymentDate = $("#paymentDate").val();
		let paymentBranch = $("#paymentBranch").val();
		let paymentMode = $("#paymentMode").val();
		let paymentFrom = $("#paymentFrom").val();

		if (!month ||
			!agentCode ||
			!finalPayout ||
			!paymentDate ||
			!paymentBranch ||
			!paymentMode ||
			!paymentFrom) {

			alert("Please fill all required fields!");
			return;
		}

		// =========================================================
		// 2. PREPARE REQUEST OBJECT
		// =========================================================

		let requestData = {

			month: month,

			agentCode: agentCode,

			fullName: fullName,

			designation: designation,

			personalSales: $("#personalSales").val() || 0,

			groupSales: $("#groupSales").val() || 0,

			overallSales: $("#overallSales").val() || 0,

			totalEarnings: $("#totalEarnings").val() || 0,

			taxDeducted: $("#taxDeducted").val() || 0,

			serviceDeduction: $("#serviceDeduction").val() || 0,

			extraAllowance: $("#extraAllowance").val() || 0,

			finalPayout: finalPayout,

			paymentDate: paymentDate,

			paymentBranch: paymentBranch,

			paymentMode: paymentMode,

			paymentFromLedgerId: paymentFrom
		};

		// =========================================================
		// 3. DISABLE BUTTON
		// =========================================================

		$("#payBtn")
			.prop("disabled", true)
			.text("Processing...");

		// =========================================================
		// 4. PAYMENT AJAX
		// =========================================================

		$.ajax({

			url: "accountManagement/pay",

			type: "POST",

			contentType: "application/json",

			data: JSON.stringify(requestData),

			success: function(response) {

				if (response.status === "OK") {

					alert("✅ Incentive Paid Successfully!");

					location.reload();

				} else {

					alert("❌ " + response.message);

					$("#payBtn")
						.prop("disabled", false)
						.text("PAY");
				}
			},

			error: function(xhr) {

				let msg = "Something went wrong!";

				if (xhr.responseJSON &&
					xhr.responseJSON.message) {

					msg = xhr.responseJSON.message;
				}

				alert("❌ " + msg);

				$("#payBtn")
					.prop("disabled", false)
					.text("PAY");
			}
		});

	});


});


function fetchCompleteIncentiveData(agentCode, month, year) {

	$.ajax({
		type: "POST",
		url: "accountManagement/incentive-full-details",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify({
			teamMemberCode: agentCode,
			month: month,
			year: year
		}),
		success: function(response) {

			if (!response) {
				alert("No Data Found");
				return;
			}
			let data = response.data;

			if (response.status == "FOUND") {
				$("#fullName").val(data.fullName);
				$("#designation").val(data.designation);
				$("#personalSales").val(data.personalSales);
				$("#groupSales").val(data.groupSales);
				$("#overallSales").val(data.overallSales);
				$("#totalEarnings").val(data.totalEarnings);
				$("#taxDeducted").val(data.taxDeducted);
				$("#serviceDeduction").val(data.serviceDeduction);
				$("#extraAllowance").val(data.extraAllowance);
				$("#finalPayout").val(data.finalPayout);
			}
		},
		error: function() {
			alert("Error fetching Incentive Details");
		}
	});

}
