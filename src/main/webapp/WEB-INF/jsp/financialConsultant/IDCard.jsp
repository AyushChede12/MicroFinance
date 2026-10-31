<style>
body {
	background-color: #e6e6e6;
	font-family: 'Poppins', sans-serif;
}

.id-card {
	width: 500px;
	min-height: 330px;
	border: 2px solid #002147;
	padding: 16px;
	background: white;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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

#financialPhoto, #signature {
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
	min-width: 120px;
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
	<h1>FINANCIAL CONSULTANT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-briefcase text-blue"></i>
			</a></li>
			<li class="breadcrumb-item"><a href="consultantIDCardGenerator">CONSULTANT ID CARD GENERATOR</a></li>
			<li class="breadcrumb-item action">CONSULTANT IDENTITY CARD</li>
		</ol>
	</nav>
</div>

<div class="container mt-4 d-flex justify-content-center">
	<div class="id-card">
		<div class="id-header">
			MICROFINANCE BANKING SYSTEM
			<div class="id-sub-header">FINANCIAL CONSULTANT IDENTITY CARD</div>
		</div>

		<div class="top-section mt-2">
			<div class="info">
				<p>
					<label>CONSULTANT ID:</label> <span id="financialCode">—</span>
				</p>
				<p>
					<label>NAME:</label> <span id="financialName">—</span>
				</p>
				<p>
					<label>POSITION:</label> <span id="selectPosition">—</span>
				</p>
				<p>
					<label>DOB / AGE:</label> <span id="dob">—</span> (<span id="age">—</span> YRS)
				</p>
				<p>
					<label>CONTACT NO.:</label> <span id="contactNo">—</span>
				</p>
				<p>
					<label>BRANCH:</label> <span id="branchName">—</span>
				</p>
				<p>
					<label>DISTRICT / STATE:</label> <span id="district">—</span>, <span id="state">—</span>
				</p>
			</div>

			<div class="photo-section">
				<label for="financialPhoto" class="id-photo-label"
					title="PHOTO PREVIEW"> <img
					src="Uploads/upload.png" alt="CONSULTANT PHOTO"
					id="idCardPhoto" />
				</label>
				<input type="file" accept="image/*" name="financialPhoto"
					id="financialPhoto" onchange="photoUpload();" /> <input
					type="hidden" name="photoHidden" id="photoHidden">
			</div>
		</div>

		<div class="signature-section">
			<div class="sign-box">
				<label for="signature" class="signature-label"
					title="CONSULTANT SIGNATURE"> <img
					src="Uploads/upload.png" alt="SIGNATURE"
					id="idCardSignature" />
				</label>
				<input type="file" accept="image/*" name="financialSignature"
					id="signature" onchange="signatureUpload();" /> <input
					type="hidden" name="signatureHidden" id="signatureHidden">
				<div class="sign-title">CONSULTANT SIGNATURE</div>
			</div>

			<div class="sign-box" style="margin-bottom: 5px;">
				<div style="font-family: 'Great Vibes', cursive, sans-serif; font-size: 16px; color: #002147; font-weight: bold;">
					BANK MANAGER
				</div>
				<div class="sign-title" style="border-top: 1px solid #333; padding-top: 2px;">AUTHORISED SIGNATORY</div>
			</div>
		</div>
	</div>
</div>

<!-- Print Button -->
<div class="text-center mt-3 mb-5 no-print">
	<button class="btn btn-primary" onclick="printIDCard()">
		<i class="bi bi-printer"></i> PRINT ID CARD
	</button>
	<a href="consultantIDCardGenerator" class="btn btn-secondary ms-2">
		BACK TO GENERATOR
	</a>
</div>

<script>
	function photoUpload() {
		const fileInput = document.getElementById('financialPhoto');
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

	function signatureUpload() {
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

	function printIDCard() {
		window.print();
	}
</script>

<script
	src="${pageContext.request.contextPath}/js/FinancialConsultant/ConsultantIDCardGenerator.js"></script>
