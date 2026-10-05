package com.microfinance.repository;

import java.time.LocalDate;
import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import com.microfinance.model.FlexibleRenewal;
import com.microfinance.model.FlexiblepremiumrenewalPM;

@EnableJpaRepositories
public interface FlexibleRenewalRepo extends JpaRepository<FlexibleRenewal, Long> {

	List<FlexibleRenewal> findByIsApprovedFalse();

	List<FlexibleRenewal> findByPolicyCode(String policyCode);

	List<FlexibleRenewal> findByIsApprovedTrue();

	@Query("SELECT COALESCE(SUM(CAST(NULLIF(f.fees, '') AS double)), 0) " + "FROM FlexibleRenewal f "
			+ "WHERE f.branchname = :branchName " + "AND f.renewalDate BETWEEN :startDate AND :endDate "
			+ "AND f.isApproved = true")
	Double getTotalFlexibleRenewalIncome(@Param("branchName") String branchName, @Param("startDate") String startDate,
			@Param("endDate") String endDate);

}
