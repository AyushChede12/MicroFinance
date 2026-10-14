const loanTypeFieldsConfig = {
	"PERSONAL LOAN": [
		{ name: "employerName", label: "EMPLOYER NAME", type: "text", required: true },
		{ name: "employeeId", label: "EMPLOYEE ID", type: "text", required: true },
		{ name: "monthlyNetSalary", label: "MONTHLY NET SALARY", type: "number", required: true },
		{ name: "salarySlipUpload", label: "SALARY SLIP", type: "file", required: true },
		{ name: "bankStatementUpload", label: "BANK STATEMENT (3-6 MONTHS)", type: "file", required: false }
	],
	"BUSINESS LOAN": [
		{ name: "businessName", label: "BUSINESS NAME", type: "text", required: true },
		{ name: "businessType", label: "BUSINESS TYPE", type: "text", required: true },
		{ name: "yearsInBusiness", label: "YEARS IN BUSINESS", type: "number", required: true },
		{ name: "monthlyTurnover", label: "MONTHLY TURNOVER", type: "number", required: true },
		{ name: "tradeLicenseNo", label: "TRADE LICENSE NO.", type: "text", required: true },
		{ name: "gstNo", label: "GST NO.", type: "text", required: false }
	],
	"TW LOAN": [
		{ name: "vehicleModel", label: "VEHICLE MODEL & BRAND", type: "text", required: true },
		{ name: "onRoadPrice", label: "ON-ROAD PRICE", type: "number", required: true },
		{ name: "downPayment", label: "DOWN PAYMENT AMOUNT", type: "number", required: true },
		{ name: "dealerName", label: "DEALER/SHOWROOM NAME", type: "text", required: true },
		{ name: "chassisNo", label: "CHASSIS NO.", type: "text", required: true },
		{ name: "engineNo", label: "ENGINE NO.", type: "text", required: true }
	],
	"TW REFINANCE LOAN": [
		{ name: "existingRcNo", label: "EXISTING RC NO.", type: "text", required: true },
		{ name: "vehicleRegNo", label: "VEHICLE REGISTRATION NO.", type: "text", required: true },
		{ name: "purchaseDate", label: "PURCHASE DATE", type: "date", required: true },
		{ name: "currentValuation", label: "CURRENT VALUATION AMOUNT", type: "number", required: true },
		{ name: "vehicleAge", label: "VEHICLE AGE (YEARS)", type: "number", required: true }
	],
	"CDL LOAN": [
		{ name: "productName", label: "PRODUCT/ITEM NAME", type: "text", required: true },
		{ name: "dealerShopName", label: "DEALER/SHOP NAME", type: "text", required: true },
		{ name: "invoiceNo", label: "PRODUCT INVOICE NO.", type: "text", required: true },
		{ name: "productPrice", label: "PRODUCT PRICE", type: "number", required: true }
	],
	"LOAN AGAINST FD/RD/DRD": [
		{ name: "depositAccountNo", label: "FD/RD/DRD ACCOUNT NO.", type: "text", required: true },
		{ name: "depositAmount", label: "DEPOSIT AMOUNT", type: "number", required: true },
		{ name: "maturityDate", label: "DEPOSIT MATURITY DATE", type: "date", required: true },
		{ name: "marginPercent", label: "MARGIN % (AUTO)", type: "number", required: true, readOnly: true },
		{ name: "lienConfirmed", label: "LIEN MARKING CONFIRMED", type: "checkbox", required: true }
	]
};