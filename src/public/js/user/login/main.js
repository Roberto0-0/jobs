const password = document.querySelector("#password")
const btn = document.querySelector("#eye-button")
const error_message = document.querySelectorAll(".error_message")

const main = () => {
    btn.onclick = () => {
        if(password.type == "password") {
            password.type = "text"
            btn.classList = "ph-lightbulb-fill"
        } else {
            if(password.type == "text") {
                password.type = "password"
                btn.classList = "ph-lightbulb"
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
