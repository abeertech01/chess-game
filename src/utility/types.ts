export interface User {
  name: string
  username: string
  email: string
  profileImage: File
  password?: string
  confirmPassword?: string
}

export type PieceColor = "white" | "black"

export type ToMove = "white" | "black"

export interface Square {
  id: string
  piece: string | null
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
  default_square: string | undefined
}
