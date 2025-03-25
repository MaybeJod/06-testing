// Define the Animal type
export interface Animal {
	_id?: string;
	species: string;
	name: string;
	mood: string;
}

// Base URL
const BASE_URL = "http://localhost:3000";

// Get all animals
export async function getAnimals(): Promise<Animal[]> {
	try {
		const response = await fetch(`${BASE_URL}/animals`);

		if (!response.ok) {
			throw new Error("Failed to fetch animals");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching animals:", error);
		return [];
	}
}

// get all animals by species
export async function getAllAnimalsBySpecies(
	species: string
): Promise<Animal[] | null> {
	try {
		const response = await fetch(`${BASE_URL}/animals/bySpecies/${species}`);

		if (!response.ok) {
			throw new Error("Failed to fetch animals by species lol");
		}
		return await response.json();
	} catch (error) {
		console.error("error fetching animals:", error);
		return [];
	}
}

// Get unique species
export async function getUniqueSpecies(): Promise<string[]> {
	try {
		const response = await fetch(`${BASE_URL}/animals/uniqueSpecies`);

		if (!response.ok) {
			throw new Error("Failed to fetch unique species");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching unique species:", error);
		return [];
	}
}

// Get a single animal by ID
export async function getAnimal(id: string): Promise<Animal | null> {
	try {
		const response = await fetch(`${BASE_URL}/animals/${id}`);

		if (!response.ok) {
			throw new Error("Failed to fetch animal");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching animal:", error);
		return null;
	}
}

// Create a new animal
export async function createAnimal(animalData: Animal): Promise<Animal | null> {
	try {
		const response = await fetch(`${BASE_URL}/animals`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(animalData),
		});

		if (!response.ok) {
			throw new Error("Failed to create animal");
		}

		return await response.json();
	} catch (error) {
		console.error("Error creating animal:", error);
		return null;
	}
}

// Update an animal
export async function updateAnimal(
	id: string,
	animalData: Animal
): Promise<Animal | null> {
	try {
		const response = await fetch(`${BASE_URL}/animals/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(animalData),
		});

		if (!response.ok) {
			throw new Error("Failed to update animal");
		}

		return await response.json();
	} catch (error) {
		console.error("Error updating animal:", error);
		return null;
	}
}

// Delete an animal
export async function deleteAnimal(id: string): Promise<boolean> {
	try {
		const response = await fetch(`${BASE_URL}/animals/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Failed to delete animal");
		}

		return true;
	} catch (error) {
		console.error("Error deleting animal:", error);
		return false;
	}
}
