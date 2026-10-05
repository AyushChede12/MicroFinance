$(document).ready(function() {
	$.ajax({
		url: "api/datacorrection/fetchAllApprovedFlexibleRenewal",
		type: "GET",
		success: function(response) {
			if (response.status === "FOUND") {
				$("#policyCode").empty().append("<option value=''>-- Select Policy Code --</option>");
				response.data.forEach(function(item) {
					$("#policyCode").append(`<option value='${item.policyCode}'>${item.clientName}-${item.policyCode}</option>`);
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
				url: "api/datacorrection/getFlexibleRenewalByPolicyCode",
				data: { policyCode: policyCode },
				success: function(response) {
					alert("Success");
					if (response.status == "FOUND") {
						let data = response.data[0];
						$("#id").val(data.id);
						$("#renewalDate").val(data.renewalDate);
						$("#branchName").val(data.branchname);
						$("#policyDate").val(data.policyDate);
						$("#maturityDate").val(data.maturityDate);
						$("#customerCode").val(data.customerCode);
						$("#clientName").val(data.clientName);
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
						alert("No Data for this Policy code.");
					}
				},
				error: function() {
					alert("Data not found or server error.");
				}
			});
		}
	});

	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let policyCode = $("#policyCode").val();
		if (policyCode !== "") {
			if (confirm("Are you sure you want to delete this Flexible Renewal Data?")) {
				$.ajax({
					url: "api/datacorrection/deleteFlexibleRenewalDataById",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("Flexible Renewal Data Deleted Successfully");
							location.reload();
						} else {
							alert("Delete failed: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("Failed to delete Flexible Renewal.");
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