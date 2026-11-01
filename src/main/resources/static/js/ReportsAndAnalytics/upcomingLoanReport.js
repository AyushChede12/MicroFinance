$(document).ready(function() {
	let allLoanData = [];
	let currentFilteredLoans = [];

	loadBranchDropdown();
	loadApprovedLoans();

	/* ---------------- BRANCH DROPDOWN (FROM BRANCH API) ---------------- */
	function loadBranchDropdown() {
		$.ajax({
			url: "api/preference/getAllBranchModule",
			type: "GET",
			success: function(response) {
				let list = response && response.data ? response.data : (Array.isArray(response) ? response : []);
				let sel = $("#branchName1");
				sel.html("<option value=''>ALL BRANCHES</option>");
				list.forEach(b => {
					if (b && b.branchName) {
						let name = b.branchName.trim().toUpperCase();
						sel.append(`<option value="${name}">${name}</option>`);
					}
				});
			},
			error: function() {
				$("#branchName1").html("<option value=''>ALL BRANCHES</option>");
			}
		});
	}

	/* ---------------- APPROVED LOAN APPLICATIONS ---------------- */
	function loadApprovedLoans() {
		$.ajax({
			url: "api/datacorrection/fetchAllApprovedLoanApplications",
			type: "GET",
			success: function(response) {
				let list = (response && response.data && Array.isArray(response.data)) ? response.data : (Array.isArray(response) ? response : []);
				allLoanData = list;
				currentFilteredLoans = allLoanData;
				populatePlanDropdown(allLoanData);
				loadEmiReport();
			},
			error: function(xhr) {
				console.warn("Notice: No approved loan applications or API unavailable (status " + xhr.status + ")");
				allLoanData = [];
				currentFilteredLoans = [];
				populatePlanDropdown([]);
				bindTable([]);
			}
		});
	}

	function populatePlanDropdown(loanList) {
		const uniquePlans = new Set();
		loanList.forEach(item => {
			if (item.typeOfLoan) uniquePlans.add(item.typeOfLoan.trim().toUpperCase());
			if (item.loanPlanName) uniquePlans.add(item.loanPlanName.trim().toUpperCase());
		});

		$("#loanPlanName").html("<option value=''>ALL PLANS</option>");
		uniquePlans.forEach(plan => {
			$("#loanPlanName").append(`<option value="${plan}">${plan}</option>`);
		});
	}

	/* ---------------- FIND BUTTON ---------------- */
	$('#findBtn').click(function(e) {
		e.preventDefault();
		loadEmiReport();
	});

	/* ---------------- RESET BUTTON ---------------- */
	$('#resetBtn').click(function(e) {
		e.preventDefault();
		$('#branchName1').val('');
		$('#loanPlanName').val('');
		$('#financialCode').val('');
		$('#toDate').val('');
		currentFilteredLoans = allLoanData;
		bindTable(allLoanData);
	});

	/* ---------------- FULL REPORT PRINT ---------------- */
	$('#printFullReportBtn').click(function(e) {
		e.preventDefault();
		const branch = $('#branchName1').val() || 'ALL BRANCHES';
		const plan = $('#loanPlanName').val() || 'ALL PLANS';
		const finCode = $('#financialCode').val() || 'ALL';
		const toDate = $('#toDate').val() || 'ALL DATES';
		const subTitle = `FILTERS: BRANCH: ${branch} | PLAN: ${plan} | ADVISOR: ${finCode} | DUE BEFORE: ${toDate}`;
		ReportPrintUtil.printTable('.datatable', 'UPCOMING EMI DUE REPORT', subTitle);
	});

	/* ---------------- ROW PRINT NOTICE BUTTON ---------------- */
	$(document).off("click", ".printEmiNoticeBtn").on("click", ".printEmiNoticeBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let item = currentFilteredLoans[idx] || allLoanData[idx];
		if (!item) {
			alert("LOAN EMI RECORD NOT FOUND");
			return;
		}

		const approvalDate = parseDateSafe(item.approvalDate || item.loanDate);
		const loanTerm = parseInt(item.loanTerm) || 0;
		let dueDate = '-';
		if (approvalDate) {
			const d = new Date(approvalDate.getTime());
			d.setMonth(d.getMonth() + loanTerm);
			const yyyy = d.getFullYear();
			const mm = String(d.getMonth() + 1).padStart(2, '0');
			const dd = String(d.getDate()).padStart(2, '0');
			dueDate = `${yyyy}-${mm}-${dd}`;
		}

		const loanAmt = parseFloat(item.loanAmount || 0);
		const emiAmt = parseFloat(item.emiPayment || 0);
		const outstanding = calculateOutstanding(item);

		let html = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="4" style="padding: 10px; font-size: 14px; text-align: center;">
							UPCOMING LOAN EMI DEMAND NOTICE
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 25%;">LOAN ACCOUNT ID</th>
						<td style="width: 25%; font-weight: bold; color: #002147;">${(item.loanId || '-').toUpperCase()}</td>
						<th style="width: 25%;">DUE DATE</th>
						<td style="width: 25%; font-weight: bold; color: #d9534f;">${dueDate}</td>
					</tr>
					<tr>
						<th>CUSTOMER CODE</th>
						<td>${(item.memberId || '-').toUpperCase()}</td>
						<th>CUSTOMER NAME</th>
						<td><strong>${(item.memberName || '-').toUpperCase()}</strong></td>
					</tr>
					<tr>
						<th>BRANCH</th>
						<td>${(item.branchName || '-').toUpperCase()}</td>
						<th>MOBILE NUMBER</th>
						<td>${item.contactNo || '-'}</td>
					</tr>
					<tr>
						<th>LOAN TYPE / SCHEME</th>
						<td>${(item.typeOfLoan || item.loanPlanName || '-').toUpperCase()}</td>
						<th>SANCTION AMOUNT</th>
						<td>₹${loanAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>MONTHLY EMI DUE</th>
						<td style="font-weight: bold; color: green; font-size: 15px;">₹${emiAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
						<th>OUTSTANDING BALANCE</th>
						<td style="font-weight: bold; color: red;">₹${outstanding.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>LOAN STATUS</th>
						<td><span class="badge bg-success">${(item.loanStatus || 'ACTIVE').toUpperCase()}</span></td>
						<th>ADVISOR CODE</th>
						<td>${(item.financialConsultantId || 'DIRECT').toUpperCase()}</td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("UPCOMING LOAN EMI NOTICE", html);
	});

	/* ---------------- EMI REPORT FILTERING ---------------- */
	function loadEmiReport() {
		const branchName = ($('#branchName1').val() || "").trim().toUpperCase();
		const loanPlanName = ($('#loanPlanName').val() || "").trim().toUpperCase();
		const financialCode = ($('#financialCode').val() || "").trim().toUpperCase();
		const toDateStr = ($('#toDate').val() || "").trim();

		let toDate = null;
		if (toDateStr) {
			toDate = new Date(toDateStr);
		}

		const filtered = allLoanData.filter(item => {
			const itemBranch = (item.branchName || "").toUpperCase();
			const itemPlan = (item.typeOfLoan || item.loanPlanName || "").toUpperCase();
			const itemFinCode = (item.financialConsultantId || item.financialConsultantName || "").toUpperCase();

			const branchMatch = !branchName || itemBranch.includes(branchName);
			const planMatch = !loanPlanName || itemPlan.includes(loanPlanName);
			const codeMatch = !financialCode || itemFinCode.includes(financialCode);

			const approvalDate = parseDateSafe(item.approvalDate || item.loanDate);
			const loanTerm = parseInt(item.loanTerm) || 0;

			let dueDate = null;
			if (approvalDate) {
				dueDate = new Date(approvalDate.getTime());
				dueDate.setMonth(dueDate.getMonth() + loanTerm);
			}

			let dateMatch = true;
			if (toDate && dueDate) {
				dateMatch = dueDate.getTime() <= toDate.getTime();
			}

			return branchMatch && planMatch && codeMatch && dateMatch;
		});

		currentFilteredLoans = filtered;
		bindTable(filtered);
	}

	/* ---------------- DATE PARSER ---------------- */
	function parseDateSafe(str) {
		if (!str) return null;
		str = String(str).trim();
		let d;
		if (str.includes('/')) {
			const parts = str.split('/');
			if (parts.length === 3) {
				const [dd, mm, yyyy] = parts;
				d = new Date(`${yyyy}-${mm}-${dd}`);
			}
		} else if (str.includes('-')) {
			const parts = str.split('-');
			if (parts.length === 3) {
				if (parts[0].length === 4) {
					d = new Date(str);
				} else {
					const [dd, mm, yyyy] = parts;
					d = new Date(`${yyyy}-${mm}-${dd}`);
				}
			}
		}
		if (d && !isNaN(d)) return d;
		return null;
	}

	/* ---------------- TABLE BIND ---------------- */
	function bindTable(data) {
		const tbody = $('.datatable tbody');
		tbody.empty();

		if (!data || data.length === 0) {
			tbody.append(`<tr>
				<td colspan="13" class="text-center text-muted fw-bold">
					NO UPCOMING EMI DUE RECORDS FOUND
				</td>
			</tr>`);
			return;
		}

		let count = 1;
		data.forEach((item, index) => {
			const approvalDate = parseDateSafe(item.approvalDate || item.loanDate);
			const loanTerm = parseInt(item.loanTerm) || 0;

			let dueDate = '-';
			if (approvalDate) {
				const d = new Date(approvalDate.getTime());
				d.setMonth(d.getMonth() + loanTerm);
				const yyyy = d.getFullYear();
				const mm = String(d.getMonth() + 1).padStart(2, '0');
				const dd = String(d.getDate()).padStart(2, '0');
				dueDate = `${yyyy}-${mm}-${dd}`;
			}

			const loanAmount = parseFloat(item.loanAmount || 0);
			const emiAmount = parseFloat(item.emiPayment || 0);
			const outstanding = calculateOutstanding(item);
			const loanStatus = (item.loanStatus || 'ACTIVE').toUpperCase();
			let statusBadge = `<span class="badge bg-success">${loanStatus}</span>`;
			if (loanStatus.includes('PEND')) {
				statusBadge = `<span class="badge bg-warning text-dark">${loanStatus}</span>`;
			}

			const row = `
			<tr style="font-family: 'Poppins', sans-serif;">
				<td class="text-center font-monospace">${count++}</td>
				<td class="fw-bold">${(item.loanId || '').toUpperCase()}</td>
				<td>${(item.memberId || '').toUpperCase()}</td>
				<td class="fw-semibold">${(item.memberName || '').toUpperCase()}</td>
				<td>${(item.branchName || '').toUpperCase()}</td>
				<td>${(item.typeOfLoan || item.loanPlanName || '').toUpperCase()}</td>
				<td>${(item.contactNo || '').toUpperCase()}</td>
				<td class="fw-bold">₹${loanAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="text-success fw-bold">₹${emiAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="fw-bold text-danger">${dueDate}</td>
				<td class="text-danger fw-bold">₹${outstanding.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td>${statusBadge}</td>
				<td class="text-center no-print">
					<button class="btn btn-sm btn-outline-primary printEmiNoticeBtn" data-index="${index}" title="PRINT NOTICE">
						<i class="bi bi-printer"></i> PRINT
					</button>
				</td>
			</tr>
			`;
			tbody.append(row);
		});
	}

	function calculateOutstanding(item) {
		const loanAmount = parseFloat(item.loanAmount || 0);
		const sanctioned = parseFloat(item.sanctionedAmount || item.totalPaid || 0);
		const diff = loanAmount - sanctioned;
		return diff > 0 ? diff : 0;
	}
});
