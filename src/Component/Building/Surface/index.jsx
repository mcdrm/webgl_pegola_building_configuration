import React, { useEffect, useState } from 'react'
import { ConstProps } from '../../../Utils/Constants';
import { textureAnisotropy } from '../../../Utils/Function';
import { useThree } from '@react-three/fiber';
import { useSelector } from 'react-redux';
    
const { width, length } = ConstProps;

const Surface = () => {
    const { gl } = useThree();
    const { surfaceTexture, woodTexture } = useSelector(state => state.texture);
    console.log('surfaceTexture, woodTexture: ', surfaceTexture, woodTexture);
    
    const overhangForPlane = 2
    const surfaceFloorTexture = surfaceTexture?.clone();
    const surfaceBorderTexture = surfaceTexture?.clone();

    useEffect(() => {
        textureAnisotropy(gl, surfaceFloorTexture, 1, 1, 0);
        textureAnisotropy(gl, surfaceBorderTexture, 1, 0.05, 0);
    }, [])

    return (
        <>
            {/* <mesh name='surface-panel' position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[width + overhangForPlane, length + overhangForPlane]} />
                <meshStandardMaterial map={surfaceFloorTexture} bumpMap={surfaceFloorTexture} bumpScale={0.3} />
            </mesh>
            <mesh position={[-(width / 2 + overhangForPlane/ 2), 0.05, 0]}>
                <boxGeometry args={[0.15, 0.1, length + overhangForPlane + 0.15]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[(width / 2 + overhangForPlane/ 2), 0.05, 0]}>
                <boxGeometry args={[0.15, 0.1, length + overhangForPlane + 0.15]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.05, -(length / 2 + overhangForPlane/ 2)]}>
                <boxGeometry args={[width + overhangForPlane + 0.15, 0.1, 0.15]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.05, (length / 2 + overhangForPlane/ 2)]}>
                <boxGeometry args={[width + overhangForPlane + 0.15, 0.1, 0.15]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.7} />
            </mesh>
            
            <mesh name='ground-panel' rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[600, 60]} />
                <meshStandardMaterial color={'grey'} />
            </mesh> */}
        </>
    )
}

export default Surface