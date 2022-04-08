import CardHelper from '../../helpers/CardHelper'
import useGame from '../../helpers/useGame'
import { Card, GamePlayer } from '../../model'

type PlayerCardProps = {
    player: GamePlayer
    card: Card
    isMyTurn: boolean
}

const PlayerCard = ({ player, card, isMyTurn }: PlayerCardProps) => {
    const { playCard, deckCards } = useGame()

    const borderColor = CardHelper.getCardCssColor(card.color)
    const fullLabel = CardHelper.getCardFullLabel(card)

    const checkCanPlay = (): boolean => {
        if (!isMyTurn) return false
        // If it is my turn and no card played
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
