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
        // - Je vais chercher la coupe si couleur < 3
        const cutCard = RobotHelper.playCutFocus(playableCards, playableCC)
        if (cutCard) return cutCard

        // - Si turnIndex < 2/3 je sors mes grosses cartes pour reprendre la main, sauf à cœur
        if (!isEndOfTurns) {
            return RobotHelper.getHighestValue(playableCards)
        }

        // - Sinon je joue des petites cartes
        return RobotHelper.getLowestValue(playableCards)
    }

    const leadColor = deckCardsCaracs.leadCard.color

    // Si je joue en dernier
    if (deckCardsCaracs.isLast) {
        // Je sors l'AS uniquement si :
        // - couleur et pas de dame
        if (leadColor === CardColor.COEUR && playableCC.hasAsCoeur && !deckCardsCaracs.hasDameCoeur) {
            return RobotHelper.getCard(playableCards, 14, CardColor.COEUR)
        }

        if (leadColor === CardColor.CARREAU && playableCC.hasAsCarreau && !deckCardsCaracs.hasDameCarreau) {
            return RobotHelper.getCard(playableCards, 14, CardColor.CARREAU)
        }

        if (leadColor === CardColor.PIQUE && playableCC.hasAsPique && !deckCardsCaracs.hasDamePique) {
            return RobotHelper.getCard(playableCards, 14, CardColor.PIQUE)
        }

        if (leadColor === CardColor.TREFLE && playableCC.hasAsTrefle && !deckCardsCaracs.hasDameTrefle) {
            return RobotHelper.getCard(playableCards, 14, CardColor.TREFLE)
        }

        // Je sors le ROI uniquement si :
        // - couleur et pas de dame
        if (leadColor === CardColor.COEUR && playableCC.hasAsCoeur && !deckCardsCaracs.hasDameCoeur) {
            return RobotHelper.getCard(playableCards, 13, CardColor.COEUR)
        }

        if (leadColor === CardColor.CARREAU && playableCC.hasAsCarreau && !deckCardsCaracs.hasDameCarreau) {
            return RobotHelper.getCard(playableCards, 13, CardColor.CARREAU)
        }

        if (leadColor === CardColor.PIQUE && playableCC.hasAsPique && !deckCardsCaracs.hasDamePique) {
            return RobotHelper.getCard(playableCards, 13, CardColor.PIQUE)
        }

        if (leadColor === CardColor.TREFLE && playableCC.hasAsTrefle && !deckCardsCaracs.hasDameTrefle) {
            return RobotHelper.getCard(playableCards, 13, CardColor.TREFLE)
        }
    }

    // Jeu normal
    // - Si pas de coupe, je reprends la main avant 2/3 de la partie
    const haveLeadColor = RobotHelper.checkHaveLeadColor(leadColor, playableCards)
    if (haveLeadColor) {
        if (isEndOfTurns) return RobotHelper.getLowestValue(playableCards)
        else return RobotHelper.getHighestValue(playableCards)
    } else {
        // - Si coupe, je sors d'abord :
        // -- dame
        // -- as
        // -- coupes
        // -- grosses cartes
        if (playableCC.hasDameCoeur) {
            return RobotHelper.getCard(playableCards, 12, CardColor.COEUR)
        }
        if (playableCC.hasDameCarreau) {
            return RobotHelper.getCard(playableCards, 12, CardColor.CARREAU)
        }
        if (playableCC.hasDamePique) {
            return RobotHelper.getCard(playableCards, 12, CardColor.PIQUE)
        }
        if (playableCC.hasDameTrefle) {
            return RobotHelper.getCard(playableCards, 12, CardColor.TREFLE)
        }

        if (playableCC.hasAsCoeur) {
            return RobotHelper.getCard(playableCards, 14, CardColor.COEUR)
        }
        if (playableCC.hasAsCarreau) {
            return RobotHelper.getCard(playableCards, 14, CardColor.CARREAU)
        }
        if (playableCC.hasAsPique) {
            return RobotHelper.getCard(playableCards, 14, CardColor.PIQUE)
        }
        if (playableCC.hasAsTrefle) {
            return RobotHelper.getCard(playableCards, 14, CardColor.TREFLE)
        }

        if (playableCC.hasRoiCoeur) {
            return RobotHelper.getCard(playableCards, 13, CardColor.COEUR)
        }
        if (playableCC.hasRoiCarreau) {
            return RobotHelper.getCard(playableCards, 13, CardColor.CARREAU)
        }
        if (playableCC.hasRoiPique) {
            return RobotHelper.getCard(playableCards, 13, CardColor.PIQUE)
        }
        if (playableCC.hasRoiTrefle) {
            return RobotHelper.getCard(playableCards, 13, CardColor.TREFLE)
        }

        // Coupe
        const cutCard = RobotHelper.playCutFocus(playableCards, playableCC)
        if (cutCard) return cutCard

        return RobotHelper.getHighestValue(playableCards)
    }
}

const SansDameRobotHelper = {
    pickACard,
}

export default SansDameRobotHelper
