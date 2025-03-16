import * as THREE from 'three'
import { useEffect } from "react";
import { useThree } from "@react-three/fiber"

import Pergola from "./Pergola"
import Surface from "./Surface"
import { useSelector } from "react-redux";

const Building = () => {
    const { scene } = useThree();
    const buildingType = useSelector(state => state.buildingCtrl.buildingType)
    const isFrameOnly = useSelector(state => state.buildingCtrl.isFrameOnly)
    const { width, length, height, pitch } = useSelector(state => state.buildingCtrl)
    
    useEffect(() => {
        if (scene) {
            scene.traverseVisible((mesh) => {
                if (mesh.isMesh) {
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                }
            })
        }
    }, [scene, buildingType, isFrameOnly, width, length, height, pitch])
    
    // const offset = 0.05
    // const coverModel = new THREE.Shape();
    // coverModel.moveTo(-(length / 2 + offset), 0);
    // coverModel.lineTo(-(length / 2 + offset), height + length * pitch / 12);
    // coverModel.lineTo((length / 2 + offset), height);
    // coverModel.lineTo((length / 2 + offset), 0);
    // coverModel.closePath();
    
    return (
        <group scale={0.5}>
            {/* <mesh position={[width / 2 + offset, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <extrudeGeometry args={[coverModel, { depth: width + offset * 2, bevelEnabled: false }]} />
                <meshBasicMaterial color="#0066FF" opacity={0.3} transparent />
            </mesh> */}
            
            <Pergola />
            <Surface />
        </group>
    )
}

export default Building