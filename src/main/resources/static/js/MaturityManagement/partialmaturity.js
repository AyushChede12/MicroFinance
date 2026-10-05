let policyid=0;
$(document).ready(function () {
    $('#plantype').on('change', function () {
        let plantype = $(this).val();

        if (!plantype) {
            alert("Please select a valid plan type.");
            return;
        }

        $.ajax({
            url: 'api/Policymangment/getaddinvestmentdetails',
            type: 'GET',
            data: { planType: plantype }, 
            success: function (response) {
                if (response.status === "OK" && response.data && response.data.length > 0) {
                    // Filter policyCodes starting with selected planType (e.g., DD...)
                    const filteredData = response.data.filter(item =>
                        item.policyCode && item.policyCode.startsWith(plantype)
                    );

                    const transferOptions = filteredData.map(function (item) {
                        return {
                            id: item.policyCode,
                            text: item.policyCode
                        };
                    });

                    $('#policyCode').empty().select2({
                        placeholder: '-- Search policy Code --',
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
                    alert("No policy codes found.");
                }
            },
            error: function () {
                alert("Failed to load policy codes.");
            }
        });
    });
	
	$('#policyCode').on('change', function () {
	    let policyCode = $(this).val();

	    if (policyCode !== "") {
	        $.ajax({
	            url: 'api/Policymangment/getPolicyByPolicyCode?policyCode=' + encodeURIComponent(policyCode),
	            type: 'GET',
	            success: function (response) {
	                console.log("Response:", response);

	                if (response.data) {
	                    let data = response.data;
	                    $('#planCode').val(data.schemeCode);
	                    $('#customerName').val(data.customerName);
	                    $('#policyName').val(data.schemeName);
	                    $('#schemeType').val(data.schemeType);
	                    $('#policyAmount').val(data.policyAmount);
	                    $('#depositAmount').val(data.depositAmount);
	                    $('#maturityAmount').val(data.maturityAmount);
	                    $('#maturityDate').val(data.maturityDate);
						$('#Approvebranch').val(data.branchName);
	                    $('#duration').val(calDuration(data)); //function calDuration(data)
						$('#sysPayable').val(sysPayable(data)); //function sysPayable(data)
						$('#deduction').val(Deduction(data));	//function Deduction(data)					
						$('#netPayable').val(netPayment(data)); //dunction netpay(data)
						$('#dueAmount').val(DueAmount(data));	//function DueAmount(data)
						let id=parseInt(data.id);
						policyid=id;
						
						

	                } else {
	                    alert("No data found for this policy.");
	                }
	            },
	            error: function () {
	                alert("Error fetching policy details.");
	            }
	        });
	    } else {
	        $('#customerName, #schemeMode, #schemeType, #policyAmount, #depositAmount, #maturityAmount, #maturityDate, #duration').val('');
	    }
	});

	$.ajax({
	    url: "getAllteamMember",
	    type: "GET",
	    success: function (response) {
	        if (response && response.length > 0) {
	           
	            const teamOptions = response.map(function (team) {
	                return {
	                    id: team.teamMemberCode,
	                    text: team.teamMemberCode + " - " + team.teamMemberName
	                };
	            });

	            
	            $('#userApprover').empty().select2({
	                placeholder: '-- Select Team Member --',
	                data: teamOptions,
	                matcher: function (params, data) {
	                    if ($.trim(params.term) === '') return data;

	                    if (typeof data.text === 'undefined') return null;

	                    const term = params.term.toLowerCase();
	                    const text = data.text.toLowerCase();

	                    return text.includes(term) ? data : null;
	                }
	            });
	        } else {
	            alert("No team members found.");
	        }
	    },
	    error: function () {
	        alert("Failed to load team members.");
	    }
	});
	
	$("#formid").submit(function (event) {
	    event.preventDefault();
 
		  const selectedCode = $('#userApprover').val(); // Will give "TM0001"
		  const selectedText = $('#userApprover option:selected').text(); // Will give "TM0001 - Ashwini Rajurkar"
		    
		  let teamMemberCode = selectedCode;
		  let teamMemberName = selectedText.split(" - ")[1].trim();
	
		  console.log("Parsed Code:", teamMemberCode);
		  console.log("Parsed Name:", teamMemberName);
		  

	    var data = {
	        policyCode: $("#policyCode").val(),
	        planCode: $("#planCode").val(),
	        maturityDate: $("#maturityDate").val(),
	        customerName: $("#customerName").val(),
	        policyName: $("#policyName").val(),
	        duration: $("#duration").val(),
	        policyAmount: $("#policyAmount").val(),
	        maturityAmount: $("#maturityAmount").val(),
	        sysPayable: $("#sysPayable").val(),
	        deduction: $("#deduction").val(),
	        netPayable: $("#netPayable").val(),
	        approveBranch: $("#Approvebranch").val(),
	        teamMemberCode: teamMemberCode,
	        teamMemberName: teamMemberName,
			closingDate: $("#closingDate").val(),
	        depositAmount: $("#depositAmount").val(),
	        dueAmount: $("#dueAmount").val(),
	        Comment: $("#Comment").val(),
	    };

		$.ajax({
		    url: "api/Maturitymanagement/savePartialmaturity",
		    type: "POST",
		    contentType: "application/json",
		    data: JSON.stringify(data),
		    success: function(response) {
		      alert(response.status === "OK"
		        ? "Saved: " + response.message
		        : "Failed: " + response.message
		      );
		      if (response.status === "OK"){
				updateAddNewInvestmentAmount(data);
				 $("#formid")[0].reset();
					 
			 }
			
		    },
		    error: function(xhr, status, error) {
		      console.error("Save error:", error, xhr.responseText);
		      alert("Something went wrong while saving the data.");
		    }
		  });
	});				   

});


/*function calculateDepositAmount(){
	let amount = parseFloat($('#amount').val()) || 0;
	let paidAmount = parseFloat($('#depositAmount').val()) || 0;
	let deposit=0;
	
	if (!isNaN(amount) && !isNaN(paidAmount)) {
		    deposit = amount + paidAmount;
		    alert("depositAmount " + deposit);
		}
		return deposit;
	
}*/


function updateAddNewInvestmentAmount(data)
{
	
	//let policyCode = $("#policyCode").val();
	//let policyid=parseInt(data.id);
	alert(policyid);

	    // Validate before sending (optional)
	    if (!policyid) {
	        alert("Please enter both Policy Code");
	        return;
	    }

	    // Make the AJAX call
		$.ajax({
		    url: "api/Policymangment/deletePolicyDataById?id=" + policyid,  
		    type: "POST",
		    success: function (response) {
		        alert("Deleted successful!");
		        console.log("deleted record:", response);
		    },
		    error: function (xhr, status, error) {
		        console.error("delete failed:", error);
		        alert("Failed to delete installment details.");
		    }
		});
}

function calDuration(data){
	let openingDate = new Date(data.policyStartDate);
	let maturityDate = new Date(data.maturityDate);
	let schemeMode = data.schemeMode; 

    let duration = 0;
	let durationText = "-";

		 if (schemeMode && openingDate && maturityDate) 
			{
		      if (schemeMode.toLowerCase() === "monthly") 
				{
		          duration = (maturityDate.getFullYear() - openingDate.getFullYear()) * 12 +(maturityDate.getMonth() - openingDate.getMonth());
				 durationText = duration + (duration === 1 ? " month" : " months");
				}
				 else
				   if (schemeMode.toLowerCase() === "yearly")
					 {
		                duration = maturityDate.getFullYear() - openingDate.getFullYear();
		                   if (
		                        maturityDate.getMonth() < openingDate.getMonth() ||
		                          (maturityDate.getMonth() === openingDate.getMonth() &&
		                           maturityDate.getDate() < openingDate.getDate())
		                              ) {
		                                duration--;
		                            }
							 durationText = duration + (duration === 1 ? " year" : " years");
		                }
		         }
				 return durationText;
}

function sysPayable(data){
	
	let depositAmount = parseFloat(data.depositAmount);                    
		 let rateOfIntrest = parseFloat(data.roi);   
		 let syspayable=0;
		 let intrest=0;
		
		
		 intrest=(depositAmount*rateOfIntrest*1)/100;
		 syspayable=depositAmount+intrest;
		
		return syspayable;						
							
}

function Deduction(data){
	
	let deduct=(200*18)/100;
		
		return deduct;
}

function netPayment(data){
	let sysPayable = parseFloat($('#sysPayable').val()) || 0;
	let deduction = parseFloat($('#deduction').val()) || 0;
	let netpay = 0;

	if (!isNaN(sysPayable) && !isNaN(deduction)) {
	    netpay = sysPayable - deduction;
	    alert("Net Payable: " + netpay);
	}
	return netpay;
}

function DueAmount(data)
{
	let amount = parseFloat($('#amount').val()) || 0;
	let paidAmount = parseInt(data.depositAmount);             
	let policyAmount = parseInt(data.policyAmount);
	let dueamount=0;
	
	if (!isNaN(amount) && !isNaN(paidAmount) && !isNaN(policyAmount))
		{
			dueamount=policyAmount-(amount+paidAmount);
			alert(dueamount);
		}
		return dueamount;
		
}






