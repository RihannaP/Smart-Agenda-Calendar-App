# Smart Agenda Calendar App

🚀 **Author:** Rihanna  

---

## Project Overview

This project combines two useful tools into one interactive application:

1. **Days Calendar** – Displays special commemorative days dynamically.
2. **Spaced Repetition Tracker** – Helps users track study topics with scheduled revisions.  
3. **Weather Display (Future API Integration)** – Currently shows static weather data, to be upgraded with live API support.

The goal is to provide an interactive calendar and study tool that keeps users informed about commemorative days, study schedules, and the weather—all in one interface.

---

## Features

### Calendar
- Dynamic calendar UI showing days of the current month in a weekly grid.
- Navigate between months and select any year.
- Automatic calculation of commemorative days from JSON data.
- Persistent date logic across all years.
- No hardcoded dates—events are dynamically generated.
- iCal export support for Google Calendar.

### Spaced Repetition Tracker
- Track multiple topics and their revision schedules.
- Automatically calculate upcoming revision dates (1 week, 1 month, 3 months, 6 months, 1 year).
- Simple agenda-style layout.
- Persistent storage using LocalStorage.
- Delete and manage topics dynamically.

### Weather Feature
- Static weather display integrated into the dashboard.
- Designed for future API integration to provide real-time weather updates.

### Testing
- Unit tests for core functions to ensure correctness.
- Testable using Jest for JavaScript functions.

---

## Technologies Used
- HTML, JavaScript
- LocalStorage for persistent data
- JSON for events data
- Node.js `http-server` for local testing
- Jest for unit testing

---


**Using the App**
Calendar
- Navigate months using Previous/Next buttons.

- Select a specific month and year to jump directly.

- Click on an event for more details (if enabled).

**Spaced Repetition**
- Add topics and let the app calculate future revision dates.

- Delete topics as needed.

- View upcoming reviews in an agenda-style layout.

**Weather**
- View static weather data in the dashboard.

- Will be replaced with dynamic API data in future updates.


**Key Functions**
- calculateFutureDates(newTopic) – Calculates revision dates for a topic.

- formatDate(dateString) – Converts dates to a human-readable format.

- deleteTopic(userId, index) – Removes a topic from LocalStorage.

- displayAgenda(userId) – Renders upcoming revision dates sorted by schedule.