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
  var _tempNum = 0;
  var _decMode = false;
  var _decPlace = 1;

  function _showNum() {
    display.innerText = _tempNum;
  }

  function _pressNumButton(button) {
    if (_decMode === false) {
      _tempNum *= 10;
      _tempNum += parseInt(button.innerText);
    } else {
      if(_decPlace !== 0.01) {
        _decPlace /= 10;
        _tempNum = _tempNum + _decPlace * parseInt(button.innerText);
      }else{
        message.innerText = "The smallest US currency denomination is $0.01";
      }
    }
    _showNum();
  }

  function _actDec() {
    _decMode = true;
  }

  return {
    showNum: _showNum,
    pressNumButton: _pressNumButton,
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
decimal.addEventListener('click', function(){cashRegister.actDec();});