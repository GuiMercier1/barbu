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
        console.log('Je suis le premier ', gamePlayer)

        // - Si je n'ai pas le roi de cœur ni l'as de cœur, je lance à cœur
        if (playableCC.amountOfCoeurs > 0 && !playableCC.hasBarbu && !playableCC.hasAsCoeur) {
            return RobotHelper.getColorHighestValue(playableCards, CardColor.COEUR)
        }

        // - Je vais chercher la coupe si couleur < 3
        if (playableCC.hasCarreau && playableCC.amountOfCarreaux < 3) {
            return RobotHelper.getColorHighestValue(playableCards, CardColor.CARREAU)
        }

        // - Je vais chercher la coupe si couleur < 3
        if (playableCC.hasPique && playableCC.amountOfPiques < 3) {
            return RobotHelper.getColorHighestValue(playableCards, CardColor.PIQUE)
        }

        // - Je vais chercher la coupe si couleur < 3
        if (playableCC.hasTrefle && playableCC.amountOfTrefles < 3) {
            return RobotHelper.getColorHighestValue(playableCards, CardColor.TREFLE)
        }

        // - Si turnIndex < 2/3 je sors mes grosses cartes pour reprendre la main, sauf à cœur
        if (!isEndOfTurns) {
            return RobotHelper.getHighestValue(playableCards)
        }

        // - Sinon je joue des petites cartes
        return RobotHelper.getLowestValue(playableCards)
    }

    const leadColor = deckCardsCaracs.leadCard.color

    // On teste si on peut sortir le barbu
    if (playableCC.hasBarbu) {
        console.log("J'ai le barbu ", gamePlayer)
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
            console.log('ON SORT LE BARBU !!! ', RobotHelper.getCard(playableCards, 13, CardColor.COEUR))
            return RobotHelper.getCard(playableCards, 13, CardColor.COEUR)
        }
    }

    // Si je joue en dernier
    if (deckCardsCaracs.isLast) {
        console.log('Je suis le dernier ', gamePlayer)

        // Je sors l'AS uniquement si :
        // - couleur à coeur et pas de barbu
        if (leadColor === CardColor.COEUR && playableCC.hasAsCoeur && !deckCardsCaracs.hasBarbu) {
            return RobotHelper.getCard(playableCards, 14, CardColor.COEUR)
        }
    }

    // Jeu normal
    // - Si pas de coupe, je reprends la main avant 2/3 de la partie
    // - Si coupe, je sors d'abord roi de coeur > as de coeur > coupes > grosses cartes
    const haveLeadColor = RobotHelper.checkHaveLeadColor(leadColor, playableCards)
    if (haveLeadColor) {
        if (isEndOfTurns) return RobotHelper.getLowestValue(playableCards)
        else return RobotHelper.getHighestValue(playableCards)
    } else {
        if (playableCC.hasBarbu) {
            return RobotHelper.getCard(playableCards, 13, CardColor.COEUR)
        }
        if (playableCC.hasAsCoeur) {
            return RobotHelper.getCard(playableCards, 14, CardColor.COEUR)
        }
        return RobotHelper.getHighestValue(playableCards)
    }
}

const SansBarbuRobotHelper = {
    pickACard,
}

export default SansBarbuRobotHelper
