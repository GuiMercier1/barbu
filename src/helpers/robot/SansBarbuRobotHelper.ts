import { Card, CardColor } from '../../model'
import CardHelper from '../CardHelper'
import RobotHelper, { RobotPickACardProps } from './RobotHelper'

const pickACard = ({ gamePlayer, gamePlayers, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = RobotHelper.getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return RobotHelper.playRandom(playableCards)
    }

    const playableCC = RobotHelper.getCardsCaracteristics(playableCards)

    const playedCards = RobotHelper.getPlayedCards(gamePlayers)
    const playedCC = RobotHelper.getPlayedCardsCaraceristics(playedCards)
    const turnsPlayed = RobotHelper.getAmountOfTurnsPlayed(gamePlayers)
    const maxAmountOfTurns = CardHelper.getAmountOfCardsForEachPlayer(gamePlayers.length)
    const isEndOfTurns = turnsPlayed < (maxAmountOfTurns * 2) / 3

    const deckCardsCaracs = RobotHelper.getDeckCardsCaracs(deckCards, gamePlayers.length)

    // Si je joue en premier :
    if (deckCardsCaracs.isFirst) {
        // - Si je n'ai pas le roi de cœur ni l'as de cœur, je lance à cœur
        if (playableCC.amountOfCoeurs > 0 && !playableCC.hasRoiCoeur && !playableCC.hasAsCoeur) {
            return RobotHelper.getColorHighestValue(playableCards, CardColor.COEUR)
        }

        // Sinon on tente la coupe
        const cutCard = RobotHelper.playCutFocus(playableCards, playableCC, [CardColor.COEUR])
        if (cutCard) return cutCard

        // - Si turnIndex < 2/3 je sors mes grosses cartes pour reprendre la main, sauf à cœur
        if (!isEndOfTurns) {
            return RobotHelper.getHighestValue(playableCards)
        }

        // - Sinon je joue des petites cartes
        return RobotHelper.getLowestValue(playableCards)
    }

    const leadColor = deckCardsCaracs.leadCard.color

    // On teste si on peut sortir le barbu
    if (playableCC.hasRoiCoeur) {
        // Si carreau et on n'a pas de carreau, on sort le barbu
        if (leadColor === CardColor.CARREAU && playableCC.amountOfCarreaux === 0) {
            return RobotHelper.getCard(playableCards, 13, CardColor.COEUR)
        }
        // idem pour pique
        if (leadColor === CardColor.PIQUE && playableCC.amountOfPiques === 0) {
            return RobotHelper.getCard(playableCards, 13, CardColor.COEUR)
        }
        // idem pour trèfle
        if (leadColor === CardColor.TREFLE && playableCC.amountOfTrefles === 0) {
            return RobotHelper.getCard(playableCards, 13, CardColor.COEUR)
        }
        // Si l'as sort, on sort le barbu
        if (leadColor === CardColor.COEUR && deckCardsCaracs.hasAsCoeur) {
            return RobotHelper.getCard(playableCards, 13, CardColor.COEUR)
        }
    }

    // Si je joue en dernier
    if (deckCardsCaracs.isLast) {
        // Je sors l'AS uniquement si :
        // - couleur à coeur et pas de barbu
        if (leadColor === CardColor.COEUR && playableCC.hasAsCoeur && !deckCardsCaracs.hasRoiCoeur) {
            return RobotHelper.getCard(playableCards, 14, CardColor.COEUR)
        }
    }

    // Jeu normal
    const haveLeadColor = RobotHelper.checkHaveLeadColor(leadColor, playableCards)
    if (haveLeadColor) {
        // - Si pas de coupe, je reprends la main avant 2/3 de la partie
        if (isEndOfTurns) return RobotHelper.getLowestValue(playableCards)
        else return RobotHelper.getHighestValue(playableCards)
    } else {
        // - Si coupe, je sors d'abord roi de coeur > as de coeur > coupes > grosses cartes
        if (playableCC.hasRoiCoeur) {
            return RobotHelper.getCard(playableCards, 13, CardColor.COEUR)
        }
        if (playableCC.hasAsCoeur) {
            return RobotHelper.getCard(playableCards, 14, CardColor.COEUR)
        }

        // Coupe
        const cutCard = RobotHelper.playCutFocus(playableCards, playableCC)
        if (cutCard) return cutCard

        return RobotHelper.getHighestValue(playableCards)
    }
}

const SansBarbuRobotHelper = {
    pickACard,
}

export default SansBarbuRobotHelper
