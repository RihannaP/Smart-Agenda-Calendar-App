import { renderCalendar } from './calendar.mjs';  
import { previousMonthBtn, nextMonthBtn } from './buttons.mjs'; 
import { setupSelectors } from './selectors.mjs'; 

let currentMonth = new Date().getMonth(); // Get current month (0-11)
let currentYear = new Date().getFullYear(); // Get current year


async function fetchWeather() {
    const apiKey = '99afc92573fa4e288f215504251102'; // Replace with your OpenWeatherMap API key
    const city = 'London'; // Replace with your desired city
    const units = 'metric'; // You can use 'imperial' for Fahrenheit or 'metric' for Celsius
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.main) {
            // Extract the temperature and weather description
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            updateWeather(temperature, description);
        } else {
            console.error("Weather data not found");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Update the weather information in the sidebar
function updateWeather(temperature, description) {
    const weatherContainer = document.querySelector('.weather');
    if (weatherContainer) {
        weatherContainer.innerHTML = `
            <p>${temperature}°C</p>
            <p>${description.toUpperCase()}</p>
        `;
    }
}





// Render the calendar when page loads
window.onload = function() {
    renderCalendar(currentYear, currentMonth);  // Initial rendering

    // Set up event listeners for the previous and next buttons
    previousBtn.addEventListener("click", () => { previousMonthBtn(); });
    nextBtn.addEventListener("click", () => { nextMonthBtn(); });

    document.getElementById().addEventListener("click", () => { previousMonthBtn(); })
    document.getElementById().addEventListener("click", () => { nextMonthBtn(); })
};

// Set up the year and month selectors
setupSelectors(currentYear, currentMonth, renderCalendar);
let container = document.createElement("div");
container.classList.add("calendar-container");

let sidebar = document.createElement("div");
sidebar.classList.add("sidebar");
sidebar.innerHTML = `
    <div class="weather">
        <p>12°C</p>
        <p>PARTLY SUNNY</p>
    </div>
    <div class="tasks">
        <div class="task">09:00 - Send a message to James</div>
        <div class="task">11:00 - Visit a Neil bar</div>
        <div class="task">15:00 - Make a dinner for Carl</div>
    </div>
`;

let calendar = document.createElement("div");
calendar.classList.add("calendar");

container.appendChild(sidebar);
container.appendChild(calendar);
document.body.appendChild(container);
let previousBtn = document.createElement('button')
previousBtn.classList.add("nav-btn");

    previousBtn.innerHTML = "Prev"
    container.appendChild(previousBtn);

let nextBtn =document.createElement ('button')// it creates the next month button 
nextBtn.classList.add("nav-btn");
    nextBtn.innerHTML = "Next"
    container.appendChild(nextBtn); 

   export{container, calendar}