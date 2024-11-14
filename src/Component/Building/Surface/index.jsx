import React from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { ConstProps } from '../../../Utils/Constants';
import { textureAnisotropy } from '../../../Utils/Function';
    
const { width, length } = ConstProps;

const Surface = () => {
    const { gl } = useThree();
    const { surfaceTexture, grassTexture } = useSelector(state => state.texture.textureProps)
    
    const surfaceFloorTexture = surfaceTexture?.clone();
    textureAnisotropy(gl, surfaceFloorTexture, 1, 1, 0);
    const surfaceBorderTexture = surfaceTexture?.clone();
    textureAnisotropy(gl, surfaceBorderTexture, 15, 0.3, 0);
    const grassGroundTexture = grassTexture?.clone();
    textureAnisotropy(gl, grassTexture, 500, 500, 0);
    
    const overhangForPlane = 4
    const borderWidth = 0.15;
    const borderHeight = 0.1;
    
    return (
        <>
            <mesh name='surface-panel' position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[width + overhangForPlane, length + overhangForPlane]} />
                <meshStandardMaterial map={surfaceFloorTexture} bumpMap={surfaceFloorTexture} bumpScale={0.3} />
            </mesh>
            <mesh position={[-(width / 2 + overhangForPlane/ 2), borderHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[length + overhangForPlane - borderWidth, borderHeight, borderWidth]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
            <mesh position={[(width / 2 + overhangForPlane/ 2), borderHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[length + overhangForPlane - borderWidth, borderHeight, borderWidth]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.05, -(length / 2 + overhangForPlane/ 2)]}>
                <boxGeometry args={[width + overhangForPlane + borderWidth, borderHeight, borderWidth]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.05, (length / 2 + overhangForPlane/ 2)]}>
                <boxGeometry args={[width + overhangForPlane + borderWidth, borderHeight, borderWidth]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
            
            <mesh name='ground-panel' rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[600, 60]} />
                <meshStandardMaterial color={'#ACACAC'} map={grassGroundTexture} bumpMap={grassGroundTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
        </>
    )
}

export default Surface