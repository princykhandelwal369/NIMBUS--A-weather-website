const apiKey = "c4940dea36f6020cffdae3d25718c89c";

const searchInput =
document.querySelector(".search-box input");

const temperature =
document.querySelector(".temperature");

const city =
document.querySelector(".city");

const description =
document.querySelector(".description");

const humidity =
document.querySelectorAll(".info-box p")[1];

const wind =
document.querySelectorAll(".info-box p")[2];

const weatherIcon =
document.querySelector(".weather-icon i");


// 🌦️ WEATHER FUNCTION

async function getWeather(cityName){

    try{

        console.log("Searching for:", cityName);

        const apiURL =
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

        console.log(apiURL);

        const response = await fetch(apiURL);

        console.log("Response received");

        const data = await response.json();

        console.log(data);

        // ❌ ERROR CHECK
        if(data.cod != 200){

            alert(data.message);

            return;
        }

        // 🌡️ UPDATE UI

        temperature.innerHTML =
        `${Math.round(data.list[0].main.temp)}°C`;

        city.innerHTML = data.city.name;

        description.innerHTML =
        data.list[0].weather[0].description;

        humidity.innerHTML =
        `${data.list[0].main.humidity}%`;

        wind.innerHTML =
        `${data.list[0].wind.speed} km/h`;

        // 🌤️ HOURLY FORECAST

        const hourlyContainer =
        document.getElementById("hourly-container");

        hourlyContainer.innerHTML = "";

        for(let i = 0; i < 4; i++){

            const item = data.list[i];

            const time =
            item.dt_txt.split(" ")[1].slice(0,5);

            const temp =
            Math.round(item.main.temp);

            hourlyContainer.innerHTML += `

            <div class="hour-card">

                <p>${time}</p>

                <i class="fa-solid fa-cloud-sun"></i>

                <span>${temp}°</span>

            </div>

            `;
        }
        // 📅 WEEKLY FORECAST

        const forecastContainer =
        document.getElementById("forecast-section");

        forecastContainer.innerHTML = "";

        for(let i = 0; i < 5; i++){

            const item = data.list[i * 8];

            const date =
            new Date(item.dt_txt);

            const day =
            date.toLocaleDateString("en-US", {
                weekday: "short"
            });

            const temp =
            Math.round(item.main.temp);

            forecastContainer.innerHTML += `

                <div class="forecast-card">

                    <p>${day}</p>

                    <i class="fa-solid fa-cloud-sun"></i>

                    <span>${temp}°</span>

                </div>

            `;
        }



        // 🌤️ ICON CHANGE

        const weatherMain =
        data.list[0].weather[0].main;

        if(weatherMain === "Clouds"){

            weatherIcon.className =
            "fa-solid fa-cloud";

        }

        else if(weatherMain === "Rain"){

            weatherIcon.className =
            "fa-solid fa-cloud-rain";

        }

        else if(weatherMain === "Clear"){

            weatherIcon.className =
            "fa-solid fa-sun";

        }

        else if(weatherMain === "Snow"){

            weatherIcon.className =
            "fa-solid fa-snowflake";

        }

        else{

            weatherIcon.className =
            "fa-solid fa-cloud-sun";

        }

    }

    catch(error){

        console.log(error);

        alert("Something went wrong.");

    }

}



// 🔍 SEARCH

searchInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        getWeather(searchInput.value);

    }

});



// 🌸 DEFAULT WEATHER

getWeather("Delhi");