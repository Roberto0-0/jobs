const li = document.querySelectorAll(".li")
const resumeOption = document.querySelectorAll(".resumeOption")
const postedTime = document.getElementsByClassName("postedTime")

const main = () => {
    for (let i = 0; i < li.length; i++) {
        if(li[i].id === "true") {
            resumeOption[i].innerHTML = "<div class='replySent'>reply sent <i class='ph ph-checks'></i></div>"
        }
    }

    for(var i=0; i < postedTime.length;i++) {
        var browserFormatDate = new Date(postedTime[i].textContent)
        var localFormatDate = `${browserFormatDate.getFullYear()}-${Number(browserFormatDate.getMonth() + 1)}-${browserFormatDate.getDate()} ${browserFormatDate.getUTCHours()}:${browserFormatDate.getMinutes()}:${browserFormatDate.getSeconds()}`
        postedTime[i].innerHTML = moment(localFormatDate).fromNow()
      }
}

main()