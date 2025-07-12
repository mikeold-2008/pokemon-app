export interface Stat {
	base_stat: number;
	stat: {
		name: string;
		url: string;
	};
}

export interface Sprites {
	front_default: string;
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
	base_stats: Stat[];
	sprites: Sprites;
	games_appeared_in: number;
}
