package com.microfinance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.UserCreation;

@Repository
public interface UserCreationRepo extends JpaRepository<UserCreation, Long>{
	
	@Query(value = "select * from user_creation where user_id = ? and password = ?", nativeQuery = true)
	UserCreation fetchMatchedData(String userId, String password);

	List<UserCreation> findByid(Long id);
	
}
