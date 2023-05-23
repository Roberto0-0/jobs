const password = document.querySelectorAll(".password")
const eyeButton = document.querySelectorAll(".ph-eye")
const error_message = document.querySelectorAll(".error_message")
const success_message = document.querySelectorAll(".success_message")

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

    setTimeout(() => {
        for(let i=0;i < error_message.length;i++) {
            error_message[i].style.display = "none"
        }
    }, 5000);
    
    if(success_message) {
      setTimeout(() => {
          for(let i=0;i < success_message.length;i++) {
              success_message[i].style.display = "none"
          }
      }, 5000);
    }
}

main()