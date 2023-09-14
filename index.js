$(document).ready(function () {
  let cost = 0;
  let adults = 1;
  let days = 0;

  const updateSchedule = function () {
    const checkIn = $("#checkin").val();
    const checkOut = $("#checkout").val();
    const num = Number($("#adults").val());

    if (!(checkIn && checkOut)) return;
    const momentCheckIn = moment(checkIn, "YYYY-MM-DD");
    const momentCheckOut = moment(checkOut, "YYYY-MM-DD");
    const dayDif = momentCheckOut.diff(momentCheckIn, "days");

    $("#days").val(dayDif);
    $("#cost").val(dayDif * 150 * $("#adults").val());
  };

  $("#adults").change(updateSchedule);
  $("#checkin").change(updateSchedule);
  $("#checkout").change(updateSchedule);
});

// submit button
$("#submit-button").click(function (e) {
  e.preventDefault();
  let valid = true;
  let validation = [true, true, true, true, true, true];
  const fields = [
    "#username",
    "#firstname",
    "#lastname",
    "#phone",
    "#fax",
    "#email"
  ];
  const fieldNames = [
    "Username",
    "First Name",
    "Last Name",
    "Phone#",
    "Fax#",
    "E-mail"
  ];

  for (let i = 0; i < 6; i++) {
    checkInput(fields[i], i);
  }

  function checkInput(element, count) {
    if ($(element).val() == "") {
      $(element).addClass("is-invalid");
      validation[count] = false;
    } else {
      $(element).removeClass("is-invalid");
      validation[count] = true;
    }
  }

  for (let i = 0; i < 6; i++) {
    if (!validation[i]) {
      let error = "Missing fields: ";
      error += "</br>" + fieldNames[i];
      valid = false;
    }
  }

  if ($("#days").val() < 0) {
    toastr.error("Days are invalid.");
    toastr.error("Cost is invalid.");
    valid = false;
  }

  if ($("#days").val() == 0) {
    toastr.error("Please enter dates to calculate cost.");
    valid = false;
  }

  if (!valid) toastr.error(error);
  else toastr.success("Successfully submitted!");
});

//reset button
$("#reset-button").click(function () {
  toastr.info("Form cleared!");

  adults = 1;
  cost = 0;
  days = 0;

  $("#adults").val(1);
  $("#username").val("");
  $("#firstname").val("");
  $("#lastname").val("");
  $("#phone").val("");
  $("#fax").val("");
  $("#email").val("");
  $("input[type=date]").val("");
  $("textarea").val("");
  $("input[type=range]").val("");
  $("input[type=radio]").prop("checked", false);
  $("#days").prop("placeholder", "Displays days...");
  $("#cost").prop("placeholder", "Displays cost...");

  $("#username").removeClass("is-invalid");
  $("#firstname").removeClass("is-invalid");
  $("#lastname").removeClass("is-invalid");
  $("#phone").removeClass("is-invalid");
  $("#fax").removeClass("is-invalid");
  $("#email").removeClass("is-invalid");
  document.getElementById("myForm").reset();
});
