package com.microfinance.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.ApplyForMaturity;

@Repository
public interface ApplyForMaturityRepo extends JpaRepository<ApplyForMaturity, Long> {

	@Query("SELECT a FROM ApplyForMaturity a WHERE (:branchName IS NULL OR :branchName = '' OR LOWER(a.branchName) = LOWER(:branchName)) AND (:fromDate IS NULL OR :fromDate = '' OR a.maturityDate >= :fromDate) AND (:toDate IS NULL OR :toDate = '' OR a.maturityDate <= :toDate)")
	List<ApplyForMaturity> findByBranchToDateFromDate(@Param("branchName") String branchName,
			@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query("SELECT a FROM ApplyForMaturity a ORDER BY a.id DESC")
	Page<ApplyForMaturity> findWithPage(Pageable pageable);

	List<ApplyForMaturity> findByBranchNameIgnoreCase(String branchName);

	List<ApplyForMaturity> findByIsApprovedTrue();

	List<ApplyForMaturity> findByPolicyCode(String policyCode);
}
