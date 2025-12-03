import { EffectComposer, Noise, Vignette, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function Effects() {
    return (
        <EffectComposer>
            <Noise opacity={0.1} blendFunction={BlendFunction.OVERLAY} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.025} height={300} intensity={0.5} />
        </EffectComposer>
    )
}
