import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Scene } from './Scene'
import { Overlay } from './components/Overlay'
import { AudioManager } from './components/AudioManager'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        gl={{ antialias: false, stencil: false, depth: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <Overlay started={started} setStarted={setStarted} />
      <AudioManager started={started} />
    </>
  )
}

export default App
