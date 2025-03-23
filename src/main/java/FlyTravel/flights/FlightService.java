package FlyTravel.flights;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.getAllFlights();
    }

    public List<Flight> filterFlights(String departure, String destination,
                  LocalDateTime earliestDepartureTime, LocalDateTime latestDepartureTime,
                  BigDecimal minPrice, BigDecimal maxPrice, String orderBy, String sortDir) {
        return flightRepository.filterFlights(departure, destination, earliestDepartureTime, latestDepartureTime,
                minPrice, maxPrice, orderBy, sortDir);
    }

    public List<String> getDistinctDepartures() {
       return flightRepository.getDistinctDepartures();
    }

    public List<String> getDistinctDestinations() {
        return flightRepository.getDistinctDestinations();
    }
}
