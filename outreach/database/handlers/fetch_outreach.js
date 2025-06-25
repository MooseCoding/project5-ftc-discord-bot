const db = require('../db.js');

async function get_user_hours(member, team_id) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT SUM(hours) as totalHours
            FROM outreach
            WHERE member_id = ? AND team_id = ? 
        `;

        db.get(query, [member, team_id], (err,row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row.totalHours ?? 0);
            }
        });
    });
}

async function get_total_hours(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT SUM(hours) as totalHours
            FROM outreach
            WHERE team_id = ?
        `;

        db.get(query, [team_id], (err, row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row.totalHours ?? 0);
            }
        });
    });
}

async function get_all_events(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT event, date, hours, member_id, description
            FROM outreach
            WHERE team_id = ?
            ORDER BY date DESC
        `;

        db.all(query, [team_id], (err, row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row);
            }
        });
    });
}

async function get_leaderboard(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT member_id, SUM(hours) AS total_hours
        FROM OUTREACH
        WHERE team_id = ? 
        GROUP BY member_id
        ORDER BY total_hours DESC
        LIMIT ?`;

        db.all(query, [team_id, 15], (err, row) => {
            if (err) reject(err);
            else resolve(row); 
        });
    });
}

module.exports = {get_user_hours, get_total_hours, get_all_events, get_leaderboard}; 