import { Fragment, useEffect, useMemo } from 'react'
import Spacer from '../../components/Spacer'
import useGame from '../../helpers/useGame'
import { GamePlayer } from '../../model'
import DeckCardsWonElement from './DeckCardsWonElement'
import PlayerCard from './PlayerCard'

type PlayerCardsProps = {
    player: GamePlayer
}

const PlayerCards = ({ player }: PlayerCardsProps) => {
    const { gameStatus, playerIndex, dealerID, deckCards, players } = useGame()

    const isMyTurn = useMemo((): boolean => {
        // No player
        if (gameStatus === 'finished') return false
        // Every players has played
        if (deckCards.length === players.length) return false
        else return playerIndex === player.position
    }, [gameStatus, deckCards, players, playerIndex, player])

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
