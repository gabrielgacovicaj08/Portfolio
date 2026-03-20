import { useEffect, useState } from 'react'

export default function BootOverlay() {
  const [fading, setFading] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1400)
    const t2 = setTimeout(() => setVisible(false), 1800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`boot-overlay${fading ? ' boot-overlay-fade' : ''}`}>
      <p className="boot-text">&gt; Initializing Gabriel.exe... OK</p>
    </div>
  )
}
