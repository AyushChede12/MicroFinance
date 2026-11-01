$(document).ready(function() {

	if (window.investmentTxnReportLoaded) {
		console.warn("JS ALREADY INITIALIZED, SKIPPING...");
		return;
	}
	window.investmentTxnReportLoaded = true;

	let allPolicies = [];

	// Fetch Approved Policies
	fetchApprovedPolicies();

	function fetchApprovedPolicies() {
		$.ajax({
			url: "api/Policymangment/getApprovedPolicies",
			type: "GET",
			success: function(response) {
				if (response && Array.isArray(response.data)) {
					allPolicies = response.data;
					buildBranchDropdown(allPolicies);
					fillTable(allPolicies);
				} else {
					$("table tbody").html("<tr><td colspan='10' class='text-center text-muted'>NO APPROVED POLICIES FOUND</td></tr>");
				}
			},
			error: function() {
				alert("ERROR WHILE FETCHING POLICY DATA.");
				$("table tbody").html("<tr><td colspan='10' class='text-center text-danger'>FAILED TO LOAD APPROVED POLICIES</td></tr>");
			}
		});
	}

	function normalize(value) {
		return value ? value.toString().replace(/[\n\r\t]/g, "").replace(/\s+/g, " ").trim().toUpperCase() : "";
	}

	function buildBranchDropdown(data) {
		let $branch = $("#branchName2");
		$branch.empty().append('<option value="">ALL BRANCHES</option>');

		let branchSet = new Set();
		data.forEach(p => {
			let branch = p.branchName || (p.branch && p.branch.branchName) || "";
			if (branch) branchSet.add(normalize(branch));
		});

		[...branchSet].sort().forEach(b => {
			$branch.append(`<option value="${b}">${b}</option>`);
		});
	}

	// Filter
	function applyFilter() {
		let branch = $("#branchName2").val();
		let fromDate = $("#fromDate").val();
		let toDate = $("#toDate").val();

		let filtered = allPolicies;

		if (branch) {
			filtered = filtered.filter(p => {
				let b = p.branchName || (p.branch && p.branch.branchName) || "";
				return normalize(b) === normalize(branch);
			});
		}

		if (fromDate && toDate) {
			let from = new Date(fromDate);
			let to = new Date(toDate);
			filtered = filtered.filter(p => {
				let d = p.policyStartDate ? new Date(p.policyStartDate) : null;
				return d && d >= from && d <= to;
			});
		}

		fillTable(filtered);
	}

	$("#findBtn").on("click", function(e) {
		e.preventDefault();
		applyFilter();
	});

	$("#resetBtn").on("click", function(e) {
		e.preventDefault();
		$("#formid")[0].reset();
		fillTable(allPolicies);
	});

	// Print Full Report Table
	$("#printFullReportBtn").on("click", function(e) {
		e.preventDefault();
		let branch = $("#branchName2").val() || "ALL BRANCHES";
		let subTitle = "BRANCH: " + branch.toUpperCase();
		if ($("#fromDate").val() && $("#toDate").val()) {
			subTitle += " | PERIOD: " + $("#fromDate").val() + " TO " + $("#toDate").val();
		}
		ReportPrintUtil.printTable('.datatable', 'INVESTMENT TRANSACTION REPORT', subTitle);
	});

	// Fill Table
	function fillTable(data) {
		let $tbody = $(".datatable tbody");
		$tbody.empty();

		if (!data || data.length === 0) {
			$tbody.html("<tr><td colspan='10' class='text-center text-muted'>NO MATCHING POLICIES FOUND</td></tr>");
			return;
		}

		data.forEach((p, i) => {
			let policyCode = (p.policyCode || p.policyNumber || "").toUpperCase();
			let customerName = (p.customerName || (p.customer && p.customer.customerName) || "").toUpperCase();
			let schemeType = (p.schemeType || "").toUpperCase();
			let policyDate = p.policyStartDate || p.policyDate || "";
			let amount = p.policyAmount || 0;
			let contactNo = p.contactNo || (p.customer && p.customer.contactNo) || "";
			let branch = (p.branchName || (p.branch && p.branch.branchName) || "").toUpperCase();

			let row = `
				<tr style="font-family: 'Poppins', sans-serif;">
					<td>${i + 1}</td>
					<td><strong>${policyCode}</strong></td>
					<td>${customerName}</td>
					<td>${schemeType}</td>
					<td>${policyDate}</td>
					<td>₹${parseFloat(amount).toFixed(2)}</td>
					<td>${contactNo}</td>
					<td>${branch}</td>
					<td><span class="badge bg-success">APPROVED</span></td>
					<td class="no-print">
						<button class="btn btn-sm btn-outline-primary printBtn" data-id="${p.id}" title="PRINT STATEMENT">
							<i class="bi bi-printer"></i>
						</button>
					</td>
				</tr>
			`;
			$tbody.append(row);
		});
	}

	// Single Policy Print & Modal
	$(document).on("click", ".printBtn", function() {
		let id = $(this).data("id");
		let selectedPolicy = allPolicies.find(p => p.id == id);
		if (!selectedPolicy) {
			viewData(id);
			return;
		}

		ReportPrintUtil.getCompanyDetails(function(company) {
			$("#bankName").text(company.companyName);
			$("#bankAddress").text(company.address + ", " + company.city + ", " + company.state + " - " + company.pinCode);
			$("#bankContact").text("CIN: " + company.cinNo + " | HELPLINE: " + company.helplineNo);

			$("#accountNumber").text((selectedPolicy.customerCode || selectedPolicy.policyCode || "").toUpperCase());
			$("#periodCovered").text(new Date().toLocaleDateString("en-GB"));

			$("#customerName").text((selectedPolicy.customerName || "-").toUpperCase());
			$("#customerAddress1").text((selectedPolicy.address || company.city || "").toUpperCase());
			$("#customerAddress2").text("CONTACT: " + (selectedPolicy.contactNo || "-"));

			$("#modalPolicyCode").text((selectedPolicy.policyCode || "-").toUpperCase());
			$("#modalSchemeType").text((selectedPolicy.schemeType || "-").toUpperCase());
			$("#modalPaymentMode").text((selectedPolicy.paymentMode || "ONLINE").toUpperCase());
			$("#modalPolicyAmount").text("₹" + parseFloat(selectedPolicy.policyAmount || 0).toFixed(2));

			let txnRow = `
				<tr>
					<td>${(selectedPolicy.policyCode || "-").toUpperCase()}</td>
					<td>${selectedPolicy.policyStartDate || "-"}</td>
					<td>₹${parseFloat(selectedPolicy.policyAmount || 0).toFixed(2)}</td>
					<td>${(selectedPolicy.schemeType || "-").toUpperCase()}</td>
					<td>${(selectedPolicy.paymentMode || "ONLINE").toUpperCase()}</td>
				</tr>
			`;
			$("#transactionTableBody").html(txnRow);

			const modalEl = document.getElementById("bankReportModal");
			const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
			bsModal.show();
		});
	});

	$("#printBankReportBtn").on("click", function() {
		let content = document.getElementById("bankReportContent").innerHTML;
		ReportPrintUtil.printHtml("POLICY INVESTMENT TRANSACTION STATEMENT", content);
	});

	function viewData(id) {
		$.ajax({
			url: "api/reports/getPolicyForPrint/" + id,
			type: "GET",
			success: function(data) {
				if (!data) {
					alert("DATA NOT FOUND");
					return;
				}
				let contentHtml = `
					<div style="font-family: Arial, sans-serif;">
						<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
							<tr><th colspan="2" style="background:#f2f2f2; padding:8px;">CUSTOMER & POLICY INFORMATION</th></tr>
							<tr><td style="width: 30%; font-weight: bold;">CUSTOMER NAME</td><td>${(data.customerName || "-").toUpperCase()}</td></tr>
							<tr><td style="font-weight: bold;">CONTACT NUMBER</td><td>${data.contactNo || "-"}</td></tr>
							<tr><td style="font-weight: bold;">POLICY CODE</td><td>${(data.policyCode || "-").toUpperCase()}</td></tr>
							<tr><td style="font-weight: bold;">POLICY DATE</td><td>${data.policyStartDate || "-"}</td></tr>
							<tr><td style="font-weight: bold;">SCHEME TYPE</td><td>${(data.schemeType || "-").toUpperCase()}</td></tr>
							<tr><td style="font-weight: bold;">POLICY AMOUNT</td><td>₹${parseFloat(data.policyAmount || 0).toFixed(2)}</td></tr>
							<tr><td style="font-weight: bold;">PAYMENT MODE</td><td>${(data.paymentMode || "CASH").toUpperCase()}</td></tr>
							<tr><td style="font-weight: bold;">BRANCH</td><td>${(data.branchName || "-").toUpperCase()}</td></tr>
						</table>
					</div>
				`;
				ReportPrintUtil.printHtml("POLICY INVESTMENT REPORT", contentHtml);
			},
			error: function() {
				alert("FAILED TO LOAD PRINT DATA");
			}
		});
	}

});
