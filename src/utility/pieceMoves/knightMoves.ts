import { COLUMNS } from "@/constants/chess-board"
import { usePlayGroundStore } from "@/store/playGroundStore"
import { Square } from "@/utility/types"

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

  // top left
  if (columnIndex > 0 && rowNumber < 7) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber + 2}`
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
  if (columnIndex < 7 && rowNumber < 7) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber + 2}`
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
  if (columnIndex > 0 && rowNumber > 2) {
    const sqId = `${COLUMNS[columnIndex - 1]}${rowNumber - 2}`
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
  if (columnIndex < 7 && rowNumber > 2) {
    const sqId = `${COLUMNS[columnIndex + 1]}${rowNumber - 2}`
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

  // left top
  if (columnIndex > 1 && rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex - 2]}${rowNumber + 1}`
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

  // left bottom
  if (columnIndex > 1 && rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex - 2]}${rowNumber - 1}`
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

  // right top
  if (columnIndex < 6 && rowNumber < 8) {
    const sqId = `${COLUMNS[columnIndex + 2]}${rowNumber + 1}`
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

  // right bottom
  if (columnIndex < 6 && rowNumber > 1) {
    const sqId = `${COLUMNS[columnIndex + 2]}${rowNumber - 1}`
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
