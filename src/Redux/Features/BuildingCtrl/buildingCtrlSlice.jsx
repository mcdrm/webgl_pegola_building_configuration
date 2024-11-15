import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    buildingType: 'wood',
    isBackgroundShow: false,
    isCamAutoRotate: false,
}

export const buildingCtrlSlice = createSlice({
    name: 'buildingCtrl',
    initialState,
    reducers: {
        setBuildingType: (state, action) => {
            state.buildingType = action.payload;
        },
        setIsBackgroundShow: state => {
            state.isBackgroundShow = !state.isBackgroundShow;
        },
        setIsCamAutoRotate: state => {
            state.isCamAutoRotate = !state.isCamAutoRotate;
        },
    }
})

export const { setBuildingType, setIsBackgroundShow, setIsCamAutoRotate }= buildingCtrlSlice.actions

export default buildingCtrlSlice.reducer