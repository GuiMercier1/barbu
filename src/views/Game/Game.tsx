import { Fragment, useMemo } from 'react'
import Spacer from '../../components/Spacer'
import useGame, { ProvideGame } from '../../helpers/useGame'
import { GamePlayer, GameRuleData, Player } from '../../model'
import Deck from './Deck'
import DeckCardsWonElement from './DeckCardsWonElement'
import PlayerCards from './PlayerCards'

type GameProps = {
    players: Player[]
    dealerID: string
    gameRuleData: GameRuleData
    finishGame: (gamePlayers: GamePlayer[]) => void
}

const Game = ({ players, dealerID, gameRuleData, finishGame }: GameProps) => {
    return (
        <ProvideGame basePlayers={players} dealerID={dealerID} gameRuleData={gameRuleData} finishGame={finishGame}>
            <GameReady />
        </ProvideGame>
    )
}

const GameReady = () => {
    const { players, gameRuleData, gameStatus, finishGame, checkIsMyTurn } = useGame()

    const sortedPlayers = useMemo(() => {
        return players.sort((playerA, playerB) => playerA.globalPosition - playerB.globalPosition)
    }, [players])

    const nextGame = () => {
        finishGame(players)
    }

    return (
        <div>
            <h4>Règle en cours : {gameRuleData.label}</h4>
            <Spacer half />
            {gameStatus === 'finished' && (
                <Fragment>
                    <div style={{ display: 'flex' }}>
                        <h4>Sous-partie terminée !</h4>
                        <Spacer half />
                        <button onClick={nextGame}>Suivante</button>
                    </div>
                    <Spacer half />
                </Fragment>
            )}
            <div style={{ display: 'flex' }}>
                {sortedPlayers.map((player) => {
                    const isMyTurn = checkIsMyTurn(player)
                    return isMyTurn ? (
                        <Fragment key={player.id}>
                            <PlayerCards player={player} />
                            <Spacer />
                        </Fragment>
                    ) : null
                })}
            </div>
            <Spacer />
            <Deck />
            <Spacer />
            <div style={{ display: 'flex' }}>
                {players.map((player) => (
                    <Fragment>
                        <DeckCardsWonElement player={player} />
                        <Spacer half />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default Game
