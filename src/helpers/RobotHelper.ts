import { Card, DeckCard, GamePlayer, GameRuleData } from '../model'
import CardHelper from './CardHelper'

export type RobotPickACardProps = {
    gamePlayer: GamePlayer
    deckCards: DeckCard[]
    difficulty: 0 | 1 //
}

const _robotPickACard_sansbarbu = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    console.log('Playable cards : ', playableCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const _robotPickACard_sansroi = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const _robotPickACard_sansdame = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const _robotPickACard_sanscoeur = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const _robotPickACard_moinsdepli = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const _robotPickACard_plusdepli = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const _robotPickACard_dernierpli = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const _robotPickACard_salade = ({ gamePlayer, deckCards, difficulty }: RobotPickACardProps): Card => {
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
    _robotPickACard_sansbarbu,
    _robotPickACard_sansroi,
    _robotPickACard_sansdame,
    _robotPickACard_sanscoeur,
    _robotPickACard_moinsdepli,
    _robotPickACard_plusdepli,
    _robotPickACard_dernierpli,
    _robotPickACard_salade,
}

export default RobotHelper
