import { COLUMNS } from "@/constants/chess-board"
import { Square } from "../types"

export default (square: Square) => {
  const { id } = square
  const [column, row] = id.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allMoves = []

  // top
  if (rowNumber < 8) {
    allMoves.push(`${COLUMNS[columnIndex]}${rowNumber + 1}`)
  }

  // top left
  if (columnIndex > 0 && rowNumber < 8) {
    allMoves.push(`${COLUMNS[columnIndex - 1]}${rowNumber + 1}`)
  }

  // top right
  if (columnIndex < 7 && rowNumber < 8) {
    allMoves.push(`${COLUMNS[columnIndex + 1]}${rowNumber + 1}`)
  }

  // left
  if (columnIndex > 0) {
    allMoves.push(`${COLUMNS[columnIndex - 1]}${rowNumber}`)
  }

  // bottom
  if (rowNumber > 1) {
    allMoves.push(`${COLUMNS[columnIndex]}${rowNumber - 1}`)
  }

  // bottom left
  if (columnIndex > 0 && rowNumber > 1) {
    allMoves.push(`${COLUMNS[columnIndex - 1]}${rowNumber - 1}`)
  }

  // bottom right
  if (columnIndex < 7 && rowNumber > 1) {
    allMoves.push(`${COLUMNS[columnIndex + 1]}${rowNumber - 1}`)
  }

  // right
  if (columnIndex < 7) {
    allMoves.push(`${COLUMNS[columnIndex + 1]}${rowNumber}`)
  }

  return allMoves
}
