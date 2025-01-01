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

  const allMoves: string[] = []

  // top left [column -, row +]
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

  // top right [column +, row +]
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

  // bottom left [column -, row -]
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

  // bottom right [colum +, row -]
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

  return allMoves
}
