import con from './database/database';

con.query(`INSERT INTO matcha_users(username, password, email)
           VALUES ('test', 'test', 'test@test.com')`);
