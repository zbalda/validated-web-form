/**************************************
 TITLE: finalRelease.js
 AUTHOR: Zachary Balda (ZDB)
 CREATE DATE: 1 Dec 2016
 PURPOSE: Complete jQuery UI and validation
 LAST MODIFIED ON: 1 Dec 2016
 LAST MODIFIED BY: Zachary Balda (ZDB)
 MODIFICATION HISTORY:
 21 Nov 2016: Personalized (ZDB)
 21 Nov 2016: jQuery GUI widgets created for Form Prototype (ZDB)
 21 Nov 2016: all required GUI objects created for Form Prototype (ZDB)
 25 Nov 2016: file copied and adapted from form formPrototype to pullingThrough (ZDB)
 25 Nov 2016: Fixed autocomplete widget (ZDB)
 25 Nov 2016: Added output (ZDB)
 25 Nov 2016: Added reset functionality (ZDB)
 25 Nov 2016: Personalized form pullingThrough (ZDB)
 27 Nov 2016: Added default submit validation functionality (ZDB)
 27 Nov 2016: Personalized from simpleFormValidation (ZDB)
 27 Nov 2016: Created field validations and messages (ZDB)
 1 Dec 2016: Personalized from customFormValidation (ZDB)
***************************************/

$(document).ready(function(){

    /*****			
	Purpose: Create menu of 5 tabs	
	Parameters: none	
	Return: none
	*****/
	$(function() {
        $('#menu').tabs();
    });

    /*****			
	Purpose: Create accordion for FAQ page
	Parameters: none	
	Return: none
	*****/
    $(function() {
        $('#faq').accordion({
            collapsible: true,
            heightStyle: "content"
        });
    });

    /*****			
	Purpose: Create radio buttons and checkboxes for form	
	Parameters: none	
	Return: none
	*****/
    $( function() {
        $( "input" ).checkboxradio();
    } );

    $("#radio-1").prop('checked', true);
    
    var $value = $('#value');
    var $range = $('#hours-range');
    
    /*****			
	Purpose: Create create spinner for form
	Parameters: none	
	Return: none
	*****/
    $('#hours-range').slider({
        range: true,
        min: 0,
        max: 15,
        values: [2, 4],
        slide: function(event, ui) {
            $value.val(ui.values[0] + ' - ' + ui.values[1]);
        }
    });
    $value.val($range.slider('values', 0) + ' - ' + $range.slider('values', 1));
	
    /*****			
	Purpose: Create date picker element for form	
	Parameters: none	
	Return: none
	*****/
    $('#start').datepicker();

    // tags for autocomplete
    var availableUnivs = [
            "Ancilla College",
            "Anderson University",
            "Ball State University",
            "Bethel College",
            "Butler University",
            "Crossroads Bible College",
            "DePauw University",
            "DeVry University Indiana",
            "Earlham College",
            "Franklin College",
            "Goshen College",
            "Grace College",
            "Hanover College",
            "Harrison College",
            "Holy Cross College",
            "Hunington University",
            "Indiana Institute of Technology",
            "Indiana State University",
            "Indiana University Purdue University Fort Wayne",
            "Indiana University Purdue University Indianapolis",
            "Indiana University South Bend",
            "Indiana University Southeast",
            "Indiana University Bloomington",
            "Indiana University East",
            "Indiana University Kokomo",
            "Indiana University Northwest",
            "Indiana Weleyan University",
            "ITT Technical Institute",
            "Ivy Tech Community College",
            "Kaplan College",
            "Lincoln College of Technology",
            "Manchester University",
            "Marian University",
            "Martin University",
            "MedTech COllege",
            "Purdue University",
            "Purdue University Calumet",
            "Purdue University North Central",
            "Rose-Hulman Institute of Technology",
            "Saint Joseph's College",
            "Saint Mary's College",
            "Taylor University",
            "Trine University",
            "University of Evansville",
            "University of Notre Dame",
            "University of Saint Francis",
            "University of Southern Indiana",
            "Valparaiso University",
            "Vincennes University",
            "Wabash College",
            "WGU Indiana"
    ];
    /*****			
	Purpose: Create autocomplete for form	
	Parameters: none	
	Return: none
	*****/
    $("#univ").autocomplete({
            source: availableUnivs
    });

    /*****			
	Purpose: Reset values of all fields	
	Parameters: none	
	Return: none
	*****/
    $("#reset").on("click", resetFields);
    function resetFields(){
        // reset output area
        $('#output').html("");

        // reset all fields
        $("input[name='radio-1']").prop('checked', false).button("refresh");
        $("#radio-1").prop('checked', true).button("refresh");
        $("input[type=checkbox]").attr('checked', false);
        $("input[type=checkbox]").checkboxradio("refresh");
        $('#hours-range').slider("values", [ 2 , 4 ]);
        $('#value').val("2 - 4 hours of tutoring / week");

        $("#start").val("");
        $("#univ").val("");
        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $("#phoneNum").val("");
        $("#password").val("");

    } // end resetFields

    /* form validation plugin */

    /*****			
	Purpose: Set validation defaults (messages and handling) for all UI elements	
	Parameters: none	
	Return: none
	*****/
    $.validator.setDefaults({
        submitHandler: function(){
            
            // string output for radio selection
            var strRadioSelect = $("input[name='radio-1']:checked").val();

            // string output for checkbox selection
            var strChecked = "";
            var intTotalCheckboxes = 5; // explicitly set to 5 for now
		  // go through and concatinate each checked box to string
            for (i = 0; i < intTotalCheckboxes; i++) {
                var strCheckboxId = "checkbox-" + (i + 1); 
                if ($('#'+strCheckboxId).is(":checked")) {
                    if (i != 0 && strChecked != "") {
                        strChecked += ", ";
                    } // end if
                    strChecked += $('#'+strCheckboxId).val();
                } // end if
            } // end for

            // hours to recieve string for output
            var strHours = $("#value").val();
            strHours += " hours of tutoring / week";

            // start date string for output
            var strDate = $("#start").val();
            
            // college string for output
            var strCollege = $("#univ").val();

            // first name string for output
            var strFirstName = $("#firstName").val();        

            // last name string for output
            var strLastName = $("#lastName").val(); 

            // email string for output
            var strEmail = $("#email").val();

            // phone number string for output
            var strPhoneNum = $("#phoneNum").val();

            // password string for output
            var strPassword = $("#password").val();
            
            // Final Output 
            $('#output').html("");
            $('#output').append("Currently a: " + strRadioSelect + "<br>");
            $('#output').append("Need help with: " + strChecked + "<br>");
            $('#output').append("Would prefer: " + strHours + "<br>");
            $('#output').append("Start date: " + strDate + "<br>");
            $('#output').append("Attends: " + strCollege + "<br>");
            $('#output').append("<br>");
            $('#output').append("First Name: " + strFirstName + "<br>");
            $('#output').append("Last Name: " + strLastName + "<br>");
            $('#output').append("Email: " + strEmail + "<br>");
            $('#output').append("Phone #: " + strPhoneNum + "<br>");
            $('#output').append("Password: " + strPassword + "<br>");

        } // end submit handler
    }); // end validator.setDefaults

    // validate form
    $("#myForm").validate({
        rules : {
            "radio-1" : {              // year (e.g. Freshman)
                required : true
            },

            value : {                // hours (e.g. 2 - 4 hours of tutoring / week)
                required : true
            }, 
            
            start : {                // start date (mm/dd/yyyy)
                required : true,
                date : true
            },

            univ : {                 // university (e.g. IUPUI)
                required : true,
                letterswithbasicpunc : true
            },

            firstName : {
                required : true,
                lettersonly : true
            }, 

            lastName : {
                required : true,
                lettersonly : true
            },

            email : {
                required : true,
                email : true
            }, 

            phoneNum : {
                required : true,
                phoneUS : true
            },

            password : {
                required : true,
                minlength : 7,
                maxlength : 25,
            }
        }, // end rules

        messages : {         // messages for errors
            "radio-1" : {
                required : "please select a year"
            }, 

            univ : {
                required : "please enter what college you attend"
            },

            firstName : {
                required : "please enter your first name"
            },

            lastName : {
                required : "please enter your last name"
            },
            
            email : {
                required : "please enter an email address",
                email : "please enter a valid email address"
            },

            phoneNum : {
                required : "please enter a phone number",
                phoneUS : "please enter a valid US phone number"
            },

            password : {
                required : "please enter a password",
                minlength : "must be at least 7 characters", 
                maxlength : "must not exceed 25 characters",
            }
        } // end messages
    });

    /* end form validation plugin */

}); // end of $(document).ready()
