import { useDispatch, useSelector } from "react-redux"

import { setBuildingType, setIsShowBg, setIsCamAutoRotate, setIsBuildingOnly, setIsShowGrass, setBuildingDimension, setInitBuildingSize } from "../../Redux/Features/BuildingCtrl/buildingCtrlSlice";
import { SvgBuilding, SvgFrameOnly, SvgGrass, SvgImage, SvgRotate } from "../../Utils/SvgSource"
import { useEffect } from "react";

const ControlPanel = () => {
    const dispatch = useDispatch();

    const buildingType = useSelector(state => state.buildingCtrl.buildingType)
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
        } else if (type === 'building-only') {
            dispatch(setIsBuildingOnly());
        } else if (type === 'grass-floor') {
            dispatch(setIsShowGrass());
        }
    }

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        dispatch(setBuildingDimension({ [name]: Number(value) }))
    }

    useEffect(() => {
        const initSize = {
            width: 6,
            length: 4,
            height: 2.5,
            pitch: 1,
        }
        dispatch(setInitBuildingSize(initSize));
    }, [buildingType])
    
    return (
        <div className="building-controller">
            <div className="bottom-section">
                <button className="select-item" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>Pergola</span>
                    <SvgBuilding />
                </button>
                <ul className="dropdown-menu">
                    <li><span className="dropdown-item" style={{ color: buildingType === 'wood' ? '#0066FF' : '#3C3C3C' }} onClick={() => handleOptionClick('building', 'wood')}>Type 1</span></li>
                    <hr style={{marginTop: 5, marginBottom: 5}} />
                    <li><span className="dropdown-item" style={{ color: buildingType === 'metal' ? '#0066FF' : '#3C3C3C' }} onClick={() => handleOptionClick('building', 'metal')}>Type 2</span></li>
                    <hr style={{marginTop: 5, marginBottom: 5}} />
                    <li><span className="dropdown-item" style={{ color: buildingType === 'stone' ? '#0066FF' : '#3C3C3C' }} onClick={() => handleOptionClick('building', 'stone')}>Type 3</span></li>
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
                <div className="vl" />
                <div className={isFrameOnly ? "select-item isSelected" : "select-item isDisabled"} onClick={() => handleOptionClick('frame-only')}>
                    <span>Building only</span>
                    <SvgFrameOnly color={isFrameOnly ? '#0066FF' : '#3C3C3C'} />
                </div>
                <div className="vl" />
                <button className={isShowGrass ? "select-item isSelected" : isShowBg ? "select-item isDisabled" : "select-item"} onClick={() => handleOptionClick('grass-floor')} disabled={isShowBg}>
                    <span>Grass Floor</span>
                    <SvgGrass color={isShowGrass ? '#0066FF' : '#3C3C3C'} />
                </button>
            </div>
            {buildingType === "wood" &&
                <div className="side-section">
                    <div className="size-item">
                        <p>width</p>
                        <input type="range" name="width" onChange={handleDimensionChange} min="6" max="10" step="1" defaultValue="6" />
                    </div>
                    <div className="size-item">
                        <p>length</p>
                        <input type="range" name="length" onChange={handleDimensionChange} min="4" max="8" step="1" defaultValue="4" />
                        
                    </div>
                    <div className="size-item">
                        <p>height</p>
                        <input type="range" name="height" onChange={handleDimensionChange} min="2.5" max="4" step="0.5" defaultValue="2.5" />
                    </div>
                    <div className="size-item">
                        <p>pitch</p>
                        <input type="range" name="pitch" onChange={handleDimensionChange} min="1" max="6" step="1" defaultValue="1" />
                    </div>
                </div>
            }
        </div>
    )
}

export default ControlPanel