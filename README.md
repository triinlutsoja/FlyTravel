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