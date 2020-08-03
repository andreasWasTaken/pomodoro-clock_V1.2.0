


// Settings
const $breakDisplay = document.getElementById('break-display')
const $sessionDisplay = document.getElementById('session-display')

const $breakArrowUp = document.getElementById('breakArrowUp')
const $breakArrowDown = document.getElementById('breakArrowDown')
const $sessionArrowUp = document.getElementById('sessionArrowUp')
const $sessionArrowDown = document.getElementById('sessionArrowDown')

// Time Display
const $clockStatus = document.getElementById('clockStatus')
const $timeDisplay = document.getElementById('timeDisplay')
const $timeDisplayContainer = document.getElementsByClassName('time-display-container')[0]

// Controls
const $btnPlay = document.getElementById('btnPlay')
const $btnPause = document.getElementById('btnPause')
const $btnUndo = document.getElementById('btnUndo')

// Audio
const $alarmSound = document.getElementById('alarmSound')


function displayTime(min, sec) {
    // Zero-padding
    min = min < 10 ? String(min).padStart(2, '0') : min
    sec = sec < 10 ? String(sec).padStart(2, '0') : sec

    time = `${min}:${sec}`

    $timeDisplay.textContent = time
}


function startClock() {
    clockActive = true

    interval = window.setInterval(() => {
        if (currentSeconds === 0) {
            currentMinutes -= 1
            currentSeconds = 59
        }
        else {
            currentSeconds -= 1
        }

        if (currentMinutes === 0 & currentSeconds === 0) {
            $alarmSound.play()

            clockStatus *= -1
            currentMinutes = parseInt($breakDisplay.textContent)

            if (clockStatus === 1) {
                $clockStatus.textContent = 'Break'
                $timeDisplayContainer.style.borderColor = '#911929'
                $clockStatus.style.color = '#911929'
                $timeDisplay.style.color = '#911929'
            } else {
                $clockStatus.textContent = 'Session'
                $timeDisplayContainer.style.borderColor = '#054a38'
                $clockStatus.style.color = 'white'
                $timeDisplay.style.color = 'white'
            }       
        }
        displayTime(currentMinutes, currentSeconds)
    }, 1000)
}


function stopClock() {
    clockActive = false
    window.clearInterval(interval)
}


function resetClock() {
    clockStatus = -1
    currentMinutes = parseInt($sessionDisplay.textContent)
    currentSeconds = 0
    stopClock()
    displayTime(currentMinutes, currentSeconds)
}


var interval;

let currentMinutes = parseInt($sessionDisplay.textContent)
let currentSeconds = 0

let sessionTime = parseInt($sessionDisplay.textContent)
let breakTime = parseInt($breakDisplay.textContent)

let clockStatus = -1    // -1 --> 'Session', 1 --> 'Break'
let clockActive = false

$breakArrowUp.addEventListener('click', () => { 
    breakTime >= 50 ? breakTime = 59 : breakTime += 1
    $breakDisplay.textContent = breakTime  
})
$breakArrowDown.addEventListener('click', () => {
    breakTime <= 0 ? breakTime = 0 : breakTime -= 1
    $breakDisplay.textContent = breakTime
})
$sessionArrowUp.addEventListener('click', () => {
    sessionTime >= 59 ? sessionTime = 59 : sessionTime += 1
    $sessionDisplay.textContent = sessionTime

    if (!clockActive) {
        currentMinutes = sessionTime
        displayTime(currentMinutes, currentSeconds)
    }
})
$sessionArrowDown.addEventListener('click', () => {
    sessionTime <= 0 ? sessionTime = 0 : sessionTime -= 1
    $sessionDisplay.textContent = sessionTime

    if (!clockActive) {
        currentMinutes = sessionTime
        displayTime(currentMinutes, currentSeconds)
    }
})

$btnPlay.addEventListener('click', () => {
    startClock()
})
$btnPause.addEventListener('click', () => {
    stopClock()
})
$btnUndo.addEventListener('click', () => {
    resetClock()
})