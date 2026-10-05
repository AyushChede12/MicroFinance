package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.microfinance.model.MISDepositPM;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.MISDepositPM;
@Repository
public interface MisDepositePMRepo extends JpaRepository<MISDepositPM, Long>{
	@Query("select coalesce(max(id), 0) from MISDepositPM")
	long getMaxId();

	List<MISDepositPM> findBymis(String mis);

	MISDepositPM findByplanNameMD(String planNameMD);

	


}
