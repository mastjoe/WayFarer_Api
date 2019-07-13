import {Pool} from 'pg';

const pool = new Pool();
const table = 'users';

export default class User {

    static emailExist(req, res) {
        let checkSql = 'SELECT * FROM '+table+' WHERE email = \''+req.body.email+'\'';
        return pool.query(checkSql);
    }

    static createUser(req, res) {
        let sql = 'INSERT INTO '+table+' (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        let values = [req.body.first_name, req.body.last_name, req.body.email, req.body.password, new Date()];

        return pool.query(sql,values);
    }
}