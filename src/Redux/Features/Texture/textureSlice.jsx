import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    textureProps: {
        surfaceTexture: null,
        woodTexture: null,
        marbleTexture: null,
        metalTexture: null,
        stoneWallTexture: null,
    },
}

export const textureSlice = createSlice({
    name: 'texture',
    initialState,
    reducers: {
        loadInitTexture: (state, action) => {
            const { surfaceTexture, woodTexture, marbleTexture, metalTexture, stoneWallTexture } = action.payload;
            state.textureProps.surfaceTexture = surfaceTexture;
            state.textureProps.woodTexture = woodTexture;
            state.textureProps.marbleTexture = marbleTexture;
            state.textureProps.metalTexture = metalTexture;
            state.textureProps.stoneWallTexture = stoneWallTexture;
        },
    }
})

export const { loadInitTexture } = textureSlice.actions

export default textureSlice.reducer