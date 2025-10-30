
import { monthGrid, getEventsForMonth, findEventForDay, getTaskForMonth, findTaskForDay } from "./calendar.mjs";
import { loadTracker } from "../Tracker/scriptTracker.js";

window.onload = function() {
    renderCalendar();    
    loadTracker();
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
        <button id="nextBtn">Next</button>
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
        <nav class="navigation-YM">
        <label for="selectYM">Select Month and Year:</label>
        <input type="month" id="selectYM" min="12-2020" max="12-2030"/>
        </nav>
    `
    calendar.innerHTML = calendarTableHTML;
    defaultYMPicker();  
    document.getElementById("prevBtn").addEventListener("click", ()=> {previousMonthBtn()})
    document.getElementById("nextBtn").addEventListener("click", ()=> {nextMonthBtn()})
    document.getElementById("selectYM").addEventListener('change', (e) => {
    const [year, month] = e.target.value.split('-').map(Number);
    console.log([month,year])
    currentYear = year;
    currentMonth = month - 1; // months are 0-based
    renderCalendar();
});

}

////////////// Month-Year Selection////////////


function defaultYMPicker() {
  let dateInput = document.getElementById('selectYM');
  if (dateInput) {
    const month = String(currentMonth + 1).padStart(2, '0'); // months are 0–based

    dateInput.value = `${currentYear}-${month}`;
  }
}

// function defaultYMPicker() {
//   let dateInput = document.getElementById('selectYM');
//   if (dateInput) {
//     const month = String(currentMonth + 1).padStart(2, '0'); // months are 0–based
//     dateInput.value = `${currentYear}-${month}`;
//   }
// }
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


////////////// Weather Function////////////

async function fetchWeather() {
  const apiKey = '25e12fb8caca43ad9e7232800252710';
  const city = 'London';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.current) {
      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const iconUrl = `https:${data.current.condition.icon}`;
      updateWeather(temperature, description, iconUrl);
    } else {
      console.error("Weather data not found:", data);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// async function fetchWeather() {
//     // ⚡ Temporary simulation to test your code visually
//     const simulatedTemperature = 15.6;
//     const simulatedDescription = "partly cloudy";

//     console.log("⚙️ Using simulated weather data...");
//     updateWeather(simulatedTemperature, simulatedDescription);
// }


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

////////////// Sidebar (Weather/Agenda)////////////

let sidebar = document.createElement("div");
sidebar.classList.add("sidebar");

// --- Weather ---
const weatherDiv = document.createElement("div");
weatherDiv.classList.add("weather");
sidebar.appendChild(weatherDiv);

// --- Tasks---
const tasksDiv = document.createElement("div");
tasksDiv.classList.add("tasks");

const tasks = [
  "09:00 - Send a message to James",
  "11:00 - Visit a Neil bar",
  "15:00 - Make a dinner for Carl"
];

tasks.forEach(taskText => {
  const task = document.createElement("div");
  task.classList.add("task");
  task.textContent = taskText;
  tasksDiv.appendChild(task);
});

// --- Agenda ---
const agendaContainer = document.createElement("div");
agendaContainer.id = "agenda-container";

const agendaTitle = document.createElement("p");
agendaTitle.classList.add("weather");
agendaTitle.textContent = "Agenda";

const agendaDiv = document.createElement("div");
agendaDiv.id = "agenda";


agendaContainer.appendChild(agendaTitle);
agendaContainer.appendChild(agendaDiv);

tasksDiv.appendChild(agendaContainer);

sidebar.appendChild(weatherDiv);
sidebar.appendChild(tasksDiv);
container.appendChild(sidebar);

export{renderCalendar}