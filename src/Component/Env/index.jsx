import { Environment, OrbitControls } from "@react-three/drei"
import { useSelector } from "react-redux";
import { ConstProps } from "../../Utils/Constants";

const { height } = ConstProps;

const Env = () => {
    // const envHDR = useEnvironment({ files: '/assets/env/env-1.hdr' })

    const isShowBg = useSelector(state => state.buildingCtrl.isShowBg)
    const isCamAutoRotate = useSelector(state => state.buildingCtrl.isCamAutoRotate)
    
    return (
        <>
            <Environment
                files={'/assets/env/env.hdr'}
                background
                backgroundIntensity={5}
                backgroundBlurriness={isShowBg ? 0 : 1}
                ground={isShowBg ? { height: 30, radius: 350, scale: 25 } : null}
            />
            <OrbitControls
                target={[0, height / 3, 0]}
                enablePan={false}
                autoRotate={isCamAutoRotate}
                rotateSpeed={0.6}
                dampingFactor={0.2}
                minPolarAngle={0}
                maxPolarAngle={isShowBg ? Math.PI / 2.1 : Infinity}
                minDistance={6}
                maxDistance={isShowBg ? 20 : 40}
            />
            <directionalLight
                position={[3, 5, 4]}
                intensity={3}
                castShadow
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
                shadow-camera-far={50}
                shadow-camera-left={-10}
            />
            <directionalLight position={[-3, 5, -4]} intensity={3.5} />

            <directionalLight position={[4, 0, -6]} intensity={0.02} />
            <directionalLight position={[-4, 0, 6]} intensity={0.02} />
            <directionalLight position={[-4, 0, 6]} intensity={0.02} />
            <directionalLight position={[4, 0, -6]} intensity={0.02} />
        </>
    )
}

export default Env