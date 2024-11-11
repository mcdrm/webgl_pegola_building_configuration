import React from 'react'
import { ConstProps } from '../../../Utils/Constants';

const Surface = () => {
    const { width, length } = ConstProps;
    const overhangForPlane = 2

    return (
        <>
            <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[width + overhangForPlane, length + overhangForPlane]} />
                <meshStandardMaterial color={'black'} />
            </mesh>
            <mesh position={[-(width / 2 + overhangForPlane/ 2), 0.05, 0]}>
                <boxGeometry args={[0.15, 0.1, length + overhangForPlane + 0.1]} />
                <meshStandardMaterial color={'brown'} />
            </mesh>
            <mesh position={[(width / 2 + overhangForPlane/ 2), 0.05, 0]}>
                <boxGeometry args={[0.15, 0.1, length + overhangForPlane + 0.1]} />
                <meshStandardMaterial color={'brown'} />
            </mesh>
            <mesh position={[0, 0.05, -(length / 2 + overhangForPlane/ 2)]}>
                <boxGeometry args={[width + overhangForPlane + 0.1, 0.1, 0.15]} />
                <meshStandardMaterial color={'brown'} />
            </mesh>
            <mesh position={[0, 0.05, (length / 2 + overhangForPlane/ 2)]}>
                <boxGeometry args={[width + overhangForPlane + 0.1, 0.1, 0.15]} />
                <meshStandardMaterial color={'brown'} />
            </mesh>
            
            <mesh name='surface-panel' rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[600, 60]} />
                <meshStandardMaterial color={'grey'} />
            </mesh>
        </>
    )
}

export default Surface