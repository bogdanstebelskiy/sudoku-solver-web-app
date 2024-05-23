import { createContext, useMemo, useState } from "react";
import { useContextWrapper } from "../hooks/useContextWrapper";

interface IBoardContext {
  board: Board,
  setBoard: React.Dispatch<
    React.SetStateAction<IBoardContext['board']>
  >;
}

export const BoardContext = createContext<IBoardContext | null>(null);

export const useBoardContext = () =>
  useContextWrapper(BoardContext, {
    contextName: useBoardContext.name,
    providerName: BoardContextProvider.name,
  })

export const BoardContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [board, setBoard] = useState<IBoardContext['board']>([
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [4, 0, 9, 0, 0, 6, 8, 7, 0],
    [0, 0, 0, 9, 0, 0, 1, 0, 0],
    [5, 0, 4, 0, 2, 0, 0, 0, 9],
    [0, 7, 0, 8, 0, 4, 0, 6, 0],
    [6, 0, 0, 0, 3, 0, 5, 0, 2],
    [0, 0, 1, 0, 0, 7, 0, 0, 0],
    [0, 4, 3, 2, 0, 0, 6, 0, 5],
    [0, 0, 0, 0, 0, 5, 0, 0, 0],
  ]);

  const value = useMemo(() => ({ board, setBoard }), [board]);

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  )
}
