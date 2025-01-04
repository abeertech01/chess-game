import { COLUMNS } from "@/constants/chess-board"
import { usePlayGroundStore } from "@/store/playGroundStore"
import { Square } from "@/utility/types"

export default (squareId: string, squares: Square[]) => {
  const [column, row] = squareId.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)
  const allSquares = squares
  const square = allSquares.find((sq) => sq.id === squareId) as Square

  const allToMoves = []
  const rangeMoves = []

  // top left
  if (columnIndex > 0 && rowNumber < 7) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber + 2}`
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
  if (columnIndex < 7 && rowNumber < 7) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber + 2}`
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
  if (columnIndex > 0 && rowNumber > 2) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber - 2}`
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
  if (columnIndex < 7 && rowNumber > 2) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber - 2}`
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

  // left top
  if (columnIndex > 1 && rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex - 2]}${rowNumber + 1}`
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

  // left bottom
  if (columnIndex > 1 && rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex - 2]}${rowNumber - 1}`
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

  // right top
  if (columnIndex < 6 && rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex + 2]}${rowNumber + 1}`
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

  // right bottom
  if (columnIndex < 6 && rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex + 2]}${rowNumber - 1}`
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
