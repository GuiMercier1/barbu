import { Fragment, useEffect, useMemo } from 'react'
import Spacer from '../../components/Spacer'
import CardHelper from '../../helpers/CardHelper'
import useGame, { ProvideGame } from '../../helpers/useGame'
import useSpacing from '../../helpers/useSpacing'
import { GameRule, GamePlayer } from '../../model'
import Deck from './Deck'
import PlayerCards from './PlayerCards'

type GameProps = {
    gameRule: GameRule
    finishGame: () => void
}

const Game = ({ gameRule, finishGame }: GameProps) => {
    return (
        <ProvideGame gameRule={gameRule} finishGame={finishGame}>
            <GameReady />
        </ProvideGame>
    )
}

const GameReady = () => {
    const spacing = useSpacing()

    const { players, setPlayers } = useGame()

    useEffect(() => {
        const newPlayers = getPlayers()
        setPlayers(newPlayers)
    }, [])

    const getPlayers = () => {
        const players: GamePlayer[] = [
            {
                position: 0,
                name: 'Joueur 1',
                cards: [],
                deckCardsWon: [],
                id: 'player_1',
            },
            {
                position: 1,
                name: 'Joueur 2',
                cards: [],
                deckCardsWon: [],
                id: 'player_2',
            },
            {
                position: 2,
                name: 'Joueur 3',
                cards: [],
                deckCardsWon: [],
                id: 'player_3',
            },
            {
                position: 3,
                name: 'Joueur 4',
                cards: [],
                deckCardsWon: [],
                id: 'player_4',
            },
        ]

        CardHelper.distributeCards(players)

        console.log('Players with cards : ', players)

        return players
    }

    const sortedPlayers = useMemo(() => {
        return players.sort((playerA, playerB) => playerA.position - playerB.position)
    }, [players])

    return (
        <div style={{ padding: spacing }}>
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
