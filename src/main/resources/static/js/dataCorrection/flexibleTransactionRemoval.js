$(document).ready(function() {
	$.ajax({
		url: "api/datacorrection/fetchAllApprovedFlexibleRenewal",
		type: "GET",
		success: function(response) {
			if (response.status === "FOUND") {
				$("#policyCode").empty().append("<option value=''>-- SELECT POLICY CODE --</option>");
				response.data.forEach(function(item) {
					$("#policyCode").append(`<option value='${item.policyCode}'>${item.clientName}-${item.policyCode}</option>`);
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
				url: "api/datacorrection/getFlexibleRenewalByPolicyCode",
				data: { policyCode: policyCode },
				success: function(response) {
					alert("SUCCESS");
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
						alert("NO DATA FOR THIS POLICY CODE.");
					}
				},
				error: function() {
					alert("DATA NOT FOUND OR SERVER ERROR.");
				}
			});
		}
	});

	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let policyCode = $("#policyCode").val();
		if (policyCode !== "") {
			if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS FLEXIBLE RENEWAL DATA?")) {
				$.ajax({
					url: "api/datacorrection/deleteFlexibleRenewalDataById",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("FLEXIBLE RENEWAL DATA DELETED SUCCESSFULLY");
							location.reload();
						} else {
							alert("DELETE FAILED: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("FAILED TO DELETE FLEXIBLE RENEWAL.");
						console.error("ERROR:", error);
					}
				});
			}
		}
		else {
			alert("FIRST SELECT ANY ONE DATA THEN PROCEED TO DELETE!");
		}

	});

});