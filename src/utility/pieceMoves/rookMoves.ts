import { COLUMNS } from "@/constants/chess-board"
import { Square } from "@/utility/types"

export default (square: Square) => {
  const { id } = square
  const [column, row] = id.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allMoves = []

  // left
  for (let i = columnIndex - 1; i >= 0; i--) {
    allMoves.push(`${COLUMNS[i]}${rowNumber}`)
  }
  // right
  for (let i = columnIndex + 1; i < COLUMNS.length; i++) {
    allMoves.push(`${COLUMNS[i]}${rowNumber}`)
  }
  // top
  for (let i = rowNumber + 1; i <= 8; i++) {
    allMoves.push(`${column}${i}`)
  }
  // bottom
  for (let i = rowNumber - 1; i >= 1; i--) {
    allMoves.push(`${column}${i}`)
  }

  return allMoves
}
