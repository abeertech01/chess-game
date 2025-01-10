"use client"

import { Square as SquareObj } from "@/utility/types"

import { FC } from "react"
import Piece from "./Piece"
import { usePlayGroundStore } from "@/store/playGroundStore"

interface ComponentProps {
  squareObj: SquareObj
  i: number
  j: number
}

const Square: FC<ComponentProps> = ({ squareObj, i, j }) => {
  const toMovePlayer = usePlayGroundStore((state) => state.toMovePlayer)
  const selectASquare = usePlayGroundStore((state) => state.selectASquare)

  const clickSquare = () => {
    if (
      squareObj.piece &&
      squareObj.piece.color === toMovePlayer &&
      !squareObj.isToMove
    ) {
      selectASquare(squareObj.id)
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
      } 
    `}
    >
      {squareObj.piece && (
        <Piece piece={squareObj.piece} className={"w-[3rem] h-[3rem]"} />
      )}
      <small className="absolute bottom-1 right-1">
        {squareObj.piece ? null : squareObj.id}
      </small>
    </div>
  )
}

export default Square
