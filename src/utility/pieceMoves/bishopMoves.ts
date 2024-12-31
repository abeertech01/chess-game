import { COLUMNS } from "@/constants/chess-board"
import { Square } from "@/utility/types"

export default (square: Square) => {
  const { id } = square
  const [column, row] = id.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allMoves = []

  // top left
  if (columnIndex > 0 && rowNumber < 8) {
    let theRow = rowNumber
    for (let i = columnIndex - 1; i >= 0; i--) {
      theRow += 1
      allMoves.push(`${COLUMNS[i]}${theRow}`)
    }
  }
  // top right
  if (columnIndex < 7 && rowNumber < 8) {
    let theRow = rowNumber
    for (let i = columnIndex + 1; i <= 7; i++) {
      theRow += 1
      allMoves.push(`${COLUMNS[i]}${theRow}`)
    }
  }
  // bottom left
  if (columnIndex > 0 && rowNumber > 1) {
    let theRow = rowNumber
    for (let i = columnIndex - 1; i >= 0; i--) {
      theRow -= 1
      allMoves.push(`${COLUMNS[i]}${theRow}`)
    }
  }
  // bottom right
  if (columnIndex < 7 && rowNumber > 1) {
    let theRow = rowNumber
    for (let i = columnIndex + 1; i <= 7; i++) {
      theRow -= 1
      allMoves.push(`${COLUMNS[i]}${theRow}`)
    }
  }

  return allMoves
}
