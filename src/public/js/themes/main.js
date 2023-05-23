const changeColor = document.querySelector(".change-color")
const moon = document.querySelector(".ph-moon")
const body = document.querySelector("body")

const themes = () => {
   var result = window.localStorage.getItem("themes")
    if(result && result === "dark") {
        moon.classList = "ph ph-sun" 
        body.classList.toggle("active")
    }
    if(result && result === "light") {
        moon.classList = "ph ph-moon"
        body.classList.remove("active")
    }

    changeColor.onclick = (e) => {
        if(e.target.classList[1] === "ph-moon") {
            moon.classList = "ph ph-sun"
            body.classList.toggle("active")
            window.localStorage.setItem("themes", "dark")
        } else {
            moon.classList = "ph ph-moon"
            body.classList.remove("active")
            window.localStorage.setItem("themes", "light")
        }
    }
}

themes()