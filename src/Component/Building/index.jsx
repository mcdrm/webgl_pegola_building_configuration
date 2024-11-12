import { useThree } from "@react-three/fiber"
import { useEffect } from "react";

import Pergola from "./Pergola"
import Surface from "./Surface"
import { ConstProps } from "../../Utils/Constants";
import Fence from "./Fence";

const Building = () => {
    const { scene } = useThree();
    const { height } = ConstProps
    
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
        <group position={[0, -height / 5 * 2, 0]}>
            <Pergola />
            <Fence />
            <Surface />
        </group>
    )
}

export default Building