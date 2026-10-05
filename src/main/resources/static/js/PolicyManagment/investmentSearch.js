$(document).ready(function() {
	$.ajax({
		url: 'api/Policymangment/getAllPolicyManagementData',
		type: 'GET',
		success: function(response) {
			// Check if response has data array inside `data`
			if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
				let policyOptions = response.data.map(function(item) {
					return {
						id: item.policyCode,
						text: item.policyCode + " - " + item.customerName.toUpperCase()
					};
				});

				$('#policyCode').select2({
					placeholder: '-- SEARCH POLICY CODE OR NAME --',
					data: policyOptions,
					matcher: function(params, data) {
						if ($.trim(params.term) === '') return data;
						if (typeof data.text === 'undefined') return null;

						const term = params.term.toLowerCase();
						const text = data.text.toLowerCase();
						return text.includes(term) ? data : null;
					}
				});
			} else {
				alert("No Policy found.");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching Policies:", error);
			alert("Failed to load Policy codes.");
		}
	});

	$.ajax({
		url: "api/Policymangment/getAllPolicyManagementData",
		type: "GET",
		contentType: "application/json",
		success: function(response) {
			if (response.status === "OK") {
				var tbody = $("#policyTableBody");
				tbody.empty();
				$.each(response.data, function(index, item) {
					var row = `
	                    <tr style="font-family: 'Poppins', sans-serif;">
	                        <td>${index + 1}</td>
	                        <td>${item.policyCode || ''}</td>
	                        <td>${item.customerName.toUpperCase() || ''}</td>
	                        <td>${item.policyStartDate || ''}</td>
	                        <td>${item.contactNo || ''}</td>
	                        <td>${item.address.toUpperCase() || ''}</td>
	                        <td>${item.district.toUpperCase() || ''}</td>
	                        <td>${item.state.toUpperCase() || ''}</td>
	                        <td>${item.branchName.toUpperCase() || ''}</td>
	                        <td>${item.schemeType.toUpperCase() || ''}</td>
	                        <td>${item.policyAmount || ''}</td>
	                        <td>${item.maturityAmount || ''}</td>
	                        <td>${item.paymentBy.toUpperCase() || ''}</td>
	                        <td>${item.approved == true ? 'APPROVED' : 'PENDING'}</td>
	                    </tr>`;
					tbody.append(row);
				});

				// ✅ Bind print button event
				$(".print-btn").off().on("click", function(e) {
					e.preventDefault();
					const policyData = $(this).data("policy");

					$("#certificateTemplate").show();
					printCertificate(policyData); // 🔹 यह आपकी पहले से बनी हुई function call है
				});

			} else {
				$("#policyTableBody").html(
					`<tr><td colspan="15" class="text-center">No data available</td></tr>`
				);
			}
		},
		error: function(xhr, status, error) {
			console.error("❌ Error fetching policies:", error);
			alert("Failed to load policy data.");
		}
	});

	$("#findBtn").click(function() {
		const policyCode = $("#policyCode").val();
		if (!policyCode) {
			$('#policyTableBody').empty();
			return;
		}

		$.ajax({
			url: 'api/Policymangment/getPolicyByPolicyCode',
			method: 'GET',
			data: { policyCode: policyCode },
			dataType: 'json',
			success: function(response) {
				console.log("✅ Response:", response);

				if (response.status === "OK" && response.data) {
					const data = response.data;
					$('#policyTableBody').empty();

					const newRow = `
		                <tr>
		                    <td>1</td>
		                    <td>${data.policyCode || ''}</td>
		                    <td>${data.customerName.toUpperCase() || ''}</td>
		                    <td>${data.policyStartDate || ''}</td>
		                    <td>${data.contactNo || ''}</td>
		                    <td>${data.address.toUpperCase() || ''}</td>
		                    <td>${data.district.toUpperCase() || ''}</td>
		                    <td>${data.state.toUpperCase() || ''}</td>
		                    <td>${data.branchName.toUpperCase() || ''}</td>
		                    <td>${data.schemeType.toUpperCase() || ''}</td>
		                    <td>${data.policyAmount || ''}</td>
		                    <td>${data.maturityAmount || ''}</td>
		                    <td>${data.paymentBy.toUpperCase() || ''}</td>
		                    <td>${(data.approved === true || data.approved === 'true' || data.approved === 1) ? 'APPROVED' : 'PENDING'}</td>
		                </tr>`;
					$('#policyTableBody').append(newRow);

				} else {
					alert("No data found for the selected policy.");
					$('#policyTableBody').empty();
				}
			},
			error: function(xhr) {
				console.error("❌ Error:", xhr);
				alert("Error while fetching policy data.");
			}
		});

	});

});