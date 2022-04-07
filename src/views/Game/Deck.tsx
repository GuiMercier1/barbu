import { Fragment } from 'react'
import Spacer from '../../components/Spacer'
import useGame from '../../helpers/useGame'
import DeckCardElement from './DeckCardElement'

const Deck = () => {
    const { deckCards, players, finishTurn } = useGame()

    return (
        <Fragment>
            <div style={{ display: 'flex' }}>
                {deckCards.map((deckCard) => {
                    return (
                        <Fragment key={deckCard.card.id}>
                            <DeckCardElement deckCard={deckCard} />
                            <Spacer half />
                        </Fragment>
                    )
                })}
            </div>
            {deckCards.length === players.length && (
                <Fragment>
                    <Spacer />
                    <button onClick={finishTurn}>OK !</button>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Deck
