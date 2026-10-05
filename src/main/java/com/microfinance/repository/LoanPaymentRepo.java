package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.LoanPayment;

@Repository
public interface LoanPaymentRepo extends JpaRepository<LoanPayment, Long> {
	List<LoanPayment> findByLoanId(String loanId);

	LoanPayment findByLoanIdAndNoOfInst(String loanId, String remarks);

	List<LoanPayment> findByPaymentMode(String string);

	@Query("SELECT l FROM LoanPayment l WHERE " + "l.paymentMode = 'CHEQUE' AND " + "l.paymentStatus = 'PENDING' AND "
			+ "l.typeOfLoan = :typeOfLoan AND " + "l.branchName = :branchName AND " + "l.chequeNo = :chequeNo AND "
			+ "l.chequeDate BETWEEN :startDate AND :endDate")
	List<LoanPayment> searchCheque(@Param("typeOfLoan") String typeOfLoan, @Param("branchName") String branchName,
			@Param("startDate") String startDate, @Param("endDate") String endDate, @Param("chequeNo") String chequeNo);

	@Query("SELECT l FROM LoanPayment l WHERE l.paymentMode='CHEQUE' AND l.paymentStatus='PENDING'")
	List<LoanPayment> findAllPendingCheques();

}
