/* Bank Module frontend.
 * Existing bank APIs retained:
 * POST api/preference/saveAndUpdateAllBankModule
 * GET  api/preference/getAllBankModule
 * GET  api/preference/getBankModuleById?id=
 * POST api/preference/deleteBankModuleById
 *
 * Transaction history requires backend endpoint:
 * GET api/bank-transactions/by-bank?bankId={id}
 */

let bankRows = [];
let bankPage = 1;
const bankPageSize = 10;

let selectedTransactionBankId = null;
let selectedTransactionBankName = "";

// Format amount in Indian currency
function money(value) {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return number.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2
    });
}

// Escape HTML values before displaying them
function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (ch) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[ch];
    });
}

// Cancelled cheque image upload and preview
function photoUpload() {
    const file = document.getElementById("cancelledCheque").files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        document.getElementById("cancelledCheque").value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const preview = document.getElementById("photoPreview");

        preview.src = e.target.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);
}

// Page initialization
$(document).ready(function () {

    $("#updateBtn").hide();
    $("#prevBtn, #nextBtn").hide();
    $("#pageInfo").hide();

    // Save bank
    $("#saveBtn").on("click", function () {

        if (!validateBankForm(false)) {
            return;
        }

        const formData = makeBankFormData(false);

        $.ajax({
            url: "api/preference/saveAndUpdateAllBankModule",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,

            success: function (response) {

                if (
                    response &&
                    (
                        response.status === "OK" ||
                        response.status === "CREATED"
                    )
                ) {
                    alert(response.message || "Bank saved successfully.");

                    clearBankForm();
                    loadBanks();

                } else {
                    alert(
                        "Bank save failed: " +
                        (response?.message || "Unexpected response")
                    );
                }
            },

            error: function (xhr) {
                console.error(xhr.responseText);
                alert("Failed to save bank data.");
            }
        });
    });

    // Previous page
    $("#prevBtn").on("click", function () {

        if (bankPage > 1) {
            bankPage--;
            renderBankTable(bankPage);
        }
    });

    // Next page
    $("#nextBtn").on("click", function () {

        const pages = Math.ceil(bankRows.length / bankPageSize);

        if (bankPage < pages) {
            bankPage++;
            renderBankTable(bankPage);
        }
    });

    // Load bank list
    loadBanks();
});


// Validate bank form
function validateBankForm(isUpdate) {

    const required = [
        ["bankName", "chkbankname", "Bank name is required."],
        ["accountNo", "chkaccountno", "Account number is required."],
        ["ifscCode", "chkifsccode", "IFSC code is required."],
        ["contactNo", "chkcontactno", "Contact number is required."],
        ["openingDate", "chkopeningdate", "Opening date is required."],
        ["openingBalance", "chkopeningbalance", "Opening balance is required."]
    ];

    required.forEach(function ([fieldId, errorId]) {
        $("#" + errorId).text("");
    });

    let valid = true;

    required.forEach(function ([fieldId, errorId, message]) {

        if (!$("#" + fieldId).val().trim()) {
            $("#" + errorId).text(message);
            valid = false;
        }
    });

    // Account number validation
    const accountNo = $("#accountNo").val().trim();

    if (accountNo && !/^[0-9]+$/.test(accountNo)) {
        $("#chkaccountno").text(
            "Account number must contain digits only."
        );

        valid = false;
    }

    // Contact number validation
    const contact = $("#contactNo").val().trim();

    if (contact && !/^[6-9][0-9]{9}$/.test(contact)) {
        $("#chkcontactno").text(
            "Enter a valid 10-digit Indian mobile number."
        );

        valid = false;
    }

    // Opening balance validation
    const openingBalance = $("#openingBalance").val().trim();

    if (
        openingBalance &&
        (
            !Number.isFinite(Number(openingBalance)) ||
            Number(openingBalance) < 0
        )
    ) {
        $("#chkopeningbalance").text(
            "Opening balance must be zero or more."
        );

        valid = false;
    }

    // Closing date validation
    const closingDate = $("#closingDate").val();
    const openingDate = $("#openingDate").val();

    if (
        closingDate &&
        openingDate &&
        closingDate < openingDate
    ) {
        $("#chkclosingdate").text(
            "Closing date cannot be before opening date."
        );

        valid = false;
    }

    // Cancelled cheque validation
    const file = $("#cancelledCheque")[0].files[0];

    if (
        file &&
        (
            !file.type.startsWith("image/") ||
            file.size < 10 * 1024 ||
            file.size > 900 * 1024
        )
    ) {
        $("#chkphoto").text(
            "Cheque image must be an image between 10 KB and 900 KB."
        );

        valid = false;
    }

    if (!isUpdate && !file) {
        $("#chkphoto").text(
            "Please upload the cancelled cheque."
        );

        valid = false;
    }

    return valid;
}


// Create FormData for saving/updating bank
function makeBankFormData(isUpdate) {

    const formData = new FormData();

    if (isUpdate) {
        formData.append("id", $("#id").val());
    }

    [
        "bankName",
        "accountNo",
        "ifscCode",
        "micrCode",
        "contactNo",
        "address",
        "openingDate",
        "openingBalance",
        "closingDate"
    ].forEach(function (id) {

        formData.append(
            id,
            ($("#" + id).val() || "").trim()
        );
    });

    const file = $("#cancelledCheque")[0].files[0];

    if (file) {
        formData.append("cancelledCheque", file);
    }

    return formData;
}


// Load all banks
function loadBanks() {

    $.ajax({
        type: "GET",
        url: "api/preference/getAllBankModule",

        success: function (response) {

            if (
                response &&
                response.status === "FOUND" &&
                Array.isArray(response.data)
            ) {
                bankRows = response.data;

                bankPage = Math.min(
                    bankPage,
                    Math.max(
                        1,
                        Math.ceil(bankRows.length / bankPageSize)
                    )
                );

                renderBankTable(bankPage);
                updateBankSummary();

            } else {

                bankRows = [];

                renderBankTable(1);
                updateBankSummary();

                if (response?.message) {
                    console.warn(response.message);
                }
            }
        },

        error: function (xhr) {
            console.error(
                "Failed to fetch banks",
                xhr.responseText
            );

            alert("Error while loading bank data.");
        }
    });
}


// Read current balance from backend response
function getCurrentBalance(bank) {

    if (
        bank.currentBalance === null ||
        bank.currentBalance === undefined ||
        bank.currentBalance === ""
    ) {
        return null;
    }

    const amount = Number(bank.currentBalance);

    return Number.isFinite(amount) ? amount : null;
}


// Render bank table
function renderBankTable(page) {

    const $body = $("#bankTableBody");

    $body.empty();

    const start = (page - 1) * bankPageSize;

    const pageRows = bankRows.slice(
        start,
        start + bankPageSize
    );

    pageRows.forEach(function (bank, index) {

        const cheque = bank.cancelledCheque
            ? `Uploads/${encodeURIComponent(bank.cancelledCheque)}`
            : "";

        const currentBalance = getCurrentBalance(bank);

        const chequeCell = cheque
            ? `
                <img
                    src="${cheque}"
                    alt="Cheque"
                    class="cheque-thumb"
                    onclick="showChequePreview('${cheque}')"
                >
              `
            : "—";

        const safeBankName = escapeHtml(
            String(bank.bankName || "")
        ).replace(/'/g, "\\'");

        const row = `
            <tr>
                <td>${start + index + 1}</td>

                <td>${escapeHtml(bank.bankName)}</td>

                <td>${escapeHtml(bank.accountNo)}</td>

                <td>${escapeHtml(bank.ifscCode)}</td>

                <td>${escapeHtml(bank.micrCode)}</td>

                <td>${escapeHtml(bank.contactNo)}</td>

                <td>${escapeHtml(bank.address)}</td>

                <td>${escapeHtml(bank.openingDate)}</td>

                <td>${money(bank.openingBalance)}</td>

                <td>
                    ${
                        currentBalance === null
                            ? '<span class="text-muted">Not provided by API</span>'
                            : money(currentBalance)
                    }
                </td>

                <td>${escapeHtml(bank.closingDate)}</td>

                <td>${chequeCell}</td>

                <td>
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        onclick="openBankTransactions(
                            ${Number(bank.id)},
                            '${safeBankName}'
                        )"
                    >
                        View
                    </button>
                </td>

                <td>
                    <button
                        type="button"
                        class="iconbutton"
                        onclick="viewData(${Number(bank.id)})"
                        title="EDIT"
                    >
                        <i class="fa-solid fa-pen-to-square text-primary"></i>
                    </button>
                </td>

                <td>
                    <button
                        type="button"
                        class="iconbutton"
                        onclick="deleteData(${Number(bank.id)})"
                        title="DELETE"
                    >
                        <i class="fa-solid fa-trash text-danger"></i>
                    </button>
                </td>
            </tr>
        `;

        $body.append(row);
    });

    const totalPages = Math.ceil(
        bankRows.length / bankPageSize
    );

    $("#pageInfo").text(
        `PAGE ${bankRows.length ? page : 0} OF ${totalPages}`
    );

    $("#prevBtn").prop("disabled", page <= 1);

    $("#nextBtn").prop("disabled", page >= totalPages);

    $("#prevBtn, #nextBtn, #pageInfo").toggle(
        bankRows.length > bankPageSize
    );
}


// Update summary cards
function updateBankSummary() {

    $("#totalBankCount").text(bankRows.length);

    const openingTotal = bankRows.reduce(function (sum, bank) {

        const amount = Number(bank.openingBalance);

        return sum + (
            Number.isFinite(amount) ? amount : 0
        );

    }, 0);

    $("#totalOpeningBalance").text(
        money(openingTotal)
    );

    const balances = bankRows.map(getCurrentBalance);

    if (
        balances.length &&
        balances.every(function (value) {
            return value !== null;
        })
    ) {
        const currentTotal = balances.reduce(
            function (sum, value) {
                return sum + value;
            },
            0
        );

        $("#totalCurrentBalance").text(
            money(currentTotal)
        );

    } else {

        $("#totalCurrentBalance").text(
            "Not available"
        );
    }
}


// Show bank table
function showTableData() {

    $("#bankTable").closest(".card").show();

    $("#prevBtn, #nextBtn, #pageInfo").toggle(
        bankRows.length > bankPageSize
    );
}


// Hide bank table
function hideTableData() {

    $("#bankTable").closest(".card").hide();

    $("#prevBtn, #nextBtn, #pageInfo").hide();
}


// Edit bank
function viewData(id) {

    $("#updateBtn").show();
    $("#saveBtn").hide();

    $("#hideBtn, #showBtn").hide();

    $.ajax({
        url: "api/preference/getBankModuleById",
        type: "GET",
        data: {
            id: id
        },

        success: function (response) {

            if (
                response &&
                response.status === "FOUND" &&
                response.data
            ) {
                const bank = response.data;

                $("#id").val(bank.id);

                [
                    "bankName",
                    "accountNo",
                    "ifscCode",
                    "micrCode",
                    "contactNo",
                    "address",
                    "openingDate",
                    "openingBalance",
                    "closingDate"
                ].forEach(function (field) {

                    $("#" + field).val(
                        bank[field] ?? ""
                    );
                });

                if (bank.cancelledCheque) {

                    $("#photoPreview")
                        .attr(
                            "src",
                            `Uploads/${bank.cancelledCheque}`
                        )
                        .show();

                } else {

                    $("#photoPreview")
                        .attr("src", "")
                        .hide();
                }

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            } else {

                alert(
                    "Bank not found: " +
                    (response?.message || "")
                );
            }
        },

        error: function (xhr) {

            console.error(xhr.responseText);

            alert("Failed to fetch bank details.");
        }
    });
}


// Update bank
function updateBank() {

    if (!validateBankForm(true)) {
        return;
    }

    const formData = makeBankFormData(true);

    $.ajax({
        url: "api/preference/saveAndUpdateAllBankModule",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,

        success: function (response) {

            if (
                response &&
                (
                    response.status === "OK" ||
                    response.status === "CREATED"
                )
            ) {
                alert(
                    response.message ||
                    "Bank updated successfully."
                );

                clearBankForm();
                loadBanks();

            } else {

                alert(
                    "Update failed: " +
                    (response?.message || "Unexpected response")
                );
            }
        },

        error: function (xhr) {

            console.error(xhr.responseText);

            alert("Bank update failed.");
        }
    });
}


// Reset bank form
function clearBankForm() {

    document.getElementById("formid").reset();

    $("#id").val("");

    $("#photoPreview")
        .attr("src", "")
        .hide();

    $(
        "#chkbankname, " +
        "#chkaccountno, " +
        "#chkifsccode, " +
        "#chkmicrcode, " +
        "#chkcontactno, " +
        "#chkaddress, " +
        "#chkopeningdate, " +
        "#chkopeningbalance, " +
        "#chkclosingdate, " +
        "#chkphoto"
    ).text("");

    $("#updateBtn").hide();
    $("#saveBtn").show();

    $("#hideBtn, #showBtn").show();
}


// Delete bank
function deleteData(id) {

    if (
        !confirm(
            "Are you sure you want to delete this bank?"
        )
    ) {
        return;
    }

    $.ajax({
        url: "api/preference/deleteBankModuleById",
        type: "POST",
        data: {
            id: id
        },

        success: function (response) {

            if (
                response &&
                response.status === "OK"
            ) {
                alert(
                    response.message ||
                    "Bank deleted successfully."
                );

                loadBanks();

            } else {

                alert(
                    "Delete failed: " +
                    (response?.message || "Unexpected response")
                );
            }
        },

        error: function (xhr) {

            console.error(xhr.responseText);

            alert(
                "Failed to delete bank. " +
                "If transactions exist, backend should prevent deleting this bank."
            );
        }
    });
}


// Open bank transactions modal
function openBankTransactions(bankId, bankName) {

    selectedTransactionBankId = bankId;
    selectedTransactionBankName = bankName;

    $("#transactionBankTitle").text(
        `TRANSACTIONS — ${bankName}`
    );

    $("#bankTransactionsModal").css(
        "display",
        "flex"
    );

    loadBankTransactions();
}


// Close bank transactions modal
function closeBankTransactions() {
    $("#bankTransactionsModal").hide();
}


// Load transactions for selected bank
function loadBankTransactions() {

    if (!selectedTransactionBankId) {
        return;
    }

    const fromDate = $("#transactionFrom").val();
    const toDate = $("#transactionTo").val();

    $("#bankTransactionsBody").html(
        '<tr><td colspan="8">Loading transactions...</td></tr>'
    );

    $.ajax({
        url: "api/bank-transactions/by-bank",
        type: "GET",

        data: {
            bankId: selectedTransactionBankId,
            fromDate: fromDate || "",
            toDate: toDate || ""
        },

        success: function (response) {

            const rows = Array.isArray(response)
                ? response
                : (response?.data || []);

            if (!rows.length) {

                $("#bankTransactionsBody").html(
                    '<tr><td colspan="8">No transactions found.</td></tr>'
                );

                return;
            }

            const body = rows.map(function (tx) {

                return `
                    <tr>
                        <td>${escapeHtml(tx.date)}</td>

                        <td>${escapeHtml(tx.narration)}</td>

                        <td>${escapeHtml(tx.referenceNo)}</td>

                        <td>${escapeHtml(tx.transactionType)}</td>

                        <td class="money-credit">
                            ${money(tx.credit)}
                        </td>

                        <td class="money-debit">
                            ${money(tx.debit)}
                        </td>

                        <td>${money(tx.balance)}</td>

                        <td>
                            ${escapeHtml(
                                tx.branch?.branchName ||
                                tx.branchName ||
                                "—"
                            )}
                        </td>
                    </tr>
                `;
            }).join("");

            $("#bankTransactionsBody").html(body);
        },

        error: function (xhr) {

            console.error(
                "Transaction history API unavailable or failed",
                xhr.responseText
            );

            $("#bankTransactionsBody").html(
                '<tr><td colspan="8">' +
                'Transaction history API is not available yet. ' +
                'Add GET /api/bank-transactions/by-bank in the backend.' +
                '</td></tr>'
            );
        }
    });
}


// Show cancelled cheque in modal
function showChequePreview(imageSrc) {

    $("#modalChequeImage").attr(
        "src",
        imageSrc
    );

    $("#imagePreviewModal").css(
        "display",
        "flex"
    );
}


// Close cheque preview modal
function closeChequePreview() {
    $("#imagePreviewModal").hide();
}


// Convert text fields to uppercase
function convertFormToUpperCase() {

    $("#formid")
        .find("input[type=text], textarea")
        .each(function () {

            if ($(this).val()) {
                $(this).val(
                    $(this).val().toUpperCase()
                );
            }
        });
}