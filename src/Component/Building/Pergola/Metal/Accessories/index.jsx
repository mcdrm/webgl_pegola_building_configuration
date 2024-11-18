import React from 'react'
import { useSelector } from 'react-redux'

const Accessories = () => {
    const lampModel = useSelector(state => state.glbModel.lampModel)
    const tableModel_1 = useSelector(state => state.glbModel.tableModel_1)
    const tableModel_2 = useSelector(state => state.glbModel.tableModel_2)
    
    return (
        <>
            <primitive object={lampModel} position={[4, 0, -3]} scale={0.1} />
            <primitive object={tableModel_1} position={[1.8, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <primitive object={tableModel_2} position={[-0.5, 0, 0]} scale={0.0015} />
        </>
    )
}

export default Accessories