import CommonLoader from "modules/common/components/CommonLoader"
import actionGetPriceHistories from "modules/dashboard/actions/actionGetPriceHistories"
import { setPortfolio } from "modules/dashboard/reducers"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Line } from 'react-chartjs-2';
import getDateFromMilliseconds from "helpers/getDateFromMilliseconds"
import styles from "./TotalPortfolioChart.module.css"

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

            for (let i = 0; i < allCurrencies[0].prices.length; i++) {
                let totalValue = 0, timestamp;

                allCurrencies.forEach(currency => {
                    totalValue += (currency.prices[i][1] * quantity)
                    timestamp = currency.prices[i][0]
                });

                totalPrices.push({ timestamp, totalValue })
            }

            dispatch(setPortfolio(totalPrices))
        }

        setPortfolioLoader(false)
    }

    const data = {
        labels: portfoilo.map(elem => getDateFromMilliseconds(elem.timestamp)),
        datasets: [
            {
                // label: '# of Votes',
                data: portfoilo.map(elem => elem.totalValue),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                cubicInterpolationMode: 'monotone',
                tension: 0.8
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
        },
    };

    if (isLoadingPortfoilo) return <CommonLoader />

    return (
        <div className={styles.root}>
            <Line data={data} options={options} />
        </div>
    )
}