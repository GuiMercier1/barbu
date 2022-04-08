import { useState } from 'react'
import Spacer from '../components/Spacer'
import GameHelper from '../helpers/GameHelper'
import useSpacing from '../helpers/useSpacing'
import Game from './Game/Game'

const FullGame = () => {
    const spacing = useSpacing()

    const [status, setStatus] = useState<'running' | 'finished'>('running')
    const [ruleIndex, setRuleIndex] = useState<number>(0)

    const finishGame = () => {
        const nextRuleIndex = ruleIndex + 1

        if (nextRuleIndex === GameHelper.allGamesRules.length) {
            setStatus('finished')
        } else setRuleIndex(nextRuleIndex)
    }

    return (
        <div style={{ padding: spacing, paddingTop: 0 }}>
            <h1>Le barbu !</h1>
            <Spacer half />
            {status === 'running' && (
                <Game gameRuleData={GameHelper.allGamesRules[ruleIndex]} finishGame={finishGame} />
            )}
            {status === 'finished' && <span>Finished !</span>}
        </div>
    )
}

export default FullGame
