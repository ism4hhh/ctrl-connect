import React from 'react'
import { Tile } from '../components/Tile.jsx'
import { Banner } from '../components/Banner.jsx'
import { HOME_TILES, REFERENCE_TILES } from '../data/tiles.js'

export function Home({ name, qa, slide, referenceMode, animate, onOpen }) {
  const tiles = referenceMode ? REFERENCE_TILES : HOME_TILES
  let idx = 0
  return (
    <div className="scroll">
      <div className="hero-text">Hello, {name}</div>
      <div className="grid">
        {tiles.map((t, k) =>
          t.banner ? (
            <Banner key="banner" initial={slide} autoplay={!qa} onPress={onOpen} />
          ) : (
            <Tile key={t.label + k} t={t} index={idx++} animate={animate} onPress={(tile) => tile.screen && onOpen?.(tile.screen)} />
          ),
        )}
      </div>
    </div>
  )
}
