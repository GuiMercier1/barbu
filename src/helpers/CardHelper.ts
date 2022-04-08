import { Card, CardColor, GamePlayer } from '../model'

const getCardLabel = (value: number): string => {
    return value <= 10 ? '' + value : value === 11 ? 'Valet' : value === 12 ? 'Dame' : value === 13 ? 'Roi' : 'As'
}

const getCards = (playersCount: number): Card[] => {
    const cards: Card[] = []

    if (playersCount <= 2 || playersCount > 4) {
        alert('Le nombre de joueurs doit être 3 ou 4')
    }

    for (let i = 2; i < 15; i++) {
        const label = getCardLabel(i)

        cards.push({
            value: i,
            label,
            color: CardColor.CARREAU,
            id: i + '_' + CardColor.CARREAU,
        })
        cards.push({
            value: i,
            label,
            color: CardColor.COEUR,
            id: i + '_' + CardColor.COEUR,
        })
        cards.push({
            value: i,
            label,
            color: CardColor.PIQUE,
            id: i + '_' + CardColor.PIQUE,
        })
        cards.push({
            value: i,
            label,
            color: CardColor.TREFLE,
            id: i + '_' + CardColor.TREFLE,
        })
    }

    return cards
}

const sortCards = (cards: Card[]): Card[] => {
    const clubsCards = cards
        .filter((card) => card.color === CardColor.TREFLE)
        .sort((cardA, cardB) => {
            return cardA.value - cardB.value
        })
    const heartCards = cards
        .filter((card) => card.color === CardColor.COEUR)
        .sort((cardA, cardB) => {
            return cardA.value - cardB.value
        })
    const sparesCards = cards
        .filter((card) => card.color === CardColor.PIQUE)
        .sort((cardA, cardB) => {
            return cardA.value - cardB.value
        })
    const diamondsCards = cards
        .filter((card) => card.color === CardColor.CARREAU)
        .sort((cardA, cardB) => {
            return cardA.value - cardB.value
        })

    return [...clubsCards, ...heartCards, ...sparesCards, ...diamondsCards]
}

const distributeCards = (players: GamePlayer[]): number => {
    const cards = CardHelper.getCards(players.length)

    const shuffledCards = cards.sort((a, b) => 0.5 - Math.random())

    const amountOfCards = Math.floor(cards.length / players.length)

    players.forEach((player, index) => {
        const startIndex = index * amountOfCards
        const cardsSliced = cards.slice(startIndex, startIndex + amountOfCards)
        const cardsSorted = sortCards(cardsSliced)

        player.cards = cardsSorted
    })

    return amountOfCards
}

const getCardCssColor = (cardColor: CardColor): string => {
    return cardColor === CardColor.CARREAU || cardColor === CardColor.COEUR ? 'red' : 'black'
}

const getCardFullLabel = (card: Card): string => {
    return card.label + ' de ' + card.color
}

const CardHelper = {
    getCards,
    distributeCards,
    getCardCssColor,
    getCardFullLabel,
}

export default CardHelper
