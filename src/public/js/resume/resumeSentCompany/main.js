const li = document.querySelectorAll(".li")
const resumeOption = document.querySelectorAll(".resumeOption")

const main = () => {
    for (let i = 0; i < li.length; i++) {
        if(li[i].id === "true") {
            resumeOption[i].innerHTML = "<div class='replySent'>reply sent <i class='ph ph-checks'></i></div>"
        }
    }
}

main()