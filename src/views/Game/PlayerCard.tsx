import CardHelper from '../../helpers/CardHelper'
import useGame from '../../helpers/useGame'
import { useTurn } from '../../helpers/useTurn'
import { Card, GamePlayer } from '../../model'

type PlayerCardProps = {
    player: GamePlayer
    card: Card
    isMyTurn: boolean
}

const PlayerCard = ({ player, card, isMyTurn }: PlayerCardProps) => {
    const { playCard, canPlayCard } = useTurn()

    const borderColor = CardHelper.getCardCssColor(card.color)
    const fullLabel = CardHelper.getCardFullLabel(card)

    const checkCanPlay = (): boolean => {
        if (!isMyTurn) return false
        return canPlayCard(player, card)
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
