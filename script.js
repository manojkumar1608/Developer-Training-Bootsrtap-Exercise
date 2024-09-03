$(document).ready(function () {
  $("#wrapper").css({
    border: "2px solid black",
  });
  $("#mypage_header").css({
    height: "10px",
  });
  $("#mypage_header h1").css({
    display: "none",
  });
  // Header setup
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

  //  slide up
  $("#mypage_footer").on("mouseleave", function () {
    if (!isPopup) {
      $footer.stop(true).slideUp(500);
    }
  });

  $(".btn").on("click", function () {
    isPopup = false;
    $footer.stop(true).slideUp(500);
  });
});

function max() {
  let number1 = parseFloat(document.getElementById("num1").value);
  const number2 = parseFloat(document.getElementById("num2").value);
  const resultElement = document.getElementById("max_result");
  const errorElement = document.getElementById("max_error");

  if (isNaN(number1) || isNaN(number2)) {
    resultElement.innerText = "";
    errorElement.innerText = "Please enter valid numbers!";
    return;
  }
  const maxValue = number1 > number2 ? number1 : number2;
  errorElement.innerText = "";
  resultElement.innerText = `Max: ${maxValue}`;
}

function reverse() {
  const inputString = document.getElementById("stringInput").value;
  const errorElement = document.getElementById("reverse_error");
  const resultElement = document.getElementById("reverse_result");

  errorElement.innerText = "";
  resultElement.innerText = "";

  if (inputString.trim() === "") {
    errorElement.innerText = "Please Enter a Valid String";
  }
  const reversedString = inputString.split("").reverse().join("");
  resultElement.innerText = reversedString;
}

function FindLongestWord() {
  const inputString = document.getElementById("wordInput").value;
  const errorElement = document.getElementById("longestWord_error");
  const resultElement = document.getElementById("longestWord_result");
  errorElement.innerText = "";
  resultElement.innerText = "";

  if (inputString.trim() === "") {
    errorElement.innerText = "Field cannot be Empty";
  }
  const wordsArray = inputString.split(",").map((word) => word.trim());
  const longestWord = wordsArray.reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );
  resultElement.innerText = longestWord;
}

// Function to load details from cookies
function loadDetails() {
  const cookies = document.cookie.split(";");
  if (cookies.length > 1) {
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name === "name") {
        document.querySelector(".header-name").innerText =
          decodeURIComponent(value);
      } else if (name === "phone") {
        document.querySelector(
          ".phone"
        ).innerHTML = `<span>Phone:</span> ${decodeURIComponent(value)}`;
      }
    });
  } else {
    document.querySelector(".header-name").innerText = "Manoj Kumar";
    document.querySelector(
      ".phone"
    ).innerHTML = `<span>Phone:</span>9908993803`;
  }
}

// Function to save details in cookies
function saveDetails() {
  const name = document.getElementById("nameInput").value;
  const phone = document.getElementById("phoneInput").value;
  const errorElement = document.getElementById("cookie_error");
  const resultElement = document.getElementById("cookie_result");

  const validName = /^[a-zA-Z\s]*$/;
  const validPhone = /^[0-9\s]*$/;

  errorElement.innerText = "";
  resultElement.innerText = "";

  if (name.trim() === "") {
    errorElement.innerText = "Please Enter Your Name!";
  } else if (!validName.test(name)) {
    errorElement.innerText = "Name contains invalid characters!";
  } else if (phone.trim() === "") {
    errorElement.innerText = "Please Enter Your Phone Number!";
  } else if (!validPhone.test(phone)) {
    errorElement.innerText = "Phone Number contains invalid characters!";
  } else {
    // Cookies with an expiry date of 7 days
    document.cookie = `name=${encodeURIComponent(name)}; max-age=${
      7 * 24 * 60 * 60
    }`;
    document.cookie = `phone=${encodeURIComponent(phone)}; max-age=${
      7 * 24 * 60 * 60
    }`;

    errorElement.innerText = "";
    resultElement.innerText = "Data Saved Successfully!";
  }
}
loadDetails();
