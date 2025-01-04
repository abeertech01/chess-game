import { COLUMNS } from "@/constants/chess-board"
import { Square } from "@/utility/types"

export default (squareId: string, squares: Square[]) => {
  const [column, row] = squareId.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)
  const { piece: playerPiece } = squares.find(
    (sq) => sq.id === squareId
  ) as Square

  const allToMoves: string[] = []
  const rangeMoves = []

  // top left [column -, row +]
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

  // top right [column +, row +]
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

  // bottom left [column -, row -]
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

  // bottom right [colum +, row -]
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

  return { allToMoves, rangeMoves }
}
