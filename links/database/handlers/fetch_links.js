const db = require('../db'); 

async function get_github(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT github 
        FROM team_links
        WHERE team_id = ? 
        `;

        db.get(query, [team_id], (err, row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row?.github ?? null)
            }
        })
    });
}

async function get_website(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT website 
        FROM team_links
        WHERE team_id = ? 
        `;

        db.get(query, [team_id], (err, row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row?.website ?? null)
            }
        })
    });
}

async function get_cad(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT cad 
        FROM team_links
        WHERE team_id = ? 
        `;

        db.get(query, [team_id], (err, row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row?.cad ?? null)
            }
        })
    });
}

async function get_instagram(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT instagram 
        FROM team_links
        WHERE team_id = ? 
        `;

        db.get(query, [team_id], (err, row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row?.instagram ?? null)
            }
        })
    });
}

async function get_linktree(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT linktree 
        FROM team_links
        WHERE team_id = ? 
        `;

        db.get(query, [team_id], (err, row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row?.linktree ?? null)
            }
        })
    });
}

async function get_reddit(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT reddit 
        FROM team_links
        WHERE team_id = ? 
        `;

        db.get(query, [team_id], (err, row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row?.reddit ?? null)
            }
        })
    });
}
async function get_facebook(team_id) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT facebook 
        FROM team_links
        WHERE team_id = ? 
        `;

        db.get(query, [team_id], (err, row) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(row?.facebook ?? null)
            }
        })
    });
}

module.exports={
    get_github,
    get_website,
    get_cad,
    get_instagram,
    get_linktree,
    get_reddit,
    get_facebook 
};