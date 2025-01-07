import {
  generateSquares,
  selectDeselectSquares,
  setSquareMoves,
} from "@/utility/helpers"
import { movePieceFunctionalities } from "@/utility/movingPiece"
import { Check, Piece, PieceColor, Square } from "@/utility/types"
import { create } from "zustand"

type PlayGroundStore = {
  squares: Square[]
  someSquareSelected: boolean
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
  someSquareSelected: false,
  totalMoves: 0,
  toMovePlayer: "white",
  capturedPieces: [],
  check: {
    checkedPlayer: null,
    isCheckThreat: false,
    checkMate: false,
  },
  incrementMoves: () => set((state) => ({ totalMoves: state.totalMoves + 1 })),
  selectASquare: (squareId) =>
    set((state) => {
      console.log("inside selectASquare")
      const selectedDeselectedSqs = selectDeselectSquares(
        state.squares,
        squareId
      )

      return {
        squares: selectedDeselectedSqs.updatedSquares,
        someSquareSelected: selectedDeselectedSqs.isAnySqSelected,
      }
    }),
  setSquares: () =>
    set(() => {
      // generate squares ✅
      let generatedSquares: Square[] = generateSquares()

      // get toMoves and rangeMoves and add to respective squares
      generatedSquares = setSquareMoves(generatedSquares)

      return {
        squares: generatedSquares,
      }
    }),
  movePiece: (squareId) =>
    set((state) => {
      if (state.check.checkMate) return { ...state }

      // get the selected square index (from) ✅
      const fromSqIndex = state.squares.findIndex(
        (square) => square.isSelected === true
      )

      // get the moving square's index ✅
      const toSqIndex = state.squares.findIndex(
        (square) => square.id === squareId
      )

      console.log("when moving piece")
      const movingPiecesData = movePieceFunctionalities(
        state.squares,
        fromSqIndex,
        toSqIndex
      )

      if (movingPiecesData.isCheckThreat)
        return {
          check: {
            ...state.check,
            isCheckThreat: movingPiecesData.isCheckThreat,
          },
        }

      let changedPlayer = state.toMovePlayer
      if (state.toMovePlayer === "white") {
        changedPlayer = "black"
      } else {
        changedPlayer = "white"
      }

      return {
        squares: movingPiecesData.updatedSqs
          ? movingPiecesData.updatedSqs
          : state.squares,
        totalMoves: state.totalMoves + 1,
        toMovePlayer: changedPlayer,
        capturedPieces: movingPiecesData.capturedPiece
          ? [...state.capturedPieces, movingPiecesData.capturedPiece]
          : state.capturedPieces,
        check: {
          checkedPlayer: movingPiecesData.oppChecked!.opp_king_check
            ? changedPlayer
            : null,
          isCheckThreat: movingPiecesData.isCheckThreat,
          checkMate: movingPiecesData.oppChecked!.check_mate,
        },
        someSquareSelected: false,
      }
    }),
}))
