const dateOfBirth = document.querySelector("#dateOfBirth")

const main = () => {
    dateOfBirth.innerHTML = dayjs(dateOfBirth.textContent).format("MM/DD/YY")
}

main()