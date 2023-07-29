const date = document.getElementsByClassName("date")
const salary = document.getElementsByClassName("salary")
const li = document.querySelectorAll(".li")
const text = document.querySelectorAll(".text")
const btnseeMore = document.querySelectorAll(".btn-seeMore")

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
}

main()