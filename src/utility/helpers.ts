import { ROW, ROW_NUMBERS } from "@/constants/chess-board"
import { Piece, PieceColor, Row, Square } from "@/utility/types"
import { pieceSetup } from "./initialPieceSetups"

const setDefaultSquare = (piece: string, color: PieceColor, number: number) => {
  if (piece === "pawn" && color === "white") {
    return `${ROW[number - 1]}2`
  } else if (piece === "pawn" && color === "black") {
    return `${ROW[number - 1]}7`
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

  return { white: whitePieces, black: blackPieces }
}

const generateSquares = () => {
  const squares: Square[] = []
  let rows: Row[] = []

  for (let i = 1; i <= ROW_NUMBERS; i++) {
    for (let j = 0; j < ROW.length; j++) {
      squares.push({
        id: ROW[j] + i,
        piece: null,
      })
    }
  }

  if (squares.length === 64) {
    Array.from({ length: 8 }).forEach((_, i) => {
      const row: Square[] = squares.slice(i * 8, (i + 1) * 8)
      rows.push({
        no: i + 1,
        squares: row,
      })
    })
  }

  return { squares, rows: rows.reverse() }
}

export { generateSquares, generatePieces }
