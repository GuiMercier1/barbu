import { useMemo } from 'react'
import Spacer from '../../components/Spacer'
import CardHelper from '../../helpers/CardHelper'
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
                    width: CardHelper.sizes.width * 1,
                    height: CardHelper.sizes.height * 1,
                    border: isWinningDeckCard ? '3px solid black' : '1px dashed black',
                }}>
                {deckCard && <img src={cardAsset} style={{ height: CardHelper.sizes.height }} />}
            </div>
        </div>
    )
}

export default DeckCardElement
