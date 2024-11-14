import React, { useMemo } from 'react'
import { useThree } from '@react-three/fiber';
import { useSelector } from 'react-redux';

import { ConstFenceProps, ConstProps, ConstWoodPergolaProps } from '../../../../../../Utils/Constants';
import { textureAnisotropy } from '../../../../../../Utils/Function';

import { RectModel } from '../CommonModel';

const { width, length, height } = ConstProps;
const { pillarSize } = ConstWoodPergolaProps
const { stoneFencePillarSize, stoneFencePillarHeight, stoneFencePillarBaseHeight } = ConstFenceProps

const Wall = () => {
    const { gl } = useThree();
    const { marbleTexture, stoneWallTexture } = useSelector(state => state.texture.textureProps)
    
    const wallTexture = stoneWallTexture?.clone();
    textureAnisotropy(gl, wallTexture, 5, 1.5, Math.PI);
    const wallTopPanelTexture = marbleTexture?.clone();
    textureAnisotropy(gl, wallTopPanelTexture, 0.1, 1, Math.PI);

    const WallModelInfoArr = useMemo(() => {
        let data = [];
        const modelWidth = stoneFencePillarSize / 7 * 3
        const modelLength = stoneFencePillarHeight / 3 * 2

        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: modelWidth,
                length: modelLength,
                height: length - stoneFencePillarSize,
                pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index) ,
                pos_y: height / 3 - modelLength,
                pos_z: 0,
                rotation_1: [0, 0, 0]
            })
        })
        data.push({
            width: modelWidth,
            length: modelLength,
            height: width - stoneFencePillarSize,
            pos_x: 0 ,
            pos_y: height / 3 - modelLength,
            pos_z: (length / 2 - pillarSize / 2),
            rotation_1: [0, Math.PI / 2, 0]
        })

        return data;
    }, [])

    const WallTopPanelModelInfoArr = useMemo(() => {
        let data = [];
        const modelWidth = stoneFencePillarSize / 7 * 4
        const modelLength = stoneFencePillarBaseHeight

        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: modelWidth,
                length: modelLength,
                height: length - stoneFencePillarSize,
                pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index) ,
                pos_y: stoneFencePillarHeight / 3 * 2,
                pos_z: 0,
                rotation_1: [0, 0, 0]
            })
        })
        data.push({
            width: modelWidth,
            length: modelLength,
            height: width - stoneFencePillarSize,
            pos_x: 0 ,
            pos_y: stoneFencePillarHeight / 3 * 2,
            pos_z: (length / 2 - pillarSize / 2),
            rotation_1: [0, Math.PI / 2, 0]
        })

        return data;
    }, [])

    return (
        <>
            {WallModelInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.rotation_1} map={wallTexture} bumpScale={0.5} roughness={0.8} metalness={0.8} />)}
            {WallTopPanelModelInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.rotation_1} map={wallTopPanelTexture} bumpScale={0.5} roughness={0.2} metalness={0.3} />)}
        </>
    )
}

export default Wall