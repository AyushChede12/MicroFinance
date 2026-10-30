package com.microfinance.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.IncentiveSchemeMaster;

@Repository
public interface IncentiveSchemeMasterRepo extends JpaRepository<IncentiveSchemeMaster, Long> {

	Optional<IncentiveSchemeMaster> findByIncentiveMonth(String incentiveMonth);

	List<IncentiveSchemeMaster> findAllByOrderByIdDesc();

}
