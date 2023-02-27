// todo: After six digits number gets smaller in order to fit in windows
// todo: Operator Botton's background turns into white when it is lelected
// todo: AC turns into C when there is some expression and then transformes into AC back again
// todo: Make keyboard inputs work with the calculator
// todo: Limit the visible display number to 9 digits + decimal 9 digits
// todo: Make display font size dynamically change for when you have 6, 7, 8, 9 digits
// done: first number that is written shows as underfined but folowing numbers are ok. Why so, find it
// done: it is not possible to put , and . in one expression
// Wrote displayEl.textContent instead of setStrAsDisplay

// DOM elements
const hourEl = document.querySelector('.hour');                                 // interacting with elements from HTML in DOM
const minuteEl = document.querySelector('.minute');                             // interacting with elements from HTML in DOM
const displayEl = document.querySelector('.display')                            // interacting with elements from HTML in DOM

const acEl = document.querySelector('.ac');                                     // interacting with elements from HTML in DOM
const pmEl = document.querySelector('.pm');                                     // interacting with elements from HTML in DOM
const percentEl = document.querySelector('.percent');                           // interacting with elements from HTML in DOM

const divisionEl = document.querySelector('.division');                         // interacting with elements from HTML in DOM
const multiplicationEl = document.querySelector('.multiplication');             // interacting with elements from HTML in DOM
const subtractionEl = document.querySelector('.subtraction');                   // interacting with elements from HTML in DOM
const additionEl = document.querySelector('.addition');                         // interacting with elements from HTML in DOM
const equalEl = document.querySelector('.equal');                               // interacting with elements from HTML in DOM

const decimalEl = document.querySelector('.decimal');                           // interacting with elements from HTML in DOM
const number0El = document.querySelector('.number-0');                          // interacting with elements from HTML in DOM
const number1El = document.querySelector('.number-1');                          // interacting with elements from HTML in DOM
const number2El = document.querySelector('.number-2');                          // interacting with elements from HTML in DOM
const number3El = document.querySelector('.number-3');                          // interacting with elements from HTML in DOM
const number4El = document.querySelector('.number-4');                          // interacting with elements from HTML in DOM
const number5El = document.querySelector('.number-5');                          // interacting with elements from HTML in DOM
const number6El = document.querySelector('.number-6');                          // interacting with elements from HTML in DOM
const number7El = document.querySelector('.number-7');                          // interacting with elements from HTML in DOM
const number8El = document.querySelector('.number-8');                          // interacting with elements from HTML in DOM
const number9El = document.querySelector('.number-9');                          // interacting with elements from HTML in DOM
const numberElArray  = [                                                        // declaring array that contents all numbers of calculator
    number0El, number1El, number2El, number3El, number4El, 
    number5El, number6El, number7El, number8El, number9El
];







// Variables
let displayStrInMemory = null                                                   // giving two initial variable with value of null      
let operatorInMemory = null                                                     // giving two initial variable with value of null





// Function 
const getDisplayAsStr = () => displayEl.innerText.split(',').join('')                    // function that adds , to number

const getDisplayAsNum = () => {
    return parseFloat(getDisplayAsStr())
}

const setStrAsDisplay = (displayStr) => {                                               // function that adds . to nuber
    
    if(displayStr[displayStr.length - 1] === '.'){                                    
        displayEl.textContent += '.'
    }else{
        const [wholeNumStr, decimalStr] = displayStr.split('.')
        if (decimalStr){
            displayEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr    // if number does not have yet . adds .
        } else {
            displayEl.textContent = parseFloat(wholeNumStr).toLocaleString()                       // if already has does not put extrea . in number
        }    
    }
}


const handleNumberClick = (numStr) => {                                            // function that replace 0 to numbers from 1 to 9 
    const currentDisplayStr = getDisplayAsStr();
    if (currentDisplayStr === '0') {    
        setStrAsDisplay(numStr);
    } else {
        setStrAsDisplay(currentDisplayStr + numStr);    
    }
};


const getResultOfOperationAsStr = () => {                                         // functions that saves number and operator then after chosing another number. Gets new number with number that it memories to do some expression
    const currentDisplayNum = getDisplayAsNum()
    const displayNumInMemory = parseFloat(displayStrInMemory)
    let newDisplayNum
    if (operatorInMemory === 'addition'){
        newDisplayNum = displayNumInMemory + currentDisplayNum
    } else if (operatorInMemory === 'subtraction'){
        newDisplayNum = displayNumInMemory - currentDisplayNum
    } else if (operatorInMemory === 'multiplication'){
        newDisplayNum = displayNumInMemory * currentDisplayNum
    } else if (operatorInMemory === 'division'){
        newDisplayNum = displayNumInMemory / currentDisplayNum
    }

    return newDisplayNum.toString()                                             // returns value of expression in the form of string
}


const handleOperatorClick = (operation) => {
    const currentDisplayStr = getDisplayAsStr()
    if (!displayStrInMemory){
        displayStrInMemory = currentDisplayStr
        operatorInMemory = operation
        setStrAsDisplay('0')
        return
    }
    displayStrInMemory = getResultOfOperationAsStr()
    operatorInMemory = operation
    setStrAsDisplay = '0'
}








// Add Event Listeners to functions
acEl.addEventListener('click', () =>{                                      // function that makes everythin null. Resets
    setStrAsDisplay('0')
    displayStrInMemory = null
    operatorInMemory = null
})
pmEl.addEventListener('click', () => {                                     // function that makes number opposite of itself. Number that was given or result of expression
    const currentDisplayNum = getDisplayAsNum()
    const currentDisplayStr = getDisplayAsStr()
    
    if (currentDisplayStr === '-0'){
        setStrAsDisplay('0')
        return
    }
    if (currentDisplayNum >= 0 ){
        setStrAsDisplay('-' + currentDisplayStr)
    } else {
        setStrAsDisplay(currentDisplayStr.substring(1))                  // removes from number the sign. Substring works to cut texts to get a part of them. 1 means getting all the text except first letter(sign, number)
    }
})
percentEl.addEventListener('click', () => {                              // finds 1 percent of the number that is given in the display
    const currentDisplayNum = getDisplayAsNum()
    const newDisplayNum = currentDisplayNum / 100
    setStrAsDisplay(newDisplayNum.toString())
    displayStrInMemory = null                                           // this two lines of got make the program to forgot all preveius calcultaion that was stored in the memory     
    operatorInMemory = null                                             // this two lines of got make the program to forgot all preveius calcultaion that was stored in the memory
})





// Add Event Listeners to operators
additionEl.addEventListener('click', () => {                           // while clicking to bottoms of operators they have names that was given to getResultOperator to use names of operator in order to make expression with them. Line 89
    handleOperatorClick('addition')
})
subtractionEl.addEventListener('click', () => {
    handleOperatorClick('subtraction')
})
multiplicationEl.addEventListener('click', () => {
    handleOperatorClick('multiplication')
})
divisionEl.addEventListener('click', () => {
    handleOperatorClick('division')
})
equalEl.addEventListener('click', () => {                               // shows the result of expression on desplay 
    if (displayStrInMemory){
        setStrAsDisplay(getResultOfOperationAsStr())  
        displayStrInMemory = null                                       // and forgets about prevous calculation
        operatorInMemory = null
    }
})



    



// Add Event Listeners to numbers and decimal 
for (let i=0; i < numberElArray.length; i++) {                         // make to write numbers as string one following another
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
      handleNumberClick(i.toString());
    });
  }
  decimalEl.addEventListener('click', () => {                         // make to put decimal after a number in the form of string
    const currentValueStr = getValueAsStr();
    if (!currentValueStr.includes('.')) {
      setStrAsValue(currentValueStr + '.');
    }
  });
  
// window.addEventListener('load',()=>{
//     for (let i=0; i < numberElArray.length; i++) {
//         const numberEl = numberElArray[i];
//         numberEl.onclick=  () => {
//             handleNumberClick(i.toString());
//         }; 
//       }
//       decimalEl.onclick= () => {
//         const currentDisplayStr = getDisplayAsStr()
//         if (!currentDisplayStr.includes('.')){
//             setStrAsDisplay(currentDisplayStr + '.')  
//         }
//     }
// },false); 





// Set up the time
const updateTime = () => {
    const currentTime = new Date()                                                      // time of laptob or phone

    let currentHour = currentTime.getHours()                                            // let because i changed value in the line 226
    const currentMinute = currentTime.getMinutes()                                      // const because i did not changed the property

    if(currentHour > 12 ){                                                              // converting currenHour to let change the time to 12 hours schedule
        currentHour -= 12
    }

    hourEl.textContent = currentHour.toString()                                         // converting hour and minute into string
    minuteEl.textContent = currentMinute.toString().padStart(2, '0')                    // padStart is maximum number that should be theresd
}
setInterval(updateTime, 1000 )                                                          // function that after 1 second updates time
updateTime()                                                                            // declaring function so that it would work
 


