import con from '../database/connection'

/**
 * QUERIES SECTION
 */

const dbSql = 'CREATE DATABASE IF NOT EXISTS matcha';

const matchaUsersSql = `CREATE TABLE IF NOT EXISTS matcha.matcha_users(
  user_id int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  firstname varchar(100),
  lastname varchar(100),
  notifications int default 0,
  messages int default 0,
  status varchar(10) default 'offline',
  gender varchar(10),
  sexualPreference varchar(10) default 'Bisexual',
  bio varchar(250),
  active int(2) NOT NULL,
  age int(2),
  ethnicity varchar(50),
  token varchar(200) NOT NULL,
  lastSeen datetime DEFAULT CURRENT_TIMESTAMP,
  reported int default 0,
  reportedBy varchar(50),
  profileCompleted int default 0,
  fameRating int default 3,
  profilePic varchar(255),
  logitude double default 0,
  latitude double default 0,
  country varchar(255),
  postal_code int,
  city varchar(255),
  region varchar(255),
  admin int default 0
)`;

const interestsSql = `CREATE TABLE IF NOT EXISTS matcha.interests(
  interest_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(50) NOT NULL,
  interestName varchar(50)
)`;

const picturesSql = `CREATE TABLE IF NOT EXISTS matcha.pictures(
  picture_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id int(11) NOT NULL,
  picture varchar(255)
)`;

const roomsSql = `CREATE TABLE IF NOT EXISTS matcha.rooms(
  room_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  participant_1 varchar(50) NOT NULL,
  participant_2 varchar(50) NOT NULL,
  msg varchar(255),
  date_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

const messagesSql = `CREATE TABLE IF NOT EXISTS matcha.messages(
  msg_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  room_id int(11) NOT NULL,
  from_participant varchar(50) NOT NULL,
  to_participant varchar(50) NOT NULL,
  msg varchar(255)
)`;

const blockedSql = `CREATE TABLE IF NOT EXISTS matcha.blocked(
  blocked_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  participant varchar(50) NOT NULL,
  blocked_participant varchar(50) NOT NULL
)`;

const likeSql = `CREATE TABLE IF NOT EXISTS matcha.likes(
  like_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  participant varchar(50) NOT NULL,
  liked_participant varchar(50) NOT NULL
)`;

const notificationSql = `CREATE TABLE IF NOT EXISTS matcha.notifications(
  notifications_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  notification varchar(250) NOT NULL,
  user_id int
)`;

const seedSql = `INSERT INTO matcha.matcha_users (user_id, username, password, email, firstname, lastname, notifications, messages, status, gender, sexualPreference, bio, active, age, ethnicity, token, lastSeen, reported, reportedBy, profileCompleted, fameRating, profilePic, logitude, latitude, country, postal_code, city, region, admin)
  VALUES (1,'newguy','$2a$10$unhzFDnmfZu8DX5HQeGUV.X/nmz8ndbrkYex23VHQYWtOCiem9m86','newguy@fauxmail.com','tester','horn',0,0,'offline','Male','Bisexual','i am more of a geek than you would like',1,32,'Other','1rk7MyrGmdEg64iaB2qA','2020-07-11 21:10:43',0,NULL,1,3,NULL,28.0012,-26.0941,'ZA',2032,'Randburg','Gauteng',0),
  (2,'lekopo','$2a$10$17btJUiPQGfcaSgUTOAgk.R9I3MbQSyPyKuxqbR1qI/VjxjIhQ.4G','face@it.kid','legend','newguy',0,0,'offline','Bisexual','Men','so out there',1,21,'Indian','N5jHrULMRxrGvgqrUA6a','2020-07-11 19:34:45',0,NULL,1,3,NULL,28.0012,-26.0941,'ZA',2032,'Randburg','Gauteng',0),
  (3,'remember','$2a$10$eUmvt6rKtMVIHJW/n/3Ke.wLzJr4JcH59fk0aWRYUJkJs1gGe0ByW','gang@member.lt','shine','mace',0,0,'offline','Female','Men','look just come and find out okay?',1,43,'White','vxWQicHXCpDWk4wOqwok','2020-07-11 20:58:55',0,NULL,1,3,NULL,0,0,NULL,NULL,NULL,NULL,NULL),
  (4,'zimmy','$2a$10$aeTq6FWrojhhz8kVhz5ARewUwWg3GLVglpk7q2YaMGeFuCjPel/IS','beast@email.zoo','player','todasko',0,0,'offline','Female','Men','i am bubbly and fun to have around, like chillz',1,19,'Black','6yaagYko2OZ0kTSNsF4F','2020-07-11 21:03:44',0,NULL,1,3,NULL,28.0012,-26.0941,'ZA',2032,'Randburg','Gauteng',0),
  (5,'roman','$2a$10$vbUc1VditYyIQl0T2QCxVO8Aox8jwdnzbQCoJMnoDJjnRqpNZcPA.','roman@rome.empire','rumulus','enredi',0,0,'offline','Male','Men','i am tired of waiting for the one. I am the one.',1,40,'Coloured','IdtlhLjq5Yf2XVv4eykQ','2020-07-11 21:04:54',0,NULL,1,3,NULL,28.0012,-26.0941,'ZA',2032,'Randburg','Gauteng',0),
  (6,'blossom','$2a$10$9sRJe5v65sKmIoeHEyE62ujOKnc/i6F.JGYdl0aOgRkpSq06kWMi.','blossom@raigre.mail','tracey','raimer',0,0,'offline','Bisexual','Bisexual','look, life is too short. enjoy it.',1,24,'Other','UZvLIEZ9wGjokA2ByYEd','2020-07-11 21:20:02',0,NULL,1,3,NULL,0,0,NULL,NULL,NULL,NULL,0),
  (7,'silhouette','$2a$10$vODaSSPmZnpXoiukk1zAj.QeRfys1EqkQhHRVG3a8C8IUlIaXMRW6','silhouette@shadow.dark','logret','ploker',0,0,'offline','Bisexual','Bisexual','good looking, just have bad luck',1,32,'Indian','KvIRxdKLxZ1jiG51oXRc','2020-07-11 21:17:11',0,NULL,1,3,NULL,28.0012,-26.0941,'ZA',2032,'Randburg','Gauteng',0),
  (8,'tripster','$2a$10$P18btX3qSNRvp30JkMuea.FZWYsl4JbtQCYBSBf3O0MVjPI8wOKsa','tripster@high.as.fuck','krewq','snail',0,0,'offline','Male','Women',"let's get high bra",1,27,'Other','YORVdX8GuI8ifCZFBSpn','2020-07-11 21:24:49',0,NULL,1,3,NULL,28.0012,-26.0941,'ZA',2032,'Randburg','Gauteng',0),
  (9,'mokly','$2a$10$KdyT4/8VT0sFYj91FzGVHe6IxQLHYDv7uBTnTFH/r9M5iOGHV.LAm','mokly@game.man','gert','shamus',0,0,'online','Male','Women','i game a lot. anti social.',1,29,'White','192sKi3CnOHqkKvdHkMb','2020-07-11 19:20:51',0,NULL,1,3,NULL,0,0,NULL,NULL,NULL,NULL,0),
  (10,'soulman','$2a$10$FMGFMfnAi23J/eyGG1CVyeGo5LJWGCy/DFWwH8N9a7AM6JlUZSRv2','soulman@mymail.temp','suria','treaty',0,0,'online','Male','Women','no story, just adventure',1,32,'Black','6WZKqvhpUzun27sqplAy','2020-07-11 19:25:31',0,NULL,1,3,NULL,28.0012,-26.0941,'ZA',2032,'Randburg','Gauteng',0),
  (11, 'test', '$2a$10$GoDiZLl4gcVX29BiqWGQxucqB/nXsxyC2o0xwqz.cSjq4ww8oLEgS', 'test@test.com', 'mike', 'admin', 0, 0, 'online', 'Male', 'Bisexual', 'Here for the ladies', 1, 40, 'Coloured', 'i7GyNy5iZ81j16gzsRmw', '2020-07-12 00:08:26', 0, NULL,1,3,NULL,0,0,'ZA','1932','Midrand','Gauteng',1);`

/**
 * DATABASE AND TABLE CREATION SECTION
 */

const createDB = () => {
  return new Promise((resolve, reject) => {
    con.query(dbSql,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        console.info('Database created');
        return resolve(result[0]);
      });
  });
}

const createTBLs = () => {
  return new Promise((resolve, reject) => {
    con.query(
      `${matchaUsersSql};
      ${interestsSql};
      ${picturesSql};
      ${roomsSql};
      ${messagesSql};
      ${likeSql};
      ${notificationSql};
      ${blockedSql}`,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        console.info('Tables created');
        return resolve(result[0]);
      });
  });
}

/**
 * SEEDING SECTION
 */

const seedDB = () => {
  seedSql
  return new Promise((resolve, reject) => {
    con.query(seedSql,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        console.info('DB seeded');
        return resolve(result[0]);
      });
  });
}

/**
 * SETUP CONNECTION
 */

const connection = () => {
  return new Promise((resolve, reject) => {
    con.connect((connectErr) => {
      if (connectErr) {
        return reject(connectErr);
      }
      resolve();
    })
  })
}

const setupAPP = async () => {
  try {
    await connection()
    await createDB()
    await createTBLs()
    await seedDB()
  } catch (error) {
    console.error(error.message);
  }
}

setupAPP()
