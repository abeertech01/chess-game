import { COLUMNS } from "@/constants/chess-board"
import { Square } from "@/utility/types"

export default (squareId: string, squares: Square[]) => {
  const [column, row] = squareId.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)
  const allSquares = squares
  const square = allSquares.find((sq) => sq.id === squareId) as Square

  const allToMoves = []
  const rangeMoves = []

  // left
  for (let i = columnIndex - 1; i >= 0; i--) {
    const sqId = `${COLUMNS[i]}${rowNumber}`
    const pieceExistingSq = allSquares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allToMoves.push(sqId)
      }
    } else {
      allToMoves.push(sqId)
    }
    rangeMoves.push(sqId)
  }
  // right
  for (let i = columnIndex + 1; i < COLUMNS.length; i++) {
    const sqId = `${COLUMNS[i]}${rowNumber}`
    const pieceExistingSq = allSquares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allToMoves.push(sqId)
      }
    } else {
      allToMoves.push(sqId)
    }
    rangeMoves.push(sqId)
  }
  // top
  for (let i = rowNumber + 1; i <= 8; i++) {
    const sqId = `${column}${i}`
    const pieceExistingSq = allSquares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allToMoves.push(sqId)
      }
    } else {
      allToMoves.push(sqId)
    }
    rangeMoves.push(sqId)
  }
  // bottom
  for (let i = rowNumber - 1; i >= 1; i--) {
    const sqId = `${column}${i}`
    const pieceExistingSq = allSquares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allToMoves.push(sqId)
      }
    } else {
      allToMoves.push(sqId)
    }
    rangeMoves.push(sqId)
  }

  return { allToMoves, rangeMoves }
}
