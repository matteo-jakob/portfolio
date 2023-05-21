checkCustom();
var conversionMethod = document.getElementById("conversion");
conversionMethod.addEventListener("change", checkCustom);

function checkCustom() {
  var customNumDiv = document.getElementById("custom-number-div");
  var conversionMethod = document.getElementById("conversion");
  if (conversionMethod.value == "custom") {
    customNumDiv.innerHTML = `
    <input type="number" max="16" id="custom-number" placeholder="Custom value" />
    `;
  } else if (conversionMethod.value == "decimal") {
    customNumDiv.innerHTML = `
    <input type="number" max="16" id="custom-number" placeholder="Original conversion" />
    `;
  } else {
    customNumDiv.innerHTML = ``;
  }
}

var form = document.getElementById("form");
form.addEventListener("submit", CalcSubmit);

function CalcSubmit(e) {
  e.preventDefault();
  var number = document.getElementById("number").value;
  var method = document.getElementById("conversion").value;
  if (method == "custom")
    method = document.getElementById("custom-number").value;
  else if (method == "hex") method = 16;
  else if (method == "binary") method = 2;
  else if (method == "octal") method = 8;

  if (method == "decimal") {
    var customNumb = document.getElementById("custom-number").value;
    convertTo10(number, customNumb);
  } else convertFrom10(number, method);
}

function convertFrom10(input, to) {
  let newNumber = "";
  if (input == 0) newNumber = "0";
  if (isNaN(input)) {
    newNumber = "0";
    alert("invalid input");
  } else {
    let rest = input;
    while (input != 0) {
      rest = input % to;
      input -= rest;
      if (to > 10 && rest > 9) {
        rest = numberToLetter(rest);
      }
      newNumber += rest;
      input = Math.floor(input / to);
    }
    if (input < to) {
      if (to > 10 && input > 9) {
        input = numberToLetter(input);
      }
      newNumber += input;
    }
    newNumber = reverseString(newNumber);
  }
  var resArea = document.getElementById("calc-result");
  resArea.innerHTML = newNumber;
}

function convertTo10(input, from) {
  let decimal = 0;
  let inputDigits = input.split("");
  for (let i = 0; i < inputDigits.length; i++) {
    let digit = inputDigits[i];
    if (digit >= "A" && digit <= "F") {
      digit = letterToNumber(digit);
    } else {
      digit = parseInt(digit);
    }
    decimal += digit * Math.pow(from, inputDigits.length - i - 1);
  }
  var resArea = document.getElementById("calc-result");
  resArea.innerHTML = decimal;
}
function letterToNumber(value) {
  if (value == "A") {
    value = 10;
  }
  if (value == "B") {
    value = 11;
  }
  if (value == "C") {
    value = 12;
  }
  if (value == "D") {
    value = 13;
  }
  if (value == "E") {
    value = 14;
  }
  if (value == "F") {
    value = 15;
  }
  return value;
}

function numberToLetter(value) {
  if (value == 10) {
    value = "A";
  }
  if (value == 11) {
    value = "B";
  }
  if (value == 12) {
    value = "C";
  }
  if (value == 13) {
    value = "D";
  }
  if (value == 14) {
    value = "E";
  }
  if (value == 15) {
    value = "F";
  }
  return value;
}
// https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/
function reverseString(str) {
  var splitString = str.split("");
  var reverseString = splitString.reverse();
  reverseString.splice(0, 1);
  var reverseString = reverseString.join("");
  return reverseString;
}
