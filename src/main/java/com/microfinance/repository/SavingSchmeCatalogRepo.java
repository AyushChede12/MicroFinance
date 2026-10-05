package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.SavingSchemeCatalog;
@Repository
public interface SavingSchmeCatalogRepo extends JpaRepository<SavingSchemeCatalog,Long>{

	List<SavingSchemeCatalog> findByPolicyName(String policyName);
	
	@Query("SELECT DISTINCT s.policyName FROM SavingSchemeCatalog s")
	List<String> findDistinctPolicyNames();


	
	


	
}
