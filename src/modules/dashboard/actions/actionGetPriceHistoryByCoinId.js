import { API_ENDPOINT } from "config/endpoints"

export default async function actionGetPriceHistoryByCoinId(coinId,days=365){
    try {
        const url = `${API_ENDPOINT}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
        const response = await fetch(url)
        const result = await response.json()

        return result.prices
    } catch (error) {
        console.error("Error in actionGetPriceHistoryByCoinId", error)
    }
}