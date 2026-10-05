package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.UserModuleList;

@Repository
public interface UserModuleListRepo extends JpaRepository<UserModuleList, Long> {

}