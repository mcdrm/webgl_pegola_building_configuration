import React from 'react'
import { useSelector } from 'react-redux'

const Accessories = () => {
    const potModel = useSelector(state => state.glbModel.potModel)
    const tableModel = useSelector(state => state.glbModel.tableModel_3)
    
    return potModel && tableModel && (
        <>
            <primitive object={potModel.clone()} position={[-4, 0, -3]} scale={0.015} />
            <primitive object={potModel.clone()} position={[4, 0, -3]} scale={0.015} />
            <primitive object={tableModel} position={[0, 0.1, 0]} scale={1.6} />
        </>
    )
}

export default Accessories