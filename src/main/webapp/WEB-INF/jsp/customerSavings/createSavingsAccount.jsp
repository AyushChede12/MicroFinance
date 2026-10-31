<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

		<div class="pagetitle">
			<h1>SAVINGS &amp; CURRENT ACCOUNTS</h1>
			<nav>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="openDashboard"> <i class="bi bi-bank text-blue"></i>
						</a></li>
					<li class="breadcrumb-item">CUSTOMER SAVINGS</li>
					<li class="breadcrumb-item active">CREATE &amp; MANAGE ACCOUNT</li>
				</ol>
			</nav>
		</div>

		<style>
			/* ---- Design & Styling System ---- */
			.acc-form-card {
				border-radius: 12px;
				border: 1px solid #e0e6ed;
				box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
				margin-bottom: 25px;
				background: #ffffff;
			}

			.acc-card-header {
				padding: 14px 20px;
				border-bottom: 1px solid #edf2f7;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background: #fafbfc;
				border-radius: 12px 12px 0 0;
				text-transform: uppercase;
			}

			.acc-card-header h5 {
				margin: 0;
				font-family: 'Poppins', sans-serif;
				font-weight: 700;
				font-size: 15px;
				color: #1e293b;
				display: flex;
				align-items: center;
				gap: 8px;
				text-transform: uppercase;
			}

			.section-divider {
				font-family: 'Poppins', sans-serif;
				font-size: 13px;
				font-weight: 700;
				color: #0f172a;
				padding: 8px 14px;
				background: #f1f5f9;
				border-left: 4px solid #0d6efd;
				border-radius: 4px;
				margin: 18px 0 14px 0;
				display: flex;
				align-items: center;
				gap: 8px;
				text-transform: uppercase !important;
			}

			.section-divider.current-accent {
				border-left-color: #198754;
				background: #f0fdf4;
				color: #166534;
			}

			.section-divider.saving-accent {
				border-left-color: #0d6efd;
				background: #eff6ff;
				color: #1e40af;
			}

			/* Global uppercase for all Customer and Account form controls */
			.formFields label {
				font-family: 'Poppins', sans-serif;
				font-size: 11px;
				font-weight: 600;
				color: #475569;
				margin-bottom: 4px;
				text-transform: uppercase !important;
				letter-spacing: 0.3px;
			}

			.formFields input,
			.formFields select,
			.formFields textarea,
			.form-control,
			.selectField {
				font-family: 'Poppins', sans-serif;
				font-size: 12px;
				border-radius: 6px;
				border: 1px solid #cbd5e1;
				padding: 6px 10px;
				width: 100%;
				transition: all 0.2s ease;
				outline: none;
				text-transform: uppercase !important;
			}

			.formFields input::placeholder,
			.formFields textarea::placeholder,
			.form-control::placeholder {
				text-transform: uppercase !important;
				color: #94a3b8;
			}

			.formFields select option {
				text-transform: uppercase !important;
			}

			.formFields input:focus,
			.formFields select:focus,
			.formFields textarea:focus {
				border-color: #0d6efd;
				box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.15);
			}

			.formFields input[readonly],
			.formFields textarea[readonly] {
				background-color: #f8fafc;
				color: #334155;
				border-color: #e2e8f0;
				cursor: default;
			}

			/* ---- Account Type Banner Badges ---- */
			.acc-type-pill {
				display: inline-flex;
				align-items: center;
				gap: 6px;
				padding: 4px 12px;
				border-radius: 20px;
				font-size: 11px;
				font-weight: 700;
				text-transform: uppercase !important;
				letter-spacing: 0.5px;
			}

			.pill-saving {
				background: #e0f2fe;
				color: #0369a1;
				border: 1px solid #7dd3fc;
			}

			.pill-current {
				background: #dcfce7;
				color: #15803d;
				border: 1px solid #86efac;
			}

			/* ---- Rules Comparison Section ---- */
			.rule-card {
				border-radius: 10px;
				border: 1px solid transparent;
				padding: 12px 16px;
				transition: all 0.2s ease;
				text-transform: uppercase;
			}

			.saving-rule-card {
				background: #f0f9ff;
				border-color: #bae6fd;
			}

			.current-rule-card {
				background: #f0fdf4;
				border-color: #bbf7d0;
			}

			.rule-card-header {
				font-size: 12px;
				font-weight: 700;
				font-family: 'Poppins', sans-serif;
				display: flex;
				align-items: center;
				gap: 8px;
				margin-bottom: 8px;
				text-transform: uppercase !important;
			}

			.saving-rule-card .rule-card-header {
				color: #0284c7;
			}

			.current-rule-card .rule-card-header {
				color: #16a34a;
			}

			.rule-item {
				font-size: 11px;
				font-family: 'Poppins', sans-serif;
				display: flex;
				justify-content: space-between;
				padding: 3px 0;
				border-bottom: 1px dashed rgba(0, 0, 0, 0.06);
				text-transform: uppercase;
			}

			.rule-item:last-child {
				border-bottom: none;
			}

			.rule-label {
				color: #64748b;
				text-transform: uppercase;
			}

			.rule-val {
				font-weight: 600;
				color: #1e293b;
				text-transform: uppercase;
			}

			/* ---- Photos Box ---- */
			.media-preview-box {
				width: 110px;
				height: 120px;
				border: 2px dashed #cbd5e1;
				border-radius: 10px;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #f8fafc;
				position: relative;
				margin: 0 auto 6px auto;
			}

			.media-preview-box img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.media-label {
				font-size: 11px;
				font-weight: 600;
				font-family: 'Poppins', sans-serif;
				color: #475569;
				text-align: center;
				text-transform: uppercase !important;
			}

			/* ---- Toggle Switches ---- */
			.toggle-switch-wrapper {
				display: flex;
				align-items: center;
				gap: 10px;
				margin-top: 6px;
				text-transform: uppercase;
			}

			.switch {
				position: relative;
				display: inline-block;
				width: 44px;
				height: 24px;
			}

			.switch input {
				opacity: 0;
				width: 0;
				height: 0;
			}

			.slider {
				position: absolute;
				cursor: pointer;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: #cbd5e1;
				transition: .3s;
				border-radius: 24px;
			}

			.slider:before {
				position: absolute;
				content: "";
				height: 18px;
				width: 18px;
				left: 3px;
				bottom: 3px;
				background-color: white;
				transition: .3s;
				border-radius: 50%;
			}

			input:checked+.slider {
				background-color: #10b981;
			}

			input:checked+.slider:before {
				transform: translateX(20px);
			}

			/* ---- Summary Stats Badges ---- */
			.stat-badge {
				border-radius: 10px;
				padding: 12px 16px;
				display: flex;
				align-items: center;
				gap: 14px;
				color: #fff;
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
				text-transform: uppercase;
			}

			.stat-total {
				background: linear-gradient(135deg, #475569, #334155);
			}

			.stat-saving {
				background: linear-gradient(135deg, #0284c7, #0369a1);
			}

			.stat-current {
				background: linear-gradient(135deg, #16a34a, #15803d);
			}

			.stat-active {
				background: linear-gradient(135deg, #0f766e, #115e59);
			}

			.stat-num {
				font-size: 20px;
				font-weight: 800;
				font-family: 'Poppins', sans-serif;
				line-height: 1;
			}

			.stat-lbl {
				font-size: 10px;
				font-weight: 600;
				letter-spacing: 0.5px;
				opacity: 0.9;
				text-transform: uppercase !important;
			}

			/* ---- Table Styles ---- */
			#savingAccountTable,
			#savingAccountTable th,
			#savingAccountTable td {
				text-transform: uppercase !important;
			}

			.badge-saving {
				background: #e0f2fe;
				color: #0369a1;
				border: 1px solid #7dd3fc;
				font-size: 10px;
				font-weight: 700;
				padding: 3px 8px;
				border-radius: 20px;
				display: inline-flex;
				align-items: center;
				gap: 4px;
				text-transform: uppercase !important;
			}

			.badge-current {
				background: #dcfce7;
				color: #15803d;
				border: 1px solid #86efac;
				font-size: 10px;
				font-weight: 700;
				padding: 3px 8px;
				border-radius: 20px;
				display: inline-flex;
				align-items: center;
				gap: 4px;
				text-transform: uppercase !important;
			}

			.cell-saving-only {
				color: #0369a1;
				font-weight: 600;
				text-transform: uppercase !important;
			}

			.cell-current-only {
				color: #15803d;
				font-weight: 600;
				text-transform: uppercase !important;
			}

			.cell-na {
				color: #94a3b8;
				font-size: 11px;
			}

			.action-btn {
				border: none;
				background: transparent;
				padding: 3px 6px;
				border-radius: 4px;
				cursor: pointer;
				transition: background 0.2s;
			}

			.action-btn:hover {
				background: #f1f5f9;
			}

			/* Denomination Pop-up Table */
			#memberFeesTable {
				display: none;
				position: absolute;
				z-index: 1050;
				background: #ffffff;
				border: 1px solid #cbd5e1;
				border-radius: 8px;
				box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
				padding: 12px;
				width: 280px;
				text-transform: uppercase;
			}

			#memberFeesTable table {
				width: 100%;
				font-size: 11px;
				font-family: 'Poppins', sans-serif;
				text-transform: uppercase;
			}

			#memberFeesTable table td {
				padding: 4px;
				text-transform: uppercase;
			}

			#memberFeesTable input {
				width: 60px;
				padding: 2px 4px;
				font-size: 11px;
				text-align: right;
			}
		</style>

		<!-- ===== BANKING RULES COMPARISON BANNER ===== -->
		<div class="row mb-3">
			<div class="col-lg-6 mb-2">
				<div class="rule-card saving-rule-card">
					<div class="rule-card-header">
						<i class="bi bi-piggy-bank-fill"></i>
						<span>SAVING ACCOUNT RULES &amp; POLICIES</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-percent"></i> INTEREST</span>
						<span class="rule-val text-primary">EARNS INTEREST (2% – 6% P.A.)</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-cash-stack"></i> MIN. BALANCE</span>
						<span class="rule-val">LOW (₹500 – ₹2,000)</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-slash-circle"></i> OVERDRAFT FACILITY</span>
						<span class="rule-val text-danger">NOT ALLOWED</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-people"></i> OPERATION TYPE</span>
						<span class="rule-val">SINGLE / JOINT</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-person"></i> PURPOSE</span>
						<span class="rule-val">PERSONAL &amp; HOUSEHOLD SAVINGS</span>
					</div>
				</div>
			</div>

			<div class="col-lg-6 mb-2">
				<div class="rule-card current-rule-card">
					<div class="rule-card-header">
						<i class="bi bi-briefcase-fill"></i>
						<span>CURRENT ACCOUNT RULES &amp; POLICIES</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-percent"></i> INTEREST</span>
						<span class="rule-val text-muted">0% (NO INTEREST EARNED)</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-cash-stack"></i> MIN. BALANCE</span>
						<span class="rule-val">HIGHER (₹5,000 – ₹25,000)</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-bank"></i> OVERDRAFT FACILITY</span>
						<span class="rule-val text-success fw-bold">ALLOWED (SUBJECT TO APPROVAL)</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-people"></i> OPERATION TYPE</span>
						<span class="rule-val">SINGLE / JOINT / EITHER OR SURVIVOR / AUTHORIZED SIGNATORY</span>
					</div>
					<div class="rule-item">
						<span class="rule-label"><i class="bi bi-building"></i> PURPOSE</span>
						<span class="rule-val">BUSINESS, TRADING &amp; COMMERCIAL</span>
					</div>
				</div>
			</div>
		</div>

		<!-- ===== UNIFIED FORM: CREATE / UPDATE ACCOUNT ===== -->
		<div class="card acc-form-card" id="accountFormCard">
			<div class="acc-card-header">
				<h5>
					<i class="bi bi-journal-plus text-primary"></i>
					<span id="formTitle">ACCOUNT OPENING FORM</span>
				</h5>
				<div class="d-flex align-items-center gap-2">
					<span class="acc-type-pill pill-saving" id="currentModeBadge">
						<i class="bi bi-piggy-bank"></i> SAVING ACCOUNT MODE
					</span>
					<button type="button" class="btn btn-sm btn-outline-secondary" onclick="resetForm()">
						<i class="bi bi-arrow-counterclockwise"></i> RESET
					</button>
				</div>
			</div>

			<div class="card-body p-4">
				<form id="formid" autocomplete="off">
					<!-- Hidden identifiers -->
					<input type="hidden" id="id" name="id" value="" />
					<input type="hidden" id="photoHidden" name="photoHidden" value="" />
					<input type="hidden" id="signatureHidden" name="signatureHidden" value="" />
					<input type="hidden" id="jointPhotoHidden" name="jointPhotoHidden" value="" />
					<input type="hidden" id="newPhotoHidden" name="newPhotoHidden" value="" />
					<input type="hidden" id="newSignatureHidden" name="newSignatureHidden" value="" />

					<!-- SECTION 1: ACCOUNT TYPE & CUSTOMER SELECTION -->
					<div class="section-divider saving-accent" id="secAccountBasic">
						<i class="bi bi-1-circle-fill"></i> ACCOUNT IDENTIFICATION &amp; CUSTOMER SELECTION
					</div>

					<div class="row g-3">
						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>ACCOUNT NUMBER <span class="text-danger">*</span></label>
								<input type="text" id="accountNumber" name="accountNumber"
									value="${savingaccountnumber}" readonly
									style="font-weight: 700; color: #0d6efd; letter-spacing: 0.5px;" />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>OPENING DATE <span class="text-danger">*</span></label>
								<input type="date" id="openingDate" name="openingDate" required="required" />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>ACCOUNT TYPE <span class="text-danger">*</span></label>
								<select id="typeofaccount" name="typeofaccount" class="form-control selectField"
									style="height: 34px; font-weight: 600;" onchange="handleAccountTypeChange()">
									<option value="savingaccount">🔵 SAVING ACCOUNT</option>
									<option value="currentaccount">🟢 CURRENT ACCOUNT</option>
								</select>
								<small id="chktypeofaccount" class="text-danger"></small>
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>SELECT BY CUSTOMER <span class="text-danger">*</span> <small class="text-muted"
										id="customerTypeFilterBadge" style="font-size: 10px; font-weight: 600;">(SAVING
										CUSTOMERS)</small></label>
								<select id="selectByCustomer" name="selectByCustomer" class="form-control selectField"
									style="height: 34px;">
									<option value="">-- SELECT CUSTOMER --</option>
								</select>
								<small id="chkselectcustomer" class="text-danger"></small>
							</div>
						</div>
					</div>

					<!-- SECTION 2: CUSTOMER MASTER DETAILS (AUTO-FETCHED FROM AddCustomer) -->
					<div class="section-divider">
						<i class="bi bi-2-circle-fill"></i> CUSTOMER PERSONAL DETAILS (FETCHED FROM CUSTOMER MASTER)
					</div>

					<div class="row g-3">
						<div class="col-lg-4 col-md-6">
							<div class="formFields">
								<label>CUSTOMER FULL NAME</label>
								<input type="text" id="enterCustomerName" name="enterCustomerName"
									placeholder="AUTO-POPULATED FROM CUSTOMER MASTER" readonly
									style="font-weight: 600;" />
							</div>
						</div>

						<div class="col-lg-2 col-md-6">
							<div class="formFields">
								<label>DATE OF BIRTH</label>
								<input type="date" id="dateOfBirth" name="dateOfBirth" readonly />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>FATHER / GUARDIAN NAME</label>
								<input type="text" id="familyDetails" name="familyDetails" readonly />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>CONTACT NUMBER</label>
								<input type="text" id="contactNumber" name="contactNumber" readonly />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>EMAIL ID</label>
								<input type="email" id="emailId" name="emailId" readonly />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>AADHAR CARD NO</label>
								<input type="text" id="aadharNo" name="aadharNo" readonly />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>PAN NUMBER / TAX BILL</label>
								<input type="text" id="panNo" name="panNo" readonly placeholder="AUTO-POPULATED" />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>BRANCH NAME <span class="text-danger">*</span></label>
								<select id="branchName" name="branchName" class="form-control selectField"
									style="height: 34px;">
									<option value="">-- SELECT BRANCH --</option>
								</select>
							</div>
						</div>

						<div class="col-lg-6 col-md-12">
							<div class="formFields">
								<label>CUSTOMER ADDRESS</label>
								<textarea id="address" name="address" rows="1" readonly
									style="resize: none;"></textarea>
							</div>
						</div>

						<div class="col-lg-2 col-md-4">
							<div class="formFields">
								<label>DISTRICT</label>
								<input type="text" id="district" name="district" readonly />
							</div>
						</div>

						<div class="col-lg-2 col-md-4">
							<div class="formFields">
								<label>STATE</label>
								<input type="text" id="state" name="state" readonly />
							</div>
						</div>

						<div class="col-lg-2 col-md-4">
							<div class="formFields">
								<label>PIN CODE</label>
								<input type="text" id="pinCode" name="pinCode" readonly />
							</div>
						</div>
					</div>

					<!-- SECTION 3: NOMINEE DETAILS (AUTO-FETCHED FROM AddCustomer) -->
					<div class="section-divider">
						<i class="bi bi-3-circle-fill"></i> NOMINEE DETAILS (FETCHED FROM CUSTOMER MASTER)
					</div>

					<div class="row g-3">
						<div class="col-lg-4 col-md-6">
							<div class="formFields">
								<label>NOMINEE NAME</label>
								<input type="text" id="suggestedNomineeName" name="suggestedNomineeName"
									placeholder="ENTER NOMINEE NAME" />
							</div>
						</div>

						<div class="col-lg-2 col-md-6">
							<div class="formFields">
								<label>NOMINEE AGE <span class="text-danger">*</span></label>
								<input type="number" id="suggestedNomineeAge" name="suggestedNomineeAge"
									placeholder="AGE (>20)" min="21" max="120" />
								<small id="chksuggestedNomineeAge" class="text-danger"
									style="font-size: 11px; font-weight: 600; display: block; margin-top: 2px;"></small>
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>RELATION WITH APPLICANT</label>
								<select id="suggestedNomineeRelation" name="suggestedNomineeRelation"
									class="form-control selectField" style="height: 34px;">
									<option value="">-- SELECT RELATION --</option>
									<option value="SPOUSE">SPOUSE</option>
									<option value="FATHER">FATHER</option>
									<option value="MOTHER">MOTHER</option>
									<option value="SON">SON</option>
									<option value="DAUGHTER">DAUGHTER</option>
									<option value="BROTHER">BROTHER</option>
									<option value="SISTER">SISTER</option>
									<option value="OTHER">OTHER</option>
								</select>
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>OPERATION TYPE <span class="text-danger">*</span></label>
								<select id="operationType" name="operationType" class="form-control selectField"
									style="height: 34px;" onchange="operationTypeFunc()">
									<option value="Single">SINGLE (INDIVIDUAL)</option>
									<option value="Joint">JOINT ACCOUNT</option>
									<option value="Either or Survivor" class="current-only-opt" style="display:none;">
										EITHER OR SURVIVOR (CURRENT)</option>
									<option value="Authorized Signatory" class="current-only-opt" style="display:none;">
										AUTHORIZED SIGNATORY (CURRENT)</option>
								</select>
							</div>
						</div>
					</div>

					<!-- JOINT ACCOUNT SUB-SECTION (Shown when operationType == Joint) -->
					<div id="jointSection"
						style="display: none; background: #faf5ff; border: 1px dashed #d8b4fe; border-radius: 8px; padding: 12px 16px; margin-top: 14px;">
						<div
							style="font-size: 12px; font-weight: 700; color: #7e22ce; margin-bottom: 8px; text-transform: uppercase;">
							<i class="bi bi-people-fill"></i> JOINT ACCOUNT HOLDER DETAILS
						</div>
						<div class="row g-3">
							<div class="col-lg-4 col-md-6">
								<div class="formFields">
									<label>JOINT MEMBER CODE</label>
									<select id="jointOperationCode" name="jointOperationCode"
										class="form-control selectField" style="height: 34px;">
										<option value="">-- SELECT JOINT MEMBER --</option>
									</select>
								</div>
							</div>

							<div class="col-lg-4 col-md-6">
								<div class="formFields">
									<label>JOINT MEMBER NAME</label>
									<input type="text" id="jointSurvivorCode" name="jointSurvivorCode"
										placeholder="JOINT MEMBER NAME" readonly />
								</div>
							</div>

							<div class="col-lg-4 col-md-6">
								<div class="formFields">
									<label>RELATION WITH PRIMARY APPLICANT</label>
									<select id="familyRelation" name="familyRelation" class="form-control selectField"
										style="height: 34px;">
										<option value="">-- SELECT RELATION --</option>
										<option value="SPOUSE">SPOUSE</option>
										<option value="FATHER">FATHER</option>
										<option value="MOTHER">MOTHER</option>
										<option value="SON">SON</option>
										<option value="DAUGHTER">DAUGHTER</option>
										<option value="BROTHER">BROTHER</option>
										<option value="PARTNER">BUSINESS PARTNER</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					<!-- SECTION 4: ACCOUNT TYPE & BANKING RULES (SAVING vs CURRENT) -->
					<div class="section-divider saving-accent" id="secSchemeRules">
						<i class="bi bi-4-circle-fill"></i> ACCOUNT TYPE &amp; BANKING RULES
					</div>

					<!-- HIDDEN PLAN AND BALANCE (HANDLED INTERNALLY BASED ON SAVING / CURRENT) -->
					<input type="hidden" id="selectPlan" name="selectPlan" value="SAVING ACCOUNT" />
					<input type="hidden" id="balance" name="balance" />

					<!-- SAVING ACCOUNT SPECIFIC RULES -->
					<div id="savingFieldsSection">
						<div class="row g-3">
							<div class="col-12">
								<div class="alert alert-primary py-3 px-3 mb-0"
									style="font-size: 12px; font-family: 'Poppins', sans-serif; border-radius: 6px; text-transform: uppercase;">
									<i class="bi bi-info-circle-fill"></i> <strong>SAVING ACCOUNT:</strong> EARNS QUARTERLY
									COMPOUNDING INTEREST. OVERDRAFT FACILITY IS STRICTLY PROHIBITED UNDER BANKING NORMS. OPENING DEPOSIT ENTERED BELOW WILL BE CREDITED AS INITIAL BALANCE.
								</div>
							</div>
						</div>
					</div>

					<!-- CURRENT ACCOUNT SPECIFIC FIELDS -->
					<div id="currentFieldsSection" style="display: none;">
						<div class="row g-3">
							<div class="col-lg-3 col-md-6">
								<div class="formFields">
									<label>OVERDRAFT LIMIT (₹) <span
											class="text-success fw-bold">(ALLOWED)</span></label>
									<input type="number" id="overdraftLimit" name="overdraftLimit"
										placeholder="E.G. 50000 (0 IF NONE)" min="0" step="500"
										style="font-weight: 700; color: #16a34a;" />
									<small class="text-muted"
										style="font-size: 10px; text-transform: uppercase;">SUBJECT TO BANK CREDIT LIMIT
										APPROVAL</small>
								</div>
							</div>

							<div class="col-lg-4 col-md-6">
								<div class="formFields">
									<label>BUSINESS / FIRM NAME</label>
									<input type="text" id="businessName" name="businessName"
										placeholder="E.G. M/S APEX ENTERPRISES" style="text-transform: uppercase;" />
								</div>
							</div>

							<div class="col-lg-3 col-md-6">
								<div class="formFields">
									<label>GSTIN NO (IF REGISTERED)</label>
									<input type="text" id="gstin" name="gstin" placeholder="E.G. 27ABCDE1234F1Z5"
										maxlength="15" style="text-transform: uppercase;" />
								</div>
							</div>

							<div class="col-lg-2 col-md-6">
								<div class="alert alert-success py-2 px-2 mb-0"
									style="font-size: 10px; font-family: 'Poppins', sans-serif; border-radius: 6px; text-transform: uppercase;">
									<i class="bi bi-check-circle-fill"></i> <strong>CURRENT RULE:</strong> NO INTEREST
									EARNED. CHEQUE BOOK MANDATORY.
								</div>
							</div>
						</div>
					</div>

					<!-- COMMON FINANCIAL & OPENING FEES FIELDS -->
					<div class="row g-3 mt-1">
						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>FINANCIAL CONSULTANT CODE <span class="text-danger">*</span></label>
								<input type="text" id="financialConsultantCode" name="financialConsultantCode"
									placeholder="ENTER CONSULTANT CODE" style="text-transform: uppercase;" />
								<small id="chkfinancialcode" class="text-danger"></small>
							</div>
						</div>

						<div class="col-lg-4 col-md-6">
							<div class="formFields">
								<label>FINANCIAL CONSULTANT NAME</label>
								<input type="text" id="financialConsultantName" name="financialConsultantName"
									placeholder="AUTO-FETCHED ON CODE BLUR" readonly />
							</div>
						</div>

						<div class="col-lg-3 col-md-6 position-relative">
							<div class="formFields">
								<label>OPENING DEPOSIT AMOUNT / FEES (₹) <span class="text-danger">*</span></label>
								<input type="number" id="openingFees" name="openingFees"
									placeholder="CLICK FOR CASH DENOMINATION" min="0"
									style="font-weight: 700; cursor: pointer; background: #fffbeb;" />
								<small id="chkopeningfees" class="text-danger"></small>
							</div>

							<!-- Denomination Calculator Pop-up -->
							<div id="memberFeesTable">
								<div class="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom">
									<span style="font-size: 11px; font-weight: 700;">CASH DENOMINATION</span>
									<span style="font-size: 10px; color: #dc2626; cursor: pointer;"
										onclick="$('#memberFeesTable').hide()">&times; CLOSE</span>
								</div>
								<table>
									<tr>
										<td>₹2000 &times;</td>
										<td><input type="number" id="qty2000" min="0" oninput="calcOpeningFees()"></td>
										<td class="text-end" id="res2000">0</td>
									</tr>
									<tr>
										<td>₹500 &times;</td>
										<td><input type="number" id="qty500" min="0" oninput="calcOpeningFees()"></td>
										<td class="text-end" id="res500">0</td>
									</tr>
									<tr>
										<td>₹200 &times;</td>
										<td><input type="number" id="qty200" min="0" oninput="calcOpeningFees()"></td>
										<td class="text-end" id="res200">0</td>
									</tr>
									<tr>
										<td>₹100 &times;</td>
										<td><input type="number" id="qty100" min="0" oninput="calcOpeningFees()"></td>
										<td class="text-end" id="res100">0</td>
									</tr>
									<tr>
										<td>₹50 &times;</td>
										<td><input type="number" id="qty50" min="0" oninput="calcOpeningFees()"></td>
										<td class="text-end" id="res50">0</td>
									</tr>
									<tr>
										<td>₹20 &times;</td>
										<td><input type="number" id="qty20" min="0" oninput="calcOpeningFees()"></td>
										<td class="text-end" id="res20">0</td>
									</tr>
									<tr>
										<td>₹10 &times;</td>
										<td><input type="number" id="qty10" min="0" oninput="calcOpeningFees()"></td>
										<td class="text-end" id="res10">0</td>
									</tr>
									<tr class="fw-bold border-top">
										<td>TOTAL</td>
										<td></td>
										<td class="text-end text-success" id="totalFee">₹ 0</td>
									</tr>
								</table>
							</div>
						</div>

						<div class="col-lg-2 col-md-6">
							<div class="formFields">
								<label>AUTHENTICATE WITH</label>
								<select id="authenticateWith" name="authenticateWith" class="form-control selectField"
									style="height: 34px;">
									<option value="OTP">OTP</option>
									<option value="BIOMETRIC">BIOMETRIC</option>
									<option value="MANUAL SIGN">MANUAL SIGN</option>
								</select>
							</div>
						</div>
					</div>

					<!-- SECTION 5: PAYMENT & TRANSACTION DETAILS -->
					<div class="section-divider">
						<i class="bi bi-5-circle-fill"></i> PAYMENT SETTLEMENT DETAILS
					</div>

					<div class="row g-3">
						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>MODE OF PAYMENT</label>
								<select id="modeOfPayment" name="modeOfPayment" class="form-control selectField"
									style="height: 34px;" onchange="handlePaymentModeChange()">
									<option value="Cash">CASH</option>
									<option value="Cheque">CHEQUE</option>
									<option value="Online Transfer">ONLINE TRANSFER / NEFT</option>
									<option value="DD">DEMAND DRAFT (DD)</option>
								</select>
							</div>
						</div>

						<div class="col-lg-3 col-md-6 cheque-field" style="display: none;">
							<div class="formFields">
								<label>CHEQUE / DD NO</label>
								<input type="text" id="chequeNo" name="chequeNo" placeholder="ENTER CHEQUE NUMBER" />
							</div>
						</div>

						<div class="col-lg-3 col-md-6 cheque-field" style="display: none;">
							<div class="formFields">
								<label>CHEQUE / DD DATE</label>
								<input type="date" id="chequeDate" name="chequeDate" />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>DEPOSIT ACC NO 1</label>
								<input type="text" id="depositAcc1" name="depositAcc1" placeholder="BANK ACCOUNT NO" />
							</div>
						</div>

						<div class="col-lg-3 col-md-6">
							<div class="formFields">
								<label>REF NUMBER 1</label>
								<input type="text" id="refNumber1" name="refNumber1" placeholder="REF / UTR NO" />
							</div>
						</div>

						<div class="col-lg-6 col-md-12">
							<div class="formFields">
								<label>REMARKS / COMMENTS</label>
								<input type="text" id="comment" name="comment"
									placeholder="OPTIONAL NOTES REGARDING ACCOUNT OPENING" />
							</div>
						</div>
					</div>

					<!-- SECTION 6: SERVICES & STATUS TOGGLES -->
					<div class="section-divider">
						<i class="bi bi-6-circle-fill"></i> ACCOUNT FACILITIES &amp; STATUS
					</div>

					<div class="row g-3 align-items-center">
						<div class="col-lg-2 col-6">
							<label
								style="font-size: 11px; font-weight: 600; color: #475569; display: block; text-transform: uppercase;">ACCOUNT
								STATUS</label>
							<div class="toggle-switch-wrapper">
								<label class="switch">
									<input type="checkbox" id="toggle-member-status" checked />
									<span class="slider"></span>
								</label>
								<span style="font-size: 11px; font-weight: 600; text-transform: uppercase;"
									id="lblStatus">ACTIVE</span>
							</div>
						</div>

						<div class="col-lg-2 col-6">
							<label
								style="font-size: 11px; font-weight: 600; color: #475569; display: block; text-transform: uppercase;">SMS
								ALERT</label>
							<div class="toggle-switch-wrapper">
								<label class="switch">
									<input type="checkbox" id="toggle-member-status1" checked />
									<span class="slider"></span>
								</label>
								<span
									style="font-size: 11px; font-weight: 600; text-transform: uppercase;">ENABLED</span>
							</div>
						</div>

						<div class="col-lg-2 col-6">
							<label
								style="font-size: 11px; font-weight: 600; color: #475569; display: block; text-transform: uppercase;">DEBIT
								CARD</label>
							<div class="toggle-switch-wrapper">
								<label class="switch">
									<input type="checkbox" id="toggle-member-status2" />
									<span class="slider"></span>
								</label>
								<span style="font-size: 11px; font-weight: 600; text-transform: uppercase;">ISSUE</span>
							</div>
						</div>

						<div class="col-lg-2 col-6">
							<label
								style="font-size: 11px; font-weight: 600; color: #475569; display: block; text-transform: uppercase;">LOCKER
								FACILITY</label>
							<div class="toggle-switch-wrapper">
								<label class="switch">
									<input type="checkbox" id="toggle-member-status3" />
									<span class="slider"></span>
								</label>
								<span
									style="font-size: 11px; font-weight: 600; text-transform: uppercase;">OPTIONAL</span>
							</div>
						</div>

						<div class="col-lg-2 col-6">
							<label
								style="font-size: 11px; font-weight: 600; color: #475569; display: block; text-transform: uppercase;">FREEZE
								ACCOUNT</label>
							<div class="toggle-switch-wrapper">
								<label class="switch">
									<input type="checkbox" id="toggle-member-status4" />
									<span class="slider"></span>
								</label>
								<span
									style="font-size: 11px; font-weight: 600; text-transform: uppercase;">FROZEN</span>
							</div>
						</div>
					</div>

					<!-- SECTION 7: PHOTOS & SIGNATURES -->
					<div class="section-divider">
						<i class="bi bi-7-circle-fill"></i> KYC MEDIA (AUTO-FETCHED FROM CUSTOMER MASTER)
					</div>

					<div class="row g-4 text-center">
						<div class="col-lg-3 col-6">
							<div class="media-preview-box">
								<img id="photoPreview" src="Uploads/default-placeholder.jpg"
									onerror="this.src='Uploads/default-placeholder.jpg'" alt="CUSTOMER PHOTO" />
							</div>
							<div class="media-label">CUSTOMER PHOTO</div>
							<div class="mt-1">
								<label class="btn btn-xs btn-outline-secondary"
									style="font-size: 10px; padding: 2px 8px; cursor: pointer; text-transform: uppercase;">
									<i class="bi bi-upload"></i> NEW PHOTO
									<input type="file" id="newPhoto" accept="image/*" style="display:none;"
										onchange="handleNewPhotoUpload(this)" />
								</label>
							</div>
						</div>

						<div class="col-lg-3 col-6">
							<div class="media-preview-box">
								<img id="signaturePreview" src="Uploads/default-placeholder.jpg"
									onerror="this.src='Uploads/default-placeholder.jpg'" alt="CUSTOMER SIGNATURE" />
							</div>
							<div class="media-label">CUSTOMER SIGNATURE</div>
							<div class="mt-1">
								<label class="btn btn-xs btn-outline-secondary"
									style="font-size: 10px; padding: 2px 8px; cursor: pointer; text-transform: uppercase;">
									<i class="bi bi-upload"></i> NEW SIGN
									<input type="file" id="newSignature" accept="image/*" style="display:none;"
										onchange="handleNewSignUpload(this)" />
								</label>
							</div>
						</div>

						<div class="col-lg-3 col-6" id="myJointPhoto" style="display:none;">
							<div class="media-preview-box">
								<img id="jointPhotoPreview" src="Uploads/default-placeholder.jpg"
									onerror="this.src='Uploads/default-placeholder.jpg'" alt="JOINT PHOTO" />
							</div>
							<div class="media-label">JOINT HOLDER PHOTO</div>
							<div class="mt-1">
								<label class="btn btn-xs btn-outline-secondary"
									style="font-size: 10px; padding: 2px 8px; cursor: pointer; text-transform: uppercase;">
									<i class="bi bi-upload"></i> UPLOAD
									<input type="file" id="jointPhoto" accept="image/*" style="display:none;"
										onchange="handleJointPhotoUpload(this)" />
								</label>
							</div>
						</div>
					</div>

					<!-- ACTION BUTTONS -->
					<div class="row mt-4 pt-3 border-top">
						<div class="col-12 text-end">
							<button type="button" class="btn btn-secondary me-2" onclick="resetForm()"
								style="font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600; text-transform: uppercase;">
								<i class="bi bi-x-circle"></i> CANCEL / RESET
							</button>
							<button type="button" id="saveBtn" class="btn btn-primary"
								style="font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600; padding: 8px 24px; text-transform: uppercase;">
								<i class="bi bi-check-circle-fill"></i> SAVE ACCOUNT
							</button>
							<button type="button" id="updateBtn" class="btn btn-warning"
								style="display:none; font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600; padding: 8px 24px; text-transform: uppercase;">
								<i class="bi bi-pencil-square"></i> UPDATE ACCOUNT
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<!-- ===== SUMMARY STATS COUNTERS ===== -->
		<div class="row mb-3" id="summaryStats">
			<div class="col-lg-3 col-6 mb-2">
				<div class="stat-badge stat-total">
					<i class="bi bi-list-ul" style="font-size: 26px;"></i>
					<div>
						<div class="stat-num" id="statTotal">—</div>
						<div class="stat-lbl">TOTAL ACCOUNTS</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-6 mb-2">
				<div class="stat-badge stat-saving">
					<i class="bi bi-piggy-bank" style="font-size: 26px;"></i>
					<div>
						<div class="stat-num" id="statSaving">—</div>
						<div class="stat-lbl">SAVING ACCOUNTS</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-6 mb-2">
				<div class="stat-badge stat-current">
					<i class="bi bi-briefcase" style="font-size: 26px;"></i>
					<div>
						<div class="stat-num" id="statCurrent">—</div>
						<div class="stat-lbl">CURRENT ACCOUNTS</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-6 mb-2">
				<div class="stat-badge stat-active">
					<i class="bi bi-check-circle" style="font-size: 26px;"></i>
					<div>
						<div class="stat-num" id="statActive">—</div>
						<div class="stat-lbl">ACTIVE ACCOUNTS</div>
					</div>
				</div>
			</div>
		</div>

		<!-- ===== SEARCH & FILTER BAR ===== -->
		<div class="card mb-3" style="border-radius: 10px; border: 1px solid #e0e6ed;">
			<div class="card-body py-3">
				<div class="row g-2 align-items-end">
					<div class="col-lg-4 col-md-6">
						<label
							style="font-size: 11px; font-weight: 600; font-family: 'Poppins', sans-serif; color: #475569; text-transform: uppercase;">
							SEARCH BY ACCOUNT NO / CUSTOMER CODE / NAME
						</label>
						<input type="text" id="searchInput" class="form-control" placeholder="TYPE TO SEARCH..."
							style="height: 34px; text-transform: uppercase; font-size: 12px; font-family: 'Poppins', sans-serif;"
							oninput="filterTable()">
					</div>
					<div class="col-lg-2 col-md-3 col-6">
						<label
							style="font-size: 11px; font-weight: 600; font-family: 'Poppins', sans-serif; color: #475569; text-transform: uppercase;">
							ACCOUNT TYPE
						</label>
						<select id="filterAccountType" class="form-control selectField"
							style="height: 34px; font-size: 12px; font-family: 'Poppins', sans-serif; text-transform: uppercase;"
							onchange="filterTable()">
							<option value="">ALL TYPES</option>
							<option value="savingaccount">SAVING ACCOUNT</option>
							<option value="currentaccount">CURRENT ACCOUNT</option>
						</select>
					</div>
					<div class="col-lg-2 col-md-3 col-6">
						<label
							style="font-size: 11px; font-weight: 600; font-family: 'Poppins', sans-serif; color: #475569; text-transform: uppercase;">
							STATUS
						</label>
						<select id="filterStatus" class="form-control selectField"
							style="height: 34px; font-size: 12px; font-family: 'Poppins', sans-serif; text-transform: uppercase;"
							onchange="filterTable()">
							<option value="">ALL STATUS</option>
							<option value="1">ACTIVE</option>
							<option value="0">INACTIVE</option>
						</select>
					</div>
					<div class="col-lg-2 col-md-6">
						<label
							style="font-size: 11px; font-weight: 600; font-family: 'Poppins', sans-serif; color: #475569; text-transform: uppercase;">
							BRANCH
						</label>
						<select id="filterBranch" class="form-control selectField"
							style="height: 34px; font-size: 12px; font-family: 'Poppins', sans-serif; text-transform: uppercase;"
							onchange="filterTable()">
							<option value="">ALL BRANCHES</option>
						</select>
					</div>
					<div class="col-lg-2 col-md-6 text-end">
						<button class="btn btn-outline-secondary btn-sm" onclick="clearFilters()"
							style="font-size: 12px; font-family: 'Poppins', sans-serif; height: 34px; text-transform: uppercase;">
							<i class="bi bi-x-circle"></i> CLEAR FILTERS
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- ===== DATA TABLE: SAVINGS & CURRENT ACCOUNTS ===== -->
		<div class="card" style="border-radius: 12px; border: 1px solid #e0e6ed;">
			<div class="card-body table-responsive pt-3">
				<div class="d-flex justify-content-between align-items-center mb-3">
					<h5 class="card-title m-0"
						style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase;">
						ACCOUNTS REGISTER <span>| ALL SAVING &amp; CURRENT ACCOUNTS</span>
					</h5>
					<span id="recordCount"
						style="font-size: 12px; font-family: 'Poppins', sans-serif; color: #64748b; text-transform: uppercase;">LOADING...</span>
				</div>

				<table class="table table-hover align-middle" id="savingAccountTable"
					style="width: 100%; text-transform: uppercase;">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif; font-size: 11px; text-transform: uppercase;">
							<th style="white-space: nowrap;">SR</th>
							<th style="white-space: nowrap;">ACCOUNT NO</th>
							<th style="white-space: nowrap;">TYPE</th>
							<th style="white-space: nowrap;">CUSTOMER CODE</th>
							<th style="white-space: nowrap;">CUSTOMER NAME</th>
							<th style="white-space: nowrap;">CONTACT</th>
							<th style="white-space: nowrap;">BRANCH</th>
							<th style="white-space: nowrap;">OPENING DATE</th>
							<th style="white-space: nowrap;">BALANCE</th>
							<th style="white-space: nowrap;" title="Saving Account only">INTEREST</th>
							<th style="white-space: nowrap;" title="Current Account only">OD LIMIT</th>
							<th style="white-space: nowrap;">STATUS</th>
							<th style="white-space: nowrap;" class="text-center">ACTION</th>
						</tr>
					</thead>
					<tbody id="savingAccountTableBody" style="text-transform: uppercase;">
						<tr>
							<td colspan="13" class="text-center py-4"
								style="font-family: 'Poppins', sans-serif; font-size: 13px; color: #94a3b8; text-transform: uppercase;">
								<i class="bi bi-hourglass-split"></i> LOADING ACCOUNTS DATA...
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Include external JavaScript for all customer savings logic -->
		<script
			src="${pageContext.request.contextPath}/js/customerSavings/CreateSavingAccount.js?v=<%= System.currentTimeMillis() %>"></script>