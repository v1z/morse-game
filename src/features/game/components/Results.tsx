import React from 'react'

import s from '../styles.css'

type ResultsProps = {
  fieldSize: number
  clicksSpent: number
  onReset: () => void
}

export const Results = (props: ResultsProps) => {
  const { fieldSize, clicksSpent, onReset } = props

  const textToShare = `Look what I have found - a wonderful game made by @v1z1337 about @Morse_404 NFT collection (sidekick of @MitosisOrg)\n\nI have finished level ${fieldSize} with just ${clicksSpent} clicks - can you beat that record?\n\nTry it out here https://find-morse.vercel.app/`

  const handleShare = () => {
    const tweetText = encodeURIComponent(textToShare)
    const twitterUrl = `https://x.com/intent/tweet?text=${tweetText}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <section className={s.results}>
      <span className={s.resultTitle}>Congratz!</span>

      <p className={s.resultText}>
        You have found {fieldSize * fieldSize} Morse with {clicksSpent} clicks - share your success on X
      </p>

      <div className={s.resultBtns}>
        <button type="button" className={s.shareButton} onClick={handleShare}>
          SHARE
        </button>

        <button type="button" className={s.shareButton} onClick={onReset}>
          PLAY AGAIN
        </button>
      </div>
    </section>
  )
}
