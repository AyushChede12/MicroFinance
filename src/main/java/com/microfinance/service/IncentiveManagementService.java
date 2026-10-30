package com.microfinance.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microfinance.dto.IncentiveRequest;
import com.microfinance.model.BranchModule;
import com.microfinance.model.GenerateIncentivePayments;
import com.microfinance.model.IncentivePayment;
import com.microfinance.model.IncentiveSchemeMaster;
import com.microfinance.model.TeamMember;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.GenerateIncentivePaymentsRepo;
import com.microfinance.repository.IncentiveRepo;
import com.microfinance.repository.IncentiveSchemeMasterRepo;
import com.microfinance.repository.TeamMemberRepo;

@Service
public class IncentiveManagementService {

	@Autowired
	private IncentiveSchemeMasterRepo incentiveschemerepo;

	@Autowired
	private GenerateIncentivePaymentsRepo generateIncentivePaymentsRepo;

	@Autowired
	private TeamMemberRepo teamMemberRepo;

	@Autowired
	private BranchModuleRepo branchmodulRepo;

	@Autowired
	private IncentiveRepo incentiveRepo;

	@Autowired
	private AccountManagementService accountManagementService;

	// =========================================================
	// 1. INCENTIVE SCHEME MASTER
	// =========================================================

	public IncentiveSchemeMaster saveIncentive(IncentiveSchemeMaster incentive) {
		if (incentive == null) {
			return null;
		}
		if (incentive.getIncentiveMonth() != null) {
			incentive.setIncentiveMonth(incentive.getIncentiveMonth().trim().toUpperCase());
		}
		if (incentive.getComments() != null) {
			incentive.setComments(incentive.getComments().trim().toUpperCase());
		}
		return incentiveschemerepo.save(incentive);
	}

	public List<IncentiveSchemeMaster> getAllIncentives() {
		return incentiveschemerepo.findAllByOrderByIdDesc();
	}

	public IncentiveSchemeMaster getIncentiveById(Long id) {
		if (id == null) return null;
		return incentiveschemerepo.findById(id).orElse(null);
	}

	public IncentiveSchemeMaster updateIncentive(IncentiveSchemeMaster incentive) {
		if (incentive == null || incentive.getId() == 0) {
			return null;
		}
		Optional<IncentiveSchemeMaster> existing = incentiveschemerepo.findById(incentive.getId());
		if (existing.isPresent()) {
			IncentiveSchemeMaster master = existing.get();
			master.setIncentiveMonth(incentive.getIncentiveMonth() != null ? incentive.getIncentiveMonth().toUpperCase() : master.getIncentiveMonth());
			master.setDateFrom(incentive.getDateFrom());
			master.setDateTo(incentive.getDateTo());
			master.setComments(incentive.getComments() != null ? incentive.getComments().toUpperCase() : master.getComments());
			return incentiveschemerepo.save(master);
		}
		return null;
	}

	public boolean deleteIncentiveById(Long id) {
		if (id != null && incentiveschemerepo.existsById(id)) {
			incentiveschemerepo.deleteById(id);
			return true;
		}
		return false;
	}

	// =========================================================
	// 2. MASTER LOOKUPS
	// =========================================================

	public List<TeamMember> getAllTeamMember() {
		return teamMemberRepo.findAll();
	}

	public List<BranchModule> getAllBranchModules() {
		return branchmodulRepo.findAll();
	}

	public boolean saveIncentivePayment(GenerateIncentivePayments incentivepayment) {
		try {
			generateIncentivePaymentsRepo.save(incentivepayment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	// =========================================================
	// 3. GENERATE INCENTIVE PAYMENTS
	// =========================================================

	@Transactional
	public List<GenerateIncentivePayments> generateIncentives(String teamCode, String incentiveMonth, String dateFrom, String dateTo) {
		List<GenerateIncentivePayments> resultList = new ArrayList<>();

		int monthNum = parseMonth(incentiveMonth);
		String standardMonthName = getMonthName(monthNum);
		int yearNum = parseYear(dateFrom);
		String today = LocalDate.now().toString();

		List<TeamMember> targetMembers = new ArrayList<>();
		if (teamCode != null && !teamCode.trim().isEmpty() && !teamCode.equalsIgnoreCase("ALL") && !teamCode.equalsIgnoreCase("-- ALL TEAM MEMBERS --")) {
			TeamMember tm = teamMemberRepo.findByTeamMemberCode(teamCode.trim().toUpperCase());
			if (tm != null) {
				targetMembers.add(tm);
			}
		} else {
			targetMembers = teamMemberRepo.findAll();
		}

		for (TeamMember tm : targetMembers) {
			if (tm == null || tm.getTeamMemberCode() == null) continue;

			IncentiveRequest req = new IncentiveRequest();
			req.setTeamMemberCode(tm.getTeamMemberCode());
			req.setMonth(monthNum);
			req.setYear(yearNum);

			double pSalesNum = 0.0;
			double gSalesNum = 0.0;
			double oSalesNum = 0.0;
			double tEarningsNum = 0.0;
			double taxDedNum = 0.0;
			double sDedNum = 0.0;
			double extraAllNum = 1000.0;
			double fPayoutNum = 0.0;

			try {
				Map<String, Object> details = accountManagementService.getFullIncentiveDetails(req);
				if (details != null && !details.isEmpty()) {
					pSalesNum = parseDouble(details.get("personalSales"));
					gSalesNum = parseDouble(details.get("groupSales"));
					oSalesNum = parseDouble(details.get("overallSales"));
					tEarningsNum = parseDouble(details.get("totalEarnings"));
					taxDedNum = parseDouble(details.get("taxDeducted"));
					sDedNum = parseDouble(details.get("serviceDeduction"));
					if (details.get("extraAllowance") != null) {
						extraAllNum = parseDouble(details.get("extraAllowance"));
					}
					fPayoutNum = parseDouble(details.get("finalPayout"));
				}
			} catch (Exception e) {
				oSalesNum = pSalesNum + gSalesNum;
				tEarningsNum = oSalesNum * 0.10;
				taxDedNum = tEarningsNum * 0.05;
				sDedNum = tEarningsNum * 0.02;
				fPayoutNum = tEarningsNum - taxDedNum - sDedNum + extraAllNum;
			}

			String pSales = String.format(Locale.US, "%.2f", pSalesNum);
			String gSales = String.format(Locale.US, "%.2f", gSalesNum);
			String oSales = String.format(Locale.US, "%.2f", oSalesNum);
			String tEarnings = String.format(Locale.US, "%.2f", tEarningsNum);
			String taxDed = String.format(Locale.US, "%.2f", taxDedNum);
			String sDed = String.format(Locale.US, "%.2f", sDedNum);
			String extraAll = String.format(Locale.US, "%.2f", extraAllNum);
			String fPayout = String.format(Locale.US, "%.2f", fPayoutNum);

			Optional<GenerateIncentivePayments> existingOpt = generateIncentivePaymentsRepo.findFirstByTeamCodeAndIncentiveMonth(tm.getTeamMemberCode(), standardMonthName);
			GenerateIncentivePayments gip = existingOpt.orElseGet(GenerateIncentivePayments::new);

			gip.setTeamCode(tm.getTeamMemberCode().toUpperCase());
			gip.setTeamName(tm.getTeamMemberName() != null ? tm.getTeamMemberName().toUpperCase() : "");
			gip.setDesignation(tm.getDesignation() != null ? tm.getDesignation().toUpperCase() : "");
			gip.setIncentiveMonth(standardMonthName);
			gip.setDateFrom(dateFrom != null ? dateFrom : "");
			gip.setDateTo(dateTo != null ? dateTo : "");
			gip.setPersonalSales(pSales);
			gip.setGroupSales(gSales);
			gip.setOverallSales(oSales);
			gip.setTotalEarnings(tEarnings);
			gip.setTaxDeducted(taxDed);
			gip.setServiceDeduction(sDed);
			gip.setExtraAllowance(extraAll);
			gip.setFinalPayout(fPayout);
			gip.setBranchName(tm.getBranchName() != null ? tm.getBranchName().toUpperCase() : "");
			gip.setGeneratedDate(today);

			// Check if already paid in IncentivePayment table
			boolean isPaid = incentiveRepo.existsByAgentCodeAndMonthAndPaymentStatus(tm.getTeamMemberCode(), standardMonthName.toLowerCase(), "PAID")
					|| incentiveRepo.existsByAgentCodeAndMonthAndPaymentStatus(tm.getTeamMemberCode(), standardMonthName, "PAID");
			if (gip.getStatus() == null || !"PAID".equalsIgnoreCase(gip.getStatus())) {
				gip.setStatus(isPaid ? "PAID" : "GENERATED");
			}

			GenerateIncentivePayments saved = generateIncentivePaymentsRepo.save(gip);
			resultList.add(saved);
		}

		return resultList;
	}

	public List<GenerateIncentivePayments> getAllGeneratedPayments() {
		return generateIncentivePaymentsRepo.findAllByOrderByIdDesc();
	}

	// =========================================================
	// 4. INCENTIVE PAYMENT DETAILS & SUMMARY REPORT
	// =========================================================

	public List<GenerateIncentivePayments> getIncentivePaymentDetails(String incentiveMonth, String code) {
		String m = (incentiveMonth != null && !incentiveMonth.trim().isEmpty() && !incentiveMonth.equalsIgnoreCase("ALL"))
				? getMonthName(parseMonth(incentiveMonth)) : null;
		String c = (code != null && !code.trim().isEmpty()) ? code.trim().toUpperCase() : null;

		List<GenerateIncentivePayments> list;
		if (m != null && c != null) {
			list = generateIncentivePaymentsRepo.findByIncentiveMonthAndTeamCodeOrderByIdDesc(m, c);
		} else if (m != null) {
			list = generateIncentivePaymentsRepo.findByIncentiveMonthOrderByIdDesc(m);
		} else if (c != null) {
			list = generateIncentivePaymentsRepo.findByTeamCodeOrderByIdDesc(c);
		} else {
			list = generateIncentivePaymentsRepo.findAllByOrderByIdDesc();
		}

		// Sync status with IncentivePayment table
		for (GenerateIncentivePayments gip : list) {
			if (gip != null && !"PAID".equalsIgnoreCase(gip.getStatus())) {
				boolean isPaid = incentiveRepo.existsByAgentCodeAndMonthAndPaymentStatus(gip.getTeamCode(), gip.getIncentiveMonth().toLowerCase(), "PAID")
						|| incentiveRepo.existsByAgentCodeAndMonthAndPaymentStatus(gip.getTeamCode(), gip.getIncentiveMonth(), "PAID");
				if (isPaid) {
					gip.setStatus("PAID");
					generateIncentivePaymentsRepo.save(gip);
				}
			}
		}

		return list;
	}

	public List<GenerateIncentivePayments> getIncentiveSummaryReport(String incentiveMonth, String branchName, String code) {
		String m = (incentiveMonth != null && !incentiveMonth.trim().isEmpty() && !incentiveMonth.equalsIgnoreCase("ALL"))
				? getMonthName(parseMonth(incentiveMonth)) : null;
		String b = (branchName != null && !branchName.trim().isEmpty() && !branchName.equalsIgnoreCase("ALL") && !branchName.equalsIgnoreCase("SELECT BRANCH"))
				? branchName.trim().toUpperCase() : null;
		String c = (code != null && !code.trim().isEmpty()) ? code.trim().toUpperCase() : null;

		List<GenerateIncentivePayments> list = generateIncentivePaymentsRepo.findAllByOrderByIdDesc();
		List<GenerateIncentivePayments> filtered = new ArrayList<>();

		for (GenerateIncentivePayments item : list) {
			if (m != null && (item.getIncentiveMonth() == null || !item.getIncentiveMonth().equalsIgnoreCase(m))) {
				continue;
			}
			if (b != null && (item.getBranchName() == null || !item.getBranchName().equalsIgnoreCase(b))) {
				continue;
			}
			if (c != null && (item.getTeamCode() == null || !item.getTeamCode().equalsIgnoreCase(c))) {
				continue;
			}
			filtered.add(item);
		}
		return filtered;
	}

	public Map<String, Object> getIncentiveSummaryStats(String incentiveMonth, String branchName, String code) {
		List<GenerateIncentivePayments> list = getIncentiveSummaryReport(incentiveMonth, branchName, code);

		double totalPersonalSales = 0.0;
		double totalGroupSales = 0.0;
		double totalOverallSales = 0.0;
		double totalEarnings = 0.0;
		double totalDeductions = 0.0;
		double totalAllowance = 0.0;
		double totalPayout = 0.0;
		long paidCount = 0;
		long pendingCount = 0;

		for (GenerateIncentivePayments item : list) {
			double ps = parseDouble(item.getPersonalSales());
			double gs = parseDouble(item.getGroupSales());
			double os = parseDouble(item.getOverallSales());
			double te = parseDouble(item.getTotalEarnings());
			double td = parseDouble(item.getTaxDeducted()) + parseDouble(item.getServiceDeduction());
			double ea = parseDouble(item.getExtraAllowance());
			double fp = parseDouble(item.getFinalPayout());

			totalPersonalSales += ps;
			totalGroupSales += gs;
			totalOverallSales += os;
			totalEarnings += te;
			totalDeductions += td;
			totalAllowance += ea;
			totalPayout += fp;

			if ("PAID".equalsIgnoreCase(item.getStatus())) {
				paidCount++;
			} else {
				pendingCount++;
			}
		}

		Map<String, Object> stats = new HashMap<>();
		stats.put("totalMembers", list.size());
		stats.put("totalPersonalSales", String.format(Locale.US, "%.2f", totalPersonalSales));
		stats.put("totalGroupSales", String.format(Locale.US, "%.2f", totalGroupSales));
		stats.put("totalOverallSales", String.format(Locale.US, "%.2f", totalOverallSales));
		stats.put("totalEarnings", String.format(Locale.US, "%.2f", totalEarnings));
		stats.put("totalDeductions", String.format(Locale.US, "%.2f", totalDeductions));
		stats.put("totalAllowance", String.format(Locale.US, "%.2f", totalAllowance));
		stats.put("totalPayout", String.format(Locale.US, "%.2f", totalPayout));
		stats.put("paidCount", paidCount);
		stats.put("pendingCount", pendingCount);

		return stats;
	}

	@Transactional
	public GenerateIncentivePayments payIncentive(Long id, String paymentMode, String paymentBranch, String paymentDate) {
		if (id == null) return null;
		Optional<GenerateIncentivePayments> opt = generateIncentivePaymentsRepo.findById(id);
		if (!opt.isPresent()) return null;

		GenerateIncentivePayments gip = opt.get();
		gip.setStatus("PAID");
		gip.setPaymentMode(paymentMode != null ? paymentMode.toUpperCase() : "CASH");
		gip.setPaymentDate(paymentDate != null ? paymentDate : LocalDate.now().toString());
		if (paymentBranch != null && !paymentBranch.trim().isEmpty()) {
			gip.setBranchName(paymentBranch.toUpperCase());
		}

		return generateIncentivePaymentsRepo.save(gip);
	}

	private double parseDouble(Object obj) {
		if (obj == null) return 0.0;
		try {
			return Double.parseDouble(String.valueOf(obj).trim());
		} catch (Exception e) {
			return 0.0;
		}
	}

	// =========================================================
	// HELPER UTILITIES
	// =========================================================

	public int parseMonth(String monthStr) {
		if (monthStr == null || monthStr.trim().isEmpty()) {
			return LocalDate.now().getMonthValue();
		}
		String m = monthStr.trim().toUpperCase();
		switch (m) {
			case "JANUARY": case "JAN": case "1": case "01": return 1;
			case "FEBRUARY": case "FEB": case "2": case "02": return 2;
			case "MARCH": case "MAR": case "3": case "03": return 3;
			case "APRIL": case "APR": case "4": case "04": return 4;
			case "MAY": case "5": case "05": return 5;
			case "JUNE": case "JUN": case "6": case "06": return 6;
			case "JULY": case "JUL": case "7": case "07": return 7;
			case "AUGUST": case "AUG": case "8": case "08": return 8;
			case "SEPTEMBER": case "SEP": case "9": case "09": return 9;
			case "OCTOBER": case "OCT": case "10": return 10;
			case "NOVEMBER": case "NOV": case "11": return 11;
			case "DECEMBER": case "DEC": case "12": return 12;
			default:
				try {
					return Integer.parseInt(m);
				} catch (Exception e) {
					return LocalDate.now().getMonthValue();
				}
		}
	}

	public String getMonthName(int monthNum) {
		switch (monthNum) {
			case 1: return "JANUARY";
			case 2: return "FEBRUARY";
			case 3: return "MARCH";
			case 4: return "APRIL";
			case 5: return "MAY";
			case 6: return "JUNE";
			case 7: return "JULY";
			case 8: return "AUGUST";
			case 9: return "SEPTEMBER";
			case 10: return "OCTOBER";
			case 11: return "NOVEMBER";
			case 12: return "DECEMBER";
			default: return "JANUARY";
		}
	}

	public int parseYear(String dateStr) {
		if (dateStr != null && dateStr.length() >= 4) {
			try {
				return Integer.parseInt(dateStr.substring(0, 4));
			} catch (Exception ignored) {}
		}
		return LocalDate.now().getYear();
	}

}
