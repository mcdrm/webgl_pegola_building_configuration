import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    potModel: null,
    lampModel: null,
    sofaModel: null,
    tableModel_1: null,
    tableModel_2: null,
    tableModel_3: null,
    tableModel_4: null,
    matModel: null,

    isAllModelLoaded: false,
}

export const glbModelSlice = createSlice({
    name: 'glb-model',
    initialState,
    reducers: {
        loadInitModel: (state, action) => {
            state.potModel = action.payload.potModel.scene;
            state.lampModel = action.payload.lampModel.scene;
            state.sofaModel = action.payload.sofaModel.scene;
            state.tableModel_1 = action.payload.tableModel_1.scene;
            state.tableModel_2 = action.payload.tableModel_2.scene;
            state.tableModel_3 = action.payload.tableModel_3.scene;
            state.tableModel_4 = action.payload.tableModel_4.scene;
            state.matModel = action.payload.matModel.scene;
            
            state.isAllModelLoaded = true;
        }
    }
})

export const { loadInitModel } = glbModelSlice.actions;

export default glbModelSlice.reducer;