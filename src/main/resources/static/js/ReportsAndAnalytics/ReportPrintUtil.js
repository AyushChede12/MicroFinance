var ReportPrintUtil = (function() {
	let companyDetails = {
		companyName: "CO OPERATIVE SOCIETY LTD NAGPUR",
		shortName: "MF",
		address: "RESHIMBAGH",
		city: "NAGPUR",
		state: "MAHARASHTRA",
		pinCode: "440025",
		cinNo: "MICRO@4521",
		pan: "JHDGE4255W",
		gstin: "202502212020",
		emailId: "MF@GMAIL.COM",
		helplineNo: "9855412556",
		branchManagerContactNo: "9662256630"
	};
	let isLoaded = false;
	let callbacks = [];

	function fetchCompanyDetails(cb) {
		if (isLoaded) {
			if (cb) cb(companyDetails);
			return;
		}
		if (cb) callbacks.push(cb);
		if (callbacks.length > 1) return;

		$.ajax({
			url: "api/preference/getCompanyDetails",
			type: "GET",
			dataType: "json",
			success: function(res) {
				if (res) {
					if (res.companyName || res.shortName) companyDetails.companyName = (res.companyName || res.shortName).trim().toUpperCase();
					if (res.shortName) companyDetails.shortName = res.shortName.trim().toUpperCase();
					if (res.address) companyDetails.address = res.address.trim().toUpperCase();
					if (res.city) companyDetails.city = res.city.trim().toUpperCase();
					if (res.state) companyDetails.state = res.state.trim().toUpperCase();
					if (res.pinCode) companyDetails.pinCode = res.pinCode.trim();
					if (res.cinNo) companyDetails.cinNo = res.cinNo.trim().toUpperCase();
					if (res.pan) companyDetails.pan = res.pan.trim().toUpperCase();
					if (res.gstin) companyDetails.gstin = res.gstin.trim().toUpperCase();
					if (res.emailId) companyDetails.emailId = res.emailId.trim().toUpperCase();
					if (res.helplineNo) companyDetails.helplineNo = res.helplineNo.trim();
					if (res.branchManagerContactNo) companyDetails.branchManagerContactNo = res.branchManagerContactNo.trim();
				}
				isLoaded = true;
				callbacks.forEach(function(fn) { if (fn) fn(companyDetails); });
				callbacks = [];
			},
			error: function(err) {
				console.warn("COULD NOT FETCH COMPANY DETAILS, USING FALLBACK:", err);
				isLoaded = true;
				callbacks.forEach(function(fn) { if (fn) fn(companyDetails); });
				callbacks = [];
			}
		});
	}

	$(document).ready(function() {
		fetchCompanyDetails();
	});

	function getHeaderHtml(reportTitle, subTitle) {
		let title = (reportTitle || "REPORT").toUpperCase();
		let sub = subTitle ? `<div style="font-size: 12px; font-weight: 600; margin-top: 4px; color: #555; text-transform: uppercase;">${subTitle.toUpperCase()}</div>` : '';
		let fullAddr = [companyDetails.address, companyDetails.city, companyDetails.state].filter(Boolean).join(", ");
		if (companyDetails.pinCode) fullAddr += " - " + companyDetails.pinCode;

		return `
			<div class="print-header" style="text-align: center; margin-bottom: 20px; font-family: Arial, sans-serif;">
				<div style="font-size: 20px; font-weight: bold; color: #002147; letter-spacing: 0.5px; text-transform: uppercase;">
					${companyDetails.companyName}
				</div>
				<div style="font-size: 12px; margin-top: 3px; color: #222; text-transform: uppercase;">
					${fullAddr}
				</div>
				<div style="font-size: 11px; margin-top: 3px; color: #555; text-transform: uppercase;">
					CIN: ${companyDetails.cinNo} &nbsp;|&nbsp; PAN: ${companyDetails.pan} &nbsp;|&nbsp; GSTIN: ${companyDetails.gstin} &nbsp;|&nbsp; HELPLINE: ${companyDetails.helplineNo} &nbsp;|&nbsp; EMAIL: ${companyDetails.emailId}
				</div>
				<div style="border-bottom: 2px solid #002147; margin-top: 10px; margin-bottom: 10px;"></div>
				<div style="font-size: 16px; font-weight: bold; color: #002147; text-transform: uppercase; letter-spacing: 0.5px;">
					${title}
				</div>
				${sub}
			</div>
		`;
	}

	function getFooterHtml() {
		let printedOn = new Date().toLocaleString("en-GB").toUpperCase();
		return `
			<div class="print-footer" style="margin-top: 50px; font-family: Arial, sans-serif;">
				<div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 20px;">
					<div style="text-align: center; width: 220px;">
						<div style="border-top: 1px solid #333; padding-top: 5px; font-weight: bold; font-size: 12px; text-transform: uppercase;">
							PREPARED / VERIFIED BY
						</div>
					</div>
					<div style="text-align: center; width: 220px;">
						<div style="border-top: 1px solid #333; padding-top: 5px; font-weight: bold; font-size: 12px; text-transform: uppercase;">
							BRANCH MANAGER
						</div>
					</div>
					<div style="text-align: center; width: 220px;">
						<div style="border-top: 1px solid #333; padding-top: 5px; font-weight: bold; font-size: 12px; text-transform: uppercase;">
							AUTHORIZED SIGNATORY
						</div>
					</div>
				</div>
				<div style="font-size: 10px; color: #777; margin-top: 25px; text-align: center; text-transform: uppercase; border-top: 1px dashed #ccc; padding-top: 5px;">
					THIS IS A COMPUTER-GENERATED OFFICIAL BANK STATEMENT / REPORT &nbsp;|&nbsp; PRINTED ON: ${printedOn}
				</div>
			</div>
		`;
	}

	function printHtml(title, innerContent, subTitle) {
		fetchCompanyDetails(function() {
			let win = window.open('', '', 'width=1000,height=800');
			win.document.write(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>${(title || 'BANK REPORT').toUpperCase()}</title>
					<style>
						@page { size: auto; margin: 15mm; }
						body {
							font-family: Arial, sans-serif;
							margin: 0;
							padding: 15px;
							color: #111;
							background: #fff;
						}
						table {
							width: 100%;
							border-collapse: collapse;
							margin-top: 10px;
							margin-bottom: 10px;
							font-size: 12px;
						}
						th, td {
							border: 1px solid #333 !important;
							padding: 6px 8px;
							text-align: left;
						}
						th {
							background-color: #f2f2f2 !important;
							font-weight: bold;
							text-transform: uppercase;
							-webkit-print-color-adjust: exact;
							print-color-adjust: exact;
						}
						.text-center { text-align: center !important; }
						.text-end { text-align: right !important; }
						.no-print { display: none !important; }
						@media print {
							.no-print { display: none !important; }
							button { display: none !important; }
						}
					</style>
				</head>
				<body>
					${getHeaderHtml(title, subTitle)}
					${innerContent}
					${getFooterHtml()}
					<script>
						window.onload = function() {
							window.print();
						};
					<\/script>
				</body>
				</html>
			`);
			win.document.close();
			win.focus();
		});
	}

	function printTable(tableSelector, reportTitle, subTitle, extraHeaderHtml) {
		fetchCompanyDetails(function() {
			let $cloned = $(tableSelector).clone();
			// Remove any buttons or action columns
			$cloned.find('.no-print, button, .iconbutton').remove();
			// If last th was action/print, remove it
			$cloned.find('thead tr').each(function() {
				let $lastTh = $(this).find('th:last');
				if ($lastTh.text().toUpperCase().includes('PRINT') || $lastTh.text().toUpperCase().includes('ACTION')) {
					$lastTh.remove();
				}
			});
			$cloned.find('tbody tr').each(function() {
				$(this).find('td:last-child').each(function() {
					if ($(this).find('button, i, a').length > 0 || $(this).text().trim() === '') {
						$(this).remove();
					}
				});
			});

			let tableHtml = $cloned.prop('outerHTML');
			let fullContent = (extraHeaderHtml || '') + tableHtml;
			printHtml(reportTitle, fullContent, subTitle);
		});
	}

	return {
		getCompanyDetails: fetchCompanyDetails,
		getHeaderHtml: getHeaderHtml,
		getFooterHtml: getFooterHtml,
		printHtml: printHtml,
		printTable: printTable
	};
})();

