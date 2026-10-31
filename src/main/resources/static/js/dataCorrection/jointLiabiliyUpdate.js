$(document).ready(function() {

	$.ajax({

		url: 'api/joinliability/viewgrouploans',

		type: 'GET',

		success: function(response) {

			if (response && Array.isArray(response.data) && response.data.length > 0) {

				// Safe sorting (handle nulls)

				response.data.sort((a, b) => {

					const aCode = a.groupCode || '';

					const bCode = b.groupCode || '';

					return aCode.localeCompare(bCode);

				});



				// Map to Select2 options

				let groupOptions = response.data.map(function(item) {

					return {

						id: item.groupCode,

						text: item.groupCode

					};

				});



				// Initialize Select2

				$('#groupCode').select2({

					placeholder: '-- SEARCH GROUP CODE --',

					data: groupOptions,

					allowClear: true,

					matcher: function(params, data) {

						if ($.trim(params.term) === '') return data;

						if (!data || !data.text) return null; // ⛑️ null safety



						const term = params.term.toLowerCase();

						const text = data.text.toLowerCase();



						return text.includes(term) ? data : null;

					}



				});

			} else {

				alert("NO APPROVED GROUP FOUND.");

			}

		},

		error: function() {

			alert("FAILED TO LOAD GROUP CODES.");

		}

	});



	$("#groupCode").change(function() {

		let groupCode = $("#groupCode").val();

		if (groupCode !== "") {

			$.ajax({

				type: "POST",

				url: "api/joinliability/fetchBygroupCode",

				data: { groupCode: groupCode },

				success: function(response) {

					if (response.status == "FOUND") {

						let data = response.data[0];

						$("#id").val(data.id);

						$("#openingDate").val(data.openingDate);

						$("#communityName").val(data.communityName);

						$("#allocatedStaff").val(data.allocatedStaff);

						$("#branchName").val(data.branchName);

						$("#collectionDays").val(data.collectionDays);

						$("#communityLeader").val(data.communityLeader);

						$("#contactNumber").val(data.contactNumber);

						$("#loanPurpose").val(data.loanPurpose);

						$("#planCode").val(data.planCode);

						$("#loanSchemeName").val(data.loanSchemeName);

						$("#processingFee").val(data.processingFee);

						$("#legalCharges").val(data.legalCharges);

						$("#gstPercentage").val(data.gstPercentage);

						$("#insuranceFee").val(data.insuranceFee);

						$("#valuationFee").val(data.valuationFee);

						$("#penaltyMode").val(data.penaltyMode);

						$("#monthlyPenalty").val(data.monthlyPenalty);

						$("#emiFrequency").val(data.emiFrequency);

						$("#rateOfInterest").val(data.rateOfInterest);

						$("#Term").val(data.Term);

						$("#totalAmount").val(data.totalAmount);

						$("#interestType").val(data.interestType);

						$("#emiType").val(data.emiType);

						$("#approvalDate").val(data.approvalDate);





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



	$.ajax({

		url: "api/joinliability/viewlendinggroup",

		type: "GET",

		success: function(response) {

			console.log("API response:", response);

			var dropdown1 = $('#planCode');

			dropdown1.empty();

			dropdown1.append('<option value="">SELECT</option>');



			if (response.status === "OK" && response.data) {

				$.each(response.data, function(index, customer) {

					dropdown1.append('<option value="' + customer.planCode + '">' + customer.planCode + '</option>');

				});

			} else {

				dropdown1.append('<option value="">NO GROUPS FOUND</option>');

			}

		},

		error: function() {

			alert("FAILED TO FETCH GROUP LIST.");

		}

	});



	$('#updateBtn').click(function(event) {

		event.preventDefault();

		let groupCode = $("#groupCode").val();

		if (!groupCode) {

			alert("FIRST SELECT THE DATA, THEN PROCEED TO UPDATE.");

			return;

		}

		const groupData = {

			id: $("#id").val(),

			groupCode: groupCode,

			openingDate: $("#openingDate").val(),

			communityName: $("#communityName").val(),

			allocatedStaff: $("#allocatedStaff").val(),

			branchName: $("#branchName").val(),

			collectionDays: $("#collectionDays").val(),

			communityLeader: $("#communityLeader").val(),

			contactNumber: $("#contactNumber").val(),

			loanPurpose: $("#loanPurpose").val(),

			planCode: $("#planCode").val(),

			processingFee: $("#processingFee").val(),

			legalCharges: $("#legalCharges").val(),

			gstPercentage: $("#gstPercentage").val(),

			insuranceFee: $("#insuranceFee").val(),

			valuationFee: $("#valuationFee").val(),

			penaltyMode: $("#penaltyMode").val(),

			monthlyPenalty: $("#monthlyPenalty").val(),

			emiFrequency: $("#emiFrequency").val(),

			rateOfInterest: $("#rateOfInterest").val(),

			Term: $("#Term").val(),

			totalAmount: $("#totalAmount").val(),

			interestType: $("#interestType").val(),

			emiType: $("#emiType").val(),

			approvalDate: $("#approvalDate").val()

		};



		$.ajax({

			url: "api/datacorrection/updateDataOfJointLiability",

			type: "POST",

			contentType: "application/json",

			data: JSON.stringify(groupData),

			success: function(response) {

				if (response.status == "OK") {
					alert("JOINT LIABILITY DATA UPDATED SUCCESSFULLY.");
					location.reload();
				} else {
					alert("FAILED TO UPDATE JOINT LIABILITY DATA: " + (response.message || ""));
				}
			},
			error: function(xhr, status, error) {
				alert("ERROR: " + xhr.responseText);
			}

		});

	});



	$('#deleteBtn').click(function(event) {

		var id = $("#id").val();

		let groupCode = $("#groupCode").val();

		if (groupCode !== "") {

			if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS JOINT LIABILITY DATA?")) {

				$.ajax({

					url: "api/datacorrection/deleteJointLiabilityDataById",

					type: "POST",

					data: { id: id },

					success: function(response) {

						if (response.status == "OK") {

							alert("JOINT LIABILITY DATA DELETED SUCCESSFULLY");

							location.reload();

						} else {

							alert("DELETE FAILED: " + response.message);

						}

					},

					error: function(xhr, status, error) {

						alert("FAILED TO DELETE JOINT LIABILITY.");

						console.error("Error:", error);

					}

				});

			}

		}

		else {

			alert("FIRST SELECT ANY ONE DATA THEN PROCEED TO DELETE!");

		}



	});



	$('#newBtn').click(function(event) {

		location.reload();

	});



});