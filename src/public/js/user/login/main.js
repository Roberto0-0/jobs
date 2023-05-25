const password = document.querySelector("#password")
const eyeButton = document.querySelector("#eye-button")

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
}

main()
