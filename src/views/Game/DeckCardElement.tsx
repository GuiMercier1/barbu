import { useMemo } from 'react'
import Spacer from '../../components/Spacer'
import CardHelper from '../../helpers/CardHelper'
import { useTurn } from '../../helpers/useTurn'
import { DeckCard } from '../../model'

type DeckCardElementProps = {
    deckCard: DeckCard
}

const DeckCardElement = ({ deckCard }: DeckCardElementProps) => {
    const { winningDeckCard } = useTurn()

    const borderColor = CardHelper.getCardCssColor(deckCard.card.color)
    const fullLabel = CardHelper.getCardFullLabel(deckCard.card)

    const isWinningDeckCard = winningDeckCard === null ? false : deckCard.card.id === winningDeckCard.card.id

    const cardAsset = useMemo(() => {
        return CardHelper.getCardAsset(deckCard.card, false)
    }, [deckCard])

    return (
        <div>
            <span>{deckCard.playedBy.name}</span>
            <Spacer half />
            <img src={cardAsset} style={{ height: 142 }} />
        </div>
    )
}

export default DeckCardElement
