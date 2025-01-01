import { COLUMNS } from "@/constants/chess-board"
import { Square } from "../types"

export default (square: Square) => {
  const { id } = square
  const [column, row] = id.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allMoves = []

  // top
  for (let i = rowNumber + 1; i <= 8; i++) {
    allMoves.push(`${column}${i}`)
  }

  // top left
  if (columnIndex > 0 && rowNumber < 8) {
    let _row = rowNumber
    for (let i = columnIndex - 1; i >= 0; i--) {
      if (_row === 8) break
      _row = _row + 1
      const sqId = `${COLUMNS[i]}${_row}`
      allMoves.push(sqId)
    }
  }

  // top right
  if (columnIndex < 7 && rowNumber < 8) {
    let _row = rowNumber
    for (let i = columnIndex + 1; i <= 7; i++) {
      if (_row === 8) break
      _row = _row + 1
      const sqId = `${COLUMNS[i]}${_row}`
      allMoves.push(sqId)
    }
  }

  // bottom
  for (let i = rowNumber - 1; i >= 1; i--) {
    allMoves.push(`${column}${i}`)
  }

  // bottom left
  if (columnIndex > 0 && rowNumber > 1) {
    let _row = rowNumber
    for (let i = columnIndex - 1; i >= 0; i--) {
      if (_row === 1) break
      _row = _row - 1
      const sqId = `${COLUMNS[i]}${_row}`
      allMoves.push(sqId)
    }
  }

  // bottom right
  if (columnIndex < 7 && rowNumber > 1) {
    let _row = rowNumber
    for (let i = columnIndex + 1; i <= 7; i++) {
      if (_row === 1) break
      _row = _row - 1
      const sqId = `${COLUMNS[i]}${_row}`
      allMoves.push(sqId)
    }
  }

  // left
  for (let i = columnIndex - 1; i >= 0; i--) {
    allMoves.push(`${COLUMNS[i]}${rowNumber}`)
  }

  // right
  for (let i = columnIndex + 1; i < COLUMNS.length; i++) {
    allMoves.push(`${COLUMNS[i]}${rowNumber}`)
  }

  return allMoves
}
