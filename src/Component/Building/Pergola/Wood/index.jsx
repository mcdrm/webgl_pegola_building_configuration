import Pillar from "./Pillar"
import Roof from "./Roof"
import Accessories from "./Accessories"
import { useSelector } from "react-redux"

const WoodPergola = () => {
    const isBuildingOnly = useSelector(state => state.buildingCtrl.isBuildingOnly)
    
    return (
        <>
            <Roof />
            <Pillar />
            { !isBuildingOnly && <Accessories />}
        </>
    )
}

export default WoodPergola