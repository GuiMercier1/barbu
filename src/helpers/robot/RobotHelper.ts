import { Card, CardColor, DeckCard, GamePlayer } from '../../model'
import CardHelper from '../CardHelper'
import SansBarbuRobotHelper from './SansBarbuRobotHelper'
import SansRoiRobotHelper from './SansRoiRobotHelper'

export type RobotPickACardProps = {
    gamePlayer: GamePlayer
    gamePlayers: GamePlayer[]
    deckCards: DeckCard[]
    difficulty: 0 | 1 //
}

const robotPickACard_sansroi = ({ gamePlayer, gamePlayers, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_sansdame = ({ gamePlayer, gamePlayers, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_sanscoeur = ({ gamePlayer, gamePlayers, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_moinsdepli = ({ gamePlayer, gamePlayers, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_plusdepli = ({ gamePlayer, gamePlayers, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_dernierpli = ({ gamePlayer, gamePlayers, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const robotPickACard_salade = ({ gamePlayer, gamePlayers, deckCards, difficulty }: RobotPickACardProps): Card => {
    const playableCards = getPlayableCards(gamePlayer, deckCards)

    if (difficulty === 0) {
        return playRandom(playableCards)
    }

    return playableCards[0]
}

const getPlayedCards = (gamePlayers: GamePlayer[]): Card[] => {
    const playedCards: Card[] = []

    gamePlayers.forEach((player) => {
        player.deckCardsWon.forEach((deckCardsWon) => {
            deckCardsWon.deckCards.forEach((deckCard) => {
                playedCards.push(deckCard.card)
            })
        })
    })

    return playedCards
}

const getPlayableCards = (gamePlayer: GamePlayer, deckCards: DeckCard[]): Card[] => {
    return gamePlayer.cards.filter((card) => CardHelper.canPlayCard(card, gamePlayer.cards, deckCards))
}

const playRandom = (playableCards: Card[]) => {
    return playableCards[Math.floor(Math.random() * playableCards.length)]
}

type CardsCaracteristics = {
    hasAsCoeur: boolean
    hasAsCarreau: boolean
    hasAsTrefle: boolean
    hasAsPique: boolean
    hasRoiCoeur: boolean
    hasRoiCarreau: boolean
    hasRoiTrefle: boolean
    hasRoiPique: boolean
    hasDameCoeur: boolean
    hasDameCarreau: boolean
    hasDameTrefle: boolean
    hasDamePique: boolean
    amountOfCoeurs: number
    amountOfCarreaux: number
    amountOfPiques: number
    amountOfTrefles: number
    hasCoeur: boolean
    hasCarreau: boolean
    hasPique: boolean
    hasTrefle: boolean
}

const getCardsCaracteristics = (cards: Card[]): CardsCaracteristics => {
    const cardsCaracs: CardsCaracteristics = {
        hasAsCoeur: false,
        hasAsCarreau: false,
        hasAsTrefle: false,
        hasAsPique: false,
        hasRoiCoeur: false,
        hasRoiCarreau: false,
        hasRoiTrefle: false,
        hasRoiPique: false,
        hasDameCoeur: false,
        hasDameCarreau: false,
        hasDameTrefle: false,
        hasDamePique: false,
        amountOfCoeurs: 0,
        amountOfCarreaux: 0,
        amountOfPiques: 0,
        amountOfTrefles: 0,
        hasCoeur: false,
        hasCarreau: false,
        hasPique: false,
        hasTrefle: false,
    }

    cards.forEach((card) => {
        if (card.color === CardColor.CARREAU) {
            cardsCaracs.amountOfCarreaux = cardsCaracs.amountOfCarreaux + 1
            if (card.value === 13) cardsCaracs.hasDameCarreau = true
            if (card.value === 13) cardsCaracs.hasRoiCarreau = true
            if (card.value === 14) cardsCaracs.hasAsCarreau = true
        } else if (card.color === CardColor.COEUR) {
            cardsCaracs.amountOfCoeurs = cardsCaracs.amountOfCoeurs + 1
            if (card.value === 13) cardsCaracs.hasDameCoeur = true
            if (card.value === 13) cardsCaracs.hasRoiCoeur = true
            if (card.value === 14) cardsCaracs.hasAsCoeur = true
        } else if (card.color === CardColor.PIQUE) {
            cardsCaracs.amountOfPiques = cardsCaracs.amountOfPiques + 1
            if (card.value === 13) cardsCaracs.hasDamePique = true
            if (card.value === 13) cardsCaracs.hasRoiPique = true
            if (card.value === 14) cardsCaracs.hasAsPique = true
        } else if (card.color === CardColor.TREFLE) {
            cardsCaracs.amountOfTrefles = cardsCaracs.amountOfTrefles + 1
            if (card.value === 13) cardsCaracs.hasDameTrefle = true
            if (card.value === 13) cardsCaracs.hasRoiTrefle = true
            if (card.value === 14) cardsCaracs.hasAsTrefle = true
        }
    })

    return {
        ...cardsCaracs,
        hasCoeur: cardsCaracs.amountOfCoeurs > 0,
        hasCarreau: cardsCaracs.amountOfCarreaux > 0,
        hasPique: cardsCaracs.amountOfPiques > 0,
        hasTrefle: cardsCaracs.amountOfTrefles > 0,
    }
}

type PlayedCardsCaracteristics = {
    amountOfCoeurs: number
    amountOfCarreaux: number
    amountOfPiques: number
    amountOfTrefles: number
}

const getPlayedCardsCaraceristics = (playedCards: Card[]): PlayedCardsCaracteristics => {
    const cardsCaracs: PlayedCardsCaracteristics = {
        amountOfCoeurs: 0,
        amountOfCarreaux: 0,
        amountOfPiques: 0,
        amountOfTrefles: 0,
    }

    playedCards.forEach((card) => {
        if (card.color === CardColor.CARREAU) cardsCaracs.amountOfCarreaux = cardsCaracs.amountOfCarreaux + 1
        else if (card.color === CardColor.COEUR) cardsCaracs.amountOfCoeurs = cardsCaracs.amountOfCoeurs + 1
        else if (card.color === CardColor.PIQUE) cardsCaracs.amountOfPiques = cardsCaracs.amountOfPiques + 1
        else if (card.color === CardColor.TREFLE) cardsCaracs.amountOfTrefles = cardsCaracs.amountOfTrefles + 1
    })

    return cardsCaracs
}

type DeckCardsCaracs = {
    isFirst: boolean
    isLast: boolean
    hasAsCoeur: boolean
    hasAsCarreau: boolean
    hasAsTrefle: boolean
    hasAsPique: boolean
    hasRoiCoeur: boolean
    hasRoiCarreau: boolean
    hasRoiTrefle: boolean
    hasRoiPique: boolean
    hasDameCoeur: boolean
    hasDameCarreau: boolean
    hasDameTrefle: boolean
    hasDamePique: boolean
    leadCard: Card
}

const getDeckCardsCaracs = (deckCards: DeckCard[], playersLength: number): DeckCardsCaracs => {
    const deckCardsCaracs: DeckCardsCaracs = {
        isFirst: deckCards.length === 0,
        isLast: deckCards.length === playersLength - 1,
        hasAsCoeur: false,
        hasAsCarreau: false,
        hasAsTrefle: false,
        hasAsPique: false,
        hasRoiCoeur: false,
        hasRoiCarreau: false,
        hasRoiTrefle: false,
        hasRoiPique: false,
        hasDameCoeur: false,
        hasDameCarreau: false,
        hasDameTrefle: false,
        hasDamePique: false,
        leadCard: null as unknown as Card, // Just for init
    }

    deckCards.forEach((deckCard) => {
        if (deckCard.first) {
            deckCardsCaracs.leadCard = deckCard.card
        }

        if (deckCard.card.color === CardColor.COEUR) {
            if (deckCard.card.value === 12) deckCardsCaracs.hasDameCoeur = true
            if (deckCard.card.value === 13) deckCardsCaracs.hasRoiCoeur = true
            if (deckCard.card.value === 14) deckCardsCaracs.hasAsCoeur = true
        }

        if (deckCard.card.color === CardColor.CARREAU) {
            if (deckCard.card.value === 12) deckCardsCaracs.hasDameCarreau = true
            if (deckCard.card.value === 13) deckCardsCaracs.hasRoiCarreau = true
            if (deckCard.card.value === 14) deckCardsCaracs.hasAsCarreau = true
        }

        if (deckCard.card.color === CardColor.TREFLE) {
            if (deckCard.card.value === 12) deckCardsCaracs.hasDameTrefle = true
            if (deckCard.card.value === 13) deckCardsCaracs.hasRoiTrefle = true
            if (deckCard.card.value === 14) deckCardsCaracs.hasAsTrefle = true
        }

        if (deckCard.card.color === CardColor.PIQUE) {
            if (deckCard.card.value === 12) deckCardsCaracs.hasDamePique = true
            if (deckCard.card.value === 13) deckCardsCaracs.hasRoiPique = true
            if (deckCard.card.value === 14) deckCardsCaracs.hasAsPique = true
        }
    })

    return deckCardsCaracs
}

const getCard = (cards: Card[], value: number, color: CardColor): Card => {
    const card = cards.find((card) => card.color === color && card.value === value)

    if (!card) {
        console.error('getCard : Card not found in player cards ', cards, value, color)
        throw 'Card not found in player cards'
    }

    return card
}

const checkHaveLeadColor = (leadColor: CardColor, cards: Card[]): boolean => {
    let haveLeadColor = false

    cards.forEach((card) => {
        if (card.color === leadColor) haveLeadColor = true
    })

    return haveLeadColor
}

const getAmountOfTurnsPlayed = (gamePlayers: GamePlayer[]): number => {
    let amountOfTurnsPlayed = 0

    gamePlayers.forEach((gamePlayer) => {
        amountOfTurnsPlayed += gamePlayer.deckCardsWon.length
    })

    return amountOfTurnsPlayed
}

const getColorHighestValue = (playableCards: Card[], color: CardColor): Card => {
    let card: Card | undefined = undefined

    playableCards.forEach((playableCard) => {
        if (playableCard.color === color) card = playableCard
    })

    if (card === undefined) {
        console.error(`getColorHighestValue > Impossible de trouver une carte à ${color}`, playableCards)
        throw `Impossible de trouver une carte à ${color}`
    }

    return card
}

const getLowestValue = (playableCards: Card[]): Card => {
    return playableCards.reduce((prev, current) => {
        return current.value < prev.value ? current : prev
    }, playableCards[0])
}

const getHighestValue = (playableCards: Card[]): Card => {
    return playableCards.reduce((prev, current) => {
        return current.value > prev.value ? current : prev
    }, playableCards[0])
}

// Quand on veut se débarrasser des couleurs où on a le moins de carte
// Utile quand on est le premier à jouer ou quand on n'a pas de cartes de la couleur principale
const playCutFocus = (
    playableCards: Card[],
    playableCC: CardsCaracteristics,
    excludedColors?: CardColor[]
): Card | null => {
    if (playableCC.hasTrefle && playableCC.amountOfTrefles < 3) {
        return RobotHelper.getColorHighestValue(playableCards, CardColor.TREFLE)
    }

    // - Je vais chercher la coupe si couleur < 3
    if (playableCC.hasCoeur && playableCC.amountOfCoeurs < 3) {
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

    return null
}

const RobotHelper = {
    robotPickACard_sansbarbu: SansBarbuRobotHelper.pickACard,
    robotPickACard_sansroi: SansRoiRobotHelper.pickACard,
    robotPickACard_sansdame,
    robotPickACard_sanscoeur,
    robotPickACard_moinsdepli,
    robotPickACard_plusdepli,
    robotPickACard_dernierpli,
    robotPickACard_salade,
    getPlayableCards,
    getPlayedCards,
    playRandom,
    getCardsCaracteristics,
    getPlayedCardsCaraceristics,
    getDeckCardsCaracs,
    getCard,
    checkHaveLeadColor,
    getAmountOfTurnsPlayed,
    getColorHighestValue,
    getLowestValue,
    getHighestValue,
    playCutFocus,
}

export default RobotHelper
