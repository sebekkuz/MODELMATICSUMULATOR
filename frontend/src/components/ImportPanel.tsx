import React, { useRef, useState } from 'react'
import { apiPost, apiGet } from '../lib/api'
import { useConsoleStore } from '../state/consoleStore'

function readFileAsText(f: File): Promise<string>{
  return new Promise((res,rej)=>{
    const r = new FileReader()
    r.onload = ()=> res(String(r.result||''))
    r.onerror = rej
    r.readAsText(f)
  })
}

export function ImportPanel(){
  const add = useConsoleStore(s=>s.add)
  const [summary, setSummary] = useState<any>(null)

  const send = async (path:string, file: File|null)=>{
    if(!file){ add(`[IMPORT] Wybierz plik`); return }
    const csv = await readFileAsText(file)
    try{
      // Możesz też wysłać raw text/plain (csv) — backend to obsłuży
      const res = await apiPost(path, { csv })
      setSummary(res)
      add(`[IMPORT] ${path} OK: ${JSON.stringify(res)}`)
    }catch(e:any){
      add(`[IMPORT] ${path} ERROR: ${e.message}`)
    }
  }

  const refFn = useRef<HTMLInputElement>(null)
  const refHs = useRef<HTMLInputElement>(null)
  const refMrp = useRef<HTMLInputElement>(null)

  return <div style={{padding:8, overflow:'auto', height:'100%'}}>
    <h3>Import CSV</h3>
    <div style={{display:'grid', gap:8}}>
      <label>Funkcje CSV <input ref={refFn} type="file" accept=".csv"/></label>
      <button onClick={()=>send('/api/import/functions', refFn.current?.files?.[0] || null)}>Wyślij Funkcje</button>

      <label>Obudowy CSV <input ref={refHs} type="file" accept=".csv"/></label>
      <button onClick={()=>send('/api/import/housings', refHs.current?.files?.[0] || null)}>Wyślij Obudowy</button>

      <label>MRP CSV <input ref={refMrp} type="file" accept=".csv"/></label>
      <button onClick={()=>send('/api/import/mrp', refMrp.current?.files?.[0] || null)}>Wyślij MRP</button>

      <button onClick={async ()=>{ const s = await apiGet('/api/import/summary'); setSummary(s); }}>Pokaż podsumowanie</button>
    </div>
    <pre style={{whiteSpace:'pre-wrap', fontSize:12, marginTop:8}}>{summary ? JSON.stringify(summary,null,2) : 'Brak danych'}</pre>
  </div>
}
