function calculateEMI() {

	// ==============================
	// ✅ CLEAR ALL ERROR MESSAGES
	// ==============================
	$('#chkemiloandetails, #chkloanamount, #chkyearlyinterest, #chkinterestmode, #chkmonthlyterm, #chkemi').text("");

	// ==============================
	// ✅ GET FIELD VALUES
	// ==============================
	const roitype = document.getElementById("intrestType").value.trim();
	const emicollection = document.getElementById("interestModeCalculater").value.trim();

	const interestinyear = parseFloat(document.getElementById("yearlyIntrest").value.trim());
	const loanamount = parseFloat(document.getElementById("loanAmount").value.trim());
	const tensure = parseInt(document.getElementById("monthlyTerm").value.trim());

	let isValid = true;

	// ==============================
	// ✅ REGEX PATTERNS
	// ==============================
	const numberPattern = /^[0-9]+(\.[0-9]{1,2})?$/;  // 100 or 100.50
	const intPattern = /^[0-9]+$/; // only integer

	// ==============================
	// ✅ VALIDATIONS (FIELD BY FIELD)
	// ==============================

	// ✅ 1. INTEREST TYPE
	if (roitype === "") {
		$("#chkemiloandetails").text("* Please select Interest Type");
		$("#intrestType").focus();
		isValid = false;
	}

	// ✅ 2. LOAN AMOUNT
	if ($("#loanAmount").val().trim() === "") {
		$("#chkloanamount").text("* Loan Amount is required");
		if (isValid) $("#loanAmount").focus();
		isValid = false;
	} else if (!numberPattern.test($("#loanAmount").val().trim())) {
		$("#chkloanamount").text("* Loan Amount must be numeric (example: 50000)");
		if (isValid) $("#loanAmount").focus();
		isValid = false;
	} else if (loanamount <= 0) {
		$("#chkloanamount").text("* Loan Amount must be greater than 0");
		if (isValid) $("#loanAmount").focus();
		isValid = false;
	}

	// ✅ 3. YEARLY INTEREST
	if ($("#yearlyIntrest").val().trim() === "") {
		$("#chkyearlyinterest").text("* Yearly Interest is required");
		if (isValid) $("#yearlyIntrest").focus();
		isValid = false;
	} else if (!numberPattern.test($("#yearlyIntrest").val().trim())) {
		$("#chkyearlyinterest").text("* Yearly Interest must be numeric (example: 12)");
		if (isValid) $("#yearlyIntrest").focus();
		isValid = false;
	} else if (interestinyear <= 0) {
		$("#chkyearlyinterest").text("* Interest must be greater than 0");
		if (isValid) $("#yearlyIntrest").focus();
		isValid = false;
	} else if (interestinyear > 36) {
		$("#chkyearlyinterest").text("* Interest should be between 1% and 36%");
		if (isValid) $("#yearlyIntrest").focus();
		isValid = false;
	}

	// ✅ 4. INTEREST MODE
	if (emicollection === "") {
		$("#chkinterestmode").text("* Please select Interest Mode");
		if (isValid) $("#interestModeCalculater").focus();
		isValid = false;
	}

	// ✅ 5. MONTHLY TERM
	if ($("#monthlyTerm").val().trim() === "") {
		$("#chkmonthlyterm").text("* Monthly Term is required");
		if (isValid) $("#monthlyTerm").focus();
		isValid = false;
	} else if (!intPattern.test($("#monthlyTerm").val().trim())) {
		$("#chkmonthlyterm").text("* Monthly Term must be in number (example: 12)");
		if (isValid) $("#monthlyTerm").focus();
		isValid = false;
	} else if (tensure <= 0) {
		$("#chkmonthlyterm").text("* Monthly Term must be greater than 0");
		if (isValid) $("#monthlyTerm").focus();
		isValid = false;
	} else if (tensure > 600) {
		$("#chkmonthlyterm").text("* Monthly Term cannot be more than 600");
		if (isValid) $("#monthlyTerm").focus();
		isValid = false;
	}

	// ✅ STOP CALCULATION IF INVALID
	if (!isValid) {
		document.getElementById("emi").value = "";
		document.getElementById("tbody").innerHTML = "";
		document.querySelector('.datatable').classList.remove('show');
		return false;
	}

	// ==============================
	// ✅ EMI CALCULATION
	// ==============================
	//const periods = tensure; // ✅ term fixed
	//let periodicRate;

	//switch (emicollection) {
	//    case "Daily":
	//      periodicRate = interestinyear / 365 / 100;
	//    break;
	//  case "Weekly":
	//     periodicRate = interestinyear / 52 / 100;
	//   break;
	//case "Fortnightly":
	//  periodicRate = interestinyear / 24 / 100;
	//break;
	//case "Monthly":
	//  periodicRate = interestinyear / 12 / 100;
	//break;
	//case "Quarterly":
	//  periodicRate = interestinyear / 4 / 100;
	//break;
	//default:
	//  $("#chkinterestmode").text("* Invalid Interest Mode Selected");
	//return false;
	// }
	let periods;
	let periodicRate;

	switch (emicollection) {

		case "Daily":
			periods = tensure * 30; // months -> days approximation
			periodicRate = interestinyear / 365 / 100;
			break;

		case "Weekly":
			periods = tensure * 4; // months -> weeks approximation
			periodicRate = interestinyear / 52 / 100;
			break;

		case "Fortnightly":
			periods = tensure * 2; // months -> fortnight
			periodicRate = interestinyear / 24 / 100;
			break;

		case "Monthly":
			periods = tensure;
			periodicRate = interestinyear / 12 / 100;
			break;

		case "Quarterly":
			periods = Math.ceil(tensure / 3);
			periodicRate = interestinyear / 4 / 100;
			break;

		default:
			$("#chkinterestmode").text("* Invalid Interest Mode");
			return false;
	}

	let emi, tabledata = "", principal, currentDate = new Date();

	// ✅ FLAT INTEREST
	if (roitype === "FlatInterest") {

		let years = tensure / 12;

		const totalInterest =
			loanamount *
			(interestinyear / 100) *
			years;

		const totalAmount = loanamount + totalInterest;

		emi = totalAmount / periods;

		document.getElementById("emi").value = emi.toFixed(2);

		principal = loanamount;

		for (let m = 1; m <= periods; m++) {

			const interestComponent =
				totalInterest / periods;

			const principalComponent =
				emi - interestComponent;

			let closingPrincipal =
				principal - principalComponent;

			if (closingPrincipal < 0)
				closingPrincipal = 0;

			tabledata += buildRow(
				m,
				currentDate,
				emi,
				principalComponent,
				interestComponent,
				closingPrincipal
			);

			principal = closingPrincipal;

			currentDate =
				incrementDate(
					currentDate,
					emicollection
				);
		}
	}

	// ✅ REDUCING INTEREST
	else if (roitype === "reducinginterest") {

		const r = periodicRate;

		emi = (loanamount * r * Math.pow(1 + r, periods)) / (Math.pow(1 + r, periods) - 1);

		document.getElementById("emi").value = emi.toFixed(2);

		principal = loanamount;

		for (let m = 1; m <= periods; m++) {
			const interestComponent = principal * r;
			const principalComponent = emi - interestComponent;
			let closingPrincipal = principal - principalComponent;

			if (Math.abs(closingPrincipal) < 0.01) closingPrincipal = 0.00;

			tabledata += buildRow(m, currentDate, emi, principalComponent, interestComponent, closingPrincipal);

			principal = closingPrincipal;
			currentDate = incrementDate(currentDate, emicollection);
		}
	}

	// ✅ RULE 78
	else if (roitype === "Rule78") {

		const totalInterest = loanamount * periodicRate * periods;
		const sumOfDigits = (periods * (periods + 1)) / 2;

		let interestPerPeriod = [];
		for (let i = periods; i >= 1; i--) {
			interestPerPeriod.push((i / sumOfDigits) * totalInterest);
		}

		const totalAmount = loanamount + totalInterest;
		emi = totalAmount / periods;

		document.getElementById("emi").value = emi.toFixed(2);

		principal = loanamount;
		const principalComponent = loanamount / periods;

		for (let m = 1; m <= periods; m++) {
			const interestComponent = interestPerPeriod[m - 1];
			const installment = principalComponent + interestComponent;
			let closingPrincipal = principal - principalComponent;

			if (Math.abs(closingPrincipal) < 0.01) closingPrincipal = 0.00;

			tabledata += buildRow(m, currentDate, installment, principalComponent, interestComponent, closingPrincipal);

			principal = closingPrincipal;
			currentDate = incrementDate(currentDate, emicollection);
		}
	}

	// ✅ SHOW TABLE
	document.querySelector('.datatable').classList.add('show');
	document.getElementById("tbody").innerHTML = tabledata;

	return true;
}


// ✅ Helper: Format row
function buildRow(m, dateObj, installment, principalComponent, interestComponent, closingPrincipal) {
	const day = String(dateObj.getDate()).padStart(2, '0');
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const year = dateObj.getFullYear();
	const formattedDate = `${day}-${month}-${year}`;

	return `
      <tr>
        <td>${m}</td>
        <td>${formattedDate}</td>
        <td>${installment.toFixed(2)}</td>
        <td>${principalComponent.toFixed(2)}</td>
        <td>${interestComponent.toFixed(2)}</td>
        <td>${closingPrincipal.toFixed(2)}</td>
      </tr>`;
}


// ✅ Helper: Increment date
function incrementDate(date, mode) {
	const newDate = new Date(date);
	if (mode === "Daily") newDate.setDate(newDate.getDate() + 1);
	else if (mode === "Weekly") newDate.setDate(newDate.getDate() + 7);
	else if (mode === "Fortnightly") newDate.setDate(newDate.getDate() + 14);
	else if (mode === "Monthly") newDate.setMonth(newDate.getMonth() + 1);
	else if (mode === "Quarterly") newDate.setMonth(newDate.getMonth() + 3);
	return newDate;
}
