import CommonLoader from "modules/common/components/CommonLoader"
import PriceHistoriesLineChart from "modules/common/components/PriceHistoriesLineChart"
import actionGetPriceHistories from "modules/dashboard/actions/actionGetPriceHistories"
import { setPortfolio } from "modules/dashboard/reducers"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

export default function TotalPortfolioChart() {
    const [isLoadingPortfoilo, setPortfolioLoader] = useState(false)
    const topCurrencies = useSelector(state => state.dashboard.currencies)
    const portfoilo = useSelector(state => state.dashboard.portfoilo)
    const dispatch = useDispatch()

    useEffect(() => {
        if (topCurrencies.length) getTotalPortfolioPrices(topCurrencies)
    }, [topCurrencies])

    const getTotalPortfolioPrices = async (currencies) => {
        setPortfolioLoader(true)

        const allCurrencies = await actionGetPriceHistories(currencies)
        const quantity = 5

        if (allCurrencies?.length) {
            let totalPrices = []

            for (let i = 0; i < allCurrencies[0]?.length; i++) {
                let value = 0, timestamp;

                allCurrencies.forEach(currency => {
                    value += (currency[i][1] * quantity)
                    timestamp = currency[i][0]
                });

                totalPrices.push({ timestamp, value })
            }

            dispatch(setPortfolio(totalPrices))
        }

        setPortfolioLoader(false)
    }

    if (isLoadingPortfoilo) return <CommonLoader />

    return <PriceHistoriesLineChart prices={portfoilo} />
}