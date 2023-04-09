const success_message = document.querySelector(".success_message")

const main = () => {
    if(success_message) {
        setTimeout(() => {
            success_message.style.display = "none"
        }, 5000)
    }
}

main()