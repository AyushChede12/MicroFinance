package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.RelativeModule;

@Repository
public interface RelativeModuleRepo extends JpaRepository<RelativeModule, Long>{

}
