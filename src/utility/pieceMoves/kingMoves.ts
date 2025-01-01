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
  if (rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex]}${rowNumber + 1}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // top left
  if (columnIndex > 0 && rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber + 1}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // top right
  if (columnIndex < 7 && rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber + 1}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // left
  if (columnIndex > 0) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // bottom
  if (rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex]}${rowNumber - 1}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // bottom left
  if (columnIndex > 0 && rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber - 1}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // bottom right
  if (columnIndex < 7 && rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber - 1}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
      }
    } else {
      allMoves.push(sqId)
    }
  }

  // right
  if (columnIndex < 7) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber}`
    const pieceExistingSq = squares.find(
      (sq) => sq.id === sqId && sq.piece !== null
    )
    if (pieceExistingSq) {
      if (pieceExistingSq.piece?.color !== square.piece?.color) {
        allMoves.push(sqId)
      }
    } else {
      allMoves.push(sqId)
    }
  }

  return allMoves
}
