package FlyTravel.flights.Repositories;

import FlyTravel.flights.Entities.Seat;

import java.util.List;

public interface SeatRepository {

    List<Seat> getSeatsByFlightId(Long flightId);
}
