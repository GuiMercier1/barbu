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

    const cardWidth = 100
    const cardHeight = 142
    const cardGap = 20

    return (
        <div>
            <span>
                {player.name} (#{player.position}) {dealerID === player.id ? '(D)' : ''}
            </span>
            {gameStatus === 'running' && (
                <Fragment>
                    <Spacer />
                    <div
                        style={{
                            position: 'relative',
                            width: cardWidth + cardGap * player.cards.length,
                            height: cardHeight,
                        }}>
                        {player.cards.map((card, index) => (
                            <div style={{ position: 'absolute', height: cardHeight, left: cardGap * index }}>
                                <PlayerCard player={player} card={card} isMyTurn={isMyTurn} cardHeight={cardHeight} />
                            </div>
                        ))}
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default PlayerCards
