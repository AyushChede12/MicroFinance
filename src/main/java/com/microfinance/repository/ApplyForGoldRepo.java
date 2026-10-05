package com.microfinance.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.microfinance.model.ApplyForGold;

@Repository
public interface ApplyForGoldRepo extends JpaRepository<ApplyForGold, Long> {

	@Query("select coalesce(max(id), 0) from ApplyForGold")
	Long getMaxId();

	@Query("SELECT a FROM ApplyForGold a WHERE a.goldID = :goldID")
	List<ApplyForGold> findByGoldID(@Param("goldID") String goldID);

	ApplyForGold findSingleByGoldID(String goldID);
	// List<addCustomer> findByMemberCode(String memberCode);

	List<ApplyForGold> findByApprovalStatusTrue();

	List<ApplyForGold> findByGoldLoanStatus(String string);

	List<ApplyForGold> findByApprovalStatusFalse();

	long countByFinancialConsultantIdInAndLoanDateContaining(List<String> financialConsultantCode, String yearMonth);

	List<ApplyForGold> findByFinancialConsultantIdIn(List<String> financialCodes);

}
