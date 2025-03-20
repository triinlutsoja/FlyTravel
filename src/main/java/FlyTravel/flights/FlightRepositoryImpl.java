package FlyTravel.flights;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class FlightRepositoryImpl implements FlightRepository {

    private final JdbcTemplate jdbcTemplate;

    // Spring injects auto-configured Datasource into the JdbcTemplate
    public FlightRepositoryImpl (JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Flight> getAllFlights() {

        String sql = "SELECT * FROM flights";

        List<Flight> flights = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Flight flight = new Flight();
            flight.setId(rs.getLong("id"));
            flight.setFlightNumber(rs.getString("flight_number"));
            flight.setDeparture(rs.getString("departure"));
            flight.setDestination(rs.getString("destination"));
            flight.setDepartureTime(rs.getTimestamp("departure_time").toLocalDateTime());
            flight.setPrice(rs.getBigDecimal("price"));
            return flight;
        });
        return flights;
    }
    /*
    @Override
    public List<Flight> filterByDestination(String destination) {
        return List.of();
    }

    @Override
    public List<Flight> filterByDepartureTime(LocalDateTime earliestTime, LocalDateTime latestTime) {
        return List.of();
    }

    @Override
    public List<Flight> filterByPrice(float lowestPrice, float highestPrice) {
        return List.of();
    }
    */
}
