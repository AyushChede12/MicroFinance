																										package com.microfinance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.LoanSchemCatalog;
import com.microfinance.model.NewLoanApplication;
@Repository
public interface LoanMangmentSchemeRepo extends JpaRepository<LoanSchemCatalog, Long> {
	
	@Query("select coalesce(max(id), 0) from LoanSchemCatalog")
	long getMaxId();

	Optional<LoanSchemCatalog> findByLoanSchemeCode(String code);

	List<LoanSchemCatalog> findByLoanPlaneNameContainingIgnoreCase(String loanPlanName);


}
