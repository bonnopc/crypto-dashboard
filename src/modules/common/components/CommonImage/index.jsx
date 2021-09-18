import { useState, useEffect } from "react"
import PropTypes from "prop-types"

export default function CommonImage (props){
    const { height, width, src, alt, fallbackSrc, ...restProps } = props

    const [ imageSource, setImageSource ] = useState("")

    const [ errored, setError ] = useState(false)

    useEffect(() => {
        setImageSource(src)
    }, [src])

    const setImageError = () => {
        if(!errored && fallbackSrc){
            setImageSource(fallbackSrc)
            setError(true)
        }
    }

    return (
        <img 
            src={imageSource} 
            alt={alt ? alt : "Image"}
            style={{ height, width }}
            { ...restProps }
            onError={() => setImageError()}
        />
    )
}

CommonImage.propTypes = {
    src: PropTypes.string.isRequired,
    fallbackSrc: PropTypes.string,
    alt: PropTypes.string,
    height: PropTypes.any,
    width: PropTypes.any,
}