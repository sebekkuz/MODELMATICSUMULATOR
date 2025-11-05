import React from 'react'
import { Palette } from './components/Palette'
import { Viewport } from './components/Viewport'
import { PropertyPanel } from './components/PropertyPanel'
import { Toolbar } from './components/Toolbar'
import { Console } from './components/Console'
import { useWS } from './hooks/useWS'

export default function App() {
  useWS(true);
  return (
    <div style={{display:'grid', gridTemplateColumns:'240px 1fr 320px', gridTemplateRows:'48px 1fr 200px', height:'100vh'}}>
      <div style={{gridColumn:'1/4', gridRow:'1/2'}}><Toolbar/></div>
      <div style={{gridColumn:'1/2', gridRow:'2/3', borderRight:'1px solid #ddd'}}><Palette/></div>
      <div style={{gridColumn:'2/3', gridRow:'2/3', borderRight:'1px solid #ddd'}}><Viewport/></div>
      <div style={{gridColumn:'3/4', gridRow:'2/3'}}><PropertyPanel/></div>
      <div style={{gridColumn:'1/4', gridRow:'3/4'}}><Console/></div>
    </div>
  )
}
