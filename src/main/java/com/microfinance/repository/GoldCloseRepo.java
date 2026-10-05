package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.GoldLoanClose;

@Repository
public interface GoldCloseRepo extends JpaRepository<GoldLoanClose, Long>{

	List<GoldLoanClose> findByGoldID(String goldID);

}
