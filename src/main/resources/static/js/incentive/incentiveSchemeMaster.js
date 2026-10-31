$(document).ready(function() {

	const months = [
		"JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
		"JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
	];

	const monthDropdown = $('#incentiveMonth');
	monthDropdown.empty().append('<option value="">-- SELECT INCENTIVE MONTH --</option>');
	months.forEach((month, index) => {
		monthDropdown.append(`<option value="${month}">${month}</option>`);
	});

	// Auto-fill Date From and Date To when Month is selected
	monthDropdown.on('change', function() {
		const selectedMonthName = $(this).val();
		const selectedMonthIndex = months.indexOf(selectedMonthName);
		const currentYear = new Date().getFullYear();

		if (selectedMonthIndex >= 0) {
			const monthNum = String(selectedMonthIndex + 1).padStart(2, '0');
			const lastDay = new Date(currentYear, selectedMonthIndex + 1, 0).getDate();
			const lastDayStr = String(lastDay).padStart(2, '0');

			$('#dateFrom').val(`${currentYear}-${monthNum}-01`);
			$('#dateTo').val(`${currentYear}-${monthNum}-${lastDayStr}`);
		} else {
			$('#dateFrom').val('');
			$('#dateTo').val('');
		}
	});

	// Load existing schemes on page load
	loadIncentiveData();

	// SAVE Scheme
	$("#formid").submit(function(e) {
		e.preventDefault();

		const incentiveMonth = $("#incentiveMonth").val();
		const dateFrom = $("#dateFrom").val();
		const dateTo = $("#dateTo").val();
		const comments = $("#comments").val();

		if (!incentiveMonth || !dateFrom || !dateTo) {
			alert("PLEASE FILL ALL REQUIRED FIELDS!");
			return;
		}

		const incentiveData = {
			incentiveMonth: incentiveMonth.toUpperCase(),
			dateFrom: dateFrom,
			dateTo: dateTo,
			comments: (comments || "").toUpperCase()
		};

		$.ajax({
			url: "api/incentive/saveIncentive",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(incentiveData),
			success: function(response) {
				if (response.status === "OK" || response.status === "FOUND" || response.status == 200) {
					alert("INCENTIVE SCHEME SAVED SUCCESSFULLY!");
					resetForm();
					loadIncentiveData();
				} else {
					alert("FAILED TO SAVE INCENTIVE: " + (response.message || "").toUpperCase());
				}
			},
			error: function(xhr) {
				console.error("SAVE FAILED:", xhr);
				alert("ERROR WHILE SAVING INCENTIVE SCHEME.");
			}
		});
	});

	// UPDATE Scheme
	$("#updateBtn").click(function() {
		const id = $("#id").val();
		const incentiveMonth = $("#incentiveMonth").val();
		const dateFrom = $("#dateFrom").val();
		const dateTo = $("#dateTo").val();
		const comments = $("#comments").val();

		if (!id) {
			alert("NO INCENTIVE SCHEME SELECTED FOR UPDATE!");
			return;
		}

		if (!incentiveMonth || !dateFrom || !dateTo) {
			alert("PLEASE FILL ALL REQUIRED FIELDS!");
			return;
		}

		const updateData = {
			id: parseInt(id),
			incentiveMonth: incentiveMonth.toUpperCase(),
			dateFrom: dateFrom,
			dateTo: dateTo,
			comments: (comments || "").toUpperCase()
		};

		$.ajax({
			url: "api/incentive/updateIncentive",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(updateData),
			success: function(response) {
				if (response.status === "OK" || response.status === "FOUND" || response.status == 200) {
					alert("INCENTIVE SCHEME UPDATED SUCCESSFULLY!");
					resetForm();
					loadIncentiveData();
				} else {
					alert("FAILED TO UPDATE INCENTIVE: " + (response.message || "").toUpperCase());
				}
			},
			error: function(xhr) {
				console.error("UPDATE FAILED:", xhr);
				alert("ERROR WHILE UPDATING INCENTIVE SCHEME.");
			}
		});
	});

	// RESET Button
	$("#resetBtn").click(function() {
		resetForm();
	});

});

function resetForm() {
	$("#id").val("");
	$("#incentiveMonth").val("");
	$("#dateFrom").val("");
	$("#dateTo").val("");
	$("#comments").val("");
	$("#saveBtn").show();
	$("#updateBtn").hide();
}

function loadIncentiveData() {
	$.ajax({
		url: "api/incentive/getAllIncentives",
		type: "GET",
		contentType: "application/json",
		success: function(response) {
			const tbody = $("#incentiveTableBody");
			tbody.empty();

			if (response && response.data && response.data.length > 0) {
				$.each(response.data, function(index, item) {
					const month = (item.incentiveMonth || "").toUpperCase();
					const from = (item.dateFrom || "").toUpperCase();
					const to = (item.dateTo || "").toUpperCase();
					const comments = (item.comments || "-").toUpperCase();

					const row = `
						<tr>
							<td>${index + 1}</td>
							<td><strong>${month}</strong></td>
							<td>${from}</td>
							<td>${to}</td>
							<td>${comments}</td>
							<td class="text-center">
								<button type="button" class="btn btn-sm btn-primary" onclick="editIncentive(${item.id})">EDIT</button>
								<button type="button" class="btn btn-sm btn-danger ml-1" onclick="deleteIncentive(${item.id})">DELETE</button>
							</td>
						</tr>
					`;
					tbody.append(row);
				});
			} else {
				tbody.append("<tr><td colspan='6' class='text-center'>NO INCENTIVE SCHEMES FOUND</td></tr>");
			}
		},
		error: function(xhr) {
			console.error("FAILED TO LOAD INCENTIVES:", xhr);
			$("#incentiveTableBody").empty().append("<tr><td colspan='6' class='text-center text-danger'>ERROR LOADING INCENTIVE SCHEMES</td></tr>");
		}
	});
}

function editIncentive(id) {
	$.ajax({
		url: "api/incentive/getIncentiveById?id=" + id,
		type: "GET",
		success: function(response) {
			if (response && response.data) {
				const data = response.data;
				$("#id").val(data.id);
				$("#incentiveMonth").val((data.incentiveMonth || "").toUpperCase());
				$("#dateFrom").val(data.dateFrom || "");
				$("#dateTo").val(data.dateTo || "");
				$("#comments").val((data.comments || "").toUpperCase());

				$("#saveBtn").hide();
				$("#updateBtn").show();
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				alert("INCENTIVE SCHEME NOT FOUND!");
			}
		},
		error: function() {
			alert("FAILED TO FETCH INCENTIVE DETAILS.");
		}
	});
}

function deleteIncentive(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS INCENTIVE SCHEME?")) {
		$.ajax({
			url: "api/incentive/deleteIncentiveById?id=" + id,
			type: "POST",
			success: function(response) {
				alert("INCENTIVE SCHEME DELETED SUCCESSFULLY!");
				resetForm();
				loadIncentiveData();
			},
			error: function() {
				alert("FAILED TO DELETE INCENTIVE SCHEME.");
			}
		});
	}
}
