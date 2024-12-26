import React from 'react'

import cn from 'classnames'

import s from './styles.css'

type SettinsProps = {
  onStart: () => void
  onSizeChange: (value: number) => void
  fieldSize: number
}

const MIN_SIZE = 2
const MAX_SIZE = 10

export const Settings = (props: SettinsProps) => {
  const { onStart, onSizeChange, fieldSize } = props

  const handleSizeInc = () => {
    onSizeChange(fieldSize + 2)
  }

  const handleSizeDec = () => {
    onSizeChange(fieldSize - 2)
  }

  const handleStartClick = () => {
    onStart()
  }

  return (
    <div className={s.root}>
      <h1 className={s.title}>Game of&nbsp;Morse</h1>

      <span className={s.subtitle}>Choose the field size</span>

      <div className={s.controls}>
        <button
          type="button"
          className={cn(s.button, s.clickable, {
            [s.clickable_disabled]: fieldSize === MIN_SIZE,
          })}
          disabled={fieldSize === MIN_SIZE}
          onClick={handleSizeDec}
        >
          -
        </button>

        <span className={cn(s.size, s.clickable)}>{fieldSize}</span>

        <button
          type="button"
          className={cn(s.button, s.clickable, {
            [s.clickable_disabled]: fieldSize === MAX_SIZE,
          })}
          disabled={fieldSize === MAX_SIZE}
          onClick={handleSizeInc}
        >
          +
        </button>
      </div>

      <button type="button" className={cn(s.clickable, s.start)} onClick={handleStartClick}>
        START THE GAME
      </button>
    </div>
  )
}
