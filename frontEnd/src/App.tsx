import { useState, useEffect } from "react";
import {
	getAnimals,
	getAnimal,
	createAnimal,
	updateAnimal,
	deleteAnimal,
	type Animal,
} from "./api";

import "./App.css";

function App() {
	const [animals, setAnimals] = useState<Animal[] | undefined>(undefined);

	const [OneAnimal, setOneAnimal] = useState<Animal | undefined>(undefined);

	function createNewAnimal() {
		let animalObject = {
			species: "squirrel",
			name: "MOUTH",
			mood: "MOUTH",
		};

		createAnimal(animalObject);
	}

	function updateExistingAnimal() {
		let animalObject = {
			species: "frog",
			name: "Toad",
			mood: "wanna jump",
		};

		updateAnimal("67dd36121053810bbd097d92", animalObject);
	}

	function deleteExistingAnimal() {
		deleteAnimal("67dd379a1053810bbd097d93");
	}

	useEffect(() => {
		async function loadAllAnimals() {
			let data = await getAnimals();
			if (data) {
				setAnimals(data);
			}
		}

		loadAllAnimals();
	}, []);

	useEffect(() => {
		async function loadOneAnimal() {
			let data = await getAnimal("67dc9f12100ece89cc37e84d");
			if (data) {
				setOneAnimal(data);
			}
		}

		loadOneAnimal();
	}, []);

	return (
		<>
			<div className="app-container">
				<h1>Animals Database</h1>
				<button onClick={createNewAnimal}>Create Animal</button>

				<div className="animals-list">
					<h1>THE FARM</h1>
					{animals && animals.length > 0 ? (
						animals.map((animal) => (
							<div key={animal._id} className="animal-card">
								<h3>{animal.name}</h3>
								<p>{animal._id}</p>
								<p>Species: {animal.species}</p>
								<p>Mood: {animal.mood}</p>
							</div>
						))
					) : (
						<p>No animals found. Create one!</p>
					)}

					{/* {OneAnimal ? (
						<div key={OneAnimal._id} className="animal-card">
							<h3>{OneAnimal.name}</h3>
							<p>Species: {OneAnimal.species}</p>
							<p>Mood: {OneAnimal.mood}</p>
						</div>
					) : (
						<p>No animals found. Create one!</p>
					)} */}
				</div>
			</div>
		</>
	);
}

export default App;
