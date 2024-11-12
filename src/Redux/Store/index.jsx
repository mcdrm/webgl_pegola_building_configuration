import { configureStore } from "@reduxjs/toolkit";
import textureReducer from "../Features/Texture/textureSlice";

export default configureStore ({
    reducer: {
        texture: textureReducer
    }
})