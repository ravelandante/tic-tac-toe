let currentSymbol = "X";

const GameBoard = (() => {
	let gameBoard = new Array(9);
	const resetBoard = () => (gameBoard = ["", "", "", "", "", "", "", "", ""]);
	const getBoard = () => gameBoard;
	const getSymbol = (index) => gameBoard[index];
	const setSymbol = (index, symbol) => (gameBoard[index] = symbol);

	return { resetBoard, getBoard, getSymbol, setSymbol };
})();

const DisplayController = (() => {
	const board = document.querySelector(".game-board");

	const updateBoard = () => {
		const tiles = board.children;
		for (let i = 0; i < tiles.length; i += 1) {
			tiles[i].firstChild.innerHTML = GameBoard.getSymbol(i);
		}
	};

	const renderBoard = (gameBoard) => {
		for (let i = 0; i < gameBoard.length; i += 1) {
			const tile = document.createElement("div");
			const symbol = document.createElement("p");

			symbol.innerHTML = GameBoard.getSymbol(i);

			symbol.classList.add("symbol");
			tile.classList.add("tile");

			tile.onclick = (e) => {
				if (e.target.firstChild.innerHTML === "") GameBoard.setSymbol(i, currentSymbol);
				updateBoard();
			};

			tile.appendChild(symbol);
			board.appendChild(tile);
		}
	};

	return { renderBoard };
})();

GameBoard.resetBoard();
DisplayController.renderBoard(GameBoard.getBoard());
