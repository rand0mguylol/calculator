(function(){
  
  let screen = document.querySelector('.screen');
  let buttons = document.querySelectorAll('.btn');
  let clear = document.querySelector('.btn-clear');
  let equal = document.querySelector('.btn-equal');
  let actions = document.querySelectorAll(".btn-yellow");
  let nums = document.querySelectorAll(".btn-num");

  let self = this;
  self.action = ""
  self.firstValue = ""
  self.lastKey = ""

  function assignResult(){

        // In the event the user presses the equal button after an action button, 
        //this enures the secondValue will always have some sort of value, else the screen value is taken
        // secondValue = self.lastKey === "operator"? 0 : screen.value; 
        secondValue =  screen.value; 

        let result = compute(self.firstValue, self.action, secondValue)
        screen.value = result
        self.firstValue = result
  }

  function compute(num1, operatorAction, num2) {
    let result = 0;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operatorAction) {
        case "+":
            result = num1 + num2;
            break;
        
        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;
        
        case "/":
            result = num1 / num2;
            break;
    }

    // If the user divides a number with 0
    if (result === Infinity || isNaN(result)) result = "ERROR"
    return result
  } 

  // Resets all values
  function clearCal(){
    screen.value = '';
    self.action = ""
    self.firstValue = ""
    self.lastKey = ""
  }

  buttons.forEach(function(btn) {
    btn.addEventListener("click", function(){
    if (screen.value === "ERROR" || screen.value === "Please Enter a Value") clearCal()
    })
  })

  nums.forEach(function(num){
    num.addEventListener('click', function(e){
      let value = e.target.dataset.num;
      if(self.lastKey === "operator" || self.lastKey === "equal") screen.value = value  // Reset the screen value instead of appending to it. Last pressed button is either action or equal.
      else screen.value += value; // Append to the current screen value. No action or equal button has been pressed.
      self.lastKey = "num";
      
    })
  });
  
  equal.addEventListener('click', function(e){
    if(screen.value === '')screen.value = 'Please Enter a Value';  
    else if (self.firstValue) assignResult() // self.firstValue is truthy indicates an action button has been pressed so the computation can be performed.
    self.lastKey ="equal" 
    self.action = "" // Resets self.action
    self.firstValue = "" // Resets self.firstValue so the last computed value will be used when actions pressed an action button
  })
  
  clear.addEventListener('click', clearCal)
  
  actions.forEach(function (action) {
    action.addEventListener("click", function(e) {
      if(self.firstValue && self.lastKey === "num") assignResult()  // An action button is truthy and last pressed button was a number. We'll compute and display the new value using the previous pressed action
      else self.firstValue = screen.value === ""? 0: screen.value //  No action button has been pressed or the last pressed button was an equal button (equal button resets self.firstValue).
      self.lastKey = "operator"
      self.action = e.target.dataset.num // If multiple action buttons are pressed in succession, the last pressed value will be assigned.
    })
  })

})();
