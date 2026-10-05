package com.microfinance.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.DailyPremiumRenewalPM;

@Repository

public interface DailyPremiumRenewalRepo extends JpaRepository<DailyPremiumRenewalPM, Long> {

	List<DailyPremiumRenewalPM> findByIsApprovedFalse();

	List<DailyPremiumRenewalPM> findByPolicyCode(String policyCode);

	List<DailyPremiumRenewalPM> findByIsApprovedTrue();

	// Optional<DailyPremiumRenewalPM> findByPolicyCode(String policyCode);

	@Query("SELECT COALESCE(SUM(CAST(d.fees AS double)), 0) " + "FROM DailyPremiumRenewalPM d "
			+ "WHERE d.branchname = :branchName " + "AND d.renewalDate BETWEEN :startDate AND :endDate "
			+ "AND d.isApproved = true")
	Double getTotalDailyRenewalIncome(@Param("branchName") String branchName, @Param("startDate") String startDate,
			@Param("endDate") String endDate);

}
