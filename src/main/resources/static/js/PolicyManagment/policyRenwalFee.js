$(document).ready(function() {

	$("#policyAmount, #noOfInst").on("keyup change input", function() {
		calculateNetDeposit();
	});

	function calculateNetDeposit() {

		const policyAmount = parseFloat($("#policyAmount").val()) || 0;
		const noOfInst = parseInt($("#noOfInst").val(), 10) || 0;

		const totalTerm = parseInt($("#policyTerm").val(), 10) || 0;
		const alreadyPaid = parseInt($("#noOfInstPaid").val(), 10) || 0;

		if (totalTerm > 0 && alreadyPaid + noOfInst > totalTerm) {

			alert(
				"INSTALLMENT LIMIT EXCEEDED!\n\n" +
				"TOTAL TERM : " + totalTerm + "\n" +
				"ALREADY PAID : " + alreadyPaid + "\n" +
				"REMAINING : " + (totalTerm - alreadyPaid)
			);

			$("#noOfInst").val("");
			$("#netDeposite").val("");
			return;
		}

		const net = noOfInst * policyAmount;

		$("#netDeposite").val(net.toFixed(2));
	}


	$.ajax({
		url: "api/Policymangment/getAllRDPolicies",
		type: "GET",

		success: function(response) {

			if (response.data && response.data.length > 0) {

				const policySelect = $("#policyCode");

				response.data.forEach(policy => {

					const optionText =
						`${policy.policyCode} - ${policy.customerName.toUpperCase()}`;

					policySelect.append(
						`<option value="${policy.policyCode}">
                            ${optionText}
                        </option>`
					);
				});
			}
		},

		error: function() {
			alert("FAILED TO LOAD POLICIES.");
		}
	});


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

					$("#customerName")
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

				alert("POLICY NOT FOUND!");
			}
		});
	});


	/*
	 * SAVE PAYMENT
	 */
	$("#saveBtn").click(function(e) {

		e.preventDefault();

		const policyCode =
			$("#policyCode").val();

		const policyAmount =
			parseFloat($("#policyAmount").val()) || 0;

		const noOfInstallments =
			parseInt($("#noOfInst").val(), 10) || 0;

		const totalTerm =
			parseInt($("#policyTerm").val(), 10) || 0;

		const alreadyPaid =
			parseInt($("#noOfInstPaid").val(), 10) || 0;

		const paymentDue =
			parseFloat($("#paymentDue").val()) || 0;

		const modeOfPayment =
			$("#modeOfPayment").val() || "";

		const dueDateValue =
			$("#dueDate").val();


		if (!policyCode) {

			alert("PLEASE SELECT A POLICY CODE.");
			return;
		}


		if (policyAmount <= 0) {

			alert("INVALID POLICY AMOUNT.");
			return;
		}


		if (noOfInstallments <= 0) {

			alert("PLEASE ENTER NO. OF INSTALLMENTS.");
			$("#noOfInst").focus();
			return;
		}


		if (
			totalTerm > 0 &&
			alreadyPaid + noOfInstallments > totalTerm
		) {

			alert(
				"INSTALLMENT LIMIT EXCEEDED!\n\n" +
				"TOTAL TERM : " +
				totalTerm +
				"\nALREADY PAID : " +
				alreadyPaid +
				"\nREMAINING : " +
				(totalTerm - alreadyPaid)
			);

			return;
		}


		const totalPayment =
			policyAmount * noOfInstallments;


		if (paymentDue <= 0) {

			alert(
				"NO PAYMENT IS DUE FOR THIS POLICY."
			);

			return;
		}


		if (totalPayment > paymentDue) {

			alert(
				"PAYMENT AMOUNT CANNOT BE GREATER THAN PAYMENT DUE.\n\n" +
				"PAYMENT AMOUNT : ₹" +
				totalPayment.toFixed(2) +
				"\nPAYMENT DUE : ₹" +
				paymentDue.toFixed(2)
			);

			return;
		}


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


		const confirmPayment =
			confirm(

				"PLEASE CONFIRM PAYMENT DETAILS:\n\n" +

				"POLICY CODE : " +
				policyCode +

				"\nPOLICY AMOUNT : ₹" +
				policyAmount.toFixed(2) +

				"\nNO. OF INSTALLMENTS : " +
				noOfInstallments +

				"\nPAYMENT AMOUNT : ₹" +
				totalPayment.toFixed(2) +

				"\nPAYMENT DUE : ₹" +
				paymentDue.toFixed(2) +

				"\nLATE DAYS : " +
				lateDays +

				"\nPENALTY AMOUNT : ₹" +
				penaltyAmount.toFixed(2) +

				"\n\nDO YOU WANT TO SAVE THIS PAYMENT?"
			);


		if (!confirmPayment) {

			return;
		}


		$("#saveBtn").prop(
			"disabled",
			true
		);


		const rdPaymentData = {

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
			"RD Payment Request:",
			rdPaymentData
		);


		$.ajax({

			url:
				"api/Policymangment/saveRDPayment",

			type:
				"POST",

			contentType:
				"application/json",

			dataType:
				"json",

			data:
				JSON.stringify(
					rdPaymentData
				),


			success:
				function(response) {

					console.log(
						"RD Payment Response:",
						response
					);


					if (
						response &&
						response.status === "CREATED"
					) {


						/*
						 * =====================================================
						 * SAVE ACCOUNT TRANSACTION
						 * ONLY FOR CASH PAYMENT
						 * =====================================================
						 */
						var customerName = $("#customerName").val();
						if (modeOfPayment && modeOfPayment.toUpperCase() === "CASH") {
							transactionType = "RD_INSTALLMENT_CASH";
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
								"RD Renewal - " +
								policyCode +
								" - " +
								(
									$("#customerCode").val() || ""
								),

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
								(
									alreadyPaid + 1
								),

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
							"Saving RD Account Transaction:",
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
								function(
									accountResponse
								) {

									console.log(
										"Account Transaction Response:",
										accountResponse
									);


									if (
										accountResponse &&
										accountResponse.status === "CREATED"
									) {

										alert(
											"✅ " +
											(
												response.message ||
												"RD PAYMENT SAVED SUCCESSFULLY."
											)
										);

										location.reload();

										return;
									}


									alert(
										"⚠️ RD PAYMENT SAVED, BUT CASH BOOK TRANSACTION COULD NOT BE SAVED.\n\n" +
										(
											accountResponse &&
												accountResponse.message
												?
												accountResponse.message
												:
												"ACCOUNT TRANSACTION FAILED."
										)
									);


									$("#saveBtn").prop(
										"disabled",
										false
									);
								},


							error:
								function(
									accountXhr
								) {

									console.error(
										"Account Transaction Error:",
										accountXhr
									);


									alert(
										"⚠️ RD PAYMENT SAVED, BUT CASH BOOK TRANSACTION COULD NOT BE SAVED."
									);


									$("#saveBtn").prop(
										"disabled",
										false
									);
								}
						});


					} else {


						/*
						 * =====================================================
						 * ONLINE PAYMENT
						 * NO CASH BOOK ENTRY
						 * =====================================================
						 */

						alert(
							"✅ " +
							(
								response.message ||
								"RD PAYMENT SAVED SUCCESSFULLY."
							)
						);


						location.reload();
					}

				},


			error:
				function(xhr) {

					console.error(
						"RD Payment Error:",
						xhr
					);


					let message =
						"FAILED TO SAVE RD PAYMENT.";


					if (
						xhr.responseJSON &&
						xhr.responseJSON.message
					) {

						message =
							xhr.responseJSON.message;

					} else if (
						xhr.responseJSON &&
						xhr.responseJSON.error
					) {

						message =
							xhr.responseJSON.error;
					}


					alert(
						"❌ " +
						message
					);


					$("#saveBtn").prop(
						"disabled",
						false
					);
				}
		});

	});

	/*
	 * APPROVED POLICY DROPDOWN
	 */
	const $policyDropdown =
		$("#findByPolicyNumber");


	$policyDropdown
		.empty()
		.append(
			'<option value="">SELECT BRANCH NAME</option>'
		);


	fetchApprovedPolicies();


	function fetchApprovedPolicies() {

		$.ajax({

			url:
				"api/Policymangment/getApprovedPolicies",

			method:
				"GET",


			success: function(response) {

				if (
					response.status === "OK" &&
					Array.isArray(response.data)
				) {

					response.data.forEach(
						function(item) {

							const policyNumber =
								(
									item.policyCode ||
									item.policyNumber ||
									""
								).trim();


							const clientName =
								(
									item.clientName ||
									item.customerName ||
									"Unknown"
								).trim();


							if (policyNumber) {

								$policyDropdown.append(

									`<option value="${policyNumber}">
                                        ${policyNumber} - ${clientName}
                                    </option>`
								);
							}
						}
					);

				} else {

					console.warn(
						"No approved policies found."
					);
				}
			},


			error: function(xhr, status, error) {

				console.error(
					"Error fetching approved policies:",
					error
				);
			}
		});
	}
});


function toggleTransaction() {

	const policyCode =
		document
			.getElementById(
				"findByPolicyNumber"
			)
			.value;


	if (!policyCode) {

		alert(
			"PLEASE SELECT A POLICY CODE FIRST."
		);

		return;
	}


	fetch(
		`api/Policymangment/getPolicyByPolicyCode?policyCode=${encodeURIComponent(policyCode)}`
	)

		.then(function(response) {

			if (!response.ok) {

				throw new Error(
					"POLICY NOT FOUND"
				);
			}

			return response.json();
		})


		.then(function(data) {

			const policy =
				data.data;


			document
				.getElementById("branchCodeSpan")
				.textContent =
				policy.branchName || "";


			document
				.getElementById("docSpan")
				.textContent =
				policy.policyStartDate || "";


			document
				.getElementById("policyNoSpan")
				.textContent =
				policy.policyCode || "";


			document
				.getElementById("memberCodeSpan")
				.textContent =
				policy.memberSelection || "";


			document
				.getElementById("applicantNameSpan")
				.textContent =
				policy.customerName || "";


			document
				.getElementById("fatherNameSpan")
				.textContent =
				policy.relationDetails || "";


			document
				.getElementById("nomineeNameSpan")
				.textContent =
				policy.suggestedNominee || "";


			document
				.getElementById("addressSpan")
				.textContent =
				policy.address || "";


			document
				.getElementById("schemeSpan")
				.textContent =
				policy.schemeType || "";


			document
				.getElementById("planSpan")
				.textContent =
				policy.schemeCode || "";


			document
				.getElementById("relationshipSpan")
				.textContent =
				policy.relation || "";


			document
				.getElementById("roiSpan")
				.textContent =
				policy.roi || "";


			document
				.getElementById("modeSpan")
				.textContent =
				policy.schemeMode || "";


			document
				.getElementById("maturitySpan")
				.textContent =
				policy.maturityAmount || "";


			document
				.getElementById("renewalAmountSpan")
				.textContent =
				policy.paidAmount || "";


			document
				.getElementById("totalValueSpan")
				.textContent =
				policy.depositAmount || "";


			document
				.getElementById("termSpan")
				.textContent =
				policy.schemeTerm || "";


			document
				.getElementById("maturityDateSpan")
				.textContent =
				policy.maturityDate || "";


			document
				.getElementById("mobileSpan")
				.textContent =
				policy.contactNo || "";


			document
				.getElementById("collectorSpan")
				.textContent =
				policy.agent || "";


			document
				.getElementById(
					"transactionSection"
				)
				.style.display =
				"block";
		})


		.catch(function(error) {

			alert(
				"ERROR FETCHING POLICY DATA: " +
				error.message
			);

			console.error(
				"Error:",
				error
			);
		});
}


function printTransactionSection() {

	const content =
		document
			.getElementById(
				"transactionSection"
			)
			.innerHTML;


	const printWindow =
		window.open(
			"",
			"",
			"height=800,width=1000"
		);


	printWindow.document.write(
		"<html><head><title>TRANSACTION RECEIPT</title>"
	);


	printWindow.document.write(`

        <style>

            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }

            p {
                margin: 5px 0;
            }

            h1 {
                text-align: center;
            }

            hr {
                margin: 10px 0;
                border: 1px solid black;
            }

            .d-flex {
                display: flex;
                justify-content: space-between;
            }

        </style>

    `);


	printWindow.document.write(
		"</head><body>"
	);


	printWindow.document.write(
		content
	);


	printWindow.document.write(
		"</body></html>"
	);


	printWindow.document.close();

	printWindow.focus();


	printWindow.onload = function() {

		printWindow.print();

		printWindow.close();
	};
}


$("#viewBtn").on("click", function() {

	const selectedPolicyCode = $("#policyCode").val();

	if (!selectedPolicyCode) {

		alert("PLEASE SELECT A POLICY CODE FIRST!");

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

							NO PAYMENT TRANSACTION FOUND FOR THIS POLICY.

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
				"FAILED TO FETCH INSTALLMENT DATA.";

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

	const previewimg =
		document.getElementById(
			"signaturePreview"
		);


	previewimg.src =
		e.target.result;

	previewimg.style.width =
		"100%";

	previewimg.style.height =
		"100%";

	previewimg.style.objectFit =
		"cover";

	previewimg.style.overflow =
		"hidden";

	previewimg.style.borderRadius =
		"20px";
}


function photoSizeEdit(e) {

	const previewimg =
		document.getElementById(
			"photoPreview"
		);


	previewimg.src =
		e.target.result;

	previewimg.style.width =
		"100%";

	previewimg.style.height =
		"100%";

	previewimg.style.objectFit =
		"cover";

	previewimg.style.overflow =
		"hidden";

	previewimg.style.borderRadius =
		"20px";
}