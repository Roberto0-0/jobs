const date = document.getElementsByClassName("date")
const salary = document.getElementsByClassName("salary")
const li = document.querySelectorAll(".li")
const text = document.querySelectorAll(".text")
const btnseeMore = document.querySelectorAll(".btn-seeMore")
const notfound = document.querySelector(".notfound")
const success_message = document.querySelector(".success_message")
const like_value = document.querySelectorAll(".like-value")
const like_button = document.querySelectorAll(".like-button")

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
  if(success_message) {
    setTimeout(() => {
      success_message.style.display = "none"
    }, 5000)
  }

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
    date[i].innerHTML = `${dayjs(date[i].textContent).format("DD/MM/YY")}`
  }
  
  for(var i=0; i < salary.length;i++) {
    salary[i].innerHTML = `${Number(salary[i].textContent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }
  
  for(let i=0;i < li.length;i++) {
    like_button[i].onclick = () => {
        var xml = new XMLHttpRequest()

        xml.open("GET", `http://localhost:3333/pushed/${like_button[i].name}`)
        xml.onload = () => {
            const data = JSON.parse(xml.response)
            like_value[i].innerHTML = data.pushes
        }
        xml.send()
        }
    }
}

main()