import React from 'react'

import { Button } from '../../../shared/components/Button'

import type { SpentTimeType } from '../utils/spentTime'

import s from '../styles.css'

type ResultProps = {
  fieldSize: number
  clicksSpent: number
  spentTime: SpentTimeType
  onReset: () => void
}

export const Result = (props: ResultProps) => {
  const { fieldSize, clicksSpent, spentTime, onReset } = props

  const { seconds, minutes } = spentTime
  const spentTimeText = `${!!minutes ? `${minutes}m ` : ''}${seconds}s`

  const textToShare = `Look what I have found - a wonderful game made by @v1z1337 about @Morse_404 NFT collection (sidekick of @MitosisOrg)\n\nI have finished a ${fieldSize}x${fieldSize} field with just ${clicksSpent} clicks and less than ${spentTimeText} - can you beat that record? #findMorseGame\n\nTry it out here https://find-morse.vercel.app/`

  const handleShare = () => {
    const tweetText = encodeURIComponent(textToShare)
    const twitterUrl = `https://x.com/intent/tweet?text=${tweetText}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <section className={s.results}>
      <span className={s.resultTitle}>Congratz!</span>

      <p className={s.resultText}>
        You have found <span className={s.highlight}>{fieldSize * fieldSize} Morse</span> with{' '}
        <span className={s.highlight}>{clicksSpent} clicks</span> and less than{' '}
        <span className={s.highlight}>{spentTimeText}</span>
        &nbsp;&mdash; share your success on&nbsp;X
      </p>

      <div className={s.resultBtns}>
        <a href="https://linktr.ee/morse404" target="_blank">
          <Button className={s.btn}>LEARN MORE</Button>
        </a>

        <Button className={s.btn} onClick={handleShare}>
          SHARE
        </Button>

        <Button className={s.btn} onClick={onReset}>
          CLOSE
        </Button>
      </div>
    </section>
  )
}
