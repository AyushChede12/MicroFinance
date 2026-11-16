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
		return "Uploads/company/" + logoId + "/" + fileName;
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
				var images = response;
				if (response && response.data) {
					images = response.data;
				}
				if (!Array.isArray(images)) {
					images = [];
				}
				var logoImage = null;
				$.each(images, function(index, image) {
					if (image.name && String(image.name).toLowerCase() === "logo") {
						logoImage = image;
						return false;
					}
				});
				if (!logoImage && images.length > 0) {
					logoImage = images[0];
				}
				if (logoImage && logoImage.fileName) {
					var logoUrl = getLogoUrl(companyId, logoImage.id, logoImage.fileName);
					$("#certCompanyLogo").attr("src", logoUrl);
				} else {
					$("#certCompanyLogo").attr("src", "images/logo.png");
				}
				if (typeof callback === "function") {
					callback(logoImage);
				}
			},
			error: function() {
				$("#certCompanyLogo").attr("src", "images/logo.png");
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
			success: function(response) {
				var company = response;
				if (response && response.data) {
					company = response.data;
				}
				if (company) {
					var companyName = safeUpper(company.companyName || "MICROFINANCE SERVICES");
					var address = safeUpper(company.registeredOfficeAddress || company.corporateOfficeAddress || "YOUR COMPANY ADDRESS");
					var contact = safeUpper(company.primaryContactNumber || "CONTACT NO.");
					var gstin = safeUpper(company.gstin || "GSTIN");
					var cin = safeUpper(company.cin || "");
					var pan = safeUpper(company.pan || "");

					$("#certCompanyName").text(companyName);
					$("#certCompanyAddress").text(address);
					$("#certCompanyContact").text(contact);
					$("#certCompanyGstin").text(gstin);
					$("#certCompanyCin").text(cin);
					$("#certCompanyPan").text(pan);
					$("#certFooterCompanyName").html(companyName + " &nbsp;|&nbsp; VALID WITHOUT SEAL ONLY WHERE DIGITALLY VERIFIED");

					loadCompanyLogo(company.id, function() {
						if (typeof callback === "function") {
							callback(company);
						}
					});
				} else {
					if (typeof callback === "function") {
						callback(null);
					}
				}
			},
			error: function() {
				if (typeof callback === "function") {
					callback(null);
				}
			}
		});
	}

	function fillCertificate(data) {
		var clientName = data.customerName || "";
		var nominee = data.nominee || "";
		var address = data.address || "";

		$("#certClientName").text(safeUpper(clientName));
		$("#certPolicyCode").text(safeUpper(data.policyCode || ""));
		$("#certPolicyAmount").text("₹ " + (data.policyAmount || "0.00"));
		$("#certMaturityAmount").text("₹ " + (data.maturityAmount || "0.00"));
		$("#certMaturityDate").text(safeUpper(data.maturityDate || ""));
		$("#certContact").text(safeUpper(data.contactNo || ""));
		$("#certNominee").text(safeUpper(nominee));
		$("#certAddress").text(safeUpper(address));

		if (data.jointName) {
			$("#certJointMemberCode").text(safeUpper(data.jointMemberCode || ""));
			$("#certJointName").text(safeUpper(data.jointName || ""));
			$("#jointMemberSection").show();
		} else {
			$("#jointMemberSection").hide();
		}

		$("#certificateTemplate").show();
	}

	function printCertificate(data) {
		if (!data) {
			alert("POLICY DATA NOT AVAILABLE.");
			return;
		}

		fillCertificate(data);

		loadCompanyDetails(function() {
			var certificateHTML = $("#certificateTemplate").html();
			var printWindow = window.open("", "", "width=1000,height=750");

			if (!printWindow) {
				alert("PLEASE ALLOW POP-UPS TO PRINT THE CERTIFICATE.");
				return;
			}

			printWindow.document.open();
			printWindow.document.write(
				"<!DOCTYPE html>" +
				"<html>" +
				"<head>" +
				"<title>POLICY RE-ISSUE CERTIFICATE</title>" +
				"<style>" +
				"@page { size: A4 portrait; margin: 0; }" +
				"* { box-sizing: border-box; }" +
				"html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; background: #ffffff; font-family: Arial, Helvetica, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }" +
				"</style>" +
				"</head>" +
				"<body>" +
				certificateHTML +
				"<script>" +
				"window.onload = function() { window.focus(); window.print(); window.close(); };" +
				"<\/script>" +
				"</body>" +
				"</html>"
			);
			printWindow.document.close();
		});
	}

	// 1. Populate dropdown with approved policies
	$.ajax({
		url: "api/Policymangment/getApprovedPolicies",
		type: "GET",
		dataType: "json",
		success: function(response) {
			var policies = response;
			if (response && response.data) {
				policies = response.data;
			}
			if (!Array.isArray(policies)) {
				policies = [];
			}
			var $dropdown = $("#policyCode");
			$dropdown.empty();
			$dropdown.append('<option value="">SELECT POLICY CODE</option>');

			$.each(policies, function(index, item) {
				var code = item.policyCode || "";
				var name = item.customerName || "";
				if (code) {
					$dropdown.append(
						$("<option>", {
							value: code,
							text: code + " - " + safeUpper(name)
						})
					);
				}
			});
		},
		error: function() {
			alert("FAILED TO LOAD POLICIES.");
		}
	});

	// 2. Search policy button
	$("#findBtn").click(function() {
		var policyCode = $("#policyCode").val();

		if (!policyCode) {
			$("#certificateTemplate").hide();
			$("#policyTableBody").empty();
			alert("PLEASE SELECT A POLICY.");
			return;
		}

		$.ajax({
			url: "api/Policymangment/getPolicyByPolicyCode",
			type: "GET",
			data: { policyCode: policyCode },
			dataType: "json",
			success: function(response) {
				if (response && response.status === "OK" && response.data) {
					var data = response.data;
					var clientName = data.customerName || "";
					var nominee = data.nominee || "";
					var address = data.address || "";

					$("#policyTableBody").empty();

					var newRow =
						"<tr>" +
						"<td>" + (data.policyCode || "") + "</td>" +
						"<td>" + safeUpper(clientName) + "</td>" +
						"<td>" + (data.policyAmount || "") + "</td>" +
						"<td>" + (data.maturityDate || "") + "</td>" +
						"<td>" + (data.maturityAmount || "") + "</td>" +
						"<td>" + (data.contactNo || "") + "</td>" +
						"<td>" + safeUpper(nominee) + "</td>" +
						"<td>" + safeUpper(address) + "</td>" +
						"<td>" +
						"<a href='#' class='print-btn' style='color:green;' data-policy='" +
						JSON.stringify(data).replace(/'/g, "&#39;") +
						"'>" +
						"<i class='bi bi-printer-fill'></i>" +
						"</a>" +
						"</td>" +
						"</tr>";

					$("#policyTableBody").append(newRow);

					fillCertificate(data);
					loadCompanyDetails();

					$(".print-btn").off("click").on("click", function(e) {
						e.preventDefault();
						var policyData = $(this).data("policy");
						printCertificate(policyData);
					});

				} else {
					alert("NO DATA FOUND FOR THE SELECTED POLICY.");
					$("#policyTableBody").empty();
					$("#certificateTemplate").hide();
				}
			},
			error: function() {
				alert("ERROR WHILE FETCHING POLICY DATA.");
				$("#policyTableBody").empty();
				$("#certificateTemplate").hide();
			}
		});
	});

});

