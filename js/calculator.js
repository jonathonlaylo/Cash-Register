var calculatorModule = (function(x, y){
  var total = 0;
  var cash = 0;

    function clear(){
      this.total = 0;
      return total;
    }

    function add(x,y){
      total = x + y;
      console.log(total);
      return total;
    }

    function subtract(x, y){
      total = x - y;
      console.log(total);
      return total;
    }

    function divide(x, y){
      total = x / y;
      console.log(total);
      return total;
    }

    function multiply(x, y){
      total = x * y;
      console.log(total);
      return total;
    }

    function recallTotal(x){
      return total;
    }

    function writeTotal(x){
      total = cash;
      return totall;
    }

    function recallCash(x){
      return cash;
    }

    function writeCash(x){
      cash = total;
      return cash;
    }

    return {
      clear: clear,
      add: add,
      subtract: subtract,
      divide: divide,
      multiply: multiply,
      recallTotal: recallTotal,
      writeTotal: writeTotal,
      recallCash: recallCash,
      writeCash: writeCash
    };

})();