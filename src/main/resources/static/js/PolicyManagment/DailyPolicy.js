$(document).ready(function() {

	$("#policyAmount, #noOfInst").on("keyup change input", function() {
		calculateNetDeposit();
	});

	function calculateNetDeposit() {

		const policyAmount = parseFloat($("#policyAmount").val()) || 0;
		const noOfInst = parseInt($("#noOfInst").val(), 10) || 0;

		// 🔴 ADD THESE TWO LINES
		const totalTerm = parseInt($("#policyTerm").val(), 10) || 0;       // total installments (e.g. 34)
		const alreadyPaid = parseInt($("#noOfInstPaid").val(), 10) || 0;   // already paid (e.g. 20)

		// ❌ VALIDATION: user cannot pay more than remaining installments
		if (alreadyPaid + noOfInst > totalTerm) {
			alert(
				`❌ Installment limit exceeded!\n\n` +
				`Total Term : ${totalTerm}\n` +
				`Already Paid : ${alreadyPaid}\n` +
				`Remaining : ${totalTerm - alreadyPaid}`
			);

			$("#noOfInst").val("");       // reset input
			$("#netDeposite").val("");    // reset net amount
			return;
		}

		// ✅ CALCULATION
		const net = noOfInst * policyAmount;
		$("#netDeposite").val(net.toFixed(2));
	}

	// 1. Populate dropdown with approved RD policies
	$.ajax({
		url: "api/Policymangment/getAllDDPolicies",
		type: "GET",
		success: function(response) {
			if (response.data && response.data.length > 0) {
				const policySelect = $("#policyCode");
				response.data.forEach(policy => {
					const optionText = `${policy.policyCode} - ${policy.customerName.toUpperCase()}`;
					policySelect.append(`<option value="${policy.policyCode}">${optionText}</option>`);
				});
			}
		},
		error: function() {
			alert("Failed to load policies.");
		}
	});

	// 2. On policyCode change, fetch full policy data
	$("#policyCode").on("change", function() {

		const selectedPolicyCode = $(this).val();

		if (!selectedPolicyCode) {
			return;
		}

		$.ajax({

			url: "api/Policymangment/getPolicyByPolicyCode",
			type: "GET",

			data: {
				policyCode: selectedPolicyCode
			},

			success: function(response) {

				if (response.data) {

					const data = response.data;

					let renewalDate = "";

					if (
						data.policyStartDate &&
						data.schemeType === "RD"
					) {

						const startDate =
							new Date(data.policyStartDate);

						startDate.setMonth(
							startDate.getMonth() + 1
						);

						const yyyy =
							startDate.getFullYear();

						const mm =
							String(
								startDate.getMonth() + 1
							).padStart(2, "0");

						const dd =
							String(
								startDate.getDate()
							).padStart(2, "0");

						renewalDate =
							`${yyyy}-${mm}-${dd}`;
					}

					if (data.schemeType === "RD") {

						if (data.schemeTerm) {

							noOfInst =
								parseInt(
									data.schemeTerm,
									10
								);

						} else if (
							data.policyStartDate &&
							data.maturityDate
						) {

							const start =
								new Date(
									data.policyStartDate
								);

							const end =
								new Date(
									data.maturityDate
								);

							noOfInst =
								(end.getFullYear() -
									start.getFullYear()) * 12 +
								(end.getMonth() -
									start.getMonth());
						}
					}

					$("#policyDate")
						.val(data.policyStartDate);

					$("#renewalDate")
						.val(renewalDate);

					$("#maturityDate")
						.val(data.maturityDate);

					$("#customerCode")
						.val(data.memberSelection);

					$("#clientName")
						.val(data.customerName);

					$("#contactNo")
						.val(data.contactNo);

					$("#policyAmount")
						.val(data.policyAmount);

					$("#netDeposite")
						.val(data.depositAmount);

					$("#policyType")
						.val(data.schemeType);

					$("#branchName")
						.val(data.branchName);

					$("#policyTerm")
						.val(data.schemeTerm);

					$("#maturityAmount")
						.val(data.maturityAmount);

					$("#totalDeposit")
						.val(data.depositAmount);

					$("#paymentDue")
						.val(data.balance);

					$("#financialCode")
						.val(data.introMCode);

					$("#lastInstPaid")
						.val(data.lastInstPaid);

					$("#dueDate")
						.val(data.maturityDate);


					/*
					 * IMPORTANT:
					 * No Of Installments is the current
					 * payment installment count.
					 *
					 * It should NOT be fetched as 0.
					 * User will enter 1, 2, 3 etc.
					 */

					$("#noOfInstPaid")
						.val(data.noOfInstallments);

					$("#paymentMode")
						.val(data.paymentBy);

					$("#nomineeName")
						.val(data.suggestedNominee);

					$("#comment")
						.val(data.remark);

					$("#agentName")
						.val(data.agent);

					$("#modeOfPayment")
						.val(data.modeOfPayment);


					if (data.image1) {

						const photoPath =
							`Uploads/${data.image1}`;

						$("#photoPreview")
							.attr("src", photoPath);

						$("#photoHidden")
							.val(photoPath);

						photoSizeEdit({
							target: {
								result: photoPath
							}
						});

					} else {

						$("#photoPreview")
							.attr(
								"src",
								"Uploads/default-placeholder.jpg"
							);

						$("#photoHidden").val("");
					}


					if (data.image2) {

						const signPath =
							`Uploads/${data.image2}`;

						$("#signaturePreview")
							.attr("src", signPath);

						$("#signatureHidden")
							.val(signPath);

						signatureSizeEdit({
							target: {
								result: signPath
							}
						});

					} else {

						$("#signaturePreview")
							.attr(
								"src",
								"Uploads/default-placeholder.jpg"
							);

						$("#signatureHidden").val("");
					}
				}
			},

			error: function() {

				alert("Policy not found!");
			}
		});
	});
});

$(document).ready(function() {

	$("#buttonSave").click(function(e) {

		e.preventDefault();

		const policyCode =
			$("#policyCode").val();

		const policyAmount =
			parseFloat(
				$("#policyAmount").val()
			) || 0;

		const noOfInstallments =
			parseInt(
				$("#noOfInst").val(),
				10
			) || 0;

		const totalTerm =
			parseInt(
				$("#policyTerm").val(),
				10
			) || 0;

		const alreadyPaid =
			parseInt(
				$("#noOfInstPaid").val(),
				10
			) || 0;

		const paymentDue =
			parseFloat(
				$("#paymentDue").val()
			) || 0;

		const modeOfPayment =
			$("#modeOfPayment").val() || "";

		const dueDateValue =
			$("#dueDate").val();

		if (!policyCode) {

			alert(
				"Please select a Policy Code."
			);

			return;
		}

		if (policyAmount <= 0) {

			alert(
				"Invalid Policy Amount."
			);

			return;
		}

		if (noOfInstallments <= 0) {

			alert(
				"Please enter No. of Installments."
			);

			$("#noOfInst").focus();

			return;
		}

		if (
			totalTerm > 0 &&
			alreadyPaid + noOfInstallments > totalTerm
		) {

			alert(
				"Installment limit exceeded!\n\n" +
				"Total Term : " +
				totalTerm +
				"\n" +
				"Already Paid : " +
				alreadyPaid +
				"\n" +
				"Remaining : " +
				(totalTerm - alreadyPaid)
			);

			return;
		}

		const totalPayment =
			policyAmount * noOfInstallments;

		if (paymentDue <= 0) {

			alert(
				"No payment is due for this policy."
			);

			return;
		}

		if (totalPayment > paymentDue) {

			alert(
				"Payment amount cannot be greater than payment due.\n\n" +
				"Payment Amount : ₹" +
				totalPayment.toFixed(2) +
				"\n" +
				"Payment Due : ₹" +
				paymentDue.toFixed(2)
			);

			return;
		}

		/*
		 * =====================================================
		 * PENALTY CALCULATION
		 * =====================================================
		 */

		const PENALTY_PER_DAY = 10;

		let penaltyAmount = 0;
		let lateDays = 0;

		if (dueDateValue) {

			const dueDate =
				new Date(
					dueDateValue + "T00:00:00"
				);

			const today =
				new Date();

			today.setHours(
				0,
				0,
				0,
				0
			);

			if (today > dueDate) {

				const difference =
					today.getTime() -
					dueDate.getTime();

				lateDays =
					Math.floor(
						difference /
						(1000 * 60 * 60 * 24)
					);

				penaltyAmount =
					lateDays *
					PENALTY_PER_DAY;
			}
		}

		penaltyAmount =
			Number(
				penaltyAmount.toFixed(2)
			);

		/*
		 * =====================================================
		 * CONFIRM PAYMENT
		 * =====================================================
		 */

		const confirmPayment =
			confirm(
				"Please confirm payment details:\n\n" +
				"Policy Code : " +
				policyCode +
				"\nPolicy Amount : ₹" +
				policyAmount.toFixed(2) +
				"\nNo. of Installments : " +
				noOfInstallments +
				"\nPayment Amount : ₹" +
				totalPayment.toFixed(2) +
				"\nPayment Due : ₹" +
				paymentDue.toFixed(2) +
				"\nLate Days : " +
				lateDays +
				"\nPenalty Amount : ₹" +
				penaltyAmount.toFixed(2) +
				"\n\nDo you want to save this payment?"
			);

		if (!confirmPayment) {

			return;
		}

		/*
		 * =====================================================
		 * DISABLE SAVE BUTTON
		 * =====================================================
		 */

		$("#buttonSave").prop(
			"disabled",
			true
		);

		/*
		 * =====================================================
		 * SINGLE API DATA
		 * =====================================================
		 */

		const policyPaymentData = {

			policyCode:
				policyCode,

			paymentAmount:
				totalPayment.toFixed(2),

			paymentDate:
				new Date()
					.toISOString()
					.split("T")[0],

			modeOfPayment:
				modeOfPayment,

			remark:
				$("#comment").val() || "",

			penaltyAmount:
				penaltyAmount.toFixed(2)
		};

		console.log(
			"Saving DD Payment:",
			policyPaymentData
		);

		/*
		 * =====================================================
		 * SINGLE API CALL
		 *
		 * saveDDPayment()
		 *
		 * This API will:
		 *
		 * 1. Save PolicyPayment
		 * 2. Update Main Policy
		 * 3. Save DD Renewal
		 *
		 * All inside ONE @Transactional method.
		 * =====================================================
		 */

		$.ajax({

			url:
				"api/Policymangment/saveDDPayment",

			type:
				"POST",

			contentType:
				"application/json",

			dataType:
				"json",

			data:
				JSON.stringify(
					policyPaymentData
				),

			success:
				function(response) {

					console.log(
						"Save DD Payment Response:",
						response
					);

					/*
					 * =================================================
					 * SUCCESS
					 * =================================================
					 */

					if (
						response &&
						response.status === "CREATED"
					) {

						/*
						 * =================================================
						 * ACCOUNT TRANSACTION
						 *
						 * CASH ONLY
						 * =================================================
						 */

						var customerName = $("#clientName").val();
						var transactionType = "";
						if (modeOfPayment && modeOfPayment.toUpperCase() === "CASH") {
							transactionType = "DD_INSTALLMENT_CASH";
						} else {
							transactionType = "TRANSFER";
						}
						const accountTransactionData = {

							branchName:
								$("#branchName").val() || "",

							accountCode:
								modeOfPayment,

							customerName:
								customerName,

							accountNumber:
								policyCode,

							transactionDate:
								new Date()
									.toISOString()
									.split("T")[0],

							narration:
								"DRD Renewal - " +
								policyCode +
								" - " +
								($("#customerCode").val() || ""),

							credit:
								Number(
									totalPayment.toFixed(2)
								),

							debit:
								0,

							transactionType:
								transactionType,

							referenceNo:
								policyCode +
								"-INST-" +
								(alreadyPaid + 1),

							status:
								"SUCCESS",

							loanId:
								null,

							policyId:
								null,

							createdBy:
								"ADMIN"
						};

						console.log(
							"Saving Account Transaction:",
							accountTransactionData
						);

						$.ajax({

							url:
								"accountManagement/saveAccountTransaction",

							type:
								"POST",

							contentType:
								"application/json",

							dataType:
								"json",

							data:
								JSON.stringify(
									accountTransactionData
								),

							success:
								function(transactionResponse) {

									console.log(
										"AccountTransaction Response:",
										transactionResponse
									);

									alert(
										"✅ " +
										(
											response.message ||
											"Payment saved successfully."
										)
									);

									location.reload();
								},

							error:
								function(xhr) {

									console.error(
										"AccountTransaction Error:",
										xhr
									);

									/*
									 * Policy payment is already saved.
									 * Account transaction failed.
									 */

									let message =
										"Payment saved, but Cash Book transaction could not be saved.";

									if (
										xhr.responseJSON &&
										xhr.responseJSON.message
									) {

										message =
											"Payment saved, but Cash Book transaction failed: " +
											xhr.responseJSON.message;
									}

									alert(
										"⚠️ " + message
									);

									$("#buttonSave").prop(
										"disabled",
										false
									);
								}
						});

					}

					/*
					 * =================================================
					 * BUSINESS ERROR
					 * =================================================
					 */

					alert(
						"⚠️ " +
						(
							response &&
								response.message
								?
								response.message
								:
								"Payment could not be saved."
						)
					);

					$("#buttonSave").prop(
						"disabled",
						false
					);
				},

			error:
				function(xhr) {

					console.error(
						"Save DD Payment Error:",
						xhr
					);

					let message =
						"Payment could not be saved.";

					if (
						xhr.responseJSON &&
						xhr.responseJSON.message
					) {

						message =
							xhr.responseJSON.message;
					}

					alert(
						"❌ " + message
					);

					$("#buttonSave").prop(
						"disabled",
						false
					);
				}
		});

	});


});

$("#viewBtn").on("click", function() {

	const selectedPolicyCode = $("#policyCode").val();

	if (!selectedPolicyCode) {

		alert("Please select a policy code first!");

		$("#installmentModal").modal("hide");
		$("#installmentModal").removeClass("show");
		$("#installmentModal").css("display", "none");
		$("body").removeClass("modal-open");
		$(".modal-backdrop").remove();

		return;
	}

	$.ajax({

		url: "api/Policymangment/getPolicyPayments/" +
			encodeURIComponent(selectedPolicyCode),

		type: "GET",

		dataType: "json",

		success: function(response) {

			console.log("Policy Payment Response:", response);

			const $tbody = $("#installmentModal tbody");

			let rowsHtml = "";
			let payments = [];

			if (
				response &&
				response.status === "OK" &&
				Array.isArray(response.data)
			) {

				payments = response.data;

			} else if (
				response &&
				response.data
			) {

				payments = [response.data];
			}

			if (payments.length > 0) {

				const formatDate = function(dateValue) {

					if (!dateValue) {
						return "-";
					}

					const dateObj = new Date(dateValue);

					if (isNaN(dateObj.getTime())) {
						return dateValue;
					}

					const day = String(
						dateObj.getDate()
					).padStart(2, "0");

					const month = String(
						dateObj.getMonth() + 1
					).padStart(2, "0");

					const year = dateObj.getFullYear();

					return `${day}-${month}-${year}`;
				};

				payments.forEach(function(payment, index) {

					const srNo = index + 1;

					const paymentDate = payment.paymentDate
						? formatDate(payment.paymentDate)
						: "-";

					// Payment Amount
					const amountValue = parseFloat(
						payment.amount ||
						payment.paymentAmount ||
						payment.paidAmount ||
						0
					);

					const amount = amountValue > 0
						? `INR ${amountValue.toLocaleString("en-IN", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}`
						: "INR 0.00";

					// Penalty Amount
					const penaltyValue = parseFloat(
						payment.penaltyAmount ||
						payment.penalty ||
						0
					);

					const penalty = penaltyValue > 0
						? `INR ${penaltyValue.toLocaleString("en-IN", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}`
						: "INR 0.00";

					// Status
					const status = paymentDate !== "-"
						? `<span class="text-success font-weight-bold">
								PAID
						   </span>`
						: `<span class="text-danger font-weight-bold">
								UNPAID
						   </span>`;

					// Installment Number
					const installmentNo =
						payment.noOfInstallments ||
						payment.installmentNo ||
						payment.noOfInst ||
						srNo;

					rowsHtml += `

						<tr>

							<td>${installmentNo}</td>

							<td>${paymentDate}</td>

							<td>${amount}</td>

							<td>${penalty}</td>

							<td>${status}</td>

							<td>${paymentDate}</td>

						</tr>

					`;
				});

			} else {

				rowsHtml = `

					<tr>

						<td colspan="6"
							class="text-center text-danger">

							No payment transaction found for this policy.

						</td>

					</tr>

				`;
			}

			$tbody.html(rowsHtml);

			const modalElement =
				document.getElementById("installmentModal");

			const modalInstance =
				bootstrap.Modal.getOrCreateInstance(
					modalElement
				);

			modalInstance.show();
		},

		error: function(xhr) {

			console.error(
				"Failed to fetch policy payment history:",
				xhr
			);

			let message =
				"Failed to fetch installment data.";

			if (
				xhr.responseJSON &&
				xhr.responseJSON.message
			) {

				message =
					xhr.responseJSON.message;
			}

			alert(message);

			const modalElement =
				document.getElementById("installmentModal");

			const modalInstance =
				bootstrap.Modal.getInstance(
					modalElement
				);

			if (modalInstance) {
				modalInstance.hide();
			}
		}
	});
});

function signatureSizeEdit(e) {
	const previewimg = document.getElementById("signaturePreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function photoSizeEdit(e) {
	const previewimg = document.getElementById("photoPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}
