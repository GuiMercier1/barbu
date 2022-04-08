import { createContext, ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Card, DeckCard, DeckCardsWon, GamePlayer, GameRuleData, Player } from '../model'
import CardHelper from './CardHelper'

type GameStatus = 'running' | 'finished'

type GameContext = {
    players: GamePlayer[]
    setPlayers: React.Dispatch<React.SetStateAction<GamePlayer[]>>
    playerIndex: number
    setPlayerIndex: React.Dispatch<React.SetStateAction<number>>
    deckCards: DeckCard[]
    setDeckCards: React.Dispatch<React.SetStateAction<DeckCard[]>>
    playCard: (player: GamePlayer, card: Card) => void
    finishTurn: () => void
    winningDeckCard: DeckCard | null
    gameRuleData: GameRuleData
    gameStatus: GameStatus
    finishGame: (gamePlayers: GamePlayer[]) => void
    dealerID: string
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

    const [players, setPlayers] = useState<GamePlayer[]>([])
    const [playerIndex, setPlayerIndex] = useState<number>(0)
    const [deckCards, setDeckCards] = useState<DeckCard[]>([])
    const [turnIndex, setTurnIndex] = useState<number>(0)
    const [gameStatus, setGameStatus] = useState<GameStatus>('running')

    useEffect(() => {
        setPlayers(getPlayers())
    }, [])

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

            console.log('Dealer ID : ', dealerID)
            console.log('Base Player : ', basePlayer)
            console.log('New position : ', newPosition)

            return {
                id: basePlayer.id,
                name: basePlayer.name,
                cards: [],
                deckCardsWon: [],
                gamePoints: 0,
                globalPosition: basePlayer.globalPosition,
                position: newPosition,
            }
        })

        amountOfTurns.current = CardHelper.distributeCards(players)

        return players
    }

    const playCard = (player: GamePlayer, card: Card) => {
        setDeckCards((oldDeckCards) => {
            const isFirst = oldDeckCards.length === 0
            const newDeckCard: DeckCard = {
                playedBy: player,
                card,
                first: isFirst,
            }

            return [...oldDeckCards, newDeckCard]
        })

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

        setNext()
    }

    const setNext = () => {
        setPlayerIndex((oldIndex) => {
            const newIndex = oldIndex + 1
            if (newIndex >= players.length) return 0
            else return newIndex
        })
    }

    const getWinningDeckCard = (): DeckCard | null => {
        if (deckCards.length === 0) return null

        const firstDeckCard = deckCards.find((deckCard) => deckCard.first)

        if (!firstDeckCard) {
            throw 'getWinningDeckCard - No first deck card'
        }

        const mainColor = firstDeckCard.card.color

        const filteredDeckCards = deckCards.filter((deckCard) => deckCard.card.color === mainColor)

        // We reverst sorting
        const sortedDeckCards = filteredDeckCards.sort(
            (deckCardA, deckCardB) => deckCardB.card.value - deckCardA.card.value
        )

        return sortedDeckCards[0]
    }

    const finishTurn = () => {
        const winningDeckCard = getWinningDeckCard()

        if (!winningDeckCard) {
            alert('Impossible de finir le tour maintenant !')
            return
        }

        setPlayers((oldPlayers) => {
            const looser = oldPlayers.find((player) => player.position === winningDeckCard.playedBy.position)

            if (looser === undefined) {
                throw 'Erreur lors du finish turn'
            }

            const otherPlayers = oldPlayers.filter((player) => player.position !== winningDeckCard.playedBy.position)

            const newDeckCardsWon: DeckCardsWon = {
                order: turnIndex,
                deckCards,
                isLast: isLastTurn,
            }

            const newDeckCardsWonList = [...looser.deckCardsWon, newDeckCardsWon]

            const looserGamePoints = gameRuleData.countPoints(newDeckCardsWonList)

            const newLooser = {
                ...looser,
                gamePoints: looserGamePoints,
                deckCardsWon: newDeckCardsWonList,
            }

            return [...otherPlayers, newLooser]
        })

        setTurnIndex((oldIndex) => oldIndex + 1)
        setDeckCards([])
    }

    useEffect(() => {
        if (turnIndex === 0) return

        if (gameRuleData.checkGameFinished(players)) setGameStatus('finished')
    }, [turnIndex])

    const winningDeckCard: DeckCard | null = useMemo(getWinningDeckCard, [deckCards])

    return {
        players,
        setPlayers,
        playerIndex,
        setPlayerIndex,
        deckCards,
        setDeckCards,
        playCard,
        finishTurn,
        winningDeckCard,
        gameRuleData,
        gameStatus,
        finishGame,
        dealerID,
    }
}

export default useGame
