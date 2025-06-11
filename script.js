const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
const operatorSet = ['+', '−', '×', '÷'];

function replaceOperators(str) {
  return str.replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-');
}

function updateDisplay() {
  display.textContent = currentInput || '0';
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const btnValue = button.textContent;

    if (button.classList.contains('clear')) {
    
      currentInput = '';
      updateDisplay();
      return;
    }

    if (button.classList.contains('backspace')) {
      
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
      }
      return;
    }

     if (button.classList.contains('percent')) {
      if (currentInput === '') return;

      let parts = currentInput.split(/([\+\−\×\÷])/);
      let lastPart = parts[parts.length - 1];

      if (!isNaN(lastPart) && lastPart !== '') {
        let num = parseFloat(lastPart);
        num = num / 100;
        parts[parts.length - 1] = num.toString();
        currentInput = parts.join('');
        updateDisplay();
      }
      return;
    }

    if (button.classList.contains('equal')) {
      // Calculate result
      if (currentInput === '') return;
      try {
        const expression = replaceOperators(currentInput);
        const result = eval(expression);
        currentInput = result.toString();
        updateDisplay();
      } catch (e) {
        display.textContent = 'Error';
        currentInput = '';
      }
      return;
    }

    // Prevent multiple operators in a row
    if (operatorSet.includes(btnValue)) {
      if (currentInput === '') return; 
      const lastChar = currentInput.slice(-1);
      if (operatorSet.includes(lastChar)) {
       
        currentInput = currentInput.slice(0, -1) + btnValue;
        updateDisplay();
        return;
      }
    }

    // Prevent multiple decimals in a number
    if (btnValue === '.') {
      let parts = currentInput.split(/[\+\−\×\÷]/);
      let lastNumber = parts[parts.length - 1];
      if (lastNumber.includes('.')) return;
    }

    currentInput += btnValue;
    updateDisplay();
  });
});
