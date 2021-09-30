const bill_amount = document.getElementById("bill_amount");
const customPer = document.getElementById("customPer");
const noOfPeople = document.getElementById("noOfPeople");
const tipPer = document.querySelectorAll(".perBtns");
const resetBtn = document.querySelector(".resetBtn");
const textError = document.querySelector(".textError");
const totalTip = document.querySelector(".total");
const totalForAll = document.querySelector(".totalForAll");

let error;
//View
const showError = (doc, value) => {
  doc.classList.add("showError");
  error = true;
  if (value.length > 0) {
    error = false;
    doc.classList.remove("showError");
  }
};
const textErrorShow = (show) => {
  textError.style.display = "none";
  error = false;
  if (show) {
    error = true;
    textError.style.display = "block";
  }
};

const showTips = (ele, amount) => {
  ele.innerHTML = `<p>$${amount.toFixed(2)}</p>`;
};

// Model
const calculateTip = (bill, tipPerPersonInPer, person) => {
  // Calculating tips
  tipPerper = (bill * tipPerPersonInPer) / 100;
  const totalTip = tipPerper * person;
  return { totalTip, tipPerper };
};

const perTip = () => {
  const focus = [...tipPer].find((e) => e === document.activeElement);
  const customInput = customPer.value;
  console.log(customInput);
  if (customInput.length === 0) {
    if (focus) {
      textErrorShow(false);
      error = false;
      console.log(focus.dataset.per);
      return focus.dataset.per;
    } else {
      error = true;
      textErrorShow(true);
    }
  } else {
    textErrorShow(false);
    error = false;
    return customInput;
  }
};

// Controller
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const bill = bill_amount.value;
    const person = noOfPeople.value;
    const tipPerPersonInPer = perTip();
    showError(bill_amount, bill);
    showError(noOfPeople, person);
    if (!error) {
      let tip = calculateTip(bill, tipPerPersonInPer, person);
      showTips(totalTip, tip.tipPerper);
      showTips(totalForAll, tip.totalTip);
    }
  }
});

resetBtn.addEventListener("click", (e) => {
  showTips(totalTip, 0);
  showTips(totalForAll, 0);
  showError(bill_amount, "5");
  showError(noOfPeople, "5");
  bill_amount.value = "";
  noOfPeople.value = "";
  tipPer.value = "";
  customPer.value = "";
});
