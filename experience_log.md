## Experience log

In this document I'm going to be taking notes about progress. The entries are in descending order.

### SUMMARY
I absolutely loved working on this project! I applied to CGI's summer internship last year as well but didn't have 
the skills back then to even start the assignment. This project at hand is a testament to how much I have learned in 
the past 12 months because I was able to do this! 

The backend part was rather easy for me because that's what I've been trained for. The frontend part however was 
truly a wonderful learning opportunity! Although Javascript feels very similar to Java, I'm still a newbie when it 
comes to HTML, CSS and making all three work together. I asked AI's help a lot with frontend but I never just 
copy-pasted its suggestions – I always write it through character by character to understand the code, and then I 
always ask AI to explain that code to me line by line until I understand everything what's written. It makes me 
incredibly proud that towards the end of my time with this project I had built more and more confidence, so I found myself wanting to figure frontend out by myself without consulting AI. 
This has been a real confidence booster!

Since I'm working full time (non-tech field, non-tech position), I was able to work on this application before and 
after work and on weekends. I managed to put 32 hours into this project. I didn't get to finish everything I would 
have wanted to do, so here's a to-do list for the future with some initial ideas how I would approach them.

**TO-DO LIST for the future**
- Currently the endpoint GET /flights/filter returns all flights that match selected filters but that doesn't mean that 
  these flights still have seats available. So this endpoint needs to be improved to take the number of travelers into
  consideration and find flights where all travelers can find an available seat. To fix this I'd need to adjust the 
  endpoint and the corresponding method on the service and repository layer to accept the number of travelers as a 
  request parameter. There is a slight problem, though. Since the randomly booked seats are currently created on the 
  service layer (non-persistent), the database knows nothing about them and therefore the frontend will still 
  retrieve search results that have not yet been manipulated with booked seats. So maybe one way to approach this is 
  to request seat plans for all search results, manipulate that data by marking some seats as "booked" and somehow 
  not even display the flight that doesn't have enough available seats among the search results.
- The main page `Flights.html` could have even more filtering options (price, flight duration etc). This is quite 
  easy to do, because it's possible to reuse code and just update important variables here and there! I'd have to 
  update the `schema.sql` and `data.sql` if I'd like to add a column for flight duration and have some sample data 
  available. 
- In case there are no suitable flights, then the `SearchResults.html` should display a friendly message so that the 
  user knows that everything is okay – the website works fine, but there just were no results for these filters. I 
  would probably add an alert with a message in the `searchResults.js` when the backend request returns empty.


### March 30th
- Today I started to develop the "suggested seat" functionality. I have heard that in real life plane seats are 
  filled in some specific order so that the plane is not out of balance. Unfortunately I'm not an expert in that 
  field, so I will not be taking that into consideration in my project. The booked seats were already created 
  randomly (just as written in the assignment), and no weight balance considerations were made. So the seat suggestion 
  will also be random, the user can either accept the suggestions or just click on more suitable seats to select 
  something else.
- I have a slight problem with the assignment. I understand that the requirement is that the user should be able to 
  filter the seats based on specific properties (window seat, extra legroom, near exit etc). But I realized 
  this is redundant because if I'd create a filtering feature it's more inconvenient for the user. It's way more 
  intuitive to just click on the seat plan to choose where you want to sit. This way the user needs to make less 
  clicks as well, and that is useful in the checkout process (less dropout). So I'm not going to be creating filters.
- The right place for the code of the "suggested seat" functionality is inside seating.js. First I need to fetch 
  seat plan from backend, filter out booked seats and choose randomly form the available ones. Then I need to be 
  able to change the seat's checkbox form unchecked to checked.
- I'm so proud that I wrote the Javascript code for the "suggested seat" functionality myself! I was able to figure 
  it out on my own, I just googled how to choose a random element form array. I'm truly gaining confidence with 
  frontend!
- I changed the colours on the CSS so that available seats would be green and the suggested/selected seats would be 
  blue.
- Now I need to make sure that the user is only able to select the exact number of seats what they chose on Flights.
  html as number of travelers.
- I needed to google what the equivalent of a Java HashSet is on JavaScript – it's a Set(). I also needed to find 
  out how to iterate over the Set's elements. This way I was able to randomly choose unique suggested seats and change 
  their checkbox status to "checked". Again I'm so proud that as a beginner at frontend I was able to write this 
  part on my own and without consulting of AI.
- I needed AI's help with limiting how many seats the user is allowed to select on Seating.html. It took a lot of 
  time to make that code work, but eventually I was able to turn it into what I had in mind.
- I read through the assignment again and added a new section to `Flights.html` to display all available flights. 
  This time I was able to do this without the help of AI because I just reused code from `SearchResults.html` and 
  `searchResults.js`. I only needed to use a different backend endpoint.

### March 29th
- I needed to create the search results page's Javascript code to request data from backend, but I didn't know how to 
  access the user-selected filters, so I googled and found this: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams. I didn't end up using it as it 
  was presented, but it gave me the idea of `window.location.search`. After accessing the string I was able to simply 
  append it to the fetch. I'm so much more confident with Javascript!
- I was able to figure out about 30% of searchResults.js by looking at the other JS files, comparing with HTML files.
  I pitched my 30% to AI, asked for feedback, improvements and solutions.
- I improved seating.js so the flightId would get dynamically fetched. Here the code samples from https://developer.
  mozilla.org/en-US/docs/Web/API/URLSearchParams became valuable when extracting the flight id.
- With the help of AI I added some CSS for visual action when selecting a flight on the search results page. Now the 
  flight card turns blue when you select the flight.

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
- I created the SearchResults.html page. After having created two other HTMLs I felt more confident in creating one, 
  so I tried to write it myself this time. I thing I was able to write about 25% before I needed to get some help 
  from AI. I was able to copy and paste about half of the CSS from the other CSS examples in this code and modify 
  them independently.

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