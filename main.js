// module pattern for Calculator
function Calculator() {
  //full expression to evaluate
  var fullEx = ''; 
  //current number or operand
  var currentEx = ''; 
  // eliminates dot character in currentEx, if not followed by any other number and returns currentEx
  function trimCurrent() {
    if (currentEx.slice(-1) === '.') {
      currentEx = currentEx.slice(0,-1); 
    }
    return currentEx;
  }
  //splits an expression string at given index and returns result as array or two elements
  function splitExpression(expression, index) {
    return [expression.substring(0,index), expression.substring(index+1)];
  }
  // recursively calculates result of expression in a tree-like manner and returns it
  function evaluate(expression) {
    /*splits expression at first occurence of an operation, in order of precedence
    * Precedence ensures operations are calculated in the right order
    * Precedence of operations: + - * /
    * Exmple: 1+2*3-4 (result 3)
    * Recursive calls:
    *   ('1' + '2*3-4') -> splitting at +
    *   (('1') + ('2*3-4')) -> 1 is a pure number, '2*3-4' is not, recursively split 
    *   (('1') + ('2*3' - '4')) -> splitting at -
    *   (('1') + (('2*3') - ('4'))) -> 4 is a pure number, '2*3' is not, recursively split 
    *   (('1') + (('2' * '3') - ('4'))) -> splitting at *
    *   (('1') + ((('2') * ('3')) - ('4'))) -> 2 and 3 are pure numbers, recursion bottoms here
    *   ('1' + ('6' - '4')) -> caluculates 2 * 3 = 6
    *   ('1' + '2') -> caluculates 6 - 4  = 2
    *   ('3') -> caluculates 1 + 2 = 3
    */
    if(expression.indexOf('+') !== -1) {
      var subEx = splitExpression(expression, expression.indexOf('+'));
      return evaluate(subEx[0]) + evaluate(subEx[1]);
    } else if(expression.indexOf('-') !== -1) {
      //splits expression from last index to maintain correct order of execution
      // lastIndexOf: 3-2-1 -> (3-2)-1 = 0, correct
      // indexOf: 3-2-1 -> 3-(2-1) = 2, incorrect
      var subEx = splitExpression(expression, expression.lastIndexOf('-'));
      return evaluate(subEx[0]) - evaluate(subEx[1]);
    } else if(expression.indexOf('*') !== -1) {
      var subEx = splitExpression(expression, expression.indexOf('*'));
      return evaluate(subEx[0]) * evaluate(subEx[1]);
    } else if(expression.indexOf('/') !== -1) {
      //splits expression from last index to maintain correct order of execution
      // lastIndexOf: 6/2/2 -> (6/2)/2 = 1.5, correct
      // indexOf: 6/2/2 -> 6/(2/2) = 6, incorrect
      var subEx = splitExpression(expression, expression.lastIndexOf('/'));
      return evaluate(subEx[0]) / evaluate(subEx[1]);
    } else {
      if (expression.indexOf('.') === -1) {
        return parseInt(expression);
      } else {
        return parseFloat(expression);
      }
    }    
  }
  
  return {
    // sets value of current expression
    setCurrent: function(digit) { return currentEx += digit; }, 
     // returns value of current expression  
    getCurrent: function() {return currentEx; },
    // returns value of full expression operation  
    getFull: function() {return fullEx; },
    //check if dot has been used in current number
    isFloat: function() {
      return (currentEx.indexOf('.') !== -1) ? true : false;
    },
    //check if current expression is an operation
    isOperator: function() {
      return isNaN(currentEx);
    },
    // clears currentEx and floatFalg
    clear: function() {
      currentEx = '';
    },
    // clears currentEx, fullEx and floatFlag
    reset: function() {
      currentEx = '';
      fullEx = '';
    },
    // adds current expression to fullEx
    addExpr: function() {
      fullEx += trimCurrent();
      return fullEx;
    },
    // calculates and returns result of fullEx
    getResult: function(){
      var result = evaluate(fullEx);
      return ( result % 1 === 0)
        ? result // result is integer
        :result.toString(); // result is float, limit float digits to 4 and removes trailing zeros
    }
  } 
}//end calc

// on document ready
$(function(){
  var mainScreen = $('#main_screen input'); 
  var subScreen = $('#sub_screen input');
  var calc = new Calculator();
  
  //checks whether an operation result is being displayed or not
  function isResult() {
    return (subScreen.attr('value').indexOf('=') !== -1) ? true : false;
  }
  
  //resets calculator screens and Calculator object
  function resetCalc() {
    calc.reset();
    mainScreen.attr('value', '0');
    subScreen.attr('value', '');
  }
  
  //clears calculator main screens and Calculator object
  function clearCalc() {
    calc.clear();
    mainScreen.attr('value', '0');
  }
  
  //CE button event
  $('.reset').on('click', function(){
    resetCalc();
  })
  
  // AC button event
  $('.clear').on('click', function(){
    clearCalc()
  })
  
  //number button event: add number to currentEx string and update mainScreen value
  $('.number').on('click', function() {
    if (isResult()) {
      // a result is being displayed, reset calculator and screens
      resetCalc();  
    } 
    if (!calc.isOperator()) {
      mainScreen.attr('value', calc.setCurrent(this.value));  
    } else {
      //prevents entering multiple 0s at the beginning of a number 
      if (this.value === '0') {
        return;
      }
      subScreen.attr('value', calc.addExpr());
      calc.clear();
      mainScreen.attr('value', calc.setCurrent(this.value));    
    }
  })
    
  // float button event:
  $('.float').on('click', function() {
    if (isResult()) {
      // a result is being displayed, reset calculator and screens
      resetCalc();  
    }
    if (calc.isFloat()) { 
      return; //already a float, do nothing
    } else if (calc.isOperator()) {
      // currentEx is an operator, add a leading 0
      subScreen.attr('value', calc.addExpr());
      calc.clear();
      mainScreen.attr('value', calc.setCurrent('0' + this.value));
    } else {
      calc.getCurrent()
      // currentEx is a number, just add the dot
      ? mainScreen.attr('value', calc.setCurrent(this.value))
      // currentEx is empty, add a leading 0
      : mainScreen.attr('value', calc.setCurrent('0' + this.value));
    }
  })
  
  //operator button event: 
  $('.operator').on('click', function(){
    if (isResult()) {
      // a result is being displayed, reset calculator and screens and set previous result as current expression
      // allows to chain results as new operands 
      var operand = mainScreen.attr('value');
      resetCalc();
      calc.setCurrent(operand);
    }
    if(!calc.getCurrent()) {
      alert('Numbers first!'); //no first operand
      return;
    }
    subScreen.attr('value', calc.addExpr());
    calc.clear();
    mainScreen.attr('value', calc.setCurrent(this.value));
  })
  
  //equals button event: parses and evaluates expression and outptus result on main_screen
  $('.equal').on('click', function() {
    if (isResult()) {
      return; //already a result, do nothing
    } else if (calc.isOperator()) {
      alert ('Input operand or Clear (CE) current peration before calculating result.');
    } else {
      subScreen.attr('value', function(i, val) { return calc.addExpr() + '=';} );
      //calc.clear();
      mainScreen.attr('value',calc.getResult());  
    }
  })
})

