const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.resolve(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, 'outreach.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('Outreach DB bad:', err.message);
  console.log('Outreach DB good');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS outreach (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event TEXT NOT NULL,
      date TEXT NOT NULL,
      hours REAL NOT NULL,
      member_id TEXT NOT NULL,
      team_id TEXT NOT NULL,
      description TEXT,
      image1 TEXT,
      image2 TEXT
    );
  `);
});

const eventsPath = path.join(dataDir, 'events.db');
const events_db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('Events DB bad:', err.message);
  console.log('Events DB good');
});

events_db.serialize(() => {
  events_db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event TEXT NOT NULL,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      team_id TEXT NOT NULL,
      required_amount REAL NOT NULL,
      description TEXT,
      members_going_list TEXT,
      members_not_list TEXT
    )`)
})

module.exports = {db, events_db};