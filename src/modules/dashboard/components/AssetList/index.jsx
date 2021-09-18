import CommonImage from "modules/common/components/CommonImage"
import { setSelectedCurrency } from "modules/dashboard/reducers"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import styles from "./AssetList.module.css"

function ListItem({
    iconUrl, title, value, onClick
}){
    return (
        <li 
            className={styles.itemRoot}
            onClick={onClick}
        >
            <div className={styles.itemIcon}>
                <CommonImage 
                    src={iconUrl} 
                    alt={title} 
                    fallbackSrc="https://picsum.photos/200"
                />
            </div>
            <p className={styles.title}>{title}</p>
            <p className={styles.value}>{value}</p>
        </li>
    )
}

export default function AssetList(){
    const dispatch = useDispatch()
    const currencies = useSelector(state => state.dashboard.currencies)

    if(!currencies?.length) return ""

    return (
        <div>
            <h5>Your Assets</h5>
            <div>
                {currencies.map((currency,i) => (
                    <ListItem
                        key={i}
                        icon={currency.image}
                        value={`$${currency.current_price.toLocaleString()}`}
                        title={currency.name}
                        onClick={() => dispatch(setSelectedCurrency(currency))}
                    />
                ))}
            </div>
        </div>
    )
}