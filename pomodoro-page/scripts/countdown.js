const Timer = {
    time: 30 * 60,
    currentTime: 0,
    interval: null,
    level: window.localStorage.getItem('level'),
    startButton: document.querySelector('.start-button'),
    pauseButton: document.querySelector('.pause-button'),
    resumeButton: document.querySelector('.resume-button'),
    restartButton: document.querySelector('.restart-button'),

    timeToMinutes: time => Math.floor(time / 60),
    timeToSeconds: time => time % 60,
    formatTime: time => String(time).padStart(2, '0'),    

    init() {
        Timer.currentTime = Timer.time
        Timer.interval = setInterval(Timer.countdown, 1000)
    },

    pause() {
        clearInterval(Timer.interval)

        Timer.resumeButton.classList.remove('hide')
        Timer.pauseButton.classList.add('hide')
    },

    resume() {
        Timer.interval = setInterval(Timer.countdown, 1000) 

        Timer.pauseButton.classList.remove('hide')
        Timer.resumeButton.classList.add('hide')
    },

    restart() {
        Timer.currentTime = Timer.time + 1
        Timer.countdown(clearInterval(Timer.interval))

        Timer.startButton.classList.remove('hide')
        Timer.pauseButton.classList.add('hide')
        Timer.restartButton.classList.add('hide')
        Timer.resumeButton.classList.add('hide')
    },

    countdown() {
        Timer.currentTime = Timer.currentTime - 1

        const minutes = Timer.formatTime(Timer.timeToMinutes(Timer.currentTime))
        const seconds = Timer.formatTime(Timer.timeToSeconds(Timer.currentTime))

        Timer.render({minutes, seconds})

        if(Timer.currentTime === 0) {
            clearInterval(Timer.interval)
            Timer.levelUp()
            Timer.restart()
        }

        if(Timer.time > Timer.currentTime) {
            Timer.startButton.classList.add('hide')
            Timer.pauseButton.classList.remove('hide')
            Timer.restartButton.classList.remove('hide')
        }
    },

    render({minutes, seconds}) {
        const minutesElement = document.querySelector('.minutes')
        const secondsElement = document.querySelector('.seconds')

        minutesElement.innerText = minutes
        secondsElement.innerText = seconds
    },

    levelUp() {
        let = Timer.level
        ++Timer.level
        
        const audio = new Audio('./public/level-up.mp3')
        audio.play()

        window.localStorage.setItem('level', JSON.stringify(Timer.level))
        Timer.loadLevel()
        
        const modal = document.querySelector('#level-up-modal')
        modal.classList.remove('hide')
    },

    loadLevel() {
        const pomodoro = document.querySelectorAll('#pomodoro')
        pomodoro.forEach((result) => {
            const storageLevel = JSON.parse(window.localStorage.getItem('level'))
            if(storageLevel == undefined || null) {
                result.innerHTML = 0

            } else if(storageLevel >= 0) {
                result.innerHTML = storageLevel
            }
            
        })
    }
}

Timer.loadLevel()