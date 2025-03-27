## Experience log

In this document I'm going to be taking notes about progress.

### March 27th
- I didn't know why my database tables get duplicate data each run, but I knew it must be because of Spring Boot, 
  which implements the data.sql each run all over again. I searched online for solutions, but most results were 
  tailored to setups using H2, Liquibase, Hibernate, or JPA—technologies that I wasn’t using in my project. Since my 
  tech stack is based on Spring Boot with MySQL and plain JDBC, I turned to AI for help to find a solution. 
- Now I need to make the frontend interact with the backend to display booked and available seats for a selected 
  flight. I'm still trying to make this code I found online work: https://codepen.io/priteshchandra/pen/voZdgq. 
  Since I'm less experienced in frontend, I consulted with AI to come up with next steps. AI provided me a 
  Javascript code snippet that fetches the seating plan from the backend and updates the visual seat plan in the 
  frontend to show which seats are already booked. I asked AI to explain it to me line by line to enhance my 
  learning. But the code didn't work at first so I added some console.log statements to figure it out. Turns out the 
  isBooked property was undefined because there was no such property in the JSON retrieved from the database. I 
  looked at the JSON and was surprised, because it was there. The difference was that it was named "booked" and not 
  "isBooked". This was very odd to me. I asked AI and this turned out to be something Spring Boot does to adhere to 
  Java Bean naming conventions.

### March 26th
- I realized that for some reason each time I run the app, the database tables get populated with sample data all 
  over again. There are duplicate entries although each row has a new unique ID. I might have time to fix this later.
- I'm not quite sure how to solve the requirement of generating the already booked seats randomly. I know I don't 
  want to overload the database by inserting the random data. So it needs to get done without the database by 
  manipulating data in the service layer. So I first need to get the data from database, turn it into a list of Seat 
  objects and then access some of them randomly and mark them as booked. I want the amount of booked seats be random 
  so the level of occupancy is different each time. I managed this after some tries and then discovered that if a 
  random index repeats then I might end up with less booked seats than planned. So I used a HashSet to ensure 
  uniqueness.
- The endpoint to retrieve seating plan of a flight works!

### March 25th
- I changed the schema.sql so that the seats table would include properties. I decided to add one boolean column 
  for each individual property.
- I wanted to populate the seats table with sample data but figured it would be very annoying to manually type in 
  all these lines of SQL (50 flights, each with 60 seats). So I thought I should be able to write a for loop that 
  generates the SQL for me. So I wrote a Python script.

### March 24th
- Today I've been planning my next steps which was necessary and time-consuming. I know what needs to get done, but I 
  need to figure out the most logical order or doing them and setting priorities to respect the time constraint. I pitched all the individual 
  little tasks and ways how I'd complete them to AI to brainstorm. Here's the rough plan:
  - Backend: Update the seats table schema to include properties like "more legroom" etc
  - Backend: Create an endpoint to return the seating plan for a selected flight and add logic to randomly mark
    seats as booked (non-persistent).
  - Frontend: Integrate the seating plan UI with backend data to correctly display booked seats.
  - Frontend: Make sure that the seating plan endpoint returns the correct booking status and layout. 
  - Frontend: Complete the seating page by adding the header, flight details, and confirmation controls.
  - Frontend: Suggest seats by filtering them by properties such as "more legroom" etc.  
  - Backend: Implement functionality to update the seats table when a user confirms their seat selection.

### March 23rd
- Managed to make dynamically populated dropdowns work in frontend by asking AI to generate it and letting it 
  explain the code to me line by line. Since I'm less experienced with frontend this is very valuable for me. I 
  never just copy and paste code but rather prefer to type it through because this enhances learning.
- I realized that there should be a restriction about how many tickets you can buy for one flight depending on the 
  size of the plane and available seats. If I have time I might come back to it.
- I also realized that the search results should only include flights that have the desired number of available 
  seats. Currently the search results include all matching flights regardless if there are any available seats. I 
  might have time to address this later.
- I chose not to reinvent the wheel with the seating plan, so I googled to find some out of the box solution. I 
  found this: https://codepen.io/priteshchandra/pen/voZdgq. I hope I can make this work in my project to save precious 
  time and finish the most important features in time.

### March 22nd
- I realized that the user might want to use multiple filters at the same time so I need a new approach. I'm going 
  to build the SQL statement dynamically based on the chosen filters.
- Next I want to create the frontend that allows users to view flights and apply filters. I have less experience 
  with frontend, mostly self-taught. So I will be consulting with AI and using another project I'm working on as a 
  template.
- I'm not exactly sure how to get the frontend to display departure and destination locations in a dropdown list. 
  I know I need to add new methods and endpoints to the backend for this, but I don't know how it works in the 
  frontend yet. I'm going to look at some examples of dynamically populated select menus and try to figure it out.

### March 20th
- Given the time constraint for this assignment I decided to focus on necessary and skip features. 
  - To simplify I'm only going to deal with non-stop direct flights.
  - The `flights` table is going to be read-only (GET) for the customer.
- I thought a lot about how the code reviewer at CGI would be able to easily access, run and test my app. So I added 
  data.sql which contains all sample data for automatic setup. This is something I learned to do with the help of AI.
- I didn't know about JdbcTemplate because in my previous projects I had created custom solutions. Learned to use it 
  in this project.

### March 19th
- I pitched my basic setup plan to AI to discuss the best course of action.
- Basic setup: Spring Boot, MySQL, Docker Compose, README.
- Initialized database schema with schema.sql.
- Created Flight entity and related repository, service and controller.