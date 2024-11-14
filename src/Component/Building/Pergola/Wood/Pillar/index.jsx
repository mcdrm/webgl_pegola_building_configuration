/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { ConstProps, ConstWoodPergolaProps } from '../../../../../Utils/Constants';
import { textureAnisotropy } from '../../../../../Utils/Function';

import { RectModel, PillarCorbelModel } from '../CommonModel';

const { width, length, height, pitch } = ConstProps;
const { pillarSize, pillarBaseSize } = ConstWoodPergolaProps;

const Pillar = () => {
    const { gl } = useThree();
    const { woodTexture1 } = useSelector(state => state.texture.textureProps)
    
    const woodPillarTexture = woodTexture1?.clone();
    textureAnisotropy(gl, woodPillarTexture, 1, 1, Math.PI / 2);
    const woodCorbelTexture = woodTexture1?.clone();
    textureAnisotropy(gl, woodCorbelTexture, 1, 1, Math.PI / 2);
    
    const PillarModelInfoArr = useMemo(() => {
        let data = [];
        let pillarHeight = 0;

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                if (index_j === 0) pillarHeight = height + pillarSize * pitch / 12;
                else pillarHeight = height + length * pitch / 12;
                data.push({
                    width: pillarSize,
                    length: pillarHeight,
                    height: pillarSize,
                    pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index_i),
                    pos_y: pillarHeight / 2,
                    pos_z: (length / 2 - pillarSize / 2) * Math.pow(-1, index_j),
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

    const PillarCorbelModelInfoArr = useMemo(() => {
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_x: (width / 2 - pillarSize) * Math.pow(-1, index_j),
                    pos_y: height - (index_i === 0 ? 0.83 : 0.37),
                    pos_z: (length / 2 - pillarSize / 2) * Math.pow(-1, 0) * (index_i === 0 ? 1 : -1),
                    angle: [0, (index_j === 0 ? Math.PI : 0), 0]
                })
            })
        })
        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index_j),
                    pos_y: height - (index_i === 0 ? 0.55 : 0.2),
                    pos_z: (length / 2 - pillarSize) * Math.pow(-1, 0) * (index_i === 0 ? 1 : -1),
                    angle: [0, (index_i === 0 ? Math.PI / 2 : -Math.PI / 2), 0]
                })
            })
        })

        return data
    }, [])
    
    return (
        <>
            {PillarModelInfoArr.map((item, index) => <RectModel key={`pillar-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} map={woodPillarTexture} />)}
            {PillarBaseModelInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={[Math.PI / 2, 0, 0]} map={woodPillarTexture} metalness={0.9} />)}
            {PillarCorbelModelInfoArr.map((item, index) => <PillarCorbelModel key={`pillar-cobel-model-${index}`} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.angle} map={woodCorbelTexture} />)}
        </>
    )
}

export default Pillar