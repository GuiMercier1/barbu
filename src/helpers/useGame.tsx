import { createContext, ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Card, DeckCard, DeckCardsWon, GamePlayer, GameRuleData, Player } from '../model'
import CardHelper from './CardHelper'

type GameStatus = 'running' | 'finished'

type GameContext = {
    players: GamePlayer[]
    setPlayers: React.Dispatch<React.SetStateAction<GamePlayer[]>>
    gameRuleData: GameRuleData
    gameStatus: GameStatus
    finishGame: (gamePlayers: GamePlayer[]) => void
    dealerID: string
    withdrawCard: (player: GamePlayer, card: Card) => void
    manageEndOfTurn: (winningDeckCard: DeckCard, deckCards: DeckCard[]) => void
    turnIndex: number
}

const GameContext = createContext<GameContext>(null as unknown as GameContext)

type ProvideGameProps = {
    basePlayers: Player[]
    dealerID: string
    finishGame: (gamePlayers: GamePlayer[]) => void
    gameRuleData: GameRuleData
    children: ReactElement
}

export function ProvideGame({ basePlayers, dealerID, finishGame, gameRuleData, children }: ProvideGameProps) {
    const gameData = useProvideGame({ basePlayers, dealerID, finishGame, gameRuleData })

    return <GameContext.Provider value={gameData}>{children}</GameContext.Provider>
}

export const useGame = () => {
    return useContext(GameContext)
}

type UseProvideGameProps = {
    basePlayers: Player[]
    dealerID: string
    finishGame: (gamePlayers: GamePlayer[]) => void
    gameRuleData: GameRuleData
}

const useProvideGame = ({ basePlayers, dealerID, gameRuleData, finishGame }: UseProvideGameProps): GameContext => {
    const amountOfTurns = useRef<number>(0)

    const [players, setPlayers] = useState<GamePlayer[]>(getPlayers())
    const [turnIndex, setTurnIndex] = useState<number>(0)

    const gameStatus: GameStatus = useMemo(() => {
        if (turnIndex === 0) return 'running'

        if (gameRuleData.checkGameFinished(players)) return 'finished'
        else return 'running'
    }, [turnIndex])

    const isLastTurn = turnIndex + 1 === amountOfTurns.current

    function getPlayers(): GamePlayer[] {
        const firstPlayerToPlay = basePlayers.find((basePlayer) => basePlayer.id === dealerID)

        if (!firstPlayerToPlay) {
            console.error('useProvideGame > getFirstPositionToPlay : No player found for id : ', dealerID, basePlayers)
            throw 'useProvideGame > getFirstPositionToPlay : No player found'
        }

        const players: GamePlayer[] = basePlayers.map((basePlayer) => {
            const newPosition =
                (basePlayer.globalPosition + (basePlayers.length - firstPlayerToPlay.globalPosition)) %
                basePlayers.length

            return {
                id: basePlayer.id,
                name: basePlayer.name,
                cards: [],
                deckCardsWon: [],
                gamePoints: 0,
                globalPosition: basePlayer.globalPosition,
                position: newPosition,
                isNPC: basePlayer.isNPC,
            }
        })

        amountOfTurns.current = CardHelper.distributeCards(players)

        return players
    }

    const withdrawCard = (player: GamePlayer, card: Card) => {
        setPlayers((oldPlayers) => {
            const currentPlayer = oldPlayers.find((oldPlayer) => oldPlayer.id === player.id)

            if (!currentPlayer) {
                throw 'Current player not found !'
            }

            const otherPlayers = oldPlayers.filter((oldPlayer) => oldPlayer.id !== player.id)

            return [
                ...otherPlayers,
                {
                    ...currentPlayer,
                    cards: currentPlayer.cards.filter((oldCard) => oldCard.id !== card.id),
                },
            ]
        })
    }

    const manageEndOfTurn = (winningDeckCard: DeckCard, deckCards: DeckCard[]) => {
        setPlayers((oldPlayers) => {
            const winner = oldPlayers.find((player) => player.position === winningDeckCard.playedBy.position)

            if (winner === undefined) {
                throw 'Erreur lors du finish turn'
            }

            const otherPlayers = oldPlayers.filter((player) => player.position !== winningDeckCard.playedBy.position)

            const newDeckCardsWon: DeckCardsWon = {
                order: turnIndex,
                deckCards,
                isLast: isLastTurn,
            }

            const newDeckCardsWonList = [...winner.deckCardsWon, newDeckCardsWon]

            const winnerGamePoints = gameRuleData.countPoints(newDeckCardsWonList)

            const newWinnerData = {
                ...winner,
                gamePoints: winnerGamePoints,
                deckCardsWon: newDeckCardsWonList,
            }

            const newPlayers = [...otherPlayers, newWinnerData]

            return newPlayers.map((player) => {
                const newPosition =
                    (player.globalPosition + (basePlayers.length - winner.globalPosition)) % basePlayers.length

                return {
                    ...player,
                    position: newPosition,
                }
            })
        })

        setTurnIndex((oldIndex) => oldIndex + 1)
    }

    return {
        players,
        setPlayers,
        gameRuleData,
        gameStatus,
        finishGame,
        dealerID,
        withdrawCard,
        manageEndOfTurn,
        turnIndex,
    }
}

export default useGame
