$(document).ready(function() {

	// 1. Fetch Company Details from Preference Controller API
	function loadCompanyDetails() {
		$.ajax({
			url: "api/preference/getCompanyDetails",
			type: "GET",
			dataType: "json",
			success: function(response) {
				if (response) {
					const cName = (response.companyName || response.shortName || "").trim().toUpperCase();
					if (cName) {
						$("#companyNameHeader").text(cName);
					}
					let addrParts = [];
					if (response.address) addrParts.push(response.address.trim().toUpperCase());
					if (response.city) addrParts.push(response.city.trim().toUpperCase());
					if (response.state) addrParts.push(response.state.trim().toUpperCase());
					if (response.pinCode) addrParts.push(response.pinCode.trim());
					if (addrParts.length > 0) {
						$("#companyAddressHeader").text(addrParts.join(", "));
					}
				}
			},
			error: function(xhr, status, error) {
				console.warn("COULD NOT FETCH COMPANY DETAILS:", error);
				if (!$("#companyNameHeader").text() || $("#companyNameHeader").text() === "LOADING COMPANY...") {
					$("#companyNameHeader").text("CO OPERATIVE SOCIETY LTD NAGPUR");
				}
			}
		});
	}

	loadCompanyDetails();

	// 2. Populate Team Member Dropdown
	function loadTeamMemberDropdown() {
		$.ajax({
			type: "GET",
			url: "api/teammember/getAllteamMember",
			contentType: "application/json",
			success: function(response) {
				let list = [];
				if (response && response.data) {
					list = response.data;
				} else if (Array.isArray(response)) {
					list = response;
				}

				let appenddata = "<option value=''>SELECT TEAM MEMBER</option>";
				$.each(list, function(index, item) {
					const code = (item.teamMemberCode || "").toUpperCase();
					const name = (item.teamMemberName || "").toUpperCase();
					const desig = (item.designation || "").toUpperCase();
					appenddata += `<option value="${code}">${code} - ${name} (${desig || 'MEMBER'})</option>`;
				});

				$("#teamMemberCode").html(appenddata);

				// Check URL query parameters (e.g. ?code=TM001)
				const urlParams = new URLSearchParams(window.location.search);
				const codeParam = urlParams.get('code');
				if (codeParam) {
					$("#teamMemberCode").val(codeParam.toUpperCase());
					loadTeamMemberDetails(codeParam.toUpperCase());
				}
			},
			error: function() {
				alert("FAILED TO LOAD TEAM MEMBERS LIST.");
			}
		});
	}

	loadTeamMemberDropdown();

	// 3. Handle Dropdown Change & Button Click
	$("#teamMemberCode").on("change", function() {
		const code = $(this).val();
		if (code) {
			loadTeamMemberDetails(code);
		} else {
			$("#idCardContainer").hide();
		}
	});

	$("#generateBtn").on("click", function() {
		const code = $("#teamMemberCode").val();
		if (!code) {
			alert("PLEASE SELECT A TEAM MEMBER FIRST.");
			return;
		}
		loadTeamMemberDetails(code);
	});

	// 4. Load Team Member Card Details
	function loadTeamMemberDetails(code) {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: 'api/teammember/fetchTeamMemberDataByCode',
			data: JSON.stringify({ teamMemberCode: code }),
			success: function(data) {
				if (!data || data.length === 0) {
					alert("NO TEAM MEMBER DATA FOUND FOR CODE: " + code);
					$("#idCardContainer").hide();
					return;
				}

				const member = data[0];
				$("#cardMemberCode").text((member.teamMemberCode || '—').toUpperCase());
				$("#cardMemberName").text((member.teamMemberName || '—').toUpperCase());
				$("#cardDesignation").text((member.designation || 'TEAM MEMBER').toUpperCase());
				$("#cardDepartment").text((member.department || 'OPERATIONS').toUpperCase());
				$("#cardBranch").text((member.branchName || '—').toUpperCase());
				$("#cardSignUpDate").text((member.signUpDate || '—').toUpperCase());
				$("#cardContact").text(member.contactNo || '—');
				$("#cardBankAC").text((member.bankAC || '—').toUpperCase());

				$("#reportingMemberCodeBadge").text((member.teamMemberCode || '').toUpperCase());

				// Load Connected Consultants
				loadConnectedConsultants(member.teamMemberCode);

				$("#idCardContainer").fadeIn();
			},
			error: function() {
				alert("ERROR OCCURRED WHILE FETCHING TEAM MEMBER DETAILS.");
			}
		});
	}

	// 5. Load Connected Financial Consultants
	function loadConnectedConsultants(teamMemberCode) {
		$.ajax({
			type: "GET",
			url: "api/teammember/getConsultantsByTeamMemberCode?teamMemberCode=" + encodeURIComponent(teamMemberCode),
			contentType: "application/json",
			success: function(response) {
				const list = response.data || [];
				if (!list || list.length === 0) {
					$("#cardConsultantsTableBody").html(
						`<tr><td colspan="8" class="text-center text-muted py-3">NO FINANCIAL CONSULTANTS ARE CURRENTLY CONNECTED TO THIS TEAM MEMBER (${teamMemberCode.toUpperCase()})</td></tr>`
					);
					return;
				}

				let rows = "";
				$.each(list, function(index, c) {
					const statusText = (c.financialStatus === "1" || c.financialStatus === "ACTIVE" || c.financialStatus === true) ? "ACTIVE" : "INACTIVE";
					const statusBadge = statusText === "ACTIVE" 
						? '<span class="badge bg-success text-white">ACTIVE</span>' 
						: '<span class="badge bg-danger text-white">INACTIVE</span>';

					rows += `
						<tr style="font-family: 'Poppins', sans-serif;">
							<td>${index + 1}</td>
							<td><strong>${(c.financialCode || '').toUpperCase()}</strong></td>
							<td>${(c.financialName || '').toUpperCase()}</td>
							<td>${(c.selectPosition || 'CONSULTANT').toUpperCase()}</td>
							<td>${(c.branchName || '').toUpperCase()}</td>
							<td>${c.contactNo || ''}</td>
							<td>${c.joiningDate || ''}</td>
							<td>${statusBadge}</td>
						</tr>
					`;
				});
				$("#cardConsultantsTableBody").html(rows);
			},
			error: function() {
				$("#cardConsultantsTableBody").html(
					`<tr><td colspan="8" class="text-center text-danger">FAILED TO LOAD CONNECTED FINANCIAL CONSULTANTS</td></tr>`
				);
			}
		});
	}

});
