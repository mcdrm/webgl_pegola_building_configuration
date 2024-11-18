import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import ControlPanel from "./ControlPanel"
import Env from "./Env"
import Building from "./Building"
import LoadingProgress from "./LoadingProgress"

const Component = () => {
    const isAllTextureLoaded = useSelector(state => state.texture.isAllTextureLoaded)
    const isAllModelLoaded = useSelector(state => state.glbModel.isAllModelLoaded)
    
    const [isReadyForCanvas, setIsReadyForCanvas] = useState(false);

    useEffect(() => {
        if (isAllTextureLoaded && isAllModelLoaded) {
            setTimeout(() => {setIsReadyForCanvas(true)}, "2500")
        }
        else setIsReadyForCanvas(false);
    }, [isAllTextureLoaded, isAllModelLoaded])

    return (
        <>
            { !isReadyForCanvas && <LoadingProgress /> }
            { isReadyForCanvas && <ControlPanel /> }
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
                    { isReadyForCanvas && <Building /> }
                </Suspense>
            </Canvas>
        </>
    )
}

export default Component