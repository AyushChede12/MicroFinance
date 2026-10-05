package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.RecurringDepositPM;

@Repository
public interface RecurringDepositRepo extends JpaRepository<RecurringDepositPM, Long> {

	@Query("select coalesce(max(id), 0) from RecurringDepositPM")
	

	

	long getMaxId();

	List<RecurringDepositPM> findByrd(String rd);

	RecurringDepositPM findByplanNameRD(String planNameRD);

}
