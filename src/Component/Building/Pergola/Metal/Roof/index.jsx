import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { ConstMetalPergolaProps, ConstProps } from '../../../../../Utils/Constants';
import { getDistanceAndCount, textureAnisotropy } from '../../../../../Utils/Function';

import { RectModel, SideBowTrussModel } from '../CommonModel';

const { width, length, height, pitch, roofAlpha } = ConstProps;
const { pillarSize, pillarGapSize, endRoofBowHeight, sideRoofBowHeight } = ConstMetalPergolaProps;

const Roof = () => {
    const { gl } = useThree();
    const { metalTexture } = useSelector(state => state.texture.textureProps)
    
    const roofCoverModelTexture = metalTexture?.clone();
    textureAnisotropy(gl, roofCoverModelTexture, 0.01, 1, 0.15);

    const endBowTrussTexture = metalTexture?.clone();
    textureAnisotropy(gl, endBowTrussTexture, 0.01, 1, 0);
    if (endBowTrussTexture) endBowTrussTexture.offset.y = 0.3;

    const sideBowTrussTexture = metalTexture?.clone();
    textureAnisotropy(gl, sideBowTrussTexture, 0.01, 1, roofAlpha);
    if (sideBowTrussTexture) sideBowTrussTexture.offset.y = 0.5;

    const frontGlassTrimTexture = metalTexture?.clone();
    textureAnisotropy(gl, frontGlassTrimTexture, 0.01, 1, 0);
    if (frontGlassTrimTexture) frontGlassTrimTexture.offset.y = 0.1;

    const RoofCoverModelInfoArr = useMemo(() => {
        const initDistance = 0.3
        const modelWidth = initDistance / 5 * 4;
        const modellength = length - pillarSize * 2;
        const modelHeight = 0.05;
        const { distance, count } = getDistanceAndCount(initDistance, width - pillarSize * 2);

        let data = [];
        new Array(count).fill("").forEach((_, index) => {
            data.push({
                width: modelWidth,
                length: modelHeight,
                height: modellength,
                pos_x: width/ 2 - distance * index - initDistance - 0.05,
                pos_y: height + length / 2 *  Math.tan(roofAlpha) - modelHeight * 2,
                pos_z: 0,
                rotation_1: [roofAlpha, 0, 0],
                rotation_2: [0, 0, Math.PI / 4],
            })
        })

        return data
    }, [])
    
    const EndBowModelInfoArr = useMemo(() => {
        let data = []

        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: width - pillarSize * 2 + pillarGapSize * 2,
                length: endRoofBowHeight,
                height: pillarSize,

                pos_x: 0,
                pos_y: height + length * pitch / 12 * index - endRoofBowHeight / 2,
                pos_z: (length / 2 - pillarSize / 2) * Math.pow(-1, index),
            })
        })

        return data;
    }, [])

    const SideBowModelInfoArr = useMemo(() => {
        let data = []

        new Array(2).fill("").forEach((_, index) => {
            data.push({
                modelHeight: sideRoofBowHeight,
                modelThickness: pillarSize / 3 * 2,
                pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index),
                pos_y: height,
                pos_z: length / 2 - pillarSize,
                rotation_1: [0, Math.PI / 2, 0]
            })
        })

        return data;
    }, [])

    const SideGlassTrimModelInfoArr = useMemo(() => {
        let data = []

        new Array(2).fill("").forEach((_, index) => {
            data.push({
                modelHeight: 0.05,
                modelThickness: pillarSize - pillarGapSize * 2,
                pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index),
                pos_y: height - 0.6 - 0.4 * index,
                pos_z: length / 2 - pillarSize,
                rotation_1: [0, Math.PI / 2, 0]
            })
        })

        return data;
    }, [])

    const SideGlassModelInfoArr = useMemo(() => {
        let data = []

        new Array(2).fill("").forEach((_, index) => {
            data.push({
                modelHeight: 0.6 + 0.4 * index - sideRoofBowHeight,
                modelThickness: pillarSize - pillarGapSize * 3,
                pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index),
                pos_y: height - sideRoofBowHeight,
                pos_z: length / 2 - pillarSize,
                rotation_1: [0, Math.PI / 2, 0],
            })
        })

        return data;
    }, [])
    
    const frontGlassTrimHeight = 0.15;
    const frontGlassTrimDst = 0.45;
    const FrontGlassTrimModelInfoArr = useMemo(() => {
        let data = []


        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: width - pillarSize * 2,
                length: frontGlassTrimHeight - frontGlassTrimHeight / 2 * index,
                height: pillarSize - pillarGapSize * 2,

                pos_x: 0,
                pos_y: height + length * pitch / 12 - endRoofBowHeight - frontGlassTrimHeight / 2 - frontGlassTrimDst * index,
                pos_z: -(length / 2 - pillarSize / 2),
            })
        })

        return data;
    }, [])
    
    const FrontGlassModelInfoArr = useMemo(() => {
        let data = []

        const glassHeight = frontGlassTrimDst - frontGlassTrimHeight / 2 - frontGlassTrimHeight / 4
        data.push({
            width: width - pillarSize * 2,
            length: glassHeight,
            height: pillarSize - pillarGapSize * 2,

            pos_x: 0,
            pos_y: height + length * pitch / 12 - endRoofBowHeight - frontGlassTrimHeight - glassHeight / 2,
            pos_z: -(length / 2 - pillarSize / 2),
        })

        return data;
    }, [])
    
    return (
        <>
            {RoofCoverModelInfoArr.map((item, index) => <RectModel key={`rect-top-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.rotation_1} rotation_2={item.rotation_2} map={roofCoverModelTexture} />)}
            {EndBowModelInfoArr.map((item, index) => <RectModel key={`end-bow-truss-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} map={endBowTrussTexture} />)}
            {SideBowModelInfoArr.map((item, index) => <SideBowTrussModel key={`side-bow-truss-model-${index}`} modelHeight={item.modelHeight} modelThickness={item.modelThickness} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.rotation_1} map={sideBowTrussTexture} />)}
            {SideGlassTrimModelInfoArr.map((item, index) => <SideBowTrussModel key={`side-glass-trim-model-${index}`} modelHeight={item.modelHeight} modelThickness={item.modelThickness} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.rotation_1} map={sideBowTrussTexture} />)}
            {SideGlassModelInfoArr.map((item, index) => <SideBowTrussModel key={`side-glass-model-${index}`} modelHeight={item.modelHeight} modelThickness={item.modelThickness} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.rotation_1} color='#3c3c3c' roughness={0.1} opacity={0.5} transparent={true} />)}
            {FrontGlassTrimModelInfoArr.map((item, index) => <RectModel key={`front-glass-trim-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} map={frontGlassTrimTexture} />)}
            {FrontGlassModelInfoArr.map((item, index) => <RectModel key={`side-glass-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} color='#3c3c3c' roughness={0.1} opacity={0.5} transparent={true} />)}
        </>
    )
}

export default Roof