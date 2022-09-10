class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    // This is going to take all the imputs for and all the functions for the calulator
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    // this gives us a way to set these text elements inside of our calculator class
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    // this is undefined since the user does not have any operation selectd if you clear everything
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
    // We want the very last value and to chop it off, so use the slice method
    // This will take all the different characters inside the string (all the different numbers) from the first numbers to the
    // second to last numberand it is going to say in this new currentoperand variable 
  }

  appendNumber(number) { // this is what happens everytime the user clicks on a button to add to the screen
    if (number === '.' && this.currentOperand.includes('.')) return
    // this will prevent the user from adding additional .  it will the stop the function from going any further
    this.currentOperand = this.currentOperand.toString() + number.toString()
    // the reason we need to convert everything to a string is because JS will try to add these functions like + as numbers,
    // I want the numbers to be appended not added
  }

  chooseOperation(operation) { 
    // this is what is going to happen whenever a user clicks on one of the operations, like plus minus etc
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {// this clearing out the value
      this.compute() // this will update all the variables as we need
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation  // variable for our compute function
    const prev = parseFloat(this.previousOperand)
    // this variable is the number version of our previous opereant, converting a string to a number
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return 
    // if we don't have a previous value or a if we don't have a current value then we want to  return and cancel this function completely
    // if the user doesn't enter anything and selects = , we don't want the code to run 
    switch (this.operation) {
      // switch statement is like a bunch of if statements chained after each other, it allows you do to a bunch of 
      // if statements on a single object
      case '+': // we want the code to run in this case, so the this.operation will run when it equals a *
        computation = prev + current
        break // break means don't follow any of the other case statements and just to just leave the switch statement completely
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        // this is an else statement, this default is for when none of the above value get executed 
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = '' // empty string 
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    // we want a string here because we want to split that string on the decimal character inside of it 
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    // we want to take our string number and split it on the . character , so this is going to take our string and 
    // turn it into an array, the first number in the array is going to be the part before the . and the second number is 
    // going to be after the . 
    // The parseFloat() function parses an argument (converting it to a string first if needed) 
    // and returns a floating point number.
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      // so if someone imputs something that is NaN or not a number
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      // this means that there can never be any decimal places after this value after when it gets convereted to a string 
      // with a comma
    }
    if (decimalDigits != null) {
      // extracts first two numbers after the decimal point
      // to avoid screen overflow. 
      return `${integerDisplay}.${decimalDigits.slice(0,2)}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        // this allows us to see the numbers as we enter
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

// This is first where we needed constant variables for all the buttons 
const numberButtons = document.querySelectorAll('[data-number]') 
// this is going to get all elements that match a certain string
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
// query selector without the 'all' will allow us to select a single element instead of multiple 
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
// this is how you define new classes

numberButtons.forEach(button => { // for each as we want this to loop over all our different buttons
  button.addEventListener('click', () => { // method attaches an event handler to the specified element.
    calculator.appendNumber(button.innerText) // this is going to be 1 to 9 inculding . and 0
    calculator.updateDisplay()
    // this is so the display is constantly updated whenever we click on a button.
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {     
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})