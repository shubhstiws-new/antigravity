import { FlyControls } from '@react-three/drei'

export function SpaceshipControls() {
    return (
        <FlyControls
            movementSpeed={10}
            rollSpeed={0.5}
            dragToLook={false} // Mouse look always on
        />
    )
}
