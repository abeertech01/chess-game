import { COLUMNS } from "@/constants/chess-board"
import { Square } from "../types"

export default (squareId: string, squares: Square[]) => {
  const [column, row] = squareId.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)
  const allSquares = squares
  const square = allSquares.find((sq) => sq.id === squareId) as Square

  const allToMoves = []
  const rangeMoves = []

  // top
  if (rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex]}${rowNumber + 1}`
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

  // top left
  if (columnIndex > 0 && rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber + 1}`
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

  // top right
  if (columnIndex < 7 && rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber + 1}`
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

  // left
  if (columnIndex > 0) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber}`
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
  if (rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex]}${rowNumber - 1}`
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

  // bottom left
  if (columnIndex > 0 && rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber - 1}`
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

  // bottom right
  if (columnIndex < 7 && rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber - 1}`
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
  if (columnIndex < 7) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber}`
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
