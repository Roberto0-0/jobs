const dots = document.querySelectorAll(".dots")
const submenu = document.querySelectorAll(".submenu")

const main = () => {
    for (let i=0;i < dots.length;i++) {
        dots[i].onclick = () => {
            submenu[i].classList.toggle("active")
        }
    }
}

main()