import { useMemo } from 'react'
import CardHelper from '../../helpers/CardHelper'
import { useTurn } from '../../helpers/useTurn'
import { Card, GamePlayer } from '../../model'

type PlayerCardProps = {
    player: GamePlayer
    card: Card
    isMyTurn: boolean
    cardHeight: number
}

const PlayerCard = ({ player, card, isMyTurn, cardHeight }: PlayerCardProps) => {
    const { playCard, canPlayCard } = useTurn()

    const imageSrc = useMemo(() => {
        return CardHelper.getCardAsset(card, player.isNPC)
    }, [card])

    const checkCanPlay = (): boolean => {
        if (!isMyTurn) return false
        return canPlayCard(player, card)
    }

    const canPlay = checkCanPlay()

    const onCardClick = () => {
        if (!canPlay) {
            alert('Impossible de jouer cette carte !')
        } else playCard(player, card)
    }

    return (
        <img
            src={imageSrc}
            height={cardHeight}
            style={{ boxShadow: '1px 1px 1px 1px lightgrey' }}
            onClick={onCardClick}
        />
    )
}

export default PlayerCard
