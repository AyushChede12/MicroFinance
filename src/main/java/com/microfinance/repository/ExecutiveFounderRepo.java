package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.ExecutiveFounder;

@Repository
public interface ExecutiveFounderRepo extends JpaRepository<ExecutiveFounder, Long>{

}
