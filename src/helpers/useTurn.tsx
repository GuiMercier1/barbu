import { createContext, ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import { Card, DeckCard, GamePlayer } from '../model'
import useGame from './useGame'

type TurnStatus = 'running' | 'finished'

type TurnContext = {
    deckCards: DeckCard[]
    setDeckCards: React.Dispatch<React.SetStateAction<DeckCard[]>>
    playCard: (player: GamePlayer, card: Card) => void
    finishTurn: () => void
    winningDeckCard: DeckCard | null
    checkIsMyTurn: (gamePlayer: GamePlayer) => boolean
    canPlayCard: (gamePlayer: GamePlayer, card: Card) => boolean
}

const TurnContext = createContext<TurnContext>(null as unknown as TurnContext)

type ProvideTurnProps = {
    children: ReactElement
}

export function ProvideTurn({ children }: ProvideTurnProps) {
    const turnData = useProvideTurn()

    return <TurnContext.Provider value={turnData}>{children}</TurnContext.Provider>
}

export const useTurn = () => {
    return useContext(TurnContext)
}

const useProvideTurn = (): TurnContext => {
    const { withdrawCard, manageEndOfTurn, players } = useGame()

    const [deckCards, setDeckCards] = useState<DeckCard[]>([])

    const playerPosition = useMemo(() => deckCards.length, [deckCards.length])
    const turnStatus: TurnStatus = useMemo(getTurnStatus, [players.length, deckCards.length])

    // Winning deck card is computed at every play
    const winningDeckCard: DeckCard | null = useMemo(getWinningDeckCard, [deckCards])

    function getTurnStatus(): TurnStatus {
        return deckCards.length === players.length ? 'finished' : 'running'
    }

    const playCard = (player: GamePlayer, card: Card) => {
        if (turnStatus === 'finished') return

        setDeckCards((oldDeckCards) => {
            const isFirst = oldDeckCards.length === 0
            const newDeckCard: DeckCard = {
                playedBy: player,
                card,
                first: isFirst,
            }

            return [...oldDeckCards, newDeckCard]
        })

        withdrawCard(player, card)
    }

    // Defines if the player can play this card according to existing deck card
    const canPlayCard = (gameplayer: GamePlayer, card: Card) => {
        if (deckCards.length === 0) return true

        const mainCardColor = deckCards[0].card.color
        const sameColorCards = gameplayer.cards.filter((card) => card.color === mainCardColor)
        const mustPlaySameColor = sameColorCards.length > 0

        if (mustPlaySameColor) return card.color === mainCardColor
        else return true
    }

    const checkIsMyTurn = (player: GamePlayer) => {
        // Every players has played
        if (turnStatus === 'finished') return false
        else return playerPosition === player.position
    }

    function getWinningDeckCard(): DeckCard | null {
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
        if (!winningDeckCard) {
            alert('Impossible de finir le tour maintenant !')
            return
        }

        manageEndOfTurn(winningDeckCard, deckCards)

        setDeckCards([])
    }

    const _ai_playACard = (gamePlayer: GamePlayer) => {
        const playableCards = gamePlayer.cards.filter((card) => {
            return canPlayCard(gamePlayer, card)
        })

        playCard(gamePlayer, playableCards[0])
    }

    useEffect(() => {
        if (turnStatus === 'finished') return

        const currentPlayer = players.find((player) => player.position === playerPosition)

        if (!currentPlayer) {
            console.error(
                'useTurn > useEffecf [playerPosition] Got no current player at position',
                players,
                playerPosition
            )
            throw 'Got no current player at position'
        }

        if (currentPlayer.isNPC) {
            // setTimeout(() => _ai_playACard(currentPlayer), 2000)
        }
    }, [playerPosition])

    return {
        deckCards,
        setDeckCards,
        playCard,
        finishTurn,
        winningDeckCard,
        checkIsMyTurn,
        canPlayCard,
    }
}

export default useGame
