import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currencies: [],
    portfoilo: [],
    selectedCurrency: {},
    selectedCurrencyPrices: []
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
        },
        setSelectedCurrency: (state,action) => {
            state.selectedCurrency = {...action.payload}
        },
        setSelectedCurrencyPrices: (state,action) => {
            state.selectedCurrencyPrices = [...action.payload]
        }
    }
})

export const { 
    setCurrencies, 
    setPortfolio, 
    setSelectedCurrency,
    setSelectedCurrencyPrices,
} = dashboard.actions

export default dashboard.reducer