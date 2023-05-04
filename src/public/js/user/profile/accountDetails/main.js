const date = document.getElementsByClassName("date")

const main = () => {
  for(var i=0; i < date.length;i++) {
    const dateTime = dayjs(date[i].textContent).format("DD/MM/YY - HH:MM:ss")
    date[i].innerHTML = `${dateTime}`
  }
}

main()