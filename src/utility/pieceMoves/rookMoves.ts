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

  return allMoves
}
