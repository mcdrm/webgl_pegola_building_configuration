import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    matModel: null,
    sofaModel: null,
    lampModel: null,
    potModel_1: null,
    potModel_2: null,
    potModel_3: null,
    sofaModel_1: null,
    sofaModel_2: null,
    tableModel_1: null,
    tableModel_3: null,
    tableModel_4: null,

    isAllModelLoaded: false,
}

export const glbModelSlice = createSlice({
    name: 'glbModel',
    initialState,
    reducers: {
        loadInitModel: (state, action) => {
            state.matModel = action.payload.matModel.scene;
            state.sofaModel = action.payload.sofaModel.scene;
            state.lampModel = action.payload.lampModel.scene;
            state.potModel_1 = action.payload.potModel_1.scene;
            state.potModel_2 = action.payload.potModel_2.scene;
            state.potModel_3 = action.payload.potModel_3.scene;
            state.sofaModel_1 = action.payload.sofaModel_1.scene;
            state.tableModel_1 = action.payload.tableModel_1.scene;
            state.tableModel_3 = action.payload.tableModel_3.scene;
            state.tableModel_4 = action.payload.tableModel_4.scene;
            
            state.isAllModelLoaded = true;
        }
    }
})

export const { loadInitModel } = glbModelSlice.actions;

export default glbModelSlice.reducer;