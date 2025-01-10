export interface User {
  name: string
  username: string
  email: string
  profileImage: File
  password?: string
  confirmPassword?: string
}

export type PieceColor = "white" | "black"

export interface Square {
  id: string
  piece: Piece | null
  isSelected: boolean
  isToMove: boolean
}

export interface Row {
  no: number
  squares: Square[]
}

export interface Piece {
  name: string
  number: number
  color: PieceColor
  default_square: string
  toMoves: string[]
  range_moves: string[]
}

// export interface KingRelatedSquares {
//   white: {
//     king_moves: string[]
//     king_square: Square
//     king_checked: boolean
//   }
//   black: {
//     king_moves: string[]
//     king_square: Square
//     king_checked: boolean
//   }
// }
