import { Fragment } from 'react'
import Spacer from '../../components/Spacer'
import CardHelper from '../../helpers/CardHelper'
import useGame from '../../helpers/useGame'
import { useTurn } from '../../helpers/useTurn'
import { Card, DeckCard, GamePlayer } from '../../model'
import DeckCardElement from './DeckCardElement'

const Deck = () => {
    const { players } = useGame()

    const { deckCards, finishTurn } = useTurn()

    const getPlayerCard = (player: GamePlayer): DeckCard | undefined => {
        return deckCards.find((deckCard) => deckCard.playedBy.id === player.id)
    }

    return (
        <Fragment>
            <div style={{ display: 'flex' }}>
                {players.map((player) => {
                    const deckCard = getPlayerCard(player)

                    return (
                        <Fragment>
                            <DeckCardElement player={player} deckCard={deckCard} />
                            <Spacer />
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
