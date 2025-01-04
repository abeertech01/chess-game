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

  // top left
  if (columnIndex > 0 && rowNumber < 8) {
    let _row = rowNumber
    for (let i = columnIndex - 1; i >= 0; i--) {
      if (_row === 8) break
      _row = _row + 1
      const sqId = `${COLUMNS[i]}${_row}`
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
  }

  // top right
  if (columnIndex < 7 && rowNumber < 8) {
    let _row = rowNumber
    for (let i = columnIndex + 1; i <= 7; i++) {
      if (_row === 8) break
      _row = _row + 1
      const sqId = `${COLUMNS[i]}${_row}`
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

  // bottom left
  if (columnIndex > 0 && rowNumber > 1) {
    let _row = rowNumber
    for (let i = columnIndex - 1; i >= 0; i--) {
      if (_row === 1) break
      _row = _row - 1
      const sqId = `${COLUMNS[i]}${_row}`
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
  }

  // bottom right
  if (columnIndex < 7 && rowNumber > 1) {
    let _row = rowNumber
    for (let i = columnIndex + 1; i <= 7; i++) {
      if (_row === 1) break
      _row = _row - 1
      const sqId = `${COLUMNS[i]}${_row}`
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
  }

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

  return { allToMoves, rangeMoves }
}
