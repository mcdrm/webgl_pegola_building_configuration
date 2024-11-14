import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { ConstFenceProps, ConstProps, ConstStonePergolaProps } from '../../../../../Utils/Constants';
import { textureAnisotropy } from '../../../../../Utils/Function';

import { CoverModel, RectModel } from '../CommonModel';

const { width, length, height } = ConstProps;
const { pillarSize, roofUnderBowSize2, roofUnderBowSize1, roofUpperBowSize2, roofUpperBowSize1 } = ConstStonePergolaProps;
const { stoneFencePillarBaseSize } = ConstFenceProps;

const Roof = () => {
    const { gl } = useThree();
    const { woodTexture2, roofPanelTileTexture, roofRidgeTileTexture } = useSelector(state => state.texture.textureProps)
    
    const underBowTexture = woodTexture2?.clone();
    textureAnisotropy(gl, underBowTexture, 1, 1, Math.PI / 2);
    const upperBowTexture = woodTexture2?.clone();
    textureAnisotropy(gl, upperBowTexture, 1, 1, Math.PI / 2);
    if (upperBowTexture) upperBowTexture.offset.y = 0.5
    const roofTexture = roofPanelTileTexture?.clone();
    textureAnisotropy(gl, roofTexture, 0.2, 0.5, 0);
    const ridgeTexture = roofRidgeTileTexture?.clone();
    textureAnisotropy(gl, ridgeTexture, 3, 3, 0);
    if (ridgeTexture) ridgeTexture.offset.x = 0.5
    const interiorTexture = woodTexture2?.clone();
    textureAnisotropy(gl, interiorTexture, 0.5, 0.5, Math.PI / 2);

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
            <CoverModel roofMap={roofTexture} ridgeMap={ridgeTexture} interiorMap={interiorTexture} roughness={0.8} metalness={0.3}/>
        </>
    )
}

export default Roof