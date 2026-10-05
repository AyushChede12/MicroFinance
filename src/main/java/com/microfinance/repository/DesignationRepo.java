package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microfinance.model.ManageDesignation;

public interface DesignationRepo extends JpaRepository<ManageDesignation, Long>{

}
