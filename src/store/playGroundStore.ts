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
    set(() => {
      let generatedSquares: Square[] = generateSquares()

      generatedSquares = generatedSquares.map((sq: Square) => {
        if (sq.piece) {
          const allMoves: {
            allToMoves: string[]
            rangeMoves: string[]
          } | null = getSquareMoves(sq, generatedSquares)

          return {
            ...sq,
            piece: {
              ...sq.piece,
              toMoves: allMoves!.allToMoves,
              range_moves: allMoves!.rangeMoves,
            },
          }
        } else {
          return sq
        }
      })

      // const kings = generatedSquares.map((sq) => {
      //   if (sq.piece && sq.piece.name === "king") return sq
      // })

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
      // thePiece is a mutable variable ✅
      let thePiece: Piece | null = null
      let updatedSquares = [...state.squares]
      // get the selected square index (from) ✅
      const fromSqIndex = updatedSquares.findIndex(
        (square) => square.isSelected === true
      )
      // save the piece of selected square index in the thePiece variable ✅
      thePiece = updatedSquares[fromSqIndex].piece

      // NOTE: need to deselect
      // remove the piece from the selected square index ✅
      updatedSquares[fromSqIndex].piece = null

      // get the moving square's index ✅
      const movingSqIndex = updatedSquares.findIndex(
        (square) => square.id === squareId
      )

      // get a mutable variable for saving captured piece ✅
      let capturedPiece: Piece | null = null
      // I suppose movingSqIndex is not -1
      // if the moving index square has a piece of different color, save it to capturedPrice. ✅
      if (
        updatedSquares[movingSqIndex].piece &&
        updatedSquares[movingSqIndex].piece.color !== thePiece!.color
      ) {
        capturedPiece = updatedSquares[movingSqIndex].piece
        updatedSquares[movingSqIndex].piece = thePiece
      }

      if (!updatedSquares[movingSqIndex].piece) {
        updatedSquares[movingSqIndex].piece = thePiece
      }

      // deselect isSelected and isToMove ✅
      updatedSquares = deselectAllSquares(updatedSquares)

      // get all Moves for the new square index ✅
      const allMoves = getSquareMoves(
        updatedSquares[movingSqIndex],
        updatedSquares
      )

      // prepare a piece with updated toMoves and range_moves ✅
      const preparedPiece: Piece = {
        ...updatedSquares[movingSqIndex].piece!,
        toMoves: allMoves!.allToMoves,
        range_moves: allMoves!.rangeMoves,
      }

      // update moving index square's piece by the prepared piece. ✅
      updatedSquares[movingSqIndex].piece = preparedPiece
      console.log(updatedSquares[movingSqIndex].piece)

      let changedPlayer = state.toMovePlayer
      if (state.toMovePlayer === "white") {
        changedPlayer = "black"
      } else {
        changedPlayer = "white"
      }

      return {
        squares: updatedSquares,
        totalMoves: state.totalMoves + 1,
        toMovePlayer: changedPlayer,
        capturedPieces: capturedPiece
          ? [...state.capturedPieces, capturedPiece]
          : state.capturedPieces,
      }
    }),
}))
