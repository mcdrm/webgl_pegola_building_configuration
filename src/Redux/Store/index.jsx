import { configureStore } from '@reduxjs/toolkit';
import textureReducer from '../Features/Texture/textureSlice';
import buildingCtrlReducer from '../Features/BuildingCtrl/buildingCtrlSlice';
// import glbModelReducer from '../Features/GLBModel/glbModelSlice';

const store = configureStore({
    reducer: {
        texture: textureReducer,
        buildingCtrl: buildingCtrlReducer,
        // glbModel: glbModelReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'texture/loadInitTexture',
            // 'glbModel/loadInitModel'
          ],
          ignoredPaths: [
            'texture.textureProps.surfaceTexture',
            'texture.textureProps.woodTexture1',
            'texture.textureProps.woodTexture2',
            'texture.textureProps.marbleTexture',
            'texture.textureProps.metalTexture',
            'texture.textureProps.stoneWallTexture',
            'texture.textureProps.grassTexture',
            'texture.textureProps.roofPanelTileTexture',
            'texture.textureProps.roofRidgeTileTexture',
            
            // 'glbModel.potModel',
            // 'glbModel.lampModel',
            // 'glbModel.sofaModel_1',
            // 'glbModel.sofaModel',
            // 'glbModel.tableModel_1',
            // 'glbModel.tableModel_2',
            // 'glbModel.tableModel_3',
            // 'glbModel.tableModel_4',
            // 'glbModel.matModel',
          ],
        },
      }),
  });

export default store;
