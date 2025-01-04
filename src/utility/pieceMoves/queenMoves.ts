import { COLUMNS } from "@/constants/chess-board"
import { Square } from "../types"

export default (squareId: string, squares: Square[]) => {
  const [column, row] = squareId.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)
  const { piece: playerPiece } = squares.find(
    (sq) => sq.id === squareId
  ) as Square

  const allToMoves = []
  const rangeMoves = []

  // top
  if (rowNumber < 8) {
    let pieceExisted = false
    for (let i = rowNumber + 1; i <= 8; i++) {
      const sqId = `${column}${i}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pieceExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pieceExisted = true
      }

      if (!pieceExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // top left
  if (columnIndex > 0 && rowNumber < 8) {
    let _row = rowNumber
    let pieceExisted = false
    for (let i = columnIndex - 1; i >= 0; i--) {
      if (_row === 8) break
      _row = _row + 1
      const sqId = `${COLUMNS[i]}${_row}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pieceExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pieceExisted = true
      }

      if (!pieceExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // top right
  if (columnIndex < 7 && rowNumber < 8) {
    let _row = rowNumber
    let pieceExisted = false
    for (let i = columnIndex + 1; i <= 7; i++) {
      if (_row === 8) break
      _row = _row + 1
      const sqId = `${COLUMNS[i]}${_row}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pieceExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pieceExisted = true
      }

      if (!pieceExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // bottom
  if (rowNumber > 1) {
    let pieceExisted = false
    for (let i = rowNumber - 1; i >= 1; i--) {
      const sqId = `${column}${i}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pieceExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pieceExisted = true
      }

      if (!pieceExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // bottom left
  if (columnIndex > 0 && rowNumber > 1) {
    let _row = rowNumber
    let pieceExisted = false
    for (let i = columnIndex - 1; i >= 0; i--) {
      if (_row === 1) break
      _row = _row - 1
      const sqId = `${COLUMNS[i]}${_row}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pieceExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pieceExisted = true
      }

      if (!pieceExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // bottom right
  if (columnIndex < 7 && rowNumber > 1) {
    let _row = rowNumber
    let pieceExisted = false
    for (let i = columnIndex + 1; i <= 7; i++) {
      if (_row === 1) break
      _row = _row - 1
      const sqId = `${COLUMNS[i]}${_row}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pieceExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pieceExisted = true
      }

      if (!pieceExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // left
  if (columnIndex > 0) {
    let pieceExisted = false
    for (let i = columnIndex - 1; i >= 0; i--) {
      const sqId = `${COLUMNS[i]}${rowNumber}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pieceExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pieceExisted = true
      }

      if (!pieceExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // right
  if (columnIndex < 7) {
    let pieceExisted = false
    for (let i = columnIndex + 1; i < COLUMNS.length; i++) {
      const sqId = `${COLUMNS[i]}${rowNumber}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pieceExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pieceExisted = true
      }

      if (!pieceExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  return { allToMoves, rangeMoves }
}
