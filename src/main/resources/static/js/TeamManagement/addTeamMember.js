$(document).ready(function() {

	// 1. Load Relatives for Relation Dropdowns
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/preference/getAllRelativeModule',
		success: function(response) {
			var list = response.data || [];
			var appenddata = "<option value=''>--SELECT RELATION--</option>";
			if (list && list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					var rel = (list[i].relation || "").toUpperCase();
					appenddata += "<option value='" + rel + "'>" + rel + "</option>";
				}
			}
			$("#relationWithNominee").html(appenddata);
			$("#relationToApplicant").html(appenddata);
		},
		error: function(xhr, status, error) {
			console.error("Error loading relatives:", error);
		}
	});

	// 2. Load Branches
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/preference/getAllBranchModule',
		success: function(response) {
			var list = response.data || response || [];
			var appenddata = "<option value=''>SELECT BRANCH NAME</option>";
			for (var i = 0; i < list.length; i++) {
				var bName = (list[i].branchName || "").toUpperCase();
				appenddata += "<option value='" + bName + "'>" + bName + "</option>";
			}
			$("#branchName").html(appenddata);
		},
		error: function() {
			console.warn("FAILED TO LOAD BRANCHES");
		}
	});

	// 3. Load Departments
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getDepartmentList',
		success: function(data) {
			var list = data || [];
			var appenddata = "<option value=''>SELECT DEPARTMENT</option>";
			for (var i = 0; i < list.length; i++) {
				var dName = (list[i].departmentName || "").toUpperCase();
				appenddata += "<option value='" + dName + "'>" + dName + "</option>";
			}
			$("#department").html(appenddata);
		},
		error: function() {
			console.warn("FAILED TO LOAD DEPARTMENTS");
		}
	});

	// 4. Load Designations
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getDesignationList',
		success: function(data) {
			var list = data || [];
			var appenddata = "<option value=''>SELECT DESIGNATION</option>";
			for (var i = 0; i < list.length; i++) {
				var desName = (list[i].designationName || "").toUpperCase();
				appenddata += "<option value='" + desName + "'>" + desName + "</option>";
			}
			$("#designation").html(appenddata);
		},
		error: function() {
			console.warn("FAILED TO LOAD DESIGNATIONS");
		}
	});

	// 5. Load Connected Financial Consultants for this Team Member
	const currentMemberCode = $("#teamMemberCode").val();
	if (currentMemberCode) {
		loadConnectedConsultants(currentMemberCode);
	}

	function loadConnectedConsultants(memberCode) {
		$("#teamMemberCodeBadge").text(memberCode.toUpperCase());
		$.ajax({
			type: "GET",
			url: "api/teammember/getConsultantsByTeamMemberCode?teamMemberCode=" + encodeURIComponent(memberCode),
			contentType: "application/json",
			success: function(response) {
				const consultants = response.data || [];
				if (!consultants || consultants.length === 0) {
					$("#consultantsTableBody").html(
						`<tr><td colspan="8" class="text-center text-muted py-3">NO FINANCIAL CONSULTANTS ARE CURRENTLY ASSIGNED TO THIS TEAM MEMBER CODE (${memberCode.toUpperCase()})</td></tr>`
					);
					return;
				}

				let rows = "";
				$.each(consultants, function(index, c) {
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
				$("#consultantsTableBody").html(rows);
			},
			error: function() {
				$("#consultantsTableBody").html(
					`<tr><td colspan="8" class="text-center text-danger">FAILED TO LOAD REPORTING FINANCIAL CONSULTANTS</td></tr>`
				);
			}
		});
	}

	// Helper function to validate form
	function validateForm() {
		let isValid = true;
		let errorMessages = [];

		const requiredFields = [
			{ id: '#teamMemberCode', message: 'TEAM MEMBER CODE IS REQUIRED.' },
			{ id: '#signUpDate', message: 'SIGN-UP DATE IS REQUIRED.' },
			{ id: '#branchName', message: 'BRANCH NAME IS REQUIRED.' },
			{ id: '#teamMemberName', message: 'TEAM MEMBER NAME IS REQUIRED.' },
			{ id: '#dateOfBirth', message: 'DATE OF BIRTH IS REQUIRED.' },
			{ id: '#contactNo', message: 'CONTACT NUMBER IS REQUIRED.' },
			{ id: '#designation', message: 'DESIGNATION IS REQUIRED.' },
			{ id: '#department', message: 'DEPARTMENT IS REQUIRED.' },
			{ id: '#salary', message: 'SALARY IS REQUIRED.' },
			{ id: '#modeofpayment', message: 'MODE OF PAYMENT IS REQUIRED.' }
		];

		requiredFields.forEach(field => {
			const value = $(field.id).val();
			if (!value || value.trim() === '') {
				isValid = false;
				errorMessages.push(field.message);
				$(field.id).addClass('error');
			} else {
				$(field.id).removeClass('error');
			}
		});

		const contactNo = $('#contactNo').val();
		if (contactNo && !/^\d{10}$/.test(contactNo.trim())) {
			isValid = false;
			errorMessages.push('CONTACT NUMBER MUST BE EXACTLY 10 DIGITS.');
			$('#contactNo').addClass('error');
		}

		const pan = $('#pan').val();
		if (pan && pan.trim().length > 0 && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan.trim())) {
			isValid = false;
			errorMessages.push('PAN FORMAT IS INVALID (EXPECTED: ABCDE1234F).');
			$('#pan').addClass('error');
		}

		if (!isValid) {
			alert('PLEASE FIX THE FOLLOWING ERRORS:\n' + errorMessages.join('\n'));
		}

		return isValid;
	}

	// Save Team Member
	$('#TeamMemberSaveBtn').on('click', function(e) {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const customerStatus = $('#customerStatus').prop('checked');

		const teamMemberData = {
			teamMemberCode: ($('#teamMemberCode').val() || '').trim().toUpperCase(),
			signUpDate: $('#signUpDate').val(),
			branchName: ($('#branchName').val() || '').trim().toUpperCase(),
			teamMemberName: ($('#teamMemberName').val() || '').trim().toUpperCase(),
			dateOfBirth: $('#dateOfBirth').val(),
			age: $('#age').val(),
			familyMemberName: ($('#familyMemberName').val() || '').trim().toUpperCase(),
			relationToApplicant: ($('#relationToApplicant').val() || '').trim().toUpperCase(),
			contactNo: ($('#contactNo').val() || '').trim(),
			nomineeName: ($('#nomineeName').val() || '').trim().toUpperCase(),
			nomineeAge: $('#nomineeAge').val(),
			relationWithNominee: ($('#relationWithNominee').val() || '').trim().toUpperCase(),
			address: ($('#address').val() || '').trim().toUpperCase(),
			pan: ($('#pan').val() || '').trim().toUpperCase(),
			bankAC: ($('#bankAC').val() || '').trim().toUpperCase(),
			ifscCode: ($('#ifscCode').val() || '').trim().toUpperCase(),
			expDetails: ($('#expDetails').val() || '').trim(),
			educationalBackground: ($('#educationalBackground').val() || '').trim().toUpperCase(),

			designation: ($('#designation').val() || '').trim().toUpperCase(),
			department: ($('#department').val() || '').trim().toUpperCase(),
			salary: ($('#salary').val() || '').trim(),
			savingAccNo: ($('#savingAccNo').val() || '').trim(),

			fees: ($('#fees').val() || '').trim(),
			modeofpayment: ($('#modeofpayment').val() || '').trim().toUpperCase(),
			comments: ($('#comments').val() || '').trim().toUpperCase(),
			customerStatus: customerStatus ? 1 : 0,

			chequeNo: ($('#chequeNo').val() || '').trim().toUpperCase(),
			chequeDate: $('#chequeDate').val(),
			depositAcc1: ($('#depositAcc1').val() || '').trim().toUpperCase(),
			depositAcc2: ($('#depositAcc2').val() || '').trim().toUpperCase(),
			refNumber1: ($('#refNumber1').val() || '').trim().toUpperCase(),
			depositAcc3: ($('#depositAcc3').val() || '').trim().toUpperCase(),
			refNumber2: ($('#refNumber2').val() || '').trim().toUpperCase()
		};

		$.ajax({
			url: 'api/teammember/saveTeamMember',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(teamMemberData),
			success: function(response) {
				alert("TEAM MEMBER SAVED SUCCESSFULLY: " + (response.teamMemberCode || ''));
				location.reload();
			},
			error: function(xhr, status, error) {
				console.error('Error saving team member:', error);
				alert("FAILED TO SAVE TEAM MEMBER. PLEASE CHECK INPUT DATA.");
			}
		});
	});

	// New / Reset Button
	$('#newBtn').on('click', function(e) {
		e.preventDefault();
		location.reload();
	});

});
