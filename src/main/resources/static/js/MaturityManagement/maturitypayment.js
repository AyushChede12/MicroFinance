let lastInstall = 0;
let currentPolicyData = null;

$(document).ready(function() {

	// Set default today's date
	const today = new Date().toISOString().split('T')[0];
	if ($('#paymentDate').length) {
		$('#paymentDate').val(today);
	}

	// Load branches into Pay Branch dropdown
	function loadBranches() {
		$.ajax({
			url: "api/preference/getAllBranchModule",
			type: "GET",
			success: function(response) {
				if ((response.status === "OK" || response.status === "FOUND" || response.status == 200) && Array.isArray(response.data)) {
					const $branch = $('#branchName');
					$branch.empty().append('<option value="">-- SELECT BRANCH --</option>');
					response.data.forEach(function(branch) {
						if (branch && branch.branchName) {
							const bName = branch.branchName.toUpperCase();
							$branch.append(`<option value="${bName}">${bName}</option>`);
						}
					});
				}
			},
			error: function() {
				console.warn("FAILED TO LOAD BRANCHES.");
			}
		});
	}
	loadBranches();

	// Load Team Members into User Approver dropdown
	$.ajax({
		url: "api/teammember/getAllteamMember",
		type: "GET",
		success: function(response) {
			if ((response.status === "FOUND" || response.status === "OK") && Array.isArray(response.data)) {
				const teamOptions = response.data.map(function(team) {
					return {
						id: team.teamMemberCode,
						text: ((team.teamMemberCode || '') + " - " + (team.teamMemberName || '')).toUpperCase()
					};
				});

				$('#userApprover').empty().append('<option value="">-- SELECT TEAM MEMBER --</option>').select2({
					placeholder: '-- SELECT TEAM MEMBER --',
					data: teamOptions
				});
			}
		},
		error: function() {
			console.warn("FAILED TO LOAD TEAM MEMBERS.");
		}
	});

	// When Plan Type changes, load Policy Codes
	$('#plantype').on('change', function() {
		let plantype = $(this).val();

		if (!plantype) {
			$('#policyCode').empty().append('<option value="">-- SELECT POLICY CODE --</option>');
			return;
		}

		$.ajax({
			url: 'api/Policymangment/getaddinvestmentdetails',
			type: 'GET',
			data: { planType: plantype },
			success: function(response) {
				if ((response.status === "OK" || response.status === "FOUND") && response.data && response.data.length > 0) {
					const filteredData = response.data.filter(item =>
						item.policyCode && item.policyCode.toUpperCase().startsWith(plantype.toUpperCase())
					);

					const transferOptions = [
						{ id: '', text: '-- SELECT POLICY CODE --' },
						...filteredData.map(function(item) {
							return {
								id: item.policyCode,
								text: (item.policyCode + " - " + (item.customerName || '')).toUpperCase()
							};
						})
					];

					$('#policyCode').empty().select2({
						placeholder: '-- SELECT POLICY CODE --',
						data: transferOptions
					});

					$('#policyCode').val('').trigger('change');
				} else {
					$('#policyCode').empty().append('<option value="">-- NO POLICY CODES FOUND --</option>');
				}
			},
			error: function() {
				console.warn("FAILED TO LOAD POLICY CODES.");
			}
		});
	});

	// When Policy Code changes, fetch details
	$('#policyCode').on('change', function() {
		let policyCode = $(this).val();

		if (policyCode) {
			$.ajax({
				url: 'api/Policymangment/getPolicyByPolicyCode?policyCode=' + encodeURIComponent(policyCode),
				type: 'GET',
				success: function(response) {
					if (response.data) {
						let data = response.data;
						currentPolicyData = data;

						$('#planCode').val((data.schemeCode || '').toUpperCase());
						$('#customerName').val((data.customerName || '').toUpperCase());
						$('#policyName').val((data.schemeName || '').toUpperCase());
						$('#policyAmount').val(data.policyAmount || '0.00');
						$('#maturityAmount').val(data.maturityAmount || '0.00');
						$('#maturityDate').val(data.maturityDate || '');
						$('#Approvebranch').val((data.branchName || '').toUpperCase());

						// Duration
						let dur = calDuration(data);
						$('#duration').val(dur);

						// Sys Payable
						let sp = sysPayable(data);
						$('#sysPayable').val(sp.toFixed(2));

						// Deduction
						let deduct = Deduction(data);
						$('#deduction').val(deduct.toFixed(2));

						// Net Payable
						let np = sp - deduct;
						$('#netPayable').val(np.toFixed(2));

						// Penalty
						let pen = Panelty(data);
						$('#panelty').val(pen.toFixed(2));

						// Amount default to netPayable
						$('#amount').val(np.toFixed(2));

						let depAmt = parseFloat(data.depositAmount) || 0;
						$('#depositAmount').val(depAmt.toFixed(2));

						let due = DueAmount(data);
						$('#dueAmount').val(due.toFixed(2));

						let lastinst = parseFloat(data.lastInstPaid) || 0;
						lastInstall = lastinst + 1;
					} else {
						alert("NO DATA FOUND FOR THIS POLICY.");
					}
				},
				error: function() {
					alert("ERROR FETCHING POLICY DETAILS.");
				}
			});
		} else {
			$('#planCode, #customerName, #policyName, #policyAmount, #depositAmount, #maturityAmount, #maturityDate, #duration, #sysPayable, #deduction, #netPayable, #dueAmount, #amount').val('');
			currentPolicyData = null;
		}
	});

	// Deduction recalculates Net Payable
	$('#deduction').on('input', function() {
		let sp = parseFloat($('#sysPayable').val()) || 0;
		let deduct = parseFloat($(this).val()) || 0;
		let np = Math.max(0, sp - deduct);
		$('#netPayable').val(np.toFixed(2));
		$('#amount').val(np.toFixed(2));
	});

	// Form Submit -> Show Confirmation Modal
	$("#formid").submit(function(event) {
		event.preventDefault();

		if (!$("#policyCode").val()) {
			alert("PLEASE SELECT A POLICY CODE.");
			return;
		}
		if (!$("#branchName").val()) {
			alert("PLEASE SELECT PAY BRANCH.");
			return;
		}
		if (!$("#modeofPayment").val()) {
			alert("PLEASE SELECT MODE OF PAYMENT.");
			return;
		}
		if (!$("#userApprover").val()) {
			alert("PLEASE SELECT USER APPROVER.");
			return;
		}

		let amount = parseFloat($('#amount').val()) || 0;
		let panelty = parseFloat($('#panelty').val()) || 0;
		let netPayable = parseFloat($('#netPayable').val()) || 0;
		let total = netPayable + panelty;

		$(".modal-body").html(
			"YOU ARE ABOUT TO PROCESS FULL MATURITY PAYOUT:<br><br>" +
			"<b>POLICY CODE:</b> " + $("#policyCode").val().toUpperCase() + "<br>" +
			"<b>CUSTOMER:</b> " + ($("#customerName").val() || '').toUpperCase() + "<br>" +
			"<b>NET PAYABLE:</b> ₹" + netPayable.toFixed(2) + "<br>" +
			"<b>PENALTY (IF ANY):</b> ₹" + panelty.toFixed(2) + "<br>" +
			"<b>TOTAL PAYOUT:</b> ₹" + total.toFixed(2) + "<br>" +
			"<b>MODE OF PAYMENT:</b> " + $("#modeofPayment").val().toUpperCase()
		);

		$('#exampleModalLong').modal('show');
	});

	// Confirm Payment in Modal
	$("#Pay").on("click", function() {
		executeFullMaturityPayment();
	});

	function executeFullMaturityPayment() {
		const selectedCode = $('#userApprover').val();
		const selectedText = $('#userApprover option:selected').text();
		let teamMemberName = selectedText.includes(" - ") ? selectedText.split(" - ")[1].trim() : selectedText;

		let newdeposit = parseFloat($('#depositAmount').val()) || 0;

		var data = {
			policyCode: $("#policyCode").val(),
			planCode: $("#planCode").val(),
			maturityDate: $("#maturityDate").val(),
			customerName: ($("#customerName").val() || '').toUpperCase(),
			policyName: ($("#policyName").val() || '').toUpperCase(),
			duration: $("#duration").val(),
			policyAmount: $("#policyAmount").val(),
			maturityAmount: $("#maturityAmount").val(),
			sysPayable: $("#sysPayable").val(),
			deduction: $("#deduction").val(),
			netPayable: $("#netPayable").val(),
			approveBranch: ($("#Approvebranch").val() || '').toUpperCase(),
			teamMemberCode: selectedCode,
			teamMemberName: teamMemberName.toUpperCase(),
			amount: $("#amount").val(),
			depositAmount: newdeposit.toString(),
			installment: lastInstall.toString(),
			panelty: $("#panelty").val(),
			dueAmount: $("#dueAmount").val(),
			paymentDate: $("#paymentDate").val(),
			branchName: ($("#branchName").val() || '').toUpperCase(),
			payComment: ($("#payRemark").val() || 'FULL MATURITY PAYOUT').toUpperCase(),
			modeofPayment: ($("#modeofPayment").val() || 'CASH').toUpperCase()
		};

		$.ajax({
			url: "api/Maturitymanagement/saveFullmaturity",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				if (response.status === "OK" || response.status === "CREATED") {
					alert("FULL MATURITY PAYMENT PROCESSED SUCCESSFULLY.");
					location.reload();
				} else {
					alert("FAILED: " + (response.message || "COULD NOT PROCESS PAYMENT").toUpperCase());
				}
			},
			error: function(xhr, status, error) {
				console.error("Save error:", error, xhr.responseText);
				alert("SOMETHING WENT WRONG WHILE SAVING THE DATA.");
			}
		});
	}

});

// Calculations
function calDuration(data) {
	if (!data.policyStartDate || !data.maturityDate) return "-";
	let openingDate = new Date(data.policyStartDate);
	let maturityDate = new Date(data.maturityDate);
	let schemeMode = data.schemeMode || "MONTHLY";

	let duration = 0;
	if (schemeMode.toUpperCase() === "MONTHLY") {
		duration = (maturityDate.getFullYear() - openingDate.getFullYear()) * 12 + (maturityDate.getMonth() - openingDate.getMonth());
		return duration + (duration === 1 ? " MONTH" : " MONTHS");
	} else if (schemeMode.toUpperCase() === "YEARLY") {
		duration = maturityDate.getFullYear() - openingDate.getFullYear();
		return duration + (duration === 1 ? " YEAR" : " YEARS");
	}
	return (data.schemeTerm || "-") + " MONTHS";
}

function sysPayable(data) {
	let depositAmount = parseFloat(data.depositAmount) || 0;
	let rateOfIntrest = parseFloat(data.roi) || 0;
	let interest = (depositAmount * rateOfIntrest * 1) / 100;
	return depositAmount + interest;
}

function Deduction(data) {
	return 0.00;
}

function Panelty(data) {
	if (!data.policyStartDate || !data.lastPaymentDate) return 0;
	let lastTrans = new Date(data.lastPaymentDate);
	let paymentdate = new Date($('#paymentDate').val() || new Date());
	let policyAmount = parseFloat(data.policyAmount) || 0;

	let monthsGap = (paymentdate.getFullYear() - lastTrans.getFullYear()) * 12 + (paymentdate.getMonth() - lastTrans.getMonth());
	let penalty = 0;
	if (monthsGap > 1) {
		penalty = (monthsGap - 1) * (1.5 / 100) * policyAmount;
	}
	return Math.max(0, penalty);
}

function DueAmount(data) {
	let paidAmount = parseFloat(data.depositAmount) || 0;
	let policyAmount = parseFloat(data.policyAmount) || 0;
	let schemeterm = parseFloat(data.schemeTerm) || 12;
	let totalExpected = policyAmount * schemeterm;
	return Math.max(0, totalExpected - paidAmount);
}
