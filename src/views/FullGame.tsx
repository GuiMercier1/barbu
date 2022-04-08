import { useState } from 'react'
import Spacer from '../components/Spacer'
import GameHelper from '../helpers/GameHelper'
import useSpacing from '../helpers/useSpacing'
import { GamePlayer, Player } from '../model'
import Game from './Game/Game'

const FullGame = () => {
    const spacing = useSpacing()

    const basePlayers: Player[] = [
        {
            id: 'player_1',
            name: 'Joueur 1',
            games: [],
        },
        {
            id: 'player_2',
            name: 'Joueur 2',
            games: [],
        },
        {
            id: 'player_3',
            name: 'Joueur 3',
            games: [],
        },
        {
            id: 'player_4',
            name: 'Joueur 4',
            games: [],
        },
    ]

    const [players, setPlayers] = useState<Player[]>(basePlayers)
    const [status, setStatus] = useState<'running' | 'finished'>('running')
    const [ruleIndex, setRuleIndex] = useState<number>(0)

    const currentGame = GameHelper.allGamesRules[ruleIndex]

    const finishGame = (gamePlayers: GamePlayer[]) => {
        setPlayers((oldPlayers) => {
            const newPlayers = [...oldPlayers].map((player) => {
                const gamePlayer = gamePlayers.find((gamePlayer) => gamePlayer.id === player.id)

                if (!gamePlayer) {
                    throw 'Player not found !'
                }

                return {
                    ...player,
                    games: [
                        ...player.games,
                        {
                            gameRule: currentGame.gameRule,
                            gamePoints: gamePlayer.gamePoints,
                        },
                    ],
                }
            })

            return newPlayers
        })

        const nextRuleIndex = ruleIndex + 1

        if (nextRuleIndex === GameHelper.allGamesRules.length) {
            setStatus('finished')
        } else setRuleIndex(nextRuleIndex)
    }

    return (
        <div style={{ padding: spacing, paddingTop: 0 }}>
            <h1>Le barbu !</h1>
            <Spacer half />
            TODO
            <ul>
                <li>Bug au passage du sans cœur</li>
                <li>1er joueur tourne à chaque fin de sous-partie</li>
                <li>La personne qui gagne le dernier deck distribue</li>
            </ul>
            <Spacer half />
            <span>Total des points :</span>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>
                        {player.name} :{' '}
                        {player.games.map((game) => game.gamePoints).reduce((prev, current) => prev + current, 0)}
                    </li>
                ))}
            </ul>
            <Spacer half />
            {status === 'running' && (
                <Game
                    key={currentGame.position + currentGame.label + currentGame.gameRule}
                    players={players}
                    gameRuleData={currentGame}
                    finishGame={finishGame}
                />
            )}
            {status === 'finished' && <span>Finished !</span>}
        </div>
    )
}

export default FullGame
