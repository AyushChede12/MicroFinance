package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.DailyDepositPM;

@Repository
public interface DailyDepositPMRepo extends JpaRepository<DailyDepositPM, Long> {
    @Query("select coalesce(max(id), 0) from DailyDepositPM")
    long getMaxId();

	List<DailyDepositPM> findBydrd(String drd);

	DailyDepositPM findByplanNameDD(String planNameDD);
	
	 boolean existsByPlanNameDD(String planNameDD);


}

