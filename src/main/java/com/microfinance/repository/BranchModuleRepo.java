package com.microfinance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.BranchModule;

@Repository
public interface BranchModuleRepo extends JpaRepository<BranchModule, Long> {

	Optional<BranchModule> findByBranchNameIgnoreCase(String branchName);

	boolean existsByBranchNameIgnoreCase(String branchName);

	boolean existsByBranchName(String branchName);

	BranchModule findByBranchName(String branchName);

}
