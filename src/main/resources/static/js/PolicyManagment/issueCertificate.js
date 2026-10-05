$(document).ready(function() {

	$("#certificateTemplate").hide();

	function safeUpper(value) {
		if (value === null || value === undefined) {
			return "";
		}
		return String(value).toUpperCase();
	}

	function getLogoUrl(companyId, logoId, fileName) {

		if (!companyId || !logoId || !fileName) {
			return "images/logo.png";
		}

		return "Uploads/company/" +
			logoId +
			"/" +
			fileName;
	}

	function loadCompanyLogo(companyId, callback) {

		if (!companyId) {
			$("#certCompanyLogo").attr("src", "images/logo.png");

			if (typeof callback === "function") {
				callback(null);
			}

			return;
		}

		$.ajax({
			url: "api/preference/images/" + companyId,
			type: "GET",
			dataType: "json",

			success: function(response) {

				console.log("Company Images Response:", response);

				var images = response;

				if (response && response.data) {
					images = response.data;
				}

				if (!Array.isArray(images)) {
					images = [];
				}

				var logoImage = null;

				$.each(images, function(index, image) {

					if (
						image.name &&
						String(image.name).toLowerCase() === "logo"
					) {
						logoImage = image;
						return false;
					}

				});

				if (!logoImage && images.length > 0) {
					logoImage = images[0];
				}
				if (logoImage && logoImage.fileName) {

					var logoUrl = getLogoUrl(
						companyId,
						logoImage.id,
						logoImage.fileName
					);

					$("#certCompanyLogo").attr(
						"src",
						logoUrl
					);

				} else {

					$("#certCompanyLogo").attr(
						"src",
						"images/logo.png"
					);
				}

				if (typeof callback === "function") {
					callback(logoImage);
				}
			},

			error: function(xhr) {

				console.error(
					"Company Images Error:",
					xhr
				);

				$("#certCompanyLogo").attr(
					"src",
					"images/logo.png"
				);

				if (typeof callback === "function") {
					callback(null);
				}
			}
		});
	}

	function loadCompanyDetails(callback) {

		$.ajax({
			url: "api/preference/getCompanyDetails",
			type: "GET",
			dataType: "json",

			success: function(company) {

				console.log(
					"Company Details:",
					company
				);

				if (!company) {

					if (typeof callback === "function") {
						callback(null);
					}

					return;
				}

				$("#certCompanyName").text(
					company.companyName || ""
				);

				var companyAddress = "";

				if (company.address) {
					companyAddress = company.address;
				}

				if (company.city) {

					companyAddress +=
						(companyAddress ? ", " : "") +
						company.city;
				}

				if (company.state) {

					companyAddress +=
						(companyAddress ? ", " : "") +
						company.state;
				}

				if (company.pinCode) {

					companyAddress +=
						(companyAddress ? " - " : "") +
						company.pinCode;
				}

				$("#certCompanyAddress").text(
					companyAddress
				);

				$("#certCompanyContact").text(
					company.helplineNo ||
					company.branchManagerContactNo ||
					""
				);

				$("#certCompanyGstin").text(
					company.gstin || ""
				);

				$("#certCompanyCin").text(
					company.cinNo || ""
				);

				$("#certCompanyPan").text(
					company.pan || ""
				);

				$("#certCompanyLogo").attr(
					"src",
					"images/logo.png"
				);

				loadCompanyLogo(
					company.id,
					function(logo) {

						console.log(
							"Company Logo:",
							logo
						);

						if (typeof callback === "function") {
							callback(company);
						}
					}
				);
			},

			error: function(xhr) {

				console.error(
					"Company Details Error:",
					xhr
				);

				$("#certCompanyName").text("");
				$("#certCompanyAddress").text("");
				$("#certCompanyContact").text("");
				$("#certCompanyGstin").text("");
				$("#certCompanyCin").text("");
				$("#certCompanyPan").text("");

				$("#certCompanyLogo").attr(
					"src",
					"images/logo.png"
				);

				if (typeof callback === "function") {
					callback(null);
				}
			}
		});
	}

	function fillCertificate(data) {

		if (!data) {
			return;
		}

		var clientName =
			data.clientName ||
			data.customerName ||
			"";

		var nominee =
			data.suggestedNominee ||
			"";

		var address =
			data.address ||
			"";

		$("#certClientName").text(
			safeUpper(clientName)
		);

		$("#certPolicyCode").text(
			data.policyCode || ""
		);

		$("#certPolicyAmount").text(
			data.policyAmount || ""
		);

		$("#certMaturityAmount").text(
			data.maturityAmount || ""
		);

		$("#certMaturityDate").text(
			data.maturityDate || ""
		);

		$("#certContact").text(
			data.contactNo || ""
		);

		$("#certNominee").text(
			safeUpper(nominee)
		);

		$("#certAddress").text(
			safeUpper(address)
		);

		$("#certPolicyStartDate").text(
			data.policyStartDate || ""
		);

		$("#certDateOfBirth").text(
			data.dateofBirth || ""
		);

		$("#certMemberSelection").text(
			data.memberSelection || ""
		);

		$("#certRelation").text(
			data.relation || ""
		);

		$("#certAgeOfNominee").text(
			data.ageOfNominee || ""
		);

		$("#certNomineeRelation").text(
			data.relation || ""
		);

		$("#certDistrict").text(
			data.district || ""
		);

		$("#certState").text(
			data.state || ""
		);

		$("#certPinCode").text(
			data.pinCode || ""
		);

		$("#certBranchName").text(
			data.branchName || ""
		);

		$("#certSchemeType").text(
			data.schemeType || ""
		);

		$("#certSchemeName").text(
			data.schemeName || ""
		);

		$("#certSchemeCode").text(
			data.schemeCode || ""
		);

		$("#certSchemeTerm").text(
			data.schemeTerm || ""
		);

		$("#certSchemeMode").text(
			data.schemeMode || ""
		);

		$("#certROI").text(
			data.roi || ""
		);

		$("#certDepositAmount").text(
			data.depositAmount || ""
		);

		$("#certPaymentBy").text(
			data.paymentBy || ""
		);

		$("#certModeOfPayment").text(
			data.modeOfPayment || ""
		);

		$("#certNoOfInstallments").text(
			data.noOfInstallments || ""
		);

		$("#certJointMemberCode").text(
			data.jointMemCode.toUpperCase() || ""
		);

		$("#certJointName").text(
			data.jointName.toUpperCase() || ""
		);

		$("#certMISInterest").text(
			data.MISInterest || ""
		);

		$("#certRemark").text(
			data.remark || ""
		);

		$("#certAgent").text(
			data.agent || ""
		);

		if (data.jointName) {
			$("#jointMemberSection").show();
		} else {
			$("#jointMemberSection").hide();
		}

		$("#certificateTemplate").show();
	}

	function printCertificate(data) {

		if (!data) {
			alert("Policy data not available.");
			return;
		}

		fillCertificate(data);

		loadCompanyDetails(function() {

			var certificateHTML =
				$("#certificateTemplate").html();

			var printWindow =
				window.open(
					"",
					"",
					"width=1000,height=750"
				);

			if (!printWindow) {
				alert(
					"Please allow pop-ups to print the certificate."
				);
				return;
			}

			printWindow.document.open();

			printWindow.document.write(
				"<html>" +
				"<head>" +

				"<title>Policy Issue Certificate</title>" +

				"<style>" +

				"@page {" +
				"size: A4 portrait;" +
				"margin: 0;" +
				"}" +

				"* {" +
				"box-sizing: border-box;" +
				"}" +

				"html, body {" +
				"width: 210mm;" +
				"height: 297mm;" +
				"margin: 0;" +
				"padding: 0;" +
				"background: white;" +
				"}" +

				"body {" +
				"font-family: Arial, Helvetica, sans-serif;" +
				"overflow: hidden;" +
				"}" +

				"#certificateWrapper {" +
				"width: 210mm;" +
				"height: 297mm;" +
				"padding: 5mm;" +
				"overflow: hidden;" +
				"}" +

				"#certificateTemplate {" +
				"display: block !important;" +
				"width: 100% !important;" +
				"max-width: 100% !important;" +
				"margin: 0 !important;" +
				"padding: 5px !important;" +
				"zoom: 0.88;" +
				"}" +

				"#certificateTemplate table {" +
				"width: 100% !important;" +
				"}" +

				"#certificateTemplate td," +
				"#certificateTemplate th {" +
				"padding-top: 3px !important;" +
				"padding-bottom: 3px !important;" +
				"}" +

				"#certificateTemplate img {" +
				"max-height: 55px !important;" +
				"object-fit: contain !important;" +
				"}" +

				"</style>" +

				"</head>" +

				"<body>" +

				"<div id='certificateWrapper'>" +

				"<div id='certificateTemplate'>" +

				certificateHTML +

				"</div>" +

				"</div>" +

				"<script>" +

				"window.onload = function() {" +

				"setTimeout(function() {" +

				"window.focus();" +
				"window.print();" +

				"setTimeout(function() {" +
				"window.close();" +
				"}, 500);" +

				"}, 500);" +

				"};" +

				"</script>" +

				"</body>" +

				"</html>"
			);

			printWindow.document.close();
		});
	}

	$.ajax({

		url:
			"api/Policymangment/getApprovedPolicies",

		type: "GET",

		dataType: "json",

		success: function(response) {

			if (
				response.data &&
				response.data.length > 0
			) {

				var policySelect =
					$("#policyCode");

				policySelect
					.find("option:not(:first)")
					.remove();

				$.each(
					response.data,
					function(index, policy) {

						var policyCustomerName =
							policy.customerName ||
							"";

						var optionText =
							(policy.policyCode || "") +
							" - " +
							safeUpper(
								policyCustomerName
							);

						var option =
							$("<option></option>")
								.attr(
									"value",
									policy.policyCode || ""
								)
								.text(optionText);

						policySelect.append(
							option
						);
					}
				);
			}
		},

		error: function(xhr) {

			console.error(
				"Failed to load policies:",
				xhr
			);

			alert(
				"Failed to load policies."
			);
		}
	});

	$("#findBtn").click(function() {

		var policyCode =
			$("#policyCode").val();

		if (!policyCode) {

			$("#certificateTemplate").hide();

			$("#policyTableBody").empty();

			alert(
				"Please select a policy."
			);

			return;
		}

		$.ajax({

			url:
				"api/Policymangment/getPolicyByPolicyCode",

			type: "GET",

			data: {
				policyCode: policyCode
			},

			dataType: "json",

			success: function(response) {

				console.log(
					"Policy Response:",
					response
				);

				if (
					response.status === "OK" &&
					response.data
				) {

					var data =
						response.data;

					var clientName =
						data.clientName ||
						data.customerName ||
						"";

					var nominee =
						data.suggestedNominee ||
						"";

					var address =
						data.address ||
						"";

					$("#policyTableBody").empty();

					var newRow =
						"<tr>" +

						"<td>" +
						(data.policyCode || "") +
						"</td>" +

						"<td>" +
						safeUpper(clientName) +
						"</td>" +

						"<td>" +
						(data.policyAmount || "") +
						"</td>" +

						"<td>" +
						(data.maturityDate || "") +
						"</td>" +

						"<td>" +
						(data.maturityAmount || "") +
						"</td>" +

						"<td>" +
						(data.contactNo || "") +
						"</td>" +

						"<td>" +
						safeUpper(nominee) +
						"</td>" +

						"<td>" +
						safeUpper(address) +
						"</td>" +

						"<td>" +

						"<a href='#' " +
						"class='print-btn' " +
						"style='color:green;' " +
						"data-policy='" +

						JSON.stringify(data)
							.replace(
								/'/g,
								"&#39;"
							) +

						"'>" +

						"<i class='bi bi-printer-fill'></i>" +

						"</a>" +

						"</td>" +

						"</tr>";

					$("#policyTableBody")
						.append(newRow);

					fillCertificate(data);

					loadCompanyDetails();

					$(".print-btn")
						.off("click")
						.on(
							"click",
							function(e) {

								e.preventDefault();

								var policyData =
									$(this).data(
										"policy"
									);

								printCertificate(
									policyData
								);
							}
						);

				} else {

					alert(
						"No data found for the selected policy."
					);

					$("#policyTableBody")
						.empty();

					$("#certificateTemplate")
						.hide();
				}
			},

			error: function(xhr) {

				console.error(
					"Policy API Error:",
					xhr
				);

				alert(
					"Error while fetching policy data."
				);

				$("#policyTableBody")
					.empty();

				$("#certificateTemplate")
					.hide();
			}
		});
	});

	$.ajax({

		url:
			"api/Policymangment/getApprovedPolicies",

		type: "GET",

		dataType: "json",

		success: function(response) {

			if (
				response.status === "OK" &&
				response.data
			) {

				var tbody =
					$("#policyTableBody");

				tbody.empty();

				$.each(
					response.data,
					function(index, item) {

						var customerName =
							item.customerName ||
							"";

						var nominee =
							item.suggestedNominee ||
							"";

						var address =
							item.address ||
							"";

						var row =
							"<tr style=\"font-family:'Poppins',sans-serif;\">" +

							"<td>" +
							(item.policyCode || "") +
							"</td>" +

							"<td>" +
							safeUpper(customerName) +
							"</td>" +

							"<td>" +
							(item.policyAmount || "") +
							"</td>" +

							"<td>" +
							(item.maturityDate || "") +
							"</td>" +

							"<td>" +
							(item.maturityAmount || "") +
							"</td>" +

							"<td>" +
							(item.contactNo || "") +
							"</td>" +

							"<td>" +
							safeUpper(nominee) +
							"</td>" +

							"<td>" +
							safeUpper(address) +
							"</td>" +

							"<td>" +

							"<a href='#' " +
							"class='print-btn' " +
							"style='color:green;' " +
							"data-policy='" +

							JSON.stringify(item)
								.replace(
									/'/g,
									"&#39;"
								) +

							"'>" +

							"<i class='bi bi-printer-fill'></i>" +

							"</a>" +

							"</td>" +

							"</tr>";

						tbody.append(row);
					}
				);

				$(".print-btn")
					.off("click")
					.on(
						"click",
						function(e) {

							e.preventDefault();

							var policyData =
								$(this).data(
									"policy"
								);

							$("#certificateTemplate")
								.show();

							printCertificate(
								policyData
							);
						}
					);

			} else {

				$(".datatable tbody").html(

					"<tr>" +

					"<td colspan='11' " +
					"class='text-center'>" +

					"No data available" +

					"</td>" +

					"</tr>"
				);
			}
		},

		error: function(
			xhr,
			status,
			error
		) {

			console.error(
				"Error fetching policies:",
				error
			);

			alert(
				"Failed to load financial consultant data."
			);
		}
	});

});