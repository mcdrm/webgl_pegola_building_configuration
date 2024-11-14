import { Canvas } from "@react-three/fiber"

import ControlPanel from "./ControlPanel"
import Env from "./Env"
import Building from "./Building"
import { Suspense, useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Component = () => {
    const textureProps = useSelector(state => state.texture.textureProps)

    const [isAllTextureLoaded, setIsAllTextureLoaded] = useState(false)
    
    useEffect(() => {
        if (Object.values(textureProps).some((item) => { return item === null })) {
            setIsAllTextureLoaded(true)
        }
    }, [textureProps])

    return isAllTextureLoaded && (
        <div>
            <ControlPanel />
            <Canvas
                shadows
                dpr={[1, 1.5]}
                // gl={{ antialias: false }}
                camera={{ position: [-10, 3, 15], fov: 30, near: 1, far: 100000 }}
                style={{
                    width: "100%",
                    height: "100vh",
                }}
            >
                <Suspense>
                    <Env />
                    <Building />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Component