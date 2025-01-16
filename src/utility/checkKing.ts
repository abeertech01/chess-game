import { getSquareMoves } from "./helpers"
import { PieceColor, Square } from "./types"

export const checkIfPlayerChecked = (squares: Square[], player: PieceColor) => {
  const playerKingIndex = squares.findIndex(
    (sq) => sq.piece && sq.piece.color === player && sq.piece.name === "king"
  )

  const oppPiecesToMoves = squares.flatMap((sq) => {
    if (sq.piece && sq.piece.color !== player) return sq.piece.toMoves
  }) as string[]

  // let recoverableMove = false
  // for (let i = 0; i < squares.length; i++) {
  //   if (
  //     squares[i].piece?.color !== player &&
  //     squares[i].piece?.toMoves.includes(squares[playerKingIndex].id)
  //   ) {
  //     const checkedPlayersNewlyToMoves = getSquareMoves(squares[i].id, squares)

  //     if (
  //       checkedPlayersNewlyToMoves?.allToMoves.includes(
  //         squares[playerKingIndex].id
  //       )
  //     ) {
  //       recoverableMove = true
  //       break
  //     }
  //   }
  // }

  if (oppPiecesToMoves.includes(squares[playerKingIndex].id)) return true
  else return false
}

const getPlayersCheckingPcSqs = (
  squares: Square[],
  player: PieceColor,
  oppKingIndex: number
) =>
  squares.filter((sq) => {
    if (
      sq.piece &&
      sq.piece.color === player &&
      sq.piece.toMoves.includes(squares[oppKingIndex].id)
    )
      return sq
  })

export const checkIfOppChecked = (squares: Square[], player: PieceColor) => {
  const oppKingIndex = squares.findIndex(
    (sq) => sq.piece && sq.piece.color !== player && sq.piece.name === "king"
  )

  const playersCheckingPcs = getPlayersCheckingPcSqs(
    squares,
    player,
    oppKingIndex
  )

  if (playersCheckingPcs.length > 0) {
    const playersCheckingPcsToMoves = playersCheckingPcs.flatMap(
      (sq) => sq && sq.piece && sq.piece.toMoves
    ) as string[]

    const oppKingToMoves = squares[oppKingIndex].piece!.toMoves
    if (oppKingToMoves?.length > 0) {
      const safeMoves4Opp = oppKingToMoves.filter(
        (move) => !playersCheckingPcsToMoves.includes(move)
      )

      if (safeMoves4Opp.length > 0)
        return { check_mate: false, opp_king_check: true }
    }

    let possibleRecPcSqs: Square[] = []
    let allCommonMoves: string[] = []
    squares.forEach((sq) => {
      if (sq.piece && sq.piece.color !== player && sq.piece.name !== "king") {
        // playersCheckingPcs.map((chSq) => {})

        const commonMoves = sq.piece.toMoves.filter((move) =>
          playersCheckingPcsToMoves.includes(move)
        )

        if (commonMoves.length > 0) possibleRecPcSqs.push(sq)

        allCommonMoves = [...new Set([...allCommonMoves, ...commonMoves])]
      }
    })

    let checkMateRecovery = false
    for (let i = 0; i < possibleRecPcSqs.length; i++) {
      const movingMoves = allCommonMoves.filter(
        (cMove) =>
          possibleRecPcSqs[i].piece &&
          possibleRecPcSqs[i].piece?.toMoves.includes(cMove)
      )

      const tempSquares = structuredClone(squares)
      const recoversCheck = movingMoves.some((mMove) => {
        const movingIndex = tempSquares.findIndex((ts) => ts.id === mMove)
        const fromIndex = tempSquares.findIndex(
          (ts) => ts.id === possibleRecPcSqs[i].id
        )

        tempSquares[movingIndex].piece = possibleRecPcSqs[i].piece
        tempSquares[fromIndex].piece = null

        const tPlayersCheckingPcSqs = tempSquares.filter((tsq) => {
          tsq.piece?.toMoves.includes(mMove)
        })

        let stillCheckingPcSqs = []
        tPlayersCheckingPcSqs.forEach((tChSq) => {
          const newMoves = getSquareMoves(tChSq.id, tempSquares)

          if (newMoves?.allToMoves.includes(tempSquares[oppKingIndex].id))
            stillCheckingPcSqs.push(tChSq)
        })

        if (stillCheckingPcSqs.length === 0) return true
      })

      if (recoversCheck) {
        checkMateRecovery = true
        break
      }
    }

    if (checkMateRecovery) {
      return { check_mate: false, opp_king_check: true }
    } else {
      return { check_mate: true, opp_king_check: true }
    }
  } else {
    return { check_mate: false, opp_king_check: false }
  }
}
