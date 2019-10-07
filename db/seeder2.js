const faker = require('faker');
const moment = require('moment');
const db = require('./index.js');

const seedingMyListings = () => {
  for (let i = 1; i <= 100; i += 1) {
    db.query(`INSERT INTO Listing(id) VALUE(${i})`, (err, data) => {
      if (err) {
        console.log('ERROR GETTING DATA INSERTED', err);
      } else {
        console.log('SUCCESSFUL ENTRY', data);
      }
    });
  }
};
seedingMyListings();

const seedingMyMessages = () => {
  for (let i = 1; i <= 5000; i += 1) {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = ['2015', '2016', '2017', '2018', '2019'];
    const message = faker.lorem.sentences();
    const listing = faker.random.number({ min: 1, max: 100 });
    const username = faker.name.firstName();
    const userId = faker.random.number(800);
    const profilePic = faker.internet.avatar();
    const date = `${month[Math.floor(Math.random() * 12)]} ${year[Math.floor(Math.random() * 5)]}`;
    const accuracy = faker.finance.amount(0, 5, 2);
    const communication = faker.finance.amount(0, 5, 2);
    const cleanliness = faker.finance.amount(0, 5, 2);
    const checkIn = faker.finance.amount(0, 5, 2);
    const value = faker.finance.amount(0, 5, 2);
    const location = faker.finance.amount(0, 5, 2);


    db.query(`INSERT INTO Messages(message, user_id, username, profile_picture, listing, date, accuracy, communication, cleanliness, check_in, value, location) VALUES('${message}', ${userId}, '${username}', '${profilePic}', ${listing}, '${date}', ${accuracy}, ${communication}, ${cleanliness}, ${checkIn}, ${value}, ${location});`, (err, data) => {
      if (err) {
        console.log('ERROR GETTING DATA INSERTED', err);
      } else {
        console.log('SUCCESSFUL ENTRY', data);
      }
    });
  }
};
seedingMyMessages();
db.end();
