$(document).ready(function() {
	memberCodeDropdown();
});


//anjali patil

let allKYCData = [];

$(document).ready(function() {
	// Load all member data on page load
	loadCustomerKYCData();

	// Button click filter
	$('#findBtn').on('click', function(e) {
		e.preventDefault(); // Prevent form submission
		filterKYCData();
	});
});

function loadCustomerKYCData() {
	$.ajax({
		url: "api/requestapproval/unapproved",
		type: "GET",
		contentType: "application/json",
		success: function(response) {
			if (response.status === "OK" && Array.isArray(response.data)) {
				allKYCData = response.data;
				//populateMemberCodeDropdown(allKYCData);
				renderTable(allKYCData); // Initially show all
			} else {
				alert("No member data found.");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching data:", error);
			alert("Failed to load data.");
		}
	});
}

function populateMemberCodeDropdown(data) {
	const dropdown = $('#branchName');
	dropdown.empty().append('<option value="">Select Branch</option>');
	const uniqueCodes = [...new Set(data.map(item => item.branchName))];
	uniqueCodes.forEach(code => {
		dropdown.append(`<option value="${code}">${code}</option>`);
	});
}

function renderTable(data) {
    const tbody = $(".datatable tbody");
    tbody.empty();

    if (!data || data.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="12" style="text-align:center; font-family: 'Poppins', sans-serif;">
                    No data found
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((item, index) => {

        // 🔹 Build FULL NAME
        const fullName = [
            item.firstName,
            item.middleName,
            item.lastName
        ].filter(Boolean).join(" ");

        const row = `
            <tr style="font-family: 'Poppins', sans-serif;">
                <td>
                    <input type="checkbox" class="approval-checkbox"
                        data-id="${item.id}" ${item.isApproved ? 'checked' : ''} />
                </td>

                <td>${index + 1}</td>

                <!-- 👇 now using fullName instead of item.customerName -->
                <td>${fullName || '-'}</td>

                <td>${item.memberCode || '-'}</td>
                <td>${item.branchName || '-'}</td>
                <td>${item.dob || '-'}</td>
                <td>${item.customerAge || '-'}</td>
                <td>${item.customerGender || '-'}</td>
                <td>${item.customerAddress || '-'}</td>
                <td>${item.academicBackground || '-'}</td>
                <td>${item.contactNo || '-'}</td>
                <td>${item.emailId || '-'}</td>
            </tr>
        `;

        tbody.append(row);
    });
}


//filter table
function filterKYCData() {
    const selectedCode = $('#branchName').val();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allKYCData.filter(item => {

        const branchName = item.branchName;
        const dob = item.dob ? new Date(item.dob) : null;

        // Branch filter
        const matchesCode = selectedCode ? branchName === selectedCode : true;

        // DOB null ho aur date selected ho → match false
        if (!dob && (fromDate || toDate)) {
            return false;
        }

        // Date From
        const matchesFrom = fromDate ? dob >= fromDate : true;

        // Date To
        const matchesTo = toDate ? dob <= toDate : true;

        return matchesCode && matchesFrom && matchesTo;
    });

    renderTable(filtered);
}


//anjali  approve button code

$(document).ready(function() {
	$('#approvedBtn').click(function(e) {
		e.preventDefault();

		const selectedCheckboxes = $('.approval-checkbox:checked');

		if (selectedCheckboxes.length === 0) {
			alert("Please select at least one customer to approve.");
			return;
		}

		selectedCheckboxes.each(function() {
			const id = $(this).data('id');
			const isApproved = 1; // because you're only approving selected ones

			$.ajax({
				url: `api/requestapproval/approvedCustomerData?id=${id}&isApproved=${isApproved}`,
				type: 'POST',
				success: function(response) {
					if (response.status === "OK") {
						alert("Approved Successfully!");
						location.reload();
					}
				},
				error: function(xhr) {
					alert("Error approving ID " + id);
					console.error(xhr);
				}
			});
		});

	});
});

//Get All brnach in DropDowne
$(document).ready(function() {
	$.ajax({
		url: "api/preference/getAllBranchModule", // Add base path if needed like api/preference/getAllBranchModule
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
					$("#branch").append(option);
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
});