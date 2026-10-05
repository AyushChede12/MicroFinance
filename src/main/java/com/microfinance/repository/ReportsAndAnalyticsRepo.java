package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microfinance.model.LoanApplication;
import com.microfinance.model.addFinancialConsultant;

public interface ReportsAndAnalyticsRepo extends JpaRepository<addFinancialConsultant, Long> {

	List<addFinancialConsultant> findByIsApprovedTrue();

}
