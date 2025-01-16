"use client"

import { usePlayGroundStore } from "@/store/playGroundStore"
import { Row, Square as SquareObj } from "@/utility/types"
import { FC, useEffect, useState } from "react"
import Square from "./components/Square"

interface ComponentProps {}

const Playground: FC<ComponentProps> = () => {
  const [rows, setRows] = useState<Row[]>([])
  const totalMoves = usePlayGroundStore((state) => state.totalMoves)
  const squares = usePlayGroundStore((state) => state.squares)
  const setSquares = usePlayGroundStore((state) => state.setSquares)

  useEffect(() => {
    if (totalMoves === 0) {
      setSquares()
    }
  }, [])

  useEffect(() => {
    if (squares && squares.length === 64 && rows.length !== 8) {
      getRowsSet(squares)
    }

    if (squares && squares.length === 64 && rows.length === 8) {
      getRowsSet(squares)
    }
  }, [squares])

  const toggleSelectedSquare = () => {
    getRowsSet(squares)
  }

  const getRowsSet = (sqs: SquareObj[]) => {
    let arrangedRows: Row[] = []

    if (sqs && sqs.length === 64) {
      Array.from({ length: 8 }).forEach((_, i) => {
        const row: SquareObj[] = sqs.slice(i * 8, (i + 1) * 8)
        arrangedRows.push({
          no: i + 1,
          squares: row,
        })
      })
    }

    arrangedRows = arrangedRows.reverse()
    setRows(arrangedRows)
  }

  return (
    <div className="playground">
      {rows.length > 0 &&
        rows.map(({ squares: sqs }, i) => (
          <div className="row flex" key={i}>
            {sqs.map((sq: SquareObj, j: number) => (
              <Square
                key={j}
                squareObj={sq}
                i={i}
                j={j}
                toggleSelectedSquare={toggleSelectedSquare}
              />
            ))}
          </div>
        ))}
    </div>
  )
}

export default Playground
