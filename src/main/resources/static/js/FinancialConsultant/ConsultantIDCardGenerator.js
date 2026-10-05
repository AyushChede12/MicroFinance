$(document).ready(function() {
	const apiUrl = "api/financialconsultant/getAllFinancialConsultantDetails";

	// 1. Render Table
	function renderTable(data) {
		let tableBody = "";
		$.each(data, function(index, item) {
			tableBody += `
				<tr>
					<td>${index + 1}</td>
					<td><input type="checkbox" class="selectCheckbox" data-code="${item.financialCode}"></td>
					<td>${item.financialCode || ''}</td>
					<td>${item.financialName || ''}</td>
					<td>${item.contactNo || ''}</td>
					<td>${item.branchName || ''}</td>
					<td>${item.customerAddress || ''}</td>
					<td>${item.district || ''}</td>
					<td>${item.state || ''}</td>
					<td>${item.pinCode || ''}</td>
					<td>${item.profession || ''}</td>
					<td>${item.selectPosition || ''}</td>
					<td>
						<button class="iconbutton generateBtn" data-code="${item.financialCode}" title="Generate">
							<i class="fa-solid fa-id-card text-success"></i>
						</button>
					</td>
				</tr>`;
		});
		$("table tbody").html(tableBody);
	}

	// 2. Fetch and Filter Data
	function fetchAndFilter(keyword = "") {
		$.ajax({
			url: apiUrl,
			type: "POST",
			contentType: "application/json",
			success: function(response) {
				let data = response.data || [];
				if (keyword) {
					keyword = keyword.toUpperCase();
					data = data.filter(c => c.financialCode && c.financialCode.toUpperCase().includes(keyword));
				}
				renderTable(data);
			},
			error: function() {
				alert("Error fetching data.");
			}
		});
	}

	// 3. Live Search
	$("#searchKeyword").on("input", function() {
		let keyword = $(this).val();
		fetchAndFilter(keyword);
	});

	// 4. Initial Load
	fetchAndFilter();

	// 5. On Generate Button Click
	$(document).on('click', '.generateBtn', function() {
		const financialCode = $(this).data('code');
		const checkbox = $(`.selectCheckbox[data-code="${financialCode}"]`);

		if (checkbox.is(':checked')) {
			window.location.href = `/IDCardFinancial?financialCode=${financialCode}`;
		} else {
			alert("Please check the checkbox to generate the ID card.");
		}
	});

	// 6. ID CARD PAGE - ONLY FINANCIAL CODE SPAN FILL
	const urlParams = new URLSearchParams(window.location.search);
	const finCode = urlParams.get('financialCode');

	if (finCode) {
		$.ajax({
			url: `api/financialconsultant/getfinancialHierarchyByFinancialCode?financialCode=${finCode}`,
			type: "GET",
			success: function(response) {
				console.log("API response:", response)
				const data = response.data?.[0]; // using optional chaining for safety
				if (data) {
					$("#financialCode").text(data.financialCode || '—');
					$("#financialName").text(data.financialName || '—');
					$("#dob").text(data.dob || '—');
					$("#age").text(data.age || '—');
					$("#contactNo").text(data.contactNo || '—');
					$("#district").text(data.district || '—');
					$("#branchName").text(data.branchName || '—');
					if (data.financialPhoto) {
						const img = `Uploads/${data.financialPhoto}`;
						$("#idCardPhoto").attr("src", img);
						$("#photoHidden").val(img);
					}
					if (data.finnacialSignature) {
						const img = `Uploads/${data.finnacialSignature}`;
						$("#idCardSignature").attr("src", img);
						$("#signatureHidden").val(img);
					}

				} else {
					$("#financialCode").text('—');
				}
			},
			error: function() {
				alert("Could not load financialCode.");
			}
		});
	}
});
