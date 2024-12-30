import { PieceColor } from "@/utility/types"
import { COLUMNS } from "@/constants/chess-board"

export const pieceSetup = (
  piece: string,
  color: PieceColor,
  number: number
) => {
  if (piece === "rook") {
    if (color === "white") {
      if (number === 1) {
        return `${COLUMNS[1 - 1]}1`
      } else {
        return `${COLUMNS[8 - 1]}1`
      }
    } else {
      if (number === 1) {
        return `${COLUMNS[1 - 1]}8`
      } else {
        return `${COLUMNS[8 - 1]}8`
      }
    }
  } else if (piece === "knight") {
    if (color === "white") {
      if (number === 1) {
        return `${COLUMNS[2 - 1]}1`
      } else {
        return `${COLUMNS[7 - 1]}1`
      }
    } else {
      if (number === 1) {
        return `${COLUMNS[2 - 1]}8`
      } else {
        return `${COLUMNS[7 - 1]}8`
      }
    }
  } else {
    if (color === "white") {
      if (number === 1) {
        return `${COLUMNS[3 - 1]}1`
      } else {
        return `${COLUMNS[6 - 1]}1`
      }
    } else {
      if (number === 1) {
        return `${COLUMNS[3 - 1]}8`
      } else {
        return `${COLUMNS[6 - 1]}8`
      }
    }
  }
}
