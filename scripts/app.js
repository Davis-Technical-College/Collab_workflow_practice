const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = function (data) {

    const cityDets = data.cityDets;
    const weather = data.weather;
    const iconSrc = `img-1/img/weatherIcons/${weather.WeatherIcon}.png`;

    icon.setAttribute('src', iconSrc);

    details.innerHTML = ` 
    
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="icon bg-light mx-auto text-center">
    <img src="${iconSrc}">
    </div>
    <div class="degrees my-4" style: = "font-size: xx-large;">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
        <span>=</span>
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;



    let timeSrc = weather.IsDayTime ? 'img-1/img/day.webp' : 'img-1/img/night.webp';


    time.setAttribute('src', timeSrc);

    if (card.classList.contains('d-none')) {

        card.classList.remove('d-none');
    }

}



cityForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const city = cityForm.city.value.trim();

    cityForm.reset();

    forecast.updateCity(city).then(function (data) {
        updateUI(data);
    }).catch(function (err) {
        console.log(err)
    })

    

    //set local storage
    localStorage.setItem('city', city);

});


if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(function(data){
        updateUI(data)
            })
    .catch(function(err){
        console.log(err)
    })
}

