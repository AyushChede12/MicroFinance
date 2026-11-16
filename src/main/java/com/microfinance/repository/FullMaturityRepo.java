package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.FullMaturity;

@Repository
public interface FullMaturityRepo extends JpaRepository<FullMaturity, Long> {

	List<FullMaturity> findByPolicyCodeIgnoreCase(String policyCode);

	List<FullMaturity> findByApproveStatusTrue();

	List<FullMaturity> findByBranchNameIgnoreCase(String branchName);

	@Query("SELECT a FROM FullMaturity a WHERE a.policyCode LIKE 'RD%'")
	List<FullMaturity> getRDFromFullMaturity();

	@Query("SELECT f FROM FullMaturity f WHERE (:branchName IS NULL OR :branchName = '' OR LOWER(f.branchName) = LOWER(:branchName) OR LOWER(f.approveBranch) = LOWER(:branchName)) AND (:fromDate IS NULL OR :fromDate = '' OR f.paymentDate >= :fromDate OR f.maturityDate >= :fromDate) AND (:toDate IS NULL OR :toDate = '' OR f.paymentDate <= :toDate OR f.maturityDate <= :toDate)")
	List<FullMaturity> findByBranchAndDate(@Param("branchName") String branchName,
			@Param("fromDate") String fromDate, @Param("toDate") String toDate);
}
