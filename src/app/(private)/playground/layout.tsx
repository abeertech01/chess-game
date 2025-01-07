"use client"

import { Card } from "@/components/ui/card"
import { usePlayGroundStore } from "@/store/playGroundStore"
import { FC } from "react"

interface ComponentProps {
  children?: React.ReactNode
}

const PlaygroundLayout: FC<ComponentProps> = ({ children }) => {
  const { checkMate, checkedPlayer, isCheckThreat } = usePlayGroundStore(
    (state) => state.check
  )

  return (
    <>
      {children}
      {/* checkMate && checkedPlayer */}
      {checkMate && checkedPlayer && (
        <>
          <Card className="mt-4 inline-block p-3 bg-rose-500">
            <h1 className="text-2xl text-center text-white">Check Mate</h1>
          </Card>
          <Card className="mt-4 inline-block p-3 bg-emerald-500">
            <h1 className="text-2xl text-center text-white">
              Winner: {checkedPlayer}
            </h1>
          </Card>
        </>
      )}

      {/* !checkMate && checkedPlayer */}
      {!checkMate && checkedPlayer && (
        <Card className="mt-4 inline-block p-3 bg-rose-500">
          <h1 className="text-2xl text-center text-white">
            {checkedPlayer} Checked!!!
          </h1>
        </Card>
      )}

      {/* !checkMate && checkedPlayer */}
      {isCheckThreat && (
        <Card className="mt-4 inline-block p-3 bg-rose-500">
          <h1 className="text-2xl text-center text-white">
            {checkedPlayer} in Check Threat!!!
          </h1>
        </Card>
      )}
    </>
  )
}

export default PlaygroundLayout
