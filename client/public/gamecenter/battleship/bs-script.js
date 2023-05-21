// create grid
const leftBoard = document.querySelector("#left-board");
for (let i = 0; i < 100; i++) {
  let cell = document.createElement("div");
  cell.classList.add("grid-cell");
  leftBoard.appendChild(cell);
}

const rightBoard = document.querySelector("#right-board");
for (let i = 0; i < 100; i++) {
  let cell = document.createElement("div");
  cell.classList.add("grid-cell");
  cell.addEventListener("click", (e) => {
    Attacked(e.target);
  });
  rightBoard.appendChild(cell);
}

let cells = document.querySelectorAll(".grid-cell");
for (let i = 0; i < cells.length; i++) {
  cell = cells[i];
  cell.setAttribute("isOccupied", "0");
  cell.setAttribute("isHit", "0");
  cell.style.background = "#6082B6";
}

// Game functionality
const leftShipColor = "#818589";
const missColor = "#36454F";
const hitColor = "#FF4433";
const destroyedColor = "#FFBF00";

let leftCells = leftBoard.querySelectorAll(".grid-cell");
let rightCells = rightBoard.querySelectorAll(".grid-cell");
let currentTurn = 0;

StartGame();

function StartGame() {
  PlacePiecesLeft();
  PlacePiecesRight();
}
function PlacePiecesLeft() {
  let count = 0;
  let count5 = 0;
  let count4 = 0;
  let count3 = 0;
  let count2 = 0;
  let has5 = false;
  let has4 = false;
  let has3 = false;
  let has2 = false;
  let countDone = false;
  while (!countDone) {
    count++;
    if (count > 1000) {
      break;
    }
    let i = getRandom(99);
    if (!has5) {
      if (i % 10 <= 5) {
        if (!isOccupiedLeft(i, 5) && !isAdjacentCellOccupied(i, 5, leftCells)) {
          PlaceLeft(i, 5);
          count5++;
        }
      }
    }

    if (!has4) {
      if (i % 10 <= 6) {
        if (!isOccupiedLeft(i, 4) && !isAdjacentCellOccupied(i, 4, leftCells)) {
          PlaceLeft(i, 4);
          count4++;
        }
      }
    }
    if (!has3) {
      if (i % 10 <= 7) {
        if (!isOccupiedLeft(i, 3) && !isAdjacentCellOccupied(i, 3, leftCells)) {
          PlaceLeft(i, 3);
          count3++;
        }
      }
    }
    if (!has2) {
      if (i % 10 <= 8) {
        if (!isOccupiedLeft(i, 2) && !isAdjacentCellOccupied(i, 2, leftCells)) {
          PlaceLeft(i, 2);
          count2++;
        }
      }
    }
    has5 = count5 >= 1 ? true : false;
    has4 = count4 >= 2 ? true : false;
    has3 = count3 >= 3 ? true : false;
    has2 = count2 >= 4 ? true : false;
    if (has2 && has3 && has4 && has5) {
      countDone = true;
    }
  }
}

function PlacePiecesRight() {
  let count = 0;
  let count5 = 0;
  let count4 = 0;
  let count3 = 0;
  let count2 = 0;
  let has5 = false;
  let has4 = false;
  let has3 = false;
  let has2 = false;
  var countDone = false;
  while (!countDone) {
    count++;
    if (count > 1000) {
      break;
    }
    let i = getRandom(99);
    if (!has5) {
      if (i % 10 <= 5) {
        if (
          !isOccupiedRight(i, 5) &&
          !isAdjacentCellOccupied(i, 5, rightCells)
        ) {
          PlaceRight(i, 5);
          count5++;
        }
      }
    }

    if (!has4) {
      if (i % 10 <= 6) {
        if (
          !isOccupiedRight(i, 4) &&
          !isAdjacentCellOccupied(i, 4, rightCells)
        ) {
          PlaceRight(i, 4);
          count4++;
        }
      }
    }
    if (!has3) {
      if (i % 10 <= 7) {
        if (
          !isOccupiedRight(i, 3) &&
          !isAdjacentCellOccupied(i, 3, rightCells)
        ) {
          PlaceRight(i, 3);
          count3++;
        }
      }
    }
    if (!has2) {
      if (i % 10 <= 8) {
        if (
          !isOccupiedRight(i, 2) &&
          !isAdjacentCellOccupied(i, 2, rightCells)
        ) {
          PlaceRight(i, 2);
          count2++;
        }
      }
    }
    has5 = count5 == 1 ? true : false;
    has4 = count4 == 2 ? true : false;
    has3 = count3 == 3 ? true : false;
    has2 = count2 == 4 ? true : false;
    if (has2 && has3 && has4 && has5) {
      countDone = true;
    }
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}
function isOccupiedLeft(i, sLength) {
  for (let o = 0; o < sLength; o++) {
    let cell = leftCells[i + o];
    if (cell.getAttribute("isOccupied") == "1") {
      return true;
    }
  }
  return false;
}
function isOccupiedRight(i, sLength) {
  for (let o = 0; o < sLength; o++) {
    let cell = rightCells[i + o];
    if (cell.getAttribute("isOccupied") == "1") {
      return true;
    }
  }
  return false;
}
function PlaceLeft(i, sLength) {
  if (!isAdjacentCellOccupied(i, sLength, leftCells)) {
    for (let o = 0; o < sLength; o++) {
      let cell = leftCells[i + o];
      cell.setAttribute("isOccupied", "1");
      cell.style.background = leftShipColor;
    }
  }
}

function PlaceRight(i, sLength) {
  if (!isAdjacentCellOccupied(i, sLength, rightCells)) {
    for (let o = 0; o < sLength; o++) {
      let cell = rightCells[i + o];
      cell.setAttribute("isOccupied", "1");
    }
  }
}

function SwitchTurns() {
  currentTurn = currentTurn == 0 ? 1 : 0;
  if (currentTurn == 1) {
    let random = getRandom(99);
    ComputerAttack(random);
  }
}

function Attacked(e) {
  if (currentTurn == 0) {
    let cnt = 0;
    if (e.getAttribute("isHit") == 0) {
      if (e.getAttribute("isOccupied") == 1) {
        e.style.background = hitColor;
        e.setAttribute("isHit", "1");
        if (CheckAllShipsDestoryed(rightCells)) {
          alert("Player Won!");
          location.reload();
        }
      } else if (e.getAttribute("isOccupied") == 0) {
        e.style.background = missColor;
        e.setAttribute("isHit", "1");
        SwitchTurns();
      } else {
        alert("WHAT ARE YOU THINKING COMMANDER?!\nWe already hit that spot.");
      }
    }
  } else {
    alert("Await your turn!");
  }
}

function ComputerAttack(i) {
  while (true) {
    if (leftCells[i].getAttribute("isHit") == 0) {
      if (leftCells[i].getAttribute("isOccupied") == 1) {
        //computer hit
        leftCells[i].style.background = hitColor;
        leftCells[i].setAttribute("isHit", "1");
        if (CheckAllShipsDestoryed(leftCells)) {
          alert("Computer Won!");
          location.reload();
        }
      } else if (leftCells[i].getAttribute("isOccupied") == 0) {
        leftCells[i].style.background = missColor;
        leftCells[i].setAttribute("isHit", "1");
        break;
      }
    }
    i = getRandom(99);
  }
  SwitchTurns();
}

function isAdjacentCellOccupied(currentSquare, shipLength, board) {
  currentSquare = parseInt(currentSquare);
  // check left side
  for (let i = currentSquare; i < currentSquare + shipLength; i++) {
    let cell = board[i - 1];
    if (!cell || cell.getAttribute("isOccupied") == "1") {
      return true;
    }
  }

  // check right side
  for (let i = currentSquare; i < currentSquare + shipLength; i++) {
    let cell = board[i + 1];
    if (!cell || cell.getAttribute("isOccupied") == "1") {
      return true;
    }
  }

  // check top side
  for (let i = currentSquare; i < currentSquare + shipLength; i++) {
    let cell = board[i - 10];
    if (!cell || cell.getAttribute("isOccupied") == "1") {
      return true;
    }
  }

  // check bottom side
  for (let i = currentSquare; i < currentSquare + shipLength; i++) {
    let cell = board[i + 10];
    if (!cell || cell.getAttribute("isOccupied") == "1") {
      return true;
    }
  }

  return false;
}

function CheckAllShipsDestoryed(cells) {
  let cellsDestroyed = 0;
  for (let i = 0; i < cells.length; i++)
    if (cells[i].getAttribute("isOccupied") == 1) {
      if (cells[i].getAttribute("isHit") == 0) {
        return false;
      } else if (cells[i].getAttribute("isHit") == 1) {
        cellsDestroyed++;
      }
      if (cellsDestroyed == 30) return true;
    }
}
