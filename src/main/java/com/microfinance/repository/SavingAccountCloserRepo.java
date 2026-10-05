package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.savingsAccountCloser;
@Repository
public interface SavingAccountCloserRepo extends JpaRepository<savingsAccountCloser, Long> {

}
