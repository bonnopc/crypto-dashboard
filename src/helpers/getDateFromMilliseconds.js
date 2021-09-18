export default function getDateFromMilliseconds(dateInMS){
    if(dateInMS){
        const date = new Date(dateInMS)

        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }

    return dateInMS
}