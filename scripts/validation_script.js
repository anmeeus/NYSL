  /* Add an input element with a seasion name: exp. Spring 2018, Fall 2018. User should have no access to this input. Season name should change dynamically.
2. Validate simple text and numeric inputs.
3. ****Validate birth date - expected format: mm/dd/yyyy. You can also check if the date is correct (if the age is correct).
4. ***Validate phone number - expected format: 123-123-1234.
5. ***Validate email address - expected format: user-name@domain.com.
6. If "Already Have a Uniform" is checked than forbid choosing Jersey ans Shorts size.
7. Validate signature date - expected format: mm/dd/yyyy - expected date: current day.*/

  var all_input_w_tooltips = document.getElementsByClassName("tooltip");

  //Loop through all input with tooltip to dynamicly include the required attribute.
  var all_input_w_tooltips = document.getElementsByClassName("tooltip");
  for (let i = 0; i < all_input_w_tooltips.length; i++) {
      //        console.log(all_input_w_tooltips);
      all_input_w_tooltips[i].getElementsByTagName("INPUT")[0].required = false;
  }

  var this_date = new Date();
  var this_month = this_date.getMonth() + 1;
  var this_year = this_date.getFullYear();
  var seasonBox = document.getElementById("seasonDiv");
  var inputSeasonBox = seasonBox.getElementsByTagName("INPUT")[0];
  inputSeasonBox.value = get_season(this_month);
  seasonBox.style.visibility = "visible";

  function get_season(month) {
      if (month <= 6 && month > 0) {
          return "Spring " + this_year;
      } else if (month <= 12) {
          return "Fall " + this_year;
      } else {
          return "Undefined";
      }
  }

  function validateForm() {

      var form_id = "myForm";

      var error_bacground_color = "#ad2626a3";
      var first_name_id = "firstname";
      var last_name_id = "lastname";
      var parent_name_id = "parentGuardian";
      var city_id = "city";
      var email_id = "email";
      var phone_id = "phone";
      var zipCode_id = "zip";
      var age_id = "age";
      var bthday_id = "birth_date";
      var signature_id = "signature";
      var signatureDate_id = "signature_date"


      var reg_email = /^([A-Za-z-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]{2,4})$/;
      var reg_phone = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
      var reg_names = /^[a-zA-Z ]+$/;
      var reg_city = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
      var reg_zip = /\d{5}/; //Spain zip code only.


      var flag = true; //boolean variable if something is wrong:

      var first_name = document.getElementById("firstname");
      var last_name = document.getElementById("lastname");
      var parent_name = document.getElementById("parent");
      var city_name = document.getElementById("city");

      var signature_name = document.getElementById("signature");
      var signature_calendar = document.getElementById("sig_date");
      var signature_date = new Date(signature_calendar.value);

      var email_address = document.getElementById("email");
      var phone_number = document.getElementById("phone");
      var zip_code = document.getElementById("zip");
      var birthday = document.getElementById("bthday");
      var bthday_date = new Date(birthday.value);

      var current_time = new Date();
      current_time.setUTCHours(0, 0, 0, 0); //Set hours to the same +01:00 standart of date time in calendars.                       
      //Calculate Age and create response accordingly
      var playerAge = calculateAge(bthday_date, current_time);

      //Reset all background color
      first_name.style.backgroundColor = "";
      last_name.style.backgroundColor = "";
      city_name.style.backgroundColor = "";
      email_address.style.backgroundColor = "";
      phone_number.style.backgroundColor = "";
      zip_code.style.backgroundColor = "";
      birthday.style.backgroundColor = "";
      parent_name.style.backgroundColor = "";
      signature_name.style.backgroundColor = "";
      signature_calendar.style.backgroundColor = "";

      //Loop through all tooltip to hide them.
      var all_error_tooltips = document.getElementsByClassName("tooltiptext");
      for (let i = 0; i < all_error_tooltips.length; i++) {
          all_error_tooltips[i].style.visibility = "hidden";
      }


      if ((signature_date.getFullYear() != current_time.getFullYear()) || (signature_date.getMonth() != current_time.getMonth()) || (signature_date.getDay() != current_time.getDay())) {
          signature_calendar.style.backgroundColor = error_bacground_color;
          document.getElementById("date_errorMsg").style.visibility = "visible";
          flag = false;          
      }

      if (reg_names.test(signature_name.value) == false) {
          document.getElementById("signature_errorMsg").style.visibility = "visible";
          document.getElementById("signature_errorMsg").innerHTML = "Invalid name. Please enter a name";
          signature_name.focus();
          signature_name.style.backgroundColor = error_bacground_color;

          flag = false;

      }
      if (reg_zip.test(zip_code.value) == false) {
          document.getElementById("zipCode_errorMsg").style.visibility = "visible";
          document.getElementById("zipCode_errorMsg").innerHTML = "Invalid zip code. Please enter a valid zip code for Spain (12345)";
          zip_code.focus();
          zip_code.style.backgroundColor = error_bacground_color;

          flag = false;

      }
      console.log(playerAge);
      if (!Number.isNaN(playerAge)) {
          if (playerAge < 0) {
              document.getElementById("bthDay_errorMsg").style.visibility = "visible";
              document.getElementById("bthDay_errorMsg").innerHTML = "Future player is a Time Traveller! To have been born in the future in the year of " + bthday_date.getFullYear() + " and came back in " + current_time.getFullYear() + " to play some soccer is a damn scientific achievement or some dedication to soccer!";
              birthday.style.backgroundColor = error_bacground_color;
              birthday.focus();
              flag = false;

          } else {
              if (playerAge > 30 && playerAge < 99) {
                  document.getElementById("bthDay_errorMsg").style.visibility = "visible";
                  document.getElementById("bthDay_errorMsg").innerHTML = "Future player is an adult! " + playerAge + " years old means that your are the parent who mistook the date of his children, made an honest mistkae or is retarded and still in school!";
                  birthday.style.backgroundColor = error_bacground_color;
                  birthday.focus();
                  flag = false;
              }
              if (playerAge > 115) {
                  document.getElementById("bthDay_errorMsg").style.visibility = "visible";
                  document.getElementById("bthDay_errorMsg").innerHTML = "Future player is officially dead! " + playerAge + " years old means that he/she is older than the oldest human alive today! In any case, too old or too dead to play at NYSL.";
                  birthday.style.backgroundColor = error_bacground_color;
                  birthday.focus();
                  flag = false;

              }
              if (playerAge > 13 && playerAge <= 115) {
                  document.getElementById("bthDay_errorMsg").style.visibility = "visible";
                  document.getElementById("bthDay_errorMsg").innerHTML = "Future player is too old! " + playerAge + " years old is over the limit (13 Years!) Go to middle school league already!";
                  birthday.style.backgroundColor = error_bacground_color;
                  birthday.focus();
                  flag = false;
              }
              if (playerAge < 5) {
                  document.getElementById("bthDay_errorMsg").style.visibility = "visible";
                  document.getElementById("bthDay_errorMsg").innerHTML = "Future player is too young! " + playerAge + " years old is under the limit (5 Years!) You parents are irresponsible! No matter how brilliant your child seemed to be in your eyes, it's still too damn bloody young! At that age I was still eating mud, or drooling or  being birthed!";
                  birthday.style.backgroundColor = error_bacground_color;
                  birthday.focus();
                  flag = false;
              }

          }
      }else{
          document.getElementById("bthDay_errorMsg").style.visibility = "visible";
              document.getElementById("bthDay_errorMsg").innerHTML = "Invalid or empty date. Please enter a valid birthday date";
              birthday.style.backgroundColor = error_bacground_color;
              birthday.focus();
              flag = false;
      }

      if (reg_city.test(city_name.value) == false) {
          document.getElementById("city_errorMsg").style.visibility = "visible";
          document.getElementById("city_errorMsg").innerHTML = "Invalid city name. Please enter a valid city name";
          city_name.focus();
          city_name.style.backgroundColor = error_bacground_color;

          flag = false;

      }
      if (reg_email.test(email_address.value) == false) {
          document.getElementById("email_errorMsg").style.visibility = "visible";
          document.getElementById("email_errorMsg").innerHTML = "Invalid or empty date. Please enter a valid one";
          email_address.focus();
          email_address.style.backgroundColor = error_bacground_color;

          flag = false;
      }

      if (reg_phone.test(phone_number.value) == false) {
          document.getElementById("phone_errorMsg").style.visibility = "visible";
          document.getElementById("phone_errorMsg").innerHTML = "Invalid phone number. Please enter a valid one with the format: 123-123-1234";
          phone_number.focus();
          phone_number.style.backgroundColor = error_bacground_color;

          flag = false;
      }


      if (reg_names.test(parent_name.value) == false) {
          document.getElementById("parent_errorMsg").style.visibility = "visible";
          document.getElementById("parent_errorMsg").innerHTML = "Invalid name. Please enter a name";
          parent_name.focus();
          parent_name.style.backgroundColor = error_bacground_color;

          flag = false;

      }
      if (reg_names.test(first_name.value) == false) {
          document.getElementById("firstname_errorMsg").style.visibility = "visible";
          document.getElementById("firstname_errorMsg").innerHTML = "First name invalid. Please enter a valid one.";
          first_name.focus();
          first_name.style.backgroundColor = error_bacground_color;
          flag = false;
      }

      if (reg_names.test(last_name.value) == false) {
          document.getElementById("lastname_errorMsg").style.visibility = "visible";
          document.getElementById("lastname_errorMsg").innerHTML = "Last name invalid. Please enter a valid one.";
          last_name.focus();
          last_name.style.backgroundColor = error_bacground_color;
          flag = false;
      }


      console.log(flag);
      return flag;

  }

  function closest_school() {
      var school1 = document.getElementById("school1");
      var school2 = document.getElementById("school2");

      var selected_option_s1 = school1.selectedOptions[0];
      var selected_option_s2 = school2.selectedOptions[0];
      console.log(selected_option_s1);
      console.log(selected_option_s2);

      if (selected_option_s1.value == selected_option_s2.value) {
          for (let i = 0; i < school2.options.length; i++) {
              school2.options[i].removeAttribute("disabled");
          }
          var previous_option_index = school2.options.selectedIndex;
          school2.options[previous_option_index].setAttribute("disabled", "true");

          if (school2.options[previous_option_index].nextElementSibling) {
              school2.options[previous_option_index].nextElementSibling.selected = true;
          } else {
              school2.options[previous_option_index].previousElementSibling.selected = true;
          }
      }


  }

  function check_btn_haveUniform() {
      var checkBox = document.getElementById("haveUniform");
      var radio_btns = document.getElementsByClassName("radio_uniforms");
      for (let i = 0; i < radio_btns.length; i++) {
          //radio_btns[i].checked =!checkBox.checked;
          radio_btns[i].disabled = checkBox.checked;
      }
  }

  function calculateAge(dateOfBirth, dateToCalculate) {

      var age = dateToCalculate.getFullYear() - dateOfBirth.getFullYear();
      var ageMonth = dateToCalculate.getMonth() - dateOfBirth.getMonth();
      var ageDay = dateToCalculate.getDate() - dateOfBirth.getDate();

      if (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) {
          age = parseInt(age) - 1;
      }
      return age;
  }
