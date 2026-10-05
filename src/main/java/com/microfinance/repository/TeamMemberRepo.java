package com.microfinance.repository;

import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.microfinance.model.TeamMember;

public interface TeamMemberRepo extends JpaRepository<TeamMember, Long> {

	List<TeamMember> findByteamMemberCode(String teamMemberCode);

	@Query("select coalesce(max(id), 0) from TeamMember")
	long getMaxId();

	List<TeamMember> findByModeofpayment(String string);

	TeamMember findByTeamMemberCode(String teamMemberCode);

	List<TeamMember> findByBranchName(String branch);

}
