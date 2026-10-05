package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class UserMenuAccess {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserCreation userCreations;

	private String menuName;
	private Boolean hasAccess;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserCreation getUserCreations() {
		return userCreations;
	}

	public void setUserCreations(UserCreation userCreations) {
		this.userCreations = userCreations;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public Boolean getHasAccess() {
		return hasAccess;
	}

	public void setHasAccess(Boolean hasAccess) {
		this.hasAccess = hasAccess;
	}

}
