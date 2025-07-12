import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

const Layout = () => {
	const [fonts] = useFonts({
		"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
	});

	if (!fonts) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.safeView}>
				<Stack screenOptions={{ headerShown: false }} />
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: "#fff",
		color: "fff",
	},
});

export default Layout;
