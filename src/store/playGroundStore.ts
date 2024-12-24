import { Piece, Row, Square } from "@/utility/types"
import { create } from "zustand"

type SetSquaresAndRows = {
  squares: Square[]
  rows: Row[]
}

type AllThePieces = {
  white: Piece[]
  black: Piece[]
}

type PlayGroundStore = {
  squares: Square[]
  rows: Row[]
  allThePieces: AllThePieces
  setAllThePieces: (thePieces: AllThePieces) => void
  setSquaresAndRows: ({ squares, rows }: SetSquaresAndRows) => void
}

export const usePlayGroundStore = create<PlayGroundStore>((set) => ({
  squares: [],
  rows: [],
  allThePieces: {} as AllThePieces,
  setAllThePieces: (thePieces) => set({ allThePieces: thePieces }),
  setSquaresAndRows: ({ squares, rows }) => set({ squares, rows }),
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
