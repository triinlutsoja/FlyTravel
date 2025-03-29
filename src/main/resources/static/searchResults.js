// Fetch backend data with search results
window.addEventListener("DOMContentLoaded", () => {

    const paramsString = window.location.search;  // returns query parameters after the '?' from URL
    console.log(`This is the paramsString: ${paramsString}`)  // For debugging only

    // Note: Since I'm less experienced in frontend, the following fetch request is generated with the help of AI
    fetch(`/flights/filter${paramsString}`)  // Request backend for flights based on the user-selected filters
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
        if (flightId) {
            let url = new URL(window.location.origin + "/Seating.html");
            url.searchParams.append("flightId", flightId);

            // Redirect to the constructed URL
            window.location.href = url.toString();
        } else {
            alert("Please select a flight before continuing.");
        }
    });
});