import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePokemonStore } from "../store/usePokemonStore";
import { useFocusEffect, useRouter } from "expo-router";
import { AppText } from "../components/AppText";
import { formatName } from "../utils/utils";
import { useCallback, useEffect, useState } from "react";
import { storage } from "../storage/storage";

const Details = () => {
	const router = useRouter();
	const selectedPokemon = usePokemonStore((state) => state.selectedPokemon);
	const [loading, setLoading] = useState(true);
	const [favourited, setFavourited] = useState(false);

	async function loadFavouriteStatus() {
		const fav = await storage.inFavourites(selectedPokemon!);
		setFavourited(fav);
	}

	async function toggleFavouriteStatus() {
		if (!selectedPokemon) return;
		const isFav = await storage.inFavourites(selectedPokemon);
		if (isFav) {
			await storage.removeFavourite(selectedPokemon);
			setFavourited(false);
		} else {
			await storage.addFavourite(selectedPokemon);
			setFavourited(true);
		}
	}

	useEffect(() => {
		if (selectedPokemon) setLoading(false);
	}, [selectedPokemon]);

	useFocusEffect(
		useCallback(() => {
			loadFavouriteStatus();
		}, [selectedPokemon])
	);

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={router.back} style={styles.backButton}>
				<AppText style={styles.backButton}>{"<"} Back to Pokedex</AppText>
			</TouchableOpacity>
			{loading ? <Text>Loading...</Text> : <></>}

			{selectedPokemon && (
				<>
					<View style={styles.headerContainer}>
						<AppText style={styles.header}>
							{formatName(selectedPokemon.name)}
						</AppText>
					</View>

					<View style={styles.bodyInfo}>
						<Image
							source={{ uri: selectedPokemon.sprites.front_default }}
							style={styles.image}
						></Image>

						<AppText style={{ fontSize: 16 }}>
							Height: {selectedPokemon.height}
							{"\n"}
							Weight: {selectedPokemon.weight}
							{"\n"}
							Species: {formatName(selectedPokemon.species.name)}
						</AppText>

						<View style={styles.statContainer}>
							{selectedPokemon.stats.map((stat, index) => (
								<View key={index} style={styles.statRow}>
									<AppText style={styles.statLabel}>{stat.stat.name}</AppText>
									<View style={styles.statBarBackground}>
										<View
											style={[
												styles.statBarFill,
												{ width: `${(stat.base_stat / 255) * 100}%` },
											]}
										/>
									</View>
									<AppText style={styles.statValue}>{stat.base_stat}</AppText>
								</View>
							))}
						</View>
					</View>

					<AppText style={{ marginTop: 20, marginBottom: 14, fontSize: 20 }}>
						Appeared in: {selectedPokemon.game_indices.length} games
					</AppText>

					<TouchableOpacity
						activeOpacity={0.5}
						onPress={async () => {
							await toggleFavouriteStatus();
						}}
					>
						<AppText style={{ textDecorationLine: "underline" }}>
							{!favourited ? "+ Add to favourites" : "- Remove from favourites"}
						</AppText>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#cc0000",
		height: "100%",
		width: "100%",
		flex: 1,
		alignItems: "center",
		paddingTop: "5%",
	},
	backButton: {
		textDecorationLine: "underline",
		color: "#ffde00",
		fontSize: 18,
		alignSelf: "flex-start",
		marginLeft: 10,
	},
	headerContainer: {
		marginTop: 30,
		display: "flex",
		alignItems: "center",
		textAlign: "center",
	},
	header: {
		color: "#ffde00",
		fontSize: 28,
	},
	bodyInfo: {
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
	image: {
		height: 150,
		width: 150,
	},
	statContainer: {
		padding: 12,
		width: "100%",
	},
	statRow: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 5,
	},
	statLabel: {
		width: 80,
		textTransform: "capitalize",
	},
	statBarBackground: {
		maxWidth: "50%",
		flex: 1,
		height: 12,
		backgroundColor: "#eee",
		borderRadius: 6,
		marginHorizontal: 10,
	},
	statBarFill: {
		height: "100%",
		backgroundColor: "#3b4cca",
		borderRadius: 6,
	},
	statValue: {
		width: 30,
		textAlign: "right",
	},
});

export default Details;
