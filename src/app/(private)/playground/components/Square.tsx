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

  const clickSquare = () => {
    if (squareObj.piece) {
      selectASquare(squareObj.id)
      toggleSelectedSquare()
    }
  }

  return (
    <div
      onClick={clickSquare}
      className={`square w-[5rem] h-[5rem] text-black flex justify-center items-center ${
        (i + j) % 2 === 0 ? "bg-[#ffffff]" : "bg-emerald-700"
      } ${squareObj.piece ? "cursor-pointer" : ""} ${
        squareObj.isSelected ? "border-4 border-rose-500" : ""
      } ${squareObj.isToMove ? "border-4 border-amber-300" : ""}`}
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
