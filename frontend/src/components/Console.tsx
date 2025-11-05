import React from 'react'
import { useConsoleStore } from '../state/consoleStore'

export function Console(){
  const msgs = useConsoleStore(s=>s.messages)
  return <div style={{padding:8, height:'100%', overflow:'auto'}}>
    <h3>Konsola</h3>
    <div style={{fontFamily:'monospace', whiteSpace:'pre-wrap'}}>
      {msgs.map(m => <div key={m.ts}>{new Date(m.ts).toLocaleTimeString()} — {m.text}</div>)}
    </div>
  </div>
}
