function calculatorModule() {
  var _memory = 0;
  var _total = 0;
  var calculator = {};

  calculator.load = function(x){
        _total = x;
        return _total;
  };

  calculator.getTotal = function(x){
      return _total;
  };

  calculator.add = function(x){
      _total += x;
  };

  calculator.subtract = function(x){
      _total -= x;
  };


  calculator.multiply = function(x){
      _total *= x;
  };

  calculator.divide = function(x){
      _total /= x;
  };

  calculator.recallMemory = function(x){
      return _memory;
  };

  calculator.saveMemory = function(x){
      _memory = _total;
  };

  calculator.clearMemory = function(x){
      _memory = 0;
   };

   calculator.load = function(x){
    if (x === "number"){
      throw new Error();
    }
  };

  return calculator;
}