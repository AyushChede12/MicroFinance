$(document).ready(function() {

	//Dropdown without search
	/*$.ajax({
		url: "api/datacorrection/fetchAllSavingAccountActivity",
		type: "GET",
		success: function(response) {
			if (response.status =/api== "FOUND") {
				$("#accountNumber").empty().append("<option value=''>-- Select Account No --</option>");
				response.data.forEach(function(item) {
					$("#accountNumber").append(`<option value='${item.accountNumber}'>${item.accountNumber}</option>`);
				});
			} else {
				alert("No Account Number found.");
			}
		},
		error: function() {
			alert("Failed to load Account Numbers.");
		}
	});*/

	//Dropdown without search
	$.ajax({
		url: 'api/datacorrection/fetchAllSavingAccountActivity',
		type: 'GET',
		success: function(response) {
			if (response.status === "FOUND") {
				let savingOptions = response.data.map(function(item) {
					return {
						id: item.accountNumber,
						text: item.accountNumber
					};
				});

				// Initialize Select2 with full data and custom search matcher
				$('#accountNumber').select2({
					placeholder: '-- Search Account Number',
					data: savingOptions,
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
				alert("No Account Number found.");
			}
		},
		error: function() {
			alert("Failed to load Account Number.");
		}
	});

	$.ajax({
		url: "api/preference/getAllBranchModule", // Add base path if needed like /api/preference/getAllBranchModule
		type: "GET",
		success: function(response) {
			if (response.status == "FOUND") {
				const branchList = response.data;
				$("#branchName").empty(); // Clear existing options
				$("#branchName").append("<option value=''>-- Select Branch --</option>");

				for (let i = 0; i < branchList.length; i++) {
					let branch = branchList[i];
					let option = `<option value="${branch.branchName}">${branch.branchName}</option>`;
					$("#branchName").append(option);

				}
			} else {
				alert("Error: " + response.message);
			}
		},
		error: function(xhr) {
			console.error("Error loading branches:", xhr.responseText);
			alert("Failed to load dropdown data.");
		}
	});

	$("#accountNumber").change(function() {
		let accountNumber = $("#accountNumber").val();
		$.ajax({
			type: "GET",
			url: "api/customersavings/getsavingaccountactivity",
			data: { accountNumber: accountNumber },
			success: function(response, e) {
				if (response.status == "OK") {
					let data = response.data[0];
					$("#id").val(data.id);
					$("#selectSavingTransactionId").val(data.selectSavingTransactionId);
					$("#transactionDate").val(data.transactionDate);
					$("#branchName").val(data.selectBranchName);
					$("#customerCode").val(data.customerCode);
					$("#customerName").val(data.customerName);
					$("#contactNumber").val(data.contactNumber);
					$("#jointHolderName").val(data.jointHolderName);
					$("#savingPlanName").val(data.savingPlanName);

					//Payment Details
					$("#averageBalance").val(data.averageBalance);
					$("#transactionFor").val(data.transactionFor);
					$("#comments").val(data.comments);
					$("#transactionType").val(data.transactionType);
					$("#transactionAmount").val(data.transactionAmount);
					$("#payBy").val(data.payBy);

				} else {
					alert("Transfer Share Details Not Found For Customer");
				}
			},
			error: function() {
				alert("Shares not found or server error");
			}
		});

	});

	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let accountNumber = $("#accountNumber").val();
		if (accountNumber !== "") {
			if (confirm("Are you sure you want to delete this Saving Transaction?")) {
				$.ajax({
					url: "api/datacorrection/deleteSavingTransactionRemoval",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("Saving Transaction Deleted Successfully");
							location.reload();
						} else {
							alert("Delete failed: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("Failed to delete Saving Transaction.");
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