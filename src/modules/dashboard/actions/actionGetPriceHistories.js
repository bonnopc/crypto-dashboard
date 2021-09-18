import actionGetPriceHistoryByCoinId from "./actionGetPriceHistoryByCoinId"

export default async function actionGetPriceHistories(currencies=[]){
    try {
        const promises = currencies.map(async currency => ({
            currency: {
                id: currency.id,
                name: currency.name,
            },
            prices: await actionGetPriceHistoryByCoinId(currency.id)
        }))

        return Promise.all(promises)
    } catch (error) {
        console.error("Error in actionGetPriceHistories", error)
    }
}