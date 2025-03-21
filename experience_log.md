## Experience log

In this document I'm going to be taking notes about progress.

### March 22nd
- I realized that the user might want to use multiple filters at the same time so I need a new approach. I'm going 
  to build the SQL statement dynamically based on the chosen filters.

### March 20th
- Given the time constraint for this assignment I decided to focus on necessary and skip features. 
  - To simplify I'm only going to deal with non-stop direct flights.
  - The `flights` table is going to be read-only (GET) for the customer.
- I thought a lot about how the code reviewer at CGI would be able to easily access, run and test my app. So I added 
  data.sql which contains all sample data for automatic setup.
- I didn't know about JdbcTemplate because in my previous projects I had created custom solutions. Learned to use it 
  in this project.

### March 19th
- I pitched my basic setup plan to AI to discuss the best course of action.
- Basic setup: Spring Boot, MySQL, Docker Compose, README.
- Initialized database schema with schema.sql.
- Created Flight entity and related repository, service and controller.