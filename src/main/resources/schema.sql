CREATE TABLE IF NOT EXISTS flights (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    flight_number VARCHAR(50) NOT NULL,
    departure VARCHAR(100),
    destination VARCHAR(100),
    departure_time TIMESTAMP,
    price DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS seats (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    flight_id BIGINT,
    seat_number VARCHAR(10),
    is_window_seat BOOLEAN,
    near_exit BOOLEAN,
    extra_legroom BOOLEAN,
    is_booked BOOLEAN DEFAULT false,
    FOREIGN KEY (flight_id) REFERENCES flights(id)
);

CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    flight_id BIGINT,
    seat_id BIGINT,
    traveler_id BIGINT,
    booking_time TIMESTAMP,
    FOREIGN KEY (flight_id) REFERENCES flights(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id)
);

CREATE TABLE IF NOT EXISTS travelers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100)
);