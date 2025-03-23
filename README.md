# Introduction
I’ve built this project using my own ideas and experience — I’m pretty confident with the backend since I’ve done it 
a lot before. For the frontend, which is newer to me, I looked at online resources and asked help from an AI assistant 
to confirm that my approach was on the right track. I took those ideas and mixed them with my own work, so what you see here is a blend of guidance from trusted sources and my personal contributions.

## How to run the FlyTravel application?

### Setting Up the Database
This app uses MySQL for the database. database connection settings are defined in `src/main/resources/application.properties`. If you don’t have MySQL installed locally, use Docker Compose:
1. Make sure Docker is installed and running.
2. In the project root, run `docker-compose up`.

This will start a MySQL container on host port 3308 with a database named `flightdb`. The application automatically 
initializes the database schema with `schema.sql` and populates it with sample data from `data.sql`.

### Running the Application
- You can run the application directly from your IDE (e.g., IntelliJ IDEA).
- The app will be available at http://localhost:8080.

### Available endpoints
- **GET /flights**: Returns a list of available flights.
- **GET /flights/filter**: Allows users to filter flights based on chosen parameters. Supports filtering by 
  departure, destination, departure time range, and price range.
  - Query parameters for /flights/filter:
    - departure (optional): Filter flights by departure location. 
    - destination (optional): Filter flights by destination. 
    - earliestDepartureTime (optional): Lower bound for departure time. Format: yyyy-MM-dd HH:mm:ss. 
    - latestDepartureTime (optional): Upper bound for departure time. Format: yyyy-MM-dd HH:mm:ss. 
    - minPrice (optional): Minimum flight price. 
    - maxPrice (optional): Maximum flight price. 
    - orderBy (optional): Field to sort by. Allowed values: departure_time, price. 
    - sortDir (optional): Sort direction. Allowed values: ASC, DESC (default is ASC).
  - Example request: GET http://localhost:8080/flights/filter?destination=Los%20Angeles&minPrice=100&maxPrice=500&orderBy=price&sortDir=ASC
- **GET /flights/dropdowns**: Returns a HashMap with distinct departures and destinations.


### Frontend implementation
The application’s frontend uses plain HTML, CSS, and JavaScript to interact with the backend. It's features include:
#### Dynamic Dropdowns:
The search form populates the departure and destination dropdown menus dynamically by retrieving distinct values from the backend endpoint /flights/dropdowns.
#### Form Submission and Date Conversion:
When the user submits the search form, JavaScript intercepts the submission and constructs a GET request URL to the /flights/filter endpoint. Specifically, if a user selects a departure date, the JavaScript code converts it into a full-day datetime range by appending " 00:00:00" as the start of the day and " 23:59:59" as the end of the day. This allows the backend to filter flights based on the entire day.
#### Additional Filters:
The form also allows users to choose the departure location (required) and destination (optional) from dynamically 
generated dropdowns, and specify the number of travelers using +/- buttons. These values are appended as query 
parameters. Note: the numTravelers parameter is currently not used in backend filtering, it will be implemented 
later to check for seat availability.
#### How to Test:
Navigate to http://localhost:8080/Flights.html in your browser. When the page loads, the dropdowns will be 
populated automatically. After form submission, the browser is redirected to a URL with the search results (currently in JSON only).