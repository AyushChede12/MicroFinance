package com.microfinance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.TransferShare;

@Repository
public interface TransferShareRepo extends JpaRepository<TransferShare, Long> {

	List<TransferShare> findByFindByCode(String findByCode);

	List<TransferShare> findByIsApprovedFalse();

	

}
