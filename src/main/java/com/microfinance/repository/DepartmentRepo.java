package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microfinance.model.ManageDepartment;

public interface DepartmentRepo extends JpaRepository<ManageDepartment, Long> {

}
