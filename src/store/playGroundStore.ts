import { selectDeselectSquares } from "@/utility/helpers"
import { Square } from "@/utility/types"
import { create } from "zustand"

type PlayGroundStore = {
  squares: Square[]
  totalMoves: number
  incrementMoves: () => void
  selectASquare: (squareId: string) => void
  setSquares: (squares: Square[]) => void
}

export const usePlayGroundStore = create<PlayGroundStore>((set) => ({
  squares: [],
  totalMoves: 0,
  incrementMoves: () => set((state) => ({ totalMoves: state.totalMoves + 1 })),
  selectASquare: (squareId) =>
    set((state) => {
      const updatedSquares = selectDeselectSquares(state.squares, squareId)

      return { squares: updatedSquares }
    }),
  setSquares: (squares) => set({ squares }),
}))
