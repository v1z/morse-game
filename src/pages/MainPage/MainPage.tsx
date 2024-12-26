import React, { useState } from 'react'

import { Container } from '../../shared/components/Container'
import { Game } from '../../features/game/Game'
import { Settings } from '../../features/settings/Settings'

import s from './styles.css'

type GameStageType = 'notStarted' | 'inProgress'

export const MainPage = () => {
  const [gameStage, setGameStage] = useState<GameStageType>('notStarted')
  const [fieldSize, setFieldSize] = useState<number>(4)

  const handleGameStart = () => {
    setGameStage('inProgress')
  }

  const handleGameReset = () => {
    setGameStage('notStarted')
  }

  const handleSizeChange = (size: number) => {
    setFieldSize(size)
  }

  return (
    <>
      <main>
        <Container>
          {gameStage === 'notStarted' && (
            <Settings onStart={handleGameStart} fieldSize={fieldSize} onSizeChange={handleSizeChange} />
          )}

          {gameStage === 'inProgress' && <Game fieldSize={fieldSize} onReset={handleGameReset} />}
        </Container>
      </main>

      <footer className={s.footer}>
        <a href="https://x.com/v1z1337" target="_blank">
          made by v1z
        </a>
      </footer>
    </>
  )
}
