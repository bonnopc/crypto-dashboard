import { API_ENDPOINT } from "config/endpoints"

export default async function actionGetTopCurrencies(){
    try {
        const url = `${API_ENDPOINT}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
        const response = await fetch(url);
        const result = await response.json()

        return result
    } catch (error) {
        console.error("Error in actionGetTopCurrencies", error)
    }
}