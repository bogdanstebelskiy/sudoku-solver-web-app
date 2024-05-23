import { useBoardContext } from "../context/BoardContext";
import Board from "./Board";
// @ts-ignore
import SudokuBoard from "../../sudoku_solver/main";
import { useState } from "react";

function Wrapper() {
  const { board, setBoard } = useBoardContext();

  const [isSolved, setIsSolved] = useState(false);

  const handleSolve = () => {
    const solved = new SudokuBoard(board);

    if (!solved.solveGraphColoring(9) || !solved.isValidSudoku()) {
      setIsSolved(false);
      return;
    }

    setIsSolved(true);

    setBoard((prev) => {
      const updatedBoard = [...prev];
      return updatedBoard;
    });
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="pt-4">{isSolved ? "Solved" : "Not Solved"}</h1>
      <Board />
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={handleSolve}
      >
        Solve
      </button>
    </div>
  )
}

export default Wrapper
