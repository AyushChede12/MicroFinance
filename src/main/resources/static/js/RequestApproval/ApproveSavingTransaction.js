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

// janvi : search In The Savings Transaction on Table
//Fetch Unapproved Savings Transaction
let allSavingTransactionData = []; 

function searchInTheSavingTransaction() {
	$.ajax({
		url: "api/requestapproval/getUnapprovedSavingTransaction",
		type: "POST",
		contentType: "application/json",
		success: function(response) {
			console.log("API Response:", response);
			if (response.status === "OK" && Array.isArray(response.data)) {
				allSavingTransactionData = response.data;
				renderTable(allSavingTransactionData);
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
				<td>${item.accountNumber || '-'}</td>
				<td>${item.enterCustomerName || '-'}</td>
				<td>${item.openingDate || '-'}</td>
				<td>${item.contactNumber || '-'}</td>
				<td>${item.selectByCustomer || '-'}</td>
				<td>${item.branchName || '-'}</td>
				<td>${item.openingAmount || '-'}</td>
				<td>${item.modeOfPayment || '-'}</td>
			
            </tr>
        `;
		tbody.append(row);
	});
}

//Janvi : Apply filter
function filterByBranchName() {
    const selectedbranchName = $('#branchName').val().trim().toLowerCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allSavingTransactionData.filter(item => {
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
function updateSavingTransactionApprovalStatus(id, isApproved) {
	 
    $.ajax({
        url: "api/requestapproval/approvedSavingTransactionData",
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