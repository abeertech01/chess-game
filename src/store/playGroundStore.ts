import { deselectAllSquares, selectDeselectSquares } from "@/utility/helpers"
import { Piece, Square } from "@/utility/types"
import { create } from "zustand"

type PlayGroundStore = {
  squares: Square[]
  totalMoves: number
  incrementMoves: () => void
  selectASquare: (squareId: string) => void
  setSquares: (squares: Square[]) => void
  movePiece: (squareId: string) => void
}

export const usePlayGroundStore = create<PlayGroundStore>((set) => ({
  squares: [],
  totalMoves: 0,
  incrementMoves: () => set((state) => ({ totalMoves: state.totalMoves + 1 })),
  selectASquare: (squareId) =>
    set((state) => {
      const updatedSquares = selectDeselectSquares(state.squares, squareId)

      return { squares: updatedSquares }
    }),
  setSquares: (squares) => set({ squares }),
  movePiece: (squareId) =>
    set((state) => {
      let thePiece = null
      const updatedSquares = [...state.squares]
      const fromSqIndex = updatedSquares.findIndex(
        (square) => square.isSelected === true
      )
      if (fromSqIndex !== -1) thePiece = updatedSquares[fromSqIndex].piece

      if (thePiece !== null) updatedSquares[fromSqIndex].piece = null

      const movingSqIndex = updatedSquares.findIndex(
        (square) => square.id === squareId
      )
      if (movingSqIndex !== -1) updatedSquares[movingSqIndex].piece = thePiece

      const deselectedAllSquares = deselectAllSquares(updatedSquares)

      return { squares: deselectedAllSquares, totalMoves: state.totalMoves + 1 }
    }),
}))
