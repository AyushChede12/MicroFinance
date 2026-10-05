package com.microfinance.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.addCustomer;
import com.microfinance.model.addFinancialConsultant;

@Repository
public interface FinancialConsultantRepo extends JpaRepository<addFinancialConsultant, Long> {

	/*
	 * @Transactional List<addCustomer> findByMemberCode(String memberCode);
	 */

	@Query("select coalesce(max(id), 0) from addFinancialConsultant")
	long getMaxId();

	@Transactional
	List<addFinancialConsultant> findByFinancialCode(String financialCode);

	List<addFinancialConsultant> findByIsApprovedFalse();

	List<addFinancialConsultant> findByModeofPayment(String string);

	List<addFinancialConsultant> findByTeamMemberCode(String teamMemberCode);

	List<addFinancialConsultant> findByTeamMemberCodeIn(List<String> teamCodes);

	/*
	 * @Transactional List<addFinancialConsultant> fetchAllFinancialCode(String
	 * financialCode);
	 */

	// Optional<addCustomer> findByMemberCode(String memberCode);

	// List<addFinancialConsultant> findByFinancialCode(String financialCode);

}
