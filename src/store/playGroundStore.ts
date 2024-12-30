import { selectDeselect } from "@/utility/helpers"
import { Piece, Square, ToMove } from "@/utility/types"
import { create } from "zustand"

type AllThePieces = {
  white: Piece[]
  black: Piece[]
}

type PlayGroundStore = {
  squares: Square[]
  allThePieces: AllThePieces
  toMove: ToMove
  selectASquare: (squareId: string) => void
  setAllThePieces: (thePieces: AllThePieces) => void
  setSquares: (squares: Square[]) => void
}

export const usePlayGroundStore = create<PlayGroundStore>((set) => ({
  squares: [],
  allThePieces: {} as AllThePieces,
  toMove: "white",
  selectASquare: (squareId) =>
    set((state) => {
      const updatedSquares = selectDeselect(state.squares, squareId)

      return { squares: updatedSquares }
    }),
  setAllThePieces: (thePieces) => set({ allThePieces: thePieces }),
  setSquares: (squares) => set({ squares }),
}))
