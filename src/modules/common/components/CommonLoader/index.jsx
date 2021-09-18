import styles from "./CommonLoader.module.css"

export default function CommonLoader({ className }){
    return (
        <div className={`${styles.root} ${className ?? ''}`}>
            <div className={styles.loader} />
        </div>
    )
}