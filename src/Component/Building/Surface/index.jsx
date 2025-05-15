import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { textureAnisotropy } from '../../../Utils/Function';

const Surface = () => {
    const { gl } = useThree();
    const { surfaceTexture, grassTexture } = useSelector(state => state.texture.textureProps)
    const { width, length } = useSelector(state => state.buildingCtrl)
    console.log({ width, length});
    const isShowGrass = useSelector(state => state.buildingCtrl.isShowGrass)
    
    const surfaceFloorTexture = surfaceTexture?.clone();
    const surfaceBorderTexture = surfaceTexture?.clone();
    const grassGroundTexture = grassTexture?.clone();

    useEffect(() => {
        if (gl && surfaceFloorTexture && surfaceBorderTexture && grassTexture) {
            textureAnisotropy(gl, surfaceFloorTexture, 1, 1, 0);
            textureAnisotropy(gl, surfaceBorderTexture, 15, 0.3, 0);
            textureAnisotropy(gl, grassTexture, 500, 500, 0);
        }
    }, [gl, surfaceFloorTexture, surfaceBorderTexture, grassTexture])
    
    const overhangForPlane = 4
    const borderWidth = 0.15;
    const borderHeight = 0.1;
    
    return (
        <>
            <mesh name='surface-panel' rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[width + overhangForPlane, length + overhangForPlane]} />
                <meshStandardMaterial map={surfaceFloorTexture} bumpMap={surfaceFloorTexture} bumpScale={0.3} metalness={0.3} />
            </mesh>
            <mesh position={[-(width / 2 + overhangForPlane/ 2), borderHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[length + overhangForPlane - borderWidth, borderHeight, borderWidth]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
            <mesh position={[(width / 2 + overhangForPlane/ 2), borderHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[length + overhangForPlane - borderWidth, borderHeight, borderWidth]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
            <mesh position={[0, borderHeight / 2, -(length / 2 + overhangForPlane/ 2)]}>
                <boxGeometry args={[width + overhangForPlane + borderWidth, borderHeight, borderWidth]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
            <mesh position={[0, borderHeight / 2, (length / 2 + overhangForPlane/ 2)]}>
                <boxGeometry args={[width + overhangForPlane + borderWidth, borderHeight, borderWidth]} />
                <meshStandardMaterial map={surfaceBorderTexture} bumpMap={surfaceBorderTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
            
            <mesh name='grass-ground-panel' receiveShadow position={[0, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={isShowGrass}>
                <circleGeometry args={[300, 60]} />
                <meshStandardMaterial color={'#ACACAC'} map={grassGroundTexture} bumpMap={grassGroundTexture} bumpScale={0.3} metalness={0.9} />
            </mesh>
        </>
    )
}

export default Surface