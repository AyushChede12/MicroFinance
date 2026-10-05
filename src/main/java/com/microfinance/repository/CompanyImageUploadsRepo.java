package com.microfinance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.CompanyAdministration;
import com.microfinance.model.CompanyImageUploads;

@Repository
public interface CompanyImageUploadsRepo extends JpaRepository<CompanyImageUploads, Long> {

	Optional<CompanyImageUploads> findByCompanyAndName(CompanyAdministration company, String name);
    List<CompanyImageUploads> findByCompany(CompanyAdministration company);

}
