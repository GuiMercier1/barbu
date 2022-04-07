import { Fragment } from 'react'
import CardHelper from '../../helpers/CardHelper'
import { DeckCard, GamePlayer } from '../../model'

type DeckCardsWonProps = {
    player: GamePlayer
}

const DeckCardsWon = ({ player }: DeckCardsWonProps) => {
    return (
        <div>
            {player.deckCardsWon.map((deckCards) => {
                return (
                    <Fragment>
                        <DeckCardsWonElement deckCards={deckCards} />
                        <div style={{ width: '100%', border: '1px solid black' }}></div>
                    </Fragment>
                )
            })}
        </div>
    )
}

type DeckCardsWonElementProps = {
    deckCards: DeckCard[]
}

const DeckCardsWonElement = ({ deckCards }: DeckCardsWonElementProps) => {
    return (
        <div>
            {deckCards.map((deckCard) => {
                return <div>{CardHelper.getCardFullLabel(deckCard.card)}</div>
            })}
        </div>
    )
}

export default DeckCardsWon
