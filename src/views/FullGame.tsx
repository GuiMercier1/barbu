import { Fragment, useState } from 'react'
import { IconType } from 'react-icons'
import { AiFillTrophy } from 'react-icons/ai'
import { MdReplay } from 'react-icons/md'
import IconButton from '../components/IconButton'
import Modal from '../components/modal/Modal'
import Spacer from '../components/Spacer'
import GameHelper from '../helpers/GameHelper'
import StyleHelper from '../helpers/StyleHelper'
import { GamePlayer, Player } from '../model'
import FullGamePoints from './FullGamePoints'
import Game from './Game/Game'

const basePlayers: Player[] = [
    {
        id: 'player_1',
        name: 'Joueur 1',
        games: [],
        globalPosition: 0,
        isNPC: false,
    },
    {
        id: 'player_2',
        name: 'Joueur 2',
        games: [],
        globalPosition: 1,
        isNPC: true,
    },
    {
        id: 'player_3',
        name: 'Joueur 3',
        games: [],
        globalPosition: 2,
        isNPC: true,
    },
    {
        id: 'player_4',
        name: 'Joueur 4',
        games: [],
        globalPosition: 3,
        isNPC: true,
    },
]

type ActionData = {
    action: () => void
    icon: IconType
}

const FullGame = () => {
    const [players, setPlayers] = useState<Player[]>(basePlayers)
    const [status, setStatus] = useState<'running' | 'finished'>('running')
    const [ruleIndex, setRuleIndex] = useState<number>(0)

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const currentGame = GameHelper.allGamesRules[ruleIndex]
    const dealerID = players[Math.ceil(ruleIndex % players.length)].id

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

    const startNew = () => {}

    const showScores = () => {
        setIsOpen(true)
    }

    const actions: ActionData[] = [
        {
            action: showScores,
            icon: AiFillTrophy,
        },
        {
            action: startNew,
            icon: MdReplay,
        },
    ]

    return (
        <div>
            <div
                style={{
                    width: '100%',
                    backgroundColor: StyleHelper.colors.main,
                    padding: '0px 10px 0px 10px',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <h1 style={{ color: StyleHelper.colors.whiteText }}>Le barbu !</h1>
                <div>{currentGame.label}</div>
                <div>
                    <div style={{ display: 'flex', paddingRight: 5 }}>
                        {actions.map((actionData) => {
                            return (
                                <Fragment>
                                    <ActionButton actionData={actionData} />
                                    <Spacer half />
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div>
                TODO : Attribuer un score aux différentes cartes en fonction du jeu en cours, des cartes jouées, etc
            </div>
            <Spacer half />
            {status === 'running' && (
                <Game
                    key={currentGame.position + currentGame.label + currentGame.gameRule}
                    players={players}
                    dealerID={dealerID}
                    gameRuleData={currentGame}
                    finishGame={finishGame}
                />
            )}
            {status === 'finished' && <span>Finished !</span>}
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <FullGamePoints players={players} />
            </Modal>
        </div>
    )
}

type ActionButtonProps = {
    actionData: ActionData
}

const ActionButton = ({ actionData }: ActionButtonProps) => {
    return (
        <Fragment>
            <IconButton action={actionData.action} Icon={actionData.icon} style="transparent" />
        </Fragment>
    )
}

export default FullGame
