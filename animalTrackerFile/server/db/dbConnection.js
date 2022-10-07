//since people don't have access to your sql
//this allows other people to use/read your code
//also a backup for your data in your database

// server/db/db-connection.js;
import pgPromise from "pg-promise";

// Create Database Connection
//server connecting to db
const pgp = pgPromise({});

const db = pgp("postgres://localhost:5432/animal_sighting_tracker");

export default db;
