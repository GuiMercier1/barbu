import { Fragment } from 'react'
import CardHelper from '../../helpers/CardHelper'
import { DeckCard, DeckCardsWon, GamePlayer } from '../../model'

type DeckCardsWonProps = {
    player: GamePlayer
}

const DeckCardsWonElement = ({ player }: DeckCardsWonProps) => {
    return (
        <div>
            {player.deckCardsWon.map((deckCardsWon) => {
                return (
                    <Fragment>
                        <DeckCardsWonCard deckCardsWon={deckCardsWon} />
                        <div style={{ width: '100%', border: '1px solid black' }}></div>
                    </Fragment>
                )
            })}
        </div>
    )
}

type DeckCardsWonCardProps = {
    deckCardsWon: DeckCardsWon
}

const DeckCardsWonCard = ({ deckCardsWon }: DeckCardsWonCardProps) => {
    return (
        <div>
            {deckCardsWon.deckCards.map((deckCard) => {
                return <div>{CardHelper.getCardFullLabel(deckCard.card)}</div>
            })}
        </div>
    )
}

export default DeckCardsWonElement
