let currentStep = 1;

// Show the first step on load
document.addEventListener("DOMContentLoaded", function () {
  showStep(currentStep);
});

// Show the current step
function showStep(step) {
  const steps = document.querySelectorAll(".step");
  steps.forEach((stepElement, index) => {
    if (index + 1 === step) {
      stepElement.classList.add("active");
    } else {
      stepElement.classList.remove("active");
    }
  });
}

// Move to the next step
function nextStep(step) {
  currentStep = step;
  showStep(currentStep);
}

// Move to the previous step
function previousStep(step) {
  currentStep = step;
  showStep(currentStep);
}
