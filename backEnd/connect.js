const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const _URI = process.env.ATLAS_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: false,
		deprecationErrors: true,
	},
});

let database;

module.exports = {
	connectToServer: async function () {
		try {
			// Connect the client to the server
			await client.connect();
			console.log("Connected successfully to MongoDB");

			// Assign the database
			database = client.db("farm");

			return database;
		} catch (error) {
			console.error("Error connecting to MongoDB:", error);
			throw error;
		}
	},
	getDb: function () {
		if (!database) {
			throw new Error("No database connection. Call connectToServer first!");
		}
		return database;
	},
};
