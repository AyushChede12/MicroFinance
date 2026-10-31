package com.microfinance.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.GenerateIncentivePayments;

@Repository
public interface GenerateIncentivePaymentsRepo extends JpaRepository<GenerateIncentivePayments, Long> {

	List<GenerateIncentivePayments> findByIncentiveMonth(String incentiveMonth);

	List<GenerateIncentivePayments> findByTeamCode(String teamCode);

	List<GenerateIncentivePayments> findByIncentiveMonthAndTeamCode(String incentiveMonth, String teamCode);

	Optional<GenerateIncentivePayments> findFirstByTeamCodeAndIncentiveMonth(String teamCode, String incentiveMonth);

	List<GenerateIncentivePayments> findByBranchName(String branchName);

	List<GenerateIncentivePayments> findByIncentiveMonthAndBranchName(String incentiveMonth, String branchName);

	List<GenerateIncentivePayments> findAllByOrderByIdDesc();

	List<GenerateIncentivePayments> findByIncentiveMonthOrderByIdDesc(String incentiveMonth);

	List<GenerateIncentivePayments> findByTeamCodeOrderByIdDesc(String teamCode);

	List<GenerateIncentivePayments> findByIncentiveMonthAndTeamCodeOrderByIdDesc(String incentiveMonth, String teamCode);

	List<GenerateIncentivePayments> findByBranchNameOrderByIdDesc(String branchName);

	List<GenerateIncentivePayments> findByIncentiveMonthAndBranchNameOrderByIdDesc(String incentiveMonth, String branchName);

}
