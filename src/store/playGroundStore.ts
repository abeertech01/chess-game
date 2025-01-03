import {
  deselectAllSquares,
  generateSquares,
  getSquareMoves,
  selectDeselectSquares,
} from "@/utility/helpers"
import { Piece, PieceColor, Square } from "@/utility/types"
import { create } from "zustand"

// type KingsInfo = {
//   white: {
//     king: Square
//     moves: string[]
//   }
//   black: {
//     king: Square
//     moves: string[]
//   }
// }

type PlayGroundStore = {
  squares: Square[]
  totalMoves: number
  toMovePlayer: PieceColor
  capturedPieces: Piece[]
  // kingRelatedSquares: KingRelatedSquares
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
  // kingRelatedSquares: {
  //   white: {
  //     king_moves: [],
  //     king_square: {} as Square,
  //     king_checked: false,
  //   },
  //   black: {
  //     king_moves: [],
  //     king_square: {} as Square,
  //     king_checked: false,
  //   },
  // },
  incrementMoves: () => set((state) => ({ totalMoves: state.totalMoves + 1 })),
  selectASquare: (squareId) =>
    set((state) => {
      const updatedSquares = selectDeselectSquares(state.squares, squareId)

      return { squares: updatedSquares }
    }),
  setSquares: () =>
    set((state) => {
      const generatedSquares = generateSquares()

      const kings = generatedSquares.map((sq) => {
        if (sq.piece && sq.piece.name === "king") return sq
      })

      // const kingsInfo = {} as KingsInfo
      // kings.forEach((king) => {
      //   if (king?.piece?.color === "white") {
      //     const moves = getSquareMoves(king)
      //     kingsInfo.white = { king, moves }
      //   }
      //   if (king?.piece?.color === "black") {
      //     const moves = getSquareMoves(king)
      //     kingsInfo.black = { king, moves }
      //   }
      // })

      return {
        squares: generatedSquares,
        // kingRelatedSquares: {
        //   white: {
        //     king_square: kingsInfo.white.king,
        //     king_moves: kingsInfo.white.moves,
        //     king_checked: false,
        //   },
        //   black: {
        //     king_square: kingsInfo.black.king,
        //     king_moves: kingsInfo.black.moves,
        //     king_checked: false,
        //   },
        // },
      }
    }),
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
