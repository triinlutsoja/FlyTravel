package FlyTravel.flights.Repositories;

import FlyTravel.flights.Entities.Seat;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SeatRepositoryImpl implements SeatRepository {

    private final JdbcTemplate jdbcTemplate;

    // Spring injects auto-configured Datasource into the JdbcTemplate
    public SeatRepositoryImpl (JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Seat> getSeatsByFlightId(Long flightId) {
        String sql = "SELECT * FROM seats WHERE flight_id=?";

        List<Seat> retrievedSeats = jdbcTemplate.query(sql, new Object[]{flightId}, (rs, rowNum) -> {
            Seat seat = new Seat();
            seat.setId(rs.getLong("id"));
            seat.setFlightId(rs.getLong("flight_id"));
            seat.setSeatNumber(rs.getString("seat_number"));
            seat.setWindowSeat(rs.getBoolean("is_window_seat"));
            seat.setExtraLegroom(rs.getBoolean("extra_legroom"));
            seat.setNearExit(rs.getBoolean("near_exit"));
            seat.setBooked(rs.getBoolean("is_booked"));
            return seat;
        });
        return retrievedSeats;
    }
}
