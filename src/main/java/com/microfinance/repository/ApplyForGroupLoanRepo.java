package com.microfinance.repository;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.ApplyForGroupLoan;
import com.microfinance.model.LoanApplication;

@Repository
public interface ApplyForGroupLoanRepo extends JpaRepository<ApplyForGroupLoan, Long> {

	@Query("SELECT a FROM ApplyForGroupLoan a WHERE a.groupCode = :groupCode")
	ApplyForGroupLoan findSingleByGroupCode(@Param("groupCode") String groupCode);

	// ✅ For fetching multiple records
	List<ApplyForGroupLoan> findByGroupCode(String groupCode);

	List<ApplyForGroupLoan> findByApprovalStatusTrueAndGroupLoanStatus(String groupLoanStatus);

	@Query("SELECT a FROM ApplyForGroupLoan a JOIN GroupDirectory g " + "ON a.groupCode = g.groupID "
			+ "WHERE a.groupCode = :groupCode")
	List<ApplyForGroupLoan> findApplyGroupLoanWithPhoto(@Param("groupCode") String groupCode);
}
