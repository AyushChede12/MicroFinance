
/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let allCustomers = [];
let companyDetails = null;


/* =========================================================
   COMMON HELPERS
========================================================= */

function reportText(value) {
	if (value === null || value === undefined ||
		String(value).trim() === "") {
		return "N/A";
	}

	return String(value).trim().toUpperCase();
}

function setReportValue(selector, value) {
	$(selector).text(reportText(value));
}

function getCustomerFullName(customer) {
	const fullName = [
		customer.firstName,
		customer.middleName,
		customer.lastName
	].filter(function(name) {
		return name !== null &&
			name !== undefined &&
			String(name).trim() !== "";
	}).map(function(name) {
		return String(name).trim();
	}).join(" ");

	return fullName || customer.customerName || "N/A";
}

function extractCustomerArray(response) {
	if (Array.isArray(response)) return response;
	if (response && Array.isArray(response.data)) return response.data;
	if (response && Array.isArray(response.content)) return response.content;
	if (response && Array.isArray(response.customers)) return response.customers;

	if (response && response.data &&
		Array.isArray(response.data.content)) {
		return response.data.content;
	}

	return null;
}

function extractCompanyArray(response) {
	if (Array.isArray(response)) return response;
	if (response && Array.isArray(response.data)) return response.data;

	if (response && response.data &&
		Array.isArray(response.data.content)) {
		return response.data.content;
	}

	if (response && Array.isArray(response.content)) {
		return response.content;
	}

	return [];
}

function getApprovalStatus(value) {
	if (
		value === true ||
		value === 1 ||
		String(value).toLowerCase() === "true" ||
		String(value) === "1"
	) {
		return "APPROVED";
	}

	if (
		value === false ||
		value === 0 ||
		String(value).toLowerCase() === "false" ||
		String(value) === "0"
	) {
		return "NOT APPROVED";
	}

	return "N/A";
}

function getCompanyAddress(company) {
	if (!company) return "OFFICIAL CUSTOMER RECORD";

	return company.companyAddress ||
		company.address ||
		company.companyLocation ||
		"OFFICIAL CUSTOMER RECORD";
}

function getUploadUrl(fileName) {
	if (!fileName) return "";

	const file = String(fileName).trim();

	if (/^https?:\/\//i.test(file)) {
		return file;
	}

	const contextPath = window.location.pathname.split("/")[1];
	const basePath = contextPath
		? window.location.origin + "/" + contextPath + "/Uploads/"
		: window.location.origin + "/Uploads/";

	return basePath + file.replace(/^\/+/, "");
}

function setReportImage(selector, url, fallbackUrl) {
	$(selector)
		.off("error.customerReport")
		.attr("src", url || fallbackUrl)
		.on("error.customerReport", function() {
			$(this)
				.off("error.customerReport")
				.attr("src", fallbackUrl);
		});
}

function formatCurrentDate() {
	return new Date().toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).toUpperCase();
}


/* =========================================================
   LOAD COMPANY AND CUSTOMER DATA
========================================================= */

$(document).ready(function() {

	$.ajax({
		url: "api/preference/fetchAllCompanyAdministration",
		type: "GET",
		dataType: "json",

		success: function(response) {
			const companies = extractCompanyArray(response);

			companyDetails = companies.length ? companies[0] : null;

			if (companyDetails) {
				setReportValue("#bankName", companyDetails.companyName);
				setReportValue(
					"#reportTitle",
					companyDetails.shortName || "CUSTOMER KYC PROFILE"
				);
				setReportValue("#companyAddress", getCompanyAddress(companyDetails));
			}
		},

		error: function(xhr) {
			console.error("COMPANY DETAILS API FAILED:", xhr.responseText);

			setReportValue("#bankName", "COMPANY NAME");
			setReportValue("#reportTitle", "CUSTOMER KYC PROFILE");
			setReportValue("#companyAddress", "OFFICIAL CUSTOMER RECORD");
		}
	});


	$.ajax({
		url: "api/customermanagement/getAllCustomer",
		type: "GET",
		dataType: "json",

		success: function(response) {
			const customers = extractCustomerArray(response);

			if (!customers) {
				console.error("UNEXPECTED CUSTOMER API RESPONSE:", response);
				alert("UNABLE TO LOAD CUSTOMER DATA. PLEASE CHECK API RESPONSE.");
				return;
			}

			allCustomers = customers;
			populateTable(allCustomers);
		},

		error: function(xhr) {
			console.error("CUSTOMER API FAILED:", xhr.responseText);
			alert("FAILED TO FETCH CUSTOMER DATA.");
		}
	});


	/* BRANCH AND DATE SEARCH */

	$("#searchBtn")
		.off("click.customerSearch")
		.on("click.customerSearch", function(e) {
			e.preventDefault();

			const selectedBranch = $("#branchName").val();
			const fromDate = $("#fromDate").val();
			const toDate = $("#toDate").val();

			if (!selectedBranch || !fromDate || !toDate) {
				alert("PLEASE SELECT BRANCH, FROM DATE, AND TO DATE.");
				return;
			}

			const from = new Date(fromDate + "T00:00:00");
			const to = new Date(toDate + "T23:59:59.999");

			if (from > to) {
				alert("FROM DATE CANNOT BE GREATER THAN TO DATE.");
				return;
			}

			const filtered = allCustomers.filter(function(customer) {
				if (!customer || !customer.branchName || !customer.signupDate) {
					return false;
				}

				const registrationDate = new Date(customer.signupDate);

				return !isNaN(registrationDate.getTime()) &&
					String(customer.branchName).trim() ===
					String(selectedBranch).trim() &&
					registrationDate >= from &&
					registrationDate <= to;
			});

			populateTable(filtered);
		});
});


/* =========================================================
   CUSTOMER TABLE
========================================================= */

function populateTable(data) {
	const tbody = $(".datatable tbody");
	tbody.empty();

	if (!Array.isArray(data) || data.length === 0) {
		tbody.append(
			$("<tr></tr>").append(
				$("<td></td>")
					.attr("colspan", 13)
					.addClass("text-center")
					.text("NO MATCHING RECORDS FOUND.")
			)
		);
		return;
	}

	data.forEach(function(customer, index) {
		const approved = getApprovalStatus(customer.approved) === "APPROVED"
			? "YES"
			: "NO";

		const tr = $("<tr></tr>");

		[
			index + 1,
			reportText(customer.memberCode),
			reportText(getCustomerFullName(customer)),
			reportText(customer.branchName),
			reportText(customer.dob),
			reportText(customer.nomineeName),
			reportText(customer.customerAddress),
			reportText(customer.contactNo),
			reportText(customer.aadharNo),
			reportText(customer.panNo),
			reportText(customer.signupDate),
			approved
		].forEach(function(value) {
			$("<td></td>").text(value).appendTo(tr);
		});

		const button = $("<button></button>")
			.attr("type", "button")
			.addClass("btn btn-outline-success btn-sm bankReportBtn")
			.attr("data-id", customer.id)
			.attr("title", "VIEW CUSTOMER REPORT")
			.append(
				$("<i></i>").addClass("bi bi-printer")
			);

		$("<td></td>").append(button).appendTo(tr);
		tbody.append(tr);
	});
}


/* =========================================================
   FILL CUSTOMER REPORT
========================================================= */

$(document)
	.off("click.customerReport", ".bankReportBtn")
	.on("click.customerReport", ".bankReportBtn", function(e) {
		e.preventDefault();

		const id = String($(this).attr("data-id") || "");

		const customer = allCustomers.find(function(item) {
			return item && String(item.id) === id;
		});

		if (!customer) {
			alert("CUSTOMER NOT FOUND.");
			return;
		}

		const customerName = getCustomerFullName(customer);

		setReportValue("#reportGeneratedDate", formatCurrentDate());

		setReportValue(
			"#bankName",
			companyDetails && companyDetails.companyName
				? companyDetails.companyName
				: "COMPANY NAME"
		);

		setReportValue(
			"#reportTitle",
			companyDetails && companyDetails.shortName
				? companyDetails.shortName
				: "CUSTOMER KYC PROFILE"
		);

		setReportValue("#companyAddress", getCompanyAddress(companyDetails));

		/* PROFILE SUMMARY */

		setReportValue("#customerCode", customer.memberCode);
		setReportValue("#customerName", customerName);
		setReportValue("#detailBranch", customer.branchName);
		setReportValue("#signupDate", customer.signupDate);
		setReportValue("#customerApprovalStatus", getApprovalStatus(customer.approved));
		setReportValue("#dob", customer.dob);

		/* PERSONAL INFORMATION */

		setReportValue("#detailCustomerName", customerName);
		setReportValue("#detailCustomerCode", customer.memberCode);
		setReportValue("#detailGender", customer.customerGender);
		setReportValue("#detailDob", customer.dob);
		setReportValue("#detailAge", customer.customerAge);
		setReportValue("#detailMaritalStatus", customer.relationshipStatus);
		setReportValue("#detailNominee", customer.nomineeName);
		setReportValue("#detailBranchName", customer.branchName);

		/* CONTACT INFORMATION */

		setReportValue("#detailContactNo", customer.contactNo);
		setReportValue("#detailEmail", customer.emailId);
		setReportValue("#detailAddress", customer.customerAddress);
		setReportValue("#detailState", customer.state);
		setReportValue("#detailDistrict", customer.district);
		setReportValue("#detailPincode", customer.pinCode);

		/* KYC INFORMATION */

		setReportValue("#detailAadhar", customer.aadharNo);
		setReportValue("#detailPan", customer.panNo);
		setReportValue("#detailVoter", customer.voterNo);
		setReportValue("#detailDriving", customer.drivingLicenceNo);

		/* PHOTO AND SIGNATURE */

		const photoFallback =
			"https://placehold.co/120x140?text=PHOTO";

		const signatureFallback =
			"https://placehold.co/220x70?text=SIGNATURE";

		const photoUrl = getUploadUrl(customer.customerPhoto);
		const signatureUrl = getUploadUrl(customer.customerSignature);

		setReportImage(
			"#photoPreviewLarge",
			photoUrl,
			photoFallback
		);

		setReportImage(
			"#signaturePreview",
			signatureUrl,
			signatureFallback
		);

		$("#bankReportModal").modal("show");
	});


/* =========================================================
   GET REPORT HTML
========================================================= */

function getCustomerReportHtml() {
	const report = document.getElementById("customerKycReport");

	if (!report) {
		alert("CUSTOMER REPORT NOT FOUND.");
		return null;
	}

	return report;
}


/* =========================================================
   WAIT FOR REPORT IMAGES
========================================================= */

function waitForReportImages(container) {
	const images = Array.from(container.querySelectorAll("img"));

	return Promise.all(images.map(function(img) {
		if (img.complete) {
			return Promise.resolve();
		}

		return new Promise(function(resolve) {
			img.onload = resolve;
			img.onerror = resolve;

			/* Do not wait forever for a missing image. */
			setTimeout(resolve, 2500);
		});
	}));
}


/* =========================================================
   PDF EXPORT — FIT TO ONE A4 LANDSCAPE PAGE
========================================================= */

$(document)
	.off("click.customerReportPDF", "#downloadPDF")
	.on("click.customerReportPDF", "#downloadPDF", async function(e) {
		e.preventDefault();

		const report = getCustomerReportHtml();
		if (!report) return;

		const printWindow = window.open("", "_blank");

		if (!printWindow) {
			alert("PLEASE ALLOW POP-UPS TO SAVE THE PDF.");
			return;
		}

		const clonedReport = report.cloneNode(true);

		const printHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Customer KYC Report</title>
                <style>
                    @page {
                        size: A4 landscape;
                        margin: 5mm;
                    }

                    * {
                        box-sizing: border-box;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    html, body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        font-family: Arial, Helvetica, sans-serif;
                    }

                    body {
                        overflow: hidden;
                    }

                    #printWrapper {
                        width: 100%;
                        overflow: visible;
                    }

                    .bank-report-page {
                        width: 1100px;
                        max-width: none;
                        margin: 0;
                        padding: 10px;
                        background: white;
                        color: #243449;
                        font-size: 10px;
                        line-height: 1.15;
                    }

                    .kyc-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 15px;
                        padding-bottom: 7px;
                    }

                    .kyc-company h1 {
                        font-size: 21px;
                        margin: 0 0 3px;
                    }

                    .kyc-company p,
                    .kyc-report-heading p {
                        font-size: 9px;
                        margin: 2px 0;
                    }

                    .kyc-report-heading h2 {
                        font-size: 14px;
                        margin: 0 0 3px;
                    }

                    .kyc-top-line {
                        height: 4px;
                        margin-bottom: 8px;
                        background: linear-gradient(90deg, #123b68, #147d68);
                    }

                    .kyc-profile {
                        display: grid;
                        grid-template-columns: 95px minmax(0, 1fr);
                        gap: 10px;
                        margin-bottom: 7px;
                    }

                    .kyc-photo-box {
                        border: 1px solid #d7e0e9;
                        padding: 4px;
                        text-align: center;
                    }

                    .kyc-photo-box img {
                        width: 78px;
                        height: 82px;
                        object-fit: contain;
                    }

                    .kyc-photo-caption {
                        font-size: 7px;
                    }

                    .kyc-section {
                        margin-top: 7px;
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    .kyc-section-title {
                        background: #eaf1f7;
                        border-left: 4px solid #147d68;
                        color: #123b68;
                        padding: 5px 7px;
                        font-size: 9px;
                        margin-bottom: 5px;
                    }

                    .kyc-summary-grid,
                    .kyc-grid {
                        display: grid;
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                        gap: 4px;
                    }

                    .kyc-summary-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }

                    .kyc-item {
                        border: 1px solid #dce4ec;
                        padding: 4px 5px;
                        min-width: 0;
                    }

                    .kyc-item span,
                    .kyc-label {
                        display: block;
                        font-size: 7px;
                        margin-bottom: 2px;
                        color: #66758a;
                    }

                    .kyc-item strong {
                        display: block;
                        font-size: 8px;
                        overflow-wrap: anywhere;
                        word-break: break-word;
                    }

                    .kyc-item-wide {
                        grid-column: span 2;
                    }

                    .kyc-bottom {
                        display: grid;
                        grid-template-columns: 160px minmax(0, 1fr);
                        gap: 10px;
                        margin-top: 8px;
                        align-items: end;
                    }

                    .kyc-signature-area,
                    .kyc-declaration {
                        border: 1px solid #dce4ec;
                        padding: 5px;
                    }

                    .kyc-signature-area img {
                        display: block;
                        width: 130px;
                        height: 35px;
                        object-fit: contain;
                    }

                    .kyc-declaration,
                    .kyc-declaration strong {
                        font-size: 8px;
                    }

                    .kyc-declaration p {
                        margin: 3px 0 0;
                    }

                    .kyc-footer {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 7px;
                        padding-top: 5px;
                        border-top: 1px solid #cbd5df;
                        font-size: 7px;
                    }

                    @media print {
                        html, body {
                            width: 100%;
                            height: auto;
                            margin: 0;
                            padding: 0;
                        }
                    }
                </style>
            </head>
            <body>
                <div id="printWrapper"></div>
            </body>
            </html>
        `;

		printWindow.document.open();
		printWindow.document.write(printHtml);
		printWindow.document.close();

		await new Promise(function(resolve) {
			printWindow.addEventListener("load", resolve, { once: true });
			setTimeout(resolve, 500);
		});

		const wrapper = printWindow.document.getElementById("printWrapper");
		wrapper.appendChild(clonedReport);

		await waitForReportImages(wrapper);

		/*
		 * Approximate printable A4 landscape area at 96 DPI.
		 * Shrink the report when its content is too large.
		 */
		const page = wrapper.querySelector(".bank-report-page");

		page.style.zoom = "1";

		const availableWidth = 1080;
		const availableHeight = 730;

		const reportWidth = page.scrollWidth;
		const reportHeight = page.scrollHeight;

		const scale = Math.min(
			1,
			availableWidth / reportWidth,
			availableHeight / reportHeight
		);

		page.style.zoom = String(scale);

		printWindow.focus();

		setTimeout(function() {
			printWindow.print();
		}, 350);
	});


/* =========================================================
   WORD EXPORT — COMPACT A4 LANDSCAPE DOCUMENT
   Exports a Word-compatible .doc file.
========================================================= */

$(document)
	.off("click.customerReportWord", "#downloadWord")
	.on("click.customerReportWord", "#downloadWord", async function(e) {
		e.preventDefault();

		const report = getCustomerReportHtml();
		if (!report) return;

		const clone = report.cloneNode(true);

		await waitForReportImages(clone);

		const wordHtml = `
            <!DOCTYPE html>
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word"
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta charset="UTF-8">
                <title>Customer KYC Report</title>
                <!--[if gte mso 9]>
                <xml>
                    <w:WordDocument>
                        <w:View>Print</w:View>
                        <w:DoNotOptimizeForBrowser/>
                    </w:WordDocument>
                </xml>
                <![endif]-->
                <style>
                    @page Section1 {
                        size: 841.9pt 595.3pt;
                        mso-page-orientation: landscape;
                        margin: 14pt 14pt 14pt 14pt;
                    }

                    div.Section1 {
                        page: Section1;
                    }

                    body {
                        font-family: Arial, sans-serif;
                        font-size: 8pt;
                        color: #243449;
                    }

                    .bank-report-page {
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        font-size: 8pt;
                        line-height: 1.05;
                    }

                    .kyc-header {
                        width: 100%;
                        border-bottom: 3px solid #147d68;
                        padding-bottom: 5pt;
                    }

                    .kyc-company h1 {
                        font-size: 17pt;
                        color: #123b68;
                        margin: 0 0 3pt;
                    }

                    .kyc-company p,
                    .kyc-report-heading p {
                        font-size: 7pt;
                        margin: 2pt 0;
                    }

                    .kyc-report-heading h2 {
                        font-size: 12pt;
                        color: #147d68;
                        margin: 0 0 3pt;
                    }

                    .kyc-section {
                        margin-top: 5pt;
                        page-break-inside: avoid;
                    }

                    .kyc-section-title {
                        background: #eaf1f7;
                        color: #123b68;
                        border-left: 3px solid #147d68;
                        padding: 4pt;
                        font-size: 8pt;
                        font-weight: bold;
                        margin-bottom: 3pt;
                    }

                    .kyc-item {
                        border: 1px solid #dce4ec;
                        padding: 3pt;
                    }

                    .kyc-item span {
                        display: block;
                        font-size: 6pt;
                        color: #66758a;
                    }

                    .kyc-item strong {
                        font-size: 7pt;
                        overflow-wrap: anywhere;
                    }

                    .kyc-photo-box img {
                        width: 65pt;
                        height: 70pt;
                    }

                    .kyc-signature-area img {
                        width: 100pt;
                        height: 28pt;
                    }

                    .kyc-footer {
                        border-top: 1px solid #cbd5df;
                        padding-top: 4pt;
                        margin-top: 5pt;
                        font-size: 6pt;
                    }
                </style>
            </head>
            <body>
                <div class="Section1">${clone.outerHTML}</div>
            </body>
            </html>
        `;

		const blob = new Blob(
			["\ufeff", wordHtml],
			{ type: "application/msword" }
		);

		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = url;
		link.download = "Customer_KYC_Report.doc";

		document.body.appendChild(link);
		link.click();
		link.remove();

		setTimeout(function() {
			URL.revokeObjectURL(url);
		}, 1500);
	});


/* =========================================================
   EXCEL EXPORT — REAL XLSX WORKBOOK
   Complete details + fit-to-one-page print settings.
========================================================= */

$(document)
	.off("click.customerReportExcel", "#downloadExcel")
	.on("click.customerReportExcel", "#downloadExcel", function(e) {
		e.preventDefault();

		if (typeof XLSX === "undefined") {
			alert("EXCEL LIBRARY NOT LOADED. PLEASE CHECK YOUR INTERNET CONNECTION.");
			return;
		}

		const report = getCustomerReportHtml();
		if (!report) return;

		const customer = allCustomers.find(function(item) {
			return item &&
				reportText(item.memberCode) ===
				reportText($("#detailCustomerCode").text());
		});

		if (!customer) {
			alert("CUSTOMER RECORD NOT FOUND FOR EXCEL EXPORT.");
			return;
		}

		const rows = [
			[reportText(companyDetails && companyDetails.companyName)],
			[reportText(getCompanyAddress(companyDetails))],
			["CUSTOMER KYC PROFILE"],
			["REPORT GENERATED", formatCurrentDate()],
			[],
			["PERSONAL INFORMATION", "DETAILS"],
			["CUSTOMER NAME", getCustomerFullName(customer)],
			["MEMBER CODE", customer.memberCode],
			["BRANCH NAME", customer.branchName],
			["DATE OF BIRTH", customer.dob],
			["AGE", customer.customerAge],
			["GENDER", customer.customerGender],
			["MARITAL STATUS", customer.relationshipStatus],
			["NOMINEE NAME", customer.nomineeName],
			["REGISTRATION DATE", customer.signupDate],
			["APPROVAL STATUS", getApprovalStatus(customer.approved)],
			[],
			["CONTACT INFORMATION", "DETAILS"],
			["MOBILE NUMBER", customer.contactNo],
			["EMAIL ADDRESS", customer.emailId],
			["RESIDENTIAL ADDRESS", customer.customerAddress],
			["STATE", customer.state],
			["DISTRICT", customer.district],
			["PIN CODE", customer.pinCode],
			[],
			["KYC DOCUMENT DETAILS", "DETAILS"],
			["AADHAAR NUMBER", customer.aadharNo],
			["PAN NUMBER", customer.panNo],
			["VOTER ID", customer.voterNo],
			["DRIVING LICENCE", customer.drivingLicenceNo],
			[],
			["DECLARATION"],
			["This report contains customer information available in the system."]
		];

		const worksheet = XLSX.utils.aoa_to_sheet(rows);

		worksheet["!cols"] = [
			{ wch: 28 },
			{ wch: 48 }
		];

		worksheet["!merges"] = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
			{ s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
			{ s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
			{ s: { r: 30, c: 0 }, e: { r: 30, c: 1 } },
			{ s: { r: 31, c: 0 }, e: { r: 31, c: 1 } }
		];

		/*
		 * Page setup for printing the worksheet on one page.
		 * The XLSX sheet remains a normal editable worksheet.
		 */
		worksheet["!pageSetup"] = {
			orientation: "landscape",
			paperSize: 9,
			fitToWidth: 1,
			fitToHeight: 1,
			scale: 85
		};

		worksheet["!sheetPr"] = {
			pageSetUpPr: {
				fitToPage: true,
				autoPageBreaks: false
			}
		};

		worksheet["!margins"] = {
			left: 0.2,
			right: 0.2,
			top: 0.3,
			bottom: 0.3,
			header: 0.1,
			footer: 0.1
		};

		const workbook = XLSX.utils.book_new();

		XLSX.utils.book_append_sheet(
			workbook,
			worksheet,
			"CUSTOMER KYC"
		);

		XLSX.writeFile(
			workbook,
			"Customer_KYC_Report.xlsx"
		);
	});
