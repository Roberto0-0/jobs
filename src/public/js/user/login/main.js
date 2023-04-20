const password = document.querySelector("#password")
const eyeButton = document.querySelector("#eye-button")
const error_message = document.querySelectorAll(".error_message")

const main = () => {
    eyeButton.onclick = () => {
        if(password.type == "password") {
            password.type = "text"
            eyeButton.classList = "ph ph-eye-closed"
        } else {
            if(password.type == "text") {
                password.type = "password"
                eyeButton.classList = "ph ph-eye"
            }
        }
    }
    
    if(error_message.length > 0) {
        setTimeout(() => {
            for(var i=0;i < error_message.length;i++) {
                error_message[i].style.display = "none"
            }
        }, 5000)
    }
}

main()
