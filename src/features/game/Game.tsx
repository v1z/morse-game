import React, { useState, useEffect } from 'react'
import { Field } from './components/Field'
import { Result } from './components/Result'
import { gameSetup } from './utils/gameSetup'

import { Button } from '../../shared/components/Button'

import s from './styles.css'

type CardsMapType = Map<number, number>

type GameProps = {
  fieldSize: number
  onReset: () => void
}

const SUPPORTED_NFT_NUMBERS: number[] = [
  439, 1527, 1553, 2077, 2088, 2092, 2122, 2124, 2358, 2791, 4180, 4899, 4901, 4939, 4975, 5077, 5263, 5346, 5577, 8050,
  8603, 9937, 2095, 2279, 2413, 2877, 4134, 4160, 5227, 5283, 7622, 9656,
]

export const Game = (props: GameProps) => {
  const [cardsMap, setCardsMap] = useState<CardsMapType | undefined>(undefined)
  const [lastClickedCard, setLastClickedCard] = useState<number | undefined>(undefined)
  const [lastClickedNFT, setLastClickedNFT] = useState<number | undefined>(undefined)
  const [revealedCards, setRevealedCards] = useState(new Set(undefined))
  const [completedCards, setCompletedCards] = useState<number[]>([])
  const [clicksSpent, setClicksSpent] = useState<number>(0)
  const [isResultOpened, setResultOpened] = useState(true)

  const { fieldSize, onReset } = props

  useEffect(() => {
    const cards = gameSetup(SUPPORTED_NFT_NUMBERS, fieldSize * fieldSize)

    setCardsMap(cards)
  }, [fieldSize])

  const incrementClicks = () => {
    setClicksSpent(clicksSpent + 1)
  }

  const handleResetClick = () => {
    onReset()
  }

  const handleResultClose = () => {
    setResultOpened(false)
  }

  const handleCardClick = (id: number, nft: number) => {
    incrementClicks()

    // 1 opened and new click with match - save both as completed and reset
    if (lastClickedCard !== undefined && lastClickedNFT === nft) {
      setCompletedCards([...completedCards, lastClickedCard, id])
      setLastClickedCard(undefined)
      setLastClickedNFT(undefined)
      setRevealedCards(new Set())

      return
    }

    // 2 different opened and new click
    if (revealedCards.size === 2) {
      setRevealedCards(new Set([id]))
    } else {
      setRevealedCards(new Set([...revealedCards, id]))
    }

    setLastClickedCard(id)
    setLastClickedNFT(nft)
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

      <Button className={s.reset} onClick={handleResetClick}>
        RESTART
      </Button>

      {unfinishedCards === 0 && isResultOpened && (
        <Result fieldSize={fieldSize} clicksSpent={clicksSpent} onReset={handleResultClose} />
      )}
    </div>
  )
}
