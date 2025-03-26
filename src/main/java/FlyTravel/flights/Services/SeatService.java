package FlyTravel.flights.Services;

import FlyTravel.flights.Entities.Seat;
import FlyTravel.flights.Repositories.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
public class SeatService {

    private final SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public List<Seat> getSeatsByFlightId(Long flightId) {
        // Retrieve actual seat plan from the seats table
        List<Seat> retrievedSeats = seatRepository.getSeatsByFlightId(flightId);

        // Randomly generate seats that are already booked.
        Random random = new Random();
        int nOfRandomlyBookedSeats = random.nextInt(1,61);  // randomly decide how many seats will be already booked

        Set<Integer> bookedIndexes = new HashSet<>();  // using a Set to make sure indexes are unique
        while (bookedIndexes.size() < nOfRandomlyBookedSeats) {
            int randomIndex = random.nextInt(retrievedSeats.size());  // select index randomly
            bookedIndexes.add(randomIndex);
        }

        for (Integer index : bookedIndexes) {
            retrievedSeats.get(index).setBooked(true);  // Mark the seat as booked
        }

        return retrievedSeats;  // return manipulated data without permanent changes to the database table
    }
}
