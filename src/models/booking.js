import {Pool} from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool();
const table = 'bookings';
const tripsTable = 'trips';
const usersTable = 'users';
const busesTable = 'buses';

export default class Bookings {
    static find(userId) {
        let sql = `SELECT ${table}.booking_id, ${table}.seat_number, ${table}.user_id, ${table}.trip_id, ${usersTable}.first_name, ${usersTable}.last_name, ${usersTable}.email FROM ${usersTable} JOIN ${table} ON ${usersTable}.id = ${table}.user_id WHERE user_id=${userId}`;
        return pool.query(sql);
    }
    // SELECT * FROM bookings Inner JOIN trips ON bookings.trip_id = trips.id WHERE trip_id = $1

    static findAll(req, res) {
        let sql = `SELECT bookings.booking_id, bookings.seat_number, bookings.user_id, bookings.trip_id, users.first_name, users.last_name, users.email FROM users JOIN bookings ON users.id = bookings.user_id`;
        return pool.query(sql);
    }

    static create(req, res) {
        let sql = `INSERT INTO ${table} (user_id, trip_id, seat_number, created_on) VALUES ($1, $2, $3, $4) RETURNING *`;
        let decoded = jwt.verify(req.token,process.env.SECRET_KEY);
        let values = [decoded.user.id, req.body.trip_id, req.body.seat_number, new Date()];
        return pool.query(sql, values);
    }

    static delete(req, res) {
        let bookingId = req.params.id;
        let {user} = jwt.verify(req.token,process.env.SECRET_KEY);
        let sql = `DELETE FROM ${table} WHERE booking_id='${bookingId}' AND user_id='${user.id}'`;
        return pool.query(sql);
    }

    static select(bookingId) {
        let sql = `SELECT * FROM ${table} WHERE booking_id='${bookingId}'`;
        return pool.query(sql);
    }

    static checkTripSeat (req, res) {
        let sql = `SELECT * FROM ${table} WHERE trip_id='${req.body.trip_id}' AND seat_number='${req.body.seat_number}'`;
        return pool.query(sql);
    }

}