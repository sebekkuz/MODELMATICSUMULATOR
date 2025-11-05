import React from 'react'

export function Toolbar(){
  return <div style={{display:'flex', gap:8, alignItems:'center', padding:8, borderBottom:'1px solid #ddd'}}>
    <button>Start</button>
    <button>Pauza</button>
    <button>Reset</button>
    <span>Speed:</span>
    <select defaultValue="1">
      <option value="1">x1</option>
      <option value="5">x5</option>
      <option value="10">x10</option>
    </select>
  </div>
}
