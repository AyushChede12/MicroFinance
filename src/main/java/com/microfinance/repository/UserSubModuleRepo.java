package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.UserSubModule;

@Repository
public interface UserSubModuleRepo extends JpaRepository<UserSubModule, Long>{

}