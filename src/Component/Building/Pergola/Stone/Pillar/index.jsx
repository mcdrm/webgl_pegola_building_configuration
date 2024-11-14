import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { ConstFenceProps, ConstProps, ConstStonePergolaProps } from '../../../../../Utils/Constants';
import { textureAnisotropy } from '../../../../../Utils/Function';

import { PillarCorbelModel, RectModel } from '../CommonModel';

const { width, length, height } = ConstProps;
const { pillarSize, pillarBaseSize, pillarHeight } = ConstStonePergolaProps;
const { stoneFencePillarBaseSize } = ConstFenceProps

const Pillar = () => {
    const { gl } = useThree();
    const { woodTexture2 } = useSelector(state => state.texture.textureProps)
    
    const pillarTexture = woodTexture2?.clone();
    textureAnisotropy(gl, pillarTexture, 1, 1, Math.PI / 2);

    const PillarModelInfoArr = useMemo(() => {
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    width: pillarSize,
                    length: pillarHeight,
                    height: pillarSize,
                    pos_x: (width / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_i),
                    pos_y: height / 3 + pillarHeight / 2,
                    pos_z: (length / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_j),
                    rotation_1: [Math.PI / 2, 0, 0],
                })
            })
        })
        
        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: pillarSize,
                length: pillarHeight,
                height: pillarSize,
                pos_x: (width / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index),
                pos_y: height / 3 + pillarHeight / 2,
                pos_z: 0,
                rotation_1: [Math.PI / 2, 0, 0],
            })
        })

        return data;
    }, [])

    const PillarBaseModelInfoArr = useMemo(() => {
        let data = [];

        const baseThickness = 0.2;
        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    width: pillarBaseSize,
                    length: baseThickness,
                    height: pillarBaseSize,
                    pos_x: (width / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_i),
                    pos_y: height / 3 + baseThickness / 2,
                    pos_z: (length / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_j),
                    rotation_1: [Math.PI / 2, 0, 0],
                })
            })
        })
        
        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: pillarBaseSize,
                length: baseThickness,
                height: pillarBaseSize,
                pos_x: (width / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index),
                pos_y: height / 3 + baseThickness / 2,
                pos_z: 0,
                rotation_1: [Math.PI / 2, 0, 0],
            })
        })

        return data;
    }, [])

    const PillarCorbelModelInfoArr = useMemo(() => {
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_x: (width / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_i),
                    pos_y: height,
                    pos_z: -pillarSize / 2 + (length / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * index_j,

                    rotation_1: [0, Math.PI / 2, 0]
                })
            })
        })

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_x: (width / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_i),
                    pos_y: height,
                    pos_z: pillarSize / 2 - (length / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * index_j,

                    rotation_1: [0, -Math.PI / 2, 0]
                })
            })
        })

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_x: (-width / 2 + (stoneFencePillarBaseSize - pillarSize) / 2 + pillarSize/ 2) * Math.pow(-1, index_i),
                    pos_y: height,
                    pos_z: (length / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_j),

                    rotation_1: [0, Math.PI * index_i, 0]
                })
            })
        })

        return data;
        
    }, [])
    
    return (
        <>
        <mesh>
        </mesh>
            {PillarModelInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} map={pillarTexture} roughness={0.8} metalness={0.3} />)}
            {PillarBaseModelInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} map={pillarTexture} roughness={0.8} metalness={0.7} />)}
            {PillarCorbelModelInfoArr.map((item, index) => <PillarCorbelModel key={`pillar-corbel-model-${index}`} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.rotation_1} map={pillarTexture} roughness={0.8} metalness={0.3} /> )}

        </>
    )
}

export default Pillar