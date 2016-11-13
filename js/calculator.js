var calculatorModule = (function(){
  var total = 0;
  var cash = 0;

    function clear(){
      this.total = 0;
      return total;
    }

    function add(x){
      total += x;
      console.log(total);
      return total;
    }

    function subtract(x){
      total -= x;
      console.log(total);
      return total;
    }

    function divide(x){
      total /= x;
      console.log(total);
      return total;
    }

    function multiply(x){
      total *= x;
      console.log(total);
      return total;
    }

    function recallCash(x){
      return memory;
    }

    function saveCash(x){
      cash = total;
    }

    return {
      clear: clear,
      add: add,
      subtract: subtract,
      divide: divide,
      multiply: multiply,
      recallCash: recallCash,
      saveCash: saveCash
    };
//dasdasdasdadnasd

})();