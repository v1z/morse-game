import React from 'react'

import { Button } from '../../../shared/components/Button'

import s from '../styles.css'

type ResultProps = {
  fieldSize: number
  clicksSpent: number
  onReset: () => void
}

export const Result = (props: ResultProps) => {
  const { fieldSize, clicksSpent, onReset } = props

  const textToShare = `Look what I have found - a wonderful game made by @v1z1337 about @Morse_404 NFT collection (sidekick of @MitosisOrg)\n\nI have finished level ${fieldSize} with just ${clicksSpent} clicks - can you beat that record? #findMorseGame\n\nTry it out here https://find-morse.vercel.app/`

  const handleShare = () => {
    const tweetText = encodeURIComponent(textToShare)
    const twitterUrl = `https://x.com/intent/tweet?text=${tweetText}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <section className={s.results}>
      <span className={s.resultTitle}>Congratz!</span>

      <p className={s.resultText}>
        You have found {fieldSize * fieldSize} Morse with {clicksSpent} clicks&nbsp;&mdash; share your success on&nbsp;X
      </p>

      <div className={s.resultBtns}>
        <Button className={s.btn} onClick={handleShare}>
          SHARE
        </Button>

        <Button className={s.btn} onClick={onReset}>
          CLOSE
        </Button>

        <a href="https://linktr.ee/morse404" target="_blank">
          <Button className={s.btn} onClick={() => {}}>
            LEARN MORE
          </Button>
        </a>
      </div>
    </section>
  )
}
