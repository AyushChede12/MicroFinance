package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.ApplyForGroupLoan;

@Repository
public interface ApplyForGroupLoanRepo extends JpaRepository<ApplyForGroupLoan, Long> {

	ApplyForGroupLoan findTopByGroupCodeOrderByIdDesc(String groupCode);

	List<ApplyForGroupLoan> findByGroupCode(String groupCode);

	List<ApplyForGroupLoan> findByApprovalStatusTrue();

	List<ApplyForGroupLoan> findByApprovalStatusFalse();

	List<ApplyForGroupLoan> findByGroupLoanStatus(String groupLoanStatus);

	List<ApplyForGroupLoan> findByApprovalStatusTrueAndGroupLoanStatus(String groupLoanStatus);

	@Query("SELECT a FROM ApplyForGroupLoan a JOIN GroupDirectory g " + "ON a.groupCode = g.groupID "
			+ "WHERE a.groupCode = :groupCode")
	List<ApplyForGroupLoan> findApplyGroupLoanWithPhoto(@Param("groupCode") String groupCode);
}
