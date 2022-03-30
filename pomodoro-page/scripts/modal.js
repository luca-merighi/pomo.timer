const closeModal = document.querySelector('.close-modal')
const modal = document.querySelector('#level-up-modal')

closeModal.addEventListener('click', function() {
    modal.classList.add('hide')
})

closeModal.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
        modal.classList.add('hide')
    }
})