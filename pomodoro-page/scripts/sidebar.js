const menu = document.querySelector('.menu')
const close = document.querySelector('.close')
const sidebar = document.querySelector('#sidebar')

menu.addEventListener('click', function() {
    sidebar.classList.remove('hide')
})

menu.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
        sidebar.classList.remove('hide')
    }
})

close.addEventListener('click', function() {
    sidebar.classList.add('hide')
})

close.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
        sidebar.classList.add('hide')
    }
})