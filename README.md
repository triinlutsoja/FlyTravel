## How to run the FlyTravel application?

### Setting Up the Database
This app uses MySQL for the database. If you don’t have MySQL installed locally, use Docker Compose:
1. Make sure Docker is installed and running.
2. In the project root, run `docker-compose up`.

This will start a MySQL container on host port 3308 with a database named `flightdb`. The application automatically 
initializes the database schema with `schema.sql`.

