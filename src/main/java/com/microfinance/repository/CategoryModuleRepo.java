package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.CategoryModule;

@Repository
public interface CategoryModuleRepo extends JpaRepository<CategoryModule, Long>{

	List<CategoryModule> findByCategory(String category);

}
