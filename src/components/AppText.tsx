import { Text, TextProps, StyleSheet } from "react-native";

export const AppText = ({ style, ...props }: TextProps) => {
	return <Text style={[styles.default, style]} {...props} />;
};

const styles = StyleSheet.create({
	default: {
		color: "#ffcb05",
		fontFamily: "Poppins-Regular",
	},
});
