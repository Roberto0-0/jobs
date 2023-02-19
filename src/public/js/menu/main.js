const menu = document.querySelector(".menu")
const nav = document.querySelector("nav")

menu.onclick = () => {
    nav.classList.toggle('active')
}