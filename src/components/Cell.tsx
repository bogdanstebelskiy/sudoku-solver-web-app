import { ChangeEvent } from "react"
import { useBoardContext } from '../context/BoardContext';

type CellProps = {
  position: [number, number],
}

function Cell({ position: [rowNumber, colNumber] }: CellProps) {
  const { board, setBoard } = useBoardContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    if (value < 0 || value > 9) {
      return;
    }
    setBoard((prev) => {
      const updatedBoard = [...prev];
      updatedBoard[rowNumber][colNumber] = value;
      return updatedBoard;
    });
    console.log(board)
  }

  return (
    <div className="flex justify-center items-center border border-gray-300">
      <input className="h-12 w-12 text-center" id={`${rowNumber}-${colNumber}`} style={{ caretColor: "transparent" }} min="1" max="9" value={board[rowNumber][colNumber]} onChange={e => handleChange(e)} />
    </div>
  )
}

export default Cell
