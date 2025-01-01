import { COLUMNS } from "@/constants/chess-board"
import { Square } from "../types"
import { usePlayGroundStore } from "@/store/playGroundStore"

const getSquares = () => {
  const squares = usePlayGroundStore.getState().squares
  return squares
}

export default (square: Square) => {
  const { id } = square
  const [column, row] = id.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)
  const squares = getSquares()

  const allMoves = []

  // top
  for (let i = rowNumber + 1; i <= 8; i++) {
    const sqId = `${column}${i}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
        break
      } else {
        break
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // top left
  if (columnIndex > 0 && rowNumber < 8) {
    let _row = rowNumber
    for (let i = columnIndex - 1; i >= 0; i--) {
      if (_row === 8) break
      _row = _row + 1
      const sqId = `${COLUMNS[i]}${_row}`
      const pieceExistingSq = squares.find(
        (sq) => sq.id === sqId && sq.piece !== null
      )
      if (pieceExistingSq) {
        if (pieceExistingSq.piece?.color !== square.piece?.color) {
          allMoves.push(sqId)
          break
        } else {
          break
        }
      } else {
        allMoves.push(sqId)
      }
    }
  }

  // top right
  if (columnIndex < 7 && rowNumber < 8) {
    let _row = rowNumber
    for (let i = columnIndex + 1; i <= 7; i++) {
      if (_row === 8) break
      _row = _row + 1
      const sqId = `${COLUMNS[i]}${_row}`
      const pieceExistingSq = squares.find(
        (sq) => sq.id === sqId && sq.piece !== null
      )
      if (pieceExistingSq) {
        if (pieceExistingSq.piece?.color !== square.piece?.color) {
          allMoves.push(sqId)
          break
        } else {
          break
        }
      } else {
        allMoves.push(sqId)
      }
    }
  }

  // bottom
  for (let i = rowNumber - 1; i >= 1; i--) {
    const sqId = `${column}${i}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
        break
      } else {
        break
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // bottom left
  if (columnIndex > 0 && rowNumber > 1) {
    let _row = rowNumber
    for (let i = columnIndex - 1; i >= 0; i--) {
      if (_row === 1) break
      _row = _row - 1
      const sqId = `${COLUMNS[i]}${_row}`
      const pieceExistingSq = squares.find(
        (sq) => sq.id === sqId && sq.piece !== null
      )
      if (pieceExistingSq) {
        if (pieceExistingSq.piece?.color !== square.piece?.color) {
          allMoves.push(sqId)
          break
        } else {
          break
        }
      } else {
        allMoves.push(sqId)
      }
    }
  }

  // bottom right
  if (columnIndex < 7 && rowNumber > 1) {
    let _row = rowNumber
    for (let i = columnIndex + 1; i <= 7; i++) {
      if (_row === 1) break
      _row = _row - 1
      const sqId = `${COLUMNS[i]}${_row}`
      const pieceExistingSq = squares.find(
        (sq) => sq.id === sqId && sq.piece !== null
      )
      if (pieceExistingSq) {
        if (pieceExistingSq.piece?.color !== square.piece?.color) {
          allMoves.push(sqId)
          break
        } else {
          break
        }
      } else {
        allMoves.push(sqId)
      }
    }
  }

  // left
  for (let i = columnIndex - 1; i >= 0; i--) {
    const sqId = `${COLUMNS[i]}${rowNumber}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
        break
      } else {
        break
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // right
  for (let i = columnIndex + 1; i < COLUMNS.length; i++) {
    const sqId = `${COLUMNS[i]}${rowNumber}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
        break
      } else {
        break
      }
    } else {
      allMoves.push(sqId)
    }
  }

  return allMoves
}
