import React from 'react'

import WoodPergola from './Wood'
import MetalPergola from './Metal'
import StonePergola from './Stone'
import { useSelector } from 'react-redux'

const Pergola = () => {
  const buildingType = useSelector(state => state.buildingCtrl.buildingType)

  return (
        <>
            { buildingType === 'wood' && <WoodPergola /> }
            { buildingType === 'metal' && <MetalPergola /> }
            { buildingType === 'stone' && <StonePergola /> }
        </>
  )
}

export default Pergola