import { FC } from "react"
import Image from "next/image"
import { ALL_PIECES } from "@/constants/chess-board"

interface ComponentProps {
  piece: string
  color: "black" | "white"
}

const Piece: FC<ComponentProps> = ({ piece, color }) => {
  return (
    <div className="w-full h-full">
      <Image
        src={ALL_PIECES[piece][color]}
        alt={piece}
        width={40}
        height={40}
      />
    </div>
  )
}

export default Piece
