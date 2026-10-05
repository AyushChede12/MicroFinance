$(document).ready(function() {

	// ================= DATE SET =================
	const today = new Date().toISOString().split('T')[0];

	const dateIds = [
		"#applicationDate", "#fromDate", "#toDate", "#approvalDate", "#startDate", "#endDate",
		"#openingDate", "#transactionDate", "#signupDate",
		"#dateOfTransfer", "#loanDate", "#paymentDate", "#dateOfEntry",
		"#closingDate", "#dateloan", "#transferDate"
	];

	dateIds.forEach(id => {
		if ($(id).length) {
			$(id).val(today);
		}
	});

	// ================= BRANCH =================
	if ($("#branchName").length || $("#closingbranchName").length || $("#paymentBranch").length || $("#sourceBranch").length || $("#receivingBranch").length) {
		$.ajax({
			url: "api/preference/getAllBranchModule",
			type: "GET",
			success: function(response) {
				if (response.status === "OK") {
					const branchList = response.data;

					$("#branchName").empty().append("<option value=''>--SELECT BRANCH--</option>");
					$("#closingbranchName").empty().append("<option value=''>--SELECT BRANCH--</option>");
					$("#branch").empty().append("<option value=''>--SELECT BRANCH--</option>");
					$("#paymentBranch").empty().append("<option value=''>--SELECT BRANCH--</option>");
					$("#sourceBranch").empty().append("<option value=''>--SELECT BRANCH--</option>");
					$("#receivingBranch").empty().append("<option value=''>--SELECT BRANCH--</option>");

					branchList.forEach(branch => {
						const option =
							`<option value="${branch.branchName}">
								${branch.branchName.toUpperCase()}
							</option>`;

						$("#branchName").append(option);
						$("#closingbranchName").append(option);
						$("#branch").append(option);
						$("#paymentBranch").append(option);
						$("#sourceBranch").append(option);
						$("#receivingBranch").append(option);
					});
				}
			},
			error: function(err) {
				alert("err");
			}
		});
	}

	// ================= RELATIVES =================
	if ($("#relationToApplicant").length || $("#familyRelation").length) {
		$.ajax({
			url: "api/preference/getAllRelativeModule",
			type: "GET",
			success: function(response) {
				if (response.status === "FOUND") {
					const list = response.data;

					$("#relationToApplicant")
						.empty()
						.append("<option value=''>-- SELECT RELATIVE --</option>");

					$("#familyRelation")
						.empty()
						.append("<option value=''>-- SELECT RELATIVE --</option>");

					list.forEach(r => {
						const option =
							`<option value="${r.relation}">
								${r.relation.toUpperCase()}
							</option>`;

						$("#relationToApplicant").append(option);
						$("#familyRelation").append(option);
					});
				}
			}
		});
	}
});


// ================= SIDEBAR TOGGLE =================
document.addEventListener("DOMContentLoaded", function() {
	const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
	if (toggleSidebarBtn) {
		toggleSidebarBtn.addEventListener('click', function() {
			document.body.classList.toggle('toggle-sidebar');
		});
	}
});


// ================= IMAGE UPLOAD =================
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");
const text = document.getElementById("upload-text");

if (inputFile && imgView && text) {
	inputFile.addEventListener("change", uploadImage);
}

function uploadImage() {
	if (!inputFile || !inputFile.files.length) return;

	let imgLink = URL.createObjectURL(inputFile.files[0]);
	imgView.style.backgroundImage = `url(${imgLink})`;
	imgView.textContent = "";
	imgView.style.border = 0;
	imgView.style.display = 'block';
	text.style.display = 'none';
}

if (dropArea && inputFile) {
	dropArea.addEventListener("dragover", function(e) {
		e.preventDefault();
	});

	dropArea.addEventListener("drop", function(e) {
		e.preventDefault();
		inputFile.files = e.dataTransfer.files;
		uploadImage();
	});
}


// ================= TOGGLE SWITCH =================
document.addEventListener('DOMContentLoaded', () => {
	const toggles = document.querySelectorAll('.toggle__input');

	toggles.forEach(toggle => {
		updateToggleColor(toggle);

		toggle.addEventListener('change', () => {
			updateToggleColor(toggle);
		});
	});

	function updateToggleColor(input) {
		const label = input.nextElementSibling;
		if (!label) return;
		label.style.backgroundColor = input.checked ? '#28a745' : '#ccc';
	}
});


// ================= CUSTOM DROPDOWN =================
const wrapper = document.querySelector('.wrapper');

if (wrapper) {
	const selectBtn = wrapper.querySelector('.select-btn');
	const optionsdropbtn = wrapper.querySelector(".options");
	const dropBtnSearchInput = wrapper.querySelector(".dropsearchinp");

	const major = ["Mr", "Ms", "Mrs"];

	function addmajor() {
		optionsdropbtn.innerHTML = "";
		major.forEach(m => {
			let li = `<li onclick="updateName(this)">${m}</li>`;
			optionsdropbtn.insertAdjacentHTML("beforeend", li);
		});
	}
	addmajor();

	window.updateName = function(selectedLi) {
		selectBtn.firstElementChild.innerText = selectedLi.innerText;
		wrapper.classList.remove("active");
	};

	if (selectBtn) {
		selectBtn.addEventListener("click", () => {
			wrapper.classList.toggle("active");
		});
	}
}
