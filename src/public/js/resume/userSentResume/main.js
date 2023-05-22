const notification = document.querySelector('.notification')
const dots = document.querySelectorAll(".dots")
const submenu = document.querySelectorAll(".submenu")

const main = () => {
    if(notification) {
        setTimeout(() => {
            notification.style.display = "none"
        }, 3000)
    }

    for (let i=0;i < dots.length;i++) {
        dots[i].onclick = () => {
            submenu[i].classList.toggle("active")
        }        
    }
}

main()