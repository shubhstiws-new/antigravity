import { useMemo, useRef, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

// Helper to generate random numbers in a range
const random = (min, max) => Math.random() * (max - min) + min

export function AsteroidField({ count = 2000 }) {
    const mesh = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate random data for asteroids
    const asteroids = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const radius = random(20, 300) // Distance from center
            const theta = random(0, 2 * Math.PI) // Angle
            const phi = random(0, 2 * Math.PI) // Vertical angle

            // Convert spherical to cartesian, but flattened for a "belt" feel
            // x = r * cos(theta)
            // z = r * sin(theta)
            // y = random spread

            const x = radius * Math.cos(theta)
            const z = radius * Math.sin(theta)
            const y = random(-20, 20) // Spread in height

            const scale = random(0.5, 3)

            temp.push({
                position: [x, y, z],
                rotation: [random(0, Math.PI), random(0, Math.PI), random(0, Math.PI)],
                scale: [scale, scale, scale],
                rotationSpeed: [random(-0.01, 0.01), random(-0.01, 0.01), random(-0.01, 0.01)]
            })
        }
        return temp
    }, [count])

    useLayoutEffect(() => {
        if (!mesh.current) return

        asteroids.forEach((data, i) => {
            dummy.position.set(...data.position)
            dummy.rotation.set(...data.rotation)
            dummy.scale.set(...data.scale)
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    }, [asteroids, dummy])

    useFrame(() => {
        if (!mesh.current) return

        // Optional: Slowly rotate individual asteroids
        // Note: Updating 2000 matrices per frame is expensive. 
        // For a static belt, we can skip this. 
        // Or we can rotate the entire group.

        // Let's just rotate the whole mesh slowly to simulate orbit
        mesh.current.rotation.y += 0.0001
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
                color="#444444"
                roughness={0.8}
                metalness={0.2}
                flatShading={true}
            />
        </instancedMesh>
    )
}
