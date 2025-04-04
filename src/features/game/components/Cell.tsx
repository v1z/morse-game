import React, { useRef, useEffect } from 'react'
import cn from 'classnames'

import { Button } from '../../../shared/components/Button'

import s from '../styles.css'

type CellProps = {
  id: number
  isOpened: boolean
  nft: number
  onClick: (id: number, nft: number) => void
}

export const Cell = (props: CellProps) => {
  const { id, nft, onClick, isOpened } = props

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()

    img.src = `./nfts/${nft}.jpg`
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)
    }
  }, [isOpened])

  const handleClick = (id: number, nft: number) => {
    onClick && onClick(id, nft)
  }

  return (
    <Button
      className={cn(s.cell, {
        [s.cell_opened]: isOpened,
      })}
      onClick={() => handleClick(id, nft)}
    >
      <div
        className={cn(s.cellCover, {
          [s.cellCover_hidden]: isOpened,
        })}
      >
        <span className={s.cellText}>MORSE</span>
        <span className={s.cellText}>404</span>
      </div>

      {/* isOpened - prevent from cheating by deleting cellCover via dev tools */}
      {isOpened && <canvas className={s.canvas} ref={canvasRef} />}
    </Button>
  )
}
