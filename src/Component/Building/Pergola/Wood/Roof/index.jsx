import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSettings, getDistanceAndCount } from '../../../../../Utils/Function';

const Roof = () => {
    const width = 60;
    const length = 40;
    const pitch = 1.5;
    const roofAlpha = Math.atan(pitch / 12);

    const overhang = 4;
    const height = 2.5;
    const thickness = 0.5;

    const mainRailModel = (size) => {
        const model = new THREE.Shape();
        model.moveTo(0, 0)
        model.lineTo(-size / 2, 0)
        model.lineTo(-(size / 2 + overhang / 2), 0)
        model.lineTo(-(size / 2 + overhang / 2), height / 10)
        model.lineTo(-(size / 2 + overhang), height / 3 * 2)
        model.lineTo(-(size / 2 + overhang), height)
        model.lineTo((size / 2 + overhang), height)
        model.lineTo((size / 2 + overhang), height / 3 * 2)
        model.lineTo((size / 2 + overhang / 2), height / 10)
        model.lineTo((size / 2 + overhang / 2), 0)
        model.lineTo(size / 2, 0)
        model.closePath();

        return model;
    }

    const verRectRailModelArr = useMemo(() => {
        const { distance, count } = getDistanceAndCount(4, width);

        let data = [];
        new Array(count + 1).fill("").forEach((_, index) => {
            data.push({
                length: length + overhang,
                pos_x: distance * index - width / 2,
                pos_y: width / 2 *  Math.tan(roofAlpha),
                alpha: roofAlpha
            })
        })

        return data
    }, [])

    const horRailModelArr = useMemo(() => {
        const { distance, count } = getDistanceAndCount(6, length);

        let data = [];
        new Array(count + 1).fill("").forEach((_, index) => {
            data.push({
                pos_y: (length * pitch / 12) / count * (count - index),
                pos_z: distance * index - length / 2,
            })
        })

        return data
    }, [])

    const verRailModelArr = useMemo(() => {
        const distance = 5;
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_x: (width / 2 - distance * index_j) * Math.pow(-1, index_i + 1),
                    pos_y: length / 2 *  Math.tan(roofAlpha),
                    alpha: roofAlpha
                })
            })
        })

        return data;
    }, [])

    
    return (
        <group position={[0, 0, 0]}>
            {verRectRailModelArr.map((item, index) => (
                <mesh key={`ver-rect-rail-model-${index}`} position={[item.pos_x, item.pos_y + height + 0.5, 0]} rotation={[item.alpha, 0, 0]}>
                    <boxGeometry args={[0.5, 0.5, item.length]} />
                    <meshStandardMaterial color={'green'} />
                </mesh>
            ))}

            {horRailModelArr.map((item, index) => (
                <mesh key={`hor-rail-model-${index}`} position={[0, item.pos_y + 1.5, item.pos_z]}>
                    <extrudeGeometry args={[mainRailModel(width), extrudeSettings(thickness)]} />
                    <meshStandardMaterial color={'green'} />
                </mesh>
            ))}

            {verRailModelArr.map((item, index) => (
                <group key={`ver-rail-model-${index}`} position={[item.pos_x, item.pos_y, 0]} rotation={[item.alpha, 0, 0]}>
                    <mesh rotation={[0, Math.PI / 2, 0]}>
                        <extrudeGeometry args={[mainRailModel(length), extrudeSettings(thickness)]} />
                        <meshStandardMaterial color={'green'} />
                    </mesh>
                </group>
            ))}
        </group>
    )
}

export default Roof