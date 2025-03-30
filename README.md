# Introduction

Dear reviewer! If you want to follow along with how I worked, please see `experience_log.md`!

I’ve built this project using my own ideas and experience — I’m pretty confident with the backend since I’ve done it 
a lot before. For the frontend, which is newer to me, I looked at online resources and asked help from an AI assistant 
to confirm that my approach was on the right track. I took those ideas and mixed them with my own work, so what you see here is a blend of guidance from trusted sources and my personal contributions.

## How to run the FlyTravel application?

### Setting Up the Database
This app uses MySQL for the database. Database connection settings are defined in `src/main/resources/application.
properties`. If you don’t have MySQL installed locally, use Docker Compose:
1. Make sure Docker is installed and running.
2. In the project root, run `docker compose up`.

This will start a MySQL container on host port 3308 with a database named `flightdb`.

### Running the Application
- You can run the application directly from your IDE (e.g., IntelliJ IDEA).
- The app will be available at http://localhost:8080.
- Running the application automatically initializes the database schema with `schema.sql` and populates it with 
  sample data from `data.sql`. PS! Spring Boot is configured to run the `data.sql` script again each time the 
  application starts, which results in thousands of rows of duplicate data. In order to avoid that, make sure that 
  after the first run you set the property `spring.sql.init.mode=always` to `spring.sql.init.mode=never` in application.
  properties.

### Available endpoints
- **GET /flights**: Returns a list of available flights.
- **GET /flights/filter**: Allows users to filter flights based on chosen parameters. Supports filtering by 
  departure, destination, departure time range, and price range.
  - Query parameters for /flights/filter:
    - departure: Filter flights by departure location. 
    - destination (optional): Filter flights by destination. 
    - earliestDepartureTime: Lower bound for departure time. Format: yyyy-MM-dd HH:mm:ss. 
    - latestDepartureTime: Upper bound for departure time. Format: yyyy-MM-dd HH:mm:ss. 
    - minPrice (optional): Minimum flight price. 
    - maxPrice (optional): Maximum flight price. 
    - orderBy (optional): Field to sort by. Allowed values: departure_time, price. 
    - sortDir (optional): Sort direction. Allowed values: ASC, DESC (default is ASC).
  - NOTE: Although the frontend only lets the user select a single date, that date is automatically converted into a 
    full-day range—from “00:00:00” to “23:59:59”—so that all flights departing on that day are returned.
  - NOTE: Currently the endpoint returns all flights that match these filters but that doesn't mean that these 
    flights still have seats available. So this endpoint needs to be improved to take the number of travelers into 
    consideration and find flights where all travelers can find an available seat.
  - NOTE: This endpoint is vulnerable to SQL injection attacks. Since security issues are beyond the scope of this 
    assignment, I didn't spend extra time to address it.
- **GET /flights/dropdowns**: Returns a HashMap with distinct departures and destinations.
- **GET /seats**: Returns a list of Seat objects for a specific flight. Returned seat table data is manipulated 
  after the database query, some seats are automatically randomly booked but these demo bookings are not inserted 
  back to the database table.
  - Query parameters for /seats:
    - flightId: The ID of the flight for which to retrieve the seating plan.


### Frontend implementation
The application’s frontend uses plain HTML, CSS, and JavaScript to interact with the backend.

#### Flights.html
This is the main page where the user can see all available flights and is also able to search and filter flights. 
Its features include:

**Dynamic Dropdowns:** The search form on `Flights.html` populates the departure and destination dropdown menus 
dynamically by retrieving distinct values from the backend endpoint /flights/dropdowns.

**Form Submission and Date Conversion:** When the user submits the search form, JavaScript intercepts the submission 
and constructs a GET request URL to the /flights/filter endpoint. Specifically, if a user selects a departure date, the JavaScript code converts it into a full-day datetime range by appending " 00:00:00" as the start of the day and " 23:59:59" as the end of the day. This allows the backend to filter flights based on the entire day.

**Additional Filters:** The form allows users to choose the departure location (required) and destination 
(optional) from dynamically generated dropdowns, and specify the number of travelers using +/- buttons. The 
departure date is mandatory. These values are appended as query parameters.

**Flight cards:** The user can also just scroll through all available flights, select one and click on the 
"Continue" button to proceed to select seats on `Seating.html`.

**Future enhancements:**
- Add more filters such as filtering by price, flight duration etc.

**How to Test:** 
- Run the Spring Boot application.
- Navigate to http://localhost:8080/Flights.html in your browser. When the page loads, the dropdowns will be 
populated automatically. 
- Option 1:
  - Select any filters and click on the "Search" button. PS! The departure date of the sample flights ranges form 
    April 1st to April 5th 2025.
  - After form submission, the browser is redirected to SearchResults.html.
- Option 1: 
  - Select one flight from the "All flights" section, click on the "Continue" button at the bottom
  - After form submission, the browser is redirected to Seating.html.

#### SearchResults.html
This page displays all flights retrieved form the database that match user-selected filters as flight cards. 

**Visual layout:** Each flight card is generated by Javascript and includes key details: flight number, departure, destination, departure time, and price. 

**Interactive integration:** When the user clicks on a flight card, it gets highlighted in blue and the flight ID is stored (hidden). After clicking the 
"Continue" button, the user is redirected to the `Seating.html` page to choose seats on the chosen flight.

**Future enhancements:**
- If there are no flights matching filters, a message should be displayed.
- Offer sorting options.

**How to test**
To test the search results page:
- Run the Spring Boot application.
- Navigate to http://localhost:8080/Flights.html.
- Select any filters and click on the "Search" button to get redirected to `SearchResults.html`.
- Select suitable flight (The flight card gets highlighted upon clicking) and click on the "Continue" button.

#### Seating.html
This page opens after the user has selected a flight from search results and visualizes the plane's layout. This 
page displays a full seat map for a plane with 60 seats (organized into 10 rows, with 6 seats per row). Its features 
include:

**Visual layout:** The HTML and CSS render a realistic airplane seating plan, with designated areas for the cockpit, 
exits, and cabin. The code for this is not an original, is borrowed from the internet: https://codepen.io/priteshchandra/pen/voZdgq .

**Interactive integration:** The accompanying JavaScript (seating.js) fetches the seating plan of the user-selected 
flight from the backend and dynamically updates the UI. Booked seats are automatically marked as 
“Occupied” (via disabling the corresponding checkboxes and updating labels). Seats for all travelers are randomly 
suggested (pre-selected). If the user selects seats for more travelers than determined on `Flights.html` then an alert is 
displayed and further selection of extra seats is restricted.

**Future enhancements:**
- Add a continue button to proceed to checkout.
- Display the chosen flight's details.

**How to test** 
To test the seating plan page:
- Run the Spring Boot application.
- Navigate to http://localhost:8080/Seating.html?flightId=13&numTravelers=3 (just an example)
- After the page is loaded you are able to see that booked seats are marked with an "X", available seats are green 
  and suggested seats are highlighted with blue.
- If you don't like the suggested seats, unselect an already selected (highlighted) seat and select another one.
- If you are about to select an extra seat and the number of selected seats exceeds the number of travelers, an alert 
  is displayed and that extra selection is denied.
