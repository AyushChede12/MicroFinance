$(document).ready(function() {

    // =====================================================
    // INITIAL UI STATE
    // =====================================================

    $("#statementSection").hide();

    // =====================================================
    // LOAD COMPANY DETAILS
    // =====================================================

    loadCompanyDetails();

    // =====================================================
    // LOAD SAVING ACCOUNT NUMBERS
    // =====================================================

    loadSavingAccounts();

    // =====================================================
    // SEARCH BUTTON CLICK
    // =====================================================

    $("#searchbtn").click(function(e) {
        e.preventDefault();
        searchStatement();
    });

    // =====================================================
    // CLEAR BUTTON
    // =====================================================

    $("#clearbtn").click(function(e) {
        e.preventDefault();
        clearStatement();
    });

    // =====================================================
    // ACCOUNT CHANGE
    // =====================================================

    $("#accountNumber").change(function() {
        $("#statementSection").hide();
        $(".datatable tbody").empty();
    });

});


// =========================================================
// LOAD COMPANY DETAILS
// =========================================================

function loadCompanyDetails() {

    $.ajax({
        url: "api/preference/getCompanyDetails",
        type: "GET",
        dataType: "json",

        success: function(response) {

            console.log("Company Details:", response);

            // COMPANY NAME
            $("#companyName").text(
                response.companyName || "Company Name"
            );

            // GST NUMBER
            $("#companyGST").text(
                response.gstNumber ||
                response.gstin ||
                response.GSTNumber ||
                "-"
            );

            // COMPANY ADDRESS
            $("#companyAddress").text(
                response.address ||
                response.companyAddress ||
                "-"
            );

            // CONTACT NUMBER
            $("#companyContact").text(
                response.contactNo ||
                response.branchManagerContactNo ||
                response.mobileNo ||
                "-"
            );

            // EMAIL
            $("#companyEmail").text(
                response.email ||
                response.emailId ||
                "-"
            );

            // WEBSITE
            /*$("#companyWebsite").text(
                response.website ||
                response.webSite ||
                "-"
            );*/

            // OPTIONAL COMPANY LOGO
            /*
             * Agar CompanyAdministration mein logo/image
             * ka URL available hai to yahan use kar sakte ho.
             *
             * Example:
             * response.logo
             * response.companyLogo
             */

            if (response.logo) {

                $("#companyLogo")
                    .attr("src", response.logo)
                    .show();

            } else if (response.companyLogo) {

                $("#companyLogo")
                    .attr("src", response.companyLogo)
                    .show();

            } else {

                $("#companyLogo").hide();
            }

        },

        error: function(xhr) {

            console.error(
                "COMPANY DETAILS ERROR:",
                xhr.responseText
            );

            $("#companyName").text("Company Name");
            $("#companyGST").text("-");
            $("#companyAddress").text("-");
            $("#companyContact").text("-");
            $("#companyEmail").text("-");

            $("#companyLogo").hide();
        }
    });
}


// =========================================================
// LOAD SAVING ACCOUNTS
// =========================================================

function loadSavingAccounts() {

    $.ajax({
        url: "api/customersavings/getAllSavingAccountData",
        type: "GET",
        dataType: "json",

        success: function(response) {

            let dropdown = $("#accountNumber");

            dropdown.empty();

            dropdown.append(
                '<option value="">-- SELECT ACCOUNT NUMBER --</option>'
            );

            if (
                (response.status === "OK" ||
                    response.status === "FOUND") &&
                response.data &&
                response.data.length > 0
            ) {

                $.each(response.data, function(index, acc) {

                    if (acc.accountNumber) {

                        dropdown.append(`
                            <option value="${escapeHtml(
                                acc.accountNumber
                            )}">
                                ${escapeHtml(
                                    acc.accountNumber
                                )}
                            </option>
                        `);
                    }

                });

            } else {

                dropdown.append(
                    '<option value="">NO SAVING ACCOUNT FOUND</option>'
                );

                console.warn(
                    "NO SAVING ACCOUNT FOUND"
                );
            }
        },

        error: function(xhr) {

            console.error(
                "ACCOUNT DROPDOWN ERROR:",
                xhr.responseText
            );

            alert(
                "UNABLE TO LOAD SAVING ACCOUNT NUMBERS"
            );
        }
    });
}


// =========================================================
// SEARCH BANK STATEMENT
// =========================================================

function searchStatement() {

    let accountNumber = $("#accountNumber").val();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!accountNumber) {

        alert("PLEASE SELECT ACCOUNT NUMBER");

        $("#accountNumber").focus();

        return;
    }

    if (!startDate) {

        alert("PLEASE SELECT START DATE");

        $("#startDate").focus();

        return;
    }

    if (!endDate) {

        alert("PLEASE SELECT END DATE");

        $("#endDate").focus();

        return;
    }

    if (startDate > endDate) {

        alert(
            "START DATE CANNOT BE GREATER THAN END DATE"
        );

        $("#startDate").focus();

        return;
    }

    // =====================================================
    // SEARCH BUTTON LOADING
    // =====================================================

    let searchButton = $("#searchbtn");

    let originalButtonText =
        searchButton.html();

    searchButton
        .prop("disabled", true)
        .html(
            '<i class="fa fa-spinner fa-spin"></i> GENERATING STATEMENT...'
        );

    // =====================================================
    // CLEAR OLD DATA
    // =====================================================

    $(".datatable tbody").empty();

    $("#statementSection").hide();

    // =====================================================
    // BANK STATEMENT API
    // =====================================================

    $.ajax({

        url: "accountManagement/bank-statement",

        type: "GET",

        dataType: "json",

        data: {
            accountNumber: accountNumber,
            startDate: startDate,
            endDate: endDate
        },

        success: function(response) {

            let tbody =
                $(".datatable tbody");

            tbody.empty();

            // =================================================
            // NO DATA CASE
            // =================================================

            if (
                response.status === "NOT_FOUND" ||
                !response.data ||
                response.data.length === 0
            ) {

                $("#statementSection").show();

                // ACCOUNT DETAILS

                $("#statementBankName").text("-");

                $("#statementBranchName").text("-");

                $("#statementAccountNumber")
                    .text(accountNumber);

                $("#statementStartDate")
                    .text(formatDate(startDate));

                $("#statementEndDate")
                    .text(formatDate(endDate));

                // BALANCES

                $("#openingBalance")
                    .text("₹ 0.00");

                $("#closingBalance")
                    .text("₹ 0.00");

                $("#totalCredit")
                    .text("₹ 0.00");

                $("#totalDebit")
                    .text("₹ 0.00");

                // NO TRANSACTION MESSAGE

                tbody.html(`
                    <tr>
                        <td colspan="8"
                            class="text-center"
                            style="
                                padding:30px;
                                font-size:16px;
                                color:#6c757d;
                            ">

                            <i class="fa fa-info-circle"></i>

                            ${escapeHtml(
                                response.message ||
                                "NO TRANSACTIONS FOUND FOR SELECTED PERIOD"
                            )}

                        </td>
                    </tr>
                `);

                return;
            }

            // =================================================
            // GET STATEMENT DATA
            // =================================================

            let data = response.data;

            let firstTransaction = data[0];

            let lastTransaction =
                data[data.length - 1];

            // =================================================
            // BANK / ACCOUNT DETAILS
            // =================================================

            $("#statementBankName").text(
                firstTransaction.bankName || "-"
            );

            $("#statementBranchName").text(
                firstTransaction.branchName || "-"
            );

            $("#statementAccountNumber").text(
                firstTransaction.accountNumber ||
                accountNumber
            );

            $("#statementStartDate").text(
                formatDate(startDate)
            );

            $("#statementEndDate").text(
                formatDate(endDate)
            );

            // =================================================
            // OPENING BALANCE
            // =================================================

            let openingBalance =
                Number(
                    firstTransaction.openingBalance || 0
                );

            $("#openingBalance").text(
                "₹ " +
                formatAmount(openingBalance)
            );

            // =================================================
            // TOTAL CREDIT / DEBIT
            // =================================================

            let totalCredit = 0;

            let totalDebit = 0;

            $.each(data, function(index, txn) {

                totalCredit +=
                    Number(txn.credit || 0);

                totalDebit +=
                    Number(txn.debit || 0);

            });

            $("#totalCredit").text(
                "₹ " +
                formatAmount(totalCredit)
            );

            $("#totalDebit").text(
                "₹ " +
                formatAmount(totalDebit)
            );

            // =================================================
            // CLOSING BALANCE
            // =================================================

            let closingBalance =
                Number(
                    lastTransaction.closingBalance ||
                    lastTransaction.balance ||
                    0
                );

            $("#closingBalance").text(
                "₹ " +
                formatAmount(closingBalance)
            );

            // =================================================
            // GENERATION DATE/TIME
            // =================================================

            $("#generatedDate").text(
                new Date().toLocaleString("en-IN")
            );

            // =================================================
            // SHOW STATEMENT
            // =================================================

            $("#statementSection").show();

            // =================================================
            // TRANSACTION TABLE
            // =================================================

            $.each(data, function(index, txn) {

                let creditAmount =
                    Number(txn.credit || 0);

                let debitAmount =
                    Number(txn.debit || 0);

                let balanceAmount =
                    Number(txn.balance || 0);

                let transactionType =
                    txn.transactionType || "-";

                let transactionBadge =
                    getTransactionBadge(
                        transactionType
                    );

                let row = `
                    <tr>

                        <!-- S.NO -->
                        <td class="text-center">
                            ${index + 1}
                        </td>

                        <!-- DATE -->
                        <td class="text-center">
                            ${formatDate(txn.date)}
                        </td>

                        <!-- NARRATION -->
                        <td class="text-center">
                            ${escapeHtml(
                                txn.narration.toUpperCase() || "-"
                            )}
                        </td>

                        <!-- REFERENCE NUMBER -->
                        <td class="text-center">
                            ${escapeHtml(
                                txn.referenceNo.toUpperCase() || "-"
                            )}
                        </td>

                        <!-- CREDIT -->
                        <td class="text-center">
                            ${creditAmount > 0
                                ? "₹ " +
                                formatAmount(
                                    creditAmount
                                )
                                : "-"
                            }
                        </td>

                        <!-- DEBIT -->
                        <td class="text-center">
                            ${debitAmount > 0
                                ? "₹ " +
                                formatAmount(
                                    debitAmount
                                )
                                : "-"
                            }
                        </td>

                        <!-- RUNNING BALANCE -->
                        <td class="text-center">
                            ₹
                            ${formatAmount(
                                balanceAmount
                            )}
                        </td>

                    </tr>
                `;

                tbody.append(row);

            });

            // =================================================
            // SCROLL TO STATEMENT
            // =================================================

            $("html, body").animate({

                scrollTop:
                    $("#statementSection")
                        .offset()
                        .top - 80

            }, 500);

        },

        // =====================================================
        // ERROR
        // =====================================================

        error: function(xhr) {

            console.error(
                "ERROR FETCHING BANK STATEMENT:",
                xhr.responseText
            );

            let message =
                "UNABLE TO GENERATE BANK STATEMENT";

            if (
                xhr.responseJSON &&
                xhr.responseJSON.message
            ) {

                message =
                    xhr.responseJSON.message.toUpperCase();
            }

            alert(message);

            $("#statementSection").show();

            $(".datatable tbody").html(`

                <tr>

                    <td colspan="8"
                        class="text-center"
                        style="
                            color:red;
                            padding:25px;
                        ">

                        <i class="fa fa-exclamation-triangle"></i>

                        ${escapeHtml(message)}

                    </td>

                </tr>

            `);
        },

        // =====================================================
        // COMPLETE
        // =====================================================

        complete: function() {

            searchButton
                .prop("disabled", false)
                .html(originalButtonText);
        }

    });
}


// =========================================================
// FORMAT AMOUNT
// =========================================================

function formatAmount(amount) {

    return Number(amount || 0).toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
}


// =========================================================
// FORMAT DATE
// =========================================================

function formatDate(dateValue) {

    if (!dateValue) {

        return "-";
    }

    let parts =
        dateValue.split("-");

    if (parts.length === 3) {

        return (
            parts[2] +
            "-" +
            parts[1] +
            "-" +
            parts[0]
        );
    }

    return dateValue;
}


// =========================================================
// TRANSACTION TYPE BADGE
// =========================================================

function getTransactionBadge(transactionType) {

    if (!transactionType) {

        return "-";
    }

    let type =
        transactionType.toUpperCase();

    if (
        type === "DEPOSIT" ||
        type === "CREDIT"
    ) {

        return `
            <span class="badge bg-success">
                ${escapeHtml(transactionType.toUpperCase())}
            </span>
        `;
    }

    if (
        type === "WITHDRAW" ||
        type === "DEBIT"
    ) {

        return `
            <span class="badge bg-danger">
                ${escapeHtml(transactionType.toUpperCase())}
            </span>
        `;
    }

    return `
        <span class="badge bg-secondary">
            ${escapeHtml(transactionType.toUpperCase())}
        </span>
    `;
}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "-";
    }

    return $("<div>")
        .text(value)
        .html();
}


// =========================================================
// CLEAR STATEMENT
// =========================================================

function clearStatement() {

    $("#accountNumber").val("");

    $("#startDate").val("");

    $("#endDate").val("");

    $("#statementSection").hide();

    $(".datatable tbody").empty();

    $("#statementBankName").text("-");

    $("#statementBranchName").text("-");

    $("#statementAccountNumber").text("-");

    $("#statementStartDate").text("-");

    $("#statementEndDate").text("-");

    $("#openingBalance").text("₹ 0.00");

    $("#totalCredit").text("₹ 0.00");

    $("#totalDebit").text("₹ 0.00");

    $("#closingBalance").text("₹ 0.00");
}