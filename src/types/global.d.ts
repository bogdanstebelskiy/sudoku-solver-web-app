declare global {
  type Board = number[][];

  interface BoardContext {
    board: Board;
    useSudokuBoard: React.Dispatch<React.SetStateAction<Board>>;
  }
}

export { }
