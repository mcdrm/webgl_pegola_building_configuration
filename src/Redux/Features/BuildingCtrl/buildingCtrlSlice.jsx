import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    buildingType: 'wood',
    isShowBg: false,
    isCamAutoRotate: false,
    isFrameOnly: false,
    isShowGrass: false,
}

export const buildingCtrlSlice = createSlice({
    name: 'buildingCtrl',
    initialState,
    reducers: {
        setBuildingType: (state, action) => {
            state.buildingType = action.payload;
        },
        setIsShowBg: state => {
            state.isShowBg = !state.isShowBg;
        },
        setIsCamAutoRotate: state => {
            state.isCamAutoRotate = !state.isCamAutoRotate;
        },
        setIsFrameOnly: state => {
            state.isFrameOnly = !state.isFrameOnly;
        },
        setIsShowGrass: (state, action) => {
            if (action.payload !== undefined) state.isShowGrass = false;
            else state.isShowGrass = !state.isShowGrass;
        },
    }
})

export const { setBuildingType, setIsShowBg, setIsCamAutoRotate, setIsFrameOnly, setIsShowGrass }= buildingCtrlSlice.actions

export default buildingCtrlSlice.reducer