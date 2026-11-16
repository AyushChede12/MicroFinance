<style>
body {
	background-color: #f4f6f9;
	font-family: 'Poppins', sans-serif;
}

.id-card-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
}

.id-card {
	width: 500px;
	min-height: 330px;
	border: 2px solid #002147;
	padding: 16px;
	background: white;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
	border-radius: 12px;
	position: relative;
}

.id-header {
	background: linear-gradient(135deg, #002147, #0d6efd);
	color: white;
	padding: 10px;
	font-weight: bold;
	text-align: center;
	border-radius: 6px;
	font-size: 15px;
	letter-spacing: 0.5px;
	text-transform: uppercase;
}

.id-sub-header {
	font-size: 11px;
	color: #ffc107;
	text-align: center;
	margin-top: 2px;
	letter-spacing: 1px;
	font-weight: 700;
}

.id-photo-label {
	width: 110px;
	height: 140px;
	border: 2px solid #002147;
	cursor: pointer;
	display: inline-block;
	overflow: hidden;
	background-color: #f8f8f8;
	border-radius: 6px;
}

.id-photo-label img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.signature-label {
	width: 130px;
	height: 48px;
	border: 1px dashed #aaa;
	cursor: pointer;
	display: inline-block;
	overflow: hidden;
	background-color: #fafafa;
	border-radius: 4px;
}

.signature-label img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

#teamMemberPhoto, #signature {
	display: none;
}

.top-section {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.info {
	font-size: 12px;
	margin-right: 15px;
	margin-top: 10px;
	flex: 1;
}

.info p {
	margin: 5px 0;
	text-transform: uppercase;
}

.info label {
	font-weight: 700;
	color: #002147;
	min-width: 130px;
	display: inline-block;
}

.info span {
	color: #111;
	font-weight: 600;
}

.photo-section {
	margin-top: 10px;
	text-align: center;
}

.signature-section {
	margin-top: 15px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	border-top: 1px solid #ddd;
	padding-top: 8px;
}

.sign-box {
	text-align: center;
}

.sign-title {
	font-size: 10px;
	font-weight: 700;
	color: #555;
	text-transform: uppercase;
	margin-top: 2px;
}

@media print {
	body * {
		visibility: hidden;
	}
	.id-card, .id-card * {
		visibility: visible;
	}
	.id-card {
		position: absolute;
		top: 20px;
		left: 20px;
		box-shadow: none;
	}
	.no-print {
		display: none !important;
	}
}
</style>

<div class="pagetitle no-print">
	<h1>TEAM MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-workspace"></i>
			</a></li>
			<li class="breadcrumb-item action">GENERATE TEAM ID CARD</li>
		</ol>
	</nav>
</div>

<div class="no-print">
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SELECT TEAM MEMBER FOR ID CARD GENERATION</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-4 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="teamMemberCode">SELECT TEAM MEMBER <span class="text-danger">*</span></label> 
						<select id="teamMemberCode" name="teamMemberCode" required="required"
							class="form-control selectField" style="height: 32px; text-transform: uppercase;">
							<option value="">SELECT TEAM MEMBER</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3 mb-3 d-flex align-items-end">
					<button type="button" id="generateBtn" class="btnStyle bg-primary text-white" style="height: 32px; line-height: 14px;">
						<i class="bi bi-person-badge"></i> LOAD ID CARD
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- ID CARD CONTAINER -->
<div id="idCardContainer" style="display: none;">
	<div class="id-card-wrapper">
		<div class="id-card">
			<div class="id-header">
				<div id="companyNameHeader" style="font-size: 15px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">
					LOADING COMPANY...
				</div>
				<div class="id-sub-header">TEAM MEMBER IDENTITY CARD</div>
				<div id="companyAddressHeader" style="font-size: 9px; color: #ffeb3b; font-weight: 500; margin-top: 3px; letter-spacing: 0.5px; text-transform: uppercase;"></div>
			</div>

			<div class="top-section mt-2">
				<div class="info">
					<p>
						<label>MEMBER CODE:</label> <span id="cardMemberCode">—</span>
					</p>
					<p>
						<label>NAME:</label> <span id="cardMemberName">—</span>
					</p>
					<p>
						<label>DESIGNATION:</label> <span id="cardDesignation">—</span>
					</p>
					<p>
						<label>DEPARTMENT:</label> <span id="cardDepartment">—</span>
					</p>
					<p>
						<label>BRANCH:</label> <span id="cardBranch">—</span>
					</p>
					<p>
						<label>SIGN-UP DATE:</label> <span id="cardSignUpDate">—</span>
					</p>
					<p>
						<label>CONTACT NO.:</label> <span id="cardContact">—</span>
					</p>
					<p>
						<label>BANK A/C NO.:</label> <span id="cardBankAC">—</span>
					</p>
				</div>

				<div class="photo-section">
					<label for="teamMemberPhoto" class="id-photo-label" title="CLICK TO UPLOAD PHOTO"> 
						<img src="Uploads/upload.png" alt="MEMBER PHOTO" id="idCardPhoto" />
					</label>
					<input type="file" accept="image/*" name="teamMemberPhoto" id="teamMemberPhoto" onchange="previewPhoto();" /> 
					<input type="hidden" name="photoHidden" id="photoHidden" />
					<div class="small text-muted mt-1" style="font-size: 9px;">MEMBER PHOTO</div>
				</div>
			</div>

			<div class="signature-section">
				<div class="sign-box">
					<label for="signature" class="signature-label" title="CLICK TO UPLOAD SIGNATURE"> 
						<img src="Uploads/upload.png" alt="SIGNATURE" id="idCardSignature" />
					</label>
					<input type="file" accept="image/*" name="memberSignature" id="signature" onchange="previewSignature();" /> 
					<input type="hidden" name="signatureHidden" id="signatureHidden" />
					<div class="sign-title">EMPLOYEE SIGNATURE</div>
				</div>

				<div class="sign-box" style="margin-bottom: 5px;">
					<div id="signatoryTitle" style="font-family: 'Great Vibes', cursive, sans-serif; font-size: 16px; color: #002147; font-weight: bold;">
						BANK MANAGER
					</div>
					<div class="sign-title" style="border-top: 1px solid #333; padding-top: 2px;">AUTHORISED SIGNATORY</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Print & Action Controls -->
	<div class="text-center mt-3 mb-4 no-print">
		<button class="btn btn-primary" onclick="window.print();">
			<i class="bi bi-printer"></i> PRINT ID CARD
		</button>
	</div>

	<!-- Connected Financial Consultants Under This Team Member -->
	<div class="row mt-4 no-print">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title text-primary" style="font-weight: 700;">
						<i class="bi bi-people-fill me-2"></i>CONNECTED FINANCIAL CONSULTANTS UNDER THIS TEAM MEMBER
					</h5>
					<p class="text-muted small">ALL FINANCIAL CONSULTANTS WORKING IN THE HIERARCHY OF TEAM MEMBER (<span id="reportingMemberCodeBadge" class="badge bg-primary">—</span>)</p>

					<table class="table table-bordered table-hover align-middle">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">S/N</th>
								<th scope="col">CONSULTANT CODE</th>
								<th scope="col">CONSULTANT NAME</th>
								<th scope="col">POSITION</th>
								<th scope="col">BRANCH</th>
								<th scope="col">CONTACT NUMBER</th>
								<th scope="col">JOINING DATE</th>
								<th scope="col">STATUS</th>
							</tr>
						</thead>
						<tbody id="cardConsultantsTableBody">
							<tr>
								<td colspan="8" class="text-center text-muted">SELECT A TEAM MEMBER TO VIEW CONNECTED FINANCIAL CONSULTANTS</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
function previewPhoto() {
	const fileInput = document.getElementById('teamMemberPhoto');
	const idCardPhoto = document.getElementById('idCardPhoto');
	const hiddenInput = document.getElementById('photoHidden');

	const file = fileInput.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			idCardPhoto.src = e.target.result;
			hiddenInput.value = e.target.result;
		};
		reader.readAsDataURL(file);
	}
}

function previewSignature() {
	const fileInput = document.getElementById('signature');
	const signaturePreview = document.getElementById('idCardSignature');
	const hiddenInput = document.getElementById('signatureHidden');

	const file = fileInput.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			signaturePreview.src = e.target.result;
			hiddenInput.value = e.target.result;
		};
		reader.readAsDataURL(file);
	}
}
</script>

<script src="${pageContext.request.contextPath}/js/TeamManagement/generateTeamMemberID.js"></script>
