package FlyTravel.flights;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights() {
        List<Flight> flights = flightService.getAllFlights();
        return ResponseEntity.ok(flights);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Flight>> filterFlights(@RequestParam(required = false) String departure,
                                                      @RequestParam(required = false) String destination,
                                                      @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy" +
                                                              "-MM-dd HH:mm:ss") LocalDateTime earliestDepartureTime,
                                                      @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy" +
                                                              "-MM-dd HH:mm:ss") LocalDateTime latestDepartureTime,
                                                      @RequestParam(required = false) BigDecimal minPrice,
                                                      @RequestParam(required = false) BigDecimal maxPrice,
                                                      @RequestParam(required = false) String orderBy,  //
                                                      // departure_time or price
                                                      @RequestParam(required = false) String sortDir) {  // ASC or DESC
        List<Flight> filteredFlights = flightService.filterFlights(departure, destination,earliestDepartureTime,
                latestDepartureTime, minPrice, maxPrice, orderBy, sortDir);
        return ResponseEntity.ok(filteredFlights);
    }

    @GetMapping("/dropdowns")
    public ResponseEntity<Map<String, List<String>>> getDropdownData() {
        Map<String, List<String>> data = new HashMap<>();
        data.put("departures", flightService.getDistinctDepartures());
        data.put("destinations", flightService.getDistinctDestinations());
        return ResponseEntity.ok(data);
    }
}
