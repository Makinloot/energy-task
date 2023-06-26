import ships from "./ship.js";
const boardsContainer = document.getElementById("boards-container");

// create boards for battleship
const width = 15;
function createBoard(color, id) {
  const board = document.createElement("div");
  board.classList.add("game-board");
  board.style.backgroundColor = color;
  board.setAttribute("id", id);

  for (let i = 0; i < width * width; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.setAttribute("id", i);
    board.append(block);
  }

  boardsContainer.append(board);
}
createBoard("darkgrey", "player");

// add ship to board
export function addShip(ship) {
  const everyBoardBlocks = document.querySelectorAll(`#player div`);
  let randomBool = Math.random() < 0.5;
  let isHorizontal = randomBool;
  let randomStartIdx = Math.floor(Math.random() * (width * width));

  // check if ship spawn point is okay
  let validStart = isHorizontal
    ? randomStartIdx <= width * width - ship.length
      ? randomStartIdx
      : width * width - ship.length
    : randomStartIdx <= width * width - width * ship.length
    ? randomStartIdx
    : randomStartIdx - ship.length * width + width;

  let shipBlocks = [];

  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(everyBoardBlocks[Number(validStart) + i]);
    } else {
      shipBlocks.push(everyBoardBlocks[Number(validStart) + i * width]);
    }
  }

  let valid;
  if (isHorizontal) {
    valid = shipBlocks.every(
      (block, i) =>
        shipBlocks[0].id % width !== width - (shipBlocks.length - (i + 1))
    );
  } else {
    valid = shipBlocks.every(
      (block, i) => shipBlocks[0].id < 90 + (width * i + 1)
    );
  }

  const notTaken = shipBlocks.every(
    (block) => !block.classList.contains("taken")
  );

  if (valid && notTaken) {
    shipBlocks.forEach((block) => {
      block.classList.add(ship.name, "taken");
    });
  } else {
    addShip(ship);
  }
}

ships.forEach((ship) => addShip(ship));
