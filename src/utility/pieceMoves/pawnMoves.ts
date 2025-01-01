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
      const sqId1 = `${COLUMNS[columnIndex]}${rowNumber + 1}`
      const sqId2 = `${COLUMNS[columnIndex]}${rowNumber + 2}`
      const recordSq1 = squares.find((sq) => sq.id === sqId1)
      const recordSq2 = squares.find((sq) => sq.id === sqId2)
      if (recordSq1?.piece === null) allMoves.push(sqId1)
      if (recordSq1?.piece === null && recordSq2?.piece === null)
        allMoves.push(sqId2)
    } else {
      const sqId = `${COLUMNS[columnIndex]}${rowNumber + 1}`
      const recordSq = squares.find((sq) => sq.id === sqId)
      if (recordSq?.piece === null) allMoves.push(sqId)
    }
    // top left
    if (columnIndex > 0 && rowNumber < 8) {
      const squareId = `${COLUMNS[columnIndex - 1]}${rowNumber + 1}`
      const sqRecord = squares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece?.color === "black") {
        allMoves.push(squareId)
      }
    }
    // top right
    if (columnIndex < 7 && rowNumber < 8) {
      const squareId = `${COLUMNS[columnIndex + 1]}${rowNumber + 1}`
      const sqRecord = squares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece?.color === "black") {
        allMoves.push(squareId)
      }
    }
  } else {
    // bottom
    if (rowNumber === 7) {
      const sqId1 = `${COLUMNS[columnIndex]}${rowNumber - 1}`
      const sqId2 = `${COLUMNS[columnIndex]}${rowNumber - 2}`
      const recordSq1 = squares.find((sq) => sq.id === sqId1)
      const recordSq2 = squares.find((sq) => sq.id === sqId2)
      if (recordSq1?.piece === null) allMoves.push(sqId1)
      if (recordSq1?.piece === null && recordSq2?.piece === null)
        allMoves.push(sqId2)
    } else {
      const sqId = `${COLUMNS[columnIndex]}${rowNumber - 1}`
      const recordSq = squares.find((sq) => sq.id === sqId)
      if (recordSq?.piece === null) allMoves.push(sqId)
    }
    // bottom left
    if (columnIndex > 0 && rowNumber > 1) {
      const squareId = `${COLUMNS[columnIndex - 1]}${rowNumber - 1}`
      const sqRecord = squares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece?.color === "white") {
        allMoves.push(squareId)
      }
    }
    // top right
    if (columnIndex < 7 && rowNumber > 1) {
      const squareId = `${COLUMNS[columnIndex + 1]}${rowNumber - 1}`
      const sqRecord = squares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece?.color === "white") {
        allMoves.push(squareId)
      }
    }
  }

  return allMoves
}
