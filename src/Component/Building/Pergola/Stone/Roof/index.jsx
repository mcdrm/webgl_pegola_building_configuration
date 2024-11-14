import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { ConstProps, ConstStonePergolaProps } from '../../../../../Utils/Constants';
import { textureAnisotropy } from '../../../../../Utils/Function';

import { RectModel } from '../CommonModel';

const { width, length } = ConstProps;
const { height, pillarSize, roofUnderBowSize2, roofUnderBowSize1, roofUpperBowSize2, roofUpperBowSize1, stoneFencePillarBaseSize } = ConstStonePergolaProps;

const Roof = () => {
    const { gl } = useThree();
    const { woodTexture2 } = useSelector(state => state.texture.textureProps)
    
    const underBowTexture = woodTexture2?.clone();
    textureAnisotropy(gl, underBowTexture, 1, 1, Math.PI / 2);
    const upperBowTexture = woodTexture2?.clone();
    textureAnisotropy(gl, underBowTexture, 1, 1, Math.PI / 2);
    upperBowTexture.offset.y = 0.5

    const RoofUnderBowInfoArr = useMemo(() => {
        let data = [];
        const offset = 0.05;

        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: roofUnderBowSize1,
                length: roofUnderBowSize2,
                height: length - roofUnderBowSize1 * 2 - offset,

                pos_x: (width / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * (index === 0 ? 1 : -1),
                pos_y: height,
                pos_z: 0,
            })
        })
        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: width - offset,
                length: roofUnderBowSize2,
                height: roofUnderBowSize1,

                pos_x: 0,
                pos_y: height,
                pos_z: (length / 2 - (stoneFencePillarBaseSize - pillarSize) / 2) * (index === 0 ? 1 : -1),
            })
        })

        return data;
    }, [])

    const RoofUpperBowInfoArr = useMemo(() => {
        let data = [];
        const offset = 0.025;

        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: roofUpperBowSize1,
                length: roofUpperBowSize2,
                height: length - roofUpperBowSize1 * 2 + roofUpperBowSize1 / 3,

                pos_x: (width / 2 - roofUpperBowSize1 / 3) * (index === 0 ? 1 : -1),
                pos_y: height + roofUnderBowSize2 + offset,
                pos_z: 0,
            })
        })
        new Array(2).fill("").forEach((_, index) => {
            data.push({
                width: width + roofUpperBowSize1 / 3,
                length: roofUpperBowSize2,
                height: roofUpperBowSize1,

                pos_x: 0,
                pos_y: height + roofUnderBowSize2 + offset,
                pos_z: (length / 2 - roofUpperBowSize1 / 3) * (index === 0 ? 1 : -1),
            })
        })

        return data;
    }, [])
    
    return (
        <>
            {RoofUnderBowInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} map={underBowTexture} roughness={0.8} metalness={0.5} />)}
            {RoofUpperBowInfoArr.map((item, index) => <RectModel key={`pillar-base-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} map={upperBowTexture} roughness={0.8} metalness={0.3} />)}
        </>
    )
}

export default Roof