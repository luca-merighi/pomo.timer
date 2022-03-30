const profileName = document.getElementById('profile-name')
const profileImage = document.getElementById('profile-image')

const profileNameInLocalStorage = JSON.parse(localStorage.getItem('name'))
const profileImageInLocalStorage = JSON.parse(localStorage.getItem('image'))

if(profileNameInLocalStorage && profileImageInLocalStorage) {
    profileName.innerText = profileNameInLocalStorage
    profileImage.src = profileImageInLocalStorage
} else {
    window.location.href = '../../login-form/index.html'
}

const logoutIcon = document.querySelectorAll('.icon')
logoutIcon.forEach((result) => {
    result.addEventListener('click', function() {
        window.localStorage.removeItem('name')
        window.localStorage.removeItem('image')
        window.location.href = '../../login-form/index.html'
    })
    
    result.addEventListener('keypress', function(event) {
        if(event.keyCode === 13) {
            window.localStorage.removeItem('name')
            window.localStorage.removeItem('image')
            window.location.href = '../../login-form/index.html'
        }
    })
})

