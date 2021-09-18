import CommonButton from "modules/common/components/CommonButton"
import styles from "./DurationButtons.module.css"

export default function DurationButtons({
    duration, onChange
}){
    const options = [
        { label: "1D", value: 1 },
        { label: "1W", value: 7 },
        { label: "1M", value: 30 },
        { label: "1Y", value: 365 }
    ]

    const handleChange = option => {
        if(onChange) onChange(option.value)
    }

    return (
        <div className={styles.root}>
            { options.map((option,i) => (
                <CommonButton
                    key={i}
                    className={option.value === duration ? styles.selected : null}
                    onClick={() => handleChange(option)}
                >
                    { option.label }
                </CommonButton>
            )) }
        </div>
    )
}