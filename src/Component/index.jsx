import { Canvas } from "@react-three/fiber"
import Building from "./Building"
import Env from "./Env"
import ControlPanel from "./ControlPanel"

const Component = () => {
    return (
        <div>
            <ControlPanel />
            <Canvas
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: false }}
                camera={{ position: [0, 20, -150], fov: 30 }}
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