import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    buildingType: 'wood',
    isShowBg: true,
    isCamAutoRotate: false,
    isBuildingOnly: false,
    isShowGrass: false,
    resetShadows: false,

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
            // Toggle resetShadows to trigger shadow reset
            state.resetShadows = !state.resetShadows;
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
        setInitBuildingSize: (state, action) => {
            state.width = action.payload.width;
            state.length = action.payload.length;
            state.height = action.payload.height;
            state.pitch = action.payload.pitch;
        }
    }
})

export const { setBuildingType, setIsShowBg, setIsCamAutoRotate, setIsBuildingOnly, setIsShowGrass, setBuildingDimension, setInitBuildingSize }= buildingCtrlSlice.actions

export default buildingCtrlSlice.reducer