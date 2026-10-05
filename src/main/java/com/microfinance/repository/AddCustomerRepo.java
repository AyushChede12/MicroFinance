package com.microfinance.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.addCustomer;

@Repository
public interface AddCustomerRepo extends JpaRepository<addCustomer, Long> {

	List<addCustomer> findByMemberCode(String memberCode);

	List<addCustomer> findByMemberCodeIgnoreCase(String memberCode);

	List<addCustomer> findByIsApprovedFalseAndMemberCode(String memberCode);

	List<addCustomer> findByIsApprovedFalse();

	List<addCustomer> findByBranchNameAndIsApprovedFalse(String branchName);

	List<addCustomer> findByIsApprovedTrue();

	@Query("SELECT COALESCE(SUM(" + "COALESCE(CAST(c.memberFees AS double), 0) + "
			+ "COALESCE(CAST(c.buildingFund AS double), 0) + " + "COALESCE(CAST(c.adminCharge AS double), 0) + "
			+ "COALESCE(CAST(c.documentCharge AS double), 0) + " + "COALESCE(CAST(c.otherCharge AS double), 0) + "
			+ "COALESCE(CAST(c.entryFee AS double), 0)" + "), 0) " + "FROM addCustomer c "
			+ "WHERE c.branchName = :branchName " + "AND c.signupDate BETWEEN :startDate AND :endDate")
	Double getTotalKycIncome(@Param("branchName") String branchName, @Param("startDate") String startDate,
			@Param("endDate") String endDate);
}
