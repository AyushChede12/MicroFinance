$(document).ready(function() {
	/*$.ajax({
		url: "api/Policymangment/getaddinvestmentdetails",
		type: "GET",
		success: function(response) {
			if (response.status === "OK") {
				$("#policyCode").empty().append("<option value=''>-- Select Policy Code --</option>");
				response.data.forEach(function(item) {
					$("#policyCode").append(`<option value='${item.policyCode}'>${item.customerName}-${item.policyCode}</option>`);
				});
			} else {
				alert("No Policy codes found.");
			}
		},
		error: function() {
			alert("Failed to load Policy codes.");
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
					placeholder: '-- Search Policy Code or Name --',
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
				alert("No Policy codes found.");
			}
		},
		error: function() {
			alert("Failed to load Policy codes.");
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
						alert("No customer found for this member code.");
					}
				},
				error: function() {
					alert("Member not found or server error.");
				}
			});
		}
	});

	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let policyCode = $("#policyCode").val();
		if (policyCode !== "") {
			if (confirm("Are you sure you want to delete this Policy Renewal Data?")) {
				$.ajax({
					url: "api/datacorrection/deletePolicyRenewalDataById",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("Policy Renewal Data Deleted Successfully");
							location.reload();
						} else {
							alert("Delete failed: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("Failed to delete Policy Renewal.");
						console.error("Error:", error);
					}
				});
			}
		}
		else {
			alert("First Select Any One Data Then Proceed To Delete!");
		}

	});

});