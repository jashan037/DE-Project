let halfInputs = { A: 0, B: 0 };
let fullInputs = { A: 0, B: 0, Bin: 0 };

function toggleInput(type, input) {
    if (type === 'half') {
        halfInputs[input] = 1 - halfInputs[input];
        // Update the input text
        const inputBoxes = document.querySelectorAll('#half-subtractor .input-box span');
        inputBoxes[input === 'A' ? 0 : 1].textContent = halfInputs[input];
        updateHalfSubtractor();
    } else if (type === 'full') {
        fullInputs[input] = 1 - fullInputs[input];
        // Update the input text
        const index = input === 'A' ? 0 : (input === 'B' ? 1 : 2);
        const inputBoxes = document.querySelectorAll('#full-subtractor .input-box span');
        inputBoxes[index].textContent = fullInputs[input];
        updateFullSubtractor();
    }
}

function updateHalfSubtractor() {
    const { A, B } = halfInputs;
    const difference = A ^ B;
    const borrow = (!A && B) ? 1 : 0;
    
    // Update output displays
    const outputs = document.querySelectorAll('#half-subtractor .output-box span');
    outputs[0].textContent = difference;
    outputs[1].textContent = borrow;
    
    // Update wire colors
    const inputWires = document.querySelectorAll('#half-subtractor .input-box::after');
    const outputWires = document.querySelectorAll('#half-subtractor .output-box::before');
    
    inputWires[0].style.opacity = A ? '1' : '0.3';
    inputWires[1].style.opacity = B ? '1' : '0.3';
    outputWires[0].style.opacity = difference ? '1' : '0.3';
    outputWires[1].style.opacity = borrow ? '1' : '0.3';
}

function updateFullSubtractor() {
    const { A, B, Bin } = fullInputs;
    const difference = A ^ B ^ Bin;
    const borrow = (!A && (B || Bin)) || (B && Bin) ? 1 : 0;
    
    // Update output displays
    const outputs = document.querySelectorAll('#full-subtractor .output-box span');
    outputs[0].textContent = difference;
    outputs[1].textContent = borrow;
    
    // Update wire colors
    const inputWires = document.querySelectorAll('#full-subtractor .input-box::after');
    const outputWires = document.querySelectorAll('#full-subtractor .output-box::before');
    
    inputWires[0].style.opacity = A ? '1' : '0.3';
    inputWires[1].style.opacity = B ? '1' : '0.3';
    inputWires[2].style.opacity = Bin ? '1' : '0.3';
    outputWires[0].style.opacity = difference ? '1' : '0.3';
    outputWires[1].style.opacity = borrow ? '1' : '0.3';
}