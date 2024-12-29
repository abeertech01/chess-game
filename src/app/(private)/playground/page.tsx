"use client"

import { FC, useEffect } from "react"
import Square from "@/app/(private)/playground/components/Square"
import { usePlayGroundStore } from "@/store/playGroundStore"
import { generatePieces, generateSquares } from "@/utility/helpers"

interface ComponentProps {}

const PlayGround: FC<ComponentProps> = () => {
  const setSquaresAndRows = usePlayGroundStore(
    (state) => state.setSquaresAndRows
  )
  const setAllThePieces = usePlayGroundStore((state) => state.setAllThePieces)
  const rows = usePlayGroundStore((state) => state.rows)

  useEffect(() => {
    const squaresAndRows = generateSquares()
    const allThePieces = generatePieces()

    console.log("allThePieces: ", allThePieces)

    setSquaresAndRows(squaresAndRows)
    setAllThePieces(allThePieces)
  }, [])

  return (
    <div className="playground">
      {rows.length > 0 &&
        rows.map(({ squares }, i) => (
          <div className="row flex" key={i}>
            {squares.map((square, j) => (
              <Square key={j} squareObj={square} i={i} j={j} />
            ))}
          </div>
        ))}
    </div>
  )
}

export default PlayGround
