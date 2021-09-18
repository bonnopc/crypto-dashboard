import CommonImage from "modules/common/components/CommonImage"
import CommonLoader from "modules/common/components/CommonLoader"
import PriceHistoriesLineChart from "modules/common/components/PriceHistoriesLineChart"
import actionGetPriceHistoryByCoinId from "modules/dashboard/actions/actionGetPriceHistoryByCoinId"
import { setSelectedCurrencyPrices } from "modules/dashboard/reducers"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import styles from "./IndividualCurrencyPriceChart.module.css"

export default function IndividualCurrencyPriceChart(){
    const [isLoading,setLoader] = useState(false)
    const currency = useSelector(state => state.dashboard.selectedCurrency)
    const currencyPrices = useSelector(state => state.dashboard.selectedCurrencyPrices)
    const dispatch = useDispatch()

    useEffect(() => {
        if(currency?.id) getCurrencyPrices(currency.id)
    }, [currency?.id])

    const getCurrencyPrices = async (id) => {
        setLoader(true)

        const prices = await actionGetPriceHistoryByCoinId(id)

        if(prices) dispatch(setSelectedCurrencyPrices(prices))

        setLoader(false)
    }

    if(isLoading) return <CommonLoader/>
    else if(currencyPrices?.length){
        return (
            <div>
                <div className={styles.header}>
                    <CommonImage
                        className={styles.icon} 
                        src={currency.image} 
                        alt={currency.name}
                        fallbackSrc="https://picsum.photos/200"
                    />
                    {/* <img className={styles.icon} src={currency.image} alt={currency.name} /> */}
                    <h3>{ currency.name }</h3>
                </div>

                <PriceHistoriesLineChart
                    prices={currencyPrices.map(price => ({
                        timestamp: price[0],
                        value: price[1]
                    }))}
                    headerElementType="h3"
                />
            </div>
        )
    }

    return ""
}