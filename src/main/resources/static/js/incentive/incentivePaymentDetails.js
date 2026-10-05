$(document).ready(function () {
	const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	const monthDropdown = $('#incentiveMonth');
	monthDropdown.empty().append('<option value="">--SELECT MONTH NAME--</option>');

	months.forEach((month) => {
		monthDropdown.append(`<option value="${month}">${month}</option>`);
	});
});
