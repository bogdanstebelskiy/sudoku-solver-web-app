import Cell from './Cell'
import { useBoardContext } from '../context/BoardContext';

function SudokuBoard() {
  const { board } = useBoardContext();

  return (
    <div className="flex justify-center items-center p-5">
      <div className="grid grid-cols-9 grid-rows-9 gap-1">
        {board.map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} position={[rowIndex, colIndex]} />
          ))
        )}
      </div>
    </div>
  );
}

export default SudokuBoard
