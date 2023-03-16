const TILE_COUNT = 9;
const TILE_DIMS = Math.sqrt(TILE_COUNT);

const GameBoard = (() => {
	let gameBoard = new Array(9);

	const resetBoard = () => (gameBoard = ["", "", "", "", "", "", "", "", ""]);
	const getSymbol = (index) => gameBoard[index];
	const setSymbol = (index, symbol) => (gameBoard[index] = symbol);
	const checkFull = () => {
		if (gameBoard.every((symbol) => symbol === "X" || symbol === "O")) return true;
	};

	return { resetBoard, getSymbol, setSymbol, checkFull };
})();

const GameController = (() => {
	let currentSymbol = "X";

	const resetSymbol = () => (currentSymbol = "X");
	const getSymbol = () => currentSymbol;
	const gameEnd = (endState) => {};
	const checkWin = () => {
		// Check rows for win
		for (let i = 0; i < TILE_DIMS; i += 1) {
			let row = [];
			for (let j = 0; j < TILE_DIMS; j += 1) {
				row.push(GameBoard.getSymbol(i));
			}
			if (row.every((symbol) => symbol === "X")) return "X";
			if (row.every((symbol) => symbol == "O")) return "O";
		}
		// Check columns for win
		for (let i = 0; i < TILE_DIMS; i += 1) {
			let col = [];
			for (let j = 0; j < TILE_COUNT; j += TILE_DIMS) {
				col.push(GameBoard.getSymbol(i));
			}
			if (col.every((symbol) => symbol === "X")) return "X";
			if (col.every((symbol) => symbol == "O")) return "O";
		}
		// Check diagonals for win
		let diagonal1 = [];
		let diagonal2 = [];
		for (let i = 0; i < TILE_COUNT; i += 4) {
			diagonal1.push(GameBoard.getSymbol(i));
		}
		for (let i = TILE_DIMS - 1; i < TILE_COUNT - TILE_DIMS + 1; i += 2) {
			diagonal2.push(GameBoard.getSymbol(i));
		}
		if (diagonal1.every((symbol) => symbol == "X") || diagonal2.every((symbol) => symbol == "X"))
			return "X";
		if (diagonal1.every((symbol) => symbol == "O" || diagonal2.every((symbol) => symbol == "O")))
			return "O";
	};
	const takeTurn = () => {
		currentSymbol = currentSymbol === "X" ? "O" : "X";
		if (checkWin() === "X") gameEnd("X");
		else if (checkWin() === "O") gameEnd("O");
		else if (GameBoard.checkFull()) gameEnd("DRAW");
	};

	return { resetSymbol, getSymbol, takeTurn };
})();

const DisplayController = (() => {
	const board = document.querySelector(".game-board");

	const updateBoard = () => {
		const tiles = board.children;
		for (let i = 0; i < tiles.length; i += 1) {
			tiles[i].firstChild.innerHTML = GameBoard.getSymbol(i);
		}
	};

	const renderBoard = () => {
		for (let i = 0; i < TILE_COUNT; i += 1) {
			const tile = document.createElement("div");
			const symbol = document.createElement("p");

			symbol.innerHTML = GameBoard.getSymbol(i);

			symbol.classList.add("symbol");
			tile.classList.add("tile");

			tile.onclick = (e) => {
				if (e.target.firstChild.innerHTML === "") {
					GameBoard.setSymbol(i, GameController.getSymbol());
					GameController.takeTurn();
				}
				updateBoard();
			};

			tile.appendChild(symbol);
			board.appendChild(tile);
		}
	};

	return { renderBoard };
})();

function reset() {
	GameBoard.resetBoard();
	GameController.resetSymbol();
	DisplayController.renderBoard();
}

reset();
