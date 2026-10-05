let lastInstall = 0;

$(document).ready(function() {
	$('#plantype').on('change', function() {

		let plantype = $(this).val();

		if (!plantype) {
			alert("Please select a valid plan type.");
			return;
		}

		$.ajax({

			url: 'api/Policymangment/getaddinvestmentdetails',
			type: 'GET',
			data: { planType: plantype },

			success: function(response) {

				if (response.status === "OK" && response.data && response.data.length > 0) {

					const filteredData = response.data.filter(item =>
						item.policyCode && item.policyCode.startsWith(plantype)
					);

					const transferOptions = [
						{
							id: '',
							text: '-- Select Policy Code --'
						},
						...filteredData.map(function(item) {
							return {
								id: item.policyCode,
								text: item.policyCode
							};
						})
					];

					$('#policyCode').empty().select2({

						placeholder: '-- Select Policy Code --',
						data: transferOptions,

						matcher: function(params, data) {

							if ($.trim(params.term) === '') return data;

							if (typeof data.text === 'undefined') return null;

							const term = params.term.toLowerCase();
							const text = data.text.toLowerCase();

							return text.includes(term) ? data : null;
						}

					});

					// Default option select rahega
					$('#policyCode').val('').trigger('change');

				} else {
					alert("No policy codes found.");
				}
			},

			error: function() {
				alert("Failed to load policy codes.");
			}
		});
	});

	$('#policyCode').on('change', function() {
		let policyCode = $(this).val();

		if (policyCode !== "") {
			$.ajax({
				url: 'api/Policymangment/getPolicyByPolicyCode?policyCode=' + encodeURIComponent(policyCode),
				type: 'GET',
				success: function(response) {
					console.log("Response:", response);

					if (response.data) {
						let data = response.data;

						$('#planCode').val(data.schemeCode);
						$('#customerName').val(data.customerName);
						$('#policyName').val(data.schemeName);
						$('#schemeType').val(data.schemeType);
						$('#policyAmount').val(data.policyAmount);
						$('#maturityAmount').val(data.maturityAmount);
						$('#maturityDate').val(data.maturityDate);
						$('#Approvebranch').val(data.branchName);
						$('#duration').val(calDuration(data)); //function calDuration(data)
						$('#sysPayable').val(sysPayable(data)); //function sysPayable(data)
						$('#deduction').val(Deduction(data));	//function Deduction(data)					
						$('#netPayable').val(netPayment(data)); //function netpay(data)
						$('#panelty').val(Panelty(data));	//function Panelty(data)

						$("#amount").on("blur", function() {
							let modal = new bootstrap.Modal(document.getElementById('exampleModalLong'));
							modal.show();

							totalPayment();
						});
						$("#Pay").on("click", function() {
							let amount = parseFloat($('#amount').val()) || 0;
							let depositAmount = parseFloat(data.depositAmount);
							let paidamount = amount + depositAmount;
							$('#depositAmount').val(paidamount);
							$('#dueAmount').val(DueAmount(data));	//function DueAmount(data)

						});
						let lastinstall = parseFloat(data.lastInstPaid) || 0;
						lastInstall = lastinstall + 1;   // save it globally
						console.log("Saved Last Installment:", lastInstall);


					} else {
						alert("No data found for this policy.");
					}
				},
				error: function() {
					alert("Error fetching policy details.");
				}
			});
		} else {
			$('#customerName, #schemeMode, #schemeType, #policyAmount, #depositAmount, #maturityAmount, #maturityDate, #duration').val('');
		}
	});
	//getting team member name
	$.ajax({
		url: "api/teammember/getAllteamMember",
		type: "GET",
		success: function(response) {
			if (response.status === "FOUND") {

				const teamOptions = response.data.map(function(team) {
					return {
						id: team.teamMemberCode,
						text: team.teamMemberCode + " - " + team.teamMemberName
					};
				});

				$('#userApprover').empty().select2({
					placeholder: '-- Select Team Member --',
					data: teamOptions,
					matcher: function(params, data) {
						if ($.trim(params.term) === '') return data;

						if (typeof data.text === 'undefined') return null;

						const term = params.term.toLowerCase();
						const text = data.text.toLowerCase();

						return text.includes(term) ? data : null;
					}
				});
			} else {
				alert("No team members found.");
			}
		},
		error: function() {
			alert("Failed to load team members.");
		}
	});

	//Save full maturity data
	$("#formid").submit(function(event) {

		event.preventDefault();

		const selectedCode = $('#userApprover').val(); // Will give "TM0001"
		const selectedText = $('#userApprover option:selected').text(); // Will give "TM0001 - Ashwini Rajurkar"

		let teamMemberCode = selectedCode;
		let teamMemberName = selectedText.split(" - ")[1].trim();

		console.log("Parsed Code:", teamMemberCode);
		console.log("Parsed Name:", teamMemberName);


		let newdeposit = parseFloat($('#depositAmount').val()) || 0;




		var data = {
			policyCode: $("#policyCode").val(),
			planCode: $("#planCode").val(),
			maturityDate: $("#maturityDate").val(),
			customerName: $("#customerName").val(),
			policyName: $("#policyName").val(),
			duration: $("#duration").val(),
			policyAmount: $("#policyAmount").val(),
			maturityAmount: $("#maturityAmount").val(),
			sysPayable: $("#sysPayable").val(),
			deduction: $("#deduction").val(),
			netPayable: $("#netPayable").val(),
			approveBranch: $("#Approvebranch").val(),
			teamMemberCode: teamMemberCode,
			teamMemberName: teamMemberName,
			amount: $("#amount").val(),
			depositAmount: newdeposit,
			installment: lastInstall,
			panelty: $("#panelty").val(),
			dueAmount: $("#dueAmount").val(),
			paymentDate: $("#paymentDate").val(),
			branchName: $("#branchName").val(),
			payComment: $("#payRemark").val(),
			modeofPayment: $("#modeofPayment").val()
		};



		$.ajax({
			url: "api/Maturitymanagement/saveFullmaturity",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				alert(response.status === "OK"
					? "Saved: " + response.message
					: "Failed: " + response.message
				);
				if (response.status === "OK") {
					updateAddNewInvestmentAmount(data);
					location.reload();
				}

			},
			error: function(xhr, status, error) {
				console.error("Save error:", error, xhr.responseText);
				alert("Something went wrong while saving the data.");
			}
		});
	});

});


//calculate depost amount
/*function calculateDepositAmount(){
	let amount = parseFloat($('#amount').val()) || 0;
	let paidAmount = parseFloat($('#depositAmount').val()) || 0;
	let deposit=0;
	
	if (!isNaN(amount) && !isNaN(paidAmount)) {
			deposit = amount + paidAmount;
			alert("depositAmount " + deposit);
		}
		return deposit;
	
}
*/
// update in addinvestment table
function updateAddNewInvestmentAmount(data) {

	let policyCode = $("#policyCode").val();
	let depositAmount = calculateDepositAmount(data);
	let dueamount = $("#dueAmount").val();
	let lastinstdate = new Date(document.getElementById("paymentDate").value);

	if (!policyCode || !depositAmount) {
		alert("Please enter both Policy Code and Deposit Amount.");
		return;
	}
	let details = {
		policyCode: policyCode,
		depositAmount: depositAmount,
		lastInstPaid: lastInstall,
		amountDue: dueamount,
		lastPaymentDate: lastinstdate

	};


	$.ajax({
		url: "api/Policymangment/updateinvestment",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(details),
		success: function(response) {
			alert("Update successful!");
			console.log("Updated record:", response);
		},
		error: function(xhr, status, error) {
			console.error("Update failed:", error);
			alert("Failed to update installment details.");
		}
	});
}


//calculate duration
function calDuration(data) {
	let openingDate = new Date(data.policyStartDate);
	let maturityDate = new Date(data.maturityDate);
	let schemeMode = data.schemeMode;

	let duration = 0;
	let durationText = "-";

	if (schemeMode && openingDate && maturityDate) {
		if (schemeMode.toLowerCase() === "monthly") {
			duration = (maturityDate.getFullYear() - openingDate.getFullYear()) * 12 + (maturityDate.getMonth() - openingDate.getMonth());
			durationText = duration + (duration === 1 ? " month" : " months");
		}
		else
			if (schemeMode.toLowerCase() === "yearly") {
				duration = maturityDate.getFullYear() - openingDate.getFullYear();
				if (
					maturityDate.getMonth() < openingDate.getMonth() ||
					(maturityDate.getMonth() === openingDate.getMonth() &&
						maturityDate.getDate() < openingDate.getDate())
				) {
					duration--;
				}
				durationText = duration + (duration === 1 ? " year" : " years");
			}
	}
	return durationText;
}

//calculate syspayable
function sysPayable(data) {

	let depositAmount = parseFloat(data.depositAmount);
	let rateOfIntrest = parseFloat(data.roi);
	let syspayable = 0;
	let intrest = 0;


	intrest = (depositAmount * rateOfIntrest * 1) / 100;
	syspayable = depositAmount + intrest;

	return syspayable;


}


//calculate duration
function Deduction(data) {
	let deduct = (200 * 18) / 100;

	return deduct;
}

//calculate netpayment
function netPayment(data) {
	let sysPayable = parseFloat($('#sysPayable').val()) || 0;
	let deduction = parseFloat($('#deduction').val()) || 0;
	let netpay = 0;

	if (!isNaN(sysPayable) && !isNaN(deduction)) {
		netpay = sysPayable - deduction;
	}
	return netpay;
}


//calculate panelty
function Panelty(data) {
	let openingDate = new Date(data.policyStartDate);
	let lastTrans = new Date(data.lastPaymentDate);
	let paymentdate = new Date(document.getElementById("paymentDate").value);
	let policyAmount = parseFloat(data.policyAmount);

	let expected = new Date(lastTrans);
	expected.setMonth(expected.getMonth() + 1);
	expected.setDate(openingDate.getDate());

	console.log("Opening Date:", openingDate.toDateString());
	console.log("Last Transaction:", lastTrans.toDateString());
	console.log("Expected Payment Date:", expected.toDateString());
	console.log("Actual Payment Date:", paymentdate.toDateString());


	let monthsGap = (paymentdate.getFullYear() - lastTrans.getFullYear()) * 12 +
		(paymentdate.getMonth() - lastTrans.getMonth());



	let penalty = 0;
	if (paymentdate > expected) {
		penalty = monthsGap * (1.5 / 100) * policyAmount;
	}

	console.log("Months Gap:", monthsGap);
	console.log("Penalty:", penalty.toFixed(2));

	return penalty;

}

//calculate dueamount
function DueAmount(data) {
	let amount = parseFloat($('#amount').val()) || 0;
	let paidAmount = parseInt(data.depositAmount);
	let policyAmount = parseInt(data.policyAmount);
	let schemeterm = parseFloat($('#duration').val()) || 0;
	let dueamount = 0;


	if (!isNaN(amount) && !isNaN(paidAmount) && !isNaN(policyAmount)) {
		policyAmount = policyAmount * schemeterm;
		dueamount = policyAmount - (amount + paidAmount);
	}
	return dueamount;

}


