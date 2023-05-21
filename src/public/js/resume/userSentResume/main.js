const notification = document.querySelector('.notification')

const main = () => {
    if(notification) {
        setTimeout(() => {
            notification.style.display = "none"
        }, 3000)
    }
}

main()