const normalLoginForm = document.querySelector('.normal-login-form')
const GitHubLoginForm = document.querySelector('.github-login-form')

const nameErrorMessage = document.querySelector('.name-error-message')
const imageErrorMessage = document.querySelector('.image-error-message')
const ghNameErrorMessage = document.querySelector('.gh-name-error-message')

function NormalLogin() {
    const inputName = document.getElementById('name')
    const inputImage = document.getElementById('image')

    const inputNameValue = inputName.value
    const inputImageValue = inputImage.files[0]

    if(inputNameValue.length >= 6 && !inputImageValue == '') {
        window.localStorage.setItem('name', JSON.stringify(inputNameValue))

        const reader = new FileReader()
        reader.readAsDataURL(inputImageValue)
        reader.onload = function() {
            window.localStorage.setItem('image', JSON.stringify(reader.result))
            window.location.href = '../pomodoro-page/index.html'
        } 
    }  
    
    if(inputNameValue.length <= 5 && inputImage.value == '') {
        nameErrorMessage.classList.remove('hide')
        imageErrorMessage.classList.remove('hide')
    }

    if(inputNameValue.length <= 5) {
        nameErrorMessage.classList.remove('hide')
    }

    if(inputImage.value == '') {
        imageErrorMessage.classList.remove('hide')
    }
}

function EnterWithGH() {
    normalLoginForm.classList.add('hide')
    GitHubLoginForm.classList.remove('hide')
}

function GitHubLogin()  {
    const GitHubName = document.getElementById('github-name')
    const GitHubNameValue = GitHubName.value
    const GitHubApi = `https://api.github.com/users/${GitHubNameValue}`
    fetch(GitHubApi)
        .then(response => response.json())
        .then(data => {
            if(data.login == GitHubNameValue) {
                data.name = window.localStorage.setItem('name', JSON.stringify(data.name))
                data.avatar_url = window.localStorage.setItem('image', JSON.stringify(data.avatar_url))
                window.location.href = '../pomodoro-page/index.html'
            } else if(data.login != GitHubNameValue) {
                ghNameErrorMessage.classList.remove('hide')
                nameErrorMessage.classList.add('hide')
                imageErrorMessage.classList.add('hide')
            }
        })
}

const backIcon = document.querySelector('.back')
backIcon.addEventListener('click', function() {
    normalLoginForm.classList.remove('hide')
    GitHubLoginForm.classList.add('hide')
})

backIcon.addEventListener('keyup', function(event) {
    if(event.keyCode === 13) {
        normalLoginForm.classList.remove('hide')
        GitHubLoginForm.classList.add('hide')
    }
})

const errorMessageIcon = document.querySelectorAll('.close-message-icon')
errorMessageIcon.forEach((result) => {
    result.addEventListener('click', function() {
        nameErrorMessage.classList.add('hide')
        imageErrorMessage.classList.add('hide')
        ghNameErrorMessage.classList.add('hide')
    })
})

const errorMessage = document.querySelectorAll('.close')
errorMessage.forEach((result) => {
    result.addEventListener('keyup', function(event) {
        if(event.keyCode === 13) {
            nameErrorMessage.classList.add('hide')
            imageErrorMessage.classList.add('hide')
            ghNameErrorMessage.classList.add('hide')
        }
    })
})
