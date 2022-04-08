import { Fragment } from 'react'
import Spacer from '../../components/Spacer'
import CardHelper from '../../helpers/CardHelper'
import { DeckCardsWon, GamePlayer } from '../../model'

type DeckCardsWonProps = {
    player: GamePlayer
}

const DeckCardsWonElement = ({ player }: DeckCardsWonProps) => {
    return (
        <div>
            <span>{player.name}</span>
            <Spacer half />
            <span>Cartes gagnées ({player.gamePoints} points)</span>
            <Spacer half />
            {player.deckCardsWon.map((deckCardsWon, index) => {
                return (
                    <Fragment key={index}>
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
                return <div key={deckCard.card.id}>{CardHelper.getCardFullLabel(deckCard.card)}</div>
            })}
        </div>
    )
}

export default DeckCardsWonElement
