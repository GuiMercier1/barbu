import { Fragment } from 'react'
import Spacer from '../../components/Spacer'
import useGame from '../../helpers/useGame'
import { useTurn } from '../../helpers/useTurn'
import { GamePlayer } from '../../model'
import PlayerCard from './PlayerCard'

type PlayerCardsProps = {
    player: GamePlayer
}

const PlayerCards = ({ player }: PlayerCardsProps) => {
    const { gameStatus, dealerID } = useGame()
    const { checkIsMyTurn } = useTurn()

    const isMyTurn = checkIsMyTurn(player)

    return (
        <div>
            <span>
                {player.name} (#{player.position}) {dealerID === player.id ? '(D)' : ''}
            </span>
            {gameStatus === 'running' && (
                <Fragment>
                    <Spacer />
                    {player.cards.map((card) => (
                        <Fragment key={card.id}>
                            <PlayerCard player={player} card={card} isMyTurn={isMyTurn} />
                            <Spacer quarter />
                        </Fragment>
                    ))}
                </Fragment>
            )}
        </div>
    )
}

export default PlayerCards
