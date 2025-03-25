import pandas as pd

# Seating requirements
rows = range(1, 11)  # 10 rows
columns = ['A', 'B', 'C', 'D', 'E', 'F']  # 6 seats per row
seat_numbers = [f"{row}{col}" for row in rows for col in columns]

# Flight IDs for 50 flights
flight_ids = list(range(1, 51))  # Flights 1 to 50

# Create seat data for each flight
data = []
for flight_id in flight_ids:
    for seat in seat_numbers:
        row = int(seat[:-1])
        col = seat[-1]
        is_window_seat = col in ['A', 'F']
        extra_legroom = row == 1
        near_exit = row in [1, 2, 3, 8, 9, 10]
        data.append({
            "flight_id": flight_id,
            "seat_number": seat,
            "is_window_seat": is_window_seat,
            "near_exit": near_exit,
            "extra_legroom": extra_legroom,
            "is_booked": False
        })

df = pd.DataFrame(data)
# print(df.head(12))  # Display first few rows for a sample

# Iterate over the dataframe rows to write SQL INSERT statements into a text file
with open('seat_inserts.sql', 'w') as f:
    for index, row in df.iterrows():
        # Convert booleans to 1 or 0 for SQL
        is_window = 1 if row['is_window_seat'] else 0
        near_exit = 1 if row['near_exit'] else 0
        extra_legroom = 1 if row['extra_legroom'] else 0
        is_booked = 1 if row['is_booked'] else 0

        sql = (
            "INSERT INTO seats (flight_id, seat_number, is_window_seat, near_exit, extra_legroom, is_booked) "
            "VALUES ({}, '{}', {}, {}, {}, {});\n".format(
                row['flight_id'], row['seat_number'], is_window, near_exit, extra_legroom, is_booked
            )
        )
        f.write(sql)
