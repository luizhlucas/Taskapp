import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        gap: 12,
        marginBottom: 10,
        backgroundColor: colors.green[200],
        padding: 18,
        borderRadius: 10
    },
    details: {
        flex: 1
    },
    name: {
        color: colors.gray[100],
        fontSize: 18,
        fontWeight: "600",
    },
})