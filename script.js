function Gameboard() {
    let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const getBoard = () => board;

    const checkValidPosition = (position) => {
        if (board[position - 1] === 'X' || board[position - 1] === 'O' || position < '1' || position > '9') {
            console.log('Not a valid position. Try again');
            return false;
        } 
        return true;
    }

    const changeBoard = (position, player) => {
        board[position - 1] = player;
    }

    const checkWin = (player) => {
        const topRow    = board[0] === board[1] && board[0] === board[2];
        const middleRow = board[3] === board[4] && board[3] === board[5];
        const bottomRow = board[6] === board[7] && board[6] === board[8];

        const leftCol   = board[0] === board[3] && board[0] === board[6];
        const middleCol = board[1] === board[5] && board[1] === board[7];
        const rightCol  = board[2] === board[6] && board[2] === board[8];

        const leftDiag  = board[0] === board[4] && board[0] === board[8];
        const rightDiag = board[2] === board[4] && board[2] === board[6];

        if (topRow || middleRow || bottomRow || leftCol || middleCol || rightCol || leftDiag || rightDiag) {
            return true;
        }
        return false;

    }

    const printBoard = () => {
        const str = `${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`;
        console.log(str);
    }

    const restartBoard = () => {
        board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    }



    return {getBoard, changeBoard, printBoard, checkValidPosition, checkWin, restartBoard};

}

function Player() {

}

function GameController() {

    let activePlayer = 'X';

    const playRound = (board, position) => {
        // check if position is valid     
        if (board.checkValidPosition(position)) {

            board.changeBoard(position, activePlayer);
            if (board.checkWin(activePlayer)) {
                console.log(`Player ${activePlayer} wins!`);

            } else {  // change player
                if (activePlayer === 'X') { 
                    activePlayer = 'O';
                } else {
                    activePlayer = 'X';
                } 
            }  
        } 
    }

    const getPlayer = () => { return activePlayer };

    console.log('Welcome to Tic-Tac-Toe! You may type R to restart anytime.');

    return { playRound, getPlayer };
}

function ScreenController() {

    const game = GameController();
    const board = Gameboard();
    const boardDiv = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const player = document.querySelector('.player');
    const restartButton = document.querySelector('button');

    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {

            game.playRound(board, index + 1);
            updateScreen();
            // change player
            player.textContent = `Player ${game.getPlayer()}'s Turn`;
            console.log(board.getBoard());

            if (board.checkWin(game.getPlayer())) {
                player.textContent = `Player ${game.getPlayer()} wins!`;
            }
        });
    });

    restartButton.addEventListener('click', () => {
        board.restartBoard();
        updateScreen();
    });

    const updateScreen = () => {
        cells.forEach((cell, index) => {
            cell.textContent = `${board.getBoard()[index]}`;
        });
    }

    
}

ScreenController();