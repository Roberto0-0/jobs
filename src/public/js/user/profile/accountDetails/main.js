const date = document.getElementsByClassName("date")

const main = () => {
    for(var i=0; i < date.length;i++) {
        const dateTime = dayjs(date[i].textContent).format("DD/MM/YY")
        const hourTime = dayjs(date[i].textContent).format("HH:MM:ss")
        date[i].innerHTML = `${dateTime} at ${hourTime}`
    }
}

main()