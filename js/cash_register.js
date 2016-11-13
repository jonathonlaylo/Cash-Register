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
  //declare variables
  var _tempNum = 0;
  var _decMode = false;
  var _decPlace = 1;
  var _trackDecZeros = 0; // zero tracker to fix last number zero no display bug

  // display currently active number
  function _showNum() {
    display.innerText = "$" + _tempNum;
  }

  // generic function for numerical button presses
  function _pressNumButton(button) {
    if(_decMode === false) { // non decimal mode
      _tempNum *= 10;
      _tempNum += parseInt(button.innerText);
      _showNum();
    } else { // decimal mode
      if(_decPlace > 0.01) { //if smaller than hundredth decimal digit
        _decPlace /= 10;
        _tempNum = _tempNum + _decPlace * parseInt(button.innerText);
        _showNum();
        // because it is making decimals like 5.1099999999999
        _fixDecimalZeros(button);
      }else{ //if entering thousandth decimal digit territory
        message.innerText = "The smallest US currency denomination is $0.01";
      }
    }
  }

  // special function for double zero button
  function _pressDoubleZero() {
    if(_decMode === false) {
      _tempNum *= 100;
      _showNum();
    } else {
      if(_decPlace === 0.01) {
        message.innerText = "The smallest US currency denomination is $0.01";
      }
      if(_decPlace >= 0.01) {
        _decPlace /= 100;
        display.innerText = "$" + _tempNum + ".00";
      }
    }
  }

  // because it is making decimals like 5.1099999999999
  function _cutTenth(num) {
    var newNum = Math.round(num * 10) / 10;
    return newNum;
  }

  // because it is making decimals like 5.1099999999999
  function _cutHundredth(num) {
    var newNum = Math.round(num * 100) / 100;
    return newNum;
  }

  // fix decimal artifacts and zeros in decimal places
  function _fixDecimalZeros(button) {
    if(_decPlace === 0.1) {
      _tempNum = _cutTenth(_tempNum);
      // fix first zero in decimal
      if(parseInt(button.innerText) === 0) {
        _trackDecZeros += 1;
        display.innerText = "$" + _tempNum + ".0";
      }
    }else if(_decPlace === 0.01) {
      _tempNum = _cutHundredth(_tempNum);
      // fix zero after a non-zero number in decimal
      if(parseInt(button.innerText) === 0) {
        display.innerText = "$" + _tempNum + "0";
      }
      // fix second zero in a row in decimal
      if(parseInt(button.innerText) === 0 && _trackDecZeros === 1) {
        display.innerText = "$" + _tempNum + ".00";
      }
    }
  }

  // activate decimal mode
  function _actDec() {
    _decMode = true;
  }

  return {
    showNum: _showNum,
    pressNumButton: _pressNumButton,
    pressDoubleZero: _pressDoubleZero,
    actDec: _actDec
  };
})();

var myCashRegister = cashRegister;

equal.addEventListener('click', function(){cashRegister.showNum();});
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
doubleZero.addEventListener('click', function(){cashRegister.pressDoubleZero();});
decimal.addEventListener('click', function(){cashRegister.actDec();});