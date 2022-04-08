export enum CardColor {
    TREFLE = 'trefle',
    PIQUE = 'pique',
    COEUR = 'coeur',
    CARREAU = 'carreau',
}

export type Card = {
    value: number
    label: string
    color: CardColor
    id: string
}

export type DeckCard = {
    playedBy: GamePlayer
    card: Card
    first: boolean
}

export type DeckCardsWon = {
    order: number
    isLast: boolean
    deckCards: DeckCard[]
}

export type PlayerGameData = {
    gameRule: GameRule
    gamePoints: number
}

export type Player = {
    id: string
    name: string
    games: PlayerGameData[]
}

export type GamePlayer = {
    id: string
    position: number
    name: string
    cards: Card[]
    deckCardsWon: DeckCardsWon[]
    gamePoints: number
}

export enum GameRule {
    SANS_BARBU = 0,
    SANS_ROI = 1,
    SANS_DAME = 2,
    SANS_COEUR = 3,
    MOINS_DE_PLI = 4,
    PLUS_DE_PLI = 5,
    DERNIER_PLI = 6,
    REUSSITE = 7,
    SALADE = 8,
}

export type CountPointsFunction = (deckCardsWon: DeckCardsWon[]) => number

export type GameRuleData = {
    label: string
    position: number
    gameRule: GameRule
    checkGameFinished: (gamePlayers: GamePlayer[]) => boolean
    countPoints: CountPointsFunction
}
