"use client"

import { usePlayGroundStore } from "@/store/playGroundStore"
import { Square as SquareObj } from "@/utility/types"
import { FC } from "react"
import { ALL_PIECES } from "@/constants/chess-board"
import Image from "next/image"

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
  const selectASquare = usePlayGroundStore((state) => state.selectASquare)
  const movePiece = usePlayGroundStore((state) => state.movePiece)

  const clickSquare = () => {
    if (squareObj.piece) {
      selectASquare(squareObj.id)
      toggleSelectedSquare()
    }

    if (squareObj.piece === null && squareObj.isToMove) {
      movePiece(squareObj.id)
      toggleSelectedSquare()
    }
  }

  return (
    <div
      onClick={clickSquare}
      className={`relative square w-[5rem] h-[5rem] text-black flex justify-center items-center ${
        (i + j) % 2 === 0 ? "bg-[#ffffff]" : "bg-teal-700"
      } ${squareObj.piece || squareObj.isToMove ? "cursor-pointer" : ""} ${
        squareObj.isSelected
          ? "after:absolute after:w-[calc(100%-0.6rem)] after:h-[calc(100%-0.6rem)] after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-pink-500 after:rounded-md"
          : ""
      } ${
        squareObj.isToMove
          ? "after:absolute after:w-[calc(100%-0.6rem)] after:h-[calc(100%-0.6rem)] after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-cyan-400 after:rounded-md"
          : ""
      }`}
      key={j}
    >
      <h1>{squareObj.piece ? null : squareObj.id}</h1>
      {squareObj.piece && (
        <Image
          src={ALL_PIECES[squareObj.piece.name][squareObj.piece.color]}
          alt={squareObj.piece.name}
          className="w-[3rem] h-[3rem]"
        />
      )}
    </div>
  )
}

export default Square
