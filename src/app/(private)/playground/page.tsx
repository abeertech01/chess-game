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
        rows.map(({ squares, no }, i) => (
          <div className="row flex" key={no}>
            {squares.map((square, j) => (
              <div
                className={`square w-[5rem] h-[5rem] text-black flex justify-center items-center ${
                  (i + j) % 2 === 0 ? "bg-[#ffffff]" : "bg-emerald-700"
                }`}
                key={j}
              >
                <Square key={j} squareObj={square} />
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}

export default PlayGround
