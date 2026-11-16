$(document).ready(function() {

	function searchHierarchy() {
		let financialCode = $("#financialCode").val().trim().toUpperCase();

		if (!financialCode) {
			alert("PLEASE ENTER A FINANCIAL CONSULTANT CODE.");
			return;
		}

		$.ajax({
			url: 'api/financialconsultant/getfinancialHierarchyByFinancialCode',
			type: 'GET',
			data: { financialCode: financialCode },
			success: function(response) {
				if (response.status === 'OK' && response.data && response.data.length > 0) {
					// Primary consultant is the first matching
					let primary = response.data[0];
					$('#financialName').val((primary.financialName || '').toUpperCase());
					$('#selectPosition').val((primary.selectPosition || '').toUpperCase());

					let tableBody = '';
					response.data.forEach(function(item, index) {
						let isPrimary = (item.financialCode && item.financialCode.toUpperCase() === financialCode);
						let roleTag = isPrimary 
							? '<span class="badge bg-primary text-white">ROOT / PRIMARY</span>' 
							: '<span class="badge bg-info text-white">DOWNLINE / TEAM</span>';

						let statusText = (item.financialStatus === "1" || item.financialStatus === "ACTIVE" || item.financialStatus === true) ? "ACTIVE" : "INACTIVE";
						let statusBadge = statusText === "ACTIVE" 
							? '<span class="badge bg-success text-white">ACTIVE</span>' 
							: '<span class="badge bg-danger text-white">INACTIVE</span>';

						tableBody += `
							<tr style="font-family: 'Poppins', sans-serif;">
								<td>${index + 1}</td>
								<td>${roleTag}</td>
								<td>${(item.financialName || '').toUpperCase()}</td>
								<td><strong>${item.financialCode || ''}</strong></td>
								<td>${(item.selectPosition || '').toUpperCase()}</td>
								<td>${item.contactNo || ''}</td>
								<td>${item.joiningDate || ''}</td>
								<td>${(item.branchName || '').toUpperCase()}</td>
								<td>${(item.referralCode || '-').toUpperCase()}</td>
								<td>${statusBadge}</td>
							</tr>
						`;
					});
					$(".datatable tbody").html(tableBody);
				} else {
					$('#financialName').val('');
					$('#selectPosition').val('');
					$(".datatable tbody").html(`<tr><td colspan="10" class="text-center text-danger">NO FINANCIAL CONSULTANT HIERARCHY RECORDS FOUND FOR THIS CODE.</td></tr>`);
					alert("NO FINANCIAL CONSULTANT HIERARCHY RECORDS FOUND FOR THIS CODE.");
				}
			},
			error: function(xhr) {
				$('#financialName').val('');
				$('#selectPosition').val('');
				$(".datatable tbody").html(`<tr><td colspan="10" class="text-center text-danger">ERROR FETCHING HIERARCHY DATA.</td></tr>`);
				alert("ERROR: " + ((xhr.responseJSON && xhr.responseJSON.message) ? xhr.responseJSON.message.toUpperCase() : "FAILED TO FETCH HIERARCHY DATA."));
			}
		});
	}

	$("#searchBtn").click(function() {
		searchHierarchy();
	});

	$("#financialCode").keypress(function(e) {
		if (e.which === 13) {
			e.preventDefault();
			searchHierarchy();
		}
	});

	$("#financialCode").blur(function() {
		let code = $(this).val().trim();
		if (code) {
			searchHierarchy();
		}
	});

});
