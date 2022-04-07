import CardHelper from '../helpers/CardHelper'
import useGame from '../helpers/useGame'
import { DeckCard } from '../model'

type DeckCardElementProps = {
    deckCard: DeckCard
}

const DeckCardElement = ({ deckCard }: DeckCardElementProps) => {
    const { winningDeckCard } = useGame()

    const borderColor = CardHelper.getCardCssColor(deckCard.card.color)
    const fullLabel = CardHelper.getCardFullLabel(deckCard.card)

    const isWinningDeckCard = winningDeckCard === null ? false : deckCard.card.id === winningDeckCard.card.id

    return (
        <div style={{ borderColor, borderStyle: 'solid', padding: 4 }}>
            <span style={{ fontWeight: isWinningDeckCard ? 'bold' : 'unset' }}>{fullLabel}</span>
        </div>
    )
}

export default DeckCardElement
