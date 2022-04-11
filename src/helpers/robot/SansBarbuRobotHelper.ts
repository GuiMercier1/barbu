import { Card } from '../../model'
import RobotHelper, { RobotPickACardProps } from './RobotHelper'

const pickACard = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = RobotHelper.getPlayableCards(gamePlayer, deckCards)

    console.log('Playable cards : ', playableCards)

    if (difficulty === 0) {
        return RobotHelper.playRandom(playableCards)
    }

    return playableCards[0]
}

const SansBarbuRobotHelper = {
    pickACard,
}

export default SansBarbuRobotHelper
