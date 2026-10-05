package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.CompanyAdministration;

@Repository
public interface CompanyAdministrationRepo extends JpaRepository<CompanyAdministration, Long> {

	CompanyAdministration findTopByOrderByIdAsc();

}
