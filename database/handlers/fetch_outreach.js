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
            ORDER BY date DESC
            WHERE team_id = ?
        `;

        db.all(query, [team_id], (err, row) => {
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

module.exports = {get_user_hours, get_total_hours, get_all_events}; 