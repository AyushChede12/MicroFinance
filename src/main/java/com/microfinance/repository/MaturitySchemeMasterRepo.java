package com.microfinance.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.microfinance.model.MaturitySchemeMaster;

@Repository
public interface MaturitySchemeMasterRepo extends JpaRepository<MaturitySchemeMaster, Long> {

	List<MaturitySchemeMaster> findByPolicyCode(String policyCode);

	List<MaturitySchemeMaster> findBySchemeType(String schemeType);
}
