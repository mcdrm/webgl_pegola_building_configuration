import { useDispatch } from "react-redux"
import { SvgBuilding, SvgImage, SvgRotate } from "../../Utils/SvgSource"
import { setBuildingType, setIsBackgroundShow, setIsCamAutoRotate } from "../../Redux/Features/BuildingCtrl/buildingCtrlSlice";

const ControlPanel = () => {
    const dispatch = useDispatch();
    
    const handleOptionClick = (type, value) => {
        if (type === 'building') {
            dispatch(setBuildingType(value));
        } else if (type === 'bgImage') {
            dispatch(setIsBackgroundShow());
        } else if (type === 'cam-rotate') {
            dispatch(setIsCamAutoRotate());
        }
    }
    
    return (
        <div className="building-controller">
            <div className="control-section">
                <button className="select-item" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>Dropup</span>
                    <SvgBuilding />
                </button>
                <ul className="dropdown-menu">
                    <li><span className="dropdown-item" href="#" onClick={() => handleOptionClick('building', 'wood')}>Wood Pergola</span></li>
                    <li><span className="dropdown-item" href="#" onClick={() => handleOptionClick('building', 'metal')}>Metal Pergola</span></li>
                    <li><span className="dropdown-item" href="#" onClick={() => handleOptionClick('building', 'stone')}>Stone Pergola</span></li>
                </ul>
                <div className="vl" />
                <div className="select-item" onClick={() => handleOptionClick('bgImage')}>
                    <span>Background</span>
                    <SvgImage />
                </div>
                <div className="vl" />
                <div className="select-item" onClick={() => handleOptionClick('cam-rotate')}>
                    <span>Rotate</span>
                    <SvgRotate />
                </div>
            </div>
        </div>
    )
}

export default ControlPanel