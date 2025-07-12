export interface Stat {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
}

export interface Sprites {
	front_default: string;
}

export interface GameIndex {
	game_index: number;
	version: {
		name: string;
		version: string;
	};
}

export interface Pokemon {
	url: string;
	name: string;
	height: number;
	weight: number;
	species: {
		name: string;
		url: string;
	};
	stats: Stat[];
	sprites: Sprites;
	game_indices: GameIndex[];
}
