import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { storage } from "../storage/storage";
import { useEffect, useState } from "react";
import { AppText } from "../components/AppText";
import { usePokemonStore } from "../store/usePokemonStore";
import { formatName } from "../utils/utils";

const Favourites = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const { favourites, setFavourites } = usePokemonStore();

	useEffect(() => {
		loadFavourites();
	}, []);

	async function loadFavourites() {
		const favouritesStorage = await storage.getFavourites();

		if (favouritesStorage) {
			setFavourites(favouritesStorage);
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={router.back} style={styles.backButton}>
				<AppText style={styles.backButton}>{"<"} Back to Pokedex</AppText>
			</TouchableOpacity>

			{loading ? (
				<Text>Loading...</Text>
			) : (
				<View style={styles.headerContainer}>
					<AppText style={styles.header}>Favourites</AppText>
					{favourites.length === 0 && (
						<AppText style={{ color: "#3b4cca" }}>
							You don't have any favourites yet.
						</AppText>
					)}

					{favourites.length > 0 && (
						<>
							{favourites.map((fave, index) => {
								return (
									<View key={index}>
										<AppText style={{ color: "#3b4cca" }}>
											{formatName(fave.name)}
										</AppText>
									</View>
								);
							})}
						</>
					)}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffde00",
		height: "100%",
		width: "100%",
		flex: 1,
		alignItems: "center",
		paddingTop: "5%",
	},
	backButton: {
		textDecorationLine: "underline",
		color: "#3b4cca",
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
		color: "#3b4cca",
		fontSize: 28,
	},
});

export default Favourites;
