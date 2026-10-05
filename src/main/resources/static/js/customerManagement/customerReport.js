let allCustomers = []; // ⬅️ Add this at the top
let companyDetails = null;

$(document).ready(function() {
	$.ajax({
		url: "api/preference/fetchAllCompanyAdministration",   // 👈 API NAME YAHA HAI
		type: "GET",
		success: function(response) {
			companyDetails = response.data[0];	 // 👈 data store ho gaya
		},
		error: function() {
			console.error("Company API failed");
		}
	});
});


$(document).ready(function() {
	$.ajax({
		url: "api/customermanagement/getAllCustomer",
		type: "GET",
		success: function(data) {
			allCustomers = data; // Store data globally
			populateTable(data);
		},
		error: function() {
			alert("Failed to fetch customer data.");
		}
	});
});

function populateTable(data) {
	const tbody = $(".datatable tbody");
	tbody.empty();

	if (!data.length) {
		tbody.append("<tr><td colspan='10'>No matching found.</td></tr>");
		return;
	}
	
	data.forEach((customer, i) => {
		
		// Convert all fields to uppercase safely
		const memberCode = (customer.memberCode || "").toUpperCase();
		const customerName = (customer.customerName || "").toUpperCase();
		const branchName = (customer.branchName || "").toUpperCase();
		const dob = (customer.dob || "").toUpperCase();
		const nomineeName = (customer.nomineeName || "").toUpperCase();
		const customerAddress = (customer.customerAddress || "").toUpperCase();
		const contactNo = (customer.contactNo || "").toUpperCase();
		const aadharNo = (customer.aadharNo || "").toUpperCase();
		const panNo = (customer.panNo || "").toUpperCase();
		const signupDate = (customer.signupDate || "").toUpperCase();
		const approved = customer.approved ? "YES" : "NO";
		let fullName = [
			customer.firstName,
			customer.middleName,
			customer.lastName
		].filter(Boolean).join(" ");
		tbody.append(`
	        <tr>
	            <td>${(i + 1).toString().toUpperCase()}</td>
	            <td>${memberCode}</td>
	            <td>${fullName.toUpperCase()}</td>
	            <td>${branchName}</td>
	            <td>${dob}</td>
	            <td>${nomineeName}</td>
	            <td>${customerAddress}</td>
	            <td>${contactNo}</td>
	            <td>${aadharNo}</td>
	            <td>${panNo}</td>
	            <td>${signupDate}</td>
	            <td>${approved}</td>
	            <td>
	                <button class="btn btn-outline-success btn-sm bankReportBtn"
	                    data-id="${customer.id}"
	                    data-bs-toggle="modal"
	                    data-bs-target="#bankReportModal"
	                    title="View Report">
	                    <i class="bi bi-printer"></i>
	                </button>
	            </td>
	        </tr>
	    `);
	});


	bindModalEvents();
}


$(document).ready(function() {
	$("#searchBtn").on("click", function(e) {
		e.preventDefault();

		const selectedBranch = $("#branchName").val();
		const fromDate = $("#fromDate").val();
		const toDate = $("#toDate").val();

		if (!selectedBranch || !fromDate || !toDate) {
			alert("Please select Branch, From Date, and To Date.");
			return;
		}

		const from = new Date(fromDate);
		const to = new Date(toDate);

		const filtered = allCustomers.filter(c => {
			if (!c.branchName || !c.signupDate) return false;

			const regDate = new Date(c.signupDate);
			return (
				c.branchName === selectedBranch &&
				regDate >= from &&
				regDate <= to
			);
		});

		populateTable(filtered);
	});

});

document.getElementById("downloadPDF").addEventListener("click", function() {
	alert("pdf");

	const content = document.getElementById("bankReportContent").cloneNode(true);

	// Remove all images
	content.querySelectorAll("img").forEach(img => img.remove());

	const { jsPDF } = window.jspdf;
	const doc = new jsPDF("p", "pt", "a4");

	doc.html(content, {
		callback: function(doc) {

			// OPEN PDF IN NEW TAB (Browser will show Save / Download Dialog)
			window.open(doc.output("bloburl"), "_blank");

		},
		x: 20,
		y: 20,
		html2canvas: {
			scale: 0.9
		}
	});
});

function bindModalEvents() {
	$(".bankReportBtn").off("click").on("click", function() {

		const id = $(this).data("id");
		const customer = allCustomers.find(c => c.id === id);

		if (!customer) {
			alert("Customer not found!");
			return;
		}

		// ===== COMPANY HEADING (FROM OTHER API) =====
		if (companyDetails) {
			$("#bankName").text(companyDetails.companyName || "N/A");
			$("#reportTitle").text(companyDetails.shortName || "CUSTOMER PROFILE");
			$("#signupDate").text(companyDetails.signUpDate || "N/A");
		} else {
			$("#bankName").text("COMPANY NAME");
			$("#reportTitle").text("CUSTOMER PROFILE");
		}

		// ===== CUSTOMER HEADER =====
		$("#customerCode").text(customer.memberCode || "N/A");

		// ===== FULL NAME =====
		const fullName = [
			customer.firstName,
			customer.middleName,
			customer.lastName
		].filter(Boolean).join(" ");

		// ===== CUSTOMER INFO =====
		$("#customerName").text(fullName || "N/A");
		$("#gender").text(customer.customerGender || "N/A");
		$("#dob").text(customer.dob || "N/A");
		$("#age").text(customer.customerAge || "N/A");
		$("#maritalStatus").text(customer.relationshipStatus || "N/A");

		// ===== CONTACT =====
		$("#contactNo").text(customer.contactNo || "N/A");
		$("#email").text(customer.emailId || "N/A");
		$("#address").text(customer.customerAddress || "N/A");
		$("#state").text(customer.state || "N/A");
		$("#district").text(customer.district || "N/A");
		$("#pincode").text(customer.pinCode || "N/A");

		// ===== KYC =====
		$("#aadhar").text(customer.aadharNo || "N/A");
		$("#pan").text(customer.panNo || "N/A");
		$("#voter").text(customer.voterNo || "N/A");
		$("#driving").text(customer.drivingLicenceNo || "N/A");

		// ===== PHOTO & SIGN =====
		let basePath = window.location.origin + "/Uploads/";
		$("#photoPreview").attr("src",
			customer.customerPhoto ? basePath + customer.customerPhoto : "https://via.placeholder.com/120"
		);
		$("#signaturePreview").attr("src",
			customer.customerSignature ? basePath + customer.customerSignature : "https://via.placeholder.com/120x60"
		);

		$('#bankReportModal').modal('show');

	});
}


// 🔥 UPPERCASE ENTIRE MODAL CONTENT (EXCLUDE IMAGES)
$("#bankReportModal").off("shown.bs.modal").on("shown.bs.modal", function() {
	$(this).find("th, td:not([id^='photo'], [id^='signature']), h6, .text-primary, .text-secondary, p").each(function() {
		if (this.tagName !== "IMG" && $(this).text().trim()) {
			let text = $(this).text();
			$(this).text(text.toUpperCase());
		}
	});
});

