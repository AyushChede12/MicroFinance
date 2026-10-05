package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.GroupDirectory;

@Repository
public interface GroupDirectoryRepo extends JpaRepository<GroupDirectory, Long> {
	@Query("select coalesce(max(id), 0) from GroupDirectory")
	long getMaxId();

	List<GroupDirectory> findByGroupID(String groupID);

}
