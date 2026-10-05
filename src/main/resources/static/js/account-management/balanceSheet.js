$(document).ready(function() {

	// =========================
	// SEARCH BUTTON CLICK
	// =========================
	$("#search").click(function(e) {
		e.preventDefault();

		let branchName = $("#branchName").val();
		let startDate = $("#startDate").val();
		let endDate = $("#endDate").val();

		// =========================
		// VALIDATION
		// =========================
		if (branchName === "") {
			alert("Please Select Branch");
			return;
		}

		if (startDate === "") {
			alert("Please Select Start Date");
			return;
		}

		if (endDate === "") {
			alert("Please Select End Date");
			return;
		}

		// =========================
		// AJAX CALL
		// =========================
		$.ajax({
			url: "accountManagement/balance-sheet",
			type: "GET",
			data: {
				branchName: branchName,
				startDate: startDate,
				endDate: endDate
			},
			beforeSend: function() {
				$("tbody").html(
					'<tr><td colspan="4" class="text-center">Loading...</td></tr>'
				);
			},
			success: function(response) {

				console.log(response);
				if (response.status == "OK") {
					let data = response.data;

					// =========================
					// LABELS SET
					// =========================
					$("label:eq(3)").html("<b>BRANCH:</b> " + data.branchName);

					$("label:eq(4)").html(
						"<b>START FROM:</b> " + data.startDate
					);

					$("label:eq(5)").html(
						"<b>END TO:</b> " + data.endDate
					);

					let liabilities = data.liabilities;
					let assets = data.assets;

					let maxLength = Math.max(liabilities.length, assets.length);

					let tbody = "";

					// =========================
					// DATA ROWS
					// =========================
					for (let i = 0; i < maxLength; i++) {

						let liabilityTitle = "";
						let liabilityAmount = "";

						let assetTitle = "";
						let assetAmount = "";

						// Liabilities
						if (i < liabilities.length) {
							liabilityTitle = liabilities[i].name.toUpperCase();
							liabilityAmount = liabilities[i].amount;
						}

						// Assets
						if (i < assets.length) {
							assetTitle = assets[i].name.toUpperCase();
							assetAmount = assets[i].amount;
						}

						tbody += `
					                        <tr>
					                            <td>${liabilityTitle}</td>
					                            <td>${liabilityAmount}</td>

					                            <td>${assetTitle}</td>
					                            <td>${assetAmount}</td>
					                        </tr>
					                    `;
					}

					// =========================
					// TOTAL ROW
					// =========================
					tbody += `
					                    <tr style="font-weight:bold; background:#f2f2f2;">
					                        <td>TOTAL LIABILITIES</td>
					                        <td>${data.totalLiabilities}</td>

					                        <td>TOTAL ASSETS</td>
					                        <td>${data.totalAssets}</td>
					                    </tr>
					                `;

					$("tbody").html(tbody);
				}


			},

			error: function(xhr) {

				console.log(xhr);

				let errorMessage = "Something went wrong";

				if (xhr.responseJSON &&
					xhr.responseJSON.message) {

					errorMessage = xhr.responseJSON.message;
				}

				$("tbody").html(`
                    <tr>
                        <td colspan="4" class="text-center text-danger">
                            ${errorMessage}
                        </td>
                    </tr>
                `);
			}
		});
	});
});
