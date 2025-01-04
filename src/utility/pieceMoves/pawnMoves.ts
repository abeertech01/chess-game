import { COLUMNS } from "@/constants/chess-board"
import { Square } from "../types"

export default (squareId: string, squares: Square[]) => {
  const [column, row] = squareId.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allToMoves = []
  let rangeMoves: string[] = []

  const allSquares = squares
  const square = allSquares.find((sq) => sq.id === squareId)
  const color = square?.piece?.color

  if (color === "white") {
    // top
    if (rowNumber === 2) {
      const sqId1 = `${COLUMNS[columnIndex]}${rowNumber + 1}`
      const sqId2 = `${COLUMNS[columnIndex]}${rowNumber + 2}`
      const recordSq1 = allSquares.find((sq) => sq.id === sqId1) as Square
      const recordSq2 = allSquares.find((sq) => sq.id === sqId2) as Square
      if (recordSq1.piece === null) allToMoves.push(sqId1)
      if (recordSq1.piece === null && recordSq2.piece === null)
        allToMoves.push(sqId2)
      rangeMoves = [...rangeMoves, sqId1, sqId2]
    } else {
      const sqId = `${COLUMNS[columnIndex]}${rowNumber + 1}`
      const recordSq = allSquares.find((sq) => sq.id === sqId)
      if (recordSq && recordSq.piece === null) allToMoves.push(sqId)
      rangeMoves.push(sqId)
    }
    // top left
    if (columnIndex > 0 && rowNumber < 8) {
      const squareId = `${COLUMNS[columnIndex - 1]}${rowNumber + 1}`
      const sqRecord = allSquares.find((sq) => sq.id === squareId) as Square
      if (sqRecord.piece && sqRecord.piece.color === "black") {
        allToMoves.push(squareId)
        rangeMoves.push(squareId)
      }
    }
    // top right
    if (columnIndex < 7 && rowNumber < 8) {
      const squareId = `${COLUMNS[columnIndex + 1]}${rowNumber + 1}`
      const sqRecord = allSquares.find((sq) => sq.id === squareId) as Square
      if (sqRecord.piece && sqRecord.piece.color === "black") {
        allToMoves.push(squareId)
        rangeMoves.push(squareId)
      }
    }
  } else {
    // bottom
    if (rowNumber === 7) {
      const sqId1 = `${COLUMNS[columnIndex]}${rowNumber - 1}`
      const sqId2 = `${COLUMNS[columnIndex]}${rowNumber - 2}`
      const recordSq1 = allSquares.find((sq) => sq.id === sqId1)
      const recordSq2 = allSquares.find((sq) => sq.id === sqId2)
      if (recordSq1?.piece === null) allToMoves.push(sqId1)
      if (recordSq1?.piece === null && recordSq2?.piece === null)
        allToMoves.push(sqId2)
      rangeMoves = [...rangeMoves, sqId1, sqId2]
    } else {
      const sqId = `${COLUMNS[columnIndex]}${rowNumber - 1}`
      const recordSq = allSquares.find((sq) => sq.id === sqId)
      if (recordSq?.piece === null) allToMoves.push(sqId)
      rangeMoves.push(sqId)
    }
    // bottom left
    if (columnIndex > 0 && rowNumber > 1) {
      const squareId = `${COLUMNS[columnIndex - 1]}${rowNumber - 1}`
      const sqRecord = allSquares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece?.color === "white") {
        allToMoves.push(squareId)
        rangeMoves.push(squareId)
      }
    }
    // bottom right
    if (columnIndex < 7 && rowNumber > 1) {
      const squareId = `${COLUMNS[columnIndex + 1]}${rowNumber - 1}`
      const sqRecord = allSquares.find((sq) => sq.id === squareId)
      if (sqRecord?.piece?.color === "white") {
        allToMoves.push(squareId)
        rangeMoves.push(squareId)
      }
    }
  }

  // console.log({ allToMoves, rangeMoves })

  return { allToMoves, rangeMoves }
}
