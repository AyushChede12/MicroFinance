$(document).ready(function() {

	// 1. Load Branches Dropdown
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/preference/getAllBranchModule',
		success: function(response) {
			const list = response.data || response || [];
			let options = "<option value=''>ALL BRANCHES</option>";
			for (let i = 0; i < list.length; i++) {
				const bName = (list[i].branchName || "").toUpperCase();
				options += `<option value="${bName}">${bName}</option>`;
			}
			$("#branchName").html(options);
		},
		error: function() {
			console.warn("FAILED TO LOAD BRANCHES");
		}
	});

	// 2. Load Designations Dropdown
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getDesignationList',
		success: function(data) {
			const list = data || [];
			let options = "<option value=''>ALL DESIGNATIONS</option>";
			for (let i = 0; i < list.length; i++) {
				const dName = (list[i].designationName || "").toUpperCase();
				options += `<option value="${dName}">${dName}</option>`;
			}
			$("#designation").html(options);
		},
		error: function() {
			console.warn("FAILED TO LOAD DESIGNATIONS");
		}
	});

	// 3. Load Departments Dropdown
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getDepartmentList',
		success: function(data) {
			const list = data || [];
			let options = "<option value=''>ALL DEPARTMENTS</option>";
			for (let i = 0; i < list.length; i++) {
				const depName = (list[i].departmentName || "").toUpperCase();
				options += `<option value="${depName}">${depName}</option>`;
			}
			$("#department").html(options);
		},
		error: function() {
			console.warn("FAILED TO LOAD DEPARTMENTS");
		}
	});

	// 4. Perform Search
	function searchTeamMembers() {
		const filterData = {
			branchName: $("#branchName").val() || "",
			dateFrom: $("#dateFrom").val() || "",
			dateTo: $("#dateTo").val() || "",
			teamMemberName: $("#teamMemberName").val() || "",
			teamMemberCode: $("#teamMemberCode").val() || "",
			contactNo: $("#contactNo").val() || "",
			designation: $("#designation").val() || "",
			department: $("#department").val() || ""
		};

		$.ajax({
			type: "POST",
			url: "api/teammember/searchTeamMember",
			contentType: "application/json",
			data: JSON.stringify(filterData),
			success: function(response) {
				const list = response.data || [];
				renderTable(list);
			},
			error: function() {
				alert("UNABLE TO FETCH TEAM MEMBERS DATA.");
				$("#searchTeamMember").html('<tr><td colspan="11" class="text-center text-danger">ERROR LOADING DATA</td></tr>');
			}
		});
	}

	// Initial Load
	searchTeamMembers();

	// 5. Render Table
	function renderTable(data) {
		if (!data || data.length === 0) {
			$("#searchTeamMember").html('<tr><td colspan="11" class="text-center text-muted py-3">NO TEAM MEMBERS FOUND MATCHING CRITERIA</td></tr>');
			return;
		}

		let tbody = "";
		$.each(data, function(index, item) {
			const statusBadge = (item.customerStatus === 1 || item.customerStatus === "1")
				? '<span class="badge bg-success">ACTIVE</span>'
				: '<span class="badge bg-danger">INACTIVE</span>';

			tbody += `
				<tr style="font-family: 'Poppins', sans-serif;">
					<td>${index + 1}</td>
					<td><strong>${(item.teamMemberCode || '').toUpperCase()}</strong></td>
					<td>${(item.teamMemberName || '').toUpperCase()}</td>
					<td>${(item.branchName || '').toUpperCase()}</td>
					<td>${(item.designation || 'MEMBER').toUpperCase()}</td>
					<td>${(item.department || 'OPERATIONS').toUpperCase()}</td>
					<td>${item.signUpDate || '—'}</td>
					<td>${item.contactNo || '—'}</td>
					<td>${(item.bankAC || '—').toUpperCase()}</td>
					<td>${statusBadge}</td>
					<td class="no-print">
						<button type="button" class="btn btn-sm btn-outline-info viewConsultantsBtn me-1" 
							data-code="${item.teamMemberCode}" data-name="${item.teamMemberName}" title="VIEW REPORTING CONSULTANTS">
							<i class="bi bi-people-fill"></i> CONSULTANTS
						</button>
						<a href="generateTeamMemberIDCard?code=${encodeURIComponent(item.teamMemberCode)}" 
							class="btn btn-sm btn-outline-primary me-1" title="GENERATE ID CARD">
							<i class="bi bi-person-badge"></i> ID CARD
						</a>
						<button type="button" class="btn btn-sm btn-outline-danger deleteMemberBtn" 
							data-id="${item.id}" data-name="${item.teamMemberName}" title="DELETE TEAM MEMBER">
							<i class="bi bi-trash"></i>
						</button>
					</td>
				</tr>
			`;
		});

		$("#searchTeamMember").html(tbody);
	}

	// 6. Search & Reset Button Handlers
	$("#searchBtn").on("click", function(e) {
		e.preventDefault();
		searchTeamMembers();
	});

	$("#resetBtn").on("click", function(e) {
		e.preventDefault();
		$("#formid")[0].reset();
		searchTeamMembers();
	});

	// 7. View Connected Consultants in Modal
	$(document).on("click", ".viewConsultantsBtn", function() {
		const memberCode = $(this).data("code");
		const memberName = $(this).data("name");

		$("#modalTeamMemberCode").text(String(memberCode || '').toUpperCase());
		$("#modalTeamMemberName").text(String(memberName || '').toUpperCase());
		$("#modalConsultantsTableBody").html('<tr><td colspan="8" class="text-center text-muted">LOADING CONNECTED CONSULTANTS...</td></tr>');

		const modalEl = document.getElementById('consultantsModal');
		const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
		bsModal.show();

		$.ajax({
			type: "GET",
			url: "api/teammember/getConsultantsByTeamMemberCode?teamMemberCode=" + encodeURIComponent(memberCode),
			contentType: "application/json",
			success: function(response) {
				const consultants = response.data || [];
				if (!consultants || consultants.length === 0) {
					$("#modalConsultantsTableBody").html(
						`<tr><td colspan="8" class="text-center text-muted py-3">NO FINANCIAL CONSULTANTS ARE CONNECTED TO TEAM MEMBER (${String(memberCode).toUpperCase()})</td></tr>`
					);
					return;
				}

				let rows = "";
				$.each(consultants, function(idx, c) {
					const cStatusBadge = (c.financialStatus === "1" || c.financialStatus === "ACTIVE" || c.financialStatus === true)
						? '<span class="badge bg-success">ACTIVE</span>'
						: '<span class="badge bg-danger">INACTIVE</span>';

					rows += `
						<tr style="font-family: 'Poppins', sans-serif;">
							<td>${idx + 1}</td>
							<td><strong>${(c.financialCode || '').toUpperCase()}</strong></td>
							<td>${(c.financialName || '').toUpperCase()}</td>
							<td>${(c.selectPosition || 'CONSULTANT').toUpperCase()}</td>
							<td>${(c.branchName || '').toUpperCase()}</td>
							<td>${c.contactNo || ''}</td>
							<td>${c.joiningDate || ''}</td>
							<td>${cStatusBadge}</td>
						</tr>
					`;
				});
				$("#modalConsultantsTableBody").html(rows);
			},
			error: function() {
				$("#modalConsultantsTableBody").html('<tr><td colspan="8" class="text-center text-danger">ERROR LOADING CONNECTED CONSULTANTS</td></tr>');
			}
		});
	});

	// 8. Delete Team Member
	$(document).on("click", ".deleteMemberBtn", function() {
		const memberId = $(this).data("id");
		const memberName = $(this).data("name");

		if (confirm("ARE YOU SURE YOU WANT TO DELETE TEAM MEMBER: " + String(memberName).toUpperCase() + "?")) {
			$.ajax({
				url: "api/teammember/deleteTeamMember?id=" + encodeURIComponent(memberId),
				type: "DELETE",
				success: function(res) {
					alert("TEAM MEMBER DELETED SUCCESSFULLY");
					searchTeamMembers();
				},
				error: function() {
					alert("FAILED TO DELETE TEAM MEMBER.");
				}
			});
		}
	});

});
