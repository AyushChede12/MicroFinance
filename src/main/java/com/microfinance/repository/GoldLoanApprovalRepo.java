package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.ApplyForGold;

@Repository
public interface GoldLoanApprovalRepo extends JpaRepository<ApplyForGold, Long>{

	List<ApplyForGold> findByGoldID(String goldID);

	

}
