class Game {
    constructor(player1, player2, height = 6, width = 7) {
      this.players = [player1, player2];
      this.height = height;
      this.width = width;
      this.currentPlayer = player1;
      this.createBoard();
      this.createHtmlBoard();
      this.gameOver = false;
    }
  
    createBoard() {
      this.board = [];
      for (let y = 0; y < this.height; y++) {
        this.board.push(Array.from({ length: this.width }));
      }
    }
  
    createHtmlBoard() {
      const board = document.getElementById('game-board');
      board.innerHTML = '';
  
      this.handleMoveClick = this.handleMove.bind(this);
      const topRow = document.createElement('tr');
      topRow.setAttribute('id', 'column-top');
      topRow.addEventListener("click", this.handleMoveClick);
  
      for (let x = 0; x < this.width; x++) {
        const topCell = document.createElement('td');
        topCell.setAttribute('id', x);
        topRow.append(topCell);
      }
  
      board.append(topRow);
  
      for (let y = 0; y < this.height; y++) {
        const row = document.createElement('tr');
        for (let x = 0; x < this.width; x++) {
          const cell = document.createElement('td');
          cell.setAttribute('id', `${y}-${x}`);
          row.append(cell);
        }
        board.append(row);
      }
    }
  
    handleMove(evt) {
      const x = +evt.target.id;
      const y = this.findEmptySpotInColumn(x);
  
      if (y === null) {
        return;
      }
  
      this.board[y][x] = this.currentPlayer;
      this.dropPieceInTable(y, x);
  
      if (this.checkForTie()) {
        return this.endGame('It\'s a Tie!');
      }
  
      if (this.checkForWin()) {
        this.gameOver = true;
        return this.endGame(`Player with ${this.currentPlayer.color} color wins!`);
      }
  
      this.currentPlayer = (this.currentPlayer === this.players[0]) ? this.players[1] : this.players[0];
    }
  
    findEmptySpotInColumn(x) {
      for (let y = this.height - 1; y >= 0; y--) {
        if (!this.board[y][x]) {
          return y;
        }
      }
      return null;
    }
  
    dropPieceInTable(y, x) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.style.backgroundColor = this.currentPlayer.color;
      piece.style.top = -50 * (y + 2);
  
      const cell = document.getElementById(`${y}-${x}`);
      cell.append(piece);
    }
  
    endGame(message) {
      alert(message);
      const topRow = document.querySelector("#column-top");
      topRow.removeEventListener("click", this.handleMoveClick);
    }
  
    checkForTie() {
      return this.board.every(row => row.every(cell => cell));
    }
  
    checkForWin() {
      const checkCells = cells => cells.every(([y, x]) => y >= 0 && y < this.height && x >= 0 && x < this.width && this.board[y][x] === this.currentPlayer);
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const horizontal = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vertical = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagonalRight = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagonalLeft = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
          if (checkCells(horizontal) || checkCells(vertical) || checkCells(diagonalRight) || checkCells(diagonalLeft)) {
            return true;
          }
        }
      }
    }
  }
  
  class Player {
    constructor(color) {
      this.color = color;
    }
  }
  
  document.getElementById('start-button').addEventListener('click', () => {
    const p1Color = document.getElementById('player1-color').value;
    const p2Color = document.getElementById('player2-color').value;
  
    if (p1Color && p2Color) {
      let p1 = new Player(p1Color);
      let p2 = new Player(p2Color);
      new Game(p1, p2);
    } else {
      alert("Please enter colors for both players.");
    }
  });
  
  
  
  