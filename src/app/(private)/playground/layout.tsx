"use client"

import { Card } from "@/components/ui/card"
import { usePlayGroundStore } from "@/store/playGroundStore"
import { FC } from "react"

interface ComponentProps {
  children: React.ReactNode
}

const PlaygroundLayout: FC<ComponentProps> = ({ children }) => {
  const { checkedPlayer, checkMate, isPlayerCheckThreat } = usePlayGroundStore(
    (state) => state.check
  )
  const toMovePlayer = usePlayGroundStore((state) => state.toMovePlayer)
  return (
    <>
      {children}
      <div className="mt-2">
        {checkedPlayer && (
          <Card className="bg-rose-500 text-white px-2 py-1">
            <h3 className="text-lg font-semibold">
              {checkedPlayer} is Checked!!
            </h3>
          </Card>
        )}
        {checkMate && (
          <Card className="bg-rose-500 text-white px-2 py-1">
            <h3 className="text-lg font-semibold">
              {toMovePlayer} got CheckMate!!
            </h3>
          </Card>
        )}
        {isPlayerCheckThreat && (
          <Card className="bg-rose-500 text-white px-2 py-1">
            <h3 className="text-lg font-semibold">
              {toMovePlayer} gets Check Threat!!
            </h3>
          </Card>
        )}
      </div>
    </>
  )
}

export default PlaygroundLayout
