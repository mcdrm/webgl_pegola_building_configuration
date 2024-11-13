import * as THREE from 'three';

import { ConstMetalPergolaProps, ConstProps } from "../../../../../Utils/Constants";
import { extrudeSettings } from '../../../../../Utils/Function';

const { length, pitch } = ConstProps
const { pillarSize, pillarGapSize } = ConstMetalPergolaProps;

export const PillarModel = ({ modelLength, position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], map=null, bumpScale=0, roughness=0.2, metalness=0.1 }) => {
    const model = new THREE.Shape();
    model.moveTo(-(pillarSize / 2 - pillarGapSize), -pillarSize / 2);
    model.lineTo((pillarSize / 2 - pillarGapSize), -pillarSize / 2);
    model.lineTo((pillarSize / 2 - pillarGapSize), -(pillarSize / 2 - pillarGapSize));
    model.lineTo((pillarSize / 2), -(pillarSize / 2 - pillarGapSize));
    model.lineTo((pillarSize / 2), (pillarSize / 2 - pillarGapSize));
    model.lineTo((pillarSize / 2 - pillarGapSize), (pillarSize / 2 - pillarGapSize));
    model.lineTo((pillarSize / 2 - pillarGapSize), (pillarSize / 2));
    model.lineTo(-(pillarSize / 2 - pillarGapSize), (pillarSize / 2));
    model.lineTo(-(pillarSize / 2 - pillarGapSize), (pillarSize / 2 - pillarGapSize));
    model.lineTo(-(pillarSize / 2), (pillarSize / 2 - pillarGapSize));
    model.lineTo(-(pillarSize / 2), -(pillarSize / 2 - pillarGapSize));
    model.closePath()

    return (
        <group position={position} rotation={rotation_1}>
            <mesh rotation={rotation_2}>
                <extrudeGeometry args={[model, extrudeSettings(modelLength)]} />
                <meshStandardMaterial map={map} bumpMap={map} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
            </mesh>
        </group>
    )
}

export const SideBowTrussModel = ({ modelHeight, modelThickness, position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], color='white', map=null, bumpScale=0, roughness=0.2, metalness=0.1, opacity=1, transparent=false }) => {
    const modelWidth = length - pillarSize * 2;
    
    const model = new THREE.Shape();
    model.moveTo(0, 0);
    model.lineTo(0, -modelHeight);
    model.lineTo(modelWidth, length * pitch / 12 - modelHeight);
    model.lineTo(modelWidth, length * pitch / 12);
    model.closePath();

    return (
        <group position={[-modelThickness / 2, 0, 0]}>
            <group position={position} rotation={rotation_1}>
                <mesh rotation={rotation_2}>
                    <extrudeGeometry args={[model, extrudeSettings(modelThickness)]} />
                    <meshStandardMaterial color={color} map={map} bumpMap={map} bumpScale={bumpScale} roughness={roughness} metalness={metalness} opacity={opacity} transparent={transparent} />
                </mesh>
            </group>
        </group>
    )
}

export const RectModel = ({ modelSize, position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], color='white', map=null, bumpScale=0, roughness=0.2, metalness=0.1, opacity=1, transparent=false }) => {
    return (
        <group position={position} rotation={rotation_1}>
            <mesh rotation={rotation_2}>
                <boxGeometry args={modelSize}/>
                <meshStandardMaterial color={color} map={map} bumpMap={map} bumpScale={bumpScale} roughness={roughness} metalness={metalness} opacity={opacity} transparent={transparent} />
            </mesh>
        </group>
    )
}