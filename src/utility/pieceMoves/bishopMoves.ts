import { COLUMNS } from "@/constants/chess-board"
import { Square } from "@/utility/types"

export default (square: Square) => {
  const { id } = square
  const [column, row] = id.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allMoves = []

  // TODO: Build logics since it's still not completed.

  // top left
  if (columnIndex > 0 && rowNumber < 8)
    allMoves.push(`${COLUMNS[columnIndex - 1]}${rowNumber + 1}`)
  // top right
  if (columnIndex < 7 && rowNumber < 8)
    allMoves.push(`${COLUMNS[columnIndex + 1]}${rowNumber + 1}`)
  // bottom left
  if (columnIndex > 0 && rowNumber > 1)
    allMoves.push(`${COLUMNS[columnIndex - 1]}${rowNumber - 1}`)
  // bottom right
  if (columnIndex < 7 && rowNumber > 1)
    allMoves.push(`${COLUMNS[columnIndex + 1]}${rowNumber - 1}`)

  return allMoves
}
