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
    for (let i = 1; i <= numOfPieces; i++) {
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

const selectDeselectSquares = (squares: Square[], squareId: string) => {
  let updatedSquares = squares
  const prevSelectedIndex = updatedSquares.findIndex((sq) => sq.isSelected)
  const selectingSqIndex = updatedSquares.findIndex((sq) => sq.id === squareId)

  if (prevSelectedIndex === -1) {
    updatedSquares = update_ToMoves(updatedSquares, selectingSqIndex, true)
  } else {
    if (prevSelectedIndex !== selectingSqIndex) {
      updatedSquares = update_ToMoves(updatedSquares, prevSelectedIndex, false)
      updatedSquares = update_ToMoves(updatedSquares, selectingSqIndex, true)
    } else {
      updatedSquares = update_ToMoves(updatedSquares, prevSelectedIndex, false)
    }
  }

  return updatedSquares
}

function update_ToMoves(squares: Square[], sqIndex: number, selDel: boolean) {
  const updatedSquares = squares
  const toMoves = updatedSquares[sqIndex].piece!.toMoves
  updatedSquares[sqIndex].isSelected = selDel
  toMoves.forEach((move) => {
    const index = updatedSquares.findIndex((sq) => sq.id === move)
    updatedSquares[index].isToMove = selDel
  })

  return updatedSquares
}

const getSquareMoves = (square: Square, squares: Square[]) => {
  const { name } = square.piece!
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
      return pawnMoves(square.id, squares!)
    case "rook":
      return rookMoves(square.id, squares!)
    case "knight":
      return knightMoves(square.id, squares!)
    case "bishop":
      return bishopMoves(square.id, squares!)
    case "queen":
      return queenMoves(square.id, squares!)
    case "king":
      return kingMoves(square.id, squares!)
    default:
      return null
  }
}

const deselectAllSquares = (squares: Square[]) => {
  const updatedSquares = [...squares]

  for (let i = 0; i < updatedSquares.length; i++) {
    updatedSquares[i].isSelected = false
    updatedSquares[i].isToMove = false
  }

  return updatedSquares
}

const setSquareMoves = (squares: Square[]) => {
  return squares.map((sq: Square) => {
    if (sq.piece) {
      const allMoves: {
        allToMoves: string[]
        rangeMoves: string[]
      } | null = getSquareMoves(sq, squares)

      return {
        ...sq,
        piece: {
          ...sq.piece,
          toMoves: allMoves!.allToMoves,
          range_moves: allMoves!.rangeMoves,
        },
      }
    } else {
      return sq
    }
  })
}

export {
  generateSquares,
  selectDeselectSquares,
  deselectAllSquares,
  setSquareMoves,
}
