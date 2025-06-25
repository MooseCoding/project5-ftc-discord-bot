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

async function deleteEvent(team_id, event, month, day) {
  return new Promise((resolve, reject) => {
    const date = new Date(`${new Date().getFullYear()}-${month}-${day}`);
    const query = `
      DELETE FROM outreach
      WHERE team_id = ? AND event = ? AND date = ?
    `;
  
    db.run(query, [team_id, event, date], function (err) {
      if(err) {
        console.error(err);
        reject(err);
      }
      else {
        resolve(this.changes > 0);
      }
    })
  });
}

module.exports = { insertOutreach, deleteEvent };