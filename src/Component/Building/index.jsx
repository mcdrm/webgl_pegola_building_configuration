import { useEffect } from "react";
import { useThree } from "@react-three/fiber"

import Pergola from "./Pergola"
import Surface from "./Surface"

const Building = () => {
    const { scene } = useThree();
    
    useEffect(() => {
        if (scene) {
            scene.traverse((mesh) => {
                if (mesh.isMesh) {
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                }
            })
        }
    }, [scene])
    
    return (
        <group rotation={[0, Math.PI, 0]}>
            <Pergola />
            <Surface />
        </group>
    )
}

export default Building