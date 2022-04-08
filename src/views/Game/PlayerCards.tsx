import { Fragment } from 'react'
import Spacer from '../../components/Spacer'
import useGame from '../../helpers/useGame'
import { GamePlayer } from '../../model'
import DeckCardsWonElement from './DeckCardsWonElement'
import PlayerCard from './PlayerCard'

type PlayerCardsProps = {
    player: GamePlayer
}

const PlayerCards = ({ player }: PlayerCardsProps) => {
    const { gameStatus } = useGame()

    return (
        <div>
            <span>
                {player.name} (#{player.position})
            </span>
            {gameStatus === 'running' && (
                <Fragment>
                    <Spacer />
                    {player.cards.map((card) => (
                        <Fragment key={card.id}>
                            <PlayerCard player={player} card={card} />
                            <Spacer quarter />
                        </Fragment>
                    ))}
                </Fragment>
            )}
            <Spacer />
            <div>
                <span>Cartes gagnées ({player.gamePoints} points)</span>
                <Spacer half />
                <DeckCardsWonElement player={player} />
            </div>
        </div>
    )
}

export default PlayerCards
