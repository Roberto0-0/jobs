const date = document.getElementsByClassName("date")

const main = () => {
    for(var i=0; i < date.length;i++) {
        date[i].innerHTML = `${dayjs(date[i].textContent).format("DD/MM/YY")}`
    }
}

main()