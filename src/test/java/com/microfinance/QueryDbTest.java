package com.microfinance;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.microfinance.model.User;
import com.microfinance.repository.UserRepository;
import java.util.List;

@SpringBootTest
public class QueryDbTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.microfinance.repository.CustomerRepo customerRepo;
    
    @Autowired
    private com.microfinance.repository.CreateSavingAccountRepo createSavingAccountRepo;

    @Test
    public void testUsers() {
        List<User> users = userRepository.findAll();
        System.out.println("=== USERS IN DATABASE ===");
        for (User u : users) {
            System.out.println("ID: " + u.getId() + ", Username: " + u.getUsername() + ", Password: " + u.getPassword());
        }
        System.out.println("=========================");
        
        if (users.isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            userRepository.save(admin);
            System.out.println("Inserted default admin user: admin / admin123");
        }
    }

    @Test
    public void checkCustomerAndSavings() {
        List<com.microfinance.model.addCustomer> customers = customerRepo.findAll();
        System.out.println("=== CUSTOMER & SAVINGS ACCOUNT STATUS ===");
        int count = 0;
        for (int i = customers.size() - 1; i >= 0 && count < 10; i--) {
            com.microfinance.model.addCustomer c = customers.get(i);
            List<com.microfinance.model.CreateSavingsAccount> accounts = createSavingAccountRepo.findBySelectByCustomer(c.getMemberCode());
            System.out.println("Customer: " + c.getCustomerName() + " (Code: " + c.getMemberCode() + ")");
            if (accounts.isEmpty()) {
                System.out.println("  -> Savings Account: NOT FOUND");
            } else {
                for (com.microfinance.model.CreateSavingsAccount acc : accounts) {
                    System.out.println("  -> Savings Account: " + acc.getAccountNumber() + " (Status: " + acc.getAccountStatus() + ")");
                }
            }
            count++;
        }
        System.out.println("=========================================");
    }
}

