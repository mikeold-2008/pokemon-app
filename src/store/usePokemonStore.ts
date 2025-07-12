import { create } from "zustand";
import { Pokemon } from "../types/types";
import { storage } from "../storage/storage";

type Store = {
	favourites: Pokemon[];
	setFavourites: (favourites: Pokemon[]) => void;
	selectedPokemon: Pokemon | null;
	loading: boolean;
	error: string | null;
	searchResult: Pokemon | null;
	setSelectedPokemon: (pokemon: Pokemon) => void;
	fetchPokemon: (name: string) => Promise<void>;
	isFavourite: (pokemon: Pokemon) => Promise<boolean>;
};

export const usePokemonStore = create<Store>((set, get) => ({
	favourites: [],
	setFavourites: (favourites: Pokemon[]) => set({ favourites }),
	selectedPokemon: null,
	loading: false,
	error: null,
	searchResult: null,
	setSelectedPokemon: (pokemon: Pokemon) => set({ selectedPokemon: pokemon }),
	fetchPokemon: async (name: string) => {
		set({ loading: true, error: null, searchResult: null });
		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
			);
			if (!response.ok) throw new Error("Pokémon not found");

			const data = await response.json();
			set({ searchResult: data, loading: false });
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},
	isFavourite: async (pokemon: Pokemon): Promise<boolean> => {
		let isFavourited = await storage.inFavourites(pokemon);
		return isFavourited;
	},
}));
