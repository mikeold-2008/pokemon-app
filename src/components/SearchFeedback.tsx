import {
	ReactElement,
	JSXElementConstructor,
	ReactNode,
	ReactPortal,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppText } from "./AppText";

const SearchFeedback = ({ feedbackText }: { feedbackText: string }) => {
	return (
		<View style={styles.container}>
			<AppText style={styles.whiteText}>{feedbackText}</AppText>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 6,
	},
	whiteText: {
		fontSize: 14,
	},
});
export default SearchFeedback;
