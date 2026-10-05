$(document).ready(function() {

	$("#viewBtn").click(function(e) {
		e.preventDefault();
		getTrialBalance();
	});

});


// ================= GET TRIAL BALANCE =================
function getTrialBalance() {

	let branchName = $("#branchName").val();
	let startDate = $("#startDate").val();
	let endDate = $("#endDate").val();

	// ✅ Validation
	if (!branchName || !startDate || !endDate) {
		alert("⚠ Please select all fields");
		return;
	}

	// 🔄 Loader
	$(".datatable tbody").html(`
        <tr>
            <td colspan="7" class="text-center">Loading...</td>
        </tr>
    `);

	$.ajax({
		url: "accountManagement/trial-balance-report",
		type: "GET",
		data: {
			branchName: branchName,
			startDate: startDate,
			endDate: endDate
		},

		success: function(response) {

			if (response.status === "OK") {
				bindTrialTable(response.data, branchName, startDate, endDate);
			} else {
				showNoData(response.message || "No data found");
			}
		},

		error: function(xhr) {
			console.error(xhr);
			showError();
		}
	});
}


// ================= BIND TABLE =================
function bindTrialTable(data, branchName, startDate, endDate) {

	let rows = "";
	let totalDr = 0;
	let totalCr = 0;

	// ✅ Header update
	$("#branchLabel").text($("#branchName option:selected").text());
	$("#dateLabel").text(formatDate(startDate) + " TO " + formatDate(endDate));

	if (!data || data.length === 0) {
		showNoData("No Data Found");
		return;
	}

	data.forEach(function(item) {

		let opening = parseFloat(item.opening || 0);
		let debit = parseFloat(item.debit || 0);
		let credit = parseFloat(item.credit || 0);
		let closing = parseFloat(item.closing || 0); // 🔥 from backend DTO

		// 🔹 Opening Split
		let openingDr = "", openingCr = "";
		if (opening >= 0) openingDr = opening.toFixed(2);
		else openingCr = Math.abs(opening).toFixed(2);

		// 🔹 Closing Split
		let closingDr = "", closingCr = "";
		if (closing >= 0) {
			closingDr = closing.toFixed(2);
			totalDr += closing;
		} else {
			closingCr = Math.abs(closing).toFixed(2);
			totalCr += Math.abs(closing);
		}

		rows += `
            <tr>
                <td style="white-space: nowrap;">${item.ledgerName || '-'}</td>
                <td style="white-space: nowrap;">${openingDr}</td>
                <td style="white-space: nowrap;">${openingCr}</td>
                <td style="white-space: nowrap;">${debit.toFixed(2)}</td>
                <td style="white-space: nowrap;">${credit.toFixed(2)}</td>
                <td style="white-space: nowrap;" class="text-success">${closingDr}</td>
                <td style="white-space: nowrap;" class="text-danger">${closingCr}</td>
            </tr>
        `;
	});

	// 🔥 TOTAL ROW
	rows += `
        <tr style="font-weight:bold; background:#f5f5f5;">
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-end">${totalDr.toFixed(2)}</td>
            <td class="text-end">${totalCr.toFixed(2)}</td>
        </tr>
    `;

	$(".datatable tbody").html(rows);

	// ⚠ Validation
	if (totalDr !== totalCr) {
		alert("⚠ Trial Balance Not Matching!");
	}
}


// ================= HELPERS =================

function showNoData(message) {
	$(".datatable tbody").html(`
        <tr>
            <td colspan="7" class="text-center text-danger">
                ${message}
            </td>
        </tr>
    `);
}

function showError() {
	$(".datatable tbody").html(`
        <tr>
            <td colspan="7" class="text-center text-danger">
                Error fetching data
            </td>
        </tr>
    `);
}

function formatDate(dateStr) {
	let d = new Date(dateStr);
	let day = String(d.getDate()).padStart(2, '0');
	let month = String(d.getMonth() + 1).padStart(2, '0');
	let year = d.getFullYear();
	return `${day}-${month}-${year}`;
}