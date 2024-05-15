import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combinations"
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurn) {
  let currentPlayer = 'X'
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [player, setPlayer] = useState({
    'X': 'Player 1',
    'O': 'Player 2',
  })
  const [gameTurn, setGameTurn] = useState([])
  const activePlayer = derivedActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurn) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player
  }

  let winner: any;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && secondSquareSymbol && thirdSquareSymbol
        && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
      winner = player[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    // @ts-ignore
    setGameTurn(prevTurn => {
      const currentPlayer = derivedActivePlayer(prevTurn);
      return [
        {
          square: {row: rowIndex, col: colIndex},
          player: currentPlayer
        },
        ...prevTurn
      ];
    })
  }

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol: string, newName: string) {
    setPlayer(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={"Player 1"} symbol={"X"} isActive={activePlayer === 'X'}
                onChangeName={handlePlayerNameChange}/>
        <Player initialName={"Player 2"} symbol={"O"} isActive={activePlayer === 'O'}
                onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurn}></Log>
  </main>
}

export default App