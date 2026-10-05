// janvi : search In The Finance Onboarding on Table
//Fetch Unapproved Financial Consultants
let allFinancialConsultantData = []; 

function searchInTheFinanceOnboarding() {
	$.ajax({
		url: "api/financialconsultant/getUnapprovedFinancialConsultants",
		type: "POST",
		contentType: "application/json",
		success: function(response) {
			console.log("API Response:", response);
			if (response.status === "OK" && Array.isArray(response.data)) {
				allFinancialConsultantData = response.data;
				renderTable(allFinancialConsultantData);
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

function renderTable(data) {
	const tbody = $(".datatable tbody");
	tbody.empty();

	data.forEach((item, index) => {
		const row = `
            <tr style="font-family: 'Poppins', sans-serif;">
                <td><input type="checkbox" class="member-checkbox" value="${item.id}"></td>
				<td>${index + 1}</td>
				<td>${item.financialName || '-'}</td>
				<td>${item.financialCode || '-'}</td>
				<td>${item.dob || '-'}</td>
				<td>${item.academicBackground || '-'}</td>
				<td>${item.contactNo || '-'}</td>
				<td>${item.profession || '-'}</td>
				<td>${item.joiningDate || '-'}</td>
				<td>${item.modeofPayment || '-'}</td>
				<td>${item.branchName || '-'}</td>
            </tr>
        `;
		tbody.append(row);
	});
}




//janvi:Branch Name Dropdown
function branchNameDropdown() {
$.ajax({
		url: "getAllBranchModule",
		type: "GET",
		contentType: "application/json",
		success: function (response) {
			if (response.status === "OK" && response.data) {
				$("#branchName").empty().append("<option value=''>-- Select Code --</option>");
				response.data.forEach(function (item) {
					$("#branchName").append(`<option value='${item.branchName}'>${item.branchName}</option>`);
				});
			} else {
				alert("No branch found.");
			}
		}
	});
}

//Janvi : Apply filter
function filterBranchNameData() {
    const selectedbranchName = $('#branchName').val().trim().toLowerCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allFinancialConsultantData.filter(item => {
        const branchName = item.branchName ? item.branchName.trim().toLowerCase() : "";
        const joiningDate = item.joiningDate ? new Date(item.joiningDate) : null;

        const matchesbranch = selectedbranchName ? branchName === selectedbranchName : true;

        let matchesFrom = true;
        let matchesTo = true;

        if (fromDate && joiningDate) {
            matchesFrom = joiningDate.getTime() >= fromDate.getTime();
        }

        if (toDate && joiningDate) {
            matchesTo = joiningDate.getTime() <= toDate.getTime();
        }

        return matchesbranch && matchesFrom && matchesTo;
    });

    renderTable(filtered);
}

//Janvi : Update Status Approved
function updateMemberApprovalStatus(id, isApproved) {
	 
    $.ajax({
        url: "api/financialconsultant/approvedFinancialConsultantData",
        type: "POST",
        data: {
            id: id,
            isApproved: isApproved
        },
        success: function(response) {
            console.log("Approval updated for ID:", id, response);
            alert("Approval status updated successfully for ID: " + id);
            // Optionally show success toast
        },
        error: function(xhr, status, error) {
            console.error("Error updating approval for ID:", id, error);
            alert("Could not update approval status for ID: " + id);
        }
    });
}