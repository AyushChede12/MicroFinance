
<style>
body {
	font-family: 'Poppins', sans-serif;
	margin: 0;
	background: #f9f9f9;
}

.report-container {
	max-width: 900px;
	margin: 50px auto;
	background: #fff;
	padding: 40px 30px;
	border-radius: 12px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2, h4 {
	text-align: center;
	margin: 0;
}

h4 {
	margin-top: 10px;
	color: #555;
}

.form-columns {
	display: flex;
	justify-content: space-between;
	gap: 40px;
	flex-wrap: wrap;
	margin-top: 30px;
}

.form-column {
	flex: 1;
	min-width: 300px;
}

.form-group {
	margin-bottom: 20px;
	font-size: 16px;
}

label {
	font-weight: 600;
}

span {
	margin-left: 8px;
	color: #333;
}

.button-group {
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-top: 50px;
}

.print-btn, .back-btn {
	padding: 12px 30px;
	font-size: 16px;
	background: #007bff;
	color: #fff;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.3s ease;
}

.print-btn:hover, .back-btn:hover {
	background: #0056b3;
}

@media print {
	.print-btn, .back-btn {
		display: none;
	}
}
</style>

<div class="report-container">
	<h2>Agent / Collector Report</h2>


	<div class="form-columns">
		<div class="form-column">
			<div class="form-group">
				<input type="hidden" name="id" id="id" readonly>
			</div>
			<div class="form-group">
				<label>Advisor Code :</label><span id="financialCode">-</span>
			</div>
			<div class="form-group">
				<label>Customer Name :</label><span id="customerName">-</span>
			</div>
			<div class="form-group">
				<label>Branch :</label><span id="branchName">-</span>
			</div>
			<div class="form-group">
				<label>Joining Date :</label><span id="joiningDate">-</span>
			</div>
			<div class="form-group">
				<label>DOB :</label><span id="dob">-</span>
			</div>
			<div class="form-group">
				<label>Contact Number :</label><span id="contactNo">-</span>
			</div>
			<div class="form-group">
				<label>Customer Address :</label><span id="customerAddress">-</span>
			</div>
			<div class="form-group">
				<label>Guardian Name :</label><span id="guardianName">-</span>
			</div>
			<div class="form-group">
				<label>Relation To Applicant :</label><span id="relationToApplicant">-</span>
			</div>

		</div>

		<div class="form-column">
			<div class="form-group">
				<label>Nominee Name :</label><span id="nomineeName">-</span>
			</div>
			<div class="form-group">
				<label>District :</label><span id="district">-</span>
			</div>
			<div class="form-group">
				<label>State :</label><span id="state">-</span>
			</div>
			<div class="form-group">
				<label>Pin Code :</label><span id="pinCode">-</span>
			</div>
			<div class="form-group">
				<label>Profession :</label><span id="profession">-</span>
			</div>
			<div class="form-group">
				<label>Academic Background :</label><span id="academicBackground">-</span>
			</div>
			<div class="form-group">
				<label>Position :</label><span id="selectPosition">-</span>
			</div>
			<div class="form-group">
				<label>Referral Code :</label><span id="referralCode">-</span>
			</div>
			<div class="form-group">
				<label>Referral Name :</label><span id="referralName">-</span>
			</div>
		</div>
	</div>

	<div class="button-group">
		<button class="print-btn" onclick="window.print()">Print</button>
		<button class="back-btn" onclick="goBack()">Back</button>
	</div>
</div>

<script>
	$(document).ready(function() {
		// extract id from query string
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get('id');

		console.log("Loaded with ID:", id);

		if (id) {
			ViewDataAdvisor(id);
		} else {
			alert("No ID provided in URL");
		}
	});

	function goBack() {
		window.history.back();
	}
</script>

