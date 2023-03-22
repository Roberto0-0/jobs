const password = document.querySelector("#password")
const confirm_password = document.querySelector("#confirm-password")
const btn = document.querySelector("#eye-button")
const confirm_btn = document.querySelector("#eye-confirm-button")
const error_message = document.querySelectorAll(".error_message")

const main = () => {
    setTimeout(() => {
        for(var i=0;i < error_message.length;i++) {
            error_message[i].style.display = "none"
        }
    }, 5000)
    
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
    
    confirm_btn.onclick = () => {
        if(confirm_password.type == "password") {
            confirm_password.type = "text"
            confirm_btn.classList = "ph-lightbulb-fill"
        } else {
            if(confirm_password.type == "text") {
                confirm_password.type = "password"
                confirm_btn.classList = "ph-lightbulb"
            }
        }
    }
}

main()