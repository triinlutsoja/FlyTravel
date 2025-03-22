package FlyTravel.flights;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @Override
    public List<Flight> filterFlights(String departure, String destination,
                                      LocalDateTime earliestDepartureTime, LocalDateTime latestDepartureTime,
                                      BigDecimal minPrice, BigDecimal maxPrice, String orderBy, String sortDir) {

        StringBuilder sql = new StringBuilder("SELECT * FROM flights WHERE 1=1");
        List<Object> params = new ArrayList<>();  // parameters in this list will match placeholders in the sql

        if (departure != null && !departure.isEmpty()) {
            sql.append(" AND departure = ?");
            params.add(departure);
        }
        if (destination != null && !destination.isEmpty()) {
            sql.append(" AND destination = ?");
            params.add(destination);
        }
        if (earliestDepartureTime != null) {
            sql.append(" AND departure_time >= ?");
            params.add(earliestDepartureTime);
        }
        if (latestDepartureTime != null) {
            sql.append(" AND departure_time <= ?");
            params.add(latestDepartureTime);
        }
        if (minPrice != null) {
            sql.append(" AND price >= ?");
            params.add(minPrice);
        }
        if (maxPrice != null) {
            sql.append(" AND price <= ?");
            params.add(maxPrice);
        }

        // Apply ordering if provided
        if (orderBy != null) {
            if ("departure_time".equalsIgnoreCase(orderBy) || "price".equalsIgnoreCase(orderBy)) {
                sql.append(" ORDER BY ").append(orderBy);
                if ("DESC".equalsIgnoreCase(sortDir)) {
                    sql.append(" DESC");
                } else {
                    sql.append(" ASC");
                }
            }
        } else {
            // Default ordering if none provided
            sql.append(" ORDER BY departure_time ASC");
        }

        System.out.println(sql.toString());
        System.out.println(params);// Debug

        return jdbcTemplate.query(sql.toString(), params.toArray(), (rs, rowNum) -> {
            Flight flight = new Flight();
            flight.setId(rs.getLong("id"));
            flight.setFlightNumber(rs.getString("flight_number"));
            flight.setDeparture(rs.getString("departure"));
            flight.setDestination(rs.getString("destination"));
            flight.setDepartureTime(rs.getTimestamp("departure_time").toLocalDateTime());
            flight.setPrice(rs.getBigDecimal("price"));
            return flight;
        });
    }

    /*
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
