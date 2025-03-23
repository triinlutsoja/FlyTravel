package FlyTravel.flights;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository {

    List<Flight> getAllFlights();

    // Methods to filter flights
    List<Flight> filterFlights(String departure, String destination,
                               LocalDateTime earliestDepartureTime, LocalDateTime latestDepartureTime,
                               BigDecimal minPrice, BigDecimal maxPrice, String orderBy, String sortDir);

    // Methods to dynamically populate frontend select menus
    List<String> getDistinctDepartures();
    List<String> getDistinctDestinations();
}
