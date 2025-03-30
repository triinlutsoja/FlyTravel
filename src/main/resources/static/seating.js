// The following code is created with the help of AI.

// Fetch the seating plan data from backend and update the checkboxes to show which seats are booked
document.addEventListener("DOMContentLoaded", () => {

    const paramsString = window.location.search;  // returns query parameters after the '?' from URL
    console.log(`This is the paramsString: ${paramsString}`)  // For debugging only
    const searchParams = new URLSearchParams(paramsString);
    const flightId = searchParams.get("flightId");  
    console.log("Fetching seating plan for flightId:", flightId); // For debugging only

    // Fetch the seating plan data from the backend
    fetch(`/seats?flightId=${flightId}`)
        .then(response => {

            // For debugging only
            console.log("Response received:", response);
            return response.json();
        })
        .then(data => {
            data.forEach(seat => {

                // For debugging only
                console.log("Processing seat:", seat.seatNumber, "Booked:", seat.booked);  // PS! Spring Boot will turn "isBooked" to "booked" in JSON

                // Find the checkbox element corresponding to the seat number.
                const checkbox = document.getElementById(seat.seatNumber);
                if (checkbox) {
                    // If the seat is booked, disable the checkbox and update the label.
                    if (seat.booked) {  // PS! Spring Boot will turn "isBooked" to "booked" in JSON
                        checkbox.disabled = true;

                        // For debugging only
                        console.log(`Seat ${seat.seatNumber} marked as booked`);

                        // Find the label for this checkbox.
                        const label = document.querySelector(`label[for="${seat.seatNumber}"]`);
                        if (label) {
                            label.textContent = "Occupied";
                        } else {

                            // For debugging only
                            console.warn("No label found for seat:", seat.seatNumber);

                        }
                    } else {
                        // Ensure the checkbox is enabled if the seat is available.
                        checkbox.disabled = false;
                    }
                } else {
                    
                    //For debugging only
                    console.warn("No checkbox found for seat:", seat.seatNumber);

                }
            });

            // Randomly suggest available seats (Proud to have written this following part independently without consulting AI)
            const numTravelers = searchParams.get("numTravelers");  // number of seats to suggest
            let selectedSeats = 0;
            console.log(`The number of seats to select is: ${numTravelers}.`);
            const availableSeats = data.filter(seat => !seat.booked);  // filter out the available seats

            const uniqueSeatNumbers = new Set();  // collect unique seat numbers from availableSeats that get suggested

            while (uniqueSeatNumbers.size < Number(numTravelers)) {

                const randomIndex = Math.floor(Math.random() * availableSeats.length);  // Randomly choose the index (https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/)
                const suggestedSeatNumber = availableSeats[randomIndex].seatNumber;  // access the random seat in availableSeats
                console.log(`The randomly chosen index is: ${randomIndex}. It corresponds to the seat ${suggestedSeatNumber}.`)
                uniqueSeatNumbers.add(suggestedSeatNumber);
            
            }

            uniqueSeatNumbers.forEach(function (value) {  // Used forEach() from here: https://www.geeksforgeeks.org/how-to-iterate-over-set-elements-in-javascript/ 

                const checkbox = document.getElementById(value); // mark suggested seat as checked
                checkbox.checked = true;
                selectedSeats++;

                // For debugging only
                console.log(`Seat ${value} marked as checked`); 
                console.log(`Currently selected number of seats: ${selectedSeats}.`); 
            });  // End of independently written code.

            // Limit how many seats the user is allowed to select. Update selectedSeats accordingly. This following part is created with the help of AI.
            
            const checkboxes = document.querySelectorAll("input[type='checkbox']");  // Attach event listeners to all seat checkboxes
            checkboxes.forEach(checkbox => {        

                checkbox.addEventListener("change", function() {
                    if (this.checked) {
                        if (selectedSeats >= numTravelers) {
                            this.checked = false;  // Revert the checkbox if limit is reached
                            alert(`You've already chosen seats for all your ${numTravelers} travelers. To change seats, unselect a seat and select another one.`);
                        } else {
                        selectedSeats++;  // Increase count if checked
                        }
                    } else {
                        selectedSeats--;  // Decrease count if unchecked
                    }
                    console.log(`Currently selected number of seats: ${selectedSeats}.`);
                });
            });  // End of code created with the help of AI.
        })
        .catch(error => {
            console.error("Error fetching seat data:", error);
        });
});