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
        })
        .catch(error => {
            console.error("Error fetching seat data:", error);
        });
});