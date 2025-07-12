import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pokemon } from "../types/types";

class Storage {
	async setFavourites(favourites: Pokemon[]): Promise<void> {
		try {
			const value = JSON.stringify(favourites);
			await AsyncStorage.setItem("favourites", value);
		} catch (e) {
			console.error("An error occurred while saving favourites");
		}
	}

	async getFavourites(): Promise<Pokemon[]> {
		try {
			const value = await AsyncStorage.getItem("favourites");
			if (value) return JSON.parse(value);
			return [];
		} catch (e) {
			console.error("An error occurred while retrieving favourites");
			return [];
		}
	}

	async addFavourite(pokemon: Pokemon): Promise<void> {
		const favourites = await this.getFavourites();

		const exists = favourites.some((p) => {
			return p.name === pokemon.name;
		});

		if (!exists) {
			favourites.push(pokemon);
			await this.setFavourites(favourites);
		}
	}

	async removeFavourite(pokemon: Pokemon): Promise<void> {
		let favourites = await this.getFavourites();

		favourites = favourites.filter((listPokemon) => {
			return listPokemon.name !== pokemon.name;
		});
		await this.setFavourites(favourites);
	}

	async inFavourites(pokemon: Pokemon): Promise<boolean> {
		const favourites = await this.getFavourites();
		return favourites.some((p) => p.name === pokemon.name);
	}
}

export const storage = new Storage();
