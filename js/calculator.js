var calculatorModule = (function(x, y){

  var _total = 0;
  var _cash = 0;

    function clear(){
      _total = 0;
      return _total;
    }

    function add(x,y){
      _total = x + y;
    }

    function subtract(x, y){
      _total = x - y;
    }

    function divide(x, y){
      _total = x / y;
    }

    function multiply(x, y){
      _total = x * y;
    }

    function recall_total(){
      return _total;
    }

    function write_total(num){
      _total = num;
      return _total;
    }

    function recall_cash(){
      return _cash;
    }

    function write_cash(){
      _cash = _total;
      return _cash;
    }

    return {
      clear: clear,
      add: add,
      subtract: subtract,
      divide: divide,
      multiply: multiply,
      recall_total: recall_total,
      write_total: write_total,
      recall_cash: recall_cash,
      write_cash: write_cash
    };

})();