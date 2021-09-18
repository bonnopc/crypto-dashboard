import CommonLoader from "modules/common/components/CommonLoader"
import Container from "modules/common/components/Container"
import actionGetTopCurrencies from "modules/dashboard/actions/actionGetTopCurrencies"
import { setCurrencies, setSelectedCurrency } from "modules/dashboard/reducers"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import AssetList from "../AssetList"
import IndividualCurrencyPriceChart from "../IndividualCurrencyPriceChart"
import TotalPortfolioChart from "../TotalPortfolioChart"
import styles from "./Dashboard.module.css"

export default function Dashboard(){
    const [isLoadingCurrencies,setCurrencyLoader] = useState(false)
    
    const dispatch = useDispatch()

    useEffect(() => {
        getCurrencies()
    }, [])

    const getCurrencies = async () => {
        setCurrencyLoader(true)
        const currencies = await actionGetTopCurrencies()

        if(currencies){
            dispatch(setCurrencies(currencies))
            if(currencies.length) dispatch(setSelectedCurrency(currencies[0]))
        }
        setCurrencyLoader(false)
    }

    return (
        <Container>
            {
                isLoadingCurrencies ?
                <CommonLoader/> :
                <>
                    <TotalPortfolioChart/>
                    <div className={styles.container}>
                        <div className={styles.list}>
                            <AssetList />
                        </div>
                        <div className={styles.individualChart}>
                            <IndividualCurrencyPriceChart/>
                        </div>
                    </div>
                </>
            }
        </Container>
    )
}