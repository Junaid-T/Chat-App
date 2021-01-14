const dotenv = require("dotenv");
const mongo = require("mongodb");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const client = new mongo.MongoClient(
  DB,
  { useUnifiedTopology: true },
  (err, db) => {
    if (err) {
      console.log(err);
      throw err;
    }
  }
);
client.connect();

module.exports = client;
