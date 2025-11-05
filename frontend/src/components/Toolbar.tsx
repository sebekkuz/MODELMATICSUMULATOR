import React from 'react'
import { apiPost, apiGet } from '../lib/api'
import { useConsoleStore } from '../state/consoleStore'

export function Toolbar(){
  const add = useConsoleStore(s=>s.add)

  const call = async (path: string, body?: any)=>{
    try {
      const res = await apiPost(path, body)
      add(`[API] ${path} → ${JSON.stringify(res)}`)
    } catch (e:any) {
      add(`[API] ${path} ERROR: ${e.message}`)
    }
  }

  const check = async ()=>{
    try {
      const res = await apiGet('/api/health')
      add(`[API] /api/health → ${JSON.stringify(res)}`)
    } catch(e:any){
      add(`[API] /api/health ERROR: ${e.message}`)
    }
  }

  return <div style={{display:'flex', gap:8, alignItems:'center', padding:8, borderBottom:'1px solid #ddd'}}>
    <button onClick={()=>call('/api/sim/start')}>Start</button>
    <button onClick={()=>call('/api/sim/pause')}>Pauza</button>
    <button onClick={()=>call('/api/sim/reset')}>Reset</button>
    <span>Speed:</span>
    <select defaultValue="1" onChange={(e)=>call('/api/sim/speed', { value: Number(e.target.value) })}>
      <option value="1">x1</option>
      <option value="5">x5</option>
      <option value="10">x10</option>
    </select>
    <button onClick={check} style={{marginLeft: 'auto'}}>Sprawdź zdrowie API</button>
  </div>
}
