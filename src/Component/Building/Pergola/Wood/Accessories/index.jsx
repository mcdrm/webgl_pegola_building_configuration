import React from 'react'
import { useSelector } from 'react-redux'

const Accessories = () => {
    const potModel_1 = useSelector(state => state.glbModel.potModel_1)
    const tableModel = useSelector(state => state.glbModel.tableModel_3)
    
    return potModel_1 && tableModel && (
        <>
            <primitive object={potModel_1.clone()} position={[-4, 0, -3]} scale={0.015} />
            <primitive object={potModel_1.clone()} position={[4, 0, -3]} scale={0.015} />
            <primitive object={tableModel} position={[1.5, 1.6, -4.5]} scale={15} />
        </>
    )
}

export default Accessories