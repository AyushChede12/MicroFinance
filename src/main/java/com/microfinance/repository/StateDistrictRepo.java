package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.Statedistricts;

@Repository
public interface StateDistrictRepo extends JpaRepository<Statedistricts, Integer> {

	List<Statedistricts> findBystateId(int stateId);

}
