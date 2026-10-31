package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.GroupInstallmentRepayment;

@Repository
public interface GroupRepaymentRepo extends JpaRepository<GroupInstallmentRepayment, Long> {

	List<GroupInstallmentRepayment> findByGroupID(String groupID);

	List<GroupInstallmentRepayment> findByGroupIDOrderByIdAsc(String groupID);
}
