$(document).ready(function() {
	// Populate member codes
	$.ajax({
		url: "api/customermanagement/approved",
		type: "GET",
		data: { memberCode: "" },
		success: function(response) {
			var select = $("#customerCode");
			select.empty();
			select.append('<option value="">SELECT CUSTOMER CODE</option>');
			if (response && response.data && response.data.length > 0) {
				response.data.forEach(function(customer) {
					const fullName = [
						customer.firstName || "",
						customer.middleName || "",
						customer.lastName || ""
					].filter(Boolean).join(" ");
					var name = (fullName || "").toUpperCase();
					var optionText = customer.memberCode + "-" + name;
					var optionValue = customer.memberCode;
					select.append(
						'<option value="' + optionValue + '">' + optionText + "</option>"
					);
				});
			} else {
				console.log("No members found");
			}
		},
		error: function(err) {
			console.error("Error fetching members", err);
		},
	});
	$("#customerCode").on("change", function() {
		var memberCode = $(this).val();
		if (memberCode) {
			$.ajax({
				url: "api/securedGoldLoan/getByMemberCodeGoldLoan",
				type: "GET",
				data: { memberCode: memberCode },
				success: function(response) {
					if (response && response.data && response.data.length > 0) {
						var customer = response.data[0]; // assuming first record
						const fullName = [
							customer.firstName || "",
							customer.middleName || "",
							customer.lastName || ""
						].filter(Boolean).join(" ");

						// Populate form fields
						$("#customerName").val(fullName || "");

					} else {
						alert("No details found for this member");
					}
				},
				error: function(err) {
					console.error("Error fetching customer details", err);
				},
			});
		} else {
			// clear fields if no member selected
			$("#customerName").val("");
		}
	});

	//for bind the branch in dropdown
	$.ajax({
		url: "api/customermanagement/approved",
		type: "GET",
		success: function(response) {
			var select = $("#lockerBranch");
			select.empty();
			select.append('<option value="">Select Branch</option>');

			if (response && response.data) {
				// Store distinct branch names in a Set
				var branchSet = new Set();

				$.each(response.data, function(index, customer) {
					if (customer.branchName) {
						branchSet.add(customer.branchName.trim());
					}
				});

				// Append distinct branches
				branchSet.forEach(function(branch) {
					select.append('<option value="' + branch + '">' + branch + '</option>');
				});
			}
		},
		error: function() {
			alert("Failed to fetch branches.");
		}
	});

	//for save the data 

	$("#saveButtonforGoldDirectory").click(function(e) {

		let isValid = true;

		$('#vemipayment').text('');

		var emiPayment = $('#emiPayment').val().trim();

		if (emiPayment === "") {
			$('#vemipayment').text('*This Fild Is Requird');
			$('#emiPayment').focus();
			isValid = false;
		}

		if (!isValid) {
			return;
		}

		e.preventDefault(); // form submit ko stop kare

		// Form data collect
		var formData = {
			//id: $("#goldDirectoryId").val(), // agar id empty hai to null bhejega
			customerCode: $("#customerCode").val(),
			customerName: $("#customerName").val(),
			karat: $("#karat").val(),
			todayRate: $("#todayRate").val(),
			custgoldRate: $("#custgoldRate").val(),
			itemMasterType: $("#itemMasterType").val(),
			itemName: $("#ItemName").val(),
			itemWeight: $("#itemWeight").val(),
			lockerBranch: $("#lockerBranch").val(),
			lockerNumber: $("#lockerNo").val(),
			purityName: $("#purityName").val(),
			purity: $("#purity").val(),
			itemPurityType: $("#itemPurityType").val(),
			loanPlanName: $("#loanPlanName").val(),
			typeOfLoan: $("#typeOfLoan").val(),
			loanMode: $("#loanMode").val(),
			loanTerm: $("#loanTerm").val(),
			rateOfInterest: $("#rateOfInterest").val(),
			loanAmount: $("#loanAmount").val(),
			typeIntrest: $("#typeIntrest").val(),
			emiPayment: $("#emiPayment").val()
		};

		// Ajax call
		$.ajax({
			url: "api/securedGoldLoan/saveGoldDirectory",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(formData),
			success: function(response) {
				alert(
					`All the data are saved successfully!\n\n` +
					`Locker Number      : ${formData.lockerNumber}\n` +
					`Total Loan Amount  : \u20B9${formatNumber(formData.loanAmount)}\n` +
					`EMI per Month      : \u20B9${formatNumber(formData.emiPayment)}`
				);
				location.reload();
				$("#goldDirectoryId").val(""); // hidden id clear
			},
			error: function(xhr) {
				alert("Error: " + (xhr.responseJSON?.message || "Something went wrong"));
			}
		});
	});
});

function calculateLoanAmount() {
	let custRate = parseFloat(document.getElementById("custgoldRate").value);
	let itemWeight = parseFloat(document.getElementById("itemWeight").value);

	if (isNaN(custRate) || isNaN(itemWeight)) {
		document.getElementById("loanAmount").value = "";
		calculateEMI(); // Clear EMI
		return;
	}

	// Total gold value customer brought
	let totalGoldValue = custRate * itemWeight;

	// Apply 75% LTV rule
	let loanAmount = totalGoldValue * 0.75;

	document.getElementById("loanAmount").value = loanAmount.toFixed(2);

	// After Loan Amount is calculated → Auto calculate EMI too
	calculateEMI();
}

function calculateEMI() {
	let loanMode = document.getElementById("loanMode").value;
	let loanTerm = parseInt(document.getElementById("loanTerm").value);
	let rate = parseFloat(document.getElementById("rateOfInterest").value);
	let loanAmount = parseFloat(document.getElementById("loanAmount").value);
	let interestType = document.getElementById("typeIntrest").value;

	if (!loanMode || isNaN(loanTerm) || isNaN(rate) || isNaN(loanAmount) || !interestType) {
		document.getElementById("emiPayment").value = "";
		return;
	}

	// Convert Loan Term according to Mode
	let n = loanTerm;
	if (loanMode === "Quarterly") n = loanTerm * 4;
	else if (loanMode === "Yearly") n = loanTerm * 12;

	let monthlyRate = rate / 100 / 12;
	let emi = 0;
	// -------------------- FLAT INTEREST --------------------
	if (interestType === "Flat Interest") {
		let lTerm = loanTerm / 12;
		let total = loanAmount + ((loanAmount * rate * lTerm) / 100);
		emi = total / n;
	}

	// -------------------- REDUCING INTEREST --------------------
	else if (interestType === "Reducing Interest") {
		emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
			(Math.pow(1 + monthlyRate, n) - 1);
	}

	// -------------------- RULE 78 --------------------
	else if (interestType === "Rule 78") {
		let totalInterest = loanAmount * rate * loanTerm / 100;
		emi = (loanAmount + totalInterest) / n;
	}

	document.getElementById("emiPayment").value = emi.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function() {

	// For Loan Amount (Gold Value Calculation)
	const loanAmountFields = ["custgoldRate", "itemWeight"];
	loanAmountFields.forEach(id => {
		const el = document.getElementById(id);
		if (el) {
			el.addEventListener("input", calculateLoanAmount);
			el.addEventListener("change", calculateLoanAmount);
		}
	});

	// For EMI Calculation
	const emiFields = ["loanMode", "loanTerm", "rateOfInterest", "typeIntrest"];
	emiFields.forEach(id => {
		const el = document.getElementById(id);
		if (el) {
			el.addEventListener("input", calculateEMI);
			el.addEventListener("change", calculateEMI);
		}
	});
});

function formatNumber(num) {
	return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}