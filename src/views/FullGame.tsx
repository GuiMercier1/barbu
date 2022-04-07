import { Fragment, useState } from 'react'
import { GameRule } from '../model'
import Game from './Game/Game'

const FullGame = () => {
    const allGamesRules = [
        GameRule.SANS_BARBU,
        GameRule.SANS_ROI,
        GameRule.SANS_DAME,
        GameRule.SANS_COEUR,
        GameRule.MOINS_DE_PLI,
        GameRule.PLUS_DE_PLI,
        GameRule.DERNIER_PLI,
        GameRule.SALADE,
    ]

    const [status, setStatus] = useState<'running' | 'finished'>('running')
    const [ruleIndex, setRuleIndex] = useState<GameRule>(allGamesRules[0])

    const finishGame = () => {
        const nextRuleIndex = ruleIndex + 1

        if (nextRuleIndex === allGamesRules.length) {
            setStatus('finished')
        } else setRuleIndex(nextRuleIndex)
    }

    return (
        <Fragment>
            {status === 'running' && <Game gameRule={allGamesRules[ruleIndex]} finishGame={finishGame} />}
            {status === 'finished' && <span>Finished !</span>}
        </Fragment>
    )
}

export default FullGame
