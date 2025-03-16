import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    buildingType: 'wood',
    isShowBg: false,
    isCamAutoRotate: false,
    isBuildingOnly: false,
    isShowGrass: false,

    width: 6,
    length: 4,
    height: 2.5,
    pitch: 1,
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
        setIsBuildingOnly: state => {
            state.isBuildingOnly = !state.isBuildingOnly;
        },
        setIsShowGrass: (state, action) => {
            if (action.payload !== undefined) state.isShowGrass = false;
            else state.isShowGrass = !state.isShowGrass;
        },

        setBuildingDimension: (state, action) => {
            state[Object.keys(action.payload)[0]] = action.payload[Object.keys(action.payload)[0]];
        },
    }
})

export const { setBuildingType, setIsShowBg, setIsCamAutoRotate, setIsBuildingOnly, setIsShowGrass, setBuildingDimension }= buildingCtrlSlice.actions

export default buildingCtrlSlice.reducer