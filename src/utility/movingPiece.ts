import { checkIfOppChecked, checkIfPlayerChecked } from "./checkKing"
import { deselectAllSquares, setSquareMoves } from "./helpers"
import { Piece, Square } from "./types"

interface OppChecked {
  check_mate: boolean
  opp_king_check: boolean
}

interface MovePieceFunctionalities {
  updatedSqs: Square[] | null
  isCheckThreat: boolean
  oppChecked: OppChecked | null
  capturedPiece: Piece | null
}

export function movePieceFunctionalities(
  squares: Square[],
  fromIndex: number,
  toIndex: number
): MovePieceFunctionalities {
  let updatedSquares = structuredClone(squares)
  let capturedPiece: Piece | null = null

  if (
    updatedSquares[toIndex].piece &&
    updatedSquares[toIndex].piece.color !==
      updatedSquares[fromIndex].piece!.color
  ) {
    capturedPiece = { ...updatedSquares[toIndex].piece }
    updatedSquares[toIndex].piece = updatedSquares[fromIndex].piece
  }

  if (!updatedSquares[toIndex].piece) {
    updatedSquares[toIndex].piece = updatedSquares[fromIndex].piece
  }

  // reset all the moves of square pieces
  updatedSquares = setSquareMoves(updatedSquares)

  // check if player gets checked checked
  const doesPlayerGetChecked = checkIfPlayerChecked(
    updatedSquares,
    updatedSquares[toIndex].piece!.color
  )

  // deselect all squares
  deselectAllSquares(updatedSquares)

  if (doesPlayerGetChecked)
    return {
      updatedSqs: null,
      isCheckThreat: true,
      oppChecked: null,
      capturedPiece: null,
    }

  const oppChecked = checkIfOppChecked(
    updatedSquares,
    updatedSquares[toIndex].piece!.color
  )

  return {
    updatedSqs: updatedSquares,
    isCheckThreat: false,
    oppChecked,
    capturedPiece,
  }
}
