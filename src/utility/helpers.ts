import { Piece, PieceColor, Square } from "./types"
import { COLUMNS, ROW_NUMBERS } from "@/constants/chess-board"
import { pieceSetup } from "./initialPieceSetups"
import * as pieceMoves from "./pieceMoves"

const generateSquares = () => {
  const squares: Square[] = []
  const allThePieces = whiteBlackPieces()

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

const whiteBlackPieces = () => {
  const whitePieces: Piece[] = generatePieces("white")
  const blackPieces: Piece[] = generatePieces("black")

  return [...whitePieces, ...blackPieces]
}

const generatePieces = (color: PieceColor) => {
  const otherPieces = ["rook", "knight", "bishop", "pawn"]
  const allPieces: Piece[] = [
    {
      name: "king",
      number: 1,
      color,
      default_square: color === "white" ? "e1" : "e8",
      toMoves: [],
      range_moves: [],
    },
    {
      name: "queen",
      number: 1,
      color,
      default_square: color === "white" ? "d1" : "d8",
      toMoves: [],
      range_moves: [],
    },
  ]

  otherPieces.forEach((piece) => {
    const numOfPieces = piece === "pawn" ? 8 : 2
    for (let i = 1; i < numOfPieces; i++) {
      allPieces.push({
        name: piece,
        number: i,
        color,
        default_square: setDefaultSquare(piece, color, i),
        toMoves: [],
        range_moves: [],
      })
    }
  })

  return allPieces
}

const setDefaultSquare = (piece: string, color: PieceColor, number: number) => {
  if (piece === "pawn" && color === "white") {
    return `${COLUMNS[number - 1]}2`
  } else if (piece === "pawn" && color === "black") {
    return `${COLUMNS[number - 1]}7`
  } else {
    return pieceSetup(piece, color, number)
  }
}

const selectDeselectSquares = (squares: Square[], squareId: string) => {
  const prevSelectedIndex = squares.findIndex((sq) => sq.isSelected)
  const selectingSquareIndex = squares.findIndex((sq) => sq.id === squareId)

  if (prevSelectedIndex === selectingSquareIndex) {
    squares[prevSelectedIndex].isSelected = false
  }
}

const getSquareMoves = (squareId: string, squares: Square[]) => {
  const square = squares.find((sq: Square) => sq.id === squareId)
  const { name, color } = square!.piece!
  const {
    rookMoves,
    knightMoves,
    bishopMoves,
    queenMoves,
    kingMoves,
    pawnMoves,
  } = pieceMoves

  switch (name) {
    case "pawn":
      return pawnMoves(squareId, squares, color)
    case "rook":
      return rookMoves(squareId, squares)
    case "knight":
      return knightMoves(squareId, squares)
    case "bishop":
      return bishopMoves(squareId, squares)
    case "queen":
      return queenMoves(squareId, squares)
    case "king":
      return kingMoves(squareId, squares)
    default:
      return []
  }
}

export { generateSquares }
