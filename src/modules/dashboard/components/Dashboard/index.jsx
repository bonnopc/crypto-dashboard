import CommonLoader from "modules/common/components/CommonLoader"
import Container from "modules/common/components/Container"
import actionGetTopCurrencies from "modules/dashboard/actions/actionGetTopCurrencies"
import { setCurrencies } from "modules/dashboard/reducers"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import TotalPortfolioChart from "../TotalPortfolioChart"

export default function Dashboard(){
    const [isLoadingCurrencies,setCurrencyLoader] = useState(false)
    
    const dispatch = useDispatch()

    useEffect(() => {
        getCurrencies()
    }, [])

    const getCurrencies = async () => {
        setCurrencyLoader(true)
        const currencies = await actionGetTopCurrencies()

        if(currencies) dispatch(setCurrencies(currencies))
        setCurrencyLoader(false)
    }

    return (
        <Container>
            {
                isLoadingCurrencies ?
                <CommonLoader/> :
                <>
                    <TotalPortfolioChart/>
                </>
            }
        </Container>
    )
}