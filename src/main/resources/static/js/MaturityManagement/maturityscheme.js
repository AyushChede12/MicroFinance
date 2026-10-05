  function getMonthNames() {
    return [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  }

  function populateAllDropdownsWithCurrentMonth(className) {
    const dropdowns = document.querySelectorAll(`.${className}`);
    const months = getMonthNames();
    const currentMonthIndex = new Date().getMonth();

    dropdowns.forEach(dropdown => {
      dropdown.innerHTML = ""; 
      months.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;

        if (index === currentMonthIndex) {
          option.selected = true;
        }

        dropdown.appendChild(option);
      });
    });
  }

  


$(document).ready(function () {
	
	populateAllDropdownsWithCurrentMonth("monthname");
	
		
    //for fixed deposit
    $.ajax({
        url: "api/Policymangment/fixed-depositview",
        type: "GET",
        success: function (response) {
            var dropdown = $('#fdPolicyCode');
            dropdown.empty();
            dropdown.append('<option value="">Select Policy Code</option>');

			if (response.status == "OK" && response.data) {
					            $.each(response.data, function (index, plan) {
					                // Concatenate planCode + " - " + planName
					                var displayText = plan.planCodeFD + " - " + plan.planNameFD;
					                dropdown.append('<option value="' + plan.planCodeFD + '">' + displayText + '</option>');
					            });
					        } else {
                dropdown.append('<option value="">No policy code found</option>');
            }
        },
        error: function () {
            alert("No policy code found.");
        }
    });
	// for fixed deposit saving 
	$("#formfd").submit(function (event) {
			event.preventDefault();
		
					       var data = {
					           policyCode: $("#fdPolicyCode").val(),       
					           instFrom: $("#fdInstFrom").val(),         
					           instTo: $("#fdInstTo").val(),             
					           interestRate: $("#fdInterestRate").val(),   
					           deduction: $("#fdDeduction").val()          
					       };

						   console.log("Data"+data.instFrom);
					       $.ajax({
							
					           url: "api/Maturitymanagement/savematurityscheme",  
					           type: "POST",
					           contentType: "application/json",
					           data: JSON.stringify(data),
					           success: function (response) {
								
					               if (response.status === "OK") {
					                   alert(" " + response.message);
					                   $("#formfd")[0].reset(); 
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

	
	//recurring deposit
	$.ajax({
	        url: "api/Policymangment/recurring-depositview",
	        type: "GET",
	        success: function (response) {
	            var dropdown = $('#rdPolicyCode');
	            dropdown.empty();
	            dropdown.append('<option value="">Select Policy Code</option>');

				if (response.status == "OK" && response.data) {
						            $.each(response.data, function (index, plan) {
						                // Concatenate planCode + " - " + planName
						                var displayText = plan.planCodeRD + " - " + plan.planNameRD;
						                dropdown.append('<option value="' + plan.planCodeRD + '">' + displayText + '</option>');
						            });
						        } else {
	                dropdown.append('<option value="">No policy code found</option>');
	            }
	        },
	        error: function () {
	            alert("No policy code found.");
	        }
	    });
		
		//save recurring deposit
		$("#formrd").submit(function (event) {
				event.preventDefault();
			
						       var data = {
						           policyCode: $("#rdPolicyCode").val(),       
						           instFrom: $("#rdInstFrom").val(),         
						           instTo: $("#rdInstTo").val(),             
						           interestRate: $("#rdInterestRate").val(),   
						           deduction: $("#rdDeduction").val()          
						       };

							   console.log("Data"+data.instFrom);
						       $.ajax({
								
						           url: "api/Maturitymanagement/savematurityscheme",  
						           type: "POST",
						           contentType: "application/json",
						           data: JSON.stringify(data),
						           success: function (response) {
									
						               if (response.status === "OK") {
						                   alert(" " + response.message);
						                   $("#formrd")[0].reset(); 
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

		
		//for Daily Deposit
		
		$.ajax({
		    url: "api/Policymangment/daily-deposit/view",
		    type: "GET",
		    success: function (response) {
		        var dropdown = $('#ddPolicyCode');
		        dropdown.empty();
		        dropdown.append('<option value="">Select Policy Code</option>');

		        if (response.status == "OK" && response.data) {
		            $.each(response.data, function (index, plan) {
		                // Concatenate planCode + " - " + planName
		                var displayText = plan.planCodeDD + " - " + plan.planNameDD;
		                dropdown.append('<option value="' + plan.planCode + '">' + displayText + '</option>');
		            });
		        } else {
		            dropdown.append('<option value="">No policy code found</option>');
		        }
		    },
		    error: function () {
		        alert("No policy code found.");
		    }
		});

		
				
				$("#formdd").submit(function (event) {
						event.preventDefault();
					
								       var data = {
								           policyCode: $("#ddPolicyCode").val(),       
								           instFrom: $("#ddInstFrom").val(),         
								           instTo: $("#ddInstTo").val(),             
								           interestRate: $("#ddInterestRate").val(),   
								           deduction: $("#ddDeduction").val()          
								       };

									   
								       $.ajax({
										
								           url: "api/Maturitymanagement/savematurityscheme",  
								           type: "POST",
								           contentType: "application/json",
								           data: JSON.stringify(data),
								           success: function (response) {
											
								               if (response.status === "OK") {
								                   alert(" " + response.message);
								                   $("#formdd")[0].reset(); 
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

// for mis deposit
				$.ajax({
				       url: "api/Policymangment/mis-deposit/view",
				       type: "GET",
				       success: function (response) {
				           var dropdown = $('#mPolicyCode');
				           dropdown.empty();
				           dropdown.append('<option value="">Select Policy Code</option>');

						   if (response.status == "OK" && response.data) {
						   		            $.each(response.data, function (index, plan) {
						   		                // Concatenate planCode + " - " + planName
						   		                var displayText = plan.planCodeMD + " - " + plan.planNameMD;
						   		                dropdown.append('<option value="' + plan.planCodeMD + '">' + displayText + '</option>');
						   		            });
						   		        } else {
				               dropdown.append('<option value="">No policy code found</option>');
				           }
				       },
				       error: function () {
				           alert("No policy code found.");
				       }
				   });
			
				   
	$("#formmis").submit(function (event) {
		event.preventDefault();
	
				       var data = {
				           policyCode: $("#mPolicyCode").val(),       
				           instFrom: $("#misInstFrom").val(),         
				           instTo: $("#misInstTo").val(),             
				           interestRate: $("#misInterestRate").val(),   
				           deduction: $("#misDeduction").val()          
				       };

					   console.log("Data"+data.policyCode);
				       $.ajax({
						
				           url: "api/Maturitymanagement/savematurityscheme",  
				           type: "POST",
				           contentType: "application/json",
				           data: JSON.stringify(data),
				           success: function (response) {
							
				               if (response.status === "OK") {
				                   alert(" " + response.message);
				                   $("#formmis")[0].reset(); 
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
				   
	//Applying validation on fields
	const monthMap = {
	           "January": 1, "February": 2, "March": 3, "April": 4,
	           "May": 5, "June": 6, "July": 7, "August": 8,
	           "September": 9, "October": 10, "November": 11, "December": 12
	       };
		   
		  					 	
		   
				   	$("#ddsaveBtn").click(function() {
						
							$('#chkpolicycodeD').text('');
							$('#finstallD').text('');
							$('#tinstallD').text('');
							$('#chkintrestD').text('');
							$('#chkdeductionD').text('');
						
						var policyCode = $('#ddPolicyCode').val().trim();
						let fromMonth = $('#ddInstFrom').val();
						let toMonth = $('#ddInstTo').val();
						let intrest = $('#ddInterestRate').val();
						let deduction = $('#ddInterestRate').val();
						
						let isValid = true;
						
						
						if (policyCode === '') {
									$('#chkpolicycodeD').text('* This field is required');
									$('#ddPolicyCode').focus();
									isValid = false;
								}
						
						if (fromMonth !== "" && toMonth !== "") {
								let from = monthMap[fromMonth];
								let to = monthMap[toMonth];

								 if ((to - from) < 1) {
								 $('#tinstallD').text("* There must be at least one month difference.");
								  isValid = false;
								               }
								           }
										   
						 if (intrest === '') {
							$('#chkintrestD').text('* This field is required');
								$('#ddInterestRate').focus();
								isValid = false;
								}
								
						if (deduction === '') {
							$('#chkdeductionD').text('* This field is required');
								$('#ddDeduction').focus();
								isValid = false;
								}
								
								if (!isValid) {
								                e.preventDefault(); // Stops form submission
								            }
						
					});
					
					$("#rdsaveBtn").click(function() {
														$('#chkpolicycodeR').text('');
								   						$('#finstallR').text('');
								   						$('#tinstallR').text('');
								   						$('#chkintrestR').text('');
								   						$('#chkdeductionR').text('');
										
										var policyCode = $('#rdPolicyCode').val().trim();
										let fromMonth = $('#rdInstFrom').val();
										let toMonth = $('#rdInstTo').val();
										let intrest = $('#rdInterestRate').val();
										let deduction = $('#rdInterestRate').val();
										
										let isValid = true;
										
										
										if (policyCode === '') {
													$('#chkpolicycodeR').text('* This field is required');
													$('#rdPolicyCode').focus();
													isValid = false;
												}
										
										if (fromMonth !== "" && toMonth !== "") {
												let from = monthMap[fromMonth];
												let to = monthMap[toMonth];

												 if ((to - from) < 1) {
												 $('#tinstallR').text("* There must be at least one month difference.");
												  isValid = false;
												               }
												           }
														   
										 if (intrest === '') {
											$('#chkintrestR').text('* This field is required');
												$('#rdInterestRate').focus();
												isValid = false;
												}
												
										if (deduction === '') {
											$('#chkdeductionR').text('* This field is required');
												$('#rdDeduction').focus();
												isValid = false;
												}
												
												if (!isValid) {
												                e.preventDefault(); // Stops form submission
												            }
										
									});
								
									$("#fdsaveBtn").click(function() {
														
															$('#chkpolicycodeF').text('');
															$('#finstallF').text('');
															$('#tinstallF').text('');
															$('#chkintrestF').text('');
															$('#chkdeductionF').text('');
														
														var policyCode = $('#ddPolicyCode').val().trim();
														let fromMonth = $('#ddInstFrom').val();
														let toMonth = $('#ddInstTo').val();
														let intrest = $('#ddInterestRate').val();
														let deduction = $('#ddInterestRate').val();
														
														let isValid = true;
														
														
														if (policyCode === '') {
																	$('#chkpolicycodeF').text('* This field is required');
																	$('#ddPolicyCode').focus();
																	isValid = false;
																}
														
														if (fromMonth !== "" && toMonth !== "") {
																let from = monthMap[fromMonth];
																let to = monthMap[toMonth];

																 if ((to - from) < 1) {
																 $('#tinstallF').text("* There must be at least one month difference.");
																  isValid = false;
																               }
																           }
																		   
														 if (intrest === '') {
															$('#chkintrestF').text('* This field is required');
																$('#ddInterestRate').focus();
																isValid = false;
																}
																
														if (deduction === '') {
															$('#chkdeductionF').text('* This field is required');
																$('#ddDeduction').focus();
																isValid = false;
																}
																
																if (!isValid) {
																                e.preventDefault(); // Stops form submission
																            }
														
													});

													$("#missaveBtn").click(function() {
																		
																			$('#chkpolicycodeM').text('');
																			$('#finstallM').text('');
																			$('#tinstallM').text('');
																			$('#chkintrestM').text('');
																			$('#chkdeductionM').text('');
																		
																		var policyCode = $('#ddPolicyCode').val().trim();
																		let fromMonth = $('#ddInstFrom').val();
																		let toMonth = $('#ddInstTo').val();
																		let intrest = $('#ddInterestRate').val();
																		let deduction = $('#ddInterestRate').val();
																		
																		let isValid = true;
																		
																		
																		if (policyCode === '') {
																					$('#chkpolicycodeM').text('* This field is required');
																					$('#ddPolicyCode').focus();
																					isValid = false;
																				}
																		
																		if (fromMonth !== "" && toMonth !== "") {
																				let from = monthMap[fromMonth];
																				let to = monthMap[toMonth];

																				 if ((to - from) < 1) {
																				 $('#tinstallM').text("* There must be at least one month difference.");
																				  isValid = false;
																				               }
																				           }
																						   
																		 if (intrest === '') {
																			$('#chkintrestM').text('* This field is required');
																				$('#ddInterestRate').focus();
																				isValid = false;
																				}
																				
																		if (deduction === '') {
																			$('#chkdeductionM').text('* This field is required');
																				$('#ddDeduction').focus();
																				isValid = false;
																				}
																				
																				if (!isValid) {
																				                e.preventDefault(); // Stops form submission
																				            }
																		
																	});
																	
									

});




