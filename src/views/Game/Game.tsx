import { Fragment, useMemo } from 'react'
import Spacer from '../../components/Spacer'
import useGame, { ProvideGame } from '../../helpers/useGame'
import { GameRuleData } from '../../model'
import Deck from './Deck'
import PlayerCards from './PlayerCards'

type GameProps = {
    gameRuleData: GameRuleData
    finishGame: () => void
}

const Game = ({ gameRuleData, finishGame }: GameProps) => {
    return (
        <ProvideGame gameRuleData={gameRuleData} finishGame={finishGame}>
            <GameReady />
        </ProvideGame>
    )
}

const GameReady = () => {
    const { players, gameRuleData } = useGame()

    const sortedPlayers = useMemo(() => {
        return players.sort((playerA, playerB) => playerA.position - playerB.position)
    }, [players])

    return (
        <div>
            <h4>Règle en cours : {gameRuleData.label}</h4>
            <div style={{ display: 'flex' }}>
                {sortedPlayers.map((player) => {
                    return (
                        <Fragment key={player.id}>
                            <PlayerCards player={player} />
                            <Spacer />
                        </Fragment>
                    )
                })}
            </div>
            <Spacer />
            <Deck />
        </div>
    )
}

export default Game
