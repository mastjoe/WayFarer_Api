-- USERS TABLE

-- DROP TABLE  IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    created_at TIMESTAMP
);

-- BUSES TABLE

-- DROP TABLE IF EXISTS buses;
CREATE TABLE IF NOT EXISTS buses (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    number_plate VARCHAR NOT NULL,
    manufacturer VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    year VARCHAR NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP
);

-- TRIPS TABLE

-- DROP TABLE IF EXISTS trips;
CREATE TYPE status_type AS ENUM('active','cancelled');
CREATE TABLE IF NOT EXISTS trips (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    bus_id INTEGER NOT NULL REFERENCES buses(id),
    origin VARCHAR NOT NULL,
    destination VARCHAR NOT NULL,
    trip_date DATE NOT NULL,
    fare FLOAT NOT NULL,
    status status_type DEFAULT 'active',
    created_on DATE
);

-- BOOKINGS TABLE
-- DROP TABLE IF EXISTS bookings;
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER NOT NULL,
    trip_id INTEGER NOT NULL REFERENCES trips(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    created_on DATE,
    PRIMARY KEY (trip_id,user_id)
);
