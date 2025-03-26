package FlyTravel.flights.Controllers;

import FlyTravel.flights.Entities.Seat;
import FlyTravel.flights.Services.SeatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/seats")
public class SeatController {

    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping
    public ResponseEntity<List<Seat>> getSeatsByFlightId(@RequestParam Long flightId) {
        List<Seat> retrievedSeats = seatService.getSeatsByFlightId(flightId);
        return ResponseEntity.ok(retrievedSeats);
    }
}
