import { Card, CardColor, DeckCard, GamePlayer } from '../model'

import backAsset from '../assets/cards/back.png'
import deux_trefle_asset from '../assets/cards/2_of_clubs.png'
import trois_trefle_asset from '../assets/cards/3_of_clubs.png'
import quatre_trefle_asset from '../assets/cards/4_of_clubs.png'
import cinq_trefle_asset from '../assets/cards/5_of_clubs.png'
import six_trefle_asset from '../assets/cards/6_of_clubs.png'
import sept_trefle_asset from '../assets/cards/7_of_clubs.png'
import huit_trefle_asset from '../assets/cards/8_of_clubs.png'
import neuf_trefle_asset from '../assets/cards/9_of_clubs.png'
import dix_trefle_asset from '../assets/cards/10_of_clubs.png'
import valet_trefle_asset from '../assets/cards/jack_of_clubs.png'
import dame_trefle_asset from '../assets/cards/queen_of_clubs.png'
import roi_trefle_asset from '../assets/cards/king_of_clubs.png'
import as_trefle_asset from '../assets/cards/ace_of_clubs.png'
import deux_pique_asset from '../assets/cards/2_of_spades.png'
import trois_pique_asset from '../assets/cards/3_of_spades.png'
import quatre_pique_asset from '../assets/cards/4_of_spades.png'
import cinq_pique_asset from '../assets/cards/5_of_spades.png'
import six_pique_asset from '../assets/cards/6_of_spades.png'
import sept_pique_asset from '../assets/cards/7_of_spades.png'
import huit_pique_asset from '../assets/cards/8_of_spades.png'
import neuf_pique_asset from '../assets/cards/9_of_spades.png'
import dix_pique_asset from '../assets/cards/10_of_spades.png'
import valet_pique_asset from '../assets/cards/jack_of_spades.png'
import dame_pique_asset from '../assets/cards/queen_of_spades.png'
import roi_pique_asset from '../assets/cards/king_of_spades.png'
import as_pique_asset from '../assets/cards/ace_of_spades.png'
import deux_coeur_asset from '../assets/cards/2_of_hearts.png'
import trois_coeur_asset from '../assets/cards/3_of_hearts.png'
import quatre_coeur_asset from '../assets/cards/4_of_hearts.png'
import cinq_coeur_asset from '../assets/cards/5_of_hearts.png'
import six_coeur_asset from '../assets/cards/6_of_hearts.png'
import sept_coeur_asset from '../assets/cards/7_of_hearts.png'
import huit_coeur_asset from '../assets/cards/8_of_hearts.png'
import neuf_coeur_asset from '../assets/cards/9_of_hearts.png'
import dix_coeur_asset from '../assets/cards/10_of_hearts.png'
import valet_coeur_asset from '../assets/cards/jack_of_hearts.png'
import dame_coeur_asset from '../assets/cards/queen_of_hearts.png'
import roi_coeur_asset from '../assets/cards/king_of_hearts.png'
import as_coeur_asset from '../assets/cards/ace_of_hearts.png'
import deux_carreau_asset from '../assets/cards/2_of_diamonds.png'
import trois_carreau_asset from '../assets/cards/3_of_diamonds.png'
import quatre_carreau_asset from '../assets/cards/4_of_diamonds.png'
import cinq_carreau_asset from '../assets/cards/5_of_diamonds.png'
import six_carreau_asset from '../assets/cards/6_of_diamonds.png'
import sept_carreau_asset from '../assets/cards/7_of_diamonds.png'
import huit_carreau_asset from '../assets/cards/8_of_diamonds.png'
import neuf_carreau_asset from '../assets/cards/9_of_diamonds.png'
import dix_carreau_asset from '../assets/cards/10_of_diamonds.png'
import valet_carreau_asset from '../assets/cards/jack_of_diamonds.png'
import dame_carreau_asset from '../assets/cards/queen_of_diamonds.png'
import roi_carreau_asset from '../assets/cards/king_of_diamonds.png'
import as_carreau_asset from '../assets/cards/ace_of_diamonds.png'

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

const getAmountOfCardsForEachPlayer = (playersLength: number) => {
    return playersLength === 4 ? 13 : 16
}

const distributeCards = (players: GamePlayer[]): number => {
    const cards = CardHelper.getCards(players.length)

    const shuffledCards = cards.sort((a, b) => 0.5 - Math.random())

    const amountOfCards = Math.floor(cards.length / players.length)

    players.forEach((player, index) => {
        const startIndex = index * amountOfCards
        const cardsSliced = shuffledCards.slice(startIndex, startIndex + amountOfCards)
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

const canPlayCard = (card: Card, playerCards: Card[], deckCards: DeckCard[]) => {
    if (deckCards.length === 0) return true

    const mainCardColor = deckCards[0].card.color
    const sameColorCards = playerCards.filter((card) => card.color === mainCardColor)
    const mustPlaySameColor = sameColorCards.length > 0

    if (mustPlaySameColor) return card.color === mainCardColor
    else return true
}

const getCardAsset = (card: Card, playerIsNPC: boolean): string => {
    if (playerIsNPC) return backAsset

    if (card.color === CardColor.CARREAU) {
        switch (card.value) {
            case 2:
                return deux_carreau_asset
            case 3:
                return trois_carreau_asset
            case 4:
                return quatre_carreau_asset
            case 5:
                return cinq_carreau_asset
            case 6:
                return six_carreau_asset
            case 7:
                return sept_carreau_asset
            case 8:
                return huit_carreau_asset
            case 9:
                return neuf_carreau_asset
            case 10:
                return dix_carreau_asset
            case 11:
                return valet_carreau_asset
            case 12:
                return dame_carreau_asset
            case 13:
                return roi_carreau_asset
            case 14:
                return as_carreau_asset
        }
    }

    if (card.color === CardColor.CARREAU) {
        switch (card.value) {
            case 2:
                return deux_carreau_asset
            case 3:
                return trois_carreau_asset
            case 4:
                return quatre_carreau_asset
            case 5:
                return cinq_carreau_asset
            case 6:
                return six_carreau_asset
            case 7:
                return sept_carreau_asset
            case 8:
                return huit_carreau_asset
            case 9:
                return neuf_carreau_asset
            case 10:
                return dix_carreau_asset
            case 11:
                return valet_carreau_asset
            case 12:
                return dame_carreau_asset
            case 13:
                return roi_carreau_asset
            case 14:
                return as_carreau_asset
        }
    }

    if (card.color === CardColor.COEUR) {
        switch (card.value) {
            case 2:
                return deux_coeur_asset
            case 3:
                return trois_coeur_asset
            case 4:
                return quatre_coeur_asset
            case 5:
                return cinq_coeur_asset
            case 6:
                return six_coeur_asset
            case 7:
                return sept_coeur_asset
            case 8:
                return huit_coeur_asset
            case 9:
                return neuf_coeur_asset
            case 10:
                return dix_coeur_asset
            case 11:
                return valet_coeur_asset
            case 12:
                return dame_coeur_asset
            case 13:
                return roi_coeur_asset
            case 14:
                return as_coeur_asset
        }
    }

    if (card.color === CardColor.PIQUE) {
        switch (card.value) {
            case 2:
                return deux_pique_asset
            case 3:
                return trois_pique_asset
            case 4:
                return quatre_pique_asset
            case 5:
                return cinq_pique_asset
            case 6:
                return six_pique_asset
            case 7:
                return sept_pique_asset
            case 8:
                return huit_pique_asset
            case 9:
                return neuf_pique_asset
            case 10:
                return dix_pique_asset
            case 11:
                return valet_pique_asset
            case 12:
                return dame_pique_asset
            case 13:
                return roi_pique_asset
            case 14:
                return as_pique_asset
        }
    }

    if (card.color === CardColor.TREFLE) {
        switch (card.value) {
            case 2:
                return deux_trefle_asset
            case 3:
                return trois_trefle_asset
            case 4:
                return quatre_trefle_asset
            case 5:
                return cinq_trefle_asset
            case 6:
                return six_trefle_asset
            case 7:
                return sept_trefle_asset
            case 8:
                return huit_trefle_asset
            case 9:
                return neuf_trefle_asset
            case 10:
                return dix_trefle_asset
            case 11:
                return valet_trefle_asset
            case 12:
                return dame_trefle_asset
            case 13:
                return roi_trefle_asset
            case 14:
                return as_trefle_asset
        }
    }

    console.error("Can't find the asset for card ", card)
    throw "Can't find the asset for card"
}

const sizes = {
    height: 145.2,
    width: 100,
}

const CardHelper = {
    getCards,
    distributeCards,
    getCardCssColor,
    getCardFullLabel,
    canPlayCard,
    getAmountOfCardsForEachPlayer,
    getCardAsset,
    sizes,
}

export default CardHelper
