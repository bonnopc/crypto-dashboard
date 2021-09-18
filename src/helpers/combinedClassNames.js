const combinedClassNames = (styles,classes,additionalClassName) => {
    let classStr = ""

    try {
        if(Object.keys(classes).length){
            Object.keys(classes).forEach((key,i) => {
                if(classes[key]){
                    if(i == 0) classStr += styles[key]
                    else classStr += ` ${styles[key]}`
                }
            })
        }
    } catch (error) {
        console.error("Error in parsing ClassNames:",error)
    }

    if(additionalClassName) classStr += ` ${additionalClassName}`

    return classStr
}

export default combinedClassNames