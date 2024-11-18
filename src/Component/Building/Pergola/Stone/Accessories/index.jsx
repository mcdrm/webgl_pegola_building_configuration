import React from 'react'
import { useSelector } from 'react-redux'

const Accessories = () => {
    const sofaModel = useSelector(state => state.glbModel.sofaModel)
    // const matModel = useSelector(state => state.glbModel.matModel)
    // const tableModel_4 = useSelector(state => state.glbModel.tableModel_4)
    
    return sofaModel && (
        <>
            <primitive object={sofaModel.clone()} position={[1.9, 0, 0]} scale={0.03} />
            <primitive object={sofaModel.clone()} position={[-1.9, 0, 0]} rotation={[0, Math.PI, 0]} scale={0.03} />
            {/* <primitive object={matModel} position={[2.5, -0.15, 1.5]}  rotation={[0, Math.PI / 2, 0]} scale={[0.004, 0.004, 0.003]} /> */}
            {/* <primitive object={tableModel_4} position={[-1, 0.1, 0]}  rotation={[0, Math.PI / 2, 0]} scale={[0.0007, 0.0007, 0.0007]} /> */}
        </>
    )
}

export default Accessories