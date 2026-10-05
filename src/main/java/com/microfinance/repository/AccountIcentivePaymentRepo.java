package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.AccountIncentivePayment;

@Repository
public interface AccountIcentivePaymentRepo extends JpaRepository<AccountIncentivePayment, Long> {

	boolean existsByTeamMemberCodeAndIncentiveMonth(String teamMemberCode, String incentiveMonth);

}
