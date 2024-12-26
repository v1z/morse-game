import React, { useState, useEffect } from 'react'
import { Field } from './components/Field'
import { Results } from './components/Results'
import { gameSetup } from './utils/gameSetup'

import s from './styles.css'

type CardsMapType = Map<number, number>

type GameProps = {
  fieldSize: number
  onReset: () => void
}

const SUPPORTED_NFT_NUMBERS: number[] = [1527, 2095, 2279, 2413, 2877, 4134, 4160, 5227, 5283, 7622, 9656]

export const Game = (props: GameProps) => {
  const [cardsMap, setCardsMap] = useState<CardsMapType | undefined>(undefined)
  const [lastClickedCard, setLastClickedCard] = useState<number | undefined>(undefined)
  const [lastClickedNFT, setLastClickedNFT] = useState<number | undefined>(undefined)
  const [revealedCards, setRevealedCards] = useState(new Set(undefined))
  const [completedCards, setCompletedCards] = useState<number[]>([])
  const [clicksSpent, setClicksSpent] = useState<number>(0)

  const { fieldSize, onReset } = props

  useEffect(() => {
    const cards = gameSetup(SUPPORTED_NFT_NUMBERS, fieldSize * fieldSize)

    setCardsMap(cards)
  }, [fieldSize])

  const incrementClicks = () => {
    setClicksSpent(clicksSpent + 1)
  }

  const handleReset = () => {
    onReset()
  }

  const handleCardClick = (id: number, nft: number) => {
    incrementClicks()

    // 2 different opened and new click - reset both
    if (revealedCards.size === 2) {
      setRevealedCards(new Set())
      setLastClickedCard(undefined)
      setLastClickedNFT(undefined)

      return
    }

    // 1 opened and new click with match - save both as completed and reset
    if (lastClickedCard !== undefined && lastClickedNFT === nft) {
      setCompletedCards([...completedCards, lastClickedCard, id])
      setLastClickedCard(undefined)
      setLastClickedNFT(undefined)
      setRevealedCards(new Set())

      return
    }

    // 1 opened and new click with different nft - add both to revealed
    setLastClickedCard(id)
    setLastClickedNFT(nft)
    setRevealedCards(new Set([...revealedCards, id]))
  }

  const unfinishedCards = fieldSize * fieldSize - completedCards.length

  return (
    <div className={s.game}>
      <div className={s.stats}>
        <span className={s.statItem}>Morse to find: {unfinishedCards}</span>
        <span>Clicks spent: {clicksSpent}</span>
      </div>

      <p className={s.gameTitle}>Click on&nbsp;the card and reveal the Morse, then try to&nbsp;find the same one</p>

      <Field
        cards={cardsMap}
        size={fieldSize}
        revealedCards={[...Array.from(revealedCards), ...completedCards]}
        lastClicked={lastClickedCard}
        onClick={handleCardClick}
      />

      <button type="button" className={s.reset} onClick={handleReset}>
        GAME RESET
      </button>

      {unfinishedCards === 0 && <Results fieldSize={fieldSize} clicksSpent={clicksSpent} onReset={handleReset} />}
    </div>
  )
}
