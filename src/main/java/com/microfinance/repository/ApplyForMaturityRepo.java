package com.microfinance.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.microfinance.model.ApplyForMaturity;

public interface ApplyForMaturityRepo extends JpaRepository<ApplyForMaturity, Integer> {

	@Query("SELECT a FROM ApplyForMaturity a WHERE a.branchName = :branchName AND a.maturityDate BETWEEN :fromDate AND :toDate")
	List<ApplyForMaturity> findByBranchToDateFromDate(String branchName, String fromDate, String toDate);
	
	@Query("SELECT a FROM ApplyForMaturity a")
    Page<ApplyForMaturity> findWithPage(Pageable pageable);

}
