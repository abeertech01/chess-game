"use client"

import { usePlayGroundStore } from "@/store/playGroundStore"
import { Piece, Square as SquareObj } from "@/utility/types"
import { FC, useEffect, useState } from "react"
import { ALL_PIECES } from "@/constants/chess-board"
import Image from "next/image"

interface ComponentProps {
  squareObj: SquareObj
}

const Square: FC<ComponentProps> = ({ squareObj }) => {
  const [piece, setPiece] = useState<Piece | null>(null)
  const [image, setImage] = useState()

  const allThePieces = usePlayGroundStore((state) => state.allThePieces)

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

  return (
    <>
      <h1>{piece ? null : squareObj.id}</h1>
      {piece && (
        <Image
          src={ALL_PIECES[piece.name][piece.color]}
          alt={piece.name}
          className="w-[3rem] h-[3rem]"
        />
      )}
    </>
  )
}

export default Square
