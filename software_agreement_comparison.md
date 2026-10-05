# Software Agreement vs. Codebase Comparison

This document highlights the key differences found between the sample **Software Development & Service-Level Agreement** (`project_quotation.pdf`) and the actual **MicroFinance Management System** codebase.

---

## 1. Technical Discrepancies

### Technology Stack
*   **Sample Agreement (PDF):** Specifies **Java 17**.
*   **Your Codebase:** Built on **Java 8 (1.8)** (configured as `<java.version>1.8</java.version>` in [pom.xml](file:///f:/MicroFinance/UpdatedMicroFinance/pom.xml)).
*   **Spring Boot Version:** The codebase uses **Spring Boot 2.7.15**, which is compatible with Java 8 (whereas Spring Boot 3+ requires Java 17+).

---

## 2. Feature & Module Discrepancies

### Loan Management Engine (Section 1.2)
*   **Sample Agreement (PDF):** Lists support for Personal Loans (PL), Business Loans (BL), Gold Loans, **Consumer Durable Loans (CDL)**, Two-Wheeler Loans (TW), **Self-Help Group (SHG) financing**, and JLG Group loans.
*   **Your Codebase:**
    *   **Implemented:** Personal Loans, Business Loans, Vehicle Loans, Gold Loans, and JLG Group Loans.
    *   **Not Implemented:** **Consumer Durable Loans (CDL)** and **Self-Help Group (SHG) financing** are missing from the codebase.
    *   **Extra Features:** **Home Loans (HL)** are supported in the software's loan catalog UI options, but not mentioned in the PDF.

---

## 3. Compliance & Statutory Discrepancies (Section 2)

The sample agreement specifies several co-operative banking compliances that are **not** present in your current codebase:

*   **Statutory Compliance Reports (Section 2.1 & 2.2):**
    *   **SLA PDF requires:** 'I' Form (Register of Members), 'J' Form (Register of Shares), Loan & Mortgage Registers, and NPA & Defaulters Schedules in alignment with the **Maharashtra Co-operative Societies Act, 1960**.
    *   **Your Codebase:** None of these specific compliance registers or forms are implemented. The codebase provides standard financial reports (ledger summaries, trial balances, transaction reports, etc.) but no statutory forms.
*   **Marathi Font Support (Section 2.4):**
    *   **SLA PDF requires:** All statements, receipts, and compliance reports must cleanly support and print in Marathi typography.
    *   **Your Codebase:** The application generates reports and receipts only in English.
*   **Co-operative Rules Controls (Section 2.5):**
    *   **SLA PDF requires:** An automatic **15% ceiling cap on dividend distribution** processing (Section 67) and financial-year data locking.
    *   **Your Codebase:** There is no logic or locking mechanism to enforce the 15% dividend cap or restrict post-audit back-dated entries.

---

## 4. Administrative & Commercial Discrepancies

### Developer Identity
*   **Sample Agreement (PDF):** Lists the developer as **INFOSAI SOFTWARE COMPANY, NAGPUR**.
*   **Your Codebase:** Configured for **AS Enterprises** (as defined in your quotation file [project_quotation.html](file:///f:/MicroFinance/UpdatedMicroFinance/project_quotation.html)).

### Support & Warranty (Section 6.1)
*   **Sample Agreement (PDF):** Offers **12 months of free post-launch warranty support**.
*   **Your Codebase Quotation:** Offers **3 months of free post-launch support** (as defined in `project_quotation.html`).
