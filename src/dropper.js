import {Pool} from 'pg';
import dotenv from 'dotenv';

const pool = new Pool();
dotenv.config();

let dropSql = `DROP TABLE IF EXISTS users, trips, bookings, buses`;
pool.query(dropSql)
.then(r => {
    console.log('tables dropped');
    pool.end();
})
.catch(e => {
    console.log('tables not dropped');
    pool.end();
});

let typeSql = `DROP TYPE s_type`;
pool.query(typeSql)
.then(r => {
    console.log('status type dropped');
})
.catch(e => {
    console.log('status type not dropped', e);
});

pool.end();