package com.microfinance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.FullMaturity;

@Repository
public interface FullMaturityRepo extends JpaRepository<FullMaturity, Long> {

	List<FullMaturity> findByPolicyCodeIgnoreCase(String policyCode);

	List<FullMaturity> findByApproveStatusTrue();

	@Query("SELECT a FROM FullMaturity a WHERE a.policyCode LIKE 'RD%'")
	List<FullMaturity> getRDFromFullMaturity();
}
