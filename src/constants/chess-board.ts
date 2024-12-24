import rook_black from "@/assets/pieces/rook-black.png"
import rook_white from "@/assets/pieces/rook-white.png"
import knight_black from "@/assets/pieces/knight-black.png"
import knight_white from "@/assets/pieces/knight-white.png"
import bishop_black from "@/assets/pieces/bishop-black.png"
import bishop_white from "@/assets/pieces/bishop-white.png"
import queen_black from "@/assets/pieces/queen-black.png"
import queen_white from "@/assets/pieces/queen-white.png"
import king_black from "@/assets/pieces/king-black.png"
import king_white from "@/assets/pieces/king-white.png"
import pawn_black from "@/assets/pieces/pawn-black.png"
import pawn_white from "@/assets/pieces/pawn-white.png"

export const ALL_PIECES: { [key: string]: any } = {
  rook: {
    black: rook_black,
    white: rook_white,
  },
  knight: {
    black: knight_black,
    white: knight_white,
  },
  bishop: {
    black: bishop_black,
    white: bishop_white,
  },
  queen: {
    black: queen_black,
    white: queen_white,
  },
  king: {
    black: king_black,
    white: king_white,
  },
  pawn: {
    black: pawn_black,
    white: pawn_white,
  },
}

export const ROW = ["a", "b", "c", "d", "e", "f", "g", "h"]
export const ROW_NUMBERS = 8
