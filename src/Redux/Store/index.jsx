import { configureStore } from '@reduxjs/toolkit';
import textureReducer from '../Features/Texture/textureSlice';

const store = configureStore({
    reducer: {
        texture: textureReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['texture/loadInitTexture'], // Ignore specific actions if needed
          ignoredPaths: ['texture.textureProps.surfaceTexture', 'texture.textureProps.woodTexture1', 'texture.textureProps.woodTexture2', 'texture.textureProps.marbleTexture', 'texture.textureProps.metalTexture', 'texture.textureProps.stoneWallTexture', 'texture.textureProps.grassTexture', 'texture.textureProps.roofPanelTileTexture', 'texture.textureProps.roofRidgeTileTexture'], // Ignore paths with non-serializable values
        },
      }),
  });

export default store;
