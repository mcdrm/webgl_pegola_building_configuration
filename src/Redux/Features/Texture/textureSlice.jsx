import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    textureProps: {
        surfaceTexture: null,
        woodTexture1: null,
        woodTexture2: null,
        marbleTexture: null,
        metalTexture: null,
        stoneWallTexture: null,
        grassTexture: null,
        roofPanelTileTexture: null,
        roofRidgeTileTexture: null,
    },

    isAllTextureLoaded: false,
}

export const textureSlice = createSlice({
    name: 'texture',
    initialState,
    reducers: {
        loadInitTexture: (state, action) => {
            const { surfaceTexture, woodTexture1, woodTexture2, marbleTexture, metalTexture, stoneWallTexture, grassTexture, roofPanelTileTexture, roofRidgeTileTexture } = action.payload;
            state.textureProps.surfaceTexture = surfaceTexture;
            state.textureProps.woodTexture1 = woodTexture1;
            state.textureProps.woodTexture2 = woodTexture2;
            state.textureProps.marbleTexture = marbleTexture;
            state.textureProps.metalTexture = metalTexture;
            state.textureProps.stoneWallTexture = stoneWallTexture;
            state.textureProps.grassTexture = grassTexture;
            state.textureProps.roofPanelTileTexture = roofPanelTileTexture;
            state.textureProps.roofRidgeTileTexture = roofRidgeTileTexture;
            
            state.isAllTextureLoaded = true;
        },
    }
})

export const { loadInitTexture } = textureSlice.actions

export default textureSlice.reducer