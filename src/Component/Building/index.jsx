import { useThree } from "@react-three/fiber"
import Pergola from "./Pergola"
import Surface from "./Surface"
import { useEffect } from "react";

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
        <group position={[0, -2, 0]}>
            <Pergola />
            <Surface />
        </group>
    )
}

export default Building