
import daysData from "./days.json" with { type: "json" };
import { getData, addData, getUserIds, clearData } from "./storage.js";
// Function to generate calendar grid for a given month

function monthGrid(year, month){
    let dayOne = new Date(year, month, 1).getDay()
    dayOne = dayOne === 0? 7 : dayOne;
    let LastDate = new Date(year, month+1, 0).getDate()
    let dayEnd = new Date(year, month, LastDate ).getDay()
    let gridArray =[]
    let week = new Array(7).fill(null);

    for (let i = 1; i < dayOne; i++) {
        week[i - 1]= ""; // Empty cells before the first day
    }
    let index = dayOne - 1;
    for(let day=1; day<=LastDate; day++){
        week[index] = day
        index++;
        if(index === 7 || day === LastDate){
            gridArray.push([...week])
            week = new Array(7).fill("");
            index = 0;
        
        }
        
    }
   return gridArray;

}


// this helps to assess if the date is a commemorative day

function isEventDay(event, year, month, day) {
    let eventDate = new Date(year, month, day); // e.g Mon Feb 10 2025 00:00:00 GMT+0000 
    let eventDayName = eventDate.toLocaleString('en-us', { weekday: 'long' }); // e.g Monday
    
    if (event.dayName !== eventDayName) {
        return false; // Skip if it's not the correct weekday
    }

    let occurrences = [];
    
    for (let d = 1; d <= 31; d++) {
        let tempDate = new Date(year, month, d);
        if (tempDate.getMonth() !== month) break; // Stop when the next month starts

        if (tempDate.toLocaleString('en-us', { weekday: 'long' }) === event.dayName) {
            occurrences.push(d);
        }
    }

    let occurrenceIndex = ["first", "second", "third", "fourth"].indexOf(event.occurrence);
    if (occurrenceIndex !== -1 && occurrences[occurrenceIndex] === day) {
        return true;
    }

    if (event.occurrence === "last" && occurrences[occurrences.length - 1] === day) {
        return true;
    }
    return false;
}

// Filters the events for the specified month
 function getEventsForMonth(year, month) {
     return daysData.filter(event => 
         new Date(`${event.monthName}, ${year}`).getMonth() === month      
            )
     let test = daysData.filter(event => 
         new Date(`${event.monthName}, ${year}`).getMonth() === month )
     console.log(test)
}


                                              
// This function checks if a day has an event and returns the event details
function findEventForDay(events, year, month, day) {
    if (events.length === 0 ){return false}

    return events.find(e => isEventDay(e, year, month, day));


    if (events.length === 0 ){console.log(false)}
    console.log( events.find(e => isEventDay(e, year, month, day)))
}


function getTaskForMonth(month) {
    let userIds = getUserIds();
    let dataTask = userIds.map(user => getData(user)).filter(user => user !== null);
    let dates = dataTask.flat().map(obj => obj);

    console.log(`🔍 Checking tasks for month (zero-based): ${month}`);
    console.log("📌 All Retrieved Tasks:", dates);

    let filteredDates = dates.filter(task => {
        let taskMonth = new Date(task.date).getUTCMonth(); // Ensure zero-based month
        console.log(`Comparing task date ${task.date} → extracted month: ${taskMonth}, expected: ${month}`);
        return taskMonth === month;
    });

    console.log("✅ Filtered Tasks for Month:", filteredDates); // Final Debugging Log

    return filteredDates;
}

// // Call the function
// getTaskForMonth(2);



function findTaskForDay(taskDates, year, month, day) {
    if (taskDates.length === 0) {
        console.log("No tasks found for month", month);
        return false;
    }

    let foundTask = taskDates.find(e => isTaskDay(e, year, month, day));

    console.log(`Checking tasks for ${year}-${month}-${day}:`, foundTask); // Debugging line

    return foundTask || false;
}


function isTaskDay(e, year, month, day) {
    let formattedTaskDate = taskFormatDate(new Date(e.date));
    let formattedTargetDate = `${year}${(month+1).toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`;

    console.log("Comparing:", formattedTaskDate, "vs", formattedTargetDate); // Debugging line

    return formattedTaskDate === formattedTargetDate;
}



function taskFormatDate(date) {
    let formatted = date.toISOString().split("T")[0].replace(/-/g, "");
    console.log("Formatted Task Date:", formatted); // Debugging line
    return formatted;
}





export{monthGrid, isEventDay, getEventsForMonth, findEventForDay, getTaskForMonth, findTaskForDay }         