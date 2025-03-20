package FlyTravel.flights;

import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository {

    List<Flight> getAllFlights();

    // Methods to filter flights
    //List<Flight> filterByDestination(String destination);
    //List<Flight> filterByDepartureTime(LocalDateTime earliestTime, LocalDateTime latestTime);
    //List<Flight> filterByPrice(float lowestPrice, float highestPrice);
}
