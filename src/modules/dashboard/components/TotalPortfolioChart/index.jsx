import CommonLoader from "modules/common/components/CommonLoader"
import PriceHistoriesLineChart from "modules/common/components/PriceHistoriesLineChart"
import actionGetPriceHistories from "modules/dashboard/actions/actionGetPriceHistories"
import { setPortfolio } from "modules/dashboard/reducers"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import DurationButtons from "../DurationButtons"

export default function TotalPortfolioChart() {
    const [isLoadingPortfoilo, setPortfolioLoader] = useState(false)
    const [duration,setDuration] = useState(365)
    const topCurrencies = useSelector(state => state.dashboard.currencies)
    const portfoilo = useSelector(state => state.dashboard.portfoilo)
    const dispatch = useDispatch()

    useEffect(() => {
        if (topCurrencies.length) getTotalPortfolioPrices(topCurrencies)
    }, [topCurrencies,duration])

    const getTotalPortfolioPrices = async (currencies) => {
        setPortfolioLoader(true)
        dispatch(setPortfolio([])) // initializing before fetch

        const pricesByCurrencies = await actionGetPriceHistories(currencies,duration)
        const quantity = 5

        if (pricesByCurrencies?.length) {
            let totalPricesByTime = []

            for (let i = 0; i < pricesByCurrencies[0]?.length; i++) {
                let value = 0, timestamp;

                pricesByCurrencies.forEach(currency => {
                    value += currency && currency[i] && currency[i][1] ? (currency[i][1] * quantity) : 0
                    if(currency && currency[i] && currency[i][0]) timestamp = currency[i][0]
                });

                totalPricesByTime.push({ timestamp, value })
            }

            dispatch(setPortfolio(totalPricesByTime))
        }

        setPortfolioLoader(false)
    }

    if (isLoadingPortfoilo) return <CommonLoader />
    else if(portfoilo?.length){
        return (
            <PriceHistoriesLineChart 
                prices={portfoilo} 
                actionButtons={(
                    <DurationButtons
                        duration={duration}
                        onChange={duration => setDuration(duration)}
                    />
                )}
            />
        )
    }
    
    return "Couldn't find any data!"
}