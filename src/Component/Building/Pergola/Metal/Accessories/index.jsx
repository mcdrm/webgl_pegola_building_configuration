import React from 'react'
import { useSelector } from 'react-redux'

const Accessories = () => {
    const lampModel = useSelector(state => state.glbModel.lampModel)
    const sofaModel_1 = useSelector(state => state.glbModel.sofaModel_1)
    const tableModel_1 = useSelector(state => state.glbModel.tableModel_1)
    
    return (
        <>
            <primitive object={lampModel} position={[4, 0, -3]} scale={0.1} />
            <primitive object={tableModel_1} position={[1, 0, -0.8]} scale={[1.5, 0.5, 1.5]} />
            <primitive object={sofaModel_1} position={[0.7, 0.14, 1]} rotation={[0, Math.PI / 2, 0]} scale={[0.6, 0.6, 0.8]} />
        </>
    )
}

export default Accessories