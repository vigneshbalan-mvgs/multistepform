document.addEventListener("DOMContentLoaded", function () {
  const formSteps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next-btn");
  const submitBtn = document.querySelector(".submit-btn");
  const progressSteps = document.querySelectorAll(".progress-step");
  const backBtns = document.querySelectorAll(".back-btn");
  let currentStep = 0;

  // Show the initial step
  showStep(currentStep);

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Validate the current step
      if (validateStep(currentStep)) {
        currentStep++;
        if (currentStep < formSteps.length) {
          showStep(currentStep);
        }
      }
    });
  });

  backBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  submitBtn.addEventListener("click", function () {
    // Final submission logic
    alert("Quote request submitted successfully!");
  });

  function showStep(step) {
    formSteps.forEach((formStep, index) => {
      formStep.classList.toggle("active", index === step);
      formStep.classList.toggle("current", index === step);
    });

    progressSteps.forEach((progressStep, index) => {
      progressStep.classList.toggle("active", index <= step);
      progressStep.classList.toggle("current", index === step);
    });

    updateProgressIndicator(step);
  }

  function validateStep(step) {
    const currentFormStep = formSteps[step];
    const inputs = currentFormStep.querySelectorAll("input, select");
    for (const input of inputs) {
      if (input.value.trim() === "" && !input.classList.contains("optional")) {
        alert("Please fill all required fields.");
        return false;
      }
    }
    return true;
  }

  function updateProgressIndicator(step) {
    const progressCounter = document.querySelector(".progress-counter");
    const totalSteps = formSteps.length;
    progressCounter.textContent = `${step + 1}/${totalSteps}`;
  }

  // Room adjustment functionality
  const roomButtons = document.querySelectorAll(".adjust-btn");
  roomButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const roomCountElement =
        this.closest(".package-option").querySelector(".room-count");
      let currentCount = parseInt(roomCountElement.textContent);

      if (this.classList.contains("increase")) {
        currentCount++;
      } else if (this.classList.contains("decrease") && currentCount > 0) {
        currentCount--;
      }

      roomCountElement.textContent = currentCount;
    });
  });

  // BHK selection functionality
  document.querySelectorAll('input[name="bhk"]').forEach(function (bhkRadio) {
    bhkRadio.addEventListener("change", function () {
      document.querySelectorAll(".child-options").forEach(function (option) {
        option.style.display = "none";
        option
          .querySelectorAll('input[type="radio"]')
          .forEach(function (childRadio) {
            childRadio.checked = false; // Reset child selections
          });
      });

      const selectedBHK = this.closest("label").nextElementSibling;
      if (selectedBHK && selectedBHK.classList.contains("child-options")) {
        selectedBHK.style.display = "block";

        const defaultSmallOption = selectedBHK.querySelector(
          'input[value="small"]',
        );
        if (defaultSmallOption) {
          defaultSmallOption.checked = true;
        }
      }
    });
  });
});
