import React, { useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Tldraw, parseTldrawJsonFile } from 'tldraw'
import 'tldraw/tldraw.css'
import './style.css'

const BOARD_FILE = 'AI_Security_Mind_Map.tldr'
const SOURCE_URL = 'https://github.com/WhiteHatHero/WhiteHatHero/blob/main/ai-security-mind-map/AI_Security_Mind_Map.tldr'
const LICENSE_KEY = import.meta.env.VITE_TLDRAW_LICENSE_KEY

function App() {
  const [error, setError] = useState('')
  const [isReady, setIsReady] = useState(false)

  const onMount = useCallback((editor) => {
    let active = true

    // Read-only is an interaction mode. It does not alter any original shapes.
    editor.updateInstanceState({ isReadonly: true })

    async function loadOriginalBoard() {
      const url = import.meta.env.BASE_URL + BOARD_FILE
      const response = await fetch(url)
      if (!response.ok) throw new Error('Original board could not be downloaded (HTTP ' + response.status + ').')

      // Parse via tldraw's own versioned file migrator, never an HTML/SVG rewrite.
      const result = parseTldrawJsonFile({
        json: await response.text(),
        schema: editor.store.schema,
      })
      if (!result.ok) {
        throw new Error('The original .tldr file could not be opened: ' + result.error.type)
      }
      if (!active) return

      editor.loadSnapshot(result.value.getStoreSnapshot())
      editor.updateInstanceState({ isReadonly: true })
      editor.zoomToFit()
      setIsReady(true)
    }

    loadOriginalBoard().catch((cause) => {
      if (active) setError(cause instanceof Error ? cause.message : String(cause))
    })

    return () => { active = false }
  }, [])

  return (
    <div className="page">
      <header className="topbar">
        <div className="identity">
          <strong>AI Security Mind Map</strong>
          <span>Jordan Warren · Original tldraw canvas</span>
        </div>
        <nav aria-label="Board actions">
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">View original on GitHub</a>
          <a href={import.meta.env.BASE_URL + BOARD_FILE} download={BOARD_FILE}>Download .tldr</a>
        </nav>
      </header>
      <main className="canvas" aria-label="Original interactive tldraw mind map">
        <Tldraw onMount={onMount} licenseKey={LICENSE_KEY} />
        {!isReady && !error && <div className="notice" role="status">Opening original tldraw board…</div>}
        {error && <div className="notice error" role="alert">{error}</div>}
      </main>
      <footer>Official tldraw renderer · Pan and zoom freely · View only · Personal study synthesis, not an official Netskope publication</footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
