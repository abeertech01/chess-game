import { COLUMNS } from "@/constants/chess-board"
import { PieceColor, Square } from "../types"
import { usePlayGroundStore } from "@/store/playGroundStore"

const getSquares = () => {
  const squares = usePlayGroundStore.getState().squares
  return squares
}

export default (square: Square, color: PieceColor) => {
  const { id } = square
  const [column, row] = id.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allMoves = []

  const squares = getSquares()

  if (color === "white") {
    // top
    if (rowNumber === 2) {
      allMoves.push(`${COLUMNS[columnIndex]}${rowNumber + 1}`)
      allMoves.push(`${COLUMNS[columnIndex]}${rowNumber + 2}`)
    } else {
      allMoves.push(`${COLUMNS[columnIndex]}${rowNumber + 1}`)
    }
    // top left
    if (columnIndex > 0 && rowNumber < 8) {
      const squareId = `${COLUMNS[columnIndex - 1]}${rowNumber + 1}`
      const sqRecord = squares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece) {
        allMoves.push(squareId)
      }
    }
    // top right
    if (columnIndex < 7 && rowNumber < 8) {
      const squareId = `${COLUMNS[columnIndex + 1]}${rowNumber + 1}`
      const sqRecord = squares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece) {
        allMoves.push(squareId)
      }
    }
  } else {
    // bottom
    if (rowNumber === 7) {
      allMoves.push(`${COLUMNS[columnIndex]}${rowNumber - 1}`)
      allMoves.push(`${COLUMNS[columnIndex]}${rowNumber - 2}`)
    } else {
      allMoves.push(`${COLUMNS[columnIndex]}${rowNumber - 1}`)
    }
    // bottom left
    if (columnIndex > 0 && rowNumber > 1) {
      const squareId = `${COLUMNS[columnIndex - 1]}${rowNumber - 1}`
      const sqRecord = squares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece) {
        allMoves.push(squareId)
      }
    }
    // top right
    if (columnIndex < 7 && rowNumber > 1) {
      const squareId = `${COLUMNS[columnIndex + 1]}${rowNumber - 1}`
      const sqRecord = squares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece) {
        allMoves.push(squareId)
      }
    }
  }

  return allMoves
}
