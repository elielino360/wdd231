// Selection of elements in HTML
const myPlace = document.querySelector('#place');
const myTemperature = document.querySelector('#temperature');
const temDescription = document.querySelector('#description');
const icon = document.querySelector('#icon');
const todayForecast = document.querySelector('#today');
const tomorrowForecast = document.querySelector('#tommorow');
const nextForecast = document.querySelector('#next');

const myKey = "206608c06be3f59d889098d5272ce411";
const lat = "6.5243731875628725";
const long = "3.379577235959822";

// API URLs
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${myKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=${myKey}`;

async function myWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
            console.log(data);
        } else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

// Fetch weather forecast for the next three days
async function fetchWeatherForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayPlace(data);
            displayThreeDayForecast(data);
            console.log(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Display current weather
function displayWeather(data) {
    myPlace.innerHTML = data.name;
    myTemperature.innerHTML = `${data.main.temp}&deg;F`;
    temDescription.innerHTML = data.weather[0].description;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', data.weather[0].description);
}

// Display the place name from the forecast data
function displayPlace(data) {
    myPlace.innerHTML = data.city.name;
}

// Display a three-day weather forecast
function displayThreeDayForecast(data) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const today = now.getDay();
    const tomorrow = (today + 1) % 7;
    const nextDay = (today + 2) % 7;

    // Variables to hold the forecast data
    let todayData, tomorrowData, nextDayData;

    // Loop through the forecast data to find data for today, tomorrow, and the day after
    data.list.forEach(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const forecastDay = forecastDate.getDay();

        if (forecastDay === today && !todayData) {
            todayData = forecast;
        } else if (forecastDay === tomorrow && !tomorrowData) {
            tomorrowData = forecast;
        } else if (forecastDay === nextDay && !nextDayData) {
            nextDayData = forecast;
        }
    });

    // today forecast
    if (todayData) {
        todayForecast.innerHTML = `
            <strong>${dayNames[today]}</strong><br>
            Temp: ${todayData.main.temp}&deg;F<br>
            ${todayData.weather[0].description}
            <img src="https://openweathermap.org/img/wn/${todayData.weather[0].icon}@2x.png" alt="${todayData.weather[0].description}">
        `;
    }

    //tomorrow forecast
    if (tomorrowData) {
        tomorrowForecast.innerHTML = `
            <strong>${dayNames[tomorrow]}</strong><br>
            Temp: ${tomorrowData.main.temp}&deg;F<br>
            ${tomorrowData.weather[0].description}
            <img src="https://openweathermap.org/img/wn/${tomorrowData.weather[0].icon}@2x.png" alt="${tomorrowData.weather[0].description}">
        `;
    }

    // next tomorrow forecast
    if (nextDayData) {
        nextForecast.innerHTML = `
            <strong>${dayNames[nextDay]}</strong><br>
            Temp: ${nextDayData.main.temp}&deg;F<br>
            ${nextDayData.weather[0].description}
            <img src="https://openweathermap.org/img/wn/${nextDayData.weather[0].icon}@2x.png" alt="${nextDayData.weather[0].description}">
        `;
    }
}

// Calling of the functions
myWeather();
fetchWeatherForecast();
document.addEventListener("DOMContentLoaded", function() {
    
    myWeather();
    fetchWeatherForecast();

    fetchMembers().then(function(members) {
        if (members) {
            myspotlight(members);
        }
    });
});

function fetchMembers() {
    return fetch('./data/members.json')
        .then(function(response) {
            return response.json(); 
        })
        .catch(function(error) {
            console.error('Error fetching members:', error);
        });
}

function getRandomMembers(members) {
    var eligibleMembers = members.filter(function(member) {
        return member.membershipLevel === 2 || member.membershipLevel === 3;
    });

    eligibleMembers.sort(function() {
        return 0.5 - Math.random();
    });

    return eligibleMembers; 
}

function myspotlight(members) {
    var spotlightMembers = getRandomMembers(members);
    
    var grid1 = document.querySelector('.grid1');
    var grid2 = document.querySelector('.grid2');
    var grid3 = document.querySelector('.grid3');

    var grids = [grid1, grid2, grid3];

    for (var i = 0; i < spotlightMembers.length; i++) {
        var member = spotlightMembers[i];
        var grid = grids[i];

        if (grid) {
            grid.querySelector('#comName').textContent = member.name;
            grid.querySelector('#logo').innerHTML = '<img src="' + member.icon + '" alt="' + member.name + ' logo" class="myspotlight-icon">';
            grid.querySelector('#phone').textContent = "Phone: " + member.phone;
            var webLink = '<a href="' + member.website + '" target="_blank" style="color: blue; text-decoration: none; font-weight: bold;">Visit Website</a>';
            grid.querySelector('#webLink').innerHTML = webLink;
        }
    }
}
