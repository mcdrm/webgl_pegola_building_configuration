import * as THREE from 'three'
import { useMemo } from 'react';

import { extrudeSettings } from '../../../../../Utils/Function';
import { ConstProps, ConstWoodPergolaProps } from '../../../../../Utils/Constants';

const { width, length, overhang, freeOverhang, woodColor } = ConstProps;
const { roofBowHeight, thickness } = ConstWoodPergolaProps;

export const TrussModel = ({ modelLength, position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], map=null, bumpScale=0.5, roughness=0.7, metalness=0.3 }) => {
    const model = (size) => {
        
        const m = new THREE.Shape();
        m.moveTo(0, 0)
        m.lineTo(-(size / 2 + freeOverhang), 0)
        m.lineTo(-(size / 2 + freeOverhang + overhang / 2), 0)
        m.lineTo(-(size / 2 + freeOverhang + overhang), roofBowHeight / 3 * 2)
        m.lineTo(-(size / 2 + freeOverhang + overhang), roofBowHeight)
        m.lineTo((size / 2 + freeOverhang + overhang), roofBowHeight)
        m.lineTo((size / 2 + freeOverhang + overhang), roofBowHeight / 3 * 2)
        m.lineTo((size / 2 + freeOverhang + overhang / 2), 0)
        m.lineTo(size / 2 + freeOverhang, 0)
        m.closePath();

        return m;
    }

    return (
        <group position={position} rotation={rotation_1}>
            <group rotation={rotation_2}>
                <mesh position={[0, 0, -thickness / 2]}>
                    <extrudeGeometry args={[model(modelLength), extrudeSettings(thickness)]} />
                    <meshStandardMaterial color={woodColor} map={map} bumpMap={map} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                </mesh>
            </group>
            <BoltSphereModel dir={rotation_2} />
        </group>
    )
}

const BoltSphereModel = ({ dir }) => {
    const isAxisX = dir.length === 3 && dir.every((val, _) => val === 0);
    const boltDistance = 0.1;

    let initPos = width;
    if (isAxisX) initPos = width / 2 - 0.1;
    else initPos = length / 2 - 0.1;
    const initPosY = (roofBowHeight - boltDistance) / 2

    const spherePositions = isAxisX
        ? [
            // Left points along X-axis
            [(initPos), initPosY + boltDistance, 0],
            [(initPos - boltDistance), initPosY + boltDistance, 0],
            [(initPos), initPosY, 0],
            [(initPos - boltDistance), initPosY, 0],
            [(initPos - 1), roofBowHeight / 2, 0],
            [(initPos - 1 - boltDistance), roofBowHeight / 2, 0],
            // Right points along X-axis
            [-(initPos), initPosY + boltDistance, 0],
            [-(initPos - boltDistance), initPosY + boltDistance, 0],
            [-(initPos), initPosY, 0],
            [-(initPos - boltDistance), initPosY, 0],
            [-(initPos - 1), roofBowHeight / 2, 0],
            [-(initPos - 1 - boltDistance), roofBowHeight / 2, 0],
        ]
        : [
            // Left points along Z-axis
            [0, initPosY + boltDistance, (initPos)],
            [0, initPosY + boltDistance, (initPos - boltDistance)],
            [0, initPosY, (initPos)],
            [0, initPosY, (initPos - boltDistance)],
            [0, roofBowHeight / 2, (initPos - 0.6)],
            [0, roofBowHeight / 2, (initPos - 0.6 - boltDistance)],
            // Right points along Z-axis
            [0, initPosY + boltDistance, -(initPos)],
            [0, initPosY + boltDistance, -(initPos - boltDistance)],
            [0, initPosY, -(initPos)],
            [0, initPosY, -(initPos - boltDistance)],
            [0, roofBowHeight / 2, -(initPos - 0.6)],
            [0, roofBowHeight / 2, -(initPos - 0.6 - boltDistance)],
        ];

    return (
        <group>
            {spherePositions.map((position, index) => (
                <mesh key={index} position={position}>
                    <sphereGeometry args={[0.035, 16, 16]} />
                    <meshStandardMaterial color="#1F1F1F" roughness={0.2} metalness={0.3} />
                </mesh>
            ))}
        </group>
    );
};

export const PillarCorbelModel = ({ position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], map=null, bumpScale=0.5, roughness=0.7, metalness=0.3 }) => {
    const model = useMemo(() => {
        const m = new THREE.Shape();
        m.moveTo(0, 0);
        m.quadraticCurveTo(0.1, 0, 0.15, 0.2);
        m.quadraticCurveTo(0.2, 0.6, 0.4, 0.6);
        m.lineTo(0.4, 0.63)
        m.lineTo(0.2, 0.63)
        m.lineTo(0, 0.2)
        m.closePath();

        return m
    }, [])
    
    return (
        <group position={position} rotation={rotation_1}>
            <group rotation={rotation_2}>
                <mesh position={[0, 0, -thickness / 2]}>
                    <extrudeGeometry args={[model, extrudeSettings(thickness)]} />
                    <meshStandardMaterial color={woodColor} map={map} bumpMap={map} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                </mesh>
            </group>
        </group>
    )
}

export const RectModel = ({ modelSize, position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], map=null, bumpScale=0.5, roughness=0.7, metalness=0.3 }) => {
    return (
        <group position={position} rotation={rotation_1}>
            <mesh rotation={rotation_2}>
                <boxGeometry args={modelSize}/>
                <meshStandardMaterial color={woodColor} map={map} bumpMap={map} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
            </mesh>
        </group>
    )
}