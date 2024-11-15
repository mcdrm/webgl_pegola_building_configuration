import { useEffect } from "react";
import { useThree } from "@react-three/fiber"
import { Center } from "@react-three/drei";

import Pergola from "./Pergola"
import Surface from "./Surface"
import { useSelector } from "react-redux";

const Building = () => {
    const { scene } = useThree();
    const buildingType = useSelector(state => state.buildingCtrl.buildingType)
    
    useEffect(() => {
        if (scene) {
            scene.traverse((mesh) => {
                if (mesh.isMesh) {
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                }
            })
        }
    }, [scene, buildingType])
    
    return (
        <Center rotation={[0, Math.PI, 0]}>
            <Pergola />
            <Surface />
        </Center>
    )
}

export default Building