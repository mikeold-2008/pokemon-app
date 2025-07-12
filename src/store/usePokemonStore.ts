import { create } from "zustand";
import { Pokemon } from "../types/types";

type Store = {
	favourites: Pokemon[];
	addFavourite: (pokemon: Pokemon) => void;
	removeFavourite: (name: string) => void;
	selectedPokemon: Pokemon | null;
	loading: boolean;
	error: string | null;
	fetchPokemon: (name: string) => Promise<void>;
	searchResult: Pokemon | null;
	setSelectedPokemon: (pokemon: Pokemon) => void;
};

export const usePokemonStore = create<Store>((set) => ({
	favourites: [],
	addFavourite: (pokemon) =>
		set((state) => ({
			favourites: [...state.favourites, pokemon],
		})),
	removeFavourite: (name) =>
		set((state) => ({
			favourites: state.favourites.filter((p) => p.name !== name),
		})),
	selectedPokemon: null,
	loading: false,
	error: null,
	fetchPokemon: async (name) => {
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
	setSelectedPokemon: (pokemon: Pokemon) => set({ selectedPokemon: pokemon }),
	searchResult: null,
}));
