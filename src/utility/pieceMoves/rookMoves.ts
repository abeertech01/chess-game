import { COLUMNS } from "@/constants/chess-board"
import { Square } from "../types"

export default (squareId: string, squares: Square[]) => {
  const [column, row] = squareId.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = Number(row)
  const { piece: playerPiece } = squares.find(
    (sq) => sq.id === squareId
  ) as Square

  const allToMoves: string[] = []
  const rangeMoves: string[] = []

  // left
  if (columnIndex > 0) {
    let pcExisted = false
    for (let i = columnIndex - 1; i >= 0; i--) {
      const sqId = `${COLUMNS[i]}${rowNumber}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pcExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pcExisted = true
      }

      if (!pcExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // right
  if (columnIndex < 7) {
    let pcExisted = false
    for (let i = columnIndex + 1; i < COLUMNS.length; i++) {
      const sqId = `${COLUMNS[i]}${rowNumber}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pcExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pcExisted = true
      }

      if (!pcExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // top
  if (rowNumber < 8) {
    let pcExisted = false
    for (let i = rowNumber + 1; i <= 8; i++) {
      const sqId = `${column}${i}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pcExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pcExisted = true
      }

      if (!pcExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  // bottom
  if (rowNumber > 1) {
    let pcExisted = false
    for (let i = rowNumber - 1; i >= 1; i--) {
      const sqId = `${column}${i}`
      const { piece: sqPiece } = squares.find((sq) => sq.id === sqId) as Square

      if (!pcExisted && sqPiece) {
        if (sqPiece.color !== playerPiece?.color) allToMoves.push(sqId)

        pcExisted = true
      }

      if (!pcExisted && !sqPiece) allToMoves.push(sqId)

      rangeMoves.push(sqId)
    }
  }

  return { allToMoves, rangeMoves }
}
