$(document).ready(function() {
	$('#searchBtn').on('click', function(event) {
		event.preventDefault();
		var branchName = $('#branchName').val();
		var fromDate = $('#fromDate').val();
		var toDate = $('#toDate').val();

		if (!branchName) {
			alert("PLEASE SELECT A BRANCH.");
			return;
		}

		// Log for debugging
		console.log("Searching:", { branchName, fromDate, toDate });

		$.ajax({
			url: "api/Maturitymanagement/getMaturityByBranchAndDate",
			type: "GET",
			data: {
				branchName: branchName,
				fromDate: fromDate, // Send empty if not selected
				toDate: toDate
			},
			success: function(response) {
				if (response.status === "OK" && response.data.length > 0) {
					var tableBody = $("#table tbody");
					tableBody.empty();

					$.each(response.data, function(index, item) {
						var row = "<tr>" +
							"<td>" + item.policyNo + "</td>" +
							"<td>" + item.branchName + "</td>" +
							"<td>" + item.maturityDate + "</td>" +
							"<td>" + item.customerName + "</td>" +
							"<td>" + item.schemeName + "</td>" +
							"<td>" + item.schemeType + "</td>" +
							"<td>" + item.policyAmount + "</td>" +
							"<td>" + item.maturityAmount + "</td>" +
							"<td>" + item.remark + "</td>" +
							"</tr>";
						tableBody.append(row);
					});
				} else {
					alert("NO RECORDS FOUND FOR THE GIVEN FILTERS.");
				}
			},
			error: function(xhr, status, error) {
				console.error("Error:", error);
				alert("SOMETHING WENT WRONG WHILE FETCHING DATA.");
			}
		});
	});
});