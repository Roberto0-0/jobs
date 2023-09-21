const changeColor = document.querySelector(".change-color")
const moon = document.querySelector(".ph-moon")
const body = document.querySelector("body")
const home_illustration = document.querySelector(".home-illustration")
const dashboard_illustration = document.querySelector(".dashboard-illustration")
const compnay_illustration = document.querySelector(".company-illustration")

const themes = () => {
   var result = window.localStorage.getItem("themes")
    if(result && result === "dark") {
        moon.classList = "ph ph-sun" 
        body.classList.toggle("active")
        if(home_illustration ) { home_illustration .src = "/assets/jobs/undraw_file_searching_re_3evy_dark.svg" }
        if(dashboard_illustration) { dashboard_illustration.src = "/assets/jobs/undraw_done_checking_re_6vyx_dark.svg" }
        if(compnay_illustration) { compnay_illustration.src = "/assets/jobs/undraw_financial_data_re_p0fl_dark.svg" }
    }
    if(result && result === "light") {
        moon.classList = "ph ph-moon"
        body.classList.remove("active")
        if(home_illustration ) { home_illustration .src = "/assets/jobs/undraw_file_searching_re_3evy.svg" }
        if(dashboard_illustration) { dashboard_illustration.src = "/assets/jobs/undraw_done_checking_re_6vyx.svg" }
        if(compnay_illustration) { compnay_illustration.src = "/assets/jobs/undraw_financial_data_re_p0fl.svg" }
    }

    changeColor.onclick = (e) => {
        if(e.target.classList[1] === "ph-moon") {
            moon.classList = "ph ph-sun"
            body.classList.toggle("active")
            window.localStorage.setItem("themes", "dark")
            if(home_illustration ) { home_illustration .src = "/assets/jobs/undraw_file_searching_re_3evy_dark.svg" }
            if(dashboard_illustration) { dashboard_illustration.src = "/assets/jobs/undraw_done_checking_re_6vyx_dark.svg" }
            if(compnay_illustration) { compnay_illustration.src = "/assets/jobs/undraw_financial_data_re_p0fl_dark.svg" }
        } else {
            moon.classList = "ph ph-moon"
            body.classList.remove("active")
            window.localStorage.setItem("themes", "light")
            if(home_illustration ) { home_illustration .src = "/assets/jobs/undraw_file_searching_re_3evy.svg" }
            if(dashboard_illustration) { dashboard_illustration.src = "/assets/jobs/undraw_done_checking_re_6vyx.svg" }
            if(compnay_illustration) { compnay_illustration.src = "/assets/jobs/undraw_financial_data_re_p0fl.svg" }
        }
    }
}

themes()