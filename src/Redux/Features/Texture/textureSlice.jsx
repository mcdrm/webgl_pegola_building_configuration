import { createSlice } from "@reduxjs/toolkit";

export const textureSlice = createSlice({
    name: 'texture',
    initialState: {
        surfaceTexture: null,
        woodTexture: null,
    },
    reducers: {
        loadInitTexture: (state, action) => {
            console.log('action: ', action);
            state.surfaceTexture = action.payload.surfaceTexture;
            state.woodTexture = action.payload.woodTexture;
        }
    }
})

export const { loadInitTexture } = textureSlice.actions

export default textureSlice.reducer