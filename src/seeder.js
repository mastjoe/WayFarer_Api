import {Pool} from 'pg';
import dotenv from 'dotenv';

const pool = new Pool();
dotenv.config();

let userSql = `INSERT INTO users
 (first_name, last_name, email, is_admin, password, created_at) 
 VALUES ('admin', 'admin', 'admin@email.com', 'true','password', NOW())`;

pool.query(userSql)
.then(r => {
    console.log('admin seeded');
    pool.end();
})
.catch(e => {
    console.log('admin not seeded'+e);
    pool.end();
});