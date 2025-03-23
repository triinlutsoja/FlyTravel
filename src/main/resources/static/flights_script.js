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

// Form submission with date conversion
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
  let url = new URL(window.location.origin + "/flights/filter");
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