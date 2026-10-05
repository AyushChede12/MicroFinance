
<style>
body {
	background-color: #e6e6e6;
	font-family: 'Poppins', sans-serif;
}

.id-card {
	width: 450px;
	height: 300px;
	border: 2px solid #333;
	padding: 12px;
	padding-bottom: 80px;
	background: white;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	position: relative;
}

.id-header {
	background-color: #002147;
	color: white;
	padding: 8px;
	font-weight: bold;
	text-align: center;
	border-radius: 6px;
	font-size: 18px;
}

.id-photo-label {
	width: 100px;
	height: 140px;
	border: 1px solid #aaa;
	cursor: pointer;
	display: inline-block;
	overflow: hidden;
	background-color: #f8f8f8;
	border-radius: 5px;
}

.id-photo-label img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.signature-label {
	width: 100px;
	height: 45px;
	border: 1px solid #aaa;
	cursor: pointer;
	display: inline-block;
	overflow: hidden;
	background-color: #f8f8f8;
	border-radius: 5px;
}

.signature-label img {
	width: 100%;
	height: 100%;
	object-fit: cover;
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
	font-size: 13px;
	margin-right: 10px;
	margin: 20px;
}

.info p {
	margin: 4px 0;
}

.info label {
	font-weight: 600;
	color: #333;
}

.info span {
	color: #0d6efd;
	font-weight: bold;
}

.photo-section {
	margin-right: 5px;
	margin-top: 20px;
}

.signature-section {
	position: absolute;
	bottom: 12px;
	right: 17px;
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
		top: 0;
		left: 0;
		box-shadow: none;
	}
}
</style>



<div class="container mt-5 d-flex justify-content-center">
	<div class="id-card">
		<div class="id-header">Financial Services</div>

		<div class="top-section mt-3">
			<div class="info">
				<p>
					<label>ID No</label> : <span id="financialCode"></span>
				</p>
				<p>
					<label>Financial Name</label> : <span id="financialName"></span>
				</p>
				<p>
					<label>DOB</label> : <span id="dob"></span>
				</p>
				<p>
					<label>Age</label> : <span id="age"></span>
				</p>
				<p>
					<label>Contact No</label> : <span id="contactNo"></span>
				</p>
				<p>
					<label>District</label> : <span id="district"></span>
				</p>
				<p>
					<label>Branch</label> : <span id="branchName"></span>
				</p>
			</div>

			<div class="photo-section">
				<label for="financialPhoto" class="id-photo-label"
					title="Click to upload photo"> <img
					src="../images/upload/upload.png" alt="upload icon"
					id="idCardPhoto" />
				</label> <input type="file" accept="image/*" name="financialPhoto"
					id="financialPhoto" onchange="photoUpload();" /> <input
					type="hidden" name="photoHidden" id="photoHidden">
			</div>
		</div>

		<div class="signature-section">
			<label for="signature" class="signature-label"
				title="Click to upload signature"> <img
				src="../images/upload/signature.png" alt="Signature"
				id="idCardSignature" />
			</label> <input type="file" accept="image/*" name="financialSignature"
				id="signature" onchange="signatureUpload();" /> <input
				type="hidden" name="signatureHidden" id="signatureHidden">
		</div>
	</div>
</div>

<!-- Print Button -->
<div class="text-center mt-3">
	<button class="btn btn-primary" onclick="printIDCard()">Print
		ID Card</button>
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
