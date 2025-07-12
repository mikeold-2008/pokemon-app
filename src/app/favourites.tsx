import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const Favourites = () => {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={router.back}>
				<Text style={styles.backButton}>{"<"} Back to Pokedex</Text>
			</TouchableOpacity>
			<Text>Favourites</Text>
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
		fontSize: 20,
		color: "#3b4cca",
	},
});

export default Favourites;
