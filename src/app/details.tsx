import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePokemonStore } from "../store/usePokemonStore";
import { useRouter } from "expo-router";

const Details = () => {
	const router = useRouter();
	const { selectedPokemon } = usePokemonStore();

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={router.back}>
				<Text style={styles.backButton}>{"<"} Back to Pokedex</Text>
			</TouchableOpacity>
			<Text>{selectedPokemon ? selectedPokemon.name : "loading..."}</Text>
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
		fontSize: 20,
		color: "#ffde00",
	},
});

export default Details;
