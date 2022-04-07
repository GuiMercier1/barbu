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
    playedBy: Player
    card: Card
    first: boolean
}

export type Player = {
    position: number
    name: string
    cards: Card[]
    deckCardsWon: DeckCard[][]
    id: string
}
