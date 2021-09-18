import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "modules/dashboard/reducers"

export default configureStore({
    reducer: {
        dashboard: dashboardReducer
    }
})