"use client"

import { usePlayGroundStore } from "@/store/playGroundStore"
import { Piece, Square as SquareObj } from "@/utility/types"
import { FC, useEffect, useState } from "react"
import { ALL_PIECES } from "@/constants/chess-board"
import Image from "next/image"
import { getSquareMoves } from "@/utility/helpers"

interface ComponentProps {
  squareObj: SquareObj
  i: number
  j: number
  toggleSelectedSquare: () => void
}

const Square: FC<ComponentProps> = ({
  squareObj,
  i,
  j,
  toggleSelectedSquare,
}) => {
  const [piece, setPiece] = useState<Piece | null>(null)

  const allThePieces = usePlayGroundStore((state) => state.allThePieces)
  const selectASquare = usePlayGroundStore((state) => state.selectASquare)

  useEffect(() => {
    if (
      allThePieces.white.length === 16 &&
      allThePieces.black.length === 16 &&
      piece === null
    ) {
      const record = [...allThePieces.white, ...allThePieces.black].find(
        (pc) => pc.default_square === squareObj.id
      )

      setPiece(record ? record : null)
    }
  }, [allThePieces])

  const clickSquare = () => {
    if (piece) {
      const moves = getSquareMoves(piece, squareObj)
      console.log("moves: ", moves)
      selectASquare(squareObj.id)
      toggleSelectedSquare()
    }
  }

  return (
    <div
      onClick={clickSquare}
      className={`square w-[5rem] h-[5rem] text-black flex justify-center items-center ${
        (i + j) % 2 === 0 ? "bg-[#ffffff]" : "bg-emerald-700"
      } ${piece ? "cursor-pointer" : ""} ${
        squareObj.isSelected ? "border-4 border-rose-500" : ""
      }`}
      key={j}
    >
      <h1>{piece ? null : squareObj.id}</h1>
      {piece && (
        <Image
          src={ALL_PIECES[piece.name][piece.color]}
          alt={piece.name}
          className="w-[3rem] h-[3rem]"
        />
      )}
    </div>
  )
}

export default Square
