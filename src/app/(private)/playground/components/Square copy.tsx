"use client"

import { usePlayGroundStore } from "@/store/playGroundStore"
import {
  // KingRelatedSquares,
  PieceColor,
  Square as SquareObj,
} from "@/utility/types"
import { FC, useEffect, useState } from "react"
import Piece from "@/app/(private)/playground/components/Piece"

interface ComponentProps {
  squareObj: SquareObj
  i: number
  j: number
  // toggleSelectedSquare: () => void
  // kingRelatedSquares: KingRelatedSquares | null
}

const Square: FC<ComponentProps> = ({
  squareObj,
  i,
  j,
  // toggleSelectedSquare,
  // kingRelatedSquares,
}) => {
  const selectASquare = usePlayGroundStore((state) => state.selectASquare)
  const movePiece = usePlayGroundStore((state) => state.movePiece)
  const toMovePlayer = usePlayGroundStore((state) => state.toMovePlayer)
  const [opponentColor, setOpponentColor] = useState<PieceColor | null>(
    squareObj.piece && (squareObj.piece.color === "white" ? "black" : "white")
  )

  // useEffect(()=> {

  // }, [kingRelatedSquares])

  const clickSquare = () => {
    if (
      squareObj.piece &&
      squareObj.piece.color === toMovePlayer &&
      !squareObj.isToMove
    ) {
      selectASquare(squareObj.id)
      // toggleSelectedSquare()
    }

    if (squareObj.isToMove) {
      movePiece(squareObj.id)
      // toggleSelectedSquare()
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
      key={j}
      // ${
      //   kingRelatedSquares !== null &&
      //   kingRelatedSquares[opponentColor!].king_checked
      //     ? "bg-rose-500!"
      //     : ""
      // }
    >
      <h1>{squareObj.piece ? null : squareObj.id}</h1>
      {squareObj.piece && (
        <Piece piece={squareObj.piece} className={"w-[3rem] h-[3rem]"} />
      )}
    </div>
  )
}

export default Square
