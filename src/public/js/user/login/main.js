const password = document.querySelector("#password")
const btn = document.querySelector("#eye-button")

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
