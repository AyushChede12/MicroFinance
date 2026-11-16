package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.partialMaturityPayment;

@Repository
public interface PartialMaturitypaymentRepo extends JpaRepository<partialMaturityPayment, Long> {

	partialMaturityPayment findByPolicyCode(String policyCode);

	List<partialMaturityPayment> findByApproveStatusTrue();

	List<partialMaturityPayment> findByApproveBranchIgnoreCase(String approveBranch);

	@Query("SELECT p FROM partialMaturityPayment p WHERE (:branchName IS NULL OR :branchName = '' OR LOWER(p.approveBranch) = LOWER(:branchName)) AND (:fromDate IS NULL OR :fromDate = '' OR CAST(p.closingDate AS string) >= :fromDate OR p.maturityDate >= :fromDate) AND (:toDate IS NULL OR :toDate = '' OR CAST(p.closingDate AS string) <= :toDate OR p.maturityDate <= :toDate)")
	List<partialMaturityPayment> findByBranchAndDate(@Param("branchName") String branchName,
			@Param("fromDate") String fromDate, @Param("toDate") String toDate);
}
