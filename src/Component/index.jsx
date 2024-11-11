import { Canvas } from "@react-three/fiber"

import ControlPanel from "./ControlPanel"
import Env from "./Env"
import Building from "./Building"

const Component = () => {
    return (
        <div>
            <ControlPanel />
            <Canvas
                shadows
                dpr={[1, 1.5]}
                // gl={{ antialias: false }}
                camera={{ position: [15, 5, -20], fov: 30, near: 1, far: 100000 }}
                style={{
                    width: "100%",
                    height: "100vh",
                }}
            >
                <Env />
                <Building />
            </Canvas>
        </div>
    )
}

export default Component