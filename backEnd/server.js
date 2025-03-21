const connect = require("./connect");
console.log(connect);
const express = require("express");
const cors = require("cors");
const animals = require("./animalsRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(animals);

// For debugging - show what methods are available
// console.log("Available methods:", Object.keys(connect));

// Start server after database connection
async function startServer() {
	try {
		// Connect to MongoDB first
		if (typeof connect.connectToServer === "function") {
			await connect.connectToServer();
			console.log("Connected to MongoDB");
		} else {
			console.error("connectToServer is not a function in the connect module");
			console.error("Available methods:", Object.keys(connect));
		}

		// Then start the Express server
		app.listen(PORT, () => {
			console.log(`Server is running on port: ${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1); // Exit with error
	}
}

startServer();
