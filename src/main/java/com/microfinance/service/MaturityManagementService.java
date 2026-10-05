package com.microfinance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microfinance.model.DailyDepositPM;
import com.microfinance.repository.MaturitySchemeMasterRepo;

@Service
public class MaturityManagementService {
	
	@Autowired
	MaturitySchemeMasterRepo maturityrepo;

	
}
