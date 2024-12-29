import { Piece, Square, ToMove } from "@/utility/types"
import { create } from "zustand"

type AllThePieces = {
  white: Piece[]
  black: Piece[]
}

type PlayGroundStore = {
  squares: Square[]
  allThePieces: AllThePieces
  toMove: ToMove
  selectASquare: (squareId: string) => void
  setAllThePieces: (thePieces: AllThePieces) => void
  setSquares: (squares: Square[]) => void
}

export const usePlayGroundStore = create<PlayGroundStore>((set) => ({
  squares: [],
  allThePieces: {} as AllThePieces,
  toMove: "white",
  selectASquare: (squareId) =>
    set((state) => {
      const updatedSquares = state.squares.map((sq) => {
        if (sq.id === squareId) {
          return { ...sq, isSelected: !sq.isSelected }
        }
        return sq
      })

      return { squares: updatedSquares }
    }),
  setAllThePieces: (thePieces) => set({ allThePieces: thePieces }),
  setSquares: (squares) => set({ squares }),
}))

/**
 * TODO: PLANNING WHAT TO DO...
 * => make an array of squares in the zustand
 * => make 2 arrays of pieces in the zustand state as well.
 * => if the user is signed in, the first reload will load all the squares and pieces sequantially in the array of squares for both players.
 * --> if the user is not signed in, the load will happen right after the user signs in.
 * --> in this load all the squares will be empty.
 * => The moment user navigates to the board, the board will have its initial setup.
 * => The positions will be saved in db and cached as well.
 *
 * TODO: HOW TO PROCEED...
 * => write an article on making slices and persist data in the local storage.
 */
