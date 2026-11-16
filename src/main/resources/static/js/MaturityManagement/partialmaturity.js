let policyid = 0;

$(document).ready(function() {

	// Set default today's closing date
	const today = new Date().toISOString().split('T')[0];
	if ($('#closingDate').length) {
		$('#closingDate').val(today);
	}

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
						policyid = parseInt(data.id) || 0;

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
						let np = Math.max(0, sp - deduct);
						$('#netPayable').val(np.toFixed(2));

						// Paid Amount
						let depAmt = parseFloat(data.depositAmount) || 0;
						$('#depositAmount').val(depAmt.toFixed(2));

						// Due Amount
						let due = DueAmount(data);
						$('#dueAmount').val(due.toFixed(2));
					} else {
						alert("NO DATA FOUND FOR THIS POLICY.");
					}
				},
				error: function() {
					alert("ERROR FETCHING POLICY DETAILS.");
				}
			});
		} else {
			$('#planCode, #customerName, #policyName, #policyAmount, #depositAmount, #maturityAmount, #maturityDate, #duration, #sysPayable, #deduction, #netPayable, #dueAmount').val('');
			policyid = 0;
		}
	});

	// Deduction recalculates Net Payable
	$('#deduction').on('input', function() {
		let sp = parseFloat($('#sysPayable').val()) || 0;
		let deduct = parseFloat($(this).val()) || 0;
		let np = Math.max(0, sp - deduct);
		$('#netPayable').val(np.toFixed(2));
	});

	// Form Submit -> Save Partial Maturity
	$("#formid").submit(function(event) {
		event.preventDefault();

		if (!$("#policyCode").val()) {
			alert("PLEASE SELECT A POLICY CODE.");
			return;
		}
		if (!$("#userApprover").val()) {
			alert("PLEASE SELECT USER APPROVER.");
			return;
		}
		if (!$("#Comment").val()) {
			alert("PLEASE ENTER COMMENT.");
			return;
		}

		const selectedCode = $('#userApprover').val();
		const selectedText = $('#userApprover option:selected').text();
		let teamMemberName = selectedText.includes(" - ") ? selectedText.split(" - ")[1].trim() : selectedText;

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
			closingDate: $("#closingDate").val(),
			depositAmount: $("#depositAmount").val(),
			dueAmount: $("#dueAmount").val(),
			Comment: ($("#Comment").val() || '').toUpperCase()
		};

		$.ajax({
			url: "api/Maturitymanagement/savePartialmaturity",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				if (response.status === "OK" || response.status === "CREATED") {
					alert("PARTIAL MATURITY PAYMENT PROCESSED SUCCESSFULLY.");
					$("#formid")[0].reset();
					location.reload();
				} else {
					alert("FAILED: " + (response.message || "COULD NOT SAVE").toUpperCase());
				}
			},
			error: function(xhr, status, error) {
				console.error("Save error:", error, xhr.responseText);
				alert("SOMETHING WENT WRONG WHILE SAVING THE DATA.");
			}
		});
	});

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

function DueAmount(data) {
	let paidAmount = parseFloat(data.depositAmount) || 0;
	let policyAmount = parseFloat(data.policyAmount) || 0;
	let schemeterm = parseFloat(data.schemeTerm) || 12;
	let totalExpected = policyAmount * schemeterm;
	return Math.max(0, totalExpected - paidAmount);
}
