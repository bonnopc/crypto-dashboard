import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currencies: []
}

const dashboard = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setCurrencies: (state,action) => {
            state.currencies = [...action.payload]
        }
    }
})

export const { setCurrencies } = dashboard.actions

export default dashboard.reducer