import { useEffect, useRef, useState } from 'react'

export function AudioManager({ started }) {
    const audioContext = useRef(null)
    const oscillator = useRef(null)
    const gainNode = useRef(null)

    useEffect(() => {
        if (started && !audioContext.current) {
            // Initialize Audio Context
            const AudioContext = window.AudioContext || window.webkitAudioContext
            audioContext.current = new AudioContext()

            // Create Oscillator for drone
            oscillator.current = audioContext.current.createOscillator()
            oscillator.current.type = 'sine'
            oscillator.current.frequency.setValueAtTime(60, audioContext.current.currentTime) // Low frequency drone

            // Create Gain Node for volume control
            gainNode.current = audioContext.current.createGain()
            gainNode.current.gain.setValueAtTime(0.1, audioContext.current.currentTime)

            // Connect
            oscillator.current.connect(gainNode.current)
            gainNode.current.connect(audioContext.current.destination)

            // Start
            oscillator.current.start()

            // Add a second oscillator for texture
            const osc2 = audioContext.current.createOscillator()
            osc2.type = 'triangle'
            osc2.frequency.setValueAtTime(65, audioContext.current.currentTime)
            const gain2 = audioContext.current.createGain()
            gain2.gain.setValueAtTime(0.05, audioContext.current.currentTime)
            osc2.connect(gain2)
            gain2.connect(audioContext.current.destination)
            osc2.start()
        }

        return () => {
            if (audioContext.current) {
                audioContext.current.close()
                audioContext.current = null
            }
        }
    }, [started])

    return null
}
