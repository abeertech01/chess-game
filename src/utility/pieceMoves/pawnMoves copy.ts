import { COLUMNS } from "@/constants/chess-board"
import { Square } from "../types"

export default (squareId: string, squares: Square[]) => {
  const [column, row] = squareId.split("")
  const columnIndex = COLUMNS.indexOf(column)
  const rowNumber = parseInt(row)

  const allToMoves = []
  let rangeMoves: string[] = []

  const allSquares = squares
  const square = allSquares.find((sq) => sq.id === squareId) as Square
  const color = square.piece!.color

  if (color == "white") {
    //top
    if (rowNumber === 2) {
      const sqId1 = `${COLUMNS[columnIndex]}${rowNumber + 1}`
      const sqId2 = `${COLUMNS[columnIndex]}${rowNumber + 2}`
      // check if square is empty
      const sq1 = allSquares.find((sq) => sq.id === sqId1) as Square
      if (sq1.piece === null) {
        allToMoves.push(sqId1)
        rangeMoves.push(sqId1)
      }
      const sq2 = allSquares.find((sq) => sq.id === sqId2) as Square
      if (sq1.piece === null && sq2.piece === null) {
        allToMoves.push(sqId2)
        rangeMoves.push(sqId2)
      }
    } else {
      if (rowNumber > 8) {
        const sqId = `${COLUMNS[columnIndex]}${rowNumber + 1}`
        const sqr = allSquares.find((sq) => sq.id === sqId) as Square
        if (sqr.piece === null) {
          allSquares
        }
      }
    }

    // top left

    // top right
  } else {
    // bottom
    if (rowNumber === 2) {
      const sqId1 = ``
    } else {
    }

    // bottom left

    // bottom right
  }
}
