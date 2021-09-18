import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currencies: [],
    portfoilo: []
}

const dashboard = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setCurrencies: (state,action) => {
            state.currencies = [...action.payload]
        },
        setPortfolio: (state,action) => {
            state.portfoilo = [...action.payload]
        }
    }
})

export const { setCurrencies, setPortfolio } = dashboard.actions

export default dashboard.reducer