import { Environment, OrbitControls } from "@react-three/drei"

const Env = () => {
//   const envHDR = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })
    
    return (
        <>
            <Environment preset="city" background blur={1} />
            <OrbitControls
                // enablePan={false}
                autoRotate={false}
                dampingFactor={0.2}
                minPolarAngle={0}
                maxPolarAngle={Infinity}
            />
        </>
    )
}

export default Env