const DateFormatter = ({isodate}) => {
    const date = new Date(isodate)
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const formattedTime = date.toLocaleTimeString();
    return (
        <span>{formattedDate}, {formattedTime}</span>
    )
}

export default DateFormatter;