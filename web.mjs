
import { monthGrid, getEventsForMonth, findEventForDay, getTaskForMonth, findTaskForDay } from "./common.mjs";
import { loadSecond } from "./scriptTracker.js";

window.onload = function() {
    renderCalendar();    
    loadSecond();
    fetchWeather();
}

let currentMonth = new Date().getMonth() // between 0 to 11
let currentYear = new Date().getFullYear()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let container = document.createElement("div");
container.classList.add("calendar-container");


let calendar = document.createElement("div");
calendar.classList.add("calendar");

container.appendChild(calendar);
document.body.appendChild(container);
    


////////////// CALENDAR////////////


function renderCalendar() {
    let grid = monthGrid(currentYear, currentMonth);
    let eventsForMonth = getEventsForMonth(currentYear, currentMonth);
    let taskForMonth = getTaskForMonth(currentMonth)
    let calendarTableHTML = `
        <nav class="navigation">
        <button id="prevBtn">Prev</button>
        <h2>${months[currentMonth]} ${currentYear}</h2>
        <button id="nexBtn">Next</button>
        </nav>
        <div>
        
        <table border="1">
            <thead>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody>
    `;

    grid.forEach(week => {
        calendarTableHTML += "<tr>";
        week.forEach(day => {
            let eventName = "";
            let eventClass = "";
            let taskClass ="";
            let taskName ="";

            if (day) {
                let event = findEventForDay(eventsForMonth, currentYear, currentMonth, day);
                let task = findTaskForDay(taskForMonth, currentYear, currentMonth, day)
                
                
                if (event) {
                    eventName = `<br><span class="event">${event.name}</span>`;
                    eventClass = 'class="commemorative-day"';// highlight class
                } 
                if(task){
                    taskName = `<br><span class="taskDay">${task.topic}</span>`;
                    taskClass = 'class="task-day"';// highlight class
                }
            }
         
            calendarTableHTML += `<td ${eventClass}${taskClass}>${day || ""} ${eventName} ${taskName}</td>`;
        });          
        calendarTableHTML += "</tr>";
    });

    calendarTableHTML += `</tbody></table></div>
        <nav class="navigation">
        <select id="selectY"></select>
        <select id="selectM"></select>
        </nav>
    `
    calendar.innerHTML = calendarTableHTML;

    document.getElementById("prevBtn").addEventListener("click", ()=> {previousMonthBtn()})
    document.getElementById("nexBtn").addEventListener("click", ()=> {nextMonthBtn()})



    let yearSelect = document.getElementById("selectY")
    function updateYearSelector() {
        yearSelect.innerHTML = ""; // Clear existing options
        const option = document.createElement("option");
        option.value = currentYear;
        option.textContent = currentYear;
        yearSelect.appendChild(option);
    }
    updateYearSelector()
    
    // Handle scroll (mouse wheel)
    yearSelect.addEventListener("wheel", (event) => {
        if (event.deltaY < 0) {
            currentYear++; // Scroll up → Increase
        } else {
            currentYear--; // Scroll down → Decrease
        }
        updateYearSelector();
        renderCalendar()
    });

let monthSelect = document.getElementById('selectM');
  months.map((item, index) => {
    let option = document.createElement('option');
    option.value = index
    option.textContent = item
    if(index === currentMonth){ option.selected = true}
    monthSelect.append(option);
})
monthSelect.addEventListener('change', function() {
    currentMonth = parseInt(this.value);
    renderCalendar();
});

}


////////////// BUTTON////////////

// Function for moving to previous Month
function previousMonthBtn(){
    currentMonth --
    if (currentMonth < 0){
        currentMonth = 11
        currentYear --
    }
   renderCalendar()
}

function nextMonthBtn(year, month){// creating the function to move to the next month 
    currentMonth ++ // moves to the next month
    if ( currentMonth> 11){// the year transition past December 
        currentMonth = 0 // loops back to january 
        currentYear ++ // goes to the next year 
    }
    renderCalendar()
}


////////////// SELECTION////////////

// async function fetchWeather() {
//   const apiKey = '';
//   const city = 'London';
//   const units = 'metric';
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.main) {
//       const temperature = data.main.temp;
//       const description = data.weather[0].description;
//       updateWeather(temperature, description);
//     } else {
//       console.error("Weather data not found:", data);
//     }
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//   }
// }

async function fetchWeather() {
    // ⚡ Temporary simulation to test your code visually
    const simulatedTemperature = 15.6;
    const simulatedDescription = "partly cloudy";

    console.log("⚙️ Using simulated weather data...");
    updateWeather(simulatedTemperature, simulatedDescription);
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
        
        <!-- Agenda Display -->
        <div id="agenda-container">
            <p class="weather">Agenda</p>
            <div id="agenda"></div>
        </div>
    </div>
`;
container.appendChild(sidebar);


export{renderCalendar}