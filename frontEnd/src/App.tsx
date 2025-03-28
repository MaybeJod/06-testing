import { useState, useEffect } from "react";
import {
	getAnimals,
	getAnimal,
	createAnimal,
	updateAnimal,
	deleteAnimal,
	getAllAnimalsBySpecies,
	getUniqueSpecies,
	type Animal,
	type SpeciesCount,
} from "./api";

import "./App.css";

function App() {
	const [animals, setAnimals] = useState<Animal[]>([]);
	const [uniqueAnimals, setUniqueAnimals] = useState<SpeciesCount[]>([]);

	// const [OneAnimal, setOneAnimal] = useState<Animal | undefined>(undefined);

	const [newAnimalName, setNewAnimalName] = useState<string>("");
	const [newAnimalSpecies, setNewAnimalSpecies] = useState<string>("");
	const [newAnimalMood, setNewAnimalMood] = useState<string>("");

	const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
	const [editName, setEditName] = useState("");
	const [editSpecies, setEditSpecies] = useState("");
	const [editMood, setEditMood] = useState("");
	const [editingAnimalId, setEditingAnimalId] = useState<string | null>(null);

	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleStartEditing = (animals: Animal) => {
		setEditingAnimal(animals);
	};

	useEffect(() => {
		if (editingAnimal) {
			setEditName(editingAnimal.name);
			setEditSpecies(editingAnimal.species);
			setEditMood(editingAnimal.mood);
		}
	}, [editingAnimal]);

	const handleSubmitEdit = async (e: React.FormEvent, animalId: string) => {
		e.preventDefault();

		const updatedAnimal = {
			name: editName,
			species: editSpecies,
			mood: editMood,
		};

		const result = await updateAnimal(animalId, updatedAnimal);

		if (result) {
			// Update the animals list
			setAnimals(
				animals.map((animal) =>
					animal._id === animalId ? { ...animal, ...updatedAnimal } : animal
				)
			);

			// Reset editing state
			setEditingAnimalId(null);
		}
	};

	async function handleCreateNewAnimal() {
		let newAnimalObject = {
			species: newAnimalSpecies,
			name: newAnimalName,
			mood: newAnimalMood,
		};

		const createdAnimal = await createAnimal(newAnimalObject);

		if (createdAnimal) {
			setAnimals([...animals, createdAnimal]);
		}

		//reset form input
		setNewAnimalSpecies("");
		setNewAnimalName("");
		setNewAnimalMood("");
	}

	// useEffect(() => {
	// 	async function getAllAnimalsBySpecieslol() {
	// 		let data = await getAllAnimalsBySpecies("cat");
	// 		if (data) {
	// 			setAnimals(data);
	// 		}
	// 	}

	// 	getAllAnimalsBySpecieslol();
	// }, []);

	// function updateExistingAnimal() {
	// 	let animalObject = {
	// 		species: "frog",
	// 		name: "Toad",
	// 		mood: "wanna jump",
	// 	};

	// 	updateAnimal("67dd36121053810bbd097d92", animalObject);
	// }

	// function deleteExistingAnimal() {
	// 	deleteAnimal("67e16686a7690c0b1309970f");
	// }

	// Handle animal deletion
	const handleDeleteAnimal = async (id: string) => {
		// Prevent multiple deletion attempts
		if (deletingId === id) return;

		setDeletingId(id);
		const success = await deleteAnimal(id);

		if (success) {
			// Remove the deleted animal from the list
			setAnimals(animals.filter((animal) => animal._id !== id));
		}

		setDeletingId(null);
	};

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
		async function fetchUniqSpecies() {
			let data = await getUniqueSpecies();

			if (data) {
				setUniqueAnimals(data);
			}
		}

		fetchUniqSpecies();
	}, []);

	// useEffect(() => {
	// 	async function loadOneAnimal() {
	// 		let data = await getAnimal("67e166d1a7690c0b13099710");
	// 		if (data) {
	// 			setOneAnimal(data);
	// 		}
	// 	}

	// 	loadOneAnimal();
	// }, []);

	return (
		<>
			<div className="app-container">
				<h1>Animals Database</h1>

				<form onSubmit={handleCreateNewAnimal}>
					<input
						type="text"
						placeholder="Species"
						value={newAnimalSpecies}
						onChange={(e) => setNewAnimalSpecies(e.target.value)}
						required
					/>
					<input
						type="text"
						placeholder="Animal Name"
						value={newAnimalName}
						onChange={(e) => setNewAnimalName(e.target.value)}
						required
					/>
					<input
						type="text"
						placeholder="Mood"
						value={newAnimalMood}
						onChange={(e) => setNewAnimalMood(e.target.value)}
						required
					/>
					<button type="submit">Create Animal</button>
				</form>

				<div className="animals-list">
					<h1>THE FARM</h1>

					<h2>Unique animals on the farm</h2>
					{uniqueAnimals.length > 0 ? (
						<ul className="species-list">
							{uniqueAnimals.map((species) => (
								<li key={species._id} className="species-item">
									{species._id}: {species.count}
								</li>
							))}
						</ul>
					) : (
						<p>No species found</p>
					)}

					<h2>All animals </h2>

					{animals && animals.length > 0 ? (
						animals.map((animal) => (
							<div key={animal._id} className="animal-card">
								<h3>Name: {animal.name}</h3>
								<p>Id: {animal._id}</p>
								<p>Species: {animal.species}</p>
								<p>Mood: {animal.mood}</p>

								<button onClick={() => setEditingAnimalId(animal._id || null)}>
									Edit Animal
								</button>

								{editingAnimalId === animal._id && (
									<form
										onSubmit={(e) => {
											e.preventDefault();
											// Implement edit logic here
										}}>
										<input
											type="text"
											defaultValue={animal.name}
											placeholder="Name"
											required
										/>
										<input
											type="text"
											defaultValue={animal.species}
											placeholder="Species"
											required
										/>
										<input
											type="text"
											defaultValue={animal.mood}
											placeholder="Mood"
											required
										/>
										<div>
											<button type="submit">Save Changes</button>
											<button
												type="button"
												onClick={() => setEditingAnimalId(null)}>
												Cancel
											</button>
										</div>
									</form>
								)}

								<button
									onClick={() => handleDeleteAnimal(animal._id || "")}
									disabled={deletingId === animal._id}>
									{deletingId === animal._id ? "Deleting..." : "Delete Animal"}
								</button>
							</div>
						))
					) : (
						<p>No animals found. Create one on the button!</p>
					)}

					{/* {OneAnimal ? (
							<div key={OneAnimal._id} className="animal-card">
								<h3>{OneAnimal.name}</h3>
								<p>{OneAnimal._id}</p>
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
