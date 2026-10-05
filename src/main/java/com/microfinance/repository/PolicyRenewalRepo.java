
package com.microfinance.repository;

import java.util.Optional;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.PolicyRenewal;

@Repository
public interface PolicyRenewalRepo extends JpaRepository<PolicyRenewal, Long> {

	List<PolicyRenewal> findByPolicyCode(String policyCode);

	List<PolicyRenewal> findByIsApprovedFalse();

	List<PolicyRenewal> findByIsApprovedTrue();

	@Query("SELECT COALESCE(SUM(CAST(p.fees AS double)), 0) " + "FROM PolicyRenewal p "
			+ "WHERE p.branchname = :branchName " + "AND p.renewalDate BETWEEN :startDate AND :endDate "
			+ "AND p.isApproved = true")
	Double getTotalPolicyFees(@Param("branchName") String branchName, @Param("startDate") String startDate,
			@Param("endDate") String endDate);

}
