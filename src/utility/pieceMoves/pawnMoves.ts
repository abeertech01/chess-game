import { COLUMNS } from "@/constants/chess-board"
import { Square } from "../types"

export default (squareId: string, squares: Square[]) => {
  const [column, row] = squareId.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allToMoves = []
  let rangeMoves: string[] = []

  const square = squares.find((sq) => sq.id === squareId) as Square
  const color = square.piece!.color

  if (color == "white") {
    //top
    if (rowNumber === 2) {
      const sqId1 = `${column}${rowNumber + 1}`
      const sqId2 = `${column}${rowNumber + 2}`
      // check if square is empty
      const sq1 = squares.find((sq) => sq.id === sqId1) as Square
      if (sq1.piece === null) allToMoves.push(sqId1)
      const sq2 = squares.find((sq) => sq.id === sqId2) as Square
      if (sq1.piece === null && sq2.piece === null) allToMoves.push(sqId2)
      rangeMoves = [...rangeMoves, sqId1, sqId2]
    } else {
      if (rowNumber < 8) {
        const sqId = `${column}${rowNumber + 1}`
        const sqr = squares.find((sq) => sq.id === sqId) as Square
        if (sqr.piece === null) allToMoves.push(sqId)
        rangeMoves.push(sqId)
      }
    }

    // top left
    if (columnIndex > 0 && rowNumber < 8) {
      const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber + 1}`
      const sqr = squares.find((sq) => sq.id === sqId) as Square
      if (sqr.piece && sqr.piece.color === "black") {
        allToMoves.push(sqId)
        rangeMoves.push(sqId)
      }
    }

    // top right
    if (columnIndex < 7 && rowNumber < 8) {
      const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber + 1}`
      const sqr = squares.find((sq) => sq.id === sqId) as Square
      if (sqr.piece && sqr.piece.color === "black") {
        allToMoves.push(sqId)
        rangeMoves.push(sqId)
      }
    }
  } else {
    // bottom
    if (rowNumber === 7) {
      const sqId1 = `${column}${rowNumber - 1}`
      const sqId2 = `${column}${rowNumber - 2}`
      const sq1 = squares.find((sq) => sq.id === sqId1) as Square
      if (sq1.piece === null) allToMoves.push(sqId1)
      const sq2 = squares.find((sq) => sq.id === sqId2) as Square
      if (sq1.piece === null && sq2.piece === null) allToMoves.push(sqId2)
      rangeMoves = [...rangeMoves, sqId1, sqId2]
    } else {
      if (rowNumber > 1) {
        const sqId = `${column}${rowNumber - 1}`
        const sqr = squares.find((sq) => sq.id === sqId) as Square
        if (sqr.piece === null) allToMoves.push(sqId)
        rangeMoves.push(sqId)
      }
    }

    // bottom left
    if (columnIndex > 0 && rowNumber > 1) {
      const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber - 1}`
      const sqr = squares.find((sq) => sq.id === sqId) as Square
      if (sqr.piece && sqr.piece.color === "white") {
        allToMoves.push(sqId)
        rangeMoves.push(sqId)
      }
    }

    // bottom right
    if (columnIndex < 7 && rowNumber > 1) {
      const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber - 1}`
      const sqr = squares.find((sq) => sq.id === sqId) as Square
      if (sqr.piece && sqr.piece.color === "white") {
        allToMoves.push(sqId)
        rangeMoves.push(sqId)
      }
    }
  }

  return { allToMoves, rangeMoves }
}
