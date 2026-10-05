package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.states;

@Repository
public interface Staterepo extends JpaRepository<states,Integer> {

}
