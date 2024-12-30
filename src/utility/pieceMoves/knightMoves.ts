import { COLUMNS } from "@/constants/chess-board"
import { Square } from "@/utility/types"

export default (square: Square) => {
  const { id } = square
  const [column, row] = id.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allMoves = []

  // top left
  if (columnIndex > 0 && rowNumber < 7)
    allMoves.push(`${COLUMNS[columnIndex - 1]}${rowNumber + 2}`)
  // top right
  if (columnIndex < 7 && rowNumber < 7)
    allMoves.push(`${COLUMNS[columnIndex + 1]}${rowNumber + 2}`)
  // bottom left
  if (columnIndex > 0 && rowNumber > 2)
    allMoves.push(`${COLUMNS[columnIndex - 1]}${rowNumber - 2}`)
  // bottom right
  if (columnIndex < 7 && rowNumber > 2)
    allMoves.push(`${COLUMNS[columnIndex + 1]}${rowNumber - 2}`)
  // left top
  if (columnIndex > 1 && rowNumber < 8)
    allMoves.push(`${COLUMNS[columnIndex - 2]}${rowNumber + 1}`)
  // left bottom
  if (columnIndex > 1 && rowNumber > 1)
    allMoves.push(`${COLUMNS[columnIndex - 2]}${rowNumber - 1}`)
  // right top
  if (columnIndex < 6 && rowNumber < 8)
    allMoves.push(`${COLUMNS[columnIndex + 2]}${rowNumber + 1}`)
  // right bottom
  if (columnIndex < 6 && rowNumber > 1)
    allMoves.push(`${COLUMNS[columnIndex + 2]}${rowNumber - 1}`)

  return allMoves
}
