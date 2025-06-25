const db = require('../db.js');

async function insert_github(team_id, gh_link) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO team_links (team_id, github) VALUES (?, ?)
            ON CONFLICT(team_id) DO UPDATE SET github = excluded.github
        `;

        db.run(query, [team_id, gh_link], function(err) {
            if(err){
                console.error('Insert github error');
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

async function insert_website(team_id, site_link) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO team_links (team_id, website) VALUES (?, ?)
            ON CONFLICT(team_id) DO UPDATE SET website = excluded.website
        `;

        db.run(query, [team_id, site_link], function(err) {
            if(err){
                console.error('Insert site error');
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

async function insert_cad(team_id, cad_link) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO team_links (team_id, cad) VALUES (?, ?)
            ON CONFLICT(team_id) DO UPDATE SET cad = excluded.cad
        `;

        db.run(query, [team_id, cad_link], function(err) {
            if(err){
                console.error('Insert cad site error');
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

async function insert_instagram(team_id, ig_link) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO team_links (team_id, instagram) VALUES (?, ?)
            ON CONFLICT(team_id) DO UPDATE SET instagram = excluded.instagram
        `;

        db.run(query, [team_id, ig_link], function(err) {
            if(err){
                console.error('Insert instagram error');
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

async function insert_linktree(team_id, lt_link) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO team_links (team_id, linktree) VALUES (?, ?)
            ON CONFLICT(team_id) DO UPDATE SET linktree = excluded.linktree
        `;

        db.run(query, [team_id, lt_link], function(err) {
            if(err){
                console.error('Insert linktree error');
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

async function insert_reddit(team_id, rd_link) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO team_links (team_id, reddit) VALUES (?, ?)
            ON CONFLICT(team_id) DO UPDATE SET reddit = excluded.reddit
        `;

        db.run(query, [team_id, rd_link], function(err) {
            if(err){
                console.error('Insert reddit error');
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

async function insert_facebook(team_id, fb_link) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO team_links (team_id, facebook) VALUES (?, ?)
            ON CONFLICT(team_id) DO UPDATE SET facebook = excluded.facebook
        `;

        db.run(query, [team_id, fb_link], function(err) {
            if(err){
                console.error('Insert facebook error');
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

module.exports={
    insert_github,
    insert_website,
    insert_cad,
    insert_instagram,
    insert_linktree,
    insert_reddit,
    insert_facebook
};