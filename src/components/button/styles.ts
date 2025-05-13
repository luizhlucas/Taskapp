import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 52,
        backgroundColor: colors.green[100],
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.green[200]
    },
})