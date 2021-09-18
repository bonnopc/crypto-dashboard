import { forwardRef } from "react"
import styles from "./CommonButton.module.css"

const CommonButton = forwardRef(({ children, className, ...restProps },ref) => (
    <button
        className={`${styles.root} ${className ?? ''}`}
        {...restProps}
    >
        { children }
    </button>
))

export default CommonButton