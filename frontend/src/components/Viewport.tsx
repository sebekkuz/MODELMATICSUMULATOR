import React from 'react'
import { Canvas } from '@react-three/fiber'

export function Viewport(){
  return <Canvas orthographic camera={{zoom:50, position:[0,0,100]}}>
    <ambientLight intensity={0.6} />
  </Canvas>
}
