import { createContext, ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Card, DeckCard, DeckCardsWon, GamePlayer, GameRuleData } from '../model'
import CardHelper from './CardHelper'

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
}

const GameContext = createContext<GameContext>(null as unknown as GameContext)

type ProvideGameProps = {
    finishGame: () => void
    gameRuleData: GameRuleData
    children: ReactElement
}

export function ProvideGame({ finishGame, gameRuleData, children }: ProvideGameProps) {
    const gameData = useProvideGame({ finishGame, gameRuleData })

    return <GameContext.Provider value={gameData}>{children}</GameContext.Provider>
}

export const useGame = () => {
    return useContext(GameContext)
}

type UseProvideGameProps = {
    finishGame: () => void
    gameRuleData: GameRuleData
}

const useProvideGame = ({ gameRuleData, finishGame }: UseProvideGameProps): GameContext => {
    const [players, setPlayers] = useState<GamePlayer[]>([])
    const [playerIndex, setPlayerIndex] = useState<number>(0)
    const [deckCards, setDeckCards] = useState<DeckCard[]>([])
    const [turnIndex, setTurnIndex] = useState<number>(0)

    const amountOfTurns = useRef<number>(0)
    const isLastTurn = turnIndex + 1 === amountOfTurns.current

    useEffect(() => {
        const newPlayers = getPlayers()
        setPlayers(newPlayers)
    }, [])

    const getPlayers = () => {
        const players: GamePlayer[] = [
            {
                position: 0,
                name: 'Joueur 1',
                cards: [],
                deckCardsWon: [],
                id: 'player_1',
                gamePoints: 0,
            },
            {
                position: 1,
                name: 'Joueur 2',
                cards: [],
                deckCardsWon: [],
                id: 'player_2',
                gamePoints: 0,
            },
            {
                position: 2,
                name: 'Joueur 3',
                cards: [],
                deckCardsWon: [],
                id: 'player_3',
                gamePoints: 0,
            },
            {
                position: 3,
                name: 'Joueur 4',
                cards: [],
                deckCardsWon: [],
                id: 'player_4',
                gamePoints: 0,
            },
        ]

        amountOfTurns.current = CardHelper.distributeCards(players)

        console.log('Players with cards : ', players)

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

            console.log('Looser game points : ', looserGamePoints)

            return [...otherPlayers, newLooser]
        })

        setTurnIndex((oldIndex) => oldIndex + 1)
        setDeckCards([])
    }

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
    }
}

export default useGame
