$(document).ready(function() {

	if (window.investmentTxnReportLoaded) {
		console.warn("JS ALREADY INITIALIZED, SKIPPING...");
		return;
	}
	window.investmentTxnReportLoaded = true;

	let allPolicies = [];
	let currentFilteredData = [];

	function showModalSafely(modalId) {
		let $m = $("#" + modalId);
		if (typeof $m.modal === "function") {
			$m.modal("show");
			return;
		}
		let el = document.getElementById(modalId);
		if (el && typeof bootstrap !== "undefined" && bootstrap.Modal) {
			try {
				if (typeof bootstrap.Modal.getOrCreateInstance === "function") {
					bootstrap.Modal.getOrCreateInstance(el).show();
					return;
				}
				if (typeof bootstrap.Modal.getInstance === "function") {
					let inst = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
					inst.show();
					return;
				}
				let inst = new bootstrap.Modal(el);
				inst.show();
				return;
			} catch (err) {
				console.warn("Bootstrap 5 modal failed:", err);
			}
		}
		if (el) {
			el.classList.add("show");
			el.style.display = "block";
			document.body.classList.add("modal-open");
		}
	}

	function hideModalSafely(modalId) {
		let $m = $("#" + modalId);
		if (typeof $m.modal === "function") {
			$m.modal("hide");
			return;
		}
		let el = document.getElementById(modalId);
		if (el) {
			el.classList.remove("show");
			el.style.display = "none";
			document.body.classList.remove("modal-open");
			$(".modal-backdrop").remove();
		}
	}

	$(document).on("click", '[data-dismiss="modal"], [data-bs-dismiss="modal"]', function() {
		hideModalSafely("bankReportModal");
	});

	// Fetch Approved Policies
	fetchApprovedPolicies();

	function fetchApprovedPolicies() {
		$.ajax({
			url: "api/Policymangment/getApprovedPolicies",
			type: "GET",
			success: function(response) {
				if (response && Array.isArray(response.data)) {
					allPolicies = response.data;
					currentFilteredData = allPolicies;
					buildBranchDropdown(allPolicies);
					fillTable(allPolicies);
				} else {
					$(".datatable tbody").html("<tr><td colspan='10' class='text-center text-muted'>NO APPROVED POLICIES FOUND</td></tr>");
				}
			},
			error: function() {
				alert("ERROR WHILE FETCHING POLICY DATA.");
				$(".datatable tbody").html("<tr><td colspan='10' class='text-center text-danger'>FAILED TO LOAD APPROVED POLICIES</td></tr>");
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
		currentFilteredData = data || [];
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
			let policyDate = (p.policyStartDate || p.policyDate || "").toUpperCase();
			let amount = parseFloat(p.policyAmount || 0);
			let contactNo = (p.contactNo || (p.customer && p.customer.contactNo) || "").toUpperCase();
			let branch = (p.branchName || (p.branch && p.branch.branchName) || "").toUpperCase();

			let row = `
				<tr style="font-family: 'Poppins', sans-serif;">
					<td class="text-center font-monospace">${i + 1}</td>
					<td class="fw-bold">${policyCode}</td>
					<td class="fw-semibold">${customerName}</td>
					<td>${schemeType}</td>
					<td>${policyDate}</td>
					<td class="fw-bold">₹${amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td>${contactNo}</td>
					<td>${branch}</td>
					<td><span class="badge bg-success">APPROVED</span></td>
					<td class="text-center no-print">
						<button type="button" class="btn btn-sm btn-outline-primary printBtn" data-id="${p.id}" data-index="${i}" title="PRINT STATEMENT">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
				</tr>
			`;
			$tbody.append(row);
		});
	}

	// Single Policy Print & Modal
	$(document).off("click", ".printBtn").on("click", ".printBtn", function(e) {
		e.preventDefault();
		let id = $(this).data("id");
		let idx = $(this).data("index");
		let selectedPolicy = (currentFilteredData && currentFilteredData[idx]) || allPolicies.find(p => p.id == id);
		if (!selectedPolicy) {
			viewData(id);
			return;
		}

		ReportPrintUtil.getCompanyDetails(function(company) {
			$("#bankName").text((company.companyName || "").toUpperCase());
			$("#bankAddress").text(((company.address || "") + ", " + (company.city || "") + ", " + (company.state || "") + " - " + (company.pinCode || "")).toUpperCase());
			$("#bankContact").text(("CIN: " + (company.cinNo || "") + " | HELPLINE: " + (company.helplineNo || "")).toUpperCase());

			$("#accountNumber").text((selectedPolicy.customerCode || selectedPolicy.policyCode || "-").toUpperCase());
			$("#periodCovered").text(new Date().toLocaleDateString("en-GB"));

			$("#customerName").text((selectedPolicy.customerName || "-").toUpperCase());
			$("#customerAddress1").text((selectedPolicy.address || company.city || "").toUpperCase());
			$("#customerAddress2").text(("CONTACT: " + (selectedPolicy.contactNo || "-")).toUpperCase());

			$("#modalPolicyCode").text((selectedPolicy.policyCode || "-").toUpperCase());
			$("#modalSchemeType").text((selectedPolicy.schemeType || "-").toUpperCase());
			$("#modalPaymentMode").text((selectedPolicy.paymentMode || "ONLINE").toUpperCase());
			$("#modalPolicyAmount").text("₹" + parseFloat(selectedPolicy.policyAmount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2}));

			let txnRow = `
				<tr>
					<td class="fw-bold">${(selectedPolicy.policyCode || "-").toUpperCase()}</td>
					<td>${(selectedPolicy.policyStartDate || "-").toUpperCase()}</td>
					<td class="fw-bold text-success">₹${parseFloat(selectedPolicy.policyAmount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td>${(selectedPolicy.schemeType || "-").toUpperCase()}</td>
					<td>${(selectedPolicy.paymentMode || "ONLINE").toUpperCase()}</td>
				</tr>
			`;
			$("#transactionTableBody").html(txnRow);

			showModalSafely("bankReportModal");
		});
	});

	$(document).off("click", "#printBankReportBtn").on("click", "#printBankReportBtn", function(e) {
		e.preventDefault();
		let $clone = $("#bankReportContent").clone();
		// Remove below company and address so it doesn't repeat with ReportPrintUtil header
		$clone.find(".below-company-details, #bankName, #bankAddress, #bankContact").remove();
		$clone.find(".modal-signatures, .no-print").remove();

		let content = $clone.html();
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
					<table class="table table-bordered text-uppercase">
						<thead class="table-dark">
							<tr><th colspan="2" class="text-center">CUSTOMER & POLICY TRANSACTION STATEMENT</th></tr>
						</thead>
						<tbody>
							<tr><td style="width: 35%;" class="fw-bold">CUSTOMER NAME</td><td class="fw-bold">${(data.customerName || "-").toUpperCase()}</td></tr>
							<tr><td>CONTACT NUMBER</td><td>${(data.contactNo || "-").toUpperCase()}</td></tr>
							<tr><td class="fw-bold">POLICY CODE</td><td class="fw-bold">${(data.policyCode || "-").toUpperCase()}</td></tr>
							<tr><td>POLICY START DATE</td><td>${(data.policyStartDate || "-").toUpperCase()}</td></tr>
							<tr><td>SCHEME TYPE</td><td>${(data.schemeType || "-").toUpperCase()}</td></tr>
							<tr><td class="fw-bold">POLICY AMOUNT</td><td class="text-success fw-bold">₹${parseFloat(data.policyAmount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
							<tr><td>PAYMENT MODE</td><td>${(data.paymentMode || "CASH").toUpperCase()}</td></tr>
							<tr><td>BRANCH NAME</td><td>${(data.branchName || "-").toUpperCase()}</td></tr>
						</tbody>
					</table>
				`;
				ReportPrintUtil.printHtml("POLICY INVESTMENT TRANSACTION STATEMENT", contentHtml);
			},
			error: function() {
				alert("FAILED TO LOAD PRINT DATA");
			}
		});
	}

});
