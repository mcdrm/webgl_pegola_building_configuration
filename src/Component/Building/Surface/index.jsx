import React from 'react'

const Surface = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[60, 40]} />
            <meshStandardMaterial color={'#0066FF'} />
        </mesh>
    )
}

export default Surface