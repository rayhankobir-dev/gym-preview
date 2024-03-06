const weightUnit = document.getElementById("weightUnit");
const heightUnit = document.getElementById("heightUnit");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const form = document.getElementById("bmi-calculator");
const resultContainer = document.getElementById("resultContainer");
const bmiResult = document.getElementById("bmiResult");
const errorMessage = document.getElementById("error-msg");

const metricInput = document.getElementById("metric");
const imperialInput = document.getElementById("imperial");

metricInput.addEventListener("change", handleUnitChange);
imperialInput.addEventListener("change", handleUnitChange);

const units = {
  metric: {
    heightUnit: "cm",
    weightUnit: "kg",
    heightConversion: 1,
    weightConversion: 1,
  },
  imperial: {
    heightUnit: "cm",
    weightUnit: "lb",
    heightConversion: 0.0254,
    weightConversion: 0.453592,
  },
};

let selectedUnit = "metric";
let result = 0;
heightUnit.innerText = units[selectedUnit].heightUnit;
weightUnit.innerText = units[selectedUnit].weightUnit;

function handleUnitChange(event) {
  selectedUnit = event.target.value;
  heightUnit.innerText = units[selectedUnit].heightUnit;
  weightUnit.innerText = units[selectedUnit].weightUnit;
  if (validateForm()) {
    calculateBmi();
  }
}

function calculateBmi() {
  let heightValue = parseFloat(height.value);
  let weightValue = parseFloat(weight.value);
  let bmi = 0;
  if (selectedUnit === "metric") {
    bmi = (weightValue / heightValue / heightValue) * 10000;
  } else {
    const kg = weightValue * 0.45359237;
    const cm = heightValue;
    bmi = (kg / cm / cm) * 10000;
  }

  resultContainer.classList.remove("hidden");
  bmiResult.innerText = bmi.toFixed(2);
}

function validateForm() {
  if (height.value.trim() === "" || isNaN(parseFloat(height.value))) {
    errorMessage.innerText = "Please enter a height.";
    return false;
  }
  if (weight.value.trim() === "" || isNaN(parseFloat(weight.value))) {
    errorMessage.innerText = "Please enter a weight.";
    return false;
  }
  errorMessage.innerText = "";
  return true;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateForm()) {
    calculateBmi();
  }
});
