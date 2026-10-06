const loanTypeFieldsConfig = {
  "Personal Loan": [
    { name: "employerName", label: "Employer Name", type: "text", required: true },
    { name: "employeeId", label: "Employee ID", type: "text", required: true },
    { name: "monthlyNetSalary", label: "Monthly Net Salary", type: "number", required: true },
    { name: "salarySlipUpload", label: "Salary Slip", type: "file", required: true },
    { name: "bankStatementUpload", label: "Bank Statement (3-6 months)", type: "file", required: false }
  ],
  "Business Loan": [
    { name: "businessName", label: "Business Name", type: "text", required: true },
    { name: "businessType", label: "Business Type", type: "text", required: true },
    { name: "yearsInBusiness", label: "Years in Business", type: "number", required: true },
    { name: "monthlyTurnover", label: "Monthly Turnover", type: "number", required: true },
    { name: "tradeLicenseNo", label: "Trade License No.", type: "text", required: true },
    { name: "gstNo", label: "GST No.", type: "text", required: false }
  ],
  "TW Loan": [
    { name: "vehicleModel", label: "Vehicle Model & Brand", type: "text", required: true },
    { name: "onRoadPrice", label: "On-Road Price", type: "number", required: true },
    { name: "downPayment", label: "Down Payment Amount", type: "number", required: true },
    { name: "dealerName", label: "Dealer/Showroom Name", type: "text", required: true },
    { name: "chassisNo", label: "Chassis No.", type: "text", required: true },
    { name: "engineNo", label: "Engine No.", type: "text", required: true }
  ],
  "TW Refinance Loan": [
    { name: "existingRcNo", label: "Existing RC No.", type: "text", required: true },
    { name: "vehicleRegNo", label: "Vehicle Registration No.", type: "text", required: true },
    { name: "purchaseDate", label: "Purchase Date", type: "date", required: true },
    { name: "currentValuation", label: "Current Valuation Amount", type: "number", required: true },
    { name: "vehicleAge", label: "Vehicle Age (years)", type: "number", required: true }
  ],
  "CDL Loan": [
    { name: "productName", label: "Product/Item Name", type: "text", required: true },
    { name: "dealerShopName", label: "Dealer/Shop Name", type: "text", required: true },
    { name: "invoiceNo", label: "Product Invoice No.", type: "text", required: true },
    { name: "productPrice", label: "Product Price", type: "number", required: true }
  ],
  "Loan Against FD/RD/DRD": [
    { name: "depositAccountNo", label: "FD/RD/DRD Account No.", type: "text", required: true },
    { name: "depositAmount", label: "Deposit Amount", type: "number", required: true },
    { name: "maturityDate", label: "Deposit Maturity Date", type: "date", required: true },
    { name: "marginPercent", label: "Margin % (auto)", type: "number", required: true, readOnly: true },
    { name: "lienConfirmed", label: "Lien Marking Confirmed", type: "checkbox", required: true }
  ]
};