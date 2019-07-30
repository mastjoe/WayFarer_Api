import {Pool} from 'pg';
import dotenv from 'dotenv';

const pool = new Pool();
const result = dotenv.config();


let dbSql = `CREATE DATABASE test`;

let usersSql = `CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    created_on TIMESTAMP,
    updated_on TIMESTAMP
);`;

pool.query(usersSql)
.then(r => {
    console.log('users table created');
    // pool.end();
})
.catch(e => {
    console.log('users table not created', e);
    // pool.end();
});

let sqlBuses = `CREATE TABLE IF NOT EXISTS buses (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    number_plate VARCHAR UNIQUE NOT NULL,
    manufacturer VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    year VARCHAR NOT NULL,
    capacity INTEGER NOT NULL,
    created_on TIMESTAMP,
    updated_on TIMESTAMP
);`;

pool.query(sqlBuses)
.then(r => {
    console.log('buses table created');
    // pool.end();
})
.catch(e =>{ 
    console.log('buses table not created', e);
    // pool.end();
});

let tripsSql = `CREATE TYPE s_type  AS ENUM('active','cancelled');
CREATE TABLE IF NOT EXISTS trips (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    bus_id INTEGER NOT NULL REFERENCES buses(id),
    origin VARCHAR NOT NULL,
    destination VARCHAR NOT NULL,
    trip_date DATE NOT NULL,
    fare FLOAT NOT NULL,
    status s_type DEFAULT 'active',
    departed BOOLEAN DEFAULT false,
    created_on TIMESTAMP,
    updated_on TIMESTAMP
);`;

pool.query(tripsSql)
.then(r => {
    console.log('trips table created');
    // pool.end();
})
.catch(e => {
    console.log('trips table not created', e);
    // pool.end();
});

let sqlBooking = `CREATE TABLE IF NOT EXISTS bookings (
    booking_id BIGSERIAL NOT NULL,
    trip_id INTEGER NOT NULL REFERENCES trips(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    seat_number INTEGER NOT NULL,
    created_on TIMESTAMP,
    updated_on TIMESTAMP,
    PRIMARY KEY (booking_id, trip_id,user_id));`;

pool.query(sqlBooking)
.then(r => {
    console.log('booking table created');
    // pool.end();
})
.catch(e =>{
     console.log('bookings table not created');
    //  pool.end();
});