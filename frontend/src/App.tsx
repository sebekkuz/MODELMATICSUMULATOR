import React from 'react'
import { Palette } from './components/Palette'
import { Viewport } from './components/Viewport'
import { PropertyPanel } from './components/PropertyPanel'
import { Toolbar } from './components/Toolbar'
import { Console } from './components/Console'
import { useWS } from './hooks/useWS'
import { ImportPanel } from './components/ImportPanel'
import { MetricsPanel } from './components/MetricsPanel'

export default function App() {
  useWS(true);
  return (
    <div style={{display:'grid', gridTemplateColumns:'260px 1fr 380px', gridTemplateRows:'48px 1fr 240px', height:'100vh'}}>
      <div style={{gridColumn:'1/4', gridRow:'1/2'}}><Toolbar/></div>
      <div style={{gridColumn:'1/2', gridRow:'2/3', borderRight:'1px solid #ddd'}}><Palette/></div>
      <div style={{gridColumn:'2/3', gridRow:'2/3', borderRight:'1px solid #ddd'}}><Viewport/></div>
      <div style={{gridColumn:'3/4', gridRow:'2/3'}}>
        <div style={{height:'50%', borderBottom:'1px solid #ddd'}}><ImportPanel/></div>
        <div style={{height:'50%'}}><MetricsPanel/></div>
      </div>
      <div style={{gridColumn:'1/4', gridRow:'3/4'}}><Console/></div>
    </div>
  )
}
