import * as THREE from 'three';
import { extrudeSettings } from '../../../../../Utils/Function';

export const RectModel = ({ modelSize, position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], color='white', map=null, bumpScale=0.5, roughness=0.7, metalness=0.3 }) => {
    return (
        <group position={position} rotation={rotation_1}>
            <mesh rotation={rotation_2}>
                <boxGeometry args={modelSize}/>
                <meshStandardMaterial color={color} map={map} bumpMap={map} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
            </mesh>
        </group>
    )
}

export const PillarCorbelModel = ({ position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], color='white', map=null, bumpScale=0.5, roughness=0.7, metalness=0.3 }) => {
    const modelThickness = 0.05;

    const dstW = 0.2;
    const dstH = 0.35;
    const patternDst = dstH / 3;
    const offset = 0.005;
    
    const model = new THREE.Shape();
    model.moveTo(0, -dstH);
    model.lineTo(dstW, 0);
    model.lineTo(dstW + patternDst, 0);
    model.quadraticCurveTo(dstW + patternDst + offset, -patternDst + offset, dstW + patternDst / 4, -patternDst);
    model.lineTo(patternDst - offset * 2, -dstH);
    model.quadraticCurveTo(patternDst + offset, -dstH - patternDst - offset, 0, -dstH - patternDst);
    model.closePath();
    
    return (
        <group position={position} rotation={rotation_1}>
            <group rotation={rotation_2}>
                <mesh position={[0, 0, -modelThickness / 2]}>
                    <extrudeGeometry args={[model, extrudeSettings(modelThickness)]} />
                    <meshStandardMaterial color={color} map={map} bumpMap={map} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                </mesh>
            </group>
        </group>
    )
}