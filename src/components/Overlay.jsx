export function Overlay({ started, setStarted }) {
    if (started) return null

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            zIndex: 1000,
            cursor: 'pointer',
            flexDirection: 'column',
            fontFamily: 'monospace'
        }} onClick={() => setStarted(true)}>
            <h1>ASTEROID BELT</h1>
            <p>Click to Enter Simulation</p>
            <p style={{ fontSize: '0.8em', opacity: 0.7 }}>Use WASD + Mouse to fly</p>
        </div>
    )
}
