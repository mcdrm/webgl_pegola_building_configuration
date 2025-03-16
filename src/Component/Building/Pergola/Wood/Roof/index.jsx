/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useThree } from '@react-three/fiber';

import { getDistanceAndCount, textureAnisotropy } from '../../../../../Utils/Function';
import { ConstProps, ConstWoodPergolaProps } from '../../../../../Utils/Constants';

import { TrussModel, RectModel } from '../CommonModel';

const { overhang, freeOverhang } = ConstProps;
const { roofBowHeight, pillarSize } = ConstWoodPergolaProps;

const Roof = () => {
    const { gl } = useThree();
    const { woodTexture1 } = useSelector(state => state.texture.textureProps)
    const { width, length, height, pitch } = useSelector(state => state.buildingCtrl)
    
    const roofAlpha = Math.atan(pitch / 12);
    
    const woodTopTexture = woodTexture1?.clone();
    textureAnisotropy(gl, woodTopTexture, 1, 1, 0);
    const woodBaseBowTexture = woodTexture1?.clone();
    textureAnisotropy(gl, woodBaseBowTexture, 1, 1, Math.PI / 2);
    const trussTexture = woodTexture1?.clone();
    textureAnisotropy(gl, trussTexture, 0.01, 2, 0);

    const RectTrussInfoArr_1_side = useMemo(() => {
        const { distance, count } = getDistanceAndCount(0.4, width);
        const modelSize = 0.05

        let data = [];
        new Array(count + 1).fill("").forEach((_, index) => {
            data.push({
                width: modelSize,
                length: modelSize,
                height: Math.sqrt(Math.pow(length, 2) + Math.pow(length * pitch / 12, 2)) + overhang + freeOverhang,
                pos_x: distance * index - width / 2,
                pos_y: roofBowHeight * 2 - modelSize + length / 2 * pitch / 12,
                pos_z: 0,
                alpha: [roofAlpha, 0, 0]
            })
        })

        return data
    }, [width, length, height, pitch])

    const RectTrussInfoArr_2_side = useMemo(() => {
        let data = [];

        new Array(2).fill("").forEach((_, index) => {            
            data.push({
                width: pillarSize,
                length: roofBowHeight / 5 * 4,
                height: Math.sqrt(Math.pow(length, 2) + Math.pow(length * pitch / 12, 2)) + overhang + freeOverhang,
                pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index),
                pos_y: pillarSize / 2 + length / 2 * pitch / 12 - 0.05,
                pos_z: 0,
                alpha: [roofAlpha, 0, 0]
            })
        })
        new Array(2).fill("").forEach((_, index) => {            
            data.push({
                width: pillarSize,
                length: roofBowHeight / 5 * 4,
                height: width - pillarSize * 2,
                pos_x: 0,
                pos_y: -pillarSize / 2 + (index === 1 ? length * pitch / 12 : 0),
                pos_z: (length / 2 - pillarSize / 2) * Math.pow(-1, index),
                alpha: [0, Math.PI / 2, 0]
            })
        })

        return data;
    }, [width, length, height, pitch])

    const TrussInfoArr_1_end = useMemo(() => {
        const { distance, count } = getDistanceAndCount(0.6, length);

        let data = [];
        new Array(count + 1).fill("").forEach((_, index) => {
            data.push({
                pos_y: (length * pitch / 12) / count * (count - index) + roofBowHeight / 4 * 3,
                pos_z: distance * index - length / 2,
            })
        })

        return data
    }, [width, length, height, pitch])

    const TrussInfoArr_2_side = useMemo(() => {
        const distance = 0.3;
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_x: (width / 2 - distance * index_j) * Math.pow(-1, index_i + 1),
                    pos_y: length / 2 *  Math.tan(roofAlpha),
                    alpha_local: [roofAlpha, 0, 0],
                    alpha_global: [0, Math.PI / 2, 0]
                })
            })
        })

        return data;
    }, [width, length, height, pitch])

    const TrussInfoArr_3_end = useMemo(() => {
        const distance = 0.3;
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_y: -pillarSize + 0.05 + (index_i === 0 ? length * pitch / 12 : 0),
                    pos_z: (length / 2 - distance * index_j) * Math.pow(-1, index_i + 1),
                })
            })
        })

        return data;
    }, [width, length, height, pitch])
    
    return (
        <group position={[0, height, 0]}>
            {RectTrussInfoArr_1_side.map((item, index) => <RectModel key={`rect-top-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.alpha} map={woodTopTexture} />)}
            {RectTrussInfoArr_2_side.map((item, index) => <RectModel key={`rect-edge-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.alpha} map={woodBaseBowTexture} />)}
            {TrussInfoArr_1_end.map((item, index) => <TrussModel key={`hor-rail-model-${index}`} modelLength={width} position={[0, item.pos_y, item.pos_z]} map={trussTexture} />)}
            {TrussInfoArr_2_side.map((item, index) => <TrussModel key={`ver-rail-model-${index}`} modelLength={Math.sqrt(Math.pow(length, 2) + Math.pow(length * pitch / 12, 2)) + overhang + freeOverhang} position={[item.pos_x, item.pos_y, 0]} rotation_1={item.alpha_local} rotation_2={item.alpha_global} map={trussTexture} />)}
            {TrussInfoArr_3_end.map((item, index) => <TrussModel key={`hor-rail-model-${index}`} modelLength={width} position={[0, item.pos_y, item.pos_z]} map={trussTexture} />)}
        </group>
    )
}

export default Roof