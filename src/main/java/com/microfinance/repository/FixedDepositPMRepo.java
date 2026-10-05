package com.microfinance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.DailyDepositPM;
import com.microfinance.model.FixedDepositPM;

@Repository
public interface FixedDepositPMRepo extends JpaRepository<FixedDepositPM, Long>  {
	@Query("select coalesce(max(id), 0) from FixedDepositPM")
	long getMaxId();

	List<FixedDepositPM> findByfd(String fd);

	FixedDepositPM findByplanNameFD(String planNameFD);

	




}
