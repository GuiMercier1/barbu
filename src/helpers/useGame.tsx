import { createContext, ReactElement, useContext, useMemo, useState } from 'react'
import { Card, DeckCard, Player } from '../model'

type GameContext = {
    players: Player[]
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
    playerIndex: number
    setPlayerIndex: React.Dispatch<React.SetStateAction<number>>
    deckCards: DeckCard[]
    setDeckCards: React.Dispatch<React.SetStateAction<DeckCard[]>>
    playCard: (player: Player, card: Card) => void
    finishTurn: () => void
    winningDeckCard: DeckCard | null
}

const GameContext = createContext<GameContext>(null as unknown as GameContext)

type ProvideGameProps = {
    children: ReactElement
}

export function ProvideGame({ children }: ProvideGameProps) {
    const gameData = useProvideGame()

    return <GameContext.Provider value={gameData}>{children}</GameContext.Provider>
}

export const useGame = () => {
    return useContext(GameContext)
}

const useProvideGame = (): GameContext => {
    const [players, setPlayers] = useState<Player[]>([])
    const [playerIndex, setPlayerIndex] = useState<number>(0)
    const [deckCards, setDeckCards] = useState<DeckCard[]>([])

    const playCard = (player: Player, card: Card) => {
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

            return [
                ...otherPlayers,
                {
                    ...looser,
                    deckCardsWon: [...looser.deckCardsWon, [...deckCards]],
                },
            ]
        })

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
    }
}

export default useGame
