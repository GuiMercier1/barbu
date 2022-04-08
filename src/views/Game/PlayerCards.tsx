import { Fragment } from 'react'
import Spacer from '../../components/Spacer'
import { GamePlayer } from '../../model'
import DeckCardsWonElement from './DeckCardsWonElement'
import PlayerCard from './PlayerCard'

type PlayerCardsProps = {
    player: GamePlayer
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
                <DeckCardsWonElement player={player} />
            </div>
        </div>
    )
}

export default PlayerCards
