import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurn, setGameTurn] = useState([])

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X')
    // @ts-ignore
    setGameTurn(prevTurn => {
      let currentPlayer = 'X'
      if (prevTurn.length > 0 && prevTurn[0].player === 'X') {
        currentPlayer = 'O';
      }
      return [
        {
          square: {row: rowIndex, col: colIndex},
          player: currentPlayer
        },
        ...prevTurn
      ];
    })
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={"Player 1"} symbol={"X"} isActive={activePlayer === 'X'}/>
        <Player initialName={"Player 2"} symbol={"O"} isActive={activePlayer === 'O'}/>
      </ol>
      <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurn}/>
    </div>
  </main>
}

export default App