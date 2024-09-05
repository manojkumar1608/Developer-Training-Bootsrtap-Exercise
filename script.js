$(document).ready(function () {
  //initial styles
  $("#wrapper").css({
    border: "2px solid black",
  });

  $("#mypage_header").css({
    height: "10px",
  });

  $("#mypage_header h1").css({
    display: "none",
  });

  // Header hover effects
  $("#mypage_header").hover(
    function () {
      // Mouse enters
      $("#mypage_header h1").css({
        display: "block",
      });
      $(this).stop(true).animate({ height: "100px" }, 600);
    },
    function () {
      // Mouse leaves
      $("#mypage_header h1").css({
        display: "none",
      });
      $(this).stop(true).animate({ height: "10px" }, 600);
    }
  );

  // Footer hover effect with slideDown()
  const $footer = $("#mypage_footer footer");
  let isPopup = false;

  $footer.css({
    display: "none",
  });

  $("#mypage_footer").on("mouseenter", function () {
    $footer.stop(true, true).slideDown(10000, function () {
      isPopup = true;
      var myModal = new bootstrap.Modal(document.getElementById("myModal"));
      myModal.show();
    });
  });

  $("#mypage_footer").on("mouseleave", function () {
    if (!isPopup) {
      $footer.stop(true).slideUp(500);
    }
  });

  $(".btn").on("click", function () {
    isPopup = false;
    $footer.stop(true).slideUp(500);
  });

  //  Max Number form submission
  $("#maxbtn").on("click", function (event) {
    event.preventDefault(); // Prevent form submission
    let number1 = parseFloat($("#num1").val());
    const number2 = parseFloat($("#num2").val());
    const resultElement = $("#max_result");
    const errorElement = $("#max_error");

    if (isNaN(number1) || isNaN(number2)) {
      resultElement.text("");
      errorElement.text("Please enter valid numbers!");
      return;
    }
    const maxValue = number1 > number2 ? number1 : number2;
    errorElement.text("");
    resultElement.text(`Max: ${maxValue}`);
  });

  //  Reverse String form submission
  $("#reverseBtn").on("click", function (event) {
    event.preventDefault(); // Prevent form submission
    const inputString = $("#stringInput").val();
    const errorElement = $("#reverse_error");
    const resultElement = $("#reverse_result");

    errorElement.text("");
    resultElement.text("");

    if (inputString.trim() === "") {
      errorElement.text("Please Enter a Valid String");
    } else {
      const reversedString = inputString.split("").reverse().join("");
      resultElement.text(reversedString);
    }
  });

  // Find Longest Word form submission
  $("#findLongestBtn").on("click", function (event) {
    event.preventDefault(); // Prevent form submission
    const inputString = $("#wordInput").val();
    const errorElement = $("#longestWord_error");
    const resultElement = $("#longestWord_result");

    errorElement.text("");
    resultElement.text("");

    if (inputString.trim() === "") {
      errorElement.text("Field cannot be Empty");
    } else {
      const wordsArray = inputString.split(",").map((word) => word.trim());
      const longestWord = wordsArray.reduce(
        (a, b) => (a.length > b.length ? a : b),
        ""
      );
      resultElement.text(longestWord);
    }
  });

  // Load details from cookies
  function loadDetails() {
    const cookies = document.cookie.split(";");
    if (cookies.length > 1) {
      cookies.forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");
        if (name === "name") {
          $(".header-name").text(decodeURIComponent(value));
        } else if (name === "phone") {
          $(".phone").html(`<span>Phone:</span> ${decodeURIComponent(value)}`);
        }
      });
    } else {
      $(".header-name").text("Manoj Kumar");
      $(".phone").html(`<span>Phone:</span>9908993803`);
    }
  }

  // Save details in cookies
  function saveDetails() {
    const name = $("#nameInput").val();
    const phone = $("#phoneInput").val();
    const errorElement = $("#cookie_error");
    const resultElement = $("#cookie_result");

    const validName = /^[a-zA-Z\s]*$/;
    const validPhone = /^[0-9\s]*$/;

    errorElement.text("");
    resultElement.text("");

    if (name.trim() === "") {
      errorElement.text("Please Enter Your Name!");
    } else if (!validName.test(name)) {
      errorElement.text("Name contains invalid characters!");
    } else if (phone.trim() === "") {
      errorElement.text("Please Enter Your Phone Number!");
    } else if (!validPhone.test(phone)) {
      errorElement.text("Phone Number contains invalid characters!");
    } else {
      // Cookies with an expiry date of 7 days
      document.cookie = `name=${encodeURIComponent(name)}; max-age=${
        7 * 24 * 60 * 60
      }`;
      document.cookie = `phone=${encodeURIComponent(phone)}; max-age=${
        7 * 24 * 60 * 60
      }`;

      errorElement.text("");
      resultElement.text("Data Saved Successfully!");
    }
  }

  // Calling loadDetails on document ready
  loadDetails();

  // event listener for saveDetails button
  $("#saveBtn").on("click", function (event) {
    event.preventDefault(); // Prevent form submission
    saveDetails();
  });
});
