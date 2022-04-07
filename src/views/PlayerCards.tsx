import { Fragment } from 'react'
import Spacer from '../components/Spacer'
import CardHelper from '../helpers/CardHelper'
import { Player } from '../model'
import DeckCardsWon from './DeckCardsWon'
import PlayerCard from './PlayerCard'

type PlayerCardsProps = {
    player: Player
}

const PlayerCards = ({ player }: PlayerCardsProps) => {
    return (
        <div>
            <span>
                {player.name} (#{player.position})
            </span>
            <Spacer />
            {player.cards.map((card) => (
                <Fragment key={card.id}>
                    <PlayerCard player={player} card={card} />
                    <Spacer quarter />
                </Fragment>
            ))}
            <Spacer />
            <div>
                <span>Cartes gagnées :</span>
                <Spacer half />
                <DeckCardsWon player={player} />
            </div>
        </div>
    )
}

export default PlayerCards
