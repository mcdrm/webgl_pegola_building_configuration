import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { getDistanceAndCount, textureAnisotropy } from '../../../../../Utils/Function';
import { ConstMetalPergolaProps, ConstProps } from '../../../../../Utils/Constants';

import { RectModel } from '../CommonModel';

const { width, length, height } = ConstProps;
const { pillarSize, endRoofBowHeight } = ConstMetalPergolaProps;

const Wall = () => {
    const { gl } = useThree();
    const { metalTexture } = useSelector(state => state.texture.textureProps)
    
    const horRailModelTexture = metalTexture?.clone();
    textureAnisotropy(gl, horRailModelTexture, 0.01, 1, 0);
    const verRailModelTexture = metalTexture?.clone();
    textureAnisotropy(gl, verRailModelTexture, 0.01, 1, Math.PI / 2);

    const HorRailModelInfoArr = useMemo(() => {
        const initDistance = 0.2;
        const modelWidth = (width - pillarSize * 2) / 3;
        const modelHeight = initDistance / 4 * 3;
        const modelThickness = 0.05;
        const { distance, count } = getDistanceAndCount(initDistance, height - endRoofBowHeight - (initDistance - modelHeight));

        let data = [];
        new Array(2).fill("").forEach((_, index_i) => {
            new Array(count).fill("").forEach((_, index_j) => {
                data.push({
                    width: modelWidth,
                    length: modelThickness,
                    height: modelHeight,
                    pos_x: (width / 2 - pillarSize - modelWidth / 2) * (index_i === 0 ? 1 : -1),
                    pos_y: height - endRoofBowHeight - modelHeight / 2 - distance * index_j - modelThickness / 2,
                    pos_z: length / 2 - endRoofBowHeight / 2,
                    angle: [Math.PI / 2, 0, 0]
                })
            })
        })
        data.push({
            width: width - pillarSize * 2,
            length: modelThickness * 1.5,
            height: modelThickness * 2,
            pos_x: 0,
            pos_y: modelThickness * 2,
            pos_z: length / 2 - endRoofBowHeight / 2,
            angle: [Math.PI / 2, 0, 0]
        })

        return data
    }, [])

    const VerRailModelInfoArr = useMemo(() => {        
        let data = [];
        const modelWidth = 0.05;
        const modelThickness = modelWidth * 1.5;
        const modelHeight = height - endRoofBowHeight - 0.1;

        new Array(2).fill("").forEach((_, index_i) => {
            data.push({
                width: modelWidth,
                length: modelHeight,
                height: modelThickness,
                pos_x: (width / 6 - modelWidth / 2 - 0.05) * (index_i === 0 ? 1 : -1),
                pos_y: modelHeight / 2 + 0.15,
                pos_z: length / 2 - endRoofBowHeight / 2,
                angle: [0, 0, 0]
            })
        })

        return data;
    }, [])
    
    return (
        <>
            {HorRailModelInfoArr.map((item, index) => <RectModel key={`rect-top-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.angle} map={horRailModelTexture} />)}
            {VerRailModelInfoArr.map((item, index) => <RectModel key={`rect-top-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.angle} map={verRailModelTexture} />)}
        </>
    )
}

export default Wall