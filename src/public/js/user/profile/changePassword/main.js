const current_password = document.querySelector("#currentPassword")
const new_password = document.querySelector("#newPassword")
const repeat_newPassword = document.querySelector("#RepeatNewPassword")
const btn_current = document.querySelector("#currentButton")
const btn_new = document.querySelector("#newButton")
const btn_repeat= document.querySelector("#RepeatNewButton")
const success_message = document.querySelectorAll(".success_message")
const error_message = document.querySelectorAll(".error_message")

const main = () => {   
    if(success_message) {
        setTimeout(() => {
          for(let i=0;i < success_message.length;i++) {
            success_message[i].style.display = "none"
          }
        }, 5000)
    }

    if(error_message) {
        setTimeout(() => {
          for(let i=0;i < error_message.length;i++) {
            error_message[i].style.display = "none"
          }
        }, 5000)
    }
    

    btn_current.onclick = () => {
        if(current_password.type == "password") {
            current_password.type = "text"
            btn_current.classList = "ph-fill ph-lightbulb"
        } else {
            if(current_password.type == "text") {
                current_password.type = "password"
                btn_current.classList = "ph ph-lightbulb"
            }
        }
    }
    
    btn_new.onclick = () => {
        if(new_password.type == "password") {
            new_password.type = "text"
            btn_new.classList = "ph-fill ph-lightbulb"
        } else {
            if(new_password.type == "text") {
                new_password.type = "password"
                btn_new.classList = "ph ph-lightbulb"
            }
        }
    }

    btn_repeat.onclick = () => {
        if(repeat_newPassword.type == "password") {
            repeat_newPassword.type = "text"
            btn_repeat.classList = "ph-fill ph-lightbulb"
        } else {
            if(repeat_newPassword.type == "text") {
                repeat_newPassword.type = "password"
                btn_repeat.classList = "ph ph-lightbulb"
            }
        }
    }
}

main()