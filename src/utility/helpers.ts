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
  let updatedSquares = structuredClone(squares)
  let isAnySqSelected = false
  const prevSelectedIndex = updatedSquares.findIndex((sq) => sq.isSelected)
  const selectingSqIndex = updatedSquares.findIndex((sq) => sq.id === squareId)

  if (prevSelectedIndex === -1) {
    updatedSquares = update_ToMoves(updatedSquares, selectingSqIndex, true)
    isAnySqSelected = true
  } else {
    if (prevSelectedIndex !== selectingSqIndex) {
      updatedSquares = update_ToMoves(updatedSquares, prevSelectedIndex, false)
      updatedSquares = update_ToMoves(updatedSquares, selectingSqIndex, true)
      isAnySqSelected = true
    } else {
      updatedSquares = update_ToMoves(updatedSquares, prevSelectedIndex, false)
      isAnySqSelected = false
    }
  }

  return { updatedSquares, isAnySqSelected }
}

function update_ToMoves(squares: Square[], sqIndex: number, selDel: boolean) {
  const updatedSquares = structuredClone(squares)
  updatedSquares[sqIndex].isSelected = selDel
  updatedSquares[sqIndex].piece!.toMoves.forEach((move) => {
    const index = updatedSquares.findIndex((sq) => sq.id === move)
    updatedSquares[index].isToMove = selDel
  })

  return updatedSquares
}

const getSquareMoves = (sqIndex: number, sqs: Square[]) => {
  const squares = structuredClone(sqs)
  const square = squares[sqIndex]
  const { name } = squares[sqIndex].piece!
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
  for (let i = 0; i < squares.length; i++) {
    squares[i].isSelected = false
    squares[i].isToMove = false
  }
}

const setSquareMoves = (squares: Square[]) => {
  let updatedSquares = structuredClone(squares)
  console.log("updatedSquares top ", updatedSquares)
  updatedSquares = updatedSquares.map((sq: Square, index: number) => {
    if (sq.piece) {
      const allMoves: {
        allToMoves: string[]
        rangeMoves: string[]
      } | null = getSquareMoves(index, squares)

      const piece = {
        ...sq.piece,
        toMoves: allMoves!.allToMoves,
        range_moves: allMoves!.rangeMoves,
      }

      const changedSquare: Square = {
        id: sq.id,
        isSelected: sq.isSelected,
        isToMove: sq.isToMove,
        piece,
      }

      if (sq.id === "a2") console.log(changedSquare)

      return changedSquare
    } else {
      // Ensure even unchanged squares return a new object
      return { ...sq }
    }
  })
  // console.log("updatedSquares ", updatedSquares)

  return updatedSquares
}

export {
  generateSquares,
  selectDeselectSquares,
  deselectAllSquares,
  setSquareMoves,
}
