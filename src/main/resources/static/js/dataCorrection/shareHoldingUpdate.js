$(document).ready(function () {

	/* -------------------------------
	   FETCH COMPANY ADMINISTRATION
	--------------------------------*/
	function loadCompanyAdministration() {
		$.ajax({
			type: "GET",
			url: "api/preference/fetchAllCompanyAdministration",
			contentType: "application/json",
			success: function (response) {
				if ((response.status === "FOUND" || response.status === "OK" || response.status == 200) && response.data && response.data.length > 0) {
					let c = response.data[0];
					window.companyData = c;

					$("#companyNameHeading").text(((c.companyName || "") + " (" + (c.shortName || "") + ")").toUpperCase());
					$("#companyDetails").html(`
                        <b>SIGN UP DATE:</b> ${(c.signUpDate || "").toUpperCase()} <br>
                        <b>CIN NO:</b> ${(c.cinNo || "").toUpperCase()} <br>
                        <b>ADDRESS:</b> ${(c.address || "").toUpperCase()}, ${(c.city || "").toUpperCase()}, ${(c.state || "").toUpperCase()} - ${c.pinCode || ""} <br>
                        <b>EMAIL:</b> ${(c.emailId || "").toUpperCase()} <br>
                        <b>HELPLINE:</b> ${(c.helplineNo || "").toUpperCase()} <br>
                        <b>BRANCH MANAGER NO:</b> ${(c.branchManagerContactNo || "").toUpperCase()}
                    `);
				}
			},
			error: function (xhr) {
				console.error("FAILED TO LOAD COMPANY DETAILS:", xhr);
			}
		});
	}

	loadCompanyAdministration();

	/* -------------------------------
	   FETCH BRANCH MODULES
	--------------------------------*/
	function loadBranchModules() {
		$.ajax({
			url: "api/preference/getAllBranchModule",
			type: "GET",
			success: function (response) {
				if ((response.status === "OK" || response.status === "FOUND" || response.status == 200) && Array.isArray(response.data)) {
					const branchList = response.data;
					$("#branchName").empty().append("<option value=''>-- SELECT BRANCH --</option>");
					branchList.forEach(branch => {
						if (branch && branch.branchName) {
							const bName = branch.branchName.toUpperCase();
							$("#branchName").append(`<option value="${bName}">${bName}</option>`);
						}
					});
				}
			},
			error: function (xhr) {
				console.error("FAILED TO LOAD BRANCH DATA:", xhr);
			}
		});
	}

	loadBranchModules();

	/* -------------------------------
	   FETCH ALL TRANSFER SHARES FOR SELECT2
	--------------------------------*/
	$.ajax({
		url: 'api/customershareholdingcontroller/findAllTransferShare',
		type: 'GET',
		success: function (response) {
			if ((response.status === "OK" || response.status === "FOUND" || response.status == 200) && Array.isArray(response.data)) {
				let transferOptions = response.data.map(function (item) {
					return {
						id: item.findByCode,
						text: ((item.findByCode || "") + " - " + (item.customerName || "")).toUpperCase()
					};
				});

				$('#findByCode').select2({
					placeholder: '-- SEARCH CUSTOMER CODE OR NAME --',
					data: transferOptions,
					matcher: function (params, data) {
						if ($.trim(params.term) === '') return data;
						if (typeof data.text === 'undefined') return null;

						const term = params.term.toLowerCase();
						const text = data.text.toLowerCase();

						return text.includes(term) ? data : null;
					}
				});

			} else {
				console.warn("NO CUSTOMER CODES FOUND.");
			}
		},
		error: function () {
			console.error("FAILED TO LOAD CUSTOMER CODES.");
		}
	});

	/* -------------------------------
	   SELECT CUSTOMER (FIND BY CODE)
	--------------------------------*/
	$("#findByCode").change(function () {
		let findByCode = $("#findByCode").val();
		if (!findByCode) return;

		$.ajax({
			type: "POST",
			url: "api/customershareholdingcontroller/fetchByFindByCode",
			data: { findByCode: findByCode },
			success: function (response) {
				if ((response.status === "FOUND" || response.status === "OK" || response.status == 200) && response.data && response.data.length > 0) {
					let data = response.data[0];

					$("#id").val(data.id);
					$("#customerName").val((data.customerName || "").toUpperCase());
					$("#startDate").val(data.startDate);
					$("#previousAccountBalance").val(data.previousAccountBalance);
					$("#previousShareCount").val(data.previousShareCount);
					$("#baseValue").val(data.baseValue);
					$("#certificateNo").val((data.certificateNo || "").toUpperCase());

					// Branch selection
					if (data.branch) {
						let bVal = data.branch.toUpperCase();
						let found = false;
						$("#branchName option").each(function () {
							if ($(this).val().toUpperCase() === bVal) {
								found = true;
								$(this).prop("selected", true);
							}
						});
						if (!found) {
							$("#branchName").append(new Option(bVal, bVal, true, true));
						}
					}

					$("#dateOfTransfer").val(data.dateOfTransfer);

					// Shares issued by selection
					if (data.shareIssuedBy) {
						let sibVal = data.shareIssuedBy.toUpperCase();
						let found = false;
						$("#shareIssuedBy option").each(function () {
							if ($(this).val().toUpperCase() === sibVal) {
								found = true;
								$(this).prop("selected", true);
							}
						});
						if (!found) {
							$("#shareIssuedBy").append(new Option(sibVal, sibVal, true, true));
						}
					}

					$("#noOfShare").val(data.noOfShare);
					$("#amountTransferred").val(data.amountTransferred);
					$("#balanceShares").val(data.balanceShares);

					// Mode of payment selection
					if (data.modeOfPayment) {
						let mopVal = data.modeOfPayment.toUpperCase();
						let found = false;
						$("#modeOfPayment option").each(function () {
							if ($(this).val().toUpperCase() === mopVal) {
								found = true;
								$(this).prop("selected", true);
							}
						});
						if (!found) {
							$("#modeOfPayment").append(new Option(mopVal, mopVal, true, true));
						}
					}

					$("#comments").val((data.comments || "").toUpperCase());

				} else {
					alert("TRANSFER SHARE DETAILS NOT FOUND FOR CUSTOMER");
				}
			},
			error: function () {
				alert("SHARES NOT FOUND OR SERVER ERROR");
			}
		});
	});

	/* -------------------------------
	   UPDATE BUTTON
	--------------------------------*/
	$('#updateBtn').click(function (e) {
		e.preventDefault();

		let findByCode = $('#findByCode').val();
		if (!findByCode) {
			alert("PLEASE SELECT A CUSTOMER RECORD FIRST!");
			return;
		}

		let transferData = {
			id: $('#id').val(),
			findByCode: $('#findByCode').val(),
			customerName: ($('#customerName').val() || "").toUpperCase(),
			startDate: $('#startDate').val(),
			previousAccountBalance: $('#previousAccountBalance').val(),
			previousShareCount: $('#previousShareCount').val(),
			baseValue: $('#baseValue').val(),
			certificateNo: ($('#certificateNo').val() || "").toUpperCase(),
			branch: ($('#branchName').val() || "").toUpperCase(),
			dateOfTransfer: $('#dateOfTransfer').val(),
			shareIssuedBy: ($('#shareIssuedBy').val() || "").toUpperCase(),
			noOfShare: $('#noOfShare').val(),
			amountTransferred: $('#amountTransferred').val(),
			balanceShares: $('#balanceShares').val(),
			modeOfPayment: ($('#modeOfPayment').val() || "").toUpperCase(),
			comments: ($('#comments').val() || "").toUpperCase()
		};

		$.ajax({
			url: 'api/customershareholdingcontroller/updateTransferShare',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(transferData),
			success: function (response) {
				if (response.status === "FOUND" || response.status === "OK" || response.status == 200) {
					alert("TRANSFER DATA UPDATED SUCCESSFULLY");
					location.reload();
				} else {
					alert("SOMETHING WENT WRONG: " + (response.message || "").toUpperCase());
				}
			},
			error: function (xhr) {
				alert("ERROR WHILE SAVING DATA: " + (xhr.responseText || "").toUpperCase());
			}
		});
	});

	/* -------------------------------
	   DELETE BUTTON
	--------------------------------*/
	$('#deleteBtn').click(function (event) {
		event.preventDefault();
		var id = $("#id").val();
		let findByCode = $("#findByCode").val();

		if (findByCode && id) {
			if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS TRANSFER SHARE DATA OF CUSTOMER?")) {
				$.ajax({
					url: "api/customershareholdingcontroller/deleteTransferShareById",
					type: "POST",
					data: { id: id },
					success: function (response) {
						if (response.status === "OK" || response.status === "FOUND" || response.status == 200) {
							alert("TRANSFER DATA DELETED SUCCESSFULLY");
							location.reload();
						} else {
							alert("DELETE FAILED: " + (response.message || "").toUpperCase());
						}
					},
					error: function () {
						alert("FAILED TO DELETE TRANSFER SHARE DATA.");
					}
				});
			}
		} else {
			alert("FIRST SELECT ANY ONE DATA THEN PROCEED TO DELETE!");
		}
	});

	/* -------------------------------
	   PRINT WITH COMPANY HEADER
	--------------------------------*/
	$("#printBtn").on("click", function () {
		const findByCode = $("#findByCode").val();
		if (!findByCode) {
			alert("PLEASE SELECT ATLEAST ONE DATA THEN PROCEED TO PRINT!");
			return;
		}

		const c = window.companyData || {
			companyName: "MICROFINANCE",
			shortName: "",
			address: "",
			city: "",
			state: "",
			pinCode: "",
			cinNo: "",
			emailId: "",
			helplineNo: ""
		};

		let companyHeader = `
            <h1 style="text-align:center; margin-bottom:0;">${(c.companyName || "").toUpperCase()}</h1>
            <h3 style="text-align:center; margin-top:5px;">(${ (c.shortName || "").toUpperCase() })</h3>
            <p style="text-align:center;">
                ${(c.address || "").toUpperCase()}, ${(c.city || "").toUpperCase()}, ${(c.state || "").toUpperCase()} - ${c.pinCode || ""}<br>
                CIN: ${(c.cinNo || "").toUpperCase()} | EMAIL: ${(c.emailId || "").toUpperCase()} | HELPLINE: ${c.helplineNo || ""}
            </p>
            <hr>
        `;

		function getVal(id) {
			let el = $("#" + id);
			if (el.is("select")) {
				let txt = el.find("option:selected").text();
				if (el.data("select2")) {
					let s2 = el.select2("data");
					if (s2.length > 0) txt = s2[0].text;
				}
				if (id === "findByCode" && txt.includes("-")) {
					txt = txt.split("-")[0].trim();
				}
				return (txt || "").toUpperCase();
			}
			return (el.val() ? el.val() : "").toUpperCase();
		}

		const printContent = `
            ${companyHeader}

            <h2 style="text-align:center;margin-bottom:20px;">CUSTOMER SHAREHOLDING DETAILS</h2>

            <table class="print-table">
                <tr><th>CUSTOMER CODE</th><td>${getVal("findByCode")}</td></tr>
                <tr><th>CUSTOMER NAME</th><td>${getVal("customerName")}</td></tr>
                <tr><th>START DATE</th><td>${getVal("startDate")}</td></tr>
                <tr><th>PREVIOUS ACCOUNT BALANCE</th><td>${getVal("previousAccountBalance")}</td></tr>
                <tr><th>PREVIOUS SHARE COUNT</th><td>${getVal("previousShareCount")}</td></tr>
                <tr><th>BASE VALUE</th><td>${getVal("baseValue")}</td></tr>
                <tr><th>CERTIFICATE NO</th><td>${getVal("certificateNo")}</td></tr>
                <tr><th>BRANCH</th><td>${getVal("branchName")}</td></tr>
                <tr><th>DATE OF TRANSFER</th><td>${getVal("dateOfTransfer")}</td></tr>
                <tr><th>SHARES ISSUED BY</th><td>${getVal("shareIssuedBy")}</td></tr>
                <tr><th>SHARE COUNT</th><td>${getVal("noOfShare")}</td></tr>
                <tr><th>TRANSFER AMOUNT</th><td>${getVal("amountTransferred")}</td></tr>
                <tr><th>BALANCE SHARES</th><td>${getVal("balanceShares")}</td></tr>
                <tr><th>MODE OF PAYMENT</th><td>${getVal("modeOfPayment")}</td></tr>
                <tr><th>COMMENTS</th><td>${getVal("comments")}</td></tr>
            </table>
        `;

		const printWindow = window.open("", "_blank");
		printWindow.document.write(`
            <html>
            <head>
                <title>CUSTOMER DETAILS</title>
                <style>
                    body { font-family: Arial; padding: 25px; text-transform: uppercase; }
                    .print-table { width: 100%; border-collapse: collapse; }
                    .print-table th, .print-table td {
                        padding: 8px; border: 1px solid #ccc; font-size: 14px;
                    }
                    .print-table th { background: #f2f2f2; width:30%; }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);

		printWindow.document.close();

		setTimeout(() => {
			printWindow.focus();
			printWindow.print();
		}, 300);
	});

});
