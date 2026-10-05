
package com.microfinance.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.AddnewinvestmentPM;

@Repository
public interface AddInvestmentRepo extends JpaRepository<AddnewinvestmentPM, Long> {

	// @Query("SELECT b.id FROM AddnewinvestmentPM b WHERE b.branchName =
	// :branchName")
	List<AddnewinvestmentPM> findByBranchName(String branchName);

	// List<AddnewinvestmentPM> findDetailsById(String id);

	AddnewinvestmentPM findDetailsById(Long id);

	@Query("select coalesce(max(id), 0) from AddnewinvestmentPM")
	long getMaxId();

	Optional<AddnewinvestmentPM> findByPolicyCode(String policyCode);

	List<AddnewinvestmentPM> findByIsApprovedTrue();

	@Query("SELECT MAX(a.id) FROM AddnewinvestmentPM a")
	Long findMaxId();

	// Custom query to fetch only approved RD policies
	@Query("SELECT a FROM AddnewinvestmentPM a WHERE a.policyCode LIKE 'RD%' AND a.isApproved = true")
	List<AddnewinvestmentPM> findApprovedRDPolicies();

	List<AddnewinvestmentPM> findByBranchNameAndPolicyStartDateBetweenAndIsApprovedFalse(String branchName,
			String fromDate, String toDate);

	List<AddnewinvestmentPM> findByIsApprovedFalse();

	// Custom query to fetch only approved RD policies
	@Query("SELECT a FROM AddnewinvestmentPM a WHERE a.policyCode LIKE 'FD%' AND a.isApproved = true")
	List<AddnewinvestmentPM> findApprovedFDPolicies();

	@Query("SELECT a FROM AddnewinvestmentPM a WHERE a.policyCode LIKE 'DRD%' AND a.isApproved = true")
	List<AddnewinvestmentPM> findApprovedDDPolicies();

	boolean existsByMemberSelection(String customerCode);

	List<AddnewinvestmentPM> findAllByPolicyCode(String policyCode);

	long countByAgentInAndPolicyStartDateContaining(List<String> financialConsultantCode, String yearMonth);

	List<AddnewinvestmentPM> findByAgentIn(List<String> financialCodes);

}
