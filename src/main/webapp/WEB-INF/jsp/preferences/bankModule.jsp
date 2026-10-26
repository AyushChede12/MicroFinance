<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- Keep your existing page's common header/sidebar includes if your project uses them. -->
<style>
.cheque-thumb {
	width: 60px;
	height: 40px;
	object-fit: cover;
	border-radius: 5px;
	cursor: pointer;
	border: 1px solid #ddd;
	transition: transform .2s ease
}

.cheque-thumb:hover {
	transform: scale(1.08);
	border-color: #999
}

.bank-summary {
	border: 1px solid #e5e7eb;
	border-radius: 10px;
	padding: 16px;
	background: #fff;
	height: 100%
}

.bank-summary .label {
	font-size: 12px;
	color: #6b7280
}

.bank-summary .value {
	font-size: 22px;
	font-weight: 700;
	margin-top: 5px
}

.modal {
	display: none;
	position: fixed;
	z-index: 10000;
	inset: 0;
	background: rgba(0, 0, 0, .65);
	justify-content: center;
	align-items: center;
	padding: 20px
}

.modal-content {
	position: relative;
	background: #fff;
	border-radius: 10px;
	padding: 22px;
	width: min(1100px, 96vw);
	max-height: 90vh;
	overflow: auto
}

.image-modal-content {
	background: transparent;
	text-align: center;
	width: auto;
	padding: 0;
	overflow: visible
}

.image-modal-content img {
	max-width: 90vw;
	max-height: 80vh;
	border-radius: 10px
}

.modal-close {
	position: absolute;
	right: 14px;
	top: 8px;
	font-size: 28px;
	cursor: pointer;
	border: 0;
	background: transparent
}

.money-credit {
	color: #198754;
	font-weight: 600
}

.money-debit {
	color: #dc3545;
	font-weight: 600
}

#bankTransactionsTable th, #bankTransactionsTable td {
	white-space: nowrap;
	vertical-align: middle
}
</style>

<div class="pagetitle">
	<h1>PREFERENCES</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i
					class="bi bi-gear"></i></a></li>
			<li class="breadcrumb-item action">BANK MODULE</li>
		</ol>
	</nav>
</div>

<div class="container-fluid">
	<form id="formid" enctype="multipart/form-data">
		<input type="hidden" name="id" id="id">
		<nav>
			<ol class="breadcrumb breadcrumb-title">
				<li class="breadcrumb-item action">BANK DETAILS</li>
			</ol>
		</nav>
		<div class="row">
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="bankName">BANK NAME <span class="star">*</span></label>
					<input type="text" name="bankName" id="bankName" required
						placeholder="ENTER BANK NAME" style="text-transform: uppercase">
					<small id="chkbankname" class="text-danger"></small>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="accountNo">ACCOUNT NO <span class="star">*</span></label>
					<input type="text" name="accountNo" id="accountNo" required
						placeholder="ENTER ACCOUNT NO"> <small id="chkaccountno"
						class="text-danger"></small>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="ifscCode">IFSC CODE <span class="star">*</span></label>
					<input type="text" name="ifscCode" id="ifscCode" required
						placeholder="ENTER IFSC CODE" style="text-transform: uppercase">
					<small id="chkifsccode" class="text-danger"></small>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="micrCode">MICR CODE</label> <input type="text"
						name="micrCode" id="micrCode" placeholder="ENTER MICR CODE"
						style="text-transform: uppercase"> <small id="chkmicrcode"
						class="text-danger"></small>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="contactNo">CONTACT NO <span class="star">*</span></label>
					<input type="text" name="contactNo" id="contactNo" required
						placeholder="ENTER CONTACT NO"> <small id="chkcontactno"
						class="text-danger"></small>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="openingDate">ACCOUNT OPENING DATE <span
						class="star">*</span></label> <input type="date" name="openingDate"
						id="openingDate" required> <small id="chkopeningdate"
						class="text-danger"></small>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="openingBalance">OPENING BALANCE (₹) <span
						class="star">*</span></label> <input type="number" min="0" step="0.01"
						name="openingBalance" id="openingBalance" required
						placeholder="0.00"> <small id="chkopeningbalance"
						class="text-danger"></small>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="closingDate">ACCOUNT CLOSING DATE</label> <input
						type="date" name="closingDate" id="closingDate"> <small
						id="chkclosingdate" class="text-danger"></small>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="d-flex flex-column formFields mb-4">
					<label for="address">ADDRESS</label>
					<textarea name="address" id="address" rows="2"
						style="border: 1px solid #e0e0e0; border-radius: 5px; padding: 5px; text-transform: uppercase"></textarea>
					<small id="chkaddress" class="text-danger"></small>
				</div>
			</div>
			<div class="col-lg-3 mb-4">
				<label for="cancelledCheque"
					style="font-size: 12px; font-weight: 700; margin-bottom: 5px">CANCELLED
					CHEQUE</label> <input type="file" accept="image/*" name="cancelledCheque"
					id="cancelledCheque" onchange="photoUpload()"> <img
					id="photoPreview" alt="Cheque preview"
					style="display: block; max-width: 180px; max-height: 100px; margin-top: 8px; object-fit: contain">
				<small id="chkphoto" class="text-danger"></small>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-12 text-center">
				<button type="button" id="showBtn" class="btnStyle bg-primary"
					onclick="showTableData()">SHOW</button>
				<button type="button" id="saveBtn" class="btnStyle bg-warning">SAVE</button>
				<button type="button" id="hideBtn" class="btnStyle bg-success"
					onclick="hideTableData()">HIDE</button>
				<button type="button" id="updateBtn" class="btnStyle bg-success"
					onclick="updateBank()">UPDATE</button>
				<button type="button" id="clearBtn" class="btnStyle btn-secondary"
					onclick="clearBankForm()">CLEAR</button>
			</div>
		</div>
	</form>

	<div class="row g-3 mt-4">
		<div class="col-md-4">
			<div class="bank-summary">
				<div class="label">TOTAL BANK ACCOUNTS</div>
				<div class="value" id="totalBankCount">0</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="bank-summary">
				<div class="label">TOTAL OPENING BALANCE</div>
				<div class="value" id="totalOpeningBalance">₹0.00</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="bank-summary">
				<div class="label">TOTAL CURRENT BALANCE</div>
				<div class="value" id="totalCurrentBalance">Not available</div>
				<small class="text-muted">Requires backend current-balance
					data</small>
			</div>
		</div>
	</div>

	<div class="mt-5">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<h5 class="card-title">
					BANK DATA <span>| TABLE VIEW</span>
				</h5>
				<table
					class="table table-bordered table-hover text-nowrap datatable"
					id="bankTable" style="text-align: center">
					<thead class="table-light">
						<tr>
							<th>SR NO</th>
							<th>BANK NAME</th>
							<th>ACCOUNT NO</th>
							<th>IFSC CODE</th>
							<th>MICR CODE</th>
							<th>CONTACT NO</th>
							<th>ADDRESS</th>
							<th>OPENING DATE</th>
							<th>OPENING BALANCE</th>
							<th>CURRENT BALANCE</th>
							<th>ACCOUNT CLOSING DATE</th>
							<th>CHEQUE</th>
							<th>TRANSACTIONS</th>
							<th>EDIT</th>
							<th>DELETE</th>
						</tr>
					</thead>
					<tbody id="bankTableBody"></tbody>
				</table>
				<div class="mt-2 text-center">
					<button id="prevBtn" class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-left"></i>
					</button>
					<span id="pageInfo" class="mx-2"></span>
					<button id="nextBtn" class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-right"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Bank transactions modal -->
<div id="bankTransactionsModal" class="modal">
	<div class="modal-content">
		<button class="modal-close" onclick="closeBankTransactions()"
			aria-label="Close">&times;</button>
		<h4 id="transactionBankTitle">BANK TRANSACTIONS</h4>
		<div class="row g-2 mb-3">
			<div class="col-md-3">
				<label for="transactionFrom">From date</label><input type="date"
					id="transactionFrom" class="form-control">
			</div>
			<div class="col-md-3">
				<label for="transactionTo">To date</label><input type="date"
					id="transactionTo" class="form-control">
			</div>
			<div class="col-md-3 d-flex align-items-end">
				<button class="btn btn-primary" onclick="loadBankTransactions()">FILTER</button>
			</div>
		</div>
		<div class="table-responsive">
			<table class="table table-bordered table-hover"
				id="bankTransactionsTable">
				<thead class="table-light">
					<tr>
						<th>Date</th>
						<th>Narration</th>
						<th>Reference</th>
						<th>Type</th>
						<th>Credit</th>
						<th>Debit</th>
						<th>Running Balance</th>
						<th>Branch</th>
					</tr>
				</thead>
				<tbody id="bankTransactionsBody">
					<tr>
						<td colspan="8">Select a bank to load transactions.</td>
					</tr>
				</tbody>
			</table>
		</div>
		<small class="text-muted">Transaction history requires a GET
			API from the backend. Do not use this screen as a substitute for bank
			reconciliation.</small>
	</div>
</div>

<div id="imagePreviewModal" class="modal" onclick="closeChequePreview()">
	<div class="modal-content image-modal-content"
		onclick="event.stopPropagation()">
		<button class="modal-close" onclick="closeChequePreview()">&times;</button>
		<img id="modalChequeImage" src="" alt="Cheque preview">
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/preferences/bank.js"></script>
