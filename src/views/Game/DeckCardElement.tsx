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

    return (
        <div>
            <span>{deckCard.playedBy.name}</span>
            <Spacer half />
            <div style={{ borderColor, borderStyle: 'solid', padding: 4 }}>
                <span style={{ fontWeight: isWinningDeckCard ? 'bold' : 'unset' }}>{fullLabel}</span>
            </div>
        </div>
    )
}

export default DeckCardElement
