const password = document.querySelectorAll(".password")
const eyeButton = document.querySelectorAll(".ph-eye")
const error_message = document.querySelectorAll(".error_message")

const main = () => {
    setTimeout(() => {
        for(var i=0;i < error_message.length;i++) {
            error_message[i].style.display = "none"
        }
    }, 5000)

    for (let i = 0; i < password.length; i++) {
        eyeButton[i].onclick = () => {
            if(password[i].type == "password") {
                password[i].type = "text"
                eyeButton[i].classList = "ph-eye-closed"
            } else {
                if(password[i].type == "text") {
                    password[i].type = "password"
                    eyeButton[i].classList = "ph ph-eye ph"
                }
            }
        }   
    }
}

main()