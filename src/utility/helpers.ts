import { COLUMNS, ROW_NUMBERS } from "@/constants/chess-board"
import { Piece, PieceColor, Square } from "@/utility/types"
import { pieceSetup } from "./initialPieceSetups"
import * as pieceMoves from "./pieceMoves"

const setDefaultSquare = (piece: string, color: PieceColor, number: number) => {
  if (piece === "pawn" && color === "white") {
    return `${COLUMNS[number - 1]}2`
  } else if (piece === "pawn" && color === "black") {
    return `${COLUMNS[number - 1]}7`
  } else {
    return pieceSetup(piece, color, number)
  }
}

const whiteOrBlackPieces = (color: PieceColor) => {
  const otherPieces = ["rook", "knight", "bishop", "pawn"]
  const allPieces: Piece[] = [
    {
      name: "king",
      number: 1,
      color,
      default_square: color === "white" ? "e1" : "e8",
    },
    {
      name: "queen",
      number: 1,
      color,
      default_square: color === "white" ? "d1" : "d8",
    },
  ]

  otherPieces.forEach((piece) => {
    const numOfPieces = piece === "pawn" ? 8 : 2
    for (let i = 1; i <= numOfPieces; i++) {
      allPieces.push({
        name: piece,
        number: i,
        color,
        default_square: setDefaultSquare(piece, color, i),
      })
    }
  })

  return allPieces
}

const generatePieces = () => {
  const whitePieces = whiteOrBlackPieces("white")
  const blackPieces = whiteOrBlackPieces("black")

  return [...whitePieces, ...blackPieces]
}

const generateSquares = () => {
  const squares: Square[] = []
  const allThePieces = generatePieces()

  for (let i = 1; i <= ROW_NUMBERS; i++) {
    for (let j = 0; j < COLUMNS.length; j++) {
      const squareId = `${COLUMNS[j]}${i}`
      const piece = allThePieces.find(
        (p: Piece) => p.default_square === squareId
      )
      squares.push({
        id: squareId,
        piece: piece ?? null,
        isSelected: false,
        isToMove: false,
      })
    }
  }

  return squares
}

const selectDeselectToMoves = (
  sqIndex: number,
  squares: Square[],
  selectOrDeselect: true | false
) => {
  const updatedSqs = squares
  const pieceMoves = getSquareMoves(updatedSqs[sqIndex])

  updatedSqs[sqIndex].isSelected = selectOrDeselect
  pieceMoves.forEach((move: string) => {
    const index = updatedSqs.findIndex((sq: Square) => sq.id === move)
    updatedSqs[index].isToMove = selectOrDeselect
  })

  return updatedSqs
}

const selectDeselectSquares = (squares: Square[], squareId: string) => {
  let updatedSquares: Square[] = squares
  const prevSelectedIndex = squares.findIndex((sq: Square) => sq.isSelected)
  const selectingSquareIndex = squares.findIndex(
    (sq: Square) => sq.id === squareId
  )

  if (prevSelectedIndex === selectingSquareIndex) {
    updatedSquares = selectDeselectToMoves(
      prevSelectedIndex,
      updatedSquares,
      false
    )
  } else {
    if (prevSelectedIndex !== -1) {
      updatedSquares = selectDeselectToMoves(
        prevSelectedIndex,
        updatedSquares,
        false
      )
      updatedSquares = selectDeselectToMoves(
        selectingSquareIndex,
        updatedSquares,
        true
      )
    } else {
      updatedSquares = selectDeselectToMoves(
        selectingSquareIndex,
        updatedSquares,
        true
      )
    }
  }

  return updatedSquares
}

const getSquareMoves = (square: Square) => {
  const { name } = square.piece!
  const { rookMoves, knightMoves } = pieceMoves

  switch (name) {
    case "rook":
      return rookMoves(square)
    case "knight":
      return knightMoves(square)
    default:
      return []
  }
}

export { generateSquares, selectDeselectSquares, getSquareMoves }
