import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { textureAnisotropy } from '../../../../../Utils/Function';
import { ConstProps, ConstMetalPergolaProps } from '../../../../../Utils/Constants';

import { PillarModel, RectModel } from '../CommonModel';

const { width, length, height, pitch } = ConstProps;
const { pillarSize, pillarBaseSize } = ConstMetalPergolaProps;

const Pillar = () => {
    const { gl } = useThree();
    const { metalTexture } = useSelector(state => state.texture.textureProps)
    
    const metalPillarTexture = metalTexture?.clone();
    textureAnisotropy(gl, metalPillarTexture, 0.01, 5, Math.PI / 2);
    if (metalPillarTexture) metalPillarTexture.offset.y = 0.3
    
    const PillarModelInfoArr = useMemo(() => {
        let data = [];
        let pillarHeight = 0;

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                if (index_j === 0) pillarHeight = height;
                else pillarHeight = height + length * pitch / 12;
                data.push({
                    length: pillarHeight,
                    pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index_i),
                    pos_y: 0,
                    pos_z: (length / 2 - pillarSize / 2) * Math.pow(-1, index_j),
                    rotation_1: [-Math.PI / 2, 0, 0]
                })
            })
        })

        return data;
    }, [])

    const PillarBaseModelInfoArr = useMemo(() => {
        let data = [];
        const modelHeight = 0.07;

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    width: pillarBaseSize,
                    length: pillarBaseSize,
                    height: modelHeight,
                    pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index_i),
                    pos_y: modelHeight / 2,
                    pos_z: (length / 2 - pillarSize / 2) * Math.pow(-1, index_j),
                })
            })
        })

        return data;
    }, [])

    return (
        <>
            {PillarModelInfoArr.map((item, index) => <PillarModel key={`pillar-model-${index}`} modelLength={item.length} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.rotation_1} map={metalPillarTexture} />)}
            {PillarBaseModelInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={[Math.PI / 2, 0, 0]} map={metalPillarTexture} metalness={0.9} />)}
        </>
    )
}

export default Pillar