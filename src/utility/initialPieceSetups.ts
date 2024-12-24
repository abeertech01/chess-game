import { Piece, PieceColor } from "@/utility/types"
import { ROW } from "@/constants/chess-board"

export const pieceSetup = (
  piece: string,
  color: PieceColor,
  number: number
) => {
  if (piece === "rook") {
    if (color === "white") {
      if (number === 1) {
        return `${ROW[1 - 1]}1`
      } else {
        return `${ROW[8 - 1]}1`
      }
    } else {
      if (number === 1) {
        return `${ROW[1 - 1]}8`
      } else {
        return `${ROW[8 - 1]}8`
      }
    }
  } else if (piece === "knight") {
    if (color === "white") {
      if (number === 1) {
        return `${ROW[2 - 1]}1`
      } else {
        return `${ROW[7 - 1]}1`
      }
    } else {
      if (number === 1) {
        return `${ROW[2 - 1]}8`
      } else {
        return `${ROW[7 - 1]}8`
      }
    }
  } else {
    if (color === "white") {
      if (number === 1) {
        return `${ROW[3 - 1]}1`
      } else {
        return `${ROW[6 - 1]}1`
      }
    } else {
      if (number === 1) {
        return `${ROW[3 - 1]}8`
      } else {
        return `${ROW[6 - 1]}8`
      }
    }
  }
}
