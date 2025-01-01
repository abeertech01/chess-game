import { FC } from "react"
import Image from "next/image"
import { Piece as PieceType } from "@/utility/types"
import { ALL_PIECES } from "@/constants/chess-board"

interface ComponentProps {
  piece: PieceType
  className: string
}

const Piece: FC<ComponentProps> = ({ piece, className }) => {
  return (
    <>
      <Image
        src={ALL_PIECES[piece.name][piece.color]}
        alt={piece.name}
        width={80}
        height={80}
        className={className}
      />
    </>
  )
}

export default Piece
