import { Environment, OrbitControls } from "@react-three/drei"

const Env = () => {
    // const envHDR = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })

    return (
        <>
            <Environment preset="city" background backgroundBlurriness={1} backgroundIntensity={2} />
            <OrbitControls
                // enablePan={false}
                autoRotate={false}
                dampingFactor={0.2}
                minPolarAngle={0}
                maxPolarAngle={Infinity}
            />
            {/* <directionalLight
                position={[5, 5, 4]}
                intensity={1}
                castShadow
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
                shadow-camera-far={50}
                shadow-camera-left={-10}
            /> */}
            <directionalLight
                position={[-3, 8, -10]}
                intensity={1}
                castShadow
            />
            {/* <fogExp2 attach='fog' color={'#E4E4E4'} near={300} far={350} density={0.01} /> */}
        </>
    )
}

export default Env