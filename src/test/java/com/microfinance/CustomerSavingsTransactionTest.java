package com.microfinance;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import com.microfinance.controller.CustomerSavingsController;
import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.SavingAccountDto;
import com.microfinance.model.AccountTransaction;
import com.microfinance.model.BankModule;
import com.microfinance.model.BankTransaction;
import com.microfinance.model.BranchModule;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.SavingAccountActivity;
import com.microfinance.model.SavingsInterestTransfer;
import com.microfinance.model.savingAccountFundTransfer;
import com.microfinance.model.savingsAccountCloser;
import com.microfinance.repository.AccountTransactionRepo;
import com.microfinance.repository.BankModuleRepo;
import com.microfinance.repository.BankTransactionRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.SavingAccountActivityRepo;
import com.microfinance.service.CustomerSavingsService;

@SpringBootTest
public class CustomerSavingsTransactionTest {

    @Autowired
    private CustomerSavingsService customerSavingsService;

    @Autowired
    private CustomerSavingsController customerSavingsController;

    @Autowired
    private AccountTransactionRepo accountTransactionRepo;

    @Autowired
    private BankTransactionRepo bankTransactionRepo;

    @Autowired
    private CreateSavingAccountRepo createSavingAccountRepo;

    @Autowired
    private SavingAccountActivityRepo savingAccountActivityRepo;

    @Autowired
    private BankModuleRepo bankModuleRepo;

    @Autowired
    private BranchModuleRepo branchModuleRepo;

    private BankModule testBank;
    private BranchModule testBranch;

    @BeforeEach
    public void setup() {
        // Ensure test bank exists
        List<BankModule> banks = bankModuleRepo.findAll();
        if (banks.isEmpty()) {
            BankModule b = new BankModule();
            b.setBankName("STATE BANK OF INDIA");
            b.setAccountNo("SBIN0012345678");
            b.setOpeningBalance("100000.00");
            testBank = bankModuleRepo.save(b);
        } else {
            testBank = banks.get(0);
        }

        // Ensure test branch exists
        List<BranchModule> branches = branchModuleRepo.findAll();
        if (branches.isEmpty()) {
            BranchModule br = new BranchModule();
            br.setBranchName("MAIN BRANCH");
            br.setBranchCode("BR001");
            br.setBank(testBank);
            testBranch = branchModuleRepo.save(br);
        } else {
            testBranch = branches.get(0);
        }
    }

    @Test
    public void testSavingAccountCreationWithInitialDeposit_OnlineMode() throws Exception {
        String testAccNo = "TEST_ACC_" + System.currentTimeMillis();

        SavingAccountDto dto = new SavingAccountDto();
        dto.setAccountNumber(testAccNo);
        dto.setEnterCustomerName("JOHN DOE");
        dto.setSuggestedNomineeAge("25");
        dto.setBranchName(testBranch.getBranchName());
        dto.setOpeningFees("1500.00");
        dto.setBalance("1500.00");
        dto.setModeOfPayment("ONLINE");
        dto.setDepositAcc1(testBank.getAccountNo());
        dto.setRefNumber1("UPI_REF_" + System.currentTimeMillis());
        dto.setOpeningDate(LocalDate.now().toString());

        ApiResponse<CreateSavingsAccount> resp = customerSavingsService.saveSavingAccountDetails(
                dto, null, null, null, null, null);

        assertNotNull(resp);
        assertNotNull(resp.getData());
        assertEquals("SAVING ACCOUNT", resp.getData().getSelectPlan());

        // Verify AccountTransaction
        List<AccountTransaction> accTxns = accountTransactionRepo.findByAccountNumberOrderByIdAsc(testAccNo);
        assertFalse(accTxns.isEmpty(), "AccountTransaction should be saved for initial deposit");
        AccountTransaction firstAccTxn = accTxns.get(0);
        assertEquals(1500.0, firstAccTxn.getCredit());
        assertEquals(0.0, firstAccTxn.getDebit());
        assertEquals("DEPOSIT", firstAccTxn.getTransactionType());
        assertEquals(1500.0, firstAccTxn.getBalance());

        // Verify BankTransaction
        List<BankTransaction> bankTxns = bankTransactionRepo.findByBank_IdOrderByIdDesc(testBank.getId());
        assertFalse(bankTxns.isEmpty(), "BankTransaction should be saved for online initial deposit");
        BankTransaction latestBankTxn = bankTxns.get(0);
        assertEquals(1500.0, latestBankTxn.getCredit());
        assertEquals("DEPOSIT", latestBankTxn.getTransactionType());
    }

    @Test
    public void testSavingAccountActivityDepositAndWithdrawal() {
        String testAccNo = "TEST_ACT_" + System.currentTimeMillis();

        // Create base account
        CreateSavingsAccount acc = new CreateSavingsAccount();
        acc.setAccountNumber(testAccNo);
        acc.setEnterCustomerName("JANE DOE");
        acc.setBalance("2000.00");
        acc.setBranchName(testBranch);
        acc.setAccountStatus("1");
        acc.setAccountFreeze("0");
        acc.setSelectByCustomer("CUST101");
        createSavingAccountRepo.save(acc);

        // 1. Manual Deposit via CASH
        SavingAccountActivity depositAct = new SavingAccountActivity();
        depositAct.setAccountNumber(testAccNo);
        depositAct.setCustomerName("JANE DOE");
        depositAct.setSelectBranchName(testBranch.getBranchName());
        depositAct.setTransactionType("DEPOSIT");
        depositAct.setTransactionAmount("500.00");
        depositAct.setPayBy("CASH");
        depositAct.setTransactionDate(LocalDate.now().toString());

        customerSavingsService.saveSavingAccountActivityData(depositAct);

        // Verify AccountTransaction for Deposit
        List<AccountTransaction> accTxns = accountTransactionRepo.findByAccountNumberOrderByIdAsc(testAccNo);
        assertFalse(accTxns.isEmpty());
        AccountTransaction lastTxn = accTxns.get(accTxns.size() - 1);
        assertEquals(500.0, lastTxn.getCredit());
        assertEquals(0.0, lastTxn.getDebit());
        assertEquals(2500.0, lastTxn.getBalance());

        // 2. Manual Withdrawal via BANK / NEFT
        SavingAccountActivity withdrawAct = new SavingAccountActivity();
        withdrawAct.setAccountNumber(testAccNo);
        withdrawAct.setCustomerName("JANE DOE");
        withdrawAct.setSelectBranchName(testBranch.getBranchName());
        withdrawAct.setTransactionType("WITHDRAW");
        withdrawAct.setTransactionAmount("300.00");
        withdrawAct.setPayBy("NEFT");
        withdrawAct.setDepositAcc1(testBank.getAccountNo());
        withdrawAct.setTransactionDate(LocalDate.now().toString());

        customerSavingsService.saveSavingAccountActivityData(withdrawAct);

        // Verify AccountTransaction for Withdrawal
        accTxns = accountTransactionRepo.findByAccountNumberOrderByIdAsc(testAccNo);
        AccountTransaction withdrawAccTxn = accTxns.get(accTxns.size() - 1);
        assertEquals(0.0, withdrawAccTxn.getCredit());
        assertEquals(300.0, withdrawAccTxn.getDebit());
        assertEquals(2200.0, withdrawAccTxn.getBalance());

        // Verify BankTransaction for Withdrawal
        List<BankTransaction> bankTxns = bankTransactionRepo.findByBank_IdOrderByIdDesc(testBank.getId());
        assertFalse(bankTxns.isEmpty());
        BankTransaction lastBankTxn = bankTxns.get(0);
        assertEquals(300.0, lastBankTxn.getDebit());
        assertEquals("WITHDRAW", lastBankTxn.getTransactionType());
    }

    @Test
    public void testFundTransferBetweenAccounts() {
        String debitAccNo = "TEST_FT_DR_" + System.currentTimeMillis();
        String creditAccNo = "TEST_FT_CR_" + System.currentTimeMillis();

        CreateSavingsAccount drAcc = new CreateSavingsAccount();
        drAcc.setAccountNumber(debitAccNo);
        drAcc.setEnterCustomerName("SENDER ALICE");
        drAcc.setBalance("3000.00");
        drAcc.setBranchName(testBranch);
        drAcc.setAccountStatus("1");
        drAcc.setAccountFreeze("0");
        drAcc.setSelectByCustomer("MEM_001");
        createSavingAccountRepo.save(drAcc);

        CreateSavingsAccount crAcc = new CreateSavingsAccount();
        crAcc.setAccountNumber(creditAccNo);
        crAcc.setEnterCustomerName("RECEIVER BOB");
        crAcc.setBalance("1000.00");
        crAcc.setBranchName(testBranch);
        crAcc.setAccountStatus("1");
        crAcc.setAccountFreeze("0");
        crAcc.setSelectByCustomer("MEM_002");
        createSavingAccountRepo.save(crAcc);

        // Perform Transfer of 800.00
        savingAccountFundTransfer ft = new savingAccountFundTransfer();
        ft.setDebitAccountNumber(debitAccNo);
        ft.setCreditAccountNumber(creditAccNo);
        ft.setAmount("800.00");
        ft.setComment("RENT PAYMENT");
        ft.setTransferDate(LocalDate.now().toString());

        ResponseEntity<?> response = customerSavingsController.transferAmount(ft);
        assertEquals(201, response.getStatusCodeValue());

        // Verify Debit AccountTransaction
        List<AccountTransaction> drTxns = accountTransactionRepo.findByAccountNumberOrderByIdAsc(debitAccNo);
        assertFalse(drTxns.isEmpty());
        AccountTransaction lastDrTxn = drTxns.get(drTxns.size() - 1);
        assertEquals(800.0, lastDrTxn.getDebit());
        assertEquals(0.0, lastDrTxn.getCredit());
        assertEquals(2200.0, lastDrTxn.getBalance());
        assertEquals("TRANSFER", lastDrTxn.getTransactionType());

        // Verify Credit AccountTransaction
        List<AccountTransaction> crTxns = accountTransactionRepo.findByAccountNumberOrderByIdAsc(creditAccNo);
        assertFalse(crTxns.isEmpty());
        AccountTransaction lastCrTxn = crTxns.get(crTxns.size() - 1);
        assertEquals(800.0, lastCrTxn.getCredit());
        assertEquals(0.0, lastCrTxn.getDebit());
        assertEquals(1800.0, lastCrTxn.getBalance());
        assertEquals("TRANSFER", lastCrTxn.getTransactionType());
    }

    @Test
    public void testSmsChargeAndServiceChargeDeductions() {
        String testAccNo = "TEST_CHG_" + System.currentTimeMillis();

        CreateSavingsAccount acc = new CreateSavingsAccount();
        acc.setAccountNumber(testAccNo);
        acc.setEnterCustomerName("CHARLEY BROWN");
        acc.setBalance("1000.00");
        acc.setBranchName(testBranch);
        acc.setAccountStatus("1");
        acc.setAccountFreeze("0");
        acc.setSelectByCustomer("MEM_CHG");
        acc = createSavingAccountRepo.save(acc);

        // 1. Deduct SMS charge 25.0
        double balAfterSms = customerSavingsService.deductSmsCharges(acc.getId(), 1000.0, 25.0);
        assertEquals(975.0, balAfterSms);

        List<AccountTransaction> accTxns = accountTransactionRepo.findByAccountNumberOrderByIdAsc(testAccNo);
        assertFalse(accTxns.isEmpty());
        AccountTransaction smsTxn = accTxns.get(accTxns.size() - 1);
        assertEquals(25.0, smsTxn.getDebit());
        assertEquals("CHARGE", smsTxn.getTransactionType());
        assertEquals(975.0, smsTxn.getBalance());

        // 2. Deduct Service charge
        double balAfterSrv = customerSavingsService.deductServiceCharges(acc.getId());
        assertEquals(925.0, balAfterSrv); // Default 50.0 service charge

        accTxns = accountTransactionRepo.findByAccountNumberOrderByIdAsc(testAccNo);
        AccountTransaction srvTxn = accTxns.get(accTxns.size() - 1);
        assertEquals(50.0, srvTxn.getDebit());
        assertEquals("CHARGE", srvTxn.getTransactionType());
        assertEquals(925.0, srvTxn.getBalance());
    }

    @Test
    public void testInterestTransfer() {
        String testAccNo = "TEST_INT_" + System.currentTimeMillis();

        CreateSavingsAccount acc = new CreateSavingsAccount();
        acc.setAccountNumber(testAccNo);
        acc.setEnterCustomerName("DAVE MILLER");
        acc.setBalance("10000.00");
        acc.setBranchName(testBranch);
        acc.setAccountStatus("1");
        acc.setAccountFreeze("0");
        acc.setSelectByCustomer("MEM_INT");
        createSavingAccountRepo.save(acc);

        SavingsInterestTransfer it = new SavingsInterestTransfer();
        it.setAccountNumber(testAccNo);
        it.setInterestRate(new BigDecimal("4.00")); // 4%
        it.setTotalDays(90);
        it.setFromDate(LocalDate.now().minusDays(90));
        it.setToDate(LocalDate.now());

        ApiResponse<SavingsInterestTransfer> res = customerSavingsService.transferInterest(it);
        assertEquals(200, res.getStatus().value());

        // Check AccountTransaction
        List<AccountTransaction> accTxns = accountTransactionRepo.findByAccountNumberOrderByIdAsc(testAccNo);
        assertFalse(accTxns.isEmpty());
        AccountTransaction intTxn = accTxns.get(accTxns.size() - 1);
        assertTrue(intTxn.getCredit() > 0.0);
        assertEquals("INTEREST", intTxn.getTransactionType());
    }

    @Test
    public void testAccountClosure_ChequeMode() {
        String testAccNo = "TEST_CLS_" + System.currentTimeMillis();

        CreateSavingsAccount acc = new CreateSavingsAccount();
        acc.setAccountNumber(testAccNo);
        acc.setEnterCustomerName("EVE ADAMS");
        acc.setBalance("4500.00");
        acc.setBranchName(testBranch);
        acc.setAccountStatus("1");
        acc.setAccountFreeze("0");
        acc.setSelectByCustomer("MEM_CLS");
        createSavingAccountRepo.save(acc);

        savingsAccountCloser closer = new savingsAccountCloser();
        closer.setAccountNumber(testAccNo);
        closer.setCustomerName("EVE ADAMS");
        closer.setBranchName(testBranch.getBranchName());
        closer.setCurrentBalance("4500.00");
        closer.setClosingDate(LocalDate.now().toString());
        closer.setPayBy("CHEQUE");
        closer.setComments("ACCOUNT CLOSED BY CUSTOMER REQUEST");

        customerSavingsService.saveAccountCloseInfo(closer);

        // Verify AccountTransaction
        List<AccountTransaction> accTxns = accountTransactionRepo.findByAccountNumberOrderByIdAsc(testAccNo);
        assertFalse(accTxns.isEmpty());
        AccountTransaction clsTxn = accTxns.get(accTxns.size() - 1);
        assertEquals(4500.0, clsTxn.getDebit());
        assertEquals("CLOSURE", clsTxn.getTransactionType());
        assertEquals(0.0, clsTxn.getBalance());

        // Verify BankTransaction (Since payBy is CHEQUE)
        List<BankTransaction> bankTxns = bankTransactionRepo.findByBank_IdOrderByIdDesc(testBank.getId());
        assertFalse(bankTxns.isEmpty());
        BankTransaction lastBankTxn = bankTxns.get(0);
        assertEquals(4500.0, lastBankTxn.getDebit());
        assertEquals("WITHDRAW", lastBankTxn.getTransactionType());

        // Verify account marked inactive and 0.00 balance in CreateSavingsAccount
        CreateSavingsAccount updatedAcc = createSavingAccountRepo.findByAccountNumber(testAccNo).orElse(null);
        assertNotNull(updatedAcc);
        assertEquals("0", updatedAcc.getAccountStatus());
        assertEquals("0.00", updatedAcc.getBalance());
    }
}
