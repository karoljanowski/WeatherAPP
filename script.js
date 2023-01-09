let inputEl = document.getElementById('input-city')
let buttonEl = document.querySelector('button')
let cities = []
inputEl.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather(inputEl.value)
        inputEl.value = ''
    }
})
buttonEl.addEventListener('click', function () {
    getWeather(inputEl.value)
    inputEl.value = ''
})

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ddf6cf679966fb59c68911b4009deb53&units=metric`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Error')
        })

        .then(response => makeDiv(response))
        .catch(error => {
            showError('Bad name of city')
        })

}


function getIcon(icon) {
    switch (icon) {
        case '01d':
        case '01n':
            return 'icon/sun.png'
        case '02d':
        case '02n':
            return 'icon/day.png'
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return 'icon/clouds.png'
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            return 'icon/rain.png'
        case '13d':
        case '13n':
            return 'icon/snow.png'
        case '50d':
        case '50n':
            return 'icon/mist.png'
        case '11d':
        case '11n':
            return 'icon/thunderstorm.png'
    }
}

function makeDiv(weather) {
    if (!cities.includes(weather.name)) {
        cities.push(weather.name)
        let citiesEl = document.querySelector('.cities')
        let div = document.createElement('div')
        div.classList.add('city')
        let cityEl = document.createElement('p')
        cityEl.classList.add('city-name')
        let countryEl = document.createElement('span')
        countryEl.classList.add('country')
        let tempEl = document.createElement('p')
        tempEl.classList.add('temp')
        let imgEl = document.createElement('img')
        let describeEl = document.createElement('p')
        describeEl.classList.add('describe')
        cityEl.textContent = weather.name
        countryEl.textContent = weather.sys.country
        tempEl.textContent = `${weather.main.temp} ℃`
        imgEl.src = getIcon(weather.weather[0].icon)
        describeEl.textContent = weather.weather[0].main
        let removeEl = document.createElement('button')
        removeEl.classList.add('xButton')
        let removeImg = document.createElement('img')
        removeImg.src = 'xmark.svg'
        removeEl.appendChild(removeImg)
        div.appendChild(removeEl)
        cityEl.appendChild(countryEl)
        div.appendChild(cityEl)
        div.appendChild(tempEl)
        div.appendChild(imgEl)
        div.appendChild(describeEl)
        removeEl.addEventListener('click', function () {
            cities = cities.filter(e => e !== weather.name)
            div.remove()
        })

        citiesEl.appendChild(div)
    } else {
        showError('You already add this city')
    }


}



function showError(text) {
    errorAlert(text)
    document.getElementById('okButton').addEventListener('click', function () {
        endAlert()
    })
}

function errorAlert(text) {
    let overlay = document.createElement('div')
    overlay.classList.add('overlay')


    let newDiv = document.createElement('div')
    newDiv.classList.add('alert')
    let newP = document.createElement('p')
    newP.innerHTML = text
    let newButton = document.createElement('button')
    newButton.textContent = 'OK!'
    newButton.id = 'okButton'
    newDiv.appendChild(newP)
    newDiv.appendChild(newButton)
    document.body.appendChild(newDiv)
    document.body.appendChild(overlay)
}

function endAlert() {
    document.querySelector('.overlay').remove()
    document.querySelector('.alert').remove()
}