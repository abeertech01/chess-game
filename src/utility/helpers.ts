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
  let updatedSquares = squares
  const prevSelectedIndex = updatedSquares.findIndex((sq) => sq.isSelected)
  const selectingSquareIndex = updatedSquares.findIndex(
    (sq) => sq.id === squareId
  )

  if (prevSelectedIndex === -1) {
    selDelToMoves(selectingSquareIndex, updatedSquares, true)
  } else {
    if (prevSelectedIndex !== selectingSquareIndex) {
      selDelToMoves(prevSelectedIndex, updatedSquares, false)
      selDelToMoves(selectingSquareIndex, updatedSquares, true)
    } else {
      selDelToMoves(prevSelectedIndex, updatedSquares, false)
    }
  }

  return [...updatedSquares]
}

const selDelToMoves = (
  sqIndex: number,
  squares: Square[],
  selOrDel: boolean
) => {
  const pieceMoves = getSquareMoves(squares[sqIndex].id, squares)

  squares[sqIndex] = {
    ...squares[sqIndex],
    isSelected: selOrDel,
  }
  pieceMoves?.allToMoves.forEach((move) => {
    const index = squares.findIndex((sq: Square) => sq.id === move)
    squares[index] = {
      ...squares[index],
      isToMove: selOrDel,
    }
  })
}

const getSquareMoves = (squareId: string, squares: Square[]) => {
  const square = squares.find((sq: Square) => sq.id === squareId)
  const { name } = square!.piece!
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
      return pawnMoves(squareId, squares)
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
      return null
  }
}

const setSquareMoves = (squares: Square[]) => {
  let updatedSquares = squares.map((sq: Square, index: number) => {
    if (sq.piece) {
      const allMoves: {
        allToMoves: string[]
        rangeMoves: string[]
      } | null = getSquareMoves(sq.id, squares)

      return {
        ...sq,
        piece: {
          ...sq.piece,
          toMoves: allMoves ? allMoves.allToMoves : [],
          range_moves: allMoves ? allMoves.rangeMoves : [],
        },
      }
    } else {
      return { ...sq }
    }
  })

  return updatedSquares
}

const deselectAllSquares = (squares: Square[]) => {
  for (let i = 0; i < squares.length; i++) {
    squares[i].isSelected = false
    squares[i].isToMove = false

    if (squares[i].isSelected) {
      const newSq = {
        ...squares[i],
        isSelected: false,
      }

      squares[i] = newSq
    }

    if (squares[i].isToMove) {
      const newSq = {
        ...squares[i],
        isToMove: false,
      }

      squares[i] = newSq
    }
  }
}

export {
  generateSquares,
  getSquareMoves,
  setSquareMoves,
  selectDeselectSquares,
  deselectAllSquares,
}
