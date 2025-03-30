/*Note: Since I'm less experienced in frontend, the following code is generated with the help of AI. I knew what I
wanted to achieve, gave the requirements to AI, critically reviewed AI's code, asked it to explain it to me line by line
to learn about Javascript, fixed mistakes, and tested it. */

// Populate dropdowns with data from backend
window.addEventListener("DOMContentLoaded", () => {
    fetch("/flights/dropdowns")  // Request backend for departures and destinations
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
          const departureSelect = document.getElementById("departure");
          const destinationSelect = document.getElementById("destination");

          // Populate the departures dropdown
          data.departures.forEach(dep => {
              const option = document.createElement("option");
              option.value = dep;  // value submitted when the form is sent
              option.textContent = dep;  // the text that users see in the dropdown
              departureSelect.appendChild(option);
          });

          // Populate the destinations dropdown
          data.destinations.forEach(dest => {
              const option = document.createElement("option");
              option.value = dest;
              option.textContent = dest;
              destinationSelect.appendChild(option);
          });
      })
      .catch(err => console.error("Error fetching dropdown data:", err));
});

// Traveler count controls (+ and - buttons)
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const travelerCountSpan = document.getElementById("travelerCount");
const numTravelersInput = document.getElementById("numTravelers");
let count = 1;
decreaseBtn.addEventListener("click", () => {
  if (count > 1) {
    count--;
    travelerCountSpan.textContent = count;
    numTravelersInput.value = count;
  }
});
increaseBtn.addEventListener("click", () => {
  count++;
  travelerCountSpan.textContent = count;
  numTravelersInput.value = count;
});

// Display the whole flight plan
fetch(`/flights`)  // Request backend for all flights
        .then(response => response.json())
        .then(data => {
            
            const flightResultsContainer = document.getElementById("flightResults");
            flightResultsContainer.innerHTML = "";  // clear hardcoded placeholder content

            data.forEach(flight => {
                const date = new Date(flight.departureTime);
                const formattedDate = date.toLocaleString();

                const flightCard = document.createElement("li");
                flightCard.classList.add("flight-card");

                flightCard.setAttribute("data-flightid", flight.id)

                // Populate the flight card with flight details
                flightCard.innerHTML = `
                    <h2>Flight ${flight.flightNumber}</h2>
                    <p>From: ${flight.departure}</p>
                    <p>To: ${flight.destination}</p>
                    <p>Departure: ${formattedDate}</p>
                    <p>Price: €${flight.price}</p>
                `;

                // Add click event to mark flight as selected
                flightCard.addEventListener("click", () => {
                    // Remove "selected" class from all flight cards for visual feedback
                    document.querySelectorAll(".flight-card").forEach(card => card.classList.remove("selected"));
                    // Add "selected" class to the clicked flight card
                    flightCard.classList.add("selected");
                    // Update the hidden input with this flight's id
                    document.getElementById("selectedFlightId").value = flight.id;
                });
                
                // Append the flight card to the results container
                flightResultsContainer.appendChild(flightCard);
            });
        })
        .catch(err => console.error("Error fetching suitable flights:", err));

// Before form submission make sure that exactly one flight is selected
document.getElementById("flightSelectionForm").addEventListener("submit", function (e) {
  e.preventDefault();  // Prevent default form submission behavior
  
  const flightId = document.getElementById("selectedFlightId").value;
  const numTravelers = document.getElementById('numTravelers').value;

  if (flightId) {
      let url = new URL(window.location.origin + "/Seating.html");
      url.searchParams.append("flightId", flightId);
      url.searchParams.append("numTravelers", numTravelers);

      // Redirect to the constructed URL
      window.location.href = url.toString();
  } else {
      alert("Please select a flight before continuing.");
  }
});

// Search form submission with date conversion
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();  // Prevent default form submission behavior

  // Get the selected form values
  const departure = document.getElementById('departure').value;
  const destination = document.getElementById('destination').value;
  const departureDate = document.getElementById('departureDate').value;
  const numTravelers = document.getElementById('numTravelers').value;

  if (departureDate) {
    // Build the datetime range strings
    const earliestDepartureTime = departureDate + " 00:00:00";
    const latestDepartureTime = departureDate + " 23:59:59";

    // Construct dynamic URL with these parameters
    let url = new URL(window.location.origin + "/SearchResults.html");
    url.searchParams.append("earliestDepartureTime", earliestDepartureTime);
    url.searchParams.append("latestDepartureTime", latestDepartureTime);

    if (departure) {
      url.searchParams.append("departure", departure);
    }
    if (destination) {
      url.searchParams.append("destination", destination);
    }
    if (numTravelers) {
      url.searchParams.append("numTravelers", numTravelers);
    }

    // Redirect to the constructed URL
    window.location.href = url.toString();
  } else {
    // Fallback
    this.submit();
  }
});