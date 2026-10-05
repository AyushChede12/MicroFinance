package com.microfinance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.addCustomer;

@Repository
public interface CustomerRepo extends JpaRepository<addCustomer, Long>{
	@Query("select coalesce(max(id), 0) from addCustomer")
	long getMaxId();

	List<addCustomer> findBymemberCode(String memberCode);

	

	Optional<addCustomer> findByMemberCode(String customerCode);

		List<addCustomer> findByIsApprovedTrue();



}
