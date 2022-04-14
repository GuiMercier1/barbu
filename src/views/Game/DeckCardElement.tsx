import { useMemo } from 'react'
import Spacer from '../../components/Spacer'
import CardHelper from '../../helpers/CardHelper'
import StyleHelper from '../../helpers/StyleHelper'
import { useTurn } from '../../helpers/useTurn'
import { DeckCard, GamePlayer } from '../../model'

type DeckCardElementProps = {
    player: GamePlayer
    deckCard: DeckCard | undefined
}

const DeckCardElement = ({ player, deckCard }: DeckCardElementProps) => {
    const { winningDeckCard } = useTurn()

    const isWinningDeckCard =
        deckCard === undefined || winningDeckCard === null ? false : deckCard.card.id === winningDeckCard.card.id

    const cardAsset = useMemo(() => {
        if (!deckCard) return ''

        return CardHelper.getCardAsset(deckCard.card, false)
    }, [deckCard])

    return (
        <div>
            <span>{player.name}</span>
            <Spacer half />
            <div
                style={{
                    width: StyleHelper.sizes.cardWidth * 1,
                    height: StyleHelper.sizes.cardHeight * 1,
                    border: isWinningDeckCard ? '3px solid black' : '1px dashed black',
                }}>
                {deckCard && <img src={cardAsset} style={{ height: StyleHelper.sizes.cardHeight }} />}
            </div>
        </div>
    )
}

export default DeckCardElement
