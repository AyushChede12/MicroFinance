package com.microfinance.repository;

import org.apache.poi.ss.formula.functions.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.CodeModule;

@Repository
public interface CodeModuleRepo extends JpaRepository<CodeModule, Long>{

}
