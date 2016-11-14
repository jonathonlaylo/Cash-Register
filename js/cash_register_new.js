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
  // temporary storage facilities
  var _op = "add";
  var _operand1 = 0;
  var _operand2 = 0;

  // function for number buttons
  function _pressNumButton(button) {
    _clearOpMode();
    _append(button.innerText);
    _display();
  }

  // clean up _opMode
  function _clearOpMode() {
    if(_opMode) {
      _opMode = false;
      _operator2 = 0;
      _decDigits = 0;
      _zeroInTenthDec = false;
      _zeroInHundredthDec = false;
      _firstZero = true;
      _negative = false;
    }
  }

  //
  function _append(num) {
    var _tempStr = _operand2.toString();
    if(num === ".") {
      _blankState = false;
      _decMode = true;
      if(_decDigits === -1) {
        _decDigits = 0;
      }
    }else{
      if(_blankState) {
        if(_firstNotZero(num)) {
          _tempStr = num;
          _blankState = false;
        }
      }else{
        if(_decMode){
          _tempStr = _appendDecMode(_tempStr, num);
          //console.log(_tempStr);
        }else{
          _tempStr = _appendNotDecMode(_tempStr, num);
        }
      }
    }
    //console.log(_tempStr);
    _operand2 = parseFloat(_tempStr);
  }

  function _firstNotZero(button) {
    return (button != "0") && (button != "00");
  }

  function _appendDecMode(_tempStr, num) {

    switch(_decDigits) {
      case 0:
        _decDigits++;
        _tempStr += ".";
        _tempStr += num;
        //console.log(_tempStr, num, _decDigits);
        break;
      case 1:
        _decDigits++;
        _tempStr += num;
        break;
      case 2:
        message.innerText = "No!";
        break;
    }
    return _tempStr;
  }

  function _appendNotDecMode(_tempStr, num) {
    _tempStr += num;
    return _tempStr;
  }

  // refresh display
  function _display() {
    if(_negative) {
      display.innerText = "- $" + format();
    }else{
      display.innerText = "$" + format();
    }
  }

  // format decimals
  function format() {
    switch(_decDigits) {
      case 0:
        return _operand2 + ".";
      case 1:
        if(_zeroInTenthDec) { return _operand2 + ".0"; }
        return _operand2;
      case 2:
        if(_zeroInTenthDec && _zeroInHundredthDec) { return _operand2 + ".00"; }
        return _operand2;
      default:
        return _operand2;
    }
  }

  // function for operator buttons
  function _pressOpButton() {

  }

  return{
    pressNumButton: _pressNumButton,
    pressOpButton: _pressOpButton
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
subtract.addEventListener('click', function(){cashRegister.pressOpButton(subtract);});
multiply.addEventListener('click', function(){cashRegister.pressOpButton(multiply);});
divide.addEventListener('click', function(){cashRegister.pressOpButton(divide);});