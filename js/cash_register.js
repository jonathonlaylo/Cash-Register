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

// cashRegister iife
cashRegister = (function() {

  // status tracking
  var _decDigits = -1;
  var _decMode = false;
  var _zeroInTenthDec = false;
  var _zeroInHundredthDec = false;
  var _blankState = true;
  var _negative = false;
  var _opMode = false;
  var _pressedEqual = false;
  // temporary storage facilities
  var _op = "add";
  var _operand1 = 0;
  var _operand2 = 0;
  var _tempStr = 0;

  //balance for balance button
  var balance = 0;

  // function for number buttons
  function _pressNumButton(button) {
    _clearOpMode();
    _append(button.innerText);
    _display();
    _checkDecimal();
  }

  // clean up _opMode
  function _clearOpMode() {
    if(_opMode) {
      _tempStr = "0";
      _opMode = false;
      _operand2 = 0;
      _decDigits = -1;
      _decMode = false;
      _zeroInTenthDec = false;
      _zeroInHundredthDec = false;
      _blankState = true;
      _negative = false;
    } // reset states
    if(_pressedEqual) {
      _operand1 = 0;
      _op = "add";
    } // check if just pressed equal
    clear.innerText = "clear";
  }

  // append new number to display
  function _append(num) {
    _tempStr = _operand2.toString();
    if(num === ".") { // if pressed decimal button
      if(_blankState) {
        _tempStr = "0";
      }
      _blankState = false;
      _decMode = true;
      if(_decDigits === -1) {
        _decDigits = 0;
      }
    }else{ // if didn't press decimal button
      if(_blankState) { // if entering first number
        if(_firstNotZero(num)) { // if pressed any number other than zero
          _tempStr = num;
          _blankState = false;
        }
        if(num === "0" || num === "00") { // if pressed zero
          _tempStr = "0";
          _blankState = false;
        }
      }else{ // if not entering first number
        if(_decMode){ // if in decimal mode
          _tempStr = _appendDecMode(_tempStr, num);
        }else{ // if not in decimal mode
          _tempStr = _appendNotDecMode(_tempStr, num);
        }
      }
    }
    _operand2 = parseFloat(_tempStr);
  }

  // return true if button pressed is neither zeroes
  function _firstNotZero(button) {
    return (button != "0") && (button != "00");
  }

  // run if in decimal mode
  function _appendDecMode(_tempStr, num) {
    switch(_decDigits) { // check how many decimal places in
      case 0: // entering first decimal digit
        _decDigits++;
        _tempStr += ".";
        _tempStr += num;
        if(num === "0") {
          _zeroInTenthDec = true;
        } // note that tenth decimal place is zero
        if(num === "00") {
          _zeroInTenthDec = true;
          _zeroInHundredthDec = true;
          _decDigits++;
        } // note that tenth & hundredth decimal place is zero
        break;
      case 1: // entering second decimal digit
        _decDigits++;
        if(_zeroInTenthDec) {
          _tempStr += ".0";
        } // fix bug when previous digit is zero
        if(num === "00") {
          _zeroInHundredthDec = true;
        } // note that hundredth decimal place is zero
        _tempStr += num;
        break;
      case 2:
        _decDigits++;
        break;
    }
    return _tempStr;
  }

  // display decimal error
  function _checkDecimal() {
    if(_decDigits > 2) {
      message.innerText = "Highest US$ denomination is $0.01";
    }
  }

  // run if not in decimal mode
  function _appendNotDecMode(_tempStr, num) {
    _tempStr += num;
    return _tempStr;
  }

  // refresh display
  function _display() {
    console.log("displayed");
    if(_negative) { // if currently processing negative number
      if(_op === "add" || _op === "subtract") { // add dollar sign if adding or subtracting
        display.innerText = "- $ " + format();
        message.innerText = "- $ " + format();
      }else{ // do not add dollar sign if multiplying or dividing
        display.innerText = "- " + format();
        message.innerText = "- " + format();
      }
    }else{ // if currently processing positive number
      if(_op === "add" || _op === "subtract") { // add dollar sign if adding or subtracting
        display.innerText = "$ " + format();
        message.innerText = "$ " + format();
      }else{ // do not add dollar sign if multiplying or dividing
        display.innerText = format();
        message.innerText = format();
      }
    }
  }

  // format decimals
  function format() {
    switch(_decDigits) {
      case 0: // if just pressed decimal button
        return _operand2 + "."; // display decimal sign
      case 1: // if just entered first decimal digit
        if(_zeroInTenthDec) {
          return _operand2 + ".0";
        } // fix does not display when first decimal digit is zero bug
        return _operand2;
      case 2: // if just entered second decimal digit
      case 3: // same thing when attempting to enter third decimal digit
        if(_zeroInTenthDec && _zeroInHundredthDec) {
          return _operand2 + ".00";
        } // fix does not display when second decimal digit is zero bug
        if(_zeroInHundredthDec) {
          return _operand2 + "0";
        }
        return _operand2;
      default: // if there are no decimals
        return _operand2.toString();
    }
  }

  // function for operator buttons
  function _pressOpButton(button) {
    if(_negative) { // before operation, check if current number is negative
      _operand2 = 0 - _operand2;
    }
    if(_opMode === false) { // if not selecting operation
      _calculate();
    }
    _opMode = true;
    _op = button.id;
    _displayCurrentOpMode(button); // output to #message current op mode
  }

  // special function for subtract button
  // if used in blank state, act as negative button
  // if not used in blank state, act as minus button
  function _pressSubtract(button) {
    if(_blankState && button.id === "subtract") {
      _negative = true;
      _display();
    }else{
      _pressOpButton(button);
    }
  }

  // perform calculations
  function _calculate() {
    switch(_op) {
      case "add":
        calculatorModule.add(_operand1, _operand2);
        break;
      case "subtract":
        calculatorModule.subtract(_operand1, _operand2);
        break;
      case "multiply":
        calculatorModule.multiply(_operand1, _operand2);
        break;
      case "divide":
        calculatorModule.divide(_operand1, _operand2);
        break;
    }
    // round final answer to two decimal digits
    calculatorModule.write_total(Math.round(calculatorModule.recall_total() * 100) / 100);
    // assign final answer to _operand1
    _operand1 = calculatorModule.recall_total();
  }

  // output to #message current operation mode
  function _displayCurrentOpMode() {
    _formatZeros(); // formatting for _operand1 (final result)
    // indicate did not press equal button as default
    // to prevent clearing display
    _pressedEqual = false;
    switch(_op) {
      case "add":
        message.innerText += " +";
        break;
      case "subtract":
        message.innerText += " -";
        break;
      case "multiply":
        message.innerText += " ×";
        break;
      case "divide":
        message.innerText += " ÷";
        break;
      case "equal":
        message.innerText = "= " + message.innerText;
        _pressedEqual = true; // indicate pressed equal button
    }
  }

  // formatting for _operand1 (final result)
  function _formatZeros() {
    if(_operand1 < 0) {
      message.innerText = "- $ " + (0 - _operand1);
      display.innerText = "- $ " + (0 - _operand1);
    }else{
      message.innerText = "$ " + _operand1;
      display.innerText = "$ " + _operand1;
    }
  }

  // function for clear button
  function _pressClearButton(button) {
    _opMode = true; // to enable _clearOpMode() to perform actions
    if(button.innerText === "clear") {
      _clearOpMode();
      button.innerText = "all clear";
      _opMode = true; // recover opMode because stepping back
      _displayCurrentOpMode();
    }else{
      _pressedEqual = true;
      _clearOpMode();
      _display();
    }
  }

  function _pressBalanceButton(button){
    display.innerText = calculatorModule.recall_cash();
  }

  function _pressDepositButton(button){
    var tempStoreDeposit = 0;
    tempStoreDeposit = calculatorModule.recall_cash();
    if(_operand2 < 0){
      message.innerText = "Can not deposit with a negative cash!";
    } else {
      calculatorModule.write_cash(calculatorModule.add(tempStoreDeposit));
    }
    console.log(tempStoreDeposit);
  }

  function _pressWithdrawButton(button){
    var tempStoreDeposit = 0;
    tempStoreDeposit = calculatorModule.recall_cash();
    if (tempStoreDeposit < _operand2) {
      message.innerText = "Can not withdraw with negative balance!";
    } else {
      calculatorModule.write_cash(calculatorModule.subtract(tempStoreDeposit));
    }
    console.log(tempStoreDeposit);
  }

  // reveal public functions
  return{
    pressNumButton: _pressNumButton,
    pressOpButton: _pressOpButton,
    pressSubtract: _pressSubtract,
    pressClearButton: _pressClearButton,
    pressBalanceButton: _pressBalanceButton,
    pressDepositButton: _pressDepositButton,
    pressWithdrawButton: _pressWithdrawButton
  };

})();

// addEventListener
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
subtract.addEventListener('click', function(){cashRegister.pressSubtract(subtract);});
multiply.addEventListener('click', function(){cashRegister.pressOpButton(multiply);});
divide.addEventListener('click', function(){cashRegister.pressOpButton(divide);});
clear.addEventListener('click', function(){cashRegister.pressClearButton(clear);});
getBalance.addEventListener('click', function(){cashRegister.pressBalanceButton(getBalance);});
deposit.addEventListener('click', function(){cashRegister.pressDepositButton(deposit);});
withdraw.addEventListener('click', function(){cashRegister.pressWithdrawButton(withdraw);});
