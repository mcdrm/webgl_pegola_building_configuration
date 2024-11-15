import * as THREE from 'three';
import { Base, Geometry, Subtraction } from "@react-three/csg";

import { extrudeSettings } from '../../../../../Utils/Function';
import { ConstProps, ConstStonePergolaProps } from '../../../../../Utils/Constants';

const { width, length, height } = ConstProps;
const { stonePergolaRoofHeight, ridgeCoverTopWidth, ridgeCoverSideWidth, ridgeCoverSideThickness } = ConstStonePergolaProps

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

export const CoverModel = ({ position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], roofMap=null, ridgeMap=null, interiorMap=null, bumpScale=2, roughness=0.7, metalness=0.3 }) => {
    const areaSizeW = width + 0.1;
    const areaSizeL = length + 0.1;
    
    const modelThickness = 0.015;
    const roofHeight = stonePergolaRoofHeight;
    const ridgeLength = areaSizeW / 3;
    const sideDst = (areaSizeW - ridgeLength) / 2;
    const angleEnd = Math.PI / 2 - Math.atan(roofHeight / (areaSizeL / 2));
    const angleSide = Math.PI / 2 - Math.atan(roofHeight / sideDst);

    const ridgeSideCoverAngle = Math.PI / 2 - Math.min(angleEnd, angleSide);
    const ridgeSideCoverSpaceHeight = ridgeCoverSideWidth * Math.tan(ridgeSideCoverAngle);
    const ridgeSideCoverLength = Math.sqrt(Math.pow(Math.sqrt(Math.pow(areaSizeL / 2, 2) + Math.pow(roofHeight, 2)), 2) + Math.pow(sideDst, 2))
    const roofCrossAngle = Math.asin(roofHeight / ridgeSideCoverLength)
    
    const modelEnd = new THREE.Shape();
    modelEnd.moveTo(-areaSizeW / 2, 0);
    modelEnd.lineTo(areaSizeW / 2, 0);
    modelEnd.lineTo(areaSizeW / 2 - sideDst, Math.sqrt(Math.pow(areaSizeL / 2, 2) + Math.pow(roofHeight, 2)));
    modelEnd.lineTo(-(areaSizeW / 2 - sideDst), Math.sqrt(Math.pow(areaSizeL / 2, 2) + Math.pow(roofHeight, 2)));
    modelEnd.closePath();

    const modelSide = new THREE.Shape();
    modelSide.moveTo(areaSizeL / 2, 0);
    modelSide.lineTo(-areaSizeL / 2, 0);
    modelSide.lineTo(0, Math.sqrt(Math.pow(sideDst, 2) + Math.pow(roofHeight, 2)));
    modelSide.closePath();

    const ridgeCoverSideModel = new THREE.Shape();
    ridgeCoverSideModel.moveTo(-ridgeCoverSideWidth, -ridgeSideCoverSpaceHeight);
    ridgeCoverSideModel.lineTo(0, 0);
    ridgeCoverSideModel.lineTo(ridgeCoverSideWidth, -ridgeSideCoverSpaceHeight);
    ridgeCoverSideModel.lineTo(ridgeCoverSideWidth, -ridgeSideCoverSpaceHeight + ridgeCoverSideThickness);
    ridgeCoverSideModel.lineTo(0, ridgeCoverSideThickness);
    ridgeCoverSideModel.lineTo(-ridgeCoverSideWidth, -ridgeSideCoverSpaceHeight + ridgeCoverSideThickness);
    ridgeCoverSideModel.closePath()

    const initAngle = Math.PI / 2 - Math.atan(areaSizeL / 2 / sideDst)
    const ridgeSideCoverGlobalAngle0 = new THREE.Euler(roofCrossAngle, 0, 0, 'XYZ')
    const ridgeSideCoverGlobalAngle1 = new THREE.Euler(0, initAngle, 0, 'XYZ')
    const ridgeSideCoverGlobalAngle2 = new THREE.Euler(0, initAngle + 0.008 + Math.PI / 2, 0, 'XYZ')
    const ridgeSideCoverGlobalAngle3 = new THREE.Euler(0, -initAngle, 0, 'XYZ')
    const ridgeSideCoverGlobalAngle4 = new THREE.Euler(0, -(initAngle + 0.008 + Math.PI / 2), 0, 'XYZ')
    
    const offset = 0.03;
    const ridgeTopCoverModel = new THREE.Shape();
    ridgeTopCoverModel.moveTo(-ridgeCoverTopWidth - offset, 0);
    ridgeTopCoverModel.lineTo(-ridgeCoverTopWidth, 0);
    ridgeTopCoverModel.quadraticCurveTo(-ridgeCoverTopWidth, ridgeCoverTopWidth / 2, 0, ridgeCoverTopWidth / 2);
    ridgeTopCoverModel.quadraticCurveTo(ridgeCoverTopWidth, ridgeCoverTopWidth / 2, ridgeCoverTopWidth, 0);
    ridgeTopCoverModel.lineTo(ridgeCoverTopWidth + offset, 0);
    ridgeTopCoverModel.quadraticCurveTo(ridgeCoverTopWidth + offset, (ridgeCoverTopWidth + offset) / 2, 0, (ridgeCoverTopWidth + offset) / 3 * 2);
    ridgeTopCoverModel.quadraticCurveTo(-(ridgeCoverTopWidth + offset), (ridgeCoverTopWidth + offset) / 2, -(ridgeCoverTopWidth + offset), 0);
    ridgeTopCoverModel.closePath();
    return (
        <group position={[0, height + 0.12, 0]}>
            <group name='outer-roof-panel'>
                <group name='front-cover' position={[0, 0, -areaSizeL / 2]} rotation={[angleEnd, 0, 0]}>
                    <mesh position={[0, 0, -modelThickness / 2]}>
                        <extrudeGeometry args={[modelEnd, extrudeSettings(modelThickness)]} />
                        <meshLambertMaterial color={'#DDDDDD'} map={roofMap} bumpMap={roofMap} bumpScale={bumpScale} /* roughness={roughness} metalness={metalness} */ />
                    </mesh>
                </group>
                <group name='back-cover' position={[0, 0, areaSizeL / 2]} rotation={[-angleEnd, 0, 0]}>
                    <mesh position={[0, 0, -modelThickness / 2]}>
                        <extrudeGeometry args={[modelEnd, extrudeSettings(modelThickness)]} />
                        <meshLambertMaterial color={'#DDDDDD'} map={roofMap} bumpMap={roofMap} bumpScale={bumpScale} /* roughness={roughness} metalness={metalness} */ />
                    </mesh>
                </group>
                <group name='left-cover' position={[areaSizeW / 2, 0, 0]} rotation={[0, 0, angleSide]}>
                    <mesh position={[-modelThickness / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <extrudeGeometry args={[modelSide, extrudeSettings(modelThickness)]} />
                        <meshLambertMaterial color={'#DDDDDD'} map={roofMap} bumpMap={roofMap} bumpScale={bumpScale} /* roughness={roughness} metalness={metalness} */ />
                    </mesh>
                </group>
                <group name='right-cover' position={[-areaSizeW / 2, 0, 0]} rotation={[0, 0, -angleSide]}>
                    <mesh position={[-modelThickness / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <extrudeGeometry args={[modelSide, extrudeSettings(modelThickness)]} />
                        <meshLambertMaterial color={'#DDDDDD'} map={roofMap} bumpMap={roofMap} bumpScale={bumpScale} /* roughness={roughness} metalness={metalness} */ />
                    </mesh>
                </group>
            </group>
            <group name='interior-roof-panel' position={[0, -0.015, 0]}>
                <group name='front-cover' position={[0, 0, -areaSizeL / 2]} rotation={[angleEnd, 0, 0]}>
                    <mesh position={[0, 0, -modelThickness / 2]}>
                        <extrudeGeometry args={[modelEnd, extrudeSettings(modelThickness)]} />
                        <meshStandardMaterial color={'#DDDDDD'} map={interiorMap} bumpMap={interiorMap} bumpScale={bumpScale} roughness={roughness} metalness={0.2} />
                    </mesh>
                </group>
                <group name='back-cover' position={[0, 0, areaSizeL / 2]} rotation={[-angleEnd, 0, 0]}>
                    <mesh position={[0, 0, -modelThickness / 2]}>
                        <extrudeGeometry args={[modelEnd, extrudeSettings(modelThickness)]} />
                        <meshStandardMaterial color={'#DDDDDD'} map={interiorMap} bumpMap={interiorMap} bumpScale={bumpScale} roughness={roughness} metalness={0.25} />
                    </mesh>
                </group>
                <group name='left-cover' position={[areaSizeW / 2, 0, 0]} rotation={[0, 0, angleSide]}>
                    <mesh position={[-modelThickness / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <extrudeGeometry args={[modelSide, extrudeSettings(modelThickness)]} />
                        <meshStandardMaterial color={'#DDDDDD'} map={interiorMap} bumpMap={interiorMap} bumpScale={bumpScale} roughness={roughness} metalness={0.15} />
                    </mesh>
                </group>
                <group name='right-cover' position={[-areaSizeW / 2, 0, 0]} rotation={[0, 0, -angleSide]}>
                    <mesh position={[-modelThickness / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <extrudeGeometry args={[modelSide, extrudeSettings(modelThickness)]} />
                        <meshStandardMaterial color={'#DDDDDD'} map={interiorMap} bumpMap={interiorMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                    </mesh>
                </group>
            </group>

            <group name='ridge-model-group' position={[0, roofHeight + 0.01, 0]}>
                <group name='B-L-cross-ridge-CSG' position={[ridgeLength / 2, 0.002, -modelThickness / 2]} rotation={ridgeSideCoverGlobalAngle1}>
                    <mesh>
                        <Geometry computeVertexNormals>
                            <Base rotation={ridgeSideCoverGlobalAngle0}>
                                <extrudeGeometry args={[ridgeCoverSideModel, extrudeSettings(ridgeSideCoverLength)]} />
                            </Base>
                            <Subtraction position={[0.01, -1, ridgeSideCoverLength + 0.02]} rotation={[0, -initAngle, 0, 'XYZ']} visible={false}>
                                <boxGeometry args={[1, 1, 0.25]}/>
                                <meshStandardMaterial color={'#828288'}bumpScale={bumpScale} roughness={roughness} metalness={0.5} />
                            </Subtraction>
                            <Subtraction position={[0.01, -1, ridgeSideCoverLength - 0.005]} rotation={[0, -initAngle-Math.PI / 2, 0, 'XYZ']} visible={false}>
                                <boxGeometry args={[1, 1, 0.25]}/>
                                <meshStandardMaterial color={'#5A5A5D'}bumpScale={bumpScale} roughness={roughness} metalness={0.5} />
                            </Subtraction>
                        </Geometry>
                        <meshStandardMaterial color={'#FFFFFF'} map={ridgeMap} bumpMap={ridgeMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                    </mesh>
                </group>
                <group name='F-L-cross-ridge-CSG' position={[ridgeLength / 2, 0, -modelThickness / 2]} rotation={ridgeSideCoverGlobalAngle2}>
                    <mesh>
                        <Geometry computeVertexNormals>
                            <Base rotation={ridgeSideCoverGlobalAngle0}>
                                <extrudeGeometry args={[ridgeCoverSideModel, extrudeSettings(ridgeSideCoverLength)]} />
                            </Base>
                            <Subtraction position={[0.01, -1, ridgeSideCoverLength + 0.01]} rotation={[0, -initAngle, 0, 'XYZ']} visible={false}>
                                <boxGeometry args={[1, 1, 0.25]}/>
                                <meshStandardMaterial color={'#828288'}bumpScale={bumpScale} roughness={roughness} metalness={0.5} />
                            </Subtraction>
                            <Subtraction position={[0.01, -1, ridgeSideCoverLength - 0.015]} rotation={[0, -initAngle-Math.PI / 2, 0, 'XYZ']} visible={false}>
                                <boxGeometry args={[1, 1, 0.25]}/>
                                <meshStandardMaterial color={'#5A5A5D'}bumpScale={bumpScale} roughness={roughness} metalness={0.5} />
                            </Subtraction>
                        </Geometry>
                        <meshStandardMaterial color={'#FFFFFF'} map={ridgeMap} bumpMap={ridgeMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                    </mesh>
                </group>
                <group name='B-R-cross-ridge-CSG' position={[-ridgeLength / 2, 0.002, -modelThickness / 2]} rotation={ridgeSideCoverGlobalAngle3}>
                    <mesh>
                        <Geometry computeVertexNormals>
                            <Base rotation={ridgeSideCoverGlobalAngle0}>
                                <extrudeGeometry args={[ridgeCoverSideModel, extrudeSettings(ridgeSideCoverLength)]} />
                            </Base>
                            <Subtraction position={[0.01, -1, ridgeSideCoverLength + 0.01]} rotation={[0, -initAngle, 0, 'XYZ']} visible={false}>
                                <boxGeometry args={[1, 1, 0.25]}/>
                                <meshStandardMaterial color={'#828288'}bumpScale={bumpScale} roughness={roughness} metalness={0.5} />
                            </Subtraction>
                            <Subtraction position={[0.01, -1, ridgeSideCoverLength + 0.005]} rotation={[0, -initAngle-Math.PI / 2, 0, 'XYZ']} visible={false}>
                                <boxGeometry args={[1, 1, 0.25]}/>
                                <meshStandardMaterial color={'#5A5A5D'}bumpScale={bumpScale} roughness={roughness} metalness={0.5} />
                            </Subtraction>
                        </Geometry>
                        <meshStandardMaterial color={'#FFFFFF'} map={ridgeMap} bumpMap={ridgeMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                    </mesh>
                </group>
                <group name='F-R-cross-ridge-CSG' position={[-ridgeLength / 2, 0, -modelThickness / 2]} rotation={ridgeSideCoverGlobalAngle4}>
                    <mesh>
                        <Geometry computeVertexNormals>
                            <Base rotation={ridgeSideCoverGlobalAngle0}>
                                <extrudeGeometry args={[ridgeCoverSideModel, extrudeSettings(ridgeSideCoverLength)]} />
                            </Base>
                            <Subtraction position={[0.01, -1, ridgeSideCoverLength + 0.005]} rotation={[0, -initAngle, 0, 'XYZ']} visible={false}>
                                <boxGeometry args={[1, 1, 0.25]}/>
                                <meshStandardMaterial color={'#828288'}bumpScale={bumpScale} roughness={roughness} metalness={0.5} />
                            </Subtraction>
                            <Subtraction position={[0.01, -1, ridgeSideCoverLength - 0.005]} rotation={[0, -initAngle-Math.PI / 2, 0, 'XYZ']} visible={false}>
                                <boxGeometry args={[1, 1, 0.25]}/>
                                <meshStandardMaterial color={'#5A5A5D'}bumpScale={bumpScale} roughness={roughness} metalness={0.5} />
                            </Subtraction>
                        </Geometry>
                        <meshStandardMaterial color={'#FFFFFF'} map={ridgeMap} bumpMap={ridgeMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                    </mesh>
                </group>
            </group>

            {/* <group name='side-cross-ridge' position={[0, roofHeight + 0.01, 0]}>
                <group name='B-L' position={[ridgeLength / 2, 0.002, -modelThickness / 2]} rotation={ridgeSideCoverGlobalAngle1}>
                    <mesh rotation={[roofCrossAngle, 0, -0.02]}>
                        <extrudeGeometry args={[ridgeCoverSideModel, extrudeSettings(ridgeSideCoverLength)]} />
                        <meshStandardMaterial color={'#FFFFFF'} map={ridgeMap} bumpMap={ridgeMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                    </mesh>
                </group>
                <group name='F-L' position={[ridgeLength / 2, 0, -modelThickness / 2]} rotation={ridgeSideCoverGlobalAngle2}>
                    <mesh rotation={[roofCrossAngle, 0, 0]}>
                        <extrudeGeometry args={[ridgeCoverSideModel, extrudeSettings(ridgeSideCoverLength)]} />
                        <meshStandardMaterial color={'#FFFFFF'} map={ridgeMap} bumpMap={ridgeMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                    </mesh>
                </group>
                <group name='B-R' position={[-ridgeLength / 2, 0.002, -modelThickness / 2]} rotation={ridgeSideCoverGlobalAngle3}>
                    <mesh rotation={[roofCrossAngle, 0, 0.02]}>
                        <extrudeGeometry args={[ridgeCoverSideModel, extrudeSettings(ridgeSideCoverLength)]} />
                        <meshStandardMaterial color={'#FFFFFF'} map={ridgeMap} bumpMap={ridgeMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                    </mesh>
                </group>
                <group name='F-R' position={[-ridgeLength / 2, 0, -modelThickness / 2]} rotation={ridgeSideCoverGlobalAngle4}>
                    <mesh rotation={[roofCrossAngle, 0, 0.02]}>
                        <extrudeGeometry args={[ridgeCoverSideModel, extrudeSettings(ridgeSideCoverLength)]} />
                        <meshStandardMaterial color={'#FFFFFF'} map={ridgeMap} bumpMap={ridgeMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
                    </mesh>
                </group>
            </group> */}
            <mesh name='top-ridge' position={[-ridgeLength / 2 - 0.1, roofHeight - 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
                <extrudeGeometry args={[ridgeTopCoverModel, extrudeSettings(ridgeLength + 0.2)]} />
                <meshStandardMaterial color={'#FFFFFF'} map={ridgeMap} bumpMap={ridgeMap} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
            </mesh>
        </group>
    )
}