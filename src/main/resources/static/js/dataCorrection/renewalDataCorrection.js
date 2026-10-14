$(document).ready(function() {
	/*$.ajax({
		url: "api/Policymangment/getaddinvestmentdetails",
		type: "GET",
		success: function(response) {
			if (response.status === "OK") {
				$("#policyCode").empty().append("<option value=''>-- SELECT POLICY CODE --</option>");
				response.data.forEach(function(item) {
					$("#policyCode").append(`<option value='${item.policyCode}'>${item.customerName}-${item.policyCode}</option>`);
				});
			} else {
				alert("NO POLICY CODES FOUND.");
			}
		},
		error: function() {
			alert("FAILED TO LOAD POLICY CODES.");
		}
	});*/

	$.ajax({
		url: 'api/datacorrection/fetchAllApprovedPolicyRenewal',
		type: 'GET',
		success: function(response) {
			if (response.status === "OK") {
				let policyOptions = response.data.map(function(item) {
					return {
						id: item.policyCode,
						text: item.policyCode + " - " + item.clientName
					};
				});

				// Initialize Select2 with full data and custom search matcher
				$('#policyCode').select2({
					placeholder: '-- SEARCH POLICY CODE OR NAME --',
					data: policyOptions,
					matcher: function(params, data) {
						// If no search term, return all
						if ($.trim(params.term) === '') {
							return data;
						}

						if (typeof data.text === 'undefined') {
							return null;
						}

						// Case-insensitive match on memberCode or customerName
						const term = params.term.toLowerCase();
						const text = data.text.toLowerCase();

						if (text.includes(term)) {
							return data;
						}

						return null;
					}
				});

			} else {
				alert("NO POLICY CODES FOUND.");
			}
		},
		error: function() {
			alert("FAILED TO LOAD POLICY CODES.");
		}
	});

	$("#policyCode").change(function() {
		let policyCode = $("#policyCode").val();
		if (policyCode !== "") {
			$.ajax({
				type: "GET",
				url: "api/datacorrection/getPolicyRenewalByPolicyCode",
				data: { policyCode: policyCode },
				success: function(response) {
					if (response.status == "FOUND") {
						let data = response.data[0];
						$("#id").val(data.id);
						$("#renewalDate").val(data.renewalDate);
						$("#policyDate").val(data.policyDate);
						$("#maturityDate").val(data.maturityDate);
						$("#customerCode").val(data.customerCode);
						$("#clientName").val(data.clientName);
						$("#branchname").val(data.branchname);
						$("#contactNo").val(data.contactNo);
						$("#policyAmount").val(data.policyAmount);
						$("#policyType").val(data.policyType);
						$("#policyTerm").val(data.policyTerm);
						$("#maturityAmount").val(data.maturityAmount);
						$("#totalDeposit").val(data.totalDeposit);
						$("#paymentDue").val(data.paymentDue);
						$("#lastPaymentDate").val(data.lastPaymentDate);
						$("#dueDate").val(data.dueDate);
						$("#noOfInst").val(data.noOfInst);
						$("#noOfInstPaid").val(data.noOfInstPaid);
						$("#modeOfPayment").val(data.modeOfPayment);
					} else {
						alert("NO CUSTOMER FOUND FOR THIS MEMBER CODE.");
					}
				},
				error: function() {
					alert("MEMBER NOT FOUND OR SERVER ERROR.");
				}
			});
		}
	});

	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let policyCode = $("#policyCode").val();
		if (policyCode !== "") {
			if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS POLICY RENEWAL DATA?")) {
				$.ajax({
					url: "api/datacorrection/deletePolicyRenewalDataById",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("POLICY RENEWAL DATA DELETED SUCCESSFULLY");
							location.reload();
						} else {
							alert("DELETE FAILED: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("FAILED TO DELETE POLICY RENEWAL.");
						console.error("Error:", error);
					}
				});
			}
		}
		else {
			alert("FIRST SELECT ANY ONE DATA THEN PROCEED TO DELETE!");
		}

	});

});