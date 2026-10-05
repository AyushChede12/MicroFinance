package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.addCustomerKYC;

@Repository
public interface AddCustomerKycRepo extends JpaRepository<addCustomerKYC, Long> {
}

