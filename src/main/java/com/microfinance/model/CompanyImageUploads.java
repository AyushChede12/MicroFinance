package com.microfinance.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class CompanyImageUploads {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// A human-readable name/label the user enters (e.g., "Logo", "Banner 1")
	private String name;

	// stored filename on disk (unique)
	private String fileName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_id")
	@JsonBackReference
	private CompanyAdministration company;

	// optional: original uploaded filename
	private String originalFileName;

	// constructors, getters, setters
	public CompanyImageUploads() {
	}

	public CompanyImageUploads(String name, String fileName, String originalFileName, CompanyAdministration company) {
		this.name = name;
		this.fileName = fileName;
		this.originalFileName = originalFileName;
		this.company = company;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public CompanyAdministration getCompany() {
		return company;
	}

	public void setCompany(CompanyAdministration company) {
		this.company = company;
	}

	public String getOriginalFileName() {
		return originalFileName;
	}

	public void setOriginalFileName(String originalFileName) {
		this.originalFileName = originalFileName;
	}

}
