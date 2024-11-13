import React, { useMemo } from 'react'
import { ConstProps, ConstFenceProps, ConstWoodPergolaProps } from '../../../../Utils/Constants';
import { RectModel } from '../CommonModel';
import { useThree } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { textureAnisotropy } from '../../../../Utils/Function';

const { width, length, height } = ConstProps;
const { pillarSize } = ConstWoodPergolaProps
const { stonePillarBaseSize, stonePillarSize, stonePillarBaseHeight, stonePillarHeight } = ConstFenceProps

const Pillar = () => {
    const { gl } = useThree();
    const { marbleTexture, stoneWallTexture } = useSelector(state => state.texture.textureProps)
    
    const stonePillarBaseTexture = marbleTexture?.clone();
    textureAnisotropy(gl, stonePillarBaseTexture, 1, 1, Math.PI);
    const stonePillarTexture = stoneWallTexture?.clone();
    textureAnisotropy(gl, stonePillarTexture, 0.35, 1, Math.PI);
    // const stonePillarTexture = null;
    
    const StonePillarBaseModelInfoArr = useMemo(() => {
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    width: stonePillarBaseSize,
                    length: stonePillarBaseHeight,
                    height: stonePillarBaseSize,
                    pos_x: (width / 2 - (stonePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_i),
                    pos_y: height / 3 + stonePillarBaseHeight / 2,
                    pos_z: (length / 2 - (stonePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_j),
                })
            })
        })

        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: stonePillarBaseSize,
                length: stonePillarBaseHeight,
                height: stonePillarBaseSize,
                pos_x: (width / 2 - (stonePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index),
                pos_y: height / 3 + stonePillarBaseHeight / 2,
                pos_z: 0,
            })
        })

        return data;
    }, [])

    const StonePillarModelInfoArr = useMemo(() => {
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    width: stonePillarSize,
                    length: stonePillarHeight,
                    height: stonePillarSize,
                    pos_x: (width / 2 - (stonePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_i),
                    pos_y: height / 3 - stonePillarHeight / 2,
                    pos_z: (length / 2 - (stonePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index_j),
                    rotation_1: [Math.PI / 2, 0, 0],
                })
            })
        })
        
        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: stonePillarSize,
                length: stonePillarHeight,
                height: stonePillarSize,
                pos_x: (width / 2 - (stonePillarBaseSize - pillarSize) / 2) * Math.pow(-1, index),
                pos_y: height / 3 - stonePillarHeight / 2,
                pos_z: 0,
                rotation_1: [Math.PI / 2, 0, 0],
            })
        })

        return data;
    }, [])

    return (
        <>
            {StonePillarBaseModelInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} map={stonePillarBaseTexture} roughness={0.2} metalness={0.3} />)}
            {StonePillarModelInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} map={stonePillarTexture} bumpScale={0.5} roughness={0.8} metalness={0.1} />)}
        </>
    )
}

export default Pillar