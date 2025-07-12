import {
	View,
	StyleSheet,
	TextInput,
	Button,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { AppText } from "../components/AppText";
import { useEffect, useState } from "react";
import { usePokemonStore } from "../store/usePokemonStore";
import SearchFeedback from "../components/SearchFeedback";
import { useRouter } from "expo-router";

const Index = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const { fetchPokemon, setSelectedPokemon, searchResult, error, loading } =
		usePokemonStore();
	const [loadingPokemon, setLoadingPokemon] = useState(false);
	const [searchFeedback, setSearchFeedback] = useState("");
	const router = useRouter();

	async function handleSearch() {
		setLoadingPokemon(true);
		if (searchTerm.trim().length === 0) {
			setSearchFeedback("Please enter a search term");
			return;
		}
		setSearchFeedback("Searching...");

		await fetchPokemon(searchTerm.toLowerCase());
	}

	useEffect(() => {
		if (loading) {
			setSearchFeedback("Searching...");
		} else if (error) {
			setSearchFeedback("Unable to find Pokemon");
		} else if (searchResult) {
			setSearchFeedback("");
			setLoadingPokemon(false);
		}
	}, [loading, error, searchResult]);

	return (
		<View style={styles.container}>
			<AppText style={styles.header}>Welcome to the Pokemon App!</AppText>
			<AppText style={styles.subHeader}>Search for a Pokemon below</AppText>
			<View style={styles.searchContainer}>
				<TextInput
					value={searchTerm}
					onChangeText={setSearchTerm}
					style={styles.searchInput}
				></TextInput>
				<Button
					title="search"
					color="#ff0000"
					onPress={handleSearch}
					disabled={loading}
				/>
			</View>

			{!loadingPokemon && searchResult ? (
				<View style={styles.searchResult}>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => {
							setSelectedPokemon(searchResult);
							router.push("/details");
						}}
					>
						<Image
							source={{ uri: searchResult.sprites.front_default }}
							style={styles.image}
						></Image>
					</TouchableOpacity>

					<AppText style={{ fontSize: 20 }}>
						A wild {searchResult.species.name} has appeared!
					</AppText>
					<AppText style={styles.ctaText}>
						Tap on {searchResult.species.name} to learn more.
					</AppText>
				</View>
			) : (
				<SearchFeedback feedbackText={searchFeedback} />
			)}

			<View style={styles.myPokemonView}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => {
						router.push("/favourites");
					}}
					style={styles.touchable}
				>
					<Image
						source={require("../assets/icons/pokeball.png")}
						style={{ width: 60, height: 60 }}
					/>
					<AppText style={styles.myPokemonText}>Favourites</AppText>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#3b4cca",
		height: "100%",
		width: "100%",
		flex: 1,
		alignItems: "center",
		paddingTop: "5%",
	},
	header: {
		fontSize: 24,
		fontFamily: "Poppins-SemiBold",
	},
	subHeader: {
		marginTop: "3%",
		fontSize: 16,
	},
	searchContainer: {
		marginTop: "10%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		width: "100%",
	},
	searchInput: {
		width: "50%",
		backgroundColor: "white",
		borderRadius: 10,
	},
	searchResult: {
		marginTop: "10%",
		display: "flex",
		alignItems: "center",
		width: "100%",
		height: "30%",
	},
	image: {
		height: 150,
		width: 150,
	},
	ctaText: {
		marginTop: "2%",
		fontSize: 14,
	},
	myPokemonView: {
		position: "absolute",
		bottom: 50,
		alignItems: "center",
		width: "70%",
	},
	myPokemonText: {
		fontSize: 24,
	},
	touchable: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
});

export default Index;
