import { Card, DeckCard, GamePlayer, GameRuleData } from '../../model'
import CardHelper from '../CardHelper'
import SansBarbuRobotHelper from './SansBarbuRobotHelper'

export type RobotPickACardProps = {
    gamePlayer: GamePlayer
    deckCards: DeckCard[]
    difficulty: 0 | 1 //
}

const robotPickACard_sansroi = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_sansdame = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_sanscoeur = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_moinsdepli = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_plusdepli = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_dernierpli = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_salade = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const getPlayableCards = (gamePlayer: GamePlayer, deckCards: DeckCard[]): Card[] => {
    return gamePlayer.cards.filter((card) => CardHelper.canPlayCard(card, gamePlayer.cards, deckCards))
}

const playRandom = (playableCards: Card[]) => {
    return playableCards[Math.floor(Math.random() * playableCards.length)]
}

const RobotHelper = {
    robotPickACard_sansbarbu: SansBarbuRobotHelper.pickACard,
    robotPickACard_sansroi,
    robotPickACard_sansdame,
    robotPickACard_sanscoeur,
    robotPickACard_moinsdepli,
    robotPickACard_plusdepli,
    robotPickACard_dernierpli,
    robotPickACard_salade,
    getPlayableCards,
    playRandom,
}

export default RobotHelper
