const express = require("express");
const database = require("./connect");
const { ObjectId } = require("mongodb");

let animalsRoutes = express.Router();

//#1 - read all
animalsRoutes.route("/animals").get(async (req, res) => {
	let db = database.getDb();
	try {
		let data = await db.collection("animals").find().toArray();

		if (data.length > 0) {
			res.json(data);
		} else {
			res.status(404).json({ message: "data was not found :(" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// get all animals by species
animalsRoutes.route("/animals/bySpecies/:species").get(async (req, res) => {
	let db = database.getDb();
	try {
		let data = await db
			.collection("animals")
			.find({ species: req.params.species })
			.toArray();

		if (data && data.length > 0) {
			res.json(data);
		} else {
			res.status(404).json({
				message: "data was not found :(",
				searchedFor: req.params.species,
			});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

animalsRoutes.route("/animals/uniqueSpecies").get(async (req, res) => {
	try {
		const db = database.getDb();
		let data = await db.collection("animals").distinct("species");

		if (data && data.length > 0) {
			res.json(data);
		} else {
			res.status(404).json({
				message: "no species found",
			});
		}
	} catch (error) {
		console.error("Detailed error:", error);
		res.status(500).json({
			message: "Internal Server Error",
			error: error.toString(),
		});
	}
});

//#2 - read one
//http://localhost:3000/animals/_id2343434
animalsRoutes.route("/animals/:id").get(async (req, res) => {
	let db = database.getDb();
	try {
		let data = await db
			.collection("animals")
			.findOne({ _id: new ObjectId(req.params.id) });

		if (data) {
			res.json(data);
		} else {
			res.status(404).json({ message: "data was not found :(" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//#3 - create one
//http://localhost:3000/animals/_id2343434
animalsRoutes.route("/animals").post(async (req, res) => {
	let db = database.getDb();
	try {
		let mongoObject = {
			species: req.body.species,
			name: req.body.name,
			mood: req.body.mood,
		};
		let data = await db.collection("animals").insertOne(mongoObject);

		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//#4 - update one
//http://localhost:3000/animals/_id2343434
animalsRoutes.route("/animals/:id").put(async (req, res) => {
	let db = database.getDb();
	try {
		let mongoObject = {
			$set: {
				species: req.body.species,
				name: req.body.name,
				mood: req.body.mood,
			},
		};

		let data = await db
			.collection("animals")
			.updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);

		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//#5 - delete one
//http://localhost:3000/animals/_id2343434
animalsRoutes.route("/animals/:id").delete(async (req, res) => {
	let db = database.getDb();
	try {
		let data = await db
			.collection("animals")
			.deleteOne({ _id: new ObjectId(req.params.id) });

		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = animalsRoutes;
