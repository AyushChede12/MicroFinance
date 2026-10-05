package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.microfinance.model.UserToServiceMap;

@Repository
public interface UserToServiceMapRepo extends JpaRepository<UserToServiceMap, Long> {

	UserToServiceMap findByuserName(String userName);

	@Query(value = "select * from user_to_service_map where user_name = ?", nativeQuery = true)
	List<UserToServiceMap> getDataByuserName(String userName);

	List<UserToServiceMap> findByUserName(String userName);
}