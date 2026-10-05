package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.GoldDirectory;
import com.microfinance.model.SecuredGoldPlan;

@Repository
public interface GoldSecurePlanRepo extends JpaRepository<SecuredGoldPlan, Long> {

	

}
