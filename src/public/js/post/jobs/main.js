const date = document.getElementsByClassName("date")
const salary = document.getElementsByClassName("salary")
const li = document.querySelectorAll(".li")
const text = document.querySelectorAll(".text")
const btnseeMore = document.querySelectorAll(".btn-seeMore")
const notfound = document.querySelector(".notfound")
const like_value = document.querySelectorAll(".like-value")
const like_button = document.querySelectorAll(".like-button")
const pushIllustration = document.querySelectorAll(".ph-arrow-fat-up")

var clicked = false
var count = []

function getItems() {
  let inputItems = document.querySelector("#searchItems").value
  inputItems = inputItems.toLowerCase()
  let vancancy = document.querySelectorAll(".vancancy")

  for(let i=0;i < vancancy.length;i++) {
    if(!vancancy[i].innerHTML.toLowerCase().includes(inputItems)) {
      li[i].style.display = "none"
    } else {
      li[i].style.display = "block"
    }

    if(li[i].style.display == "none") {
      count.push(1)
    }
    if(li[i].style.display == "block") {
      count = []
    }

    if(count.length >= li.length) {
      notfound.style.display = "block"
      notfound.innerHTML = `No result for "${inputItems}" :-(`
    } else if(count.length < li.length) {
      notfound.style.display = "none"
    }
  }
}

const main = () => {
  for(let j=0;j < li.length;j++) {
    if(text[j].textContent.length > 250) {
      btnseeMore[j].style.display = "block"
      btnseeMore[j].onclick = () => {
        if(!clicked) {
          text[j].style.height = "100px"
          btnseeMore[j].innerHTML = "...see more"
          clicked = true
        } else if(clicked) {
          text[j].style.height = "auto"
          btnseeMore[j].innerHTML = "see less"
          clicked = false
        }
      }
    } else if(text[j].textContent.length < 250) {
      btnseeMore[j].style.display = "none"
      text[j].style.height = "auto"
    }
  } 

  for(var i=0; i < date.length;i++) {
    var browserFormatDate = new Date(date[i].textContent)
    var localFormatDate = `${browserFormatDate.getFullYear()}-${Number(browserFormatDate.getMonth() + 1)}-${browserFormatDate.getDate()} ${browserFormatDate.getUTCHours()}:${browserFormatDate.getMinutes()}:${browserFormatDate.getSeconds()}`
    date[i].innerHTML = moment(localFormatDate).fromNow()
  }
  
  for(var i=0; i < salary.length;i++) {
    salary[i].innerHTML = `${Number(salary[i].textContent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }
  
  for(let i=0;i < li.length;i++) {
    like_button[i].onclick = () => {
        var userId = like_button[i].name.substring(0,36)
        var xml = new XMLHttpRequest()

        xml.open("GET", `http://localhost:3333/pushed/${like_button[i].name}`)
        xml.onload = () => {
            const data = JSON.parse(xml.response)
            data.push.map((value) => {
              if(value.user_id === userId) {
                if(value.pushed) {
                  pushIllustration[i].classList = "ph-fill ph-arrow-fat-up"
                  like_value[i].innerHTML = data.pushes
                } else {
                  pushIllustration[i].classList = "ph ph-arrow-fat-up"
                  like_value[i].innerHTML = data.pushes 
                }
              }
            })
        }
        xml.send()
        }
    }
}

main()