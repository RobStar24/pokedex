import { configureStore } from "@reduxjs/toolkit";
import trainerName from "./slices/trainerName.slice";

export default configureStore({
    reducer: {
        // Here are all our global states (slices)
        trainerName
    }
})