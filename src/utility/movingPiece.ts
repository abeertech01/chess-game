import { checkIfOppChecked, checkIfPlayerChecked } from "./checkKing"
import { deselectAllSquares, setSquareMoves } from "./helpers"
import { Piece, Square } from "./types"

const pieceMover = (
  squares: Square[],
  fromSqIndex: number,
  toSqIndex: number
) => {
  let updatedSquares = structuredClone(squares)
  let capturedPiece: Piece | null = null

  if (
    updatedSquares[toSqIndex].piece &&
    updatedSquares[toSqIndex].piece.color !==
      updatedSquares[fromSqIndex].piece!.color
  ) {
    capturedPiece = updatedSquares[toSqIndex].piece
    updatedSquares[toSqIndex].piece = updatedSquares[fromSqIndex].piece
    updatedSquares[fromSqIndex].piece = null
  }

  // if tosqindex has no piece, just move it.
  if (!updatedSquares[toSqIndex].piece) {
    updatedSquares[toSqIndex].piece = updatedSquares[fromSqIndex].piece
    updatedSquares[fromSqIndex].piece = null
  }

  updatedSquares = setSquareMoves(updatedSquares)

  // check if the player gets checked
  const isPlayerChecked = checkIfPlayerChecked(
    updatedSquares,
    updatedSquares[toSqIndex].piece!.color
  )

  if (isPlayerChecked)
    return {
      updatedSqs: null,
      isPlayerCheckThreat: true,
      oppChecked: null,
      capturedPiece: null,
    }

  const oppChecked = checkIfOppChecked(
    updatedSquares,
    updatedSquares[toSqIndex].piece!.color
  )

  console.log({ oppChecked })

  deselectAllSquares(updatedSquares)

  return {
    updatedSqs: updatedSquares,
    isPlayerCheckThreat: false,
    oppChecked,
    capturedPiece,
  }
}

export { pieceMover }
