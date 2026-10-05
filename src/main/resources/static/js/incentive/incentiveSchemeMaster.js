

$(document).ready(function () {
    $("#formid").submit(function (e) {
        e.preventDefault();

        // Collect form data
        var incentiveData = {
            incentiveMonth: $("#incentiveMonth").val(),
            dateFrom: $("#dateFrom").val(),
            dateTo: $("#dateTo").val(),
            comments: $("#comments").val()
        };

        $.ajax({
            url: "api/incentive/saveIncentive",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(incentiveData),
            success: function (response) {
				
                // Save the response in a variable
                let saveResponse = response;
				alert("Data Save successfully");
				loadIncentiveData();

            },
            error: function (xhr, status, error) {
                let errorResponse = xhr.responseText;
                console.error("Save failed:", errorResponse);
            }
        });
    });
});

$(document).ready(function () {
    loadIncentiveData();
});

function loadIncentiveData() {
    $.ajax({
        url: "api/incentive/getAllIncentives",
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log(response); 
            var tbody = $("#incentiveTableBody");
            tbody.empty();

            
            if (response.data && response.data.length > 0) {
                $.each(response.data, function (index, item) {
                    var row = "<tr>" +
                        "<td>" + (index + 1) + "</td>" +
                        "<td>" + item.incentiveMonth + "</td>" +
                        "<td>" + item.dateFrom + "</td>" +
                        "<td>" + item.dateTo + "</td>" +
                        "<td>" + item.comments + "</td>" +
                        "</tr>";
                    tbody.append(row);
                });
            } else {
                tbody.append("<tr><td colspan='5'>No data found</td></tr>");
            }
        },
        error: function (xhr, status, error) {
            alert("Error: " + xhr.status);
            console.error(xhr.responseText);
        }
    });
}



    
	
	$(document).ready(function() {
		const months = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];

		const monthDropdown = $('#incentiveMonth');
		monthDropdown.empty().append('<option value="">Select</option>');

		months.forEach((month, index) => {
			const monthValue = (index + 1).toString().padStart(2, '0'); // e.g., "01", "02"
			monthDropdown.append(`<option value="${monthValue}">${month}</option>`);
		});

		// Set Date From and Date To when month is selected
		monthDropdown.on('change', function() {
			const selectedMonth = parseInt($(this).val()); // "01" -> 1, "02" -> 2
			const currentYear = new Date().getFullYear();

			if (!isNaN(selectedMonth)) {
				// Create first day of selected month
				const startDate = new Date(currentYear, selectedMonth - 1, 2);
				// Create last day of selected month
				const endDate = new Date(currentYear, selectedMonth, 1);

				// Format as YYYY-MM-DD
				const formatDate = (date) => date.toISOString().split('T')[0];

				$('#dateFrom').val(formatDate(startDate));
				$('#dateTo').val(formatDate(endDate));
			} else {
				$('#dateFrom').val('');
				$('#dateTo').val('');
			}
		});
	});

