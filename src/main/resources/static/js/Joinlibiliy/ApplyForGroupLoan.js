$(document).ready(function() {
	$.ajax({
		url: "api/joinliability/viewGroupDirectories",
		type: "GET",
		success: function(response) {
			console.log("API response:", response);
			var dropdown1 = $('#groupCode');
			dropdown1.empty();
			dropdown1.append('<option value="">Select</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, customer) {
					dropdown1.append('<option value="' + customer.groupID + '">' + customer.groupID + '</option>');
				});
			} else {
				dropdown1.append('<option value="">No groups found</option>');
			}
		},
		error: function() {
			alert("Failed to fetch group list.");
		}
	});

	// 2. On dropdown change, fetch details of selected group
	$('#groupCode').on('change', function() {
		let selectedCode = $(this).val();

		if (selectedCode !== "") {
			$.ajax({
				url: 'api/joinliability/fetchByGroupID?groupID=' + selectedCode, // ✅ send as query param
				type: 'POST',
				success: function(response) {
					if (response.status === "FOUND") {
						let customer = response.data[0];
						$('#communityName').val(customer.communityName);
						$('#openingDate').val(customer.openingDate);
						$('#selectedMember').val(customer.selectedMember);
						$('#customerName').val(customer.customerName);
						$('#communityaddress').val(customer.communityAddress);
						$('#communityLeader').val(customer.communityLeader);
						$('#contactNumber').val(customer.contactNo);
						$('#branchName').val(customer.branchName);
						$('#allocatedStaff').val(customer.allocatedStaff);
						$('#collectionDays').val(customer.collectionDay);
						$('#communityAddress').val(customer.communityAddress);

					} else {
						alert('No customer data found!');
						$('#communityName').val('');
					}
				},
				error: function() {
					alert('Error while fetching customer data!');
				}
			});
		} else {
			$('#communityName').val('');
		}
	});

	//fecth data from the crete 
	//fecth data from the create group Lending
	$.ajax({
		url: "api/joinliability/viewlendinggroup",
		type: "GET",
		success: function(response) {
			console.log("API response:", response);
			var dropdown1 = $('#planCode');
			dropdown1.empty();
			dropdown1.append('<option value="">Select</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, customer) {
					dropdown1.append('<option value="' + customer.planCode + '">' + customer.planCode + '</option>');
				});
			} else {
				dropdown1.append('<option value="">No groups found</option>');
			}
		},
		error: function() {
			alert("Failed to fetch group list.");
		}
	});

	// 2. On dropdown change, fetch details of selected group
	$('#planCode').on('change', function() {
		let selectedCode = $(this).val();

		if (selectedCode !== "") {
			$.ajax({
				url: 'api/joinliability/fetchByPlanCode?planCode=' + selectedCode, // ✅ send as query param
				type: 'POST',
				success: function(response) {
					if (response.status === "FOUND") {
						let customer = response.data[0];
						$('#loanSchemeName').val(customer.loanSchemeName);
						$('#processingFee').val(customer.processingFeePercent);
						$('#legalCharges').val(customer.legalChargesPercent);
						$('#gstPercentage').val(customer.gstPercent);
						$('#insuranceFee').val(customer.insuranceFeePercent);
						$('#valuationFee').val(customer.valuationFeePercent);
						$('#minLoanAmt').val(customer.minLoanAmt);
						$('#maximumLoanAmount').val(customer.maximumLoanAmount);
						$('#lateAllowanceDays').val(customer.lateAllowanceDays);
						$('#penaltyMode').val(customer.penaltyMode);
						$('#monthlyPenalty').val(customer.monthlyPenalty);
						$('#emiFrequency').val(customer.emiFrequency);
						$('#rateOfInterest').val(customer.rateOfInterest);
						$('#interestType').val(customer.interestType);
						$('#emiType').val(customer.emiType);
						$('#term').val(customer.term);
						$('#totalAmount').val(customer.totalAmount);



					} else {
						alert('No customer data found!');
						$('#processingFee').val('');
					}
				},
				error: function() {
					alert('Error while fetching customer data!');
				}
			});
		} else {
			$('#processingFee').val('');
		}
	});

	// save code 

	$('#saveBtn').on('click', function(e) {
		if (!validateTotalAmount()) {
			e.preventDefault(); // prevent form save if invalid
			$("#totalAmount").focus();
		}



		const groupLoanData = {
			groupCode: $('#groupCode').val(),
			openingDate: $('#openingDate').val(),
			selectedMember: $('#selectedMember').val(),
			customerName: $('#customerName').val(),
			communityName: $('#communityName').val(),
			communityAddress: $('#communityaddress').val(),
			allocatedStaff: $('#allocatedStaff').val(),
			branchName: $('#branchName').val(),
			collectionDays: $('#collectionDays').val(),
			communityLeader: $('#communityLeader').val(),
			communityAddress: $('#communityAddress').val(),
			contactNumber: $('#contactNumber').val(),
			loanPurpose: $('#loanPurpose').val(),
			planCode: $('#planCode').val(),
			totalAmount: $('#totalAmount').val(),
			loanSchemeName: $('#loanSchemeName').val(),
			processingFee: $('#processingFee').val(),
			legalCharges: $('#legalCharges').val(),
			gstPercentage: $('#gstPercentage').val(),
			insuranceFee: $('#insuranceFee').val(),
			valuationFee: $('#valuationFee').val(),
			lateAllowanceDays: $('#lateAllowanceDays').val(),
			penaltyMode: $('#penaltyMode').val(),
			monthlyPenalty: $('#monthlyPenalty').val(),
			emiFrequency: $('#emiFrequency').val(),
			rateOfInterest: $('#rateOfInterest').val(),
			interestType: $('#interestType').val(),
			emiType: $('#emiType').val(),
			approvalStatus: $('#approvalStatus').val(),
			approvalDate: $('#approvalDate').val(),
			photo: $('#photoHidden').val(),
			signature: $('#signatureHidden').val(),
			term:$("#term").val()
		};

		console.log("Sending group loan data:", groupLoanData);

		$.ajax({
			url: 'api/joinliability/saveGroupLoan',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(groupLoanData),
			success: function(response) {
				console.log("✅ Saved successfully:", response);
				alert(response.message || "Group Loan saved successfully!");
				// Optional: Clear form or reload
				$('#formid')[0].reset();
			},
			error: function(xhr, status, error) {
				console.error("❌ Save error:", xhr.responseText);
				alert("Failed to save group loan data. Check inputs or server logs.");
			}
		});
	});
	//feach data
	function fetchGroupLoanData() {
		$.ajax({
			url: "api/joinliability/viewgrouploans",
			type: "GET",
			dataType: "json",
			success: function(response) {
				console.log("API Success:", response);

				// ✅ जर response.status आणि response.data असेल तर
				const data = response.data ? response.data : response;

				const tableBody = $("#groupLoanBody").empty();

				if (data.length > 0) {
					$.each(data, function(index, item) {
						console.log("Item:", item);
						const row = `
						
						
				                           <tr>
				                               <td>${item.groupCode || ''}</td>
				                               <td>${item.planCode || ''}</td>
				                               <td>${item.communityLeader || ''}</td>
				                               <td>${item.loanSchemeName || ''}</td>
				                               <td>${item.selectedMember || ''}</td>
				                               <td>${item.customerName || ''}</td>
				                               <td>${item.emiType || ''}</td>
				                               <td>${item.contactNumber || ''}</td>
											   
				                           </tr>
				                       `;
						tableBody.append(row);
					});
				} else {
					tableBody.html(`<tr><td colspan="7" class="text-center text-warning">No data found.</td></tr>`);
				}
			},
			error: function(xhr, status, error) {
				console.error("API Error:", error);
				$("#groupLoanBody").html(`<tr><td colspan="7" class="text-center text-danger">Something went wrong.</td></tr>`);
			}
		});
	}

	fetchGroupLoanData();
	//total amount
	function validateTotalAmount() {
		const enteredAmount = parseFloat($("#totalAmount").val()) || 0;
		const minAmt = parseFloat($("#minLoanAmt").val()) || 0;
		const maxAmt = parseFloat($("#maximumLoanAmount").val()) || 0;

		if (enteredAmount < minAmt || enteredAmount > maxAmt) {
			$("#totalAmountError")
				.text(`You can apply for a loan between ${minAmt} to ${maxAmt}.`)
				.removeClass("d-none");
			$("#totalAmount").addClass("is-invalid");
			return false;
		} else {
			$("#totalAmountError").text("").addClass("d-none");
			$("#totalAmount").removeClass("is-invalid");
			return true;
		}
	}

	// Validate on blur (field leave)
	$("#totalAmount").on("blur", function() {
		validateTotalAmount();
	});





});



