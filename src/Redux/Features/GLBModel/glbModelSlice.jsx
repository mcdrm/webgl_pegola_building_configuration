import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    potModel: {},
    lampModel: {},
    sofaModel_1: {},
    sofaModel_2: {},
    tableModel_1: {},
    tableModel_2: {},
    tableModel_3: {},
}

export const glbModelSlice = createSlice({
    name: 'glb-model',
    initialState,
    reducers: {
        loadInitModel: (state, action) => {
            state.potModel = action.payload.potModel;
            state.lampModel = action.payload.lampModel;
            state.sofaModel_1 = action.payload.sofaModel_1;
            state.sofaModel_2 = action.payload.sofaModel_2;
            state.tableModel_1 = action.payload.tableModel_1;
            state.tableModel_2 = action.payload.tableModel_2;
            state.tableModel_3 = action.payload.tableModel_3;
        }
    }
})

export const { loadInitModel } = glbModelSlice.actions;

export default glbModelSlice.reducer;