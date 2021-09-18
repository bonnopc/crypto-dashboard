import getDateFromMilliseconds from "helpers/getDateFromMilliseconds"
import styles from "./PriceHistoriesLineChart.module.css"
import LineChart from "modules/common/components/LineChart"
import PropTypes from "prop-types"
import { ReactComponent as UpArrowIcon } from 'assets/icons/arrow_drop_up.svg';
import { ReactComponent as DownArrowIcon } from 'assets/icons/arrow_drop_down.svg';
import combinedClassNames from "helpers/combinedClassNames";
import React from "react";

export default function PriceHistoriesLineChart({
    prices=[], headerElementType="h2"
}) {
    const currentValue = prices?.length ? prices[prices.length - 1].value : 0
    const prevValue = prices?.length ? prices[0].value : 0

    const isPriceIncreased = currentValue > prevValue
    const isPriceDecreased = currentValue < prevValue    // both prices can be equal

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                {React.createElement(
                    headerElementType,
                    null,
                    `$ ${currentValue?.toLocaleString()}`
                )}

                <p className={combinedClassNames(styles, {
                    green: isPriceIncreased,
                    red: isPriceDecreased
                }, styles.subTitle)}>
                    { isPriceIncreased ? <UpArrowIcon className={styles.marginRight} /> : "" }
                    { isPriceDecreased ? <DownArrowIcon className={styles.marginRight} /> : "" }
                    <span className={styles.marginRight}>${ (currentValue - prevValue)?.toLocaleString() }</span>
                    <span>({ (((currentValue * prevValue) / prevValue) * 100)?.toLocaleString() }%)</span>
                </p>
            </div>

            <LineChart
                datasets={[{
                    label: 'Total Value (per day)',
                    data: prices.map(elem => elem.value),
                }]}
                labels={prices.map(elem => getDateFromMilliseconds(elem.timestamp))}
            />
        </div>
    )
}

PriceHistoriesLineChart.propTypes = {
    prices: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired
    })).isRequired,
    headerElementType: PropTypes.string,   // dom element type, default is 'h2'
}