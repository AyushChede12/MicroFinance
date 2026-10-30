$(document).ready(function() {

	//Dropdown without search
	/*$.ajax({
		url: "api/datacorrection/fetchAllSavingAccountActivity",
		type: "GET",
		success: function(response) {
			if (response.status =/api== "FOUND") {
				$("#accountNumber").empty().append("<option value=''>-- SELECT ACCOUNT NO --</option>");
				response.data.forEach(function(item) {
					$("#accountNumber").append(`<option value='${item.accountNumber}'>${item.accountNumber}</option>`);
				});
			} else {
				alert("NO ACCOUNT NUMBER FOUND.");
			}
		},
		error: function() {
			alert("FAILED TO LOAD ACCOUNT NUMBERS.");
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
					placeholder: '-- SEARCH ACCOUNT NUMBER',
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
				alert("NO ACCOUNT NUMBER FOUND.");
			}
		},
		error: function() {
			alert("FAILED TO LOAD ACCOUNT NUMBER.");
		}
	});

	$.ajax({
		url: "api/preference/getAllBranchModule", // Add base path if needed like /api/preference/getAllBranchModule
		type: "GET",
		success: function(response) {
			if (response.status == "FOUND") {
				const branchList = response.data;
				$("#branchName").empty(); // Clear existing options
				$("#branchName").append("<option value=''>-- SELECT BRANCH --</option>");

				for (let i = 0; i < branchList.length; i++) {
					let branch = branchList[i];
					let option = `<option value="${branch.branchName}">${branch.branchName}</option>`;
					$("#branchName").append(option);

				}
			} else {
				alert("ERROR: " + response.message);
			}
		},
		error: function(xhr) {
			console.error("Error loading branches:", xhr.responseText);
			alert("FAILED TO LOAD DROPDOWN DATA.");
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
					alert("SAVINGS TRANSACTION NOT FOUND FOR ACCOUNT NUMBER");
				}
			},
			error: function() {
				alert("SAVINGS TRANSACTION NOT FOUND OR SERVER ERROR");
			}
		});

	});

	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let accountNumber = $("#accountNumber").val();
		if (accountNumber !== "") {
			if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS SAVING TRANSACTION?")) {
				$.ajax({
					url: "api/datacorrection/deleteSavingTransactionRemoval",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("SAVING TRANSACTION DELETED SUCCESSFULLY");
							location.reload();
						} else {
							alert("DELETE FAILED: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("FAILED TO DELETE SAVING TRANSACTION.");
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