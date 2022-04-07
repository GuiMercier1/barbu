import { useMemo } from 'react'
import CardHelper from '../helpers/CardHelper'
import useGame from '../helpers/useGame'
import { Card, Player } from '../model'

type PlayerCardProps = {
    player: Player
    card: Card
}

const PlayerCard = ({ player, card }: PlayerCardProps) => {
    const { playCard, players, playerIndex, deckCards } = useGame()

    const borderColor = CardHelper.getCardCssColor(card.color)
    const fullLabel = CardHelper.getCardFullLabel(card)

    const checkCanPlay = (): boolean => {
        if (deckCards.length === players.length) return false
        if (!(playerIndex === player.position)) return false
        if (deckCards.length === 0) return true

        const mainCardColor = deckCards[0].card.color
        const sameColorCards = player.cards.filter((card) => card.color === mainCardColor)
        const mustPlaySameColor = sameColorCards.length > 0

        if (mustPlaySameColor) return card.color === mainCardColor
        else return true
    }

    const canPlay = checkCanPlay()

    return (
        <div>
            <button style={{ borderColor }} onClick={() => playCard(player, card)} disabled={!canPlay}>
                {fullLabel}
            </button>
        </div>
    )
}

export default PlayerCard
