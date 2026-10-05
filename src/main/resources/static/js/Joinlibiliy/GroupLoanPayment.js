// ✅ Js for populating the approved loanid in the dropdown (Vaibhav)
$(document).ready(function() {
	populateDropdown();
});

function populateDropdown() {

	$.ajax({
		url: "api/joinliability/getApprovedGroupLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response); // for debugging

			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#groupid"); // Make sure this matches your HTML ID exactly
				$dropdown.empty(); // Clear existing options

				// ✅ Wrap your <option> in quotes!
				$dropdown.append('<option value="" disabled selected>Select Loan ID</option>');

				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				console.warn("No Loan IDs found in response.");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching Loan IDs:", error);
		}
	});
}

let deductionPercents = {}; // store percentages temporarily

// Js for binding the data in the textfileds (Vaibhav)
$('#groupid').on('change', function() {
	let selectedCode = $(this).val(); // selected group code from dropdown

	if (selectedCode !== "") {
		$.ajax({
			url: `api/joinliability/fetchByGroupCode?groupCode=${selectedCode}`,
			type: 'GET',
			dataType: 'json',
			success: function(response) {
				console.log("Response:", response);

				if (response.status === "FOUND") {
					let loan = response.data[0]; // assuming you want the first record

					// ✅ Bind backend data into text fields
					$('#openingdate').val(loan.openingDate);
					$('#communityName').val(loan.communityName);
					$('#branchname').val(loan.branchName);
					$('#loanSchemeName').val(loan.loanSchemeName);
					$('#communityAddress').val(loan.communityAddress);
					$('#contactNumber').val(loan.contactNumber);
					$('#loanpurpose').val(loan.loanPurpose);
					$('#emiType').val(loan.emiType);
					$('#term').val(loan.term);
					$('#rateOfInterest').val(loan.rateOfInterest);
					$('#interestType').val(loan.interestType);
					$('#loanamount').val(loan.loanamount);


					// ✅ PHOTO block
					if (loan.photo) {

						const fileName = loan.photo;
						const photoPath = `/Uploads/${encodeURIComponent(fileName)}`;

						$("#photoPreview").attr("src", photoPath);  // ✅ Shows preview
						$("#photoHidden").val(fileName);            // ✅ Save only the filename, not full path
						photoSizeEdit({ target: { result: photoPath } }); // ✅ Resizes preview
					} else {
						$("#photoPreview").attr("src", "/Uploads/default-placeholder.jpg");
						$("#photoHidden").val("");
						photoSizeEdit({ target: { result: "/Uploads/default-placeholder.jpg" } });
					}

					// ✅ SIGNATURE block
					if (loan.signature) {

						const fileName = loan.signature;
						const signPath = `/Uploads/${encodeURIComponent(fileName)}`;

						$('#signaturePreview').attr('src', signPath);
						$('#signatureHidden').val(fileName);
						signatureSizeEdit({ target: { result: signPath } }); // ✅ Resize preview
					} else {
						$('#signaturePreview').attr('src', '/Uploads/default-placeholder.jpg');
						$('#signatureHidden').val("");
						signatureSizeEdit({ target: { result: "/Uploads/default-placeholder.jpg" } });
					}


					deductionPercents = {
						processing: parseFloat(loan.processingFee) || 0,
						gst: parseFloat(loan.gstPercentage) || 0,
						legal: parseFloat(loan.legalCharges) || 0,
						insurance: parseFloat(loan.insuranceFee) || 0,
						valuation: parseFloat(loan.valuationFee) || 0,
					};

					// ✅ Clear text fields for now
					$('#processingFee').val('');
					$('#gstPercentage').val('');
					$('#legalCharges').val('');
					$('#insuranceFee').val('');
					$('#valuationFee').val('');

					console.log("Percentages Stored:", deductionPercents);

				} else {
					alert("❌ " + response.message);
					clearFields();
				}
			},
			error: function(xhr, status, error) {
				console.error("Error fetching group loan data:", error);
				alert("Something went wrong.");
				clearFields();
			}
		});
	}
});



function photoSizeEdit(e) {
	const previewimg = document.getElementById("photoPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function signatureSizeEdit(e) {
	const previewimg = document.getElementById("signaturePreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

// js for hiding the fields (Vaibhav)
$(document).ready(function() {
	// Hide all fields initially
	$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();

	$('#paymentMode').on('change', function() {
		const paymentMode = $(this).val().toLowerCase(); // ✅ Convert to lowercase for reliable matching

		// Hide all sections first
		$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();

		if (paymentMode === 'cash') {
			// Only Cash → hide everything
		}
		else if (paymentMode === 'cheque') {
			// ✅ Show cheque-related fields
			$('#displayCheque').show();
			$('#displaycheqdate').show();
			$('#displaydeposit').show();
		}
		else if (paymentMode === 'online' || paymentMode === 'neft') {
			// ✅ Show deposit + reference fields
			$('#displaydeposit').show();
			$('#displayRef').show();
		}
	});
});

// Js for fetching the financial consultant ids and thire name (Vaibhav)
$(document).ready(function() {
	$.ajax({
		url: 'api/financialconsultant/getAllFinancialConsultantDetails',
		type: 'POST',
		success: function(response) {
			console.log("API Response:", response); // ✅ Debug to check!

			const consultantDropdown = $('#financialConsultantId');
			consultantDropdown.empty();
			consultantDropdown.append('<option value="">Select Consultant</option>');

			response.data.forEach(function(customer) {
				// ✅ Only the code
				const option = `<option value="${customer.financialCode}">${customer.financialCode}</option>`;
				consultantDropdown.append(option);
			});
		},
		error: function(xhr, status, error) {
			console.error('AJAX Error:', status, error);
			alert('Failed to fetch consultant data.');
		}
	});
});

// Js for getting the names on changing the dropdown(Vaibhav)
$(document).ready(function() {
	$('#financialConsultantId').on('change', function() {
		const selectedCode = $(this).val();
		console.log("Selected Financial Code:", selectedCode);

		if (selectedCode) {
			$.ajax({
				url: 'api/financialconsultant/getfinancialHierarchyByFinancialCode',
				type: 'GET',
				data: { financialCode: selectedCode },
				success: function(response) {
					console.log("API Response:", response);

					// ✅ If your API returns an ARRAY
					const consultant = Array.isArray(response.data) ? response.data[0] : response.data;

					if (consultant && consultant.financialName) {
						$('#financialConsultantName').val(consultant.financialName);
					} else {
						$('#financialConsultantName').val('');
						alert('No consultant name found for this code.');
					}
				},
				error: function(xhr, status, error) {
					console.error('AJAX Error:', status, error);
					alert('Error fetching consultant name.');
				}
			});
		} else {
			$('#financialConsultantName').val('');
		}
	});
});

// Js fro calculating the emi on changing the loan amount
$(document).ready(function() {

	// Trigger calculation ONLY when loan amount changes
	$('#loanAmount').on('input change', function() {
		calculateEMI();
	});

	function calculateEMI() {
		const principal = parseFloat($('#loanAmount').val());
		const rate = parseFloat($('#rateOfInterest').val());
		const term = parseInt($('#term').val());
		const mode = $('#emiType').val()?.toLowerCase();       // daily, weekly, monthly, quarterly, yearly
		const type = $('#interestType').val()?.toLowerCase();  // flat, reducing, rule 78

		// Validate
		if (isNaN(principal) || isNaN(rate) || isNaN(term) || !mode || !type) {
			$('#loanEmi').val('');
			return;
		}

		let periodRate = 0;
		let totalInstallments = term;

		// Convert annual interest to period interest based on mode
		switch (mode) {
			case 'daily':
				periodRate = rate / 365 / 100;
				break;
			case 'weekly':
				periodRate = rate / 52 / 100;
				break;
			case 'monthly':
				periodRate = rate / 12 / 100;
				break;
			case 'quarterly':
				periodRate = rate / 4 / 100;
				break;
			case 'yearly':
				periodRate = rate / 100;
				break;
			default:
				periodRate = rate / 12 / 100;
		}

		let emi = 0;

		// === Interest Type Logic ===
		if (type === 'flat interest') {
			// Flat: total interest = P * R * T / 100 (adjusted for mode)
			const totalInterest = (principal * rate * (term / getModeDivider(mode))) / 100;
			const totalPayable = principal + totalInterest;
			emi = totalPayable / term;
		}
		else if (type === 'reducing interest' || type === 'reducing balance') {
			// Standard reducing balance EMI formula
			emi = (principal * periodRate * Math.pow(1 + periodRate, totalInstallments)) /
				(Math.pow(1 + periodRate, totalInstallments) - 1);
		}
		else if (type === 'rule 78' || type === 'rule of 78') {
			// Similar to flat for EMI calculation
			const totalInterest = (principal * rate * (term / getModeDivider(mode))) / 100;
			const totalPayable = principal + totalInterest;
			emi = totalPayable / term;
		}

		// Set the EMI result
		$('#loanEmi').val(isFinite(emi) ? emi.toFixed(2) : '');
	}

	// Helper: converts loan mode into yearly equivalent
	function getModeDivider(mode) {
		switch (mode) {
			case 'daily': return 365;
			case 'weekly': return 52;
			case 'monthly': return 12;
			case 'quarterly': return 4;
			case 'yearly': return 1;
			default: return 12;
		}
	}
});
$('#loanAmount').on('blur', function() {
	calculateCharges();
});

// ✅ Calculation using stored percentages
function calculateCharges() {
	const loanAmount = parseFloat($('#loanAmount').val());
	if (isNaN(loanAmount) || loanAmount <= 0) {
		return;
	}

	const { processing, gst, legal, insurance, valuation } = deductionPercents;

	const processingAmount = (loanAmount * processing) / 100;
	const legalAmount = (loanAmount * legal) / 100;
	const insuranceAmount = (loanAmount * insurance) / 100;
	const valuationAmount = (loanAmount * valuation) / 100;
	const gstAmount = ((processingAmount + legalAmount + valuationAmount) * gst) / 100;

	// ✅ Display calculated values
	$('#processingFee').val(processingAmount.toFixed(2));
	$('#gstPercentage').val(gstAmount.toFixed(2));
	$('#legalCharges').val(legalAmount.toFixed(2));
	$('#insuranceFee').val(insuranceAmount.toFixed(2));
	$('#valuationFee').val(valuationAmount.toFixed(2));

	console.log("✅ Calculated Deductions Updated!");
}

// Js for paying the loan payment to the members
$(document).ready(function() {
	$("#groupPaymentBtn").click(function() {
		// Collect all input values into one object
		const groupLoanData = {
			groupID: $("#groupid").val(),   // ✅ Add this line
			groupCode: $("#groupCode").val(),
			openingDate: $("#openingDate").val(),
			communityName: $("#communityName").val(),
			loanSchemeName: $("#loanSchemeName").val(),
			contactNumber: $("#contactNumber").val(),
			emiType: $("#emiType").val(),
			term: $("#term").val(),
			rateOfInterest: $("#rateOfInterest").val(),
			interestType: $("#interestType").val(),
			loanAmount: parseFloat($("#loanAmount").val()),
			loanEmi: parseFloat($("#loanEmi").val()),
			planCode: $("#planCode").val(),
			processingFee: parseFloat($("#processingFee").val()),
			legalCharges: parseFloat($("#legalCharges").val()),
			gstPercentage: parseFloat($("#gstPercentage").val()),
			insuranceFee: parseFloat($("#insuranceFee").val()),
			valuationFee: parseFloat($("#valuationFee").val()),
			financialConsultantId: $("#financialConsultantId").val(),
			financialConsultantName: $("#financialConsultantName").val(),
			paymentDate: $("#paymentDate").val(),
			paymentStatus: $("#paymentStatus").val(),
			paymentMode: $("#paymentMode").val(),
			accountNo: $("#accountNo").val(),
			ref_UpiId: $("#ref_UpiId").val(),
			charges: $("#charges").val(),
			remarks: $("#remarks").val(),
			chequeDate: $("#chequeDate").val(),
			chequeNo: $("#chequeNo").val(),
			photo: $('#photoHidden').val(),
			signature: $('#signatureHidden').val(),
			communityAddress:$('#communityAddress').val(),
			branchName:$('#branchname').val()
		};

		$.ajax({
			type: "POST",
			url: "api/joinliability/saveloanPayment", // ensure this matches backend mapping
			data: JSON.stringify(groupLoanData),
			contentType: "application/json",
			success: function(response) {
				alert("Loan Payment processed and distributed to members successfully!");
				location.reload(true);
			},
			error: function(xhr, status, error) {
				alert("❌ Failed to process Loan Payment.");
				console.error("Error:", xhr.responseText);
			}
		});
	});
});








