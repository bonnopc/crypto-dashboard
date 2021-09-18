import CommonImage from "modules/common/components/CommonImage"
import CommonLoader from "modules/common/components/CommonLoader"
import PriceHistoriesLineChart from "modules/common/components/PriceHistoriesLineChart"
import actionGetPriceHistoryByCoinId from "modules/dashboard/actions/actionGetPriceHistoryByCoinId"
import { setSelectedCurrencyPrices } from "modules/dashboard/reducers"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import DurationButtons from "../DurationButtons"
import styles from "./IndividualCurrencyPriceChart.module.css"

export default function IndividualCurrencyPriceChart(){
    const [isLoading,setLoader] = useState(false)
    const [duration,setDuration] = useState(365)
    const currency = useSelector(state => state.dashboard.selectedCurrency)
    const currencyPrices = useSelector(state => state.dashboard.selectedCurrencyPrices)
    const dispatch = useDispatch()

    useEffect(() => {
        if(currency?.id) getCurrencyPrices(currency.id)
    }, [currency?.id,duration])

    const getCurrencyPrices = async (id) => {
        setLoader(true)

        const prices = await actionGetPriceHistoryByCoinId(id,duration)

        if(prices) dispatch(setSelectedCurrencyPrices(prices))

        setLoader(false)
    }

    if(isLoading && !currencyPrices?.length) return <CommonLoader/>
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

                {
                    isLoading ?
                    <CommonLoader/> :
                    <PriceHistoriesLineChart
                        prices={currencyPrices.map(price => ({
                            timestamp: price[0],
                            value: price[1]
                        }))}
                        headerElementType="h3"
                        actionButtons={(
                            <DurationButtons
                                duration={duration}
                                onChange={duration => setDuration(duration)}
                            />
                        )}
                    />
                }
            </div>
        )
    }

    return "No data found!"
}