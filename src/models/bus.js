import {Pool} from 'pg';

const table = 'buses';
const pool = new Pool();

export default class Bus {
    static addBus(req, res) {
        let sql = `INSERT INTO ${table} (number_plate, manufacturer, model, year, capacity, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        let values = [req.body.number_plate, req.body.manufacturer, req.body.model, req.body.year, req.body.capacity, new Date()];

        return pool.query(sql, values);
    }

    static deleteBus(id) {
        let sql = `DELETE FROM ${table} WHERE id = '${id}'`;
        return pool.query(sql);
    }

    static select (id) {
        let sql = `SELECT * FROM ${table} WHERE id='${id}'`;
        return pool.query(sql);
    }

    static findAll(req, res) {
        let sql = `SELECT * FROM ${table}`;
        return pool.query(sql);
    }
}