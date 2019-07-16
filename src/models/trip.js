import {Pool} from 'pg';

const pool = new Pool();
const table = 'trips';

export default class Trip {
    static find (id) {
        let sql = `SELECT * FROM ${table} WHERE id='${id}'`;
        return pool.query(sql);
    }

    static findAll(req, res) {
        let sql = `SELECT * FROM ${table}`;
        return pool.query(sql);
    }

    static createTrip(req, res) {
        let sql = `INSERT INTO ${table} (bus_id, origin, destination, trip_date, fare, created_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        let values = [req.body.bus_id, req.body.origin, req.body.destination, req.body.trip_date, req.body.fare, new Date()];
        return pool.query(sql, values);
    }

    static deleteTrip(id) {
        let sql = `DELETE FROM ${table} WHERE id='${table}'`;
        return pool.query(sql);
    }

    static cancelTrip(id) {
        let sql = `UPDATE ${table} SET  status='cancelled' WHERE id='${id}'`;
        return pool.query(sql);
    }
}