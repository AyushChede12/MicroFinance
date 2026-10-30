// Joint Liability Loan Approval with Dynamic Company Details & Sanction Letter Printing

let companyDetails = {};

function loadCompanyDetails() {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(resp) {
			const comp = (resp && resp.data) ? resp.data : resp;
			if (comp) {
				companyDetails = comp;
				bindCompanyToSanctionArea(comp);
			}
		},
		error: function(err) {
			console.error("FAILED TO FETCH COMPANY DETAILS:", err);
		}
	});
}

function bindCompanyToSanctionArea(comp) {
	if (!comp) return;
	const name = (comp.companyName || "MICROFINANCE FINANCIAL SERVICES").toUpperCase();
	const addr = [comp.address, comp.city, comp.state, comp.pinCode].filter(Boolean).join(", ").toUpperCase();

	const regParts = [];
	if (comp.cinNo) regParts.push("CIN: " + comp.cinNo);
	if (comp.pan) regParts.push("PAN: " + comp.pan);
	if (comp.tan) regParts.push("TAN: " + comp.tan);
	if (comp.gstin) regParts.push("GSTIN: " + comp.gstin);
	const regLine = regParts.join(" | ").toUpperCase();

	const contactParts = [];
	if (comp.helplineNo) contactParts.push("HELPLINE: " + comp.helplineNo);
	if (comp.emailId) contactParts.push("EMAIL: " + comp.emailId);
	const contactLine = contactParts.join(" | ").toUpperCase();

	$("#sanctionCompName").text(name);
	$("#sanctionCompBodyName").text(name);
	$("#sanctionCompAddress").text(addr);
	$("#sanctionCompRegLine").text(regLine);
	$("#sanctionCompContact").text(contactLine);
}

function updateSanctionPreview() {
	bindCompanyToSanctionArea(companyDetails);

	const grpCode = $('#groupcode').val() || '';
	const aprDate = $('#approvalDate').val() || new Date().toISOString().split('T')[0];
	const opnDate = $('#openingDate').val() || '';
	const commName = ($('#communityName').val() || '').toUpperCase();
	const brName = ($('#branchName').val() || '').toUpperCase();
	const staff = ($('#allocatedStaff').val() || '').toUpperCase();
	const phone = $('#contactNumber').val() || '';
	const sched = ($('#collectionDays').val() || '').toUpperCase();
	const purpose = ($('#purposeOfLoan').val() || '').toUpperCase();

	$('#sanctGroupCode').text(grpCode);
	$('#sanctGroupCode2').text(grpCode);
	$('#sanctApprovalDate').text(aprDate);
	$('#sanctOpeningDate').text(opnDate);
	$('#sanctCommunityName').text(commName);
	$('#sanctBranchName').text(brName);
	$('#sanctAllocatedStaff').text(staff);
	$('#sanctContactNumber').text(phone);
	$('#sanctCollectionDays').text(sched);
	$('#sanctPurpose').text(purpose);
}

function printSanctionLetter() {
	updateSanctionPreview();

	const printContent = document.getElementById("printableSanctionArea").innerHTML;
	const printWindow = window.open("", "_blank", "width=900,height=750");
	printWindow.document.write(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>JOINT LIABILITY LOAN SANCTION LETTER</title>
			<style>
				@page { size: A4 portrait; margin: 18mm; }
				body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; margin: 0; padding: 15px; color: #000; background: #fff; line-height: 1.5; }
				table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
				td { padding: 6px 4px; font-size: 12px; }
				hr { border: 0; border-top: 2px solid #000; }
				h2, h3, p { margin: 0; }
			</style>
		</head>
		<body>
			${printContent}
			<script>
				window.onload = function() {
					window.print();
					window.onafterprint = function() { window.close(); };
				};
			<\/script>
		</body>
		</html>
	`);
	printWindow.document.close();
}

$(document).ready(function() {
	loadCompanyDetails();

	$.ajax({
		url: "api/joinliability/viewgrouploans",
		type: "GET",
		success: function(response) {
			console.log("API response:", response);
			var dropdown1 = $('#groupcode');
			dropdown1.empty();
			dropdown1.append('<option value="">SELECT</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, customer) {
					dropdown1.append('<option value="' + customer.groupCode + '">' + customer.groupCode + '</option>');
				});
			} else {
				dropdown1.append('<option value="">NO GROUPS FOUND</option>');
			}
		},
		error: function() {
			alert("FAILED TO FETCH GROUP LIST.");
		}
	});

	$('#groupcode').on('change', function() {
		let selectedCode = $(this).val();

		if (selectedCode !== "") {
			$.ajax({
				url: 'api/joinliability/fetchByGroupCode',
				type: 'GET',
				data: { groupCode: selectedCode },
				success: function(response) {
					if (response.status === "FOUND" && response.data && response.data.length > 0) {
						let customer = response.data[0];

						$('#openingDate').val(customer.openingDate || '');
						$('#communityName').val(customer.communityName || '');
						$('#allocatedStaff').val(customer.allocatedStaff || '');
						$('#branchName').val(customer.branchName || '');
						$('#collectionDays').val(customer.collectionDays || '');
						$('#contactNumber').val(customer.contactNumber || '');
						$('#purposeOfLoan').val(customer.loanPurpose || '');
						$('#approvalDate').val(customer.approvalDate || new Date().toISOString().split('T')[0]);

						if (customer.approvalStatus === true || customer.approvalStatus === 1 || customer.approvalStatus === "1") {
							$('#approvalStatus').val("APPROVED").css('color', 'green');
							$('#printSanctionBtn').show();
						} else {
							$('#approvalStatus').val("NOT APPROVED").css('color', 'red');
							$('#printSanctionBtn').hide();
						}
						updateSanctionPreview();

					} else {
						alert('NO CUSTOMER DATA FOUND!');
						clearFields();
					}
				},
				error: function(xhr, status, error) {
					console.error('Error:', xhr.responseText);
					alert('ERROR WHILE FETCHING CUSTOMER DATA!');
					clearFields();
				}
			});
		}
	});

	$('#approveBtn').click(function(event) {
		event.preventDefault();

		const groupCode = $('#groupcode').val();
		const approvalDate = $('#approvalDate').val();

		if (!groupCode) {
			alert("PLEASE SELECT A GROUP CODE FIRST.");
			return;
		}

		const requestData = {
			groupCode: groupCode,
			approvalStatus: true,
			approvalDate: approvalDate || new Date().toISOString().split('T')[0]
		};

		$.ajax({
			type: "POST",
			url: "api/joinliability/approveGroupLoan",
			contentType: "application/json",
			data: JSON.stringify(requestData),
			success: function(response) {
				$('#approvalStatus').val("APPROVED").css('color', 'green');
				updateSanctionPreview();
				$('#printSanctionBtn').show();

				alert(response.message ? response.message.toUpperCase() : "LOAN APPROVED SUCCESSFULLY!");
				if (confirm("LOAN APPROVED SUCCESSFULLY. DO YOU WANT TO PRINT THE SANCTION LETTER NOW?")) {
					printSanctionLetter();
				}
			},
			error: function(xhr) {
				alert("ERROR: " + (xhr.responseText ? xhr.responseText.toUpperCase() : "FAILED TO APPROVE LOAN."));
			}
		});
	});

	$('#printSanctionBtn').on('click', function(e) {
		e.preventDefault();
		printSanctionLetter();
	});

	function clearFields() {
		$('#openingDate, #communityName, #allocatedStaff, #branchName, #collectionDays, #contactNumber, #purposeOfLoan, #approvalDate, #approvalStatus').val('');
		$('#printSanctionBtn').hide();
	}
});
