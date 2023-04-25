const error_message = document.querySelectorAll(".error_message")

const main = () => {
    setTimeout(() => {
        for(let i=0;i < error_message.length;i++) {
            error_message[i].style.display = "none"
        }
    }, 5000);
}

main()