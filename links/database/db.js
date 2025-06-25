const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.resolve(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, 'team_links.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('Links DB bad:', err.message);
  console.log('Links DB good');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS team_links (
        team_id TEXT PRIMARY KEY,
        github TEXT,
        website TEXT,
        cad TEXT,
        instagram TEXT,
        linktree TEXT,
        reddit TEXT,
        facebook TEXT
        );
    `); 
});

module.exports = db; 