import {
	ReactElement,
	JSXElementConstructor,
	ReactNode,
	ReactPortal,
} from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchFeedback = ({ feedbackText }: { feedbackText: string }) => {
	return (
		<View>
			<Text style={styles.whiteText}>{feedbackText}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	whiteText: {
		color: "white",
		fontSize: 14,
	},
});
export default SearchFeedback;
