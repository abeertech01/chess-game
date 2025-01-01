import { deselectAllSquares, selectDeselectSquares } from "@/utility/helpers"
import { Piece, PieceColor, Square } from "@/utility/types"
import { create } from "zustand"

type PlayGroundStore = {
  squares: Square[]
  totalMoves: number
  toMovePlayer: PieceColor
  capturedPieces: Piece[]
  incrementMoves: () => void
  selectASquare: (squareId: string) => void
  setSquares: (squares: Square[]) => void
  movePiece: (squareId: string) => void
}

export const usePlayGroundStore = create<PlayGroundStore>((set) => ({
  squares: [],
  totalMoves: 0,
  toMovePlayer: "white",
  capturedPieces: [],
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

      let capturedPiece: Piece | null = null
      // I suppose movingSqIndex is not -1
      if (updatedSquares[movingSqIndex].piece) {
        capturedPiece = updatedSquares[movingSqIndex].piece
        updatedSquares[movingSqIndex].piece = thePiece
      } else {
        updatedSquares[movingSqIndex].piece = thePiece
      }

      const deselectedAllSquares = deselectAllSquares(updatedSquares)

      let changedPlayer = state.toMovePlayer
      if (state.toMovePlayer === "white") {
        changedPlayer = "black"
      } else {
        changedPlayer = "white"
      }

      return {
        squares: deselectedAllSquares,
        totalMoves: state.totalMoves + 1,
        toMovePlayer: changedPlayer,
        capturedPieces: capturedPiece
          ? [...state.capturedPieces, capturedPiece]
          : state.capturedPieces,
      }
    }),
}))
