// import { usePlayGroundStore } from "@/store/playGroundStore"
// import { getSquareMoves } from "./helpers"
// import { KingRelatedSquares, PieceColor, Square } from "./types"

// const getKingRelatedSquares = () => {
//   return usePlayGroundStore.getState().kingRelatedSquares
// }

// const checkingKingMoves = (
//   squares: Square[],
//   movingSquareIndex: number
// ): KingRelatedSquares | null => {
//   // get moves from the moving square
//   const movingSqMoves: string[] = getSquareMoves(squares[movingSquareIndex])
//   const kingRelatedSquares = getKingRelatedSquares()

//   // For Player

//   // For Opponent
//   const opponnentKingColor: PieceColor =
//     squares[movingSquareIndex].piece?.color === "white" ? "black" : "white"
//   const oppKingSqMoves = kingRelatedSquares[opponnentKingColor].king_moves

//   const oppKingRestMoves = oppKingSqMoves.filter(
//     (move) => !movingSqMoves.includes(move)
//   )

//   const isOppKingChecked = movingSqMoves.some(
//     (move) => move === kingRelatedSquares[opponnentKingColor].king_square.id
//   )
//   if (isOppKingChecked)
//     kingRelatedSquares[opponnentKingColor].king_checked = true

//   if (oppKingRestMoves.length !== 0) {
//     kingRelatedSquares[opponnentKingColor].king_moves = oppKingRestMoves
//     return kingRelatedSquares
//   } else {
//     return null
//   }
// }

// export { checkingKingMoves }
