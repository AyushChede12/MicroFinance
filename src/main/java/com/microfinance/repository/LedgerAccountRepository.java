package com.microfinance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.LedgerAccountMaster;

@Repository
public interface LedgerAccountRepository extends JpaRepository<LedgerAccountMaster, Long> {

	// Check unique account title per branch (ignoring spaces and case)
	@Query("SELECT COUNT(l) > 0 FROM LedgerAccountMaster l "
			+ "WHERE LOWER(REPLACE(l.accountTitle, ' ', '')) = LOWER(REPLACE(:title, ' ', '')) "
			+ "AND LOWER(l.branchName) = LOWER(:branch)")
	boolean existsByAccountTitleIgnoreCaseAndBranchNameTrimmed(@Param("title") String accountTitle,
			@Param("branch") String branchName);

	// Check unique account code per branch
	@Query("SELECT COUNT(l) > 0 FROM LedgerAccountMaster l "
			+ "WHERE LOWER(l.accountCode) = LOWER(:code) AND LOWER(l.branchName) = LOWER(:branch)")
	boolean existsByAccountCodeIgnoreCaseAndBranchName(@Param("code") String accountCode,
			@Param("branch") String branchName);

	List<LedgerAccountMaster> findByBranchName(String branchName);

	Optional<LedgerAccountMaster> findByAccountTitleAndBranchName(String accountTitle, String branchName);

	List<LedgerAccountMaster> findByBranchNameIgnoreCaseAndGroupNameIn(String branchName, List<String> groupName);

	Optional<LedgerAccountMaster> findByBranchNameAndAccountTitleIgnoreCase(String branchName, String creditLedger);

	boolean existsByAccountTitle(String ledgerAccount);

	List<LedgerAccountMaster> findByGroupNameIgnoreCase(String groupName);

	Optional<LedgerAccountMaster> findByAccountCodeAndBranchName(String accountCode, String branchName);

	@Query("SELECT DISTINCT l.accountCode, l.accountTitle FROM LedgerAccountMaster l")
	List<Object[]> getUniqueLedgerDropdown();

	List<LedgerAccountMaster> findByGroupNameIgnoreCaseAndAccountTypeIgnoreCaseAndStatusIgnoreCase(String groupName,
			String accountType, String status);

	Optional<LedgerAccountMaster> findFirstByAccountTitleIgnoreCaseAndGroupNameIgnoreCase(String accountTitle,
			String groupName);

}
