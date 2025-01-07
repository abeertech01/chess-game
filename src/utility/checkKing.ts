import { PieceColor, Square } from "./types"

export const checkIfOppChecked = (squares: Square[], player: PieceColor) => {
  // take all the toMoves of opponent king
  const playerToMoves = squares.flatMap((sq) => {
    if (sq.piece && sq.piece.color === player) return sq.piece.toMoves
  }) as string[]

  // get opponent king's index
  const oppKingIndex = squares.findIndex(
    (sq) => sq.piece && sq.piece.color !== player && sq.piece.name === "king"
  )

  const oppKingToMoves = squares[oppKingIndex].piece!.toMoves
  const blockedMoves = oppKingToMoves.map((move) =>
    playerToMoves.includes(move)
  )

  const isOppKingChecked = playerToMoves.includes(squares[oppKingIndex].id)

  if (isOppKingChecked && blockedMoves.length === 0)
    return { check_mate: true, opp_king_check: true }
  else if (isOppKingChecked && blockedMoves.length > 0)
    return { check_mate: false, opp_king_check: true }
  else return { check_mate: false, opp_king_check: false }
}

export const checkIfPlayerChecked = (squares: Square[], player: PieceColor) => {
  const playerKingIndex = squares.findIndex(
    (sq) => sq.piece && sq.piece.color === player && sq.piece.name === "king"
  )

  const oppPiecesToMoves = squares.flatMap((sq) => {
    if (sq.piece && sq.piece.color !== player) return sq.piece.toMoves
  }) as string[]

  if (oppPiecesToMoves.includes(squares[playerKingIndex].id)) return true
  else return false
}

// // when player moves a piece, check if it removes the check.
// export const ifCheckRemoved = (squares: Square[], player: PieceColor) => {
//   // get player king index
//   const playerKingIndex = squares.findIndex(
//     (sq) => sq.piece && sq.piece.color === player && sq.piece.name === "king"
//   )

//   // get all the toMoves of opponent pieces
//   const oppPiecesToMoves = squares.flatMap((sq) => {
//     if (sq.piece && sq.piece.color !== player) return sq.piece.toMoves
//   }) as string[]

//   // check if any playerKingIndex's square id exists in oppPiecesToMoves
//   if (oppPiecesToMoves.includes(squares[playerKingIndex].id)) return false
//   else return true
// }
