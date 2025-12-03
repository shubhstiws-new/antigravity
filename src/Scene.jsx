import { Stars } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Color, FogExp2 } from 'three'
import { AsteroidField } from './components/AsteroidField'
import { SpaceshipControls } from './components/SpaceshipControls'
import { Effects } from './components/Effects'

export function Scene() {
    const { scene } = useThree()

    useEffect(() => {
        scene.background = new Color('#020202')
        scene.fog = new FogExp2('#020202', 0.002) // Exponential fog for better depth
    }, [scene])

    return (
        <>
            <ambientLight intensity={0.05} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />

            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <AsteroidField count={4000} />
            <SpaceshipControls />
            <Effects />
        </>
    )
}
