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
          ignoredPaths: ['texture.textureProps.surfaceTexture', 'texture.textureProps.woodTexture', 'texture.textureProps.marbleTexture', 'texture.textureProps.metalTexture', 'texture.textureProps.stoneWallTexture'], // Ignore paths with non-serializable values
        },
      }),
  });

export default store;
