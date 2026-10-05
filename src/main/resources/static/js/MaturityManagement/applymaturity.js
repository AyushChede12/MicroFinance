$(document).ready(function () {
    $('#branchName').on('change', function () {
        let branchName = $(this).val();
	
        if (branchName !== "") {
            $.ajax({
                url: 'api/Policymangment/getinvestmentdetails?branchName=' + encodeURIComponent(branchName),
                type: 'GET',
                success: function (response) {
                    var dropdown = $('#policyCode');
                    dropdown.empty();
                    dropdown.append('<option value="">Select Policy No</option>');

                    if (response.data && response.data.length > 0) {
                        $.each(response.data, function (index, policyNo) {
                            dropdown.append('<option value="' + policyNo.policyCode+'">'+ policyNo.policyCode+'</option>');
                        });
                    } else {
                        dropdown.append('<option value="">No policies found</option>');
                    }
                },
                error: function () {
                    alert("Error fetching policy numbers.");
                }
            });
        }
    });
	
	$('#policyCode').on('change', function () {
	    let policyCode = $(this).val();

	    if (policyCode !== "") {
	        $.ajax({
	            url: 'api/Policymangment/getPolicyByPolicyCode?policyCode=' + encodeURIComponent(policyCode),
	            type: 'GET',
	            success: function (response) {
	                console.log("Response:", response);
	                alert("Policy Code: " + policyCode);

	                if (response.data) {
	                    let data = response.data;

	                    $('#customerName').val(data.customerName);
	                    $('#schemeMode').val(data.schemeMode);
	                    $('#schemeType').val(data.schemeType);
	                    $('#policyAmount').val(data.policyAmount);
	                    $('#depositAmount').val(data.depositAmount);
	                    $('#maturityAmount').val(data.maturityAmount);
	                    $('#maturityDate').val(data.maturityDate);
	                } else {
	                    alert("No data found for this policy.");
	                }
	            },
	            error: function () {
	                alert("Error fetching policy details.");
	            }
	        });
	    } else {
	        $('#customerName, #schemeMode, #schemeType, #policyAmount, #depositAmount, #maturityAmount, #maturityDate').val('');
	    }
	});

	   
	   //saving apply Maturity data
	   
	   $("#formid").submit(function (event) {
	   						event.preventDefault();
	   					
	   								       var data = {
	   								           branchName: $("#branchName").val(),       
	   								           policyCode: $("#policyCode").val(),         
	   								           maturityDate: $("#maturityDate").val(),             
	   								           customerName: $("#customerName").val(),   
	   								           schemeMode: $("#schemeMode").val(),      
											   policyAmount: $("#policyAmount").val() , 
											   depositAmount: $("#depositAmount").val(),
											   maturityAmount: $("#maturityAmount").val(), 
											   remark: $("#remark").val()    
	   								       };

	   									   
	   								       $.ajax({
	   										
	   								           url: "api/Maturitymanagement/saveApplymaturity",  
	   								           type: "POST",
	   								           contentType: "application/json",
	   								           data: JSON.stringify(data),
	   								           success: function (response) {
	   											
	   								               if (response.status === "OK") {
	   								                   alert(" " + response.message);
	   								                   $("#formid")[0].reset(); 
	   								               } else {
	   								                   alert(" " + response.message);
	   								               }
	   								           },
	   								           error: function (xhr, status, error) {
	   								               console.error(" Error saving:", error);
	   											   console.log(" ",response.message);
	   								               alert(" Something went wrong while saving the data.");
	   								           }
	   										   
	   								       });
	   								   });
									   
									   
									   $('#viewBtn').on('click', function (e) {
									       e.preventDefault(); // <-- Stop form submission

									       $.ajax({
									           url: "api/Maturitymanagement/getApplymaturitydetailswithPage",
									           type: "GET",
											   success: function (response) {
											       if (response.status === "OK" && response.data && response.data.content.length > 0) {
											           var tableBody = $("#table tbody");
											           tableBody.empty();

											           $.each(response.data.content, function (index, item) {
											               var row = "<tr>" +
											                   "<td>" + item.policyCode + "</td>" +
											                   "<td>" + item.branchName + "</td>" +
											                   "<td>" + item.maturityDate + "</td>" +
											                   "<td>" + item.customerName + "</td>" +
											                   "<td>" + item.schemeName + "</td>" +
											                   "<td>" + item.schemeType + "</td>" +
											                   "<td>" + item.policyAmount + "</td>" +
											                   "<td>" + item.maturityAmount + "</td>" +
											                   "<td>" + item.remark + "</td>" +
											                   "</tr>";
											               tableBody.append(row);
											           });
											       } else {
											           alert("No maturity details found.");
											       }
									           },
									           error: function (xhr, status, error) {
									               console.error("Error fetching maturity details:", error);
									               alert("Failed to load maturity details.");
									           }
											   
											   
											   
									       });
									   });
									   
		 $("#Add").click(function() {
									   																	
			$('#chkbranch').text('');
			$('#chkpolicycode').text('');
			$('#chkremark').text('');
			
			
			let branch = $('#branchName').val();
			let policycode = $('#policyCode').val();
			let remark = $('#remark').val();
																					
			let isValid = true;
																					
			if (policycode === '') {
				$('#chkpolicycode').text('* This field is required');
				$('#policyCode').focus();
				isValid = false;
				}
			
			if (branch === '') {
				$('#chkbranch').text('* This field is required');
				$('#branchName').focus();
				isValid = false;
				}
				
			if (remark === '') {
				$('#chkremark').text('* This field is required');
				$('#remark').focus();
				isValid = false;
				}
		});

});

