const db = require('../db');

async function insertOutreach(event, month, day, hours, member_id, team_id, description) {
  let date = new Date(`${new Date().getFullYear()}-${month}-${day}`); 
    
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO outreach (event, date, hours, member_id, team_id, description) VALUES (?, ?, ?, ?, ?, ?)`,
      [event, date, hours, member_id, team_id, description],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

module.exports = { insertOutreach };