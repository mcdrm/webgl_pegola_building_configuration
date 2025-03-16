import { useDispatch, useSelector } from "react-redux"

import { setBuildingType, setIsShowBg, setIsCamAutoRotate, setIsFrameOnly, setIsShowGrass } from "../../Redux/Features/BuildingCtrl/buildingCtrlSlice";
import { SvgBuilding, SvgFrameOnly, SvgGrass, SvgImage, SvgRotate } from "../../Utils/SvgSource"

const ControlPanel = () => {
    const dispatch = useDispatch();

    const isShowBg = useSelector(state => state.buildingCtrl.isShowBg)
    const isCamAutoRotate = useSelector(state => state.buildingCtrl.isCamAutoRotate)
    const isFrameOnly = useSelector(state => state.buildingCtrl.isFrameOnly)
    const isShowGrass = useSelector(state => state.buildingCtrl.isShowGrass)
    
    const handleOptionClick = (type, value) => {
        if (type === 'building') {
            dispatch(setBuildingType(value));
        } else if (type === 'bgImage') {
            dispatch(setIsShowBg());
            dispatch(setIsShowGrass(false));
        } else if (type === 'cam-rotate') {
            dispatch(setIsCamAutoRotate());
        } else if (type === 'frame-only') {
            dispatch(setIsFrameOnly());
        } else if (type === 'grass-floor') {
            dispatch(setIsShowGrass());
        }
    }
    
    return (
        <div className="building-controller">
            <div className="bottom-section">
                <button className="select-item" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>Pergola</span>
                    <SvgBuilding />
                </button>
                <ul className="dropdown-menu">
                    <li><span className="dropdown-item" onClick={() => handleOptionClick('building', 'wood')}>● Type 1</span></li>
                    <li><span className="dropdown-item" onClick={() => handleOptionClick('building', 'metal')}>● Type 2</span></li>
                    <li><span className="dropdown-item" onClick={() => handleOptionClick('building', 'stone')}>● Type 3</span></li>
                </ul>
                <div className="vl" />
                <div className={isShowBg ? "select-item isSelected" : "select-item"} onClick={() => handleOptionClick('bgImage')}>
                    <span>Background</span>
                    <SvgImage color={isShowBg ? '#0066FF' : '#3C3C3C'} />
                </div>
                <div className="vl" />
                <div className={isCamAutoRotate ? "select-item isSelected" : "select-item"} onClick={() => handleOptionClick('cam-rotate')}>
                    <span>Rotate</span>
                    <SvgRotate color={isCamAutoRotate ? '#0066FF' : '#3C3C3C'} />
                </div>
                {/* <div className="vl" />
                <div className={isFrameOnly ? "select-item isSelected" : "select-item"} onClick={() => handleOptionClick('frame-only')}>
                    <span>Frame only</span>
                    <SvgFrameOnly color={isFrameOnly ? '#0066FF' : '#3C3C3C'} />
                </div> */}
                <div className="vl" />
                <button className={isShowGrass ? "select-item isSelected" : isShowBg ? "select-item isDisabled" : "select-item"} onClick={() => handleOptionClick('grass-floor')} disabled={isShowBg}>
                    <span>Grass Floor</span>
                    <SvgGrass color={isShowGrass ? '#0066FF' : '#3C3C3C'} />
                </button>
            </div>
            <div className="side-section">
                <div className="size-item">
                    <p>width</p>
                    <input type="range" min="4" max="8" step="1" defaultValue="4" />
                </div>
                <div className="size-item">
                    <p>length</p>
                    <input type="range" min="6" max="10" step="1" defaultValue="6" />
                    
                </div>
                <div className="size-item">
                    <p>height</p>
                    <input type="range" min="2.5" max="4" step="0.5" defaultValue="2.5" />
                </div>
                <div className="size-item">
                    <p>pitch</p>
                    <input type="range" min="1" max="6" step="1" defaultValue="1" />
                </div>
            </div>
        </div>
    )
}

export default ControlPanel