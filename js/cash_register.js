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

  function _pressNumButton(button) {
    if(display.innerText === "0") {
      display.innerText = "";
    } // clear initial zero
    if(_decTracker < 2) { // check if less than 2 decimal digits
      if(_decTracker === 1 && button.innerText === "00") {
        display.innerText += "0"; // fix three digits at decimal when "00" is pressed bug
      }else{
        display.innerText += button.innerText; // concat str
        if(display.innerText === "00") {
          display.innerText = 0;
        }
      }
      _decActions(button); // perform decimal actions
    }else{
      message.innerText = "$0.01 is the smallest US currency denomination"; // error
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

  return {
    pressNumButton: _pressNumButton
  };
})();

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
doubleZero.addEventListener('click', function(){cashRegister.pressNumButton(doubleZero);});
decimal.addEventListener('click', function(){cashRegister.pressNumButton(decimal);});