import {
  generateSquares,
  selectDeselectSquares,
  setSquareMoves,
} from "@/utility/helpers"
import { pieceMover } from "@/utility/movingPiece"
import { Check, Piece, PieceColor, Square } from "@/utility/types"
import { create } from "zustand"

type PlayGroundStore = {
  squares: Square[]
  totalMoves: number
  toMovePlayer: PieceColor
  capturedPieces: Piece[]
  check: Check
  incrementMoves: () => void
  selectASquare: (squareId: string) => void
  setSquares: () => void
  movePiece: (squareId: string) => void
}

export const usePlayGroundStore = create<PlayGroundStore>((set) => ({
  squares: [],
  totalMoves: 0,
  toMovePlayer: "white",
  capturedPieces: [],
  check: {
    checkedPlayer: null,
    isPlayerCheckThreat: false,
    checkMate: false,
  },
  incrementMoves: () => set((state) => ({ totalMoves: state.totalMoves + 1 })),
  selectASquare: (squareId) =>
    set((state) => {
      const updatedSquares = selectDeselectSquares(state.squares, squareId)

      return { squares: updatedSquares }
    }),
  setSquares: () =>
    set((state) => {
      const generatedSquares = generateSquares()

      const setSquares = setSquareMoves(generatedSquares)

      return {
        squares: setSquares,
      }
    }),
  movePiece: (squareId) =>
    set((state) => {
      if (state.check.checkMate) return { ...state }

      const clonedSquares = structuredClone(state.squares)

      // get the from index
      const fromSqIndex = clonedSquares.findIndex((sq) => sq.isSelected)

      // get the to index
      const toSqIndex = clonedSquares.findIndex((sq) => sq.id === squareId)

      const result = pieceMover(clonedSquares, fromSqIndex, toSqIndex)

      if (result!.isPlayerCheckThreat && !result!.updatedSqs) {
        return {
          check: {
            ...state.check,
            isPlayerCheckThreat: true,
          },
        }
      }

      let changedPlayer = state.toMovePlayer
      if (state.toMovePlayer === "white") {
        changedPlayer = "black"
      } else {
        changedPlayer = "white"
      }

      return {
        squares: result!.updatedSqs ? [...result!.updatedSqs] : state.squares,
        totalMoves: state.totalMoves + 1,
        toMovePlayer: changedPlayer,
        capturedPieces: result!.capturedPiece
          ? [...state.capturedPieces, result!.capturedPiece]
          : state.capturedPieces,
        check: {
          checkedPlayer: result!.oppChecked!.opp_king_check
            ? changedPlayer
            : null,
          isPlayerCheckThreat: false,
          checkMate: result!.oppChecked!.check_mate,
        },
      }
    }),
}))
