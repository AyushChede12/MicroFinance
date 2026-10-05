$(document).ready(function () {
	// Populate dropdown from backend
	$.ajax({
		url: "api/customershareholdingcontroller/findAllTransferShare",
		type: "GET",
		success: function (response) {
			if (response.status === "OK") {
				let dropdown = $("#selectDecisionMaker");
				dropdown.empty().append('<option value="">Select</option>');

				$.each(response.data, function (i, item) {
					dropdown.append(`<option value="${item.findByCode}">${item.findByCode} - ${item.customerName}</option>`);
				});
			} else {
				alert("Failed to load data");
			}
		},
		error: function () {
			alert("Error loading data");
		}
	});

	// Handle Search button click
	$("#searchBtn").click(function () {
		let selectedCode = $("#selectDecisionMaker").val();

		if (!selectedCode) {
			alert("Please select a decision maker!");
			return;
		}

		$.ajax({
			url: "api/customershareholdingcontroller/fetchByFindByCode",
			type: "POST",
			data: { findByCode: selectedCode },
			success: function (response) {
				let tbody = $(".datatable tbody");
				tbody.empty();

				if (response.status === "FOUND" && response.data.length > 0) {
					$.each(response.data, function (i, item) {
						let row = `<tr>
							<td>${i + 1}</td>
							<td>${item.customerName || ""}</td>
							<td>${item.findByCode || ""}</td>
							<td>${item.startDate || ""}</td>
							<td>${item.dateOfTransfer || ""}</td>
							<td>${item.noOfShare || ""}</td>
							<td>${item.balanceShares || ""}</td>
						</tr>`;
						tbody.append(row);
					});
				} else {
					tbody.append('<tr><td colspan="6">No data found for selected customer</td></tr>');
				}
			},
			error: function () {
				alert("Error fetching share data");
			}
		});
	});
});
