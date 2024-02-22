class Calculator {
  constructor() {
    console.log("Calculator instance created.");
  }

  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function main() {
  let result1 = add(5, 3);
  let result2 = subtract(8, 2);
  let result3 = multiply(4, 6);

  console.log("Result 1:", result1);
  console.log("Result 2:", result2);
  console.log("Result 3:", result3);
}

main();
