<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i class="bi bi-cash-coin"></i></a></li>
			<li class="breadcrumb-item action">LOAN DOCUMENT PRINT</li>
		</ol>
	</nav>
</div>

<div class="card shadow-sm border-0 mb-4">
	<div class="card-body p-4">
		<form id="loanDocForm">
			<!-- Section 1: Search & Document Selection -->
			<nav>
				<ol class="breadcrumb breadcrumb-title mb-3">
					<li class="breadcrumb-item action font-weight-bold text-primary"><i class="bi bi-search mr-1"></i> SELECT LOAN &amp; DOCUMENT</li>
				</ol>
			</nav>
			<div class="row align-items-end mb-4">
				<div class="col-lg-3 col-md-6 mb-3 mb-lg-0">
					<div class="d-flex flex-column formFields">
						<label for="loanId" class="font-weight-bold mb-1">FIND BY LOAN ID <span class="text-danger">*</span></label>
						<select id="loanId" name="loanId" required="required" class="form-control selectField" style="height: 38px;">
							<option value="" disabled selected>SELECT LOAN ID</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4 col-md-6 mb-3 mb-lg-0">
					<div class="d-flex flex-column formFields">
						<label for="loanDocument" class="font-weight-bold mb-1">SELECT LOAN DOCUMENT <span class="text-danger">*</span></label>
						<select id="loanDocument" name="loanDocument" required="required" disabled class="form-control selectField" style="height: 38px;">
							<option value="" disabled selected>-- Select Loan ID First --</option>
						</select>
						<small id="docTypeHint" class="text-muted mt-1" style="font-size: 11px;">Documents are dynamically gated based on loan lifecycle status.</small>
					</div>
				</div>

				<div class="col-lg-5 col-md-12">
					<div class="d-flex" style="gap: 10px;">
						<button type="button" class="btn btn-primary px-3 shadow-sm" id="previewDocBtn" disabled style="height: 38px;">
							<i class="bi bi-eye mr-1"></i> PREVIEW
						</button>
						<button type="button" class="btn btn-warning px-3 shadow-sm font-weight-bold" id="generateDocBtn" disabled style="height: 38px;">
							<span id="generateSpinner" class="spinner-border spinner-border-sm mr-1 d-none" role="status" aria-hidden="true"></span>
							<i class="bi bi-file-earmark-pdf mr-1" id="generateIcon"></i> GENERATE DOC
						</button>
						<button type="button" class="btn btn-outline-secondary px-3" id="resetBtn" style="height: 38px;" title="Reset selection">
							<i class="bi bi-arrow-counterclockwise"></i>
						</button>
					</div>
				</div>
			</div>

			<!-- Section 2: Fixed 4-Column Loan Details Grid -->
			<nav>
				<ol class="breadcrumb breadcrumb-title mb-3">
					<li class="breadcrumb-item action font-weight-bold text-primary"><i class="bi bi-info-circle mr-1"></i> LOAN DETAILS (4-COLUMN GRID)</li>
				</ol>
			</nav>

			<div class="row">
				<!-- Row 1 -->
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">DATE OF LOAN</label>
						<input type="text" readonly="readonly" id="loanDate" class="form-control bg-light" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">LOAN PLAN NAME</label>
						<input type="text" readonly="readonly" id="loanPlanName" class="form-control bg-light text-uppercase" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">TYPE OF LOAN</label>
						<input type="text" readonly="readonly" id="typeOfLoan" class="form-control bg-light text-uppercase" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">MEMBER ID &amp; NAME</label>
						<input type="text" readonly="readonly" id="memberIdAndName" class="form-control bg-light text-uppercase font-weight-bold text-primary" placeholder="--" />
					</div>
				</div>

				<!-- Row 2 -->
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">RELATIVE DETAILS</label>
						<input type="text" readonly="readonly" id="relativeDetails" class="form-control bg-light" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">CONTACT NO.</label>
						<input type="text" readonly="readonly" id="contactNo" class="form-control bg-light" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">SANCTIONED AMOUNT (₹)</label>
						<input type="text" readonly="readonly" id="loanAmount" class="form-control bg-light font-weight-bold text-success" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">RATE OF INTEREST</label>
						<input type="text" readonly="readonly" id="rateOfInterest" class="form-control bg-light" placeholder="--" />
					</div>
				</div>

				<!-- Row 3 -->
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">LOAN TERM (TENURE)</label>
						<input type="text" readonly="readonly" id="loanTerm" class="form-control bg-light" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">INTEREST TYPE</label>
						<input type="text" readonly="readonly" id="interestType" class="form-control bg-light text-uppercase" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">LOAN MODE (FREQUENCY)</label>
						<input type="text" readonly="readonly" id="loanMode" class="form-control bg-light text-uppercase" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">EMI PAYMENT (₹)</label>
						<input type="text" readonly="readonly" id="emiPayment" class="form-control bg-light font-weight-bold" placeholder="--" />
					</div>
				</div>

				<!-- Row 4 -->
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">CURRENT STATUS</label>
						<input type="text" readonly="readonly" id="loanStatus" class="form-control bg-light font-weight-bold" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">APPROVAL DATE</label>
						<input type="text" readonly="readonly" id="approvalDate" class="form-control bg-light" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">NET DISBURSED (₹)</label>
						<input type="text" readonly="readonly" id="netDisbursementAmount" class="form-control bg-light font-weight-bold text-primary" placeholder="--" />
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<div class="d-flex flex-column formFields">
						<label class="small text-muted font-weight-bold">LINKED GUARANTOR</label>
						<input type="text" readonly="readonly" id="guarantorName" class="form-control bg-light" placeholder="--" />
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<!-- Section 3: Recently Generated Documents Audit History -->
<div class="card shadow-sm border-0">
	<div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
		<h5 class="mb-0 font-weight-bold text-dark"><i class="bi bi-clock-history mr-2 text-primary"></i>RECENTLY GENERATED DOCUMENTS (AUDIT LOG)</h5>
		<span class="badge badge-light border text-dark font-weight-bold" id="auditCountBadge">0 Documents</span>
	</div>
	<div class="card-body p-0">
		<div class="table-responsive">
			<table class="table table-hover align-middle mb-0" id="docLogsTable">
				<thead class="thead-light text-secondary text-uppercase small">
					<tr>
						<th class="pl-3" style="width: 50px;">#</th>
						<th>Generation Date &amp; Time</th>
						<th>Document Type</th>
						<th>Generated By User</th>
						<th>File Name</th>
						<th class="text-center" style="width: 130px;">Action</th>
					</tr>
				</thead>
				<tbody id="docLogsBody">
					<tr>
						<td colspan="6" class="text-center py-4 text-muted">Please select a Loan ID to view generated document history.</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Modal: Interactive Document HTML Preview (Bootstrap 4 & 5 Compatible) -->
<div class="modal fade" id="docPreviewModal" tabindex="-1" role="dialog" aria-labelledby="docPreviewModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
		<div class="modal-content border-0 shadow">
			<div class="modal-header bg-primary text-white py-2">
				<h5 class="modal-title font-weight-bold" id="docPreviewModalLabel">
					<i class="bi bi-file-earmark-text mr-1"></i> Document Preview
				</h5>
				<button type="button" class="close text-white" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body p-0" style="background-color: #525659; min-height: 520px;">
				<div class="d-flex justify-content-center p-3">
					<div id="previewContainer" class="bg-white shadow" style="width: 850px; min-height: 900px; padding: 40px; border-radius: 4px;">
						<!-- Rendered document HTML inserted here -->
					</div>
				</div>
			</div>
			<div class="modal-footer bg-light py-2">
				<span class="text-muted small mr-auto"><i class="bi bi-info-circle mr-1"></i> Review the document preview before generating the final signed PDF.</span>
				<button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" data-bs-dismiss="modal">Close</button>
				<button type="button" class="btn btn-warning btn-sm font-weight-bold" id="modalGenerateBtn">
					<i class="bi bi-download mr-1"></i> Approve &amp; Download PDF
				</button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/LoanManagment/LoanDocumentPrint.js?v=<%=System.currentTimeMillis()%>"></script>