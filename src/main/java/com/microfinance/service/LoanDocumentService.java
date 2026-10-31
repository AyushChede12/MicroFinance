package com.microfinance.service;

import java.io.ByteArrayOutputStream;
import java.io.Serializable;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.microfinance.dto.RegularLoanStatementResponse;
import com.microfinance.dto.StatementRowDto;
import com.microfinance.model.CompanyAdministration;
import com.microfinance.model.LoanApplication;
import com.microfinance.repository.CompanyAdministrationRepo;
import com.microfinance.repository.LoanApplicationRepo;

@Service
public class LoanDocumentService {

	private static final Logger logger = LoggerFactory.getLogger(LoanDocumentService.class);

	@Autowired
	private LoanApplicationRepo loanApplicationRepo;

	@Autowired(required = false)
	private CompanyAdministrationRepo companyAdministrationRepo;

	@Autowired
	private LoanManagementService loanManagementService;

	private final Map<String, List<Map<String, Object>>> documentLogs = new ConcurrentHashMap<>();

	public List<String> getPrintableLoanIds() {
		List<String> ids = loanApplicationRepo.findAllDistinctLoanIds();
		return ids != null ? ids : Collections.emptyList();
	}

	public Map<String, Object> getLoanDetails(String loanId) {
		LoanApplication loan = loanManagementService.getLoanById(loanId);
		if (loan == null) {
			return null;
		}

		Map<String, Object> d = new HashMap<>();
		d.put("loanId", loan.getLoanId());
		d.put("loanDate", loan.getLoanDate() != null ? loan.getLoanDate().toUpperCase() : "--");
		d.put("loanPlanName", loan.getLoanPlanName() != null ? loan.getLoanPlanName().toUpperCase() : "--");
		d.put("typeOfLoan", loan.getTypeOfLoan() != null ? loan.getTypeOfLoan().toUpperCase() : "--");
		d.put("memberId", loan.getMemberId() != null ? loan.getMemberId().toUpperCase() : "");
		d.put("memberName", loan.getMemberName() != null ? loan.getMemberName().toUpperCase() : "--");
		d.put("relativeDetails", loan.getRelativeDetails() != null ? loan.getRelativeDetails().toUpperCase() : "--");
		d.put("contactNo", loan.getContactNo() != null ? loan.getContactNo().toUpperCase() : "--");
		d.put("loanAmount", loan.getLoanAmount() != null ? loan.getLoanAmount() : "0");
		d.put("rateOfInterest", loan.getRateOfInterest() != null ? loan.getRateOfInterest() : "0");
		d.put("loanTerm", loan.getLoanTerm() != null ? loan.getLoanTerm() : "0");
		d.put("interestType", loan.getInterestType() != null ? loan.getInterestType().toUpperCase() : "FLAT");
		d.put("loanMode", loan.getLoanMode() != null ? loan.getLoanMode().toUpperCase() : "MONTHLY");
		d.put("emiPayment", loan.getEmiPayment() != null ? loan.getEmiPayment() : "0");
		d.put("loanStatus", loan.getLoanStatus() != null ? loan.getLoanStatus().toUpperCase() : "ACTIVE");
		d.put("approvalDate", loan.getApprovalDate() != null ? loan.getApprovalDate().toUpperCase() : "--");
		d.put("netDisbursementAmount", loan.getLoanAmount() != null ? loan.getLoanAmount() : "0");
		d.put("guarantorIdentity", loan.getGuarantorIdentity() != null ? loan.getGuarantorIdentity().toUpperCase() : "");
		d.put("guarantorMemberId", loan.getGuarantorMemberId() != null ? loan.getGuarantorMemberId().toUpperCase() : "");
		d.put("coApplicantIdentity", loan.getCoApplicantIdentity() != null ? loan.getCoApplicantIdentity().toUpperCase() : "");

		return d;
	}

	public List<Map<String, Object>> getAvailableDocuments(String loanId) {
		List<Map<String, Object>> list = new ArrayList<>();
		list.add(createDocMeta("SANCTION_LETTER", "SANCTION LETTER", true, ""));
		list.add(createDocMeta("LOAN_AGREEMENT", "LOAN AGREEMENT", true, ""));
		list.add(createDocMeta("REPAYMENT_SCHEDULE", "REPAYMENT SCHEDULE", true, ""));
		list.add(createDocMeta("DISBURSEMENT_RECEIPT", "DISBURSEMENT RECEIPT", true, ""));
		list.add(createDocMeta("GUARANTOR_DECLARATION", "GUARANTOR DECLARATION", true, ""));
		list.add(createDocMeta("NOC", "NO OBJECTION CERTIFICATE (NOC)", true, ""));
		return list;
	}

	private Map<String, Object> createDocMeta(String type, String name, boolean available, String reason) {
		Map<String, Object> m = new HashMap<>();
		m.put("docType", type);
		m.put("name", name);
		m.put("available", available);
		m.put("reason", reason);
		return m;
	}

	public List<Map<String, Object>> getDocumentLogs(String loanId) {
		return documentLogs.getOrDefault(loanId, Collections.emptyList());
	}

	public void recordDocumentLog(String loanId, String docType) {
		Map<String, Object> log = new HashMap<>();
		log.put("loanId", loanId);
		log.put("documentType", docType);
		log.put("documentName", docType.replace('_', ' '));
		log.put("generatedAt", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		log.put("generatedByUserId", "ADMIN");
		log.put("fileReference", docType + "_" + loanId + "_" + System.currentTimeMillis() + ".pdf");

		documentLogs.computeIfAbsent(loanId, k -> new ArrayList<>()).add(0, log);
	}

	public CompanyAdministration getCompany() {
		try {
			if (companyAdministrationRepo != null) {
				CompanyAdministration comp = companyAdministrationRepo.findTopByOrderByIdAsc();
				if (comp != null) return comp;
			}
		} catch (Exception e) {
			logger.warn("Could not fetch CompanyAdministration: {}", e.getMessage());
		}
		CompanyAdministration fallback = new CompanyAdministration();
		fallback.setCompanyName("CO OPERATIVE SOCIETY LTD NAGPUR");
		fallback.setAddress("PLOT NO 497, NEW NANDANWAN, NEAR WOMENS COLLEGE, NAGPUR, MAHARASHTRA - 440024");
		fallback.setCinNo("ASJ#567");
		fallback.setHelplineNo("9566200223");
		fallback.setEmailId("SUPPORT@COOPERATIVESOCIETY.ORG");
		return fallback;
	}

	private String esc(String str) {
		if (str == null) return "--";
		return str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").trim();
	}

	private String formatCurrency(String val) {
		try {
			double num = Double.parseDouble(val);
			NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));
			return nf.format(num);
		} catch (Exception e) {
			return "₹ " + esc(val);
		}
	}

	public String generateDocumentHtml(String loanId, String docType) {
		LoanApplication loan = loanManagementService.getLoanById(loanId);
		if (loan == null) {
			return "<div class='alert alert-danger'>LOAN APPLICATION NOT FOUND FOR ID: " + esc(loanId) + "</div>";
		}

		CompanyAdministration comp = getCompany();
		String companyName = esc(comp.getCompanyName() != null ? comp.getCompanyName().toUpperCase() : "CO OPERATIVE SOCIETY LTD NAGPUR");
		String companyAddress = esc(comp.getAddress() != null ? comp.getAddress().toUpperCase() : "");
		String cin = esc(comp.getCinNo() != null ? comp.getCinNo().toUpperCase() : "");
		String phone = esc(comp.getHelplineNo() != null ? comp.getHelplineNo() : "");
		String email = esc(comp.getEmailId() != null ? comp.getEmailId().toUpperCase() : "SUPPORT@COOPERATIVESOCIETY.ORG");

		StringBuilder sb = new StringBuilder();
		sb.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n");
		sb.append("<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n");
		sb.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n");
		sb.append("<title>").append(esc(docType)).append("</title>\n");
		sb.append("<style type=\"text/css\">\n");
		sb.append("@page { size: A4 portrait; margin: 12mm; }\n");
		sb.append("body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #111; margin: 0; padding: 15px; }\n");
		sb.append(".header { text-align: center; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-bottom: 18px; }\n");
		sb.append(".company-name { font-size: 17pt; font-weight: bold; color: #0d6efd; text-transform: uppercase; margin: 0 0 4px 0; }\n");
		sb.append(".company-meta { font-size: 9pt; color: #555; margin: 2px 0; }\n");
		sb.append(".doc-title { text-align: center; font-size: 14pt; font-weight: bold; color: #222; text-decoration: underline; margin: 15px 0 20px 0; text-transform: uppercase; }\n");
		sb.append(".table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }\n");
		sb.append(".table th, .table td { border: 1px solid #ccc; padding: 6px 10px; font-size: 9.5pt; text-align: left; }\n");
		sb.append(".table th { background-color: #f1f5f9; font-weight: bold; width: 25%; color: #333; text-transform: uppercase; }\n");
		sb.append(".sign-table { width: 100%; margin-top: 45px; page-break-inside: avoid; border: none; }\n");
		sb.append(".sign-table td { width: 33.33%; text-align: center; font-size: 9pt; vertical-align: bottom; border: none; padding-top: 45px; }\n");
		sb.append(".sign-line { border-top: 1px solid #444; margin: 0 15px 5px 15px; }\n");
		sb.append(".clause { margin: 8px 0; font-size: 9.5pt; color: #333; text-align: justify; }\n");
		sb.append("</style>\n</head>\n<body>\n");

		// Header
		sb.append("<div class=\"header\">\n");
		sb.append("  <div class=\"company-name\">").append(companyName).append("</div>\n");
		if (!companyAddress.isEmpty()) {
			sb.append("  <div class=\"company-meta\">").append(companyAddress).append("</div>\n");
		}
		sb.append("  <div class=\"company-meta\">");
		if (!cin.isEmpty()) sb.append("CIN: ").append(cin).append(" | ");
		if (!phone.isEmpty()) sb.append("HELPLINE: ").append(phone).append(" | ");
		sb.append("EMAIL: ").append(email).append("</div>\n");
		sb.append("</div>\n");

		String normDoc = docType != null ? docType.toUpperCase() : "SANCTION_LETTER";

		switch (normDoc) {
			case "SANCTION_LETTER":
				renderSanctionLetter(sb, loan, companyName);
				break;
			case "LOAN_AGREEMENT":
				renderLoanAgreement(sb, loan, companyName);
				break;
			case "REPAYMENT_SCHEDULE":
				renderRepaymentSchedule(sb, loan);
				break;
			case "DISBURSEMENT_RECEIPT":
				renderDisbursementReceipt(sb, loan, companyName);
				break;
			case "GUARANTOR_DECLARATION":
				renderGuarantorDeclaration(sb, loan, companyName);
				break;
			case "NOC":
				renderNoc(sb, loan, companyName);
				break;
			default:
				renderSanctionLetter(sb, loan, companyName);
				break;
		}

		sb.append("</body>\n</html>");
		return sb.toString();
	}

	private void renderSanctionLetter(StringBuilder sb, LoanApplication loan, String companyName) {
		sb.append("<div class=\"doc-title\">OFFICIAL LOAN SANCTION LETTER</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>LOAN ID / CODE</th><td>").append(esc(loan.getLoanId())).append("</td><th>SANCTION DATE</th><td>").append(esc(loan.getLoanDate())).append("</td></tr>\n");
		sb.append("<tr><th>APPLICANT NAME</th><td>").append(esc(loan.getMemberName())).append("</td><th>MEMBER CODE</th><td>").append(esc(loan.getMemberId())).append("</td></tr>\n");
		sb.append("<tr><th>CONTACT NUMBER</th><td>").append(esc(loan.getContactNo())).append("</td><th>RELATIVE DETAILS</th><td>").append(esc(loan.getRelativeDetails())).append("</td></tr>\n");
		sb.append("<tr><th>LOAN PRODUCT / PLAN</th><td>").append(esc(loan.getLoanPlanName())).append("</td><th>LOAN TYPE</th><td>").append(esc(loan.getTypeOfLoan())).append("</td></tr>\n");
		sb.append("<tr><th>SANCTIONED AMOUNT</th><td><strong>").append(formatCurrency(loan.getLoanAmount())).append("</strong></td><th>RATE OF INTEREST</th><td>").append(esc(loan.getRateOfInterest())).append("% P.A.</td></tr>\n");
		sb.append("<tr><th>TENURE (TERM)</th><td>").append(esc(loan.getLoanTerm())).append(" MONTHS</td><th>EMI AMOUNT</th><td><strong>").append(formatCurrency(loan.getEmiPayment())).append("</strong></td></tr>\n");
		sb.append("<tr><th>LOAN MODE</th><td>").append(esc(loan.getLoanMode())).append("</td><th>INTEREST TYPE</th><td>").append(esc(loan.getInterestType())).append("</td></tr>\n");
		sb.append("<tr><th>GUARANTOR IDENTITY</th><td colspan=\"3\">").append(esc(loan.getGuarantorIdentity())).append(loan.getGuarantorMemberId() != null ? " (" + esc(loan.getGuarantorMemberId()) + ")" : "").append("</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\"><strong>TERMS AND CONDITIONS:</strong></div>\n");
		sb.append("<div class=\"clause\">1. THE SANCTIONED AMOUNT IS SUBJECT TO ACCEPTANCE OF THE TERMS OF <strong>").append(companyName).append("</strong>.</div>\n");
		sb.append("<div class=\"clause\">2. THE BORROWER UNDERTAKES TO REPAY THE LOAN IN TIMELY EQUATED MONTHLY INSTALLMENTS (EMI) AS PER SCHEDULE.</div>\n");
		sb.append("<div class=\"clause\">3. DELAYED OR OVERDUE PAYMENTS SHALL ATTRACT PENAL INTEREST IN ACCORDANCE WITH APPLICABLE LENDING NORMS.</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>BORROWER SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>GUARANTOR SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>AUTHORIZED SIGNATORY</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderLoanAgreement(StringBuilder sb, LoanApplication loan, String companyName) {
		sb.append("<div class=\"doc-title\">LOAN AGREEMENT &amp; DEMAND PROMISSORY NOTE</div>\n");
		sb.append("<div class=\"clause\">THIS AGREEMENT IS EXECUTED ON THIS DATE <strong>").append(esc(loan.getLoanDate())).append("</strong> BETWEEN:</div>\n");
		sb.append("<div class=\"clause\"><strong>1. THE LENDER:</strong> <strong>").append(companyName).append("</strong> (HEREINAFTER REFERRED TO AS THE 'SOCIETY/INSTITUTION').</div>\n");
		sb.append("<div class=\"clause\"><strong>2. THE BORROWER:</strong> <strong>").append(esc(loan.getMemberName())).append("</strong>, MEMBER ID: <strong>").append(esc(loan.getMemberId())).append("</strong>, CONTACT: <strong>").append(esc(loan.getContactNo())).append("</strong>.</div>\n");
		sb.append("<div class=\"clause\">WHEREAS THE BORROWER HAS APPLIED FOR AND THE LENDER HAS AGREED TO ADVANCE A LOAN OF <strong>").append(formatCurrency(loan.getLoanAmount())).append("</strong> ON THE FOLLOWING KEY TERMS:</div>\n");

		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>LOAN CODE</th><td>").append(esc(loan.getLoanId())).append("</td><th>SANCTIONED PRINCIPAL</th><td>").append(formatCurrency(loan.getLoanAmount())).append("</td></tr>\n");
		sb.append("<tr><th>TENURE (MONTHS)</th><td>").append(esc(loan.getLoanTerm())).append(" MONTHS</td><th>INTEREST RATE</th><td>").append(esc(loan.getRateOfInterest())).append("% P.A. (").append(esc(loan.getInterestType())).append(")</td></tr>\n");
		sb.append("<tr><th>EMI PAYMENT</th><td>").append(formatCurrency(loan.getEmiPayment())).append("</td><th>REPAYMENT MODE</th><td>").append(esc(loan.getLoanMode())).append("</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\"><strong>PROMISSORY NOTE:</strong> ON DEMAND, I/WE PROMISE TO PAY TO <strong>").append(companyName).append("</strong> OR ORDER, THE SUM OF ").append(formatCurrency(loan.getLoanAmount())).append(" TOGETHER WITH APPLICABLE INTEREST FOR VALUE RECEIVED.</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>BORROWER SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>WITNESS / GUARANTOR</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>BRANCH MANAGER</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderRepaymentSchedule(StringBuilder sb, LoanApplication loan) {
		sb.append("<div class=\"doc-title\">REPAYMENT AMORTIZATION SCHEDULE</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>LOAN ID</th><td>").append(esc(loan.getLoanId())).append("</td><th>CUSTOMER NAME</th><td>").append(esc(loan.getMemberName())).append("</td></tr>\n");
		sb.append("<tr><th>SANCTIONED AMOUNT</th><td>").append(formatCurrency(loan.getLoanAmount())).append("</td><th>TENURE</th><td>").append(esc(loan.getLoanTerm())).append(" MONTHS</td></tr>\n");
		sb.append("<tr><th>MONTHLY EMI</th><td>").append(formatCurrency(loan.getEmiPayment())).append("</td><th>ANNUAL ROI</th><td>").append(esc(loan.getRateOfInterest())).append("% P.A.</td></tr>\n");
		sb.append("</table>\n");

		RegularLoanStatementResponse stmt = loanManagementService.getRegularLoanStatement(loan.getLoanId());
		List<StatementRowDto> rows = stmt != null ? stmt.getStatementRows() : null;

		sb.append("<table class=\"table\" style=\"font-size: 8.5pt;\">\n");
		sb.append("<thead><tr style=\"background:#e2e8f0;\"><th>#</th><th>DUE DATE</th><th>EMI (₹)</th><th>PRINCIPAL (₹)</th><th>INTEREST (₹)</th><th>STATUS</th><th>RUNNING BALANCE (₹)</th></tr></thead>\n");
		sb.append("<tbody>\n");

		if (rows != null && !rows.isEmpty()) {
			for (StatementRowDto r : rows) {
				sb.append("<tr>");
				sb.append("<td>").append(r.getInstallmentNumber()).append("</td>");
				sb.append("<td>").append(esc(r.getDueDate())).append("</td>");
				sb.append("<td>").append(String.format(Locale.ENGLISH, "%.2f", r.getEmiAmount())).append("</td>");
				sb.append("<td>").append(String.format(Locale.ENGLISH, "%.2f", r.getPrincipalComponent())).append("</td>");
				sb.append("<td>").append(String.format(Locale.ENGLISH, "%.2f", r.getInterestComponent())).append("</td>");
				sb.append("<td>").append(esc(r.getStatus())).append("</td>");
				sb.append("<td>").append(String.format(Locale.ENGLISH, "%.2f", r.getRunningBalance())).append("</td>");
				sb.append("</tr>\n");
			}
		} else {
			sb.append("<tr><td colspan=\"7\" style=\"text-align:center;\">NO AMORTIZATION SCHEDULE FOUND</td></tr>\n");
		}

		sb.append("</tbody>\n</table>\n");
	}

	private void renderDisbursementReceipt(StringBuilder sb, LoanApplication loan, String companyName) {
		sb.append("<div class=\"doc-title\">OFFICIAL LOAN DISBURSEMENT RECEIPT</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>RECEIPT NO.</th><td>DISB-").append(esc(loan.getLoanId())).append("</td><th>DISBURSEMENT DATE</th><td>").append(esc(loan.getLoanDate())).append("</td></tr>\n");
		sb.append("<tr><th>BORROWER NAME</th><td>").append(esc(loan.getMemberName())).append("</td><th>MEMBER ID</th><td>").append(esc(loan.getMemberId())).append("</td></tr>\n");
		sb.append("<tr><th>LOAN PRODUCT</th><td>").append(esc(loan.getLoanPlanName())).append("</td><th>LOAN ACCOUNT NO</th><td>").append(esc(loan.getLoanId())).append("</td></tr>\n");
		sb.append("<tr><th>GROSS SANCTIONED AMOUNT</th><td><strong>").append(formatCurrency(loan.getLoanAmount())).append("</strong></td><th>DISBURSEMENT MODE</th><td>DIRECT BANK TRANSFER / CASH</td></tr>\n");
		sb.append("<tr><th>PROCESSING CHARGES</th><td>₹ 0.00</td><th>INSURANCE CHARGES</th><td>₹ 0.00</td></tr>\n");
		sb.append("<tr><th>NET DISBURSED AMOUNT</th><td colspan=\"3\"><strong style=\"font-size:12pt; color:#0d6efd;\">").append(formatCurrency(loan.getLoanAmount())).append("</strong></td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\">I ACKNOWLEDGE RECEIPT OF THE NET DISBURSED LOAN AMOUNT AS OUTLINED ABOVE IN FULL SETTLEMENT OF DISBURSEMENT FOR LOAN ID <strong>").append(esc(loan.getLoanId())).append("</strong> FROM <strong>").append(companyName).append("</strong>.</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>BORROWER SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>CASHIER / DISBURSEMENT OFFICER</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>BRANCH MANAGER</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderGuarantorDeclaration(StringBuilder sb, LoanApplication loan, String companyName) {
		sb.append("<div class=\"doc-title\">GUARANTOR / CO-APPLICANT UNDERTAKING &amp; DECLARATION</div>\n");
		sb.append("<div class=\"clause\">TO: <strong>").append(companyName).append("</strong></div>\n");
		sb.append("<div class=\"clause\">IN CONSIDERATION OF YOUR GRANTING A LOAN OF <strong>").append(formatCurrency(loan.getLoanAmount())).append("</strong> TO THE BORROWER <strong>").append(esc(loan.getMemberName())).append("</strong> UNDER LOAN ACCOUNT <strong>").append(esc(loan.getLoanId())).append("</strong>, I/WE HEREBY DECLARE AND UNDERTAKE:</div>\n");

		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>GUARANTOR NAME</th><td>").append(esc(loan.getGuarantorIdentity())).append("</td><th>GUARANTOR MEMBER ID</th><td>").append(esc(loan.getGuarantorMemberId())).append("</td></tr>\n");
		sb.append("<tr><th>BORROWER NAME</th><td>").append(esc(loan.getMemberName())).append("</td><th>LOAN ACCOUNT ID</th><td>").append(esc(loan.getLoanId())).append("</td></tr>\n");
		sb.append("<tr><th>SANCTIONED AMOUNT</th><td>").append(formatCurrency(loan.getLoanAmount())).append("</td><th>REPAYMENT TENURE</th><td>").append(esc(loan.getLoanTerm())).append(" MONTHS</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\">1. I/WE GUARANTEE THE PROMPT PAYMENT OF PRINCIPAL, INTEREST, AND CHARGES ACCRUED ON THE AFORESAID LOAN ACCOUNT.</div>\n");
		sb.append("<div class=\"clause\">2. MY/OUR LIABILITY SHALL BE JOINT AND SEVERAL WITH THE BORROWER AND CONTINUOUS UNTIL THE ENTIRE OUTSTANDING IS LIQUIDATED IN FULL.</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>GUARANTOR SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>BORROWER SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>AUTHORIZED SIGNATORY</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderNoc(StringBuilder sb, LoanApplication loan, String companyName) {
		sb.append("<div class=\"doc-title\">NO OBJECTION CERTIFICATE (NOC) / LOAN CLEARANCE</div>\n");
		sb.append("<div class=\"clause\">DATE: <strong>").append(LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))).append("</strong></div>\n");
		sb.append("<div class=\"clause\">TO WHOMSOEVER IT MAY CONCERN</div>\n");
		sb.append("<div class=\"clause\">THIS IS TO CERTIFY THAT THE LOAN ACCOUNT WITH THE PARTICULARS OUTLINED BELOW HAS BEEN FULLY SETTLED, CLOSED, AND SATISFIED IN THE RECORDS OF <strong>").append(companyName).append("</strong>:</div>\n");

		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>LOAN ACCOUNT ID</th><td><strong>").append(esc(loan.getLoanId())).append("</strong></td><th>MEMBER CODE</th><td>").append(esc(loan.getMemberId())).append("</td></tr>\n");
		sb.append("<tr><th>BORROWER NAME</th><td>").append(esc(loan.getMemberName())).append("</td><th>CONTACT NUMBER</th><td>").append(esc(loan.getContactNo())).append("</td></tr>\n");
		sb.append("<tr><th>ORIGINAL PRINCIPAL</th><td>").append(formatCurrency(loan.getLoanAmount())).append("</td><th>LOAN PRODUCT</th><td>").append(esc(loan.getLoanPlanName())).append("</td></tr>\n");
		sb.append("<tr><th>ACCOUNT STATUS</th><td colspan=\"3\"><strong style=\"color:#198754;\">FULLY CLOSED &amp; LIQUIDATED (NIL OUTSTANDING)</strong></td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\">THERE ARE NO FURTHER DUES, LIENS, CHARGES, OR LIABILITIES OUTSTANDING AGAINST THE BORROWER OR GUARANTORS UNDER THIS LOAN ACCOUNT AS OF DATE.</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>VERIFIED BY ACCOUNTS</td>\n");
		sb.append("<td></td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>BRANCH MANAGER / AUTHORIZED SIGNATORY</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	public byte[] generateDocumentPdf(String loanId, String docType) throws Exception {
		String html = generateDocumentHtml(loanId, docType);
		ITextRenderer renderer = new ITextRenderer();
		renderer.setDocumentFromString(html);
		renderer.layout();

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		renderer.createPDF(baos);
		baos.flush();

		recordDocumentLog(loanId, docType);
		return baos.toByteArray();
	}
}
