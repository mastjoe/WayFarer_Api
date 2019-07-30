import {Pool} from 'pg';

const table = 'buses';
const tripTable = 'trips';
const pool = new Pool();

export default class Bus {
    static async addBus (req, res) {
        let now = new Date();
        let sql = `INSERT INTO ${table} (number_plate, manufacturer, model, year, capacity, created_on, updated_on) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        let values = [req.body.number_plate, req.body.manufacturer, req.body.model, req.body.year, req.body.capacity, now, now];

        return await pool.query(sql, values);
    }

    static deleteBus (id) {
        let sql = `DELETE FROM ${table} WHERE id = '${id}'`;
        return pool.query(sql);
    }

    static select (id) {
        let sql = `SELECT * FROM ${table} WHERE id='${id}'`;
        return pool.query(sql);
    }

    static findAll (req, res) {
        let sql = `SELECT * FROM ${table}`;
        return pool.query(sql);
    }

    static findPlateNumber (number) {
        let sql = `SELECT * FROM ${table} WHERE number_plate='${number}'`;
        return pool.query(sql);
    }

    static busHasPendingTrip (req, res) {
        let sql = `SELECT * FROM ${tripTable} WHERE bus_id = '${req.body.bus_id}' AND departed='0'`;
        return pool.query(sql);
    }
    
}