const undoButton = document.getElementById("undoButton"),
  addButton = document.getElementById("addButton"),
  subButton = document.getElementById("subButton"),
  redoButton = document.getElementById("redoButton"),
  inputBox = document.getElementById("inputbox"),
  resetTotal = document.getElementById("resetTotal");

let total = 0;
let result = document.getElementById("value");
let history = [];
let current = -1;

function onload() {
  addButton.onclick = addBtn;
  subButton.onclick = subBtn;
  undoButton.onclick = undoBtn;
  redoButton.onclick = redoBtn;
  resetTotal.onclick = resetBtn;
}

function addBtn() {
  let inputValue = inputBox.value;
  //number O parseInt X  숫자0 예외처리
  if (!!Number(inputValue)) {
    total = total + Number(inputValue);
    result.innerHTML = total;
    history = [...history, total];
    current++;
    current < 0
      ? undoButton.setAttribute("disabled", true)
      : undoButton.removeAttribute("disabled");
  } else {
    return alert("숫자를 입력해 주세요.");
  }
  inputBox.value = "";
  inputBox.focus();
}

function subBtn() {
  let inputValue = inputBox.value;
  if (!!Number(inputValue)) {
    total = total - Number(inputValue);
    result.innerHTML = total;
    history = [...history, total];
    current++;
  } else {
    return alert("숫자를 입력해 주세요.");
  }
  inputBox.value = "";
  inputBox.focus();
}

function undoBtn() {
  current--;
  if (current < 0) {
    undoButton.setAttribute("disabled", true);
    result.innerHTML = 0;
  } else {
    result.innerHTML = history[current];
    redoButton.removeAttribute("disabled");
  }
}

function redoBtn() {
  current++;
  if (current >= history.length - 1) {
    redoButton.setAttribute("disabled", true);
    result.innerHTML = history[current];
  } else {
    result.innerHTML = history[current];
    undoButton.removeAttribute("disabled");
  }
}

function resetBtn() {
  history.length !== 0 ? (history = []) : (history = [...history]);
  if (history.length == 0) {
    total = 0;
    result.innerHTML = 0;
    redoButton.setAttribute("disabled", true);
    undoButton.setAttribute("disabled", true);
  }
}
