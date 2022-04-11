import { CardColor, CountPointsFunction, DeckCardsWon, GamePlayer, GameRule, GameRuleData } from '../model'
import RobotHelper from './robot/RobotHelper'

const POINTS_FOR_BARBU = 30
const POINTS_FOR_KING = 20
const POINTS_FOR_LADY = 10
const POINTS_FOR_HEART = 5
const POINTS_FOR_PLUS_PLI = -10
const POINTS_FOR_MOINS_PLI = 10
const POINTS_FOR_LAST_PLI = 30

const _countPointsSansBarbu: CountPointsFunction = (deckCardsWon: DeckCardsWon[]): number => {
    let points = 0

    deckCardsWon.forEach((deckCardsWon) => {
        deckCardsWon.deckCards.forEach((deckCard) => {
            const card = deckCard.card
            if (card.value === 13 && card.color === CardColor.COEUR) {
                points = POINTS_FOR_BARBU
            }
        })
    })

    return points
}

const _countPointsSansRoi: CountPointsFunction = (deckCardsWon: DeckCardsWon[]): number => {
    let points = 0

    deckCardsWon.forEach((deckCardsWon) => {
        deckCardsWon.deckCards.forEach((deckCard) => {
            const card = deckCard.card
            if (card.value === 13) points += POINTS_FOR_KING
        })
    })

    return points
}

const _countPointsSansDame: CountPointsFunction = (deckCardsWon: DeckCardsWon[]): number => {
    let points = 0

    deckCardsWon.forEach((deckCardsWon) => {
        deckCardsWon.deckCards.forEach((deckCard) => {
            const card = deckCard.card
            if (card.value === 12) points += POINTS_FOR_LADY
        })
    })

    return points
}

const _countPointsSansCoeur: CountPointsFunction = (deckCardsWon: DeckCardsWon[]): number => {
    let points = 0

    deckCardsWon.forEach((deckCardsWon) => {
        deckCardsWon.deckCards.forEach((deckCard) => {
            const card = deckCard.card
            if (card.color === CardColor.COEUR) points += POINTS_FOR_HEART
        })
    })

    return points
}

const _countPointsMoinsDePli: CountPointsFunction = (deckCardsWon: DeckCardsWon[]): number => {
    return deckCardsWon.length * POINTS_FOR_MOINS_PLI
}

const _countPointsPlusDePli: CountPointsFunction = (deckCardsWon: DeckCardsWon[]): number => {
    return deckCardsWon.length * POINTS_FOR_PLUS_PLI
}

const _countPointsDernierPli: CountPointsFunction = (deckCardsWon: DeckCardsWon[]): number => {
    let points = 0

    deckCardsWon.forEach((deckCardsWon) => {
        if (deckCardsWon.isLast) points += POINTS_FOR_LAST_PLI
    })

    return points
}

const _countPointsReussite: CountPointsFunction = (deckCardsWon: DeckCardsWon[]): number => {
    throw 'Not managed yet'
}
const _countPointsSalade: CountPointsFunction = (deckCardsWon: DeckCardsWon[]): number => {
    let points =
        _countPointsSansBarbu(deckCardsWon) +
        _countPointsSansDame(deckCardsWon) +
        _countPointsSansCoeur(deckCardsWon) +
        _countPointsMoinsDePli(deckCardsWon)

    return points
}

const _isSansBarbuFinished = (gamePlayers: GamePlayer[]): boolean => {
    // If cardsWon contains the barbu
    let barbuHasBeenWon = false

    gamePlayers.forEach((player) => {
        player.deckCardsWon.forEach((deckCardsWon) => {
            deckCardsWon.deckCards.forEach((deckCard) => {
                const card = deckCard.card
                if (card.value === 13 && card.color === CardColor.COEUR) barbuHasBeenWon = true
            })
        })
    })

    return barbuHasBeenWon
}
const _isSansRoiFinished = (gamePlayers: GamePlayer[]): boolean => {
    let hasHeartKing = false
    let hasSpareKing = false
    let hasClubKing = false
    let hasDiamondKing = false

    gamePlayers.forEach((player) => {
        player.deckCardsWon.forEach((deckCardsWon) => {
            deckCardsWon.deckCards.forEach((deckCard) => {
                const card = deckCard.card
                if (card.value === 13) {
                    if (card.color === CardColor.COEUR) hasHeartKing = true
                    if (card.color === CardColor.CARREAU) hasDiamondKing = true
                    if (card.color === CardColor.TREFLE) hasClubKing = true
                    if (card.color === CardColor.PIQUE) hasSpareKing = true
                }
            })
        })
    })

    return hasHeartKing && hasSpareKing && hasClubKing && hasDiamondKing
}

const _isSansDameFinished = (gamePlayers: GamePlayer[]): boolean => {
    let hasHeartLady = false
    let hasSpareLady = false
    let hasClubLady = false
    let hasDiamondLady = false

    gamePlayers.forEach((player) => {
        player.deckCardsWon.forEach((deckCardsWon) => {
            deckCardsWon.deckCards.forEach((deckCard) => {
                const card = deckCard.card
                if (card.value === 12) {
                    if (card.color === CardColor.COEUR) hasHeartLady = true
                    if (card.color === CardColor.CARREAU) hasDiamondLady = true
                    if (card.color === CardColor.TREFLE) hasClubLady = true
                    if (card.color === CardColor.PIQUE) hasSpareLady = true
                }
            })
        })
    })

    return hasHeartLady && hasSpareLady && hasClubLady && hasDiamondLady
}
const _isSansCoeurFinished = (gamePlayers: GamePlayer[]): boolean => {
    let playersHaveStillHearts = false

    gamePlayers.forEach((player) => {
        player.cards.forEach((card) => {
            if (card.color === CardColor.COEUR) playersHaveStillHearts = true
        })
    })

    return !playersHaveStillHearts
}

const _isMoinsDePliFinished = (gamePlayers: GamePlayer[]): boolean => {
    let playersHaveCardsLeft = false

    gamePlayers.forEach((player) => {
        if (player.cards.length > 0) playersHaveCardsLeft = true
    })

    return !playersHaveCardsLeft
}

const _isPlusDePliFinished = (gamePlayers: GamePlayer[]): boolean => {
    let playersHaveCardsLeft = false

    gamePlayers.forEach((player) => {
        if (player.cards.length > 0) playersHaveCardsLeft = true
    })

    return !playersHaveCardsLeft
}
const _isDernierPliFinished = (gamePlayers: GamePlayer[]): boolean => {
    let playersHaveCardsLeft = false

    gamePlayers.forEach((player) => {
        if (player.cards.length > 0) playersHaveCardsLeft = true
    })

    return !playersHaveCardsLeft
}

const _isReussiteFinished = (gamePlayers: GamePlayer[]): boolean => {
    throw 'Not managed yet !'
}

const _isSaladeFinished = (gamePlayers: GamePlayer[]): boolean => {
    let playersHaveCardsLeft = false

    gamePlayers.forEach((player) => {
        if (player.cards.length > 0) playersHaveCardsLeft = true
    })

    return !playersHaveCardsLeft
}

const allGamesRules: GameRuleData[] = [
    {
        gameRule: GameRule.SANS_BARBU,
        label: 'Sans Barbu',
        checkGameFinished: _isSansBarbuFinished,
        countPoints: _countPointsSansBarbu,
        position: 0,
        robotPickACard: RobotHelper.robotPickACard_sansbarbu,
    },
    {
        gameRule: GameRule.SANS_ROI,
        label: 'Sans Roi',
        checkGameFinished: _isSansRoiFinished,
        countPoints: _countPointsSansRoi,
        position: 1,
        robotPickACard: RobotHelper.robotPickACard_sansroi,
    },
    {
        gameRule: GameRule.SANS_DAME,
        label: 'Sans Dame',
        checkGameFinished: _isSansDameFinished,
        countPoints: _countPointsSansDame,
        position: 2,
        robotPickACard: RobotHelper.robotPickACard_sansdame,
    },
    {
        gameRule: GameRule.SANS_COEUR,
        label: 'Sans Coeur',
        checkGameFinished: _isSansCoeurFinished,
        countPoints: _countPointsSansCoeur,
        position: 3,
        robotPickACard: RobotHelper.robotPickACard_sanscoeur,
    },
    {
        gameRule: GameRule.MOINS_DE_PLI,
        label: 'Moinss de pli',
        checkGameFinished: _isMoinsDePliFinished,
        countPoints: _countPointsMoinsDePli,
        position: 4,
        robotPickACard: RobotHelper.robotPickACard_moinsdepli,
    },
    {
        gameRule: GameRule.PLUS_DE_PLI,
        label: 'Plus de pli',
        checkGameFinished: _isPlusDePliFinished,
        countPoints: _countPointsPlusDePli,
        position: 5,
        robotPickACard: RobotHelper.robotPickACard_plusdepli,
    },
    {
        gameRule: GameRule.DERNIER_PLI,
        label: 'Dernier pli',
        checkGameFinished: _isDernierPliFinished,
        countPoints: _countPointsDernierPli,
        position: 6,
        robotPickACard: RobotHelper.robotPickACard_dernierpli,
    },
    {
        gameRule: GameRule.SALADE,
        label: 'Salade',
        checkGameFinished: _isSaladeFinished,
        countPoints: _countPointsSalade,
        position: 7,
        robotPickACard: RobotHelper.robotPickACard_salade,
    },
]

const GameHelper = {
    allGamesRules,
}

export default GameHelper
