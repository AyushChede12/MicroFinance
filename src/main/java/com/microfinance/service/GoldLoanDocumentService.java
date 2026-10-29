package com.microfinance.service;

import java.io.ByteArrayOutputStream;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
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

import com.microfinance.model.ApplyForGold;
import com.microfinance.model.CompanyAdministration;
import com.microfinance.repository.ApplyForGoldRepo;
import com.microfinance.repository.CompanyAdministrationRepo;

@Service
public class GoldLoanDocumentService {

	private static final Logger logger = LoggerFactory.getLogger(GoldLoanDocumentService.class);

	@Autowired
	private ApplyForGoldRepo applyForGoldRepo;

	@Autowired(required = false)
	private CompanyAdministrationRepo companyAdministrationRepo;

	private final Map<String, List<Map<String, Object>>> documentLogs = new ConcurrentHashMap<>();

	public List<String> getPrintableGoldLoanIds() {
		try {
			List<String> ids = applyForGoldRepo.findAllDistinctGoldIds();
			if (ids != null && !ids.isEmpty()) {
				return ids;
			}
		} catch (Exception e) {
			logger.warn("Could not query distinct gold IDs: {}", e.getMessage());
		}
		List<ApplyForGold> all = applyForGoldRepo.findAll();
		List<String> result = new ArrayList<>();
		for (ApplyForGold g : all) {
			if (g.getGoldID() != null && !g.getGoldID().trim().isEmpty() && !result.contains(g.getGoldID().trim())) {
				result.add(g.getGoldID().trim());
			}
		}
		return result;
	}

	public ApplyForGold getGoldLoan(String goldId) {
		if (goldId == null || goldId.trim().isEmpty()) {
			return null;
		}
		ApplyForGold gold = applyForGoldRepo.findSingleByGoldID(goldId.trim());
		if (gold != null) {
			return gold;
		}
		List<ApplyForGold> list = applyForGoldRepo.findByGoldID(goldId.trim());
		return (list != null && !list.isEmpty()) ? list.get(0) : null;
	}

	public List<Map<String, Object>> getAvailableDocuments(String goldId) {
		List<Map<String, Object>> list = new ArrayList<>();
		list.add(createDocMeta("APPLICANT_FORM", "APPLICANT FORM", true, ""));
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

	public List<Map<String, Object>> getDocumentLogs(String goldId) {
		return documentLogs.getOrDefault(goldId, Collections.emptyList());
	}

	public void recordDocumentLog(String goldId, String docType) {
		Map<String, Object> log = new HashMap<>();
		log.put("goldId", goldId);
		log.put("documentType", docType);
		log.put("documentName", docType.replace('_', ' '));
		log.put("generatedAt", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		log.put("generatedByUserId", "ADMIN");
		log.put("fileReference", docType + "_" + goldId + "_" + System.currentTimeMillis() + ".pdf");

		documentLogs.computeIfAbsent(goldId, k -> new ArrayList<>()).add(0, log);
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
		if (str == null || str.trim().isEmpty()) return "--";
		return str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").trim();
	}

	private String formatCurrency(String val) {
		try {
			double num = Double.parseDouble(val);
			NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));
			return nf.format(num);
		} catch (Exception e) {
			return "\u20B9 " + esc(val);
		}
	}

	public String generateDocumentHtml(String goldId, String docType) {
		ApplyForGold gold = getGoldLoan(goldId);
		if (gold == null) {
			return "<div class=\"alert alert-danger\">GOLD LOAN NOT FOUND FOR ID: " + esc(goldId) + "</div>";
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
		sb.append("body { font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.4; color: #111; margin: 0; padding: 12px; }\n");
		sb.append(".header { text-align: center; border-bottom: 2px solid #0d6efd; padding-bottom: 8px; margin-bottom: 14px; }\n");
		sb.append(".company-name { font-size: 16pt; font-weight: bold; color: #0d6efd; text-transform: uppercase; margin: 0 0 3px 0; }\n");
		sb.append(".company-meta { font-size: 8.5pt; color: #555; margin: 2px 0; }\n");
		sb.append(".doc-title { text-align: center; font-size: 13pt; font-weight: bold; color: #222; text-decoration: underline; margin: 12px 0 16px 0; text-transform: uppercase; }\n");
		sb.append(".table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }\n");
		sb.append(".table th, .table td { border: 1px solid #ccc; padding: 5px 8px; font-size: 9pt; text-align: left; }\n");
		sb.append(".table th { background-color: #f1f5f9; font-weight: bold; width: 25%; color: #333; text-transform: uppercase; }\n");
		sb.append(".sign-table { width: 100%; margin-top: 35px; page-break-inside: avoid; border: none; }\n");
		sb.append(".sign-table td { width: 33.33%; text-align: center; font-size: 8.5pt; vertical-align: bottom; border: none; padding-top: 35px; }\n");
		sb.append(".sign-line { border-top: 1px solid #444; margin: 0 15px 4px 15px; }\n");
		sb.append(".clause { margin: 6px 0; font-size: 9pt; color: #333; text-align: justify; }\n");
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
		sb.append("  <div class=\"company-meta\" style=\"font-weight:bold; color:#333;\">BRANCH: ").append(esc(gold.getBranchName())).append("</div>\n");
		sb.append("</div>\n");

		String normDoc = docType != null ? docType.toUpperCase().replace('-', '_') : "SANCTION_LETTER";

		switch (normDoc) {
			case "APPLICANTFORM":
			case "APPLICANT_FORM":
			case "APPLICANT_FROM":
				renderApplicantForm(sb, gold, companyName);
				break;
			case "SANCTIONLETTER":
			case "SANCTION_LETTER":
				renderSanctionLetter(sb, gold, companyName);
				break;
			case "LOANAGREEMENT":
			case "LOAN_AGREEMENT":
				renderLoanAgreement(sb, gold, companyName);
				break;
			case "REPAYMENTSCHEDULE":
			case "REPAYMENT_SCHEDULE":
				renderRepaymentSchedule(sb, gold, companyName);
				break;
			case "DISBURSEMENTRECEIPT":
			case "DISBURSEMENT_RECEIPT":
				renderDisbursementReceipt(sb, gold, companyName);
				break;
			case "GUARANTORDECLARATION":
			case "GUARANTOR_DECLARATION":
				renderGuarantorDeclaration(sb, gold, companyName);
				break;
			case "NOC":
				renderNoc(sb, gold, companyName);
				break;
			default:
				renderSanctionLetter(sb, gold, companyName);
				break;
		}

		sb.append("</body>\n</html>\n");
		return sb.toString();
	}

	private void renderApplicantForm(StringBuilder sb, ApplyForGold gold, String companyName) {
		sb.append("<div class=\"doc-title\">SECURED GOLD LOAN APPLICATION FORM</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>GOLD LOAN ID</th><td><strong>").append(esc(gold.getGoldID())).append("</strong></td><th>APPLICATION DATE</th><td>").append(esc(gold.getLoanDate())).append("</td></tr>\n");
		sb.append("<tr><th>MEMBER CODE</th><td>").append(esc(gold.getMemberCode())).append("</td><th>APPLICANT NAME</th><td>").append(esc(gold.getCustomerName())).append("</td></tr>\n");
		sb.append("<tr><th>DOB / AGE</th><td>").append(esc(gold.getDateOfBirth())).append(" (").append(esc(gold.getAge())).append(" YRS)</td><th>CONTACT NUMBER</th><td>").append(esc(gold.getContactNo())).append("</td></tr>\n");
		sb.append("<tr><th>ADDRESS</th><td>").append(esc(gold.getAddress())).append("</td><th>PIN CODE</th><td>").append(esc(gold.getPinCode())).append("</td></tr>\n");
		sb.append("<tr><th>BRANCH NAME</th><td>").append(esc(gold.getBranchName())).append("</td><th>PLAN NAME</th><td>").append(esc(gold.getLoanPlanName())).append("</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div style=\"font-weight:bold; margin:10px 0 4px 0; text-transform:uppercase;\">LOAN TERMS &amp; FINANCIALS</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>LOAN AMOUNT</th><td>").append(formatCurrency(gold.getLoanAmount())).append("</td><th>RATE OF INTEREST</th><td>").append(esc(gold.getRateOfInterest())).append(" % P.A.</td></tr>\n");
		sb.append("<tr><th>LOAN TERM</th><td>").append(esc(gold.getLoanTerm())).append(" MONTHS</td><th>INTEREST TYPE</th><td>").append(esc(gold.getInterestType())).append("</td></tr>\n");
		sb.append("<tr><th>REPAYMENT MODE</th><td>").append(esc(gold.getLoanMode())).append("</td><th>MONTHLY EMI</th><td>").append(formatCurrency(gold.getEmiPayment())).append("</td></tr>\n");
		sb.append("<tr><th>PURPOSE OF LOAN</th><td colspan=\"3\">").append(esc(gold.getPurposeOfLoan())).append("</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div style=\"font-weight:bold; margin:10px 0 4px 0; text-transform:uppercase;\">PLEDGED GOLD ARTICLES VALUATION</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>ITEM TYPE / NAME</th><td>").append(esc(gold.getItemType())).append(" - ").append(esc(gold.getItemName())).append("</td><th>KARAT / PURITY</th><td>").append(esc(gold.getKarat())).append(" / ").append(esc(gold.getPurity())).append("</td></tr>\n");
		sb.append("<tr><th>ITEM QUANTITY</th><td>").append(esc(gold.getItemQty())).append("</td><th>GROSS WEIGHT</th><td>").append(esc(gold.getGrossWt())).append(" GM</td></tr>\n");
		sb.append("<tr><th>STONE WEIGHT</th><td>").append(esc(gold.getStoneWt())).append(" GM</td><th>NET WEIGHT</th><td>").append(esc(gold.getNetWt())).append(" GM</td></tr>\n");
		sb.append("<tr><th>MARKET VALUATION</th><td>").append(formatCurrency(gold.getMarketValuation())).append("</td><th>ELIGIBLE LOAN</th><td>").append(formatCurrency(gold.getEligibleLoan())).append("</td></tr>\n");
		sb.append("<tr><th>LOCKER BRANCH</th><td colspan=\"3\">").append(esc(gold.getLockerBranch())).append("</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>APPLICANT SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>APPRAISER / VALUER</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>AUTHORIZED SIGNATORY</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderSanctionLetter(StringBuilder sb, ApplyForGold gold, String companyName) {
		sb.append("<div class=\"doc-title\">GOLD LOAN SANCTION LETTER</div>\n");
		sb.append("<div class=\"clause\">DATE: <strong>").append(LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))).append("</strong></div>\n");
		sb.append("<div class=\"clause\">TO: <strong>").append(esc(gold.getCustomerName())).append("</strong> (MEMBER CODE: ").append(esc(gold.getMemberCode())).append(")</div>\n");
		sb.append("<div class=\"clause\">REF: SANCTION OF SECURED GOLD LOAN FACILITY - <strong>").append(esc(gold.getGoldID())).append("</strong></div>\n");
		sb.append("<div class=\"clause\">DEAR MEMBER, WE ARE PLEASED TO INFORM YOU THAT YOUR SECURED GOLD LOAN APPLICATION HAS BEEN APPROVED AND SANCTIONED SUBJECT TO THE TERMS BELOW:</div>\n");

		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>GOLD LOAN ID</th><td><strong>").append(esc(gold.getGoldID())).append("</strong></td><th>SANCTION DATE</th><td>").append(esc(gold.getApprovalDate())).append("</td></tr>\n");
		sb.append("<tr><th>LOAN AMOUNT SANCTIONED</th><td><strong>").append(formatCurrency(gold.getLoanAmount())).append("</strong></td><th>NET DISBURSED AMOUNT</th><td>").append(formatCurrency(gold.getSanctionedAmount())).append("</td></tr>\n");
		sb.append("<tr><th>RATE OF INTEREST</th><td>").append(esc(gold.getRateOfInterest())).append(" % P.A.</td><th>INTEREST TYPE</th><td>").append(esc(gold.getInterestType())).append("</td></tr>\n");
		sb.append("<tr><th>TENURE</th><td>").append(esc(gold.getLoanTerm())).append(" MONTHS</td><th>REPAYMENT MODE</th><td>").append(esc(gold.getLoanMode())).append("</td></tr>\n");
		sb.append("<tr><th>MONTHLY EMI</th><td>").append(formatCurrency(gold.getEmiPayment())).append("</td><th>PLEDGED NET WEIGHT</th><td>").append(esc(gold.getNetWt())).append(" GM</td></tr>\n");
		sb.append("<tr><th>SECURITY PLEDGED</th><td colspan=\"3\">").append(esc(gold.getItemName())).append(" (").append(esc(gold.getKarat())).append(", ").append(esc(gold.getItemQty())).append(" PCS)</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\">1. THE PLEDGED GOLD ORNAMENTS WILL BE HELD IN SECURE VAULT CUSTODY AT ").append(esc(gold.getLockerBranch())).append(" BRANCH.</div>\n");
		sb.append("<div class=\"clause\">2. REGULAR EMI MUST BE PAID ON OR BEFORE THE SCHEDULED DUE DATE EACH MONTH.</div>\n");
		sb.append("<div class=\"clause\">3. FAILURE TO PAY INSTALLMENTS MAY ATTRACT PENAL INTEREST AND RECOVERY PROCEEDINGS AS PER SOCIETY BY-LAWS.</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>BORROWER ACCEPTANCE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>LOAN OFFICER</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>BRANCH MANAGER</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderLoanAgreement(StringBuilder sb, ApplyForGold gold, String companyName) {
		sb.append("<div class=\"doc-title\">SECURED GOLD LOAN AGREEMENT</div>\n");
		sb.append("<div class=\"clause\">THIS AGREEMENT IS EXECUTED AT <strong>").append(esc(gold.getBranchName())).append("</strong> ON <strong>").append(LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))).append("</strong> BETWEEN:</div>\n");
		sb.append("<div class=\"clause\">1. <strong>").append(companyName).append("</strong>, HEREINAFTER REFERRED TO AS THE \"LENDER\" / \"SOCIETY\", AND</div>\n");
		sb.append("<div class=\"clause\">2. <strong>").append(esc(gold.getCustomerName())).append("</strong> (MEMBER CODE: ").append(esc(gold.getMemberCode())).append("), RESIDING AT ").append(esc(gold.getAddress())).append(", HEREINAFTER REFERRED TO AS THE \"BORROWER\".</div>\n");

		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>GOLD LOAN ID</th><td>").append(esc(gold.getGoldID())).append("</td><th>LOAN AMOUNT</th><td>").append(formatCurrency(gold.getLoanAmount())).append("</td></tr>\n");
		sb.append("<tr><th>INTEREST RATE</th><td>").append(esc(gold.getRateOfInterest())).append(" % P.A.</td><th>TENURE</th><td>").append(esc(gold.getLoanTerm())).append(" MONTHS</td></tr>\n");
		sb.append("<tr><th>PLEDGED ITEM</th><td>").append(esc(gold.getItemName())).append(" (").append(esc(gold.getKarat())).append(")</td><th>NET WEIGHT</th><td>").append(esc(gold.getNetWt())).append(" GM</td></tr>\n");
		sb.append("<tr><th>VALUATION</th><td>").append(formatCurrency(gold.getMarketValuation())).append("</td><th>LOCKER BRANCH</th><td>").append(esc(gold.getLockerBranch())).append("</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\"><strong>TERMS AND CONDITIONS:</strong></div>\n");
		sb.append("<div class=\"clause\">1. <strong>PLEDGE OF GOLD:</strong> THE BORROWER HEREBY PLEDGES THE SPECIFIED GOLD ORNAMENTS AS COLLATERAL SECURITY AGAINST THE ADVANCE.</div>\n");
		sb.append("<div class=\"clause\">2. <strong>REPAYMENT:</strong> THE BORROWER AGREES TO REPAY THE LOAN IN MONTHLY INSTALLMENTS OF ").append(formatCurrency(gold.getEmiPayment())).append(".</div>\n");
		sb.append("<div class=\"clause\">3. <strong>AUCTION ON DEFAULT:</strong> IF THE BORROWER FAILS TO REPAY THE OUTSTANDING AMOUNT DESPITE STATUTORY NOTICES, THE SOCIETY SHALL HAVE THE LEGAL RIGHT TO AUCTION THE PLEDGED GOLD IN ACCORDANCE WITH APPLICABLE LAWS.</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>BORROWER SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>WITNESS SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>AUTHORIZED SIGNATORY</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderRepaymentSchedule(StringBuilder sb, ApplyForGold gold, String companyName) {
		sb.append("<div class=\"doc-title\">SECURED GOLD LOAN REPAYMENT SCHEDULE</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>GOLD LOAN ID</th><td><strong>").append(esc(gold.getGoldID())).append("</strong></td><th>MEMBER NAME</th><td>").append(esc(gold.getCustomerName())).append("</td></tr>\n");
		sb.append("<tr><th>PRINCIPAL AMOUNT</th><td>").append(formatCurrency(gold.getLoanAmount())).append("</td><th>INTEREST RATE</th><td>").append(esc(gold.getRateOfInterest())).append(" % P.A. (").append(esc(gold.getInterestType())).append(")</td></tr>\n");
		sb.append("<tr><th>MONTHLY EMI</th><td>").append(formatCurrency(gold.getEmiPayment())).append("</td><th>TENURE</th><td>").append(esc(gold.getLoanTerm())).append(" MONTHS</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div style=\"font-weight:bold; margin:10px 0 4px 0; text-transform:uppercase;\">AMORTIZATION CHART</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>INST NO</th><th>DUE DATE</th><th>EMI AMOUNT</th><th>PRINCIPAL</th><th>INTEREST</th><th>OUTSTANDING</th></tr>\n");

		double principal = 0.0;
		double emi = 0.0;
		int tenure = 12;
		double roi = 12.0;
		try { principal = Double.parseDouble(gold.getLoanAmount()); } catch (Exception ignored) {}
		try { emi = Double.parseDouble(gold.getEmiPayment()); } catch (Exception ignored) {}
		try { tenure = Integer.parseInt(gold.getLoanTerm()); } catch (Exception ignored) {}
		try { roi = Double.parseDouble(gold.getRateOfInterest()); } catch (Exception ignored) {}

		double monthlyRate = (roi / 12.0) / 100.0;
		double balance = principal;
		LocalDate startDate = LocalDate.now();
		try {
			if (gold.getLoanDate() != null && !gold.getLoanDate().trim().isEmpty()) {
				startDate = LocalDate.parse(gold.getLoanDate().trim());
			}
		} catch (Exception ignored) {}

		int displayInst = Math.min(tenure, 36);
		for (int i = 1; i <= displayInst; i++) {
			LocalDate dueDate = startDate.plusMonths(i);
			double interestPart = balance * monthlyRate;
			double principalPart = emi - interestPart;
			if (principalPart > balance || i == tenure) {
				principalPart = balance;
				emi = principalPart + interestPart;
				balance = 0.0;
			} else {
				balance -= principalPart;
			}
			sb.append("<tr>")
			  .append("<td>").append(i).append("</td>")
			  .append("<td>").append(dueDate.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))).append("</td>")
			  .append("<td>").append(formatCurrency(String.valueOf(emi))).append("</td>")
			  .append("<td>").append(formatCurrency(String.valueOf(principalPart))).append("</td>")
			  .append("<td>").append(formatCurrency(String.valueOf(interestPart))).append("</td>")
			  .append("<td>").append(formatCurrency(String.valueOf(Math.max(0.0, balance)))).append("</td>")
			  .append("</tr>\n");
			if (balance <= 0) break;
		}

		sb.append("</table>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>BORROWER SIGNATURE</td>\n");
		sb.append("<td></td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>BRANCH ACCOUNTS</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderDisbursementReceipt(StringBuilder sb, ApplyForGold gold, String companyName) {
		sb.append("<div class=\"doc-title\">GOLD LOAN DISBURSEMENT RECEIPT</div>\n");
		sb.append("<div class=\"clause\">DATE: <strong>").append(LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))).append("</strong></div>\n");

		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>GOLD LOAN ID</th><td><strong>").append(esc(gold.getGoldID())).append("</strong></td><th>DISBURSEMENT DATE</th><td>").append(esc(gold.getApprovalDate())).append("</td></tr>\n");
		sb.append("<tr><th>BORROWER NAME</th><td>").append(esc(gold.getCustomerName())).append("</td><th>MEMBER CODE</th><td>").append(esc(gold.getMemberCode())).append("</td></tr>\n");
		sb.append("<tr><th>BRANCH NAME</th><td>").append(esc(gold.getBranchName())).append("</td><th>CONTACT NUMBER</th><td>").append(esc(gold.getContactNo())).append("</td></tr>\n");
		sb.append("<tr><th>GROSS SANCTIONED LOAN</th><td colspan=\"3\"><strong>").append(formatCurrency(gold.getLoanAmount())).append("</strong></td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div style=\"font-weight:bold; margin:10px 0 4px 0; text-transform:uppercase;\">DEDUCTIONS BREAKUP</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>PROCESSING FEE</th><td>").append(formatCurrency(gold.getProcessingFee())).append("</td><th>LEGAL CHARGES</th><td>").append(formatCurrency(gold.getLegalCharges())).append("</td></tr>\n");
		sb.append("<tr><th>GST</th><td>").append(formatCurrency(gold.getGst())).append("</td><th>STAMP DUTY</th><td>").append(formatCurrency(gold.getStampDuty())).append("</td></tr>\n");
		sb.append("<tr><th>VALUATION FEES</th><td>").append(formatCurrency(gold.getValuationFees())).append("</td><th>INSURANCE FEE</th><td>").append(formatCurrency(gold.getInsuFee())).append("</td></tr>\n");
		sb.append("<tr><th>NET DISBURSED AMOUNT</th><td colspan=\"3\"><strong style=\"color:#0d6efd; font-size:11pt;\">").append(formatCurrency(gold.getSanctionedAmount())).append("</strong></td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\">RECEIVED THE SUM OF ").append(formatCurrency(gold.getSanctionedAmount())).append(" AS NET PROCEEDS OF SECURED GOLD LOAN ").append(esc(gold.getGoldID())).append(".</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>BORROWER SIGNATURE (RECEIVER)</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>CASHIER / ACCOUNTS</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>BRANCH MANAGER</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderGuarantorDeclaration(StringBuilder sb, ApplyForGold gold, String companyName) {
		sb.append("<div class=\"doc-title\">GUARANTOR DEED OF GUARANTEE &amp; DECLARATION</div>\n");
		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>GUARANTOR CODE</th><td>").append(esc(gold.getGuarantorcustomerCode())).append("</td><th>GUARANTOR IDENTITY</th><td>").append(esc(gold.getGuarantorIdentity())).append("</td></tr>\n");
		sb.append("<tr><th>BORROWER NAME</th><td>").append(esc(gold.getCustomerName())).append("</td><th>GOLD LOAN ID</th><td>").append(esc(gold.getGoldID())).append("</td></tr>\n");
		sb.append("<tr><th>SANCTIONED AMOUNT</th><td>").append(formatCurrency(gold.getLoanAmount())).append("</td><th>TENURE</th><td>").append(esc(gold.getLoanTerm())).append(" MONTHS</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\">1. I/WE HEREBY IRREVOCABLY GUARANTEE THE PROMPT PAYMENT AND RECOVERY OF PRINCIPAL, INTEREST, AND ALL INCIDENTAL CHARGES UNDER GOLD LOAN ACCOUNT ").append(esc(gold.getGoldID())).append(".</div>\n");
		sb.append("<div class=\"clause\">2. MY/OUR LIABILITY SHALL BE JOINT AND SEVERAL WITH THE BORROWER AND ENFORCEABLE UNTIL THE OUTSTANDING IS FULLY SETTLED.</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>GUARANTOR SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>BORROWER SIGNATURE</td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>AUTHORIZED SIGNATORY</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	private void renderNoc(StringBuilder sb, ApplyForGold gold, String companyName) {
		sb.append("<div class=\"doc-title\">NO OBJECTION CERTIFICATE (NOC) / GOLD LOAN CLEARANCE</div>\n");
		sb.append("<div class=\"clause\">DATE: <strong>").append(LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))).append("</strong></div>\n");
		sb.append("<div class=\"clause\">TO WHOMSOEVER IT MAY CONCERN</div>\n");
		sb.append("<div class=\"clause\">THIS IS TO CERTIFY THAT SECURED GOLD LOAN ACCOUNT <strong>").append(esc(gold.getGoldID())).append("</strong> HAS BEEN FULLY SETTLED, CLOSED, AND SATISFIED IN THE RECORDS OF <strong>").append(companyName).append("</strong>.</div>\n");

		sb.append("<table class=\"table\">\n");
		sb.append("<tr><th>GOLD LOAN ID</th><td><strong>").append(esc(gold.getGoldID())).append("</strong></td><th>MEMBER CODE</th><td>").append(esc(gold.getMemberCode())).append("</td></tr>\n");
		sb.append("<tr><th>BORROWER NAME</th><td>").append(esc(gold.getCustomerName())).append("</td><th>CONTACT NUMBER</th><td>").append(esc(gold.getContactNo())).append("</td></tr>\n");
		sb.append("<tr><th>ORIGINAL SANCTION</th><td>").append(formatCurrency(gold.getLoanAmount())).append("</td><th>STATUS</th><td><strong style=\"color:#198754;\">FULLY CLOSED (NIL OUTSTANDING)</strong></td></tr>\n");
		sb.append("<tr><th>PLEDGED ARTICLES</th><td colspan=\"3\">").append(esc(gold.getItemName())).append(" (").append(esc(gold.getKarat())).append(", NET WT: ").append(esc(gold.getNetWt())).append(" GM) RETURNED IN ORIGINAL CONDITION.</td></tr>\n");
		sb.append("</table>\n");

		sb.append("<div class=\"clause\">ALL LIENS, PLEDGES, AND CHARGES OVER THE GOLD ARTICLES AND BORROWER ACCOUNT ARE HEREBY FULLY RELEASED AND DISCHARGED.</div>\n");

		sb.append("<table class=\"sign-table\">\n");
		sb.append("<tr>\n");
		sb.append("<td><div class=\"sign-line\"></div>VERIFIED BY ACCOUNTS</td>\n");
		sb.append("<td></td>\n");
		sb.append("<td><div class=\"sign-line\"></div>FOR ").append(companyName).append("<br/>BRANCH MANAGER / AUTHORIZED SIGNATORY</td>\n");
		sb.append("</tr>\n");
		sb.append("</table>\n");
	}

	public byte[] generateDocumentPdf(String goldId, String docType) throws Exception {
		String html = generateDocumentHtml(goldId, docType);
		ITextRenderer renderer = new ITextRenderer();
		renderer.setDocumentFromString(html);
		renderer.layout();

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		renderer.createPDF(baos);
		baos.flush();

		recordDocumentLog(goldId, docType);
		return baos.toByteArray();
	}
}
