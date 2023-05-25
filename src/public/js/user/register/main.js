const password = document.querySelectorAll(".password")
const eyeButton = document.querySelectorAll(".ph-eye")

const main = () => {
    for (let i = 0; i < password.length; i++) {
        eyeButton[i].onclick = () => {
            if(password[i].type == "password") {
                password[i].type = "text"
                eyeButton[i].classList = "ph ph-eye-closed"
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