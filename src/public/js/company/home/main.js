const success_message = document.querySelector(".success_message")
const error_message = document.querySelectorAll(".error_message")

const main = () => {
    if(success_message) {
        setTimeout(() => {
            success_message.style.display = "none"
        }, 5000)
    }

    if(error_message) {
        setTimeout(() => {
            for(var i=0;i < error_message.length;i++) {
                error_message[i].style.display = "none"
            }
        }, 5000)
    }
}

main()