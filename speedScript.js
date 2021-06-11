const randomPhraseAPI = 'http://api.quotable.io/random'
const displayPhraseElement = document.getElementById('displayPhrase')
const inputPhraseElement = document.getElementById('inputPhrase')
const timerElement = document.getElementById('timer')

let correct = true
inputPhraseElement.addEventListener('input', () => {
    const arrayPhrase = displayPhraseElement.querySelectorAll('span')
    const arrayValue = inputPhraseElement.value.split('')
    arrayPhrase.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if(correct) renderNewPhrase()
})

function getRandomPhrase() {
    return fetch(randomPhraseAPI)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewPhrase() {
    const phrase = await getRandomPhrase()
    displayPhraseElement.innerHTML = ''
     phrase.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        displayPhraseElement.appendChild(characterSpan)
    });
   console.log(phrase)
    inputPhraseElement.value = null
    startTimer()
}

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval (() => {
       timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewPhrase()
