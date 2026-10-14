$(document).ready(function() {
	$("#saveCustomerCode").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name Customer"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix Customer"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix Customer"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No.of Digit Customer"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No Customer"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview Customer"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ CUSTOMER CODE SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});

	$("#saveFinancialCode").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name Financial"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix Financial"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix Financial"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No.of Digit Financial"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No Financial"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview Financial"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ FINANCIAL CODE SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});

	$("#saveTeamMemberCode").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name Team"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix Team"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix Team"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No.of Digit Team"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No Team"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview Team"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ TEAM MEMBER CODE SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});

	$("#saveRDPolicyNo").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name RD"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix RD"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix RD"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No.of Digit RD"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No RD"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview RD"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ RD POLICY NO SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});

	$("#saveFDPolicyNo").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name FD"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix FD"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix FD"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No.of Digit FD"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No FD"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview FD"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ FD POLICY NO SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});

	$("#saveDDPolicyNo").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name DD"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix DD"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix DD"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No.of Digit DD"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No DD"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview DD"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ DD POLICY NO SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});

	$("#saveMISPolicyNo").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name MIS"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix MIS"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix MIS"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No. of Digit MIS"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No MIS"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview MIS"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ MIS POLICY NO SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});

	$("#saveSavingACCNo").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name ACC"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix ACC"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix ACC"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No. of Digit ACC"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No ACC"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview ACC"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ SAVING ACCOUNT NO SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});

	$("#saveLoanID").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name LOAN"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix LOAN"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix LOAN"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No. of Digit LOAN"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No LOAN"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview LOAN"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ LOAN ID SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});

	$("#saveGroupCode").click(function() {
		const $row = $(this).closest("tr");

		const id = $row.data("id") || null;
		const name = $row.find('td[data-label="Name GROUP"]').text().trim();
		const branchPrefix = $row.find('td[data-label="Branch Prefix GROUP"] input[type="checkbox"]').is(":checked");
		const codePrefix = $row.find('td[data-label="Code Prefix GROUP"] input').val().trim();
		const noOfDigit = parseInt($row.find('td[data-label="No. of Digit GROUP"] input').val());
		const lastNo = parseInt($row.find('td[data-label="Last No GROUP"] input').val());

		// Simple validation
		if (isNaN(noOfDigit) || isNaN(lastNo) || !codePrefix) {
			alert("⚠️ PLEASE ENSURE CODE PREFIX, NO. OF DIGIT, AND LAST NO. ARE CORRECTLY FILLED.");
			return;
		}

		const data = {
			id: id,
			name: name,
			branchPrefix: branchPrefix,
			codePrefix: codePrefix,
			noOfDigit: noOfDigit,
			lastNo: lastNo
		};

		$.ajax({
			url: "api/preference/saveOrUpdateCodeModules",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				const preview = response.data.preview;
				$row.find('td[data-label="Preview GROUP"] input').val(preview);
				$row.attr("data-id", response.data.id); // Save ID in case it was a new entry
				alert("✅ GROUP CODE SAVED SUCCESSFULLY FOR CODE MODULE!");
			},
			error: function(xhr) {
				const msg = xhr.responseJSON?.message || "SOMETHING WENT WRONG!";
				alert("❌ " + msg);
			}
		});
	});
});

document.addEventListener("DOMContentLoaded", function() {
	document.querySelectorAll("tr").forEach(function(row) {
		let label = row.querySelector("td:first-child")?.innerText.trim();

		if (label) {
			// 🔹 Get initials (first letters of each word)
			let initials = label.split(" ")
				.map(word => word.charAt(0).toUpperCase())
				.join("");

			// Inputs in the row
			let prefixInput = row.querySelector('input[type="text"].ip-center');   // Code Prefix
			let digitInput = row.querySelector('input[type="number"]:nth-of-type(1)'); // No. of digits
			let lastNoInput = row.querySelector('input[type="number"]:nth-of-type(2)'); // Last no
			let previewInput = row.querySelectorAll('input[type="text"].ip-center')[1]; // Preview

			if (prefixInput) prefixInput.value = initials;

			// Function to update preview
			function updatePreview() {
				let prefix = prefixInput.value || "";
				let digits = parseInt(digitInput?.value) || 0;
				let lastNo = parseInt(lastNoInput?.value) || 0;
				let padded = lastNo.toString().padStart(digits, "0");
				if (previewInput) previewInput.value = prefix + padded;
			}

			// Run once initially
			updatePreview();

			// Update live on changes
			[prefixInput, digitInput, lastNoInput].forEach(el => {
				if (el) el.addEventListener("input", updatePreview);
			});
		}
	});
});