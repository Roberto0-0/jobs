const date = document.getElementsByClassName("date")
const salary = document.getElementsByClassName("salary")

const main = () => {
  for(var i=0; i < date.length;i++) {
    date[i].innerHTML = `${dayjs(date[i].textContent).format("DD/MM/YY")}`
  }
  
  for(var i=0; i < salary.length;i++) {
    salary[i].innerHTML = `${Number(salary[i].textContent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }
}

main()