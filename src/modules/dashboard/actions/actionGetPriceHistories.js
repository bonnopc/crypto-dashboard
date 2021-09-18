import actionGetPriceHistoryByCoinId from "./actionGetPriceHistoryByCoinId"

export default async function actionGetPriceHistories(currencies=[],duration=365){
    try {
        const promises = currencies.map(async currency => await actionGetPriceHistoryByCoinId(currency.id,duration))

        return Promise.all(promises)
    } catch (error) {
        console.error("Error in actionGetPriceHistories", error)
    }
}