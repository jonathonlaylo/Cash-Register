//map buttons to variables
var display = document.getElementById('display');
var message = document.getElementById('message');
var one = document.getElementById('1');
var two = document.getElementById('2');
var three = document.getElementById('3');
var four = document.getElementById('4');
var five = document.getElementById('5');
var six = document.getElementById('6');
var seven = document.getElementById('7');
var eight = document.getElementById('8');
var nine = document.getElementById('9');
var zero = document.getElementById('0');
var doubleZero = document.getElementById('00');
var decimal = document.getElementById('decimal');
var add = document.getElementById('add');
var subract = document.getElementById('subtract');
var multiply = document.getElementById('multiply');
var divide = document.getElementById('divide');
var clear = document.getElementById('clear');
var getBalance = document.getElementById('getBalance');
var deposit = document.getElementById('deposit');
var withdraw = document.getElementById('withdraw');
var equal  = document.getElementById('equal');

cashRegister = (function() {

  var _decTracker = 0;
  var _decMode = false;
  var _firstZero = true;
  var _op = "add";
  var _opMode = false;
  var _operand1 = 0;
  var _operand2 = 0;
  var _negative = false;

  function _pressNumButton(button) {
    _clearNum();
    _clearInitialZero();
    if(_decTracker < 2) { // check if less than 2 decimal digits
      if(_decTracker === 1 && button.innerText === "00") {
        display.innerText += "0"; // fix three digits at decimal when "00" is pressed bug
      }else{
        if(_firstZero) {
          display.innerText += "$";
          if(button.innerText != "0" && button.innerText != "00") {
            _firstZero = false;
          }
        } // add dollar sign if entering first number
        display.innerText += button.innerText; // concat str
        if(display.innerText === "$00") {
          display.innerText = "$0";
        }
      }
      message.innerText = display.innerText;
      _decActions(button); // perform decimal actions
    }else{
      message.innerText = "$0.01 is the smallest US currency denomination"; // error
    }
  }

  function _clearInitialZero() {
    if(display.innerText === "$0") {
      display.innerText = "";
    }
  }

  function _clearNum() {
    if(_opMode) {
      display.innerText = "$0";
      _opMode = false;
      _firstZero = true;
      _decMode = false;
      _decTracker = 0;
      _negative = false;
    }
  }

  function _decActions(button) {
    if(_decMode) {
      _decTracker++;
    } // increment _decTracker if _decMode on and button not "."
    if(button.innerText === ".") {
      _decMode = true;
    } // turn on _decTracker if button is "."
    if(_decMode && button.innerText === "00") {
      _decTracker ++;
    } // increment _decTracker again if button is "00"
  }

  function _displayNeg() {
    if(_negative) {
      display.innerText = display.innerText.substr(2);
      display.innerText = "- $" + display.innerText;
    }
  }

  function _pressOpButton(button) {
    _calculate();
    _opMode = true;
    _op = button.id;
    _displayCurrentOpMode(button);
  }

  function _operandToNum(str) {
    var newNum = 0;
    str = str.substr(1);
    newNum = parseFloat(str);
    return newNum;
  }

  function _displayCurrentOpMode(button) {
    message.innerText = "$" + _operand1;
    display.innerText = "$" + _operand1;
    switch(_op) {
      case "add":
        message.innerText += " plus...";
        break;
      case "subtract":
        message.innerText += " minus...";
        break;
      case "multiply":
        message.innerText += " times...";
        break;
      case "divide":
        message.innerText += " divided by....";
        break;
      case "equal":
        message.innerText = "equals " + message.innerText;
    }
  }

  function _calculate() {
    var operand1 = _operand1;
    var operand2 = _operandToNum(display.innerText);
    switch(_op) {
      case "add":
        _operand1 = calculatorModule.add(operand1, operand2);
        console.log(_operand1);
        break;
      case "subtract":
        _operand1 = calculatorModule.subtract(operand1, operand2);
        break;
      case "multiply":
        _operand1 = calculatorModule.multiply(operand1, operand2);
        break;
      case "divide":
        _operand1 = calculatorModule.divide(operand1, operand2);
        break;
    }
  }

  return {
    pressNumButton: _pressNumButton,
    pressOpButton: _pressOpButton
  };
})();

equal.addEventListener('click', function(){cashRegister.pressOpButton(equal);});
one.addEventListener('click', function(){cashRegister.pressNumButton(one);});
two.addEventListener('click', function(){cashRegister.pressNumButton(two);});
three.addEventListener('click', function(){cashRegister.pressNumButton(three);});
four.addEventListener('click', function(){cashRegister.pressNumButton(four);});
five.addEventListener('click', function(){cashRegister.pressNumButton(five);});
six.addEventListener('click', function(){cashRegister.pressNumButton(six);});
seven.addEventListener('click', function(){cashRegister.pressNumButton(seven);});
eight.addEventListener('click', function(){cashRegister.pressNumButton(eight);});
nine.addEventListener('click', function(){cashRegister.pressNumButton(nine);});
zero.addEventListener('click', function(){cashRegister.pressNumButton(zero);});
doubleZero.addEventListener('click', function(){cashRegister.pressNumButton(doubleZero);});
decimal.addEventListener('click', function(){cashRegister.pressNumButton(decimal);});
add.addEventListener('click', function(){cashRegister.pressOpButton(add);});
subtract.addEventListener('click', function(){cashRegister.pressOpButton(subtract);});
multiply.addEventListener('click', function(){cashRegister.pressOpButton(multiply);});
divide.addEventListener('click', function(){cashRegister.pressOpButton(divide);});