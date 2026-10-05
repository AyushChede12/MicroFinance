package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.microfinance.model.UserMenuAccess;

@Repository
public interface UserMenuAccessRepo extends JpaRepository<UserMenuAccess, Long>{
	
	List<UserMenuAccess> findByUserCreations_UserId(String userId);
    void deleteByUserCreations_UserId(String userId);

}
